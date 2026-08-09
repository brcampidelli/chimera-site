import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { LOCALES, SEGMENTS } from "./locales";

const OUT = resolve(import.meta.dirname, "..", "..", "out");

function pages(dir: string, found: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) pages(full, found);
    else if (entry === "index.html") found.push(full);
  }
  return found;
}

/**
 * `hreflang` is a promise to a search engine, and it is the one audience that cannot notice the
 * promise was broken. If the German alternate leads to an English page, nobody complains — the
 * engine simply serves German readers something they cannot read.
 */
describe("hreflang — the alternates are true", () => {
  it("declares every language on the marketing pages", () => {
    if (!existsSync(OUT)) {
      console.warn("skipped: build the site first");
      return;
    }
    const home = join(OUT, "de", "index.html");
    if (!existsSync(home)) return;
    const html = readFileSync(home, "utf8");
    for (const locale of LOCALES) {
      // Next renders the attribute as `hrefLang`; HTML attribute names are case-insensitive, so
      // this is what crawlers see.
      expect(html.toLowerCase(), locale.bcp47).toContain(`hreflang="${locale.bcp47.toLowerCase()}"`);
    }
  });

  it("names a BCP-47 tag for every locale, never the URL segment", () => {
    // `zh` is the segment and `zh-Hans` is the tag. Emitting the segment would be a subtly wrong
    // promise rather than an obviously broken one.
    for (const locale of LOCALES) {
      expect(locale.bcp47).toMatch(/^[a-z]{2}(-[A-Za-z]{2,4})?$/);
    }
    expect(LOCALES.find((l) => l.segment === "zh")?.bcp47).toBe("zh-Hans");
    expect(LOCALES.find((l) => l.segment === "pt")?.bcp47).toBe("pt-BR");
  });

  it("gives every real page a canonical", () => {
    if (!existsSync(OUT)) return;
    const missing = pages(OUT)
      .map((file) => relative(OUT, file).replace(/\\/g, "/"))
      // The 404 is the one page that must NOT declare a canonical: doing so would tell a crawler
      // that a URL which does not exist is the preferred address for something.
      .filter((page) => !page.startsWith("404/"))
      .filter((page) => !readFileSync(join(OUT, page), "utf8").includes('rel="canonical"'));
    expect(missing.slice(0, 10), `pages with no canonical: ${missing.length}`).toEqual([]);
  });

  it("builds one tree per locale", () => {
    if (!existsSync(OUT)) return;
    for (const segment of SEGMENTS) {
      expect(existsSync(join(OUT, segment, "index.html")), segment).toBe(true);
    }
    // The bare domain is a copy of the English home, so both addresses answer and the canonical
    // inside settles which is the original.
    expect(existsSync(join(OUT, "index.html"))).toBe(true);
  });
});
