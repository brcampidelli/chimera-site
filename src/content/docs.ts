import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
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

export async function loadDoc(locale: LocaleSegment, slug: string): Promise<Rendered> {
  return renderMarkdown(docSource(slug), linkResolver(locale, slug));
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
