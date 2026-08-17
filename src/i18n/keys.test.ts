import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import en from "./messages/en.json";

const SRC = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Every `t("literal")` in the site's own source. Dynamic keys are skipped on purpose — a template
 *  literal cannot be resolved here, and guessing at one would make this gate lie in the other
 *  direction. */
function literalKeys(): { key: string; file: string }[] {
  const found: { key: string; file: string }[] = [];
  const call = /\bt\(\s*"([A-Za-z0-9_]+(?:\.[A-Za-z0-9_]+)+)"/g;
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir)) {
      const path = join(dir, entry);
      if (statSync(path).isDirectory()) {
        if (entry !== "messages") walk(path);
        continue;
      }
      if (!/\.tsx?$/.test(entry)) continue;
      const source = readFileSync(path, "utf8");
      for (const match of source.matchAll(call)) {
        const key = match[1];
        if (key) found.push({ key, file: relative(SRC, path) });
      }
    }
  };
  walk(SRC);
  return found;
}

/**
 * Every key a page asks for has to exist in the English table.
 *
 * English is the key set: a locale missing a string falls back to it, so a key absent from English
 * is absent everywhere and renders as its own name. `messages.ts` already says what that costs —
 * "a missing string showing English is a small failure; a missing string showing a raw key is the
 * site admitting it is broken" — but nothing checked it, and `desktop.screensHeading` shipped that
 * way: the heading over the six screen cards on /desktop/ read `desktop.screensHeading` to every
 * visitor, in all ten languages.
 *
 * The translation ratchet could not see it. That gate compares each locale against English, so a
 * key missing from English too is missing from the comparison as well — it looks complete because
 * nobody is short of anything.
 */
describe("i18n keys — every key a page asks for exists", () => {
  it("finds the keys at all", () => {
    // If the scan silently matched nothing, the assertion below would pass while checking nothing.
    expect(literalKeys().length).toBeGreaterThan(50);
  });

  it("resolves every literal key against the English table", () => {
    const strings = en as Record<string, string>;
    const missing = literalKeys().filter(({ key }) => !(key in strings));
    const report = missing.map(({ key, file }) => `${key} (${file})`).join(", ");
    expect(missing, `keys that would render as their own name: ${report}`).toEqual([]);
  });
});
