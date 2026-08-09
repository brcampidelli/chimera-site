import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORY_LABEL } from "@/app/[lang]/blog/page";
import { CATEGORIES, blogHref, type Category } from "@/content/blog";
import { entries } from "@/content/blog-feed";
import { SEGMENTS, canonicalPath, isLocaleSegment, localePath } from "@/i18n/locales";
import { translator } from "@/i18n/messages";

/**
 * Only categories with something in them get a page.
 *
 * An empty category is a promise the site is not keeping, and there is no wording that makes it
 * read as anything other than abandoned.
 */
export function generateStaticParams() {
  return SEGMENTS.flatMap((lang) => {
    const present = new Set(entries(lang).map((entry) => entry.category));
    return CATEGORIES.filter((category) => present.has(category)).map((category) => ({
      lang,
      category,
    }));
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; category: string }>;
}): Promise<Metadata> {
  const { lang, category } = await params;
  if (!isLocaleSegment(lang)) return {};
  const t = translator(lang);
  const label = CATEGORY_LABEL[category as Category];
  return {
    title: label ? t(label) : t("blog.title"),
    alternates: {
      canonical: canonicalPath(lang, `/blog/category/${category}`),
      types: {
        "application/rss+xml": `${localePath(lang, `/blog/category/${category}`)}rss.xml`,
      },
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ lang: string; category: string }>;
}) {
  const { lang, category } = await params;
  if (!isLocaleSegment(lang)) notFound();
  if (!(CATEGORIES as readonly string[]).includes(category)) notFound();

  const t = translator(lang);
  const list = entries(lang).filter((entry) => entry.category === category);
  if (list.length === 0) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <p className="text-sm">
        <Link href={blogHref(lang)} className="focus-ring rounded text-accent2 hover:text-accent">
          ← {t("blog.title")}
        </Link>
      </p>

      <div className="mt-4 flex flex-wrap items-baseline gap-4">
        <h1 className="text-d1">{t(CATEGORY_LABEL[category as Category])}</h1>
        <a
          href={`${localePath(lang, `/blog/category/${category}`)}rss.xml`}
          className="focus-ring rounded-chip border border-hairline px-3 py-1.5 text-sm text-accent2 transition duration-1 ease-out hover:bg-surface-hover"
        >
          {t("blog.feed")}
        </a>
      </div>

      <ul className="mt-8 grid gap-3">
        {list.map((entry) => (
          <li key={`${entry.kind}:${entry.slug}`}>
            <Link
              href={entry.href}
              className="focus-ring surface block p-5 transition duration-1 ease-out hover:bg-surface-hover"
            >
              <time dateTime={entry.date} className="font-mono text-xs text-muted-foreground">
                {entry.date}
              </time>
              <h2 className="mt-2 text-d3">{entry.title}</h2>
              <p className="mt-1.5 max-w-measure text-sm text-muted-foreground">{entry.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
