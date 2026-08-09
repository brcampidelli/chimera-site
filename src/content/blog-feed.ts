import { posts, blogHref, type Category } from "./blog";
import { releases } from "./releases";
import { localePath, type LocaleSegment } from "@/i18n/locales";
import { SITE } from "@/lib/site";

/**
 * The two streams, merged into one reading order.
 *
 * A release note and an essay are different things to write and the same thing to read: something
 * new from this project, on a date. The blog shows them together and labels which is which.
 */
export interface Entry {
  readonly kind: "post" | "release";
  readonly slug: string;
  readonly href: string;
  readonly title: string;
  readonly date: string;
  readonly summary: string;
  readonly category: Category;
}

/** The first paragraph of a release body, used as its summary — never a rewrite of it. */
function firstParagraph(body: string): string {
  const paragraph = body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .find((block) => block.length > 0 && !block.startsWith("#") && !block.startsWith("|"));
  return (paragraph ?? "").replace(/\s+/g, " ").slice(0, 280);
}

export function releaseEntries(locale: LocaleSegment): Entry[] {
  const data = releases();
  if (!data) return [];
  return data.history.map((release) => ({
    kind: "release" as const,
    slug: release.tag,
    href: localePath(locale, `/blog/releases/${release.tag}`),
    title: release.name,
    date: release.published.slice(0, 10),
    summary: firstParagraph(release.body),
    category: "release" as Category,
  }));
}

export function postEntries(locale: LocaleSegment): Entry[] {
  return posts()
    .filter((post) => post.lang === locale)
    .map((post) => ({
      kind: "post" as const,
      slug: post.slug,
      href: blogHref(locale, post.slug),
      title: post.title,
      date: post.date,
      summary: post.summary,
      category: post.category,
    }));
}

export function entries(locale: LocaleSegment): Entry[] {
  return [...postEntries(locale), ...releaseEntries(locale)].sort((a, b) =>
    b.date.localeCompare(a.date),
  );
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * An RSS feed per language, and one per category.
 *
 * Developers follow projects by feed, and the content is already structured, so this costs almost
 * nothing. It also degrades honestly: a feed with three entries from August and nothing after says
 * "abandoned" more clearly than any status badge.
 */
export function rss(locale: LocaleSegment, category?: Category): string {
  const list = entries(locale).filter((entry) => !category || entry.category === category);
  const title = category ? `Chimera — ${category}` : "Chimera";
  const path = category ? `/blog/category/${category}` : "/blog";
  const self = `${SITE.url}${localePath(locale, path)}`;

  const items = list
    .map(
      (entry) => `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${SITE.url}${entry.href}</link>
      <guid isPermaLink="true">${SITE.url}${entry.href}</guid>
      <pubDate>${new Date(`${entry.date}T00:00:00Z`).toUTCString()}</pubDate>
      <category>${escapeXml(entry.category)}</category>
      <description>${escapeXml(entry.summary)}</description>
    </item>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${self}</link>
    <atom:link href="${self}rss.xml" rel="self" type="application/rss+xml"/>
    <language>${locale}</language>
    <description>${escapeXml(SITE.name)}</description>
${items}
  </channel>
</rss>
`;
}
