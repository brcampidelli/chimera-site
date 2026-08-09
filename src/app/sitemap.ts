import type { MetadataRoute } from "next";
import { posts } from "@/content/blog";
import { CATEGORIES } from "@/content/blog";
import { entries } from "@/content/blog-feed";
import { cliAvailable, topLevel } from "@/content/cli";
import { docSlugs, docsAvailable } from "@/content/docs";
import { DOCS_INDEX_SLUG } from "@/content/docs-nav";
import { releases } from "@/content/releases";
import { skills, skillsAvailable } from "@/content/skills";
import { LOCALES, SEGMENTS, canonicalPath, type LocaleSegment } from "@/i18n/locales";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Every page, in every language, with its alternates.
 *
 * Built from the same functions that build the routes, so a sitemap cannot list a page that does
 * not exist or miss one that does — the two would drift the first time a section was added, and
 * nobody notices a missing sitemap entry until they wonder why a page never gets indexed.
 */
function url(path: string) {
  return {
    url: `${SITE.url}${canonicalPath("en", path)}`,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l.bcp47, `${SITE.url}${canonicalPath(l.segment, path)}`]),
      ),
    },
  };
}

/** Pages that exist in one language only get one entry, not nine. */
function single(locale: LocaleSegment, path: string) {
  return { url: `${SITE.url}${canonicalPath(locale, path)}` };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const marketing = [
    "/",
    "/agent",
    "/desktop",
    "/download",
    "/docs",
    "/cli",
    "/blog",
    "/skills",
    "/evidence",
    "/press",
    "/privacy",
    "/coverage",
  ].map(url);

  const docs = docsAvailable()
    ? docSlugs()
        .filter((slug) => slug !== DOCS_INDEX_SLUG)
        .map((slug) => url(`/docs/${slug}`))
    : [];

  const commands = cliAvailable() ? topLevel().map((c) => url(`/cli/${c.name}`)) : [];

  const cards = skillsAvailable() ? skills().map((s) => url(`/skills/${s.slug}`)) : [];

  const notes = (releases()?.history ?? []).map((r) => url(`/blog/releases/${r.tag}`));

  // A post exists in the languages it was written in, and the sitemap says only that.
  const written = posts().map((post) => single(post.lang, `/blog/${post.slug}`));

  const categories = SEGMENTS.flatMap((lang) => {
    const present = new Set(entries(lang).map((entry) => entry.category));
    return CATEGORIES.filter((c) => present.has(c)).map((c) =>
      single(lang, `/blog/category/${c}`),
    );
  });

  return [...marketing, ...docs, ...commands, ...cards, ...notes, ...written, ...categories];
}
