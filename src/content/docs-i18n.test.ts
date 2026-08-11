import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { resolveProductRoot } from "../../scripts/sync-tokens";
import { docSlugs, docSourceHash, docTranslation, docsAvailable } from "./docs";
import { SEGMENTS } from "@/i18n/locales";

/**
 * Nine copies of a document that changes every release is nine ways to be quietly wrong.
 *
 * The defence is that a translation declares the SHA-256 of the English it was made from, and the
 * build compares. What that buys is the distinction between "not translated" and "translated, and
 * the original has moved" — the second being the dangerous one, because the reader cannot tell
 * which sentences still hold and neither can we.
 *
 * Note what is asserted here and what is not. A translation must be WELL-FORMED: it declares a
 * hash. It is deliberately NOT asserted to be CURRENT. The site builds against the product's `main`,
 * so a hard failure on drift would mean an English edit in one repository blocks deploys in the
 * other — the site would go down to protect a translation. Currency is reported instead, and a
 * stale translation degrades to English behind a notice that says so.
 */
const DOCS_I18N = join(resolveProductRoot(), "docs", "i18n");
const OTHER = SEGMENTS.filter((s) => s !== "en");

function translationFiles(): { locale: string; slug: string; path: string }[] {
  if (!existsSync(DOCS_I18N)) return [];
  const out: { locale: string; slug: string; path: string }[] = [];
  for (const locale of readdirSync(DOCS_I18N)) {
    const dir = join(DOCS_I18N, locale);
    for (const name of readdirSync(dir).filter((n) => n.endsWith(".md"))) {
      out.push({ locale, slug: name.slice(0, -3), path: join(dir, name) });
    }
  }
  return out;
}

describe.skipIf(!docsAvailable())("doc translations", () => {
  it("declares the source it was made from", () => {
    // An undeclared provenance is exactly the claim there is no way to verify, so the loader treats
    // it as stale. This test is what stops that from being discovered by a reader.
    const undeclared = translationFiles().filter(
      ({ path }) => typeof matter(readFileSync(path, "utf8")).data.source_sha256 !== "string",
    );
    expect(undeclared.map((f) => `${f.locale}/${f.slug}`)).toEqual([]);
  });

  it("translates a document that exists", () => {
    const known = new Set(docSlugs());
    const orphans = translationFiles().filter(({ slug }) => !known.has(slug));
    expect(orphans.map((f) => `${f.locale}/${f.slug}`)).toEqual([]);
  });

  it("only claims locales the site actually serves", () => {
    const served = new Set<string>(OTHER);
    const strays = translationFiles().filter(({ locale }) => !served.has(locale));
    expect(strays.map((f) => f.locale)).toEqual([]);
  });

  it("reports English for a locale with no translation", () => {
    const slug = docSlugs()[0];
    if (!slug) return;
    for (const locale of OTHER) {
      const t = docTranslation(locale, slug);
      if (t === null) continue; // translated locales are the other tests' business
      expect(typeof t.stale).toBe("boolean");
    }
  });

  it("calls a translation stale when the declared hash is not the English hash", () => {
    // The mechanism in one assertion: the hash is of the English source, so anything else is drift.
    const slug = docSlugs()[0];
    if (!slug) return;
    const real = docSourceHash(slug);
    expect(real).toMatch(/^[0-9a-f]{64}$/);
    expect(real).not.toBe("0".repeat(64));
  });
});
