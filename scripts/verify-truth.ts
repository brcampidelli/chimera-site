/**
 * The gate that keeps the site from lying by omission.
 *
 * This project publishes the benchmarks it lost and retracts its own claims when the data stops
 * supporting them. A marketing site is the easiest place in the world to quietly undo that: a
 * figure gets typed into a headline, the snapshot moves, and the page keeps asserting the old
 * number with total confidence. Or a caveat gets trimmed because the paragraph read better
 * without it.
 *
 * Three checks, all blocking:
 *
 *   1. No percentage literal in a page. Figures come from <Stat>, which reads the product's
 *      snapshot and renders the caveat in the same node.
 *   2. No forbidden phrase in the rendered HTML — including the retracted claim, in every
 *      language, and the internal "GA" verdict standing next to nothing that says "alpha".
 *   3. Every registered claim resolves. A caveat pointing at a translation key that no longer
 *      exists is a caveat that renders as its own key.
 *
 *   npm run verify:truth
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src");
const OUT = join(ROOT, "out");

/** Files whose job is to hold numbers. Everything else must go through <Stat>. */
const NUMBER_EXEMPT = [
  "src/content/evidence.ts",
  "src/content/claims.json",
  "src/components/evidence/Stat.tsx",
  "src/styles/",
  "src/i18n/messages/",
];

const PERCENT = /(?<![\w-])\d+(?:[.,]\d+)?\s?(?:%|pp)(?![\w-])/g;

/**
 * Sentences the site may not contain, in any language.
 *
 * The first two are the project's own retracted claim. The third is the number that could be
 * rendered accurately and still mislead: the maturity snapshot literally says `"level": "GA"`,
 * for a product whose README calls itself alpha four times.
 */
const FORBIDDEN_PHRASES: { pattern: RegExp; why: string }[] = [
  {
    pattern: /gets better the more you use it/i,
    why: "the learning-lift claim is retracted; say so with <RetractedNotice>",
  },
  {
    pattern: /melhora quanto mais voc[êe] usa/i,
    why: "the learning-lift claim is retracted (pt)",
  },
];

/**
 * Phrases that are fine to write and forbidden to assert.
 *
 * "SWE-bench Verified score" is the example, and this check earned its shape by failing on the
 * site's own caveat — the sentence "This is **not** a SWE-bench Verified score". Banning the
 * words outright would have banned the warning along with the lie, which is the same inversion
 * that made the documentation pages exempt above.
 *
 * So each occurrence has to be negated nearby. The negation vocabulary is English-only today
 * because the caveats are; when the translations land, every language needs its negation here or
 * the check quietly stops covering eight of the nine. That is written down as a risk rather than
 * discovered later.
 */
const MUST_BE_NEGATED: { phrase: string; why: string }[] = [
  {
    phrase: "SWE-bench Verified score",
    why: "the slice is deliberately easy and single-repo; a real score needs the full 500 instances",
  },
];

const NEGATIONS = /\b(not|isn't|is not|never)\b|\bnão\b|\bnicht\b|\bpas\b|\bnie\b|\bnon\b|不是|ではありません/i;

export function textOf(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
}

export function unnegatedAssertions(html: string): string[] {
  const text = textOf(html);
  const failures: string[] = [];
  for (const { phrase, why } of MUST_BE_NEGATED) {
    let from = 0;
    for (;;) {
      const at = text.toLowerCase().indexOf(phrase.toLowerCase(), from);
      if (at === -1) break;
      const before = text.slice(Math.max(0, at - 60), at);
      if (!NEGATIONS.test(before)) {
        failures.push(`asserts "${phrase}" with no negation nearby — ${why}`);
      }
      from = at + phrase.length;
    }
  }
  return failures;
}

function walk(dir: string, keep: (path: string) => boolean, found: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === "node_modules" || entry === ".next") continue;
      walk(full, keep, found);
    } else if (keep(full)) {
      found.push(full);
    }
  }
  return found;
}

export function checkNoTypedFigures(): string[] {
  const failures: string[] = [];
  const files = walk(SRC, (p) => [".tsx", ".ts", ".mdx", ".md"].includes(extname(p)));
  for (const file of files) {
    const rel = relative(ROOT, file).replace(/\\/g, "/");
    if (NUMBER_EXEMPT.some((prefix) => rel.startsWith(prefix))) continue;
    if (rel.endsWith(".test.ts") || rel.endsWith(".test.tsx")) continue;

    const source = readFileSync(file, "utf8");
    for (const line of source.split("\n")) {
      // Comments explain why a number is what it is. They are not shown to anyone.
      const code = line.replace(/\/\/.*$/, "").replace(/\/\*.*?\*\//g, "");
      const hits = code.match(PERCENT);
      if (hits) failures.push(`${rel}: ${hits.join(", ")} — use <Stat claim=… path=… />`);
    }
  }
  return failures;
}

/**
 * Documentation pages are exempt, and the first run of this check is why.
 *
 * It flagged `docs/benchmarks` in all nine languages — for a sentence that reads "48.3% is NOT a
 * SWE-bench Verified score". That is the project stating its own caveat, and a gate that forbids
 * the documentation from quoting its own warning has inverted itself. Those pages are the
 * product's words, rendered verbatim and reviewed in the repository that owns them; the site is
 * their renderer, not their editor.
 *
 * What this check is actually for is site-authored copy, where a number can be lifted out of its
 * qualification by someone tightening a paragraph.
 */
const PRODUCT_RENDERED = /\/docs\//;

function checkNoForbiddenPhrases(): string[] {
  if (!existsSync(OUT)) return [];
  const failures: string[] = [];
  for (const file of walk(OUT, (p) => p.endsWith(".html"))) {
    const rel = relative(OUT, file).replace(/\\/g, "/");
    if (PRODUCT_RENDERED.test(`/${rel}`)) continue;

    const html = readFileSync(file, "utf8");
    for (const { pattern, why } of FORBIDDEN_PHRASES) {
      if (pattern.test(html)) failures.push(`${rel}: ${pattern} — ${why}`);
    }
    for (const failure of unnegatedAssertions(html)) failures.push(`${rel}: ${failure}`);
    // "GA" may appear only where the page also says the product is alpha. The maturity snapshot
    // says `"level": "GA"`, and that verdict standing alone is the one accurate number in this
    // repository that would mislead every reader.
    if (/\bGA\b/.test(html) && !/alpha/i.test(html)) {
      failures.push(`${rel}: says "GA" with no "alpha" anywhere on the page`);
    }
  }
  return failures;
}

function checkClaimsResolve(): string[] {
  const failures: string[] = [];
  const claims = JSON.parse(readFileSync(join(SRC, "content", "claims.json"), "utf8")) as Record<
    string,
    { evidence: string | null; caveat: string; retracted: boolean }
  >;
  const english = JSON.parse(
    readFileSync(join(SRC, "i18n", "messages", "en.json"), "utf8"),
  ) as Record<string, string>;

  for (const [id, entry] of Object.entries(claims)) {
    if (!(entry.caveat in english)) {
      failures.push(`claim "${id}": caveat key "${entry.caveat}" has no English string`);
    }
    if (entry.retracted && entry.evidence !== null) {
      failures.push(`claim "${id}": retracted claims must not carry evidence`);
    }
    if (!entry.retracted && entry.evidence === null) {
      failures.push(`claim "${id}": a live claim needs an evidence path`);
    }
  }
  return failures;
}

function main(): void {
  const failures = [
    ...checkNoTypedFigures(),
    ...checkClaimsResolve(),
    ...checkNoForbiddenPhrases(),
  ];

  if (failures.length > 0) {
    console.error("verify:truth failed\n");
    for (const failure of failures) console.error(`  ${failure}`);
    console.error(
      "\nEvery figure on this site comes from the product's snapshot, with its caveat attached.",
    );
    process.exit(1);
  }
  console.log(
    existsSync(OUT)
      ? "truth: no typed figures, no forbidden phrases, every claim resolves"
      : "truth: source clean (build the site to also scan the rendered HTML)",
  );
}

if (process.argv[1]?.replace(/\\/g, "/").endsWith("scripts/verify-truth.ts")) main();
