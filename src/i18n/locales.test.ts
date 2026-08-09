import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { resolveProductRoot } from "../../scripts/sync-tokens";
import { DEFAULT_LOCALE, LOCALES, SEGMENTS, canonicalPath, localePath, localeOf } from "./locales";

const PRODUCT = resolveProductRoot();
const I18N = join(PRODUCT, "apps", "desktop", "src", "lib", "i18n.tsx");

/**
 * The site and the app have to offer the same languages. If the app gains one and the site does
 * not, a person switches language in the app, opens the site, and is told their language does not
 * exist here — which is worse than never having offered it.
 */
describe("locales — the site and the app agree", () => {
  it("offers exactly the app's languages", () => {
    if (!existsSync(I18N)) {
      // Product tree absent (a fresh clone with no content sync). The CI job that runs the drift
      // gate has it; failing here would only teach people to skip the suite locally.
      console.warn(`skipped: chimera-agent not found at ${PRODUCT}`);
      return;
    }
    const source = readFileSync(I18N, "utf8");
    const block = source.slice(source.indexOf("LANGS"), source.indexOf("LANGS") + 1200);
    const appCodes = [...block.matchAll(/code:\s*"([a-z-]+)"/g)].map((m) => m[1]);

    expect(appCodes.length).toBeGreaterThan(0);
    expect([...appCodes].sort()).toEqual([...SEGMENTS].sort());
  });
});

describe("locales — the table is internally consistent", () => {
  it("has no duplicate segments, endonyms or READMEs", () => {
    const unique = (xs: string[]) => new Set(xs).size === xs.length;
    expect(unique(LOCALES.map((l) => l.segment))).toBe(true);
    expect(unique(LOCALES.map((l) => l.endonym))).toBe(true);
    expect(unique(LOCALES.map((l) => l.readme))).toBe(true);
    expect(unique(LOCALES.map((l) => l.bcp47))).toBe(true);
  });

  it("names a README that exists for every language", () => {
    if (!existsSync(join(PRODUCT, "README.md"))) return;
    for (const locale of LOCALES) {
      expect(existsSync(join(PRODUCT, locale.readme)), locale.readme).toBe(true);
    }
  });

  it("prefixes every locale, English included", () => {
    // Uniform prefixes keep one route tree. English-at-the-root would need a duplicate route file
    // per page, because a static export has no rewrites — and those files drift.
    expect(localePath(DEFAULT_LOCALE, "/docs")).toBe("/en/docs/");
    expect(localePath("pt", "/docs")).toBe("/pt/docs/");
    expect(localePath("pt", "/")).toBe("/pt/");
    expect(localePath("en", "/")).toBe("/en/");
  });

  it("points the English home's canonical at the bare domain", () => {
    // `/` and `/en/` render the same page. Exactly one of them may claim to be the original.
    expect(canonicalPath("en", "/")).toBe("/");
    expect(canonicalPath("en", "/docs")).toBe("/en/docs/");
    expect(canonicalPath("pt", "/")).toBe("/pt/");
  });

  it("always ends a path in a slash, because the export is trailing-slash", () => {
    // Without this every internal link is a 301 on a static server, and some of them are 404s.
    for (const segment of SEGMENTS) {
      expect(localePath(segment, "/skills")).toMatch(/\/$/);
    }
  });

  it("refuses an unknown segment instead of inventing a locale", () => {
    // @ts-expect-error — the point of the test is the runtime guard behind the type.
    expect(() => localeOf("xx")).toThrow();
  });
});
