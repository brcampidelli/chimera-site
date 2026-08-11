import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { resolveProductRoot } from "../../scripts/sync-tokens";
import { DOCS_INDEX_SLUG, NAV_SLUGS } from "./docs-nav";
import { renderMarkdown, type Rendered } from "./markdown";
import { localePath, type LocaleSegment } from "@/i18n/locales";
import { LINKS } from "@/lib/site";

/**
 * The documentation lives in the product repository, in `docs/`, and is read from there at build
 * time.
 *
 * It stays there on purpose: documentation next to the code is updated in the same pull request
 * that changes the behaviour, and documentation in another repository diverges by construction.
 * The site is a renderer, not a second home.
 */
const DOCS_DIR = join(resolveProductRoot(), "docs");

export interface DocSummary {
  readonly slug: string;
  readonly title: string;
}

export function docsAvailable(): boolean {
  return existsSync(DOCS_DIR);
}

/** Every `.md` in the product's docs directory, by slug. */
export function docSlugs(): string[] {
  if (!docsAvailable()) return [];
  return readdirSync(DOCS_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.slice(0, -3))
    .sort();
}

export function docSource(slug: string): string {
  return readFileSync(join(DOCS_DIR, `${slug}.md`), "utf8");
}

/**
 * Translations live beside the English they mirror, in the product repository.
 *
 * `docs/i18n/<locale>/<slug>.md`, and the location is the argument this file already makes about
 * itself: documentation kept away from the thing it documents diverges by construction. A change to
 * `usage.md` shows its eight translations in the same diff, or it does not show them at all.
 *
 * A subdirectory rather than a `usage.pt.md` sibling, because `docSlugs()` lists `DOCS_DIR` and
 * would otherwise invent a slug called `usage.pt` — and `docs-nav.test.ts` would then fail for the
 * right reason about the wrong thing.
 */
const TRANSLATIONS_DIR = join(DOCS_DIR, "i18n");

/** The SHA-256 a translation must declare to be considered current. */
export function docSourceHash(slug: string): string {
  return createHash("sha256").update(docSource(slug), "utf8").digest("hex");
}

export interface DocTranslation {
  readonly body: string;
  /** True when the English has changed since this translation was made. */
  readonly stale: boolean;
}

/**
 * The translation for a locale, or null when there is none.
 *
 * Every translation declares `source_sha256` — the hash of the English it was made from. This is
 * the whole mechanism: nine copies of a document that changes every release is nine ways to be
 * quietly wrong, and the only defence that survives contact with a busy week is one a build can
 * check. A stale translation is not rendered; the reader gets the English original and a notice
 * saying why, which is the behaviour this site already had for "not translated at all".
 *
 * A translation with no `source_sha256` is treated as stale rather than trusted: an undeclared
 * provenance is exactly the claim we have no way to verify.
 */
export function docTranslation(locale: LocaleSegment, slug: string): DocTranslation | null {
  if (locale === "en") return null;
  const path = join(TRANSLATIONS_DIR, locale, `${slug}.md`);
  if (!existsSync(path)) return null;
  const { data, content } = matter(readFileSync(path, "utf8"));
  const declared = typeof data.source_sha256 === "string" ? data.source_sha256 : "";
  return { body: content, stale: declared !== docSourceHash(slug) };
}

/** Where a doc slug lives on this site. `index` is the section landing page. */
export function docHref(locale: LocaleSegment, slug: string): string {
  return slug === DOCS_INDEX_SLUG
    ? localePath(locale, "/docs")
    : localePath(locale, `/docs/${slug}`);
}

/**
 * Turn a link written for MkDocs into a link that works here — and refuse the ones that do not
 * resolve, rather than emitting a 404 for a reader to find.
 */
export function linkResolver(locale: LocaleSegment, from: string) {
  const known = new Set(docSlugs());
  return (target: string): string => {
    const [path = "", hash] = target.split("#");
    const anchor = hash ? `#${hash}` : "";

    // A link that climbs out of `docs/` points at something real in the repository that has no
    // page here — a benchmark's RESULTS.md, the examples directory, a package. Those resolve to
    // the file on GitHub. Turning them into a 404, or dropping them, would lose the evidence
    // this project's documentation leans on hardest.
    if (path.startsWith("../")) {
      return `${LINKS.github}/blob/main/${path.replace(/^\.\.\//, "")}${anchor}`;
    }

    if (!path.endsWith(".md")) return target;

    const slug = path.replace(/^\.\//, "").slice(0, -3);
    if (!known.has(slug)) {
      throw new Error(`docs/${from}.md links to docs/${path}, which does not exist`);
    }
    return `${docHref(locale, slug)}${anchor}`;
  };
}

/** What the page got, and why — so the notice can say "not translated" or "translated, but stale". */
export interface LoadedDoc extends Rendered {
  readonly state: "english" | "translated" | "stale";
}

export async function loadDoc(locale: LocaleSegment, slug: string): Promise<LoadedDoc> {
  const resolve = linkResolver(locale, slug);
  const translation = docTranslation(locale, slug);
  if (translation && !translation.stale) {
    return { ...(await renderMarkdown(translation.body, resolve)), state: "translated" };
  }
  // Stale falls back to English on purpose. A translation that has drifted is worse than no
  // translation: the reader cannot tell which sentences still hold, and neither can we.
  const state = translation ? "stale" : locale === "en" ? "translated" : "english";
  return { ...(await renderMarkdown(docSource(slug), resolve)), state };
}

/** Titles for the nav, read from each file's `# ` heading rather than restated in the nav. */
export function docTitles(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const slug of docSlugs()) {
    const match = docSource(slug).match(/^#\s+(.+)$/m);
    out[slug] = match ? match[1]!.trim() : slug;
  }
  return out;
}

/** Nav order first, then anything the nav has not claimed yet — the test forbids the second case. */
export function orderedSlugs(): string[] {
  const all = docSlugs();
  const claimed = NAV_SLUGS.filter((slug) => all.includes(slug));
  const rest = all.filter((slug) => !NAV_SLUGS.includes(slug));
  return [...claimed, ...rest];
}
