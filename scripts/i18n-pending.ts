/**
 * Translation debt, written down and capped.
 *
 * Nine languages of marketing copy is a recurring cost, not a one-off: every change to a sentence
 * becomes nine edits, and the honest failure mode is that eight of them never happen while the
 * site keeps claiming to speak nine languages. So the gap is a number in a file.
 *
 * `keys` is derived — regenerated from the dictionaries, never hand-maintained, because a
 * hand-maintained list of missing translations goes stale in exactly the way it exists to prevent.
 * `maxPending` is the ratchet: it may fall, and raising it is an edit somebody has to justify.
 *
 *   npm run sync:i18n     regenerate the list
 *   npm run verify:i18n   fail if stale, or if the debt grew past the cap
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = resolve(HERE, "..");
const MESSAGES = join(SITE_ROOT, "src", "i18n", "messages");
const PENDING = join(MESSAGES, "_pending.json");

export interface Pending {
  /** The cap on Tier 2 debt. Lower it as translations land; raising it is a decision. */
  maxPending: number;
  /** `"<locale>:<key>"`, sorted. Derived — do not edit by hand. */
  keys: string[];
}

/**
 * Tier 1: the strings a visitor reads before deciding whether to stay, plus every caveat.
 *
 * These are not allowed to be missing in any language — no cap, no allowance. Everything else is
 * Tier 2 and may sit in English behind a notice that says so, because a machine-translated,
 * out-of-date technical reference is not accessibility. It is a confident lie with an accent.
 *
 * The split is mechanical on purpose. "Marketing gets translated, docs do not" is a policy
 * somebody interprets; a prefix list is a rule that fails the build.
 */
export const TIER1_PREFIXES = [
  "common.",
  "brand.",
  "nav.",
  "theme.",
  "lang.",
  "footer.",
  "home.",
  "agent.",
  "desktop.",
  "download.",
  "caveat.",
  "search.",
  "docs.",
] as const;

export function isTier1(key: string): boolean {
  return TIER1_PREFIXES.some((prefix) => key.startsWith(prefix));
}

const read = (file: string): Record<string, string> =>
  JSON.parse(readFileSync(file, "utf8")) as Record<string, string>;

export function computeKeys(locales: readonly string[]): string[] {
  const en = read(join(MESSAGES, "en.json"));
  const missing: string[] = [];
  for (const locale of locales) {
    if (locale === "en") continue;
    const table = read(join(MESSAGES, `${locale}.json`));
    for (const key of Object.keys(en)) {
      if (!(key in table)) missing.push(`${locale}:${key}`);
    }
  }
  return missing.sort();
}

function localeSegments(): string[] {
  // Read the segments out of the locale table rather than globbing the directory: a stray
  // `.json` in that folder should not silently become a language.
  const source = readFileSync(join(SITE_ROOT, "src", "i18n", "locales.ts"), "utf8");
  return [...source.matchAll(/segment:\s*"([a-z]+)"/g)].map((m) => m[1] as string);
}

function main(): void {
  const check = process.argv.includes("--check");
  const locales = localeSegments();
  const keys = computeKeys(locales);

  const current: Pending = existsSync(PENDING)
    ? (JSON.parse(readFileSync(PENDING, "utf8")) as Pending)
    : { maxPending: keys.length, keys: [] };

  const next: Pending = { maxPending: current.maxPending, keys };
  const rendered = `${JSON.stringify(next, null, 2)}\n`;

  if (check) {
    const onDisk = existsSync(PENDING) ? readFileSync(PENDING, "utf8") : "";
    if (onDisk !== rendered) {
      console.error("i18n: _pending.json is stale. Run `npm run sync:i18n` and commit it.");
      process.exit(1);
    }

    // Tier 1 has no allowance. A missing caveat or a half-English home page is not debt to be
    // tracked — it is the site failing at the thing it claims to do in nine languages.
    const tier1 = keys.filter((entry) => isTier1(entry.split(":")[1] ?? ""));
    if (tier1.length > 0) {
      console.error(`i18n: ${tier1.length} Tier 1 strings are untranslated. There is no cap on these.`);
      for (const entry of tier1.slice(0, 20)) console.error(`  ${entry}`);
      if (tier1.length > 20) console.error(`  … and ${tier1.length - 20} more`);
      process.exit(1);
    }

    if (keys.length > next.maxPending) {
      console.error(
        `i18n: ${keys.length} untranslated Tier 2 strings, cap is ${next.maxPending}.\n` +
          "Translate them, or raise the cap in a commit that says why.",
      );
      process.exit(1);
    }
    console.log(`i18n: Tier 1 complete · ${keys.length}/${next.maxPending} Tier 2 pending`);
    return;
  }

  writeFileSync(PENDING, rendered);
  console.log(`i18n: ${keys.length} pending (cap ${next.maxPending})`);
}

if (process.argv[1]?.replace(/\\/g, "/").endsWith("scripts/i18n-pending.ts")) main();
