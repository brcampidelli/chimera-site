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
 * Names that may only appear where their caveat appears.
 *
 * This check has been wrong twice, and each version taught the next one.
 *
 * v1 banned the string "SWE-bench Verified score" outright — and flagged `docs/benchmarks` in nine
 * languages for the sentence "is NOT a SWE-bench Verified score". A gate that forbids the
 * documentation from quoting its own warning has inverted itself.
 *
 * v2 required a negation within sixty characters. It passed, which was the problem: the negation
 * vocabulary was English, and the caveat translations do not contain the English phrase at all. So
 * eight of the nine languages were never checked, and the gate reported success for a hole it was
 * not looking at. A check that cannot fail is not verifying anything.
 *
 * v3 is exact. The benchmark's name may appear on a page only if the *registered caveat for that
 * page's language* appears on it too. No negation vocabulary, no per-language phrase list, and it
 * enforces the actual design rather than approximating it: the figure travels with its
 * qualification, or it does not travel.
 */
const CAVEATED_NAMES: { name: string; caveatKey: string; why: string }[] = [
  {
    name: "SWE-bench Verified",
    caveatKey: "caveat.easySlice",
    why: "the slice is deliberately easy and single-repo; a real score needs the full 500 instances",
  },
];

/**
 * The readable text of a page.
 *
 * Entities have to be decoded, and finding that out cost a false failure: React escapes an
 * apostrophe to `&#x27;`, so the French caveat — "Ce n'est pas un score" — never matched the
 * string it was compared against. Exactly one of nine languages went red, for the only reason
 * that had nothing to do with its content. A checker that fails on the apostrophe is a checker
 * somebody weakens.
 */
export function textOf(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&#39;|&apos;/gi, "'")
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#x2F;|&#47;/gi, "/")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ");
}

/** The nine dictionaries, so a caveat can be looked up in the page's own language. */
function caveatFor(key: string, lang: string): string {
  const file = join(SRC, "i18n", "messages", `${lang}.json`);
  const english = JSON.parse(
    readFileSync(join(SRC, "i18n", "messages", "en.json"), "utf8"),
  ) as Record<string, string>;
  if (!existsSync(file)) return english[key] ?? "";
  const table = JSON.parse(readFileSync(file, "utf8")) as Record<string, string>;
  // Missing translations fall back to English at render time, so the check follows the same rule.
  return table[key] ?? english[key] ?? "";
}

/** `<html lang="pt-BR">` → `pt`, matching the message files. */
function langOf(html: string): string {
  const match = html.match(/<html[^>]*\blang="([a-zA-Z-]+)"/);
  return (match?.[1] ?? "en").split("-")[0]!.toLowerCase();
}

export function uncaveatedNames(html: string): string[] {
  const text = textOf(html);
  const lang = langOf(html);
  const failures: string[] = [];
  for (const { name, caveatKey, why } of CAVEATED_NAMES) {
    if (!text.includes(name)) continue;
    const caveat = caveatFor(caveatKey, lang);
    if (caveat && !text.includes(caveat)) {
      failures.push(
        `names "${name}" (lang=${lang}) without the registered caveat on the page — ${why}`,
      );
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
 * Surfaces that render the product's own words verbatim, and are therefore exempt.
 *
 * Three of them, each found by this check firing on it:
 *
 *   `/docs/`            — the documentation, flagged for the sentence "is NOT a SWE-bench Verified
 *                         score". A gate that forbids the docs from quoting their own warning has
 *                         inverted itself.
 *   `/cli/`             — command help text. `swe-bench-compare` names the benchmark because that
 *                         is what it compares; the string comes out of the CLI, not out of copy.
 *   `/blog/releases/`   — release notes as published on GitHub, which nobody may author here.
 *
 * All three are reviewed in the repository that owns them. The site is their renderer, not their
 * editor, and a check that edits them is a check that has changed job.
 *
 * **What this now lets through**, stated rather than discovered later: an overclaim written into a
 * release note or a command's docstring reaches the site unchallenged. That text has a reviewer —
 * it is just not this gate. What the gate still covers is every word the site itself writes, which
 * is where a figure gets lifted out of its qualification by somebody tightening a paragraph.
 */
const PRODUCT_RENDERED = /\/(docs|cli)\/|\/blog\/releases\//;

/**
 * The word each language uses for "alpha", read from the site's own dictionaries.
 *
 * Hardcoding `alpha` made the check a check about English. Hardcoding a list of translations would
 * make it a check about the ten languages somebody remembered on the day. The footer carries this
 * caveat on every page, so the footer's own wording is what the page can be searched for — and a
 * language added tomorrow works without anybody remembering this file exists.
 *
 * The leading term, not the sentence: `"Alpha — solid and heavily tested…"` differs from its
 * rendering by punctuation and entity escaping, and matching a whole sentence through HTML is a
 * check that fails for reasons that have nothing to do with the claim.
 */
function alphaTerms(): Map<string, string> {
  const terms = new Map<string, string>();
  const dir = join(SRC, "i18n", "messages");
  if (!existsSync(dir)) return terms;
  for (const name of readdirSync(dir).filter((f) => f.endsWith(".json") && !f.startsWith("_"))) {
    const locale = name.slice(0, -5);
    const dict = JSON.parse(readFileSync(join(dir, name), "utf8")) as Record<string, string>;
    const term = (dict["footer.alpha"] ?? "").split(/[—–-]/)[0]?.trim();
    // A dictionary that stops carrying the caveat must not silently disable the check for that
    // language — that is the failure this whole file is about, one level up.
    if (!term) throw new Error(`verify:truth: ${name} has no usable footer.alpha to search for`);
    terms.set(locale, term);
  }
  return terms;
}

const ALPHA_TERMS = alphaTerms();
/** `ja/blog/index.html` → `ja`; `blog/index.html` → the default locale, which is English. */
const DEFAULT_LOCALE = "en";

export function alphaCaveatFor(relPath: string): RegExp {
  const first = relPath.split("/")[0] ?? "";
  const term = ALPHA_TERMS.get(first) ?? ALPHA_TERMS.get(DEFAULT_LOCALE) ?? "alpha";
  return new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
}

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
    for (const failure of uncaveatedNames(html)) failures.push(`${rel}: ${failure}`);
    // "GA" may appear only where the page also carries the alpha caveat. The maturity snapshot
    // says `"level": "GA"`, and that verdict standing alone is the one accurate number in this
    // repository that would mislead every reader.
    //
    // The caveat is looked for IN THE PAGE'S OWN LANGUAGE. Written as `/alpha/i` it read the
    // Japanese and Russian pages — which say アルファ版 and Альфа — as missing a caveat they carry
    // in full, and failed four builds for it. A rule calibrated on English fails the other
    // languages for being themselves; the answer is to narrow the rule, never to except them.
    if (/\bGA\b/.test(html) && !alphaCaveatFor(rel).test(html)) {
      failures.push(
        `${rel}: says "GA" with no alpha caveat (looked for ${alphaCaveatFor(rel)} — the ` +
          "wording this page's own language uses)",
      );
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
