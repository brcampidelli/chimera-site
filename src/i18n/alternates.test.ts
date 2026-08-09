import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { LOCALES, SEGMENTS, alternatesFor } from "./locales";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

/**
 * `hreflang` on every page, not on the home page only.
 *
 * An audit of the live site found the alternates on 9 URLs out of 1160: the home page template had
 * them and no other route did. The site had paid the whole cost of nine languages and then withheld
 * the one signal that tells a search engine which translation to serve, so the nine versions of
 * every page were invisible to each other and competed instead of adding up.
 *
 * The reason it went unnoticed is that nothing could see it. A canonical-only `alternates` block is
 * valid, builds clean, and renders a perfectly good page — the absence is only visible in the head
 * of the built HTML, which is where this test looks.
 */
describe("hreflang", () => {
  it("names every language plus x-default", () => {
    const alt = alternatesFor("pt", "/agent");
    const languages: Record<string, string> = alt.languages;
    expect(alt.canonical).toBe("/pt/agent/");
    for (const locale of LOCALES) {
      expect(languages[locale.bcp47]).toBe(`/${locale.segment}/agent/`);
    }
    // Without x-default a search engine picks one of the nine on its own.
    expect(languages["x-default"]).toBe("/en/agent/");
    expect(Object.keys(languages)).toHaveLength(SEGMENTS.length + 1);
  });

  it("sends the English home to the bare domain", () => {
    // `/` and `/en/` are byte-identical; the sitemap lists `/`, so the canonical has to agree.
    expect(alternatesFor("en", "/").canonical).toBe("/");
    const home: Record<string, string> = alternatesFor("es", "/").languages;
    expect(home["x-default"]).toBe("/");
  });

  it("is what every page route actually uses", () => {
    // The defect was per-file: thirteen routes each wrote `alternates: { canonical: ... }` by hand
    // and none of them was wrong on its own. Reading the sources is the only place that catches
    // the fourteenth one written the same way tomorrow.
    const routes = [
      "agent",
      "cli",
      "coverage",
      "desktop",
      "docs",
      "download",
      "evidence",
      "press",
      "privacy",
      "skills",
    ];
    for (const route of routes) {
      const source = readFileSync(join(ROOT, "src", "app", "[lang]", route, "page.tsx"), "utf8");
      expect(source, `${route} must use alternatesFor`).toMatch(/alternates:\s*(\.\.\.)?alternatesFor\(/);
    }
  });

  it("leaves the blog post page alone", () => {
    // A post exists in the languages it was written in. Claiming nine translations of a post that
    // has two is lying to a search engine, which is the same sin as lying to a reader — so that
    // page builds its own list from `translationsOf` and must not be swept into this helper.
    const source = readFileSync(
      join(ROOT, "src", "app", "[lang]", "blog", "[slug]", "page.tsx"),
      "utf8",
    );
    expect(source).toContain("translationsOf");
    expect(source).not.toContain("alternatesFor");
  });
});
