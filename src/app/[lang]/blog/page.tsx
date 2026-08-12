import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, categoryHref, type Category } from "@/content/blog";
import { entries } from "@/content/blog-feed";
import { SEGMENTS, alternatesFor, isLocaleSegment, localePath, type LocaleSegment } from "@/i18n/locales";
import { translator } from "@/i18n/messages";
import { UntranslatedNotice } from "@/components/ui/UntranslatedNotice";

export function generateStaticParams() {
  return SEGMENTS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocaleSegment(lang)) return {};
  const t = translator(lang);
  return {
    title: t("blog.title"),
    description: t("blog.subtitle"),
    alternates: {
      ...alternatesFor(lang, "/blog"),
      types: { "application/rss+xml": `${localePath(lang, "/blog")}rss.xml` },
    },
  };
}

export const CATEGORY_LABEL: Record<Category, string> = {
  release: "blog.catRelease",
  terminal: "blog.catTerminal",
  desktop: "blog.catDesktop",
  ai: "blog.catAi",
  llms: "blog.catLlms",
  agents: "blog.catAgents",
  papers: "blog.catPapers",
  analysis: "blog.catAnalysis",
  update: "blog.catUpdate",
};

export function EntryList({ locale }: { locale: LocaleSegment }) {
  const t = translator(locale);
  const list = entries(locale);

  if (list.length === 0) {
    return <p className="text-sm text-muted-foreground">{t("blog.empty")}</p>;
  }

  return (
    <ul className="grid gap-3">
      {list.map((entry) => (
        <li key={`${entry.kind}:${entry.slug}`}>
          <Link
            href={entry.href}
            className="focus-ring surface block p-5 transition duration-1 ease-out hover:bg-surface-hover"
          >
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="rounded-chip bg-surface-2 px-2.5 py-0.5 text-xs text-muted-foreground">
                {t(CATEGORY_LABEL[entry.category])}
              </span>
              <time dateTime={entry.date} className="font-mono text-xs text-muted-foreground">
                {entry.date}
              </time>
            </div>
            <h2 className="mt-2 text-d3">{entry.title}</h2>
            <p className="mt-1.5 max-w-measure text-sm text-muted-foreground">{entry.summary}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function BlogIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocaleSegment(lang)) notFound();
  const t = translator(lang);
  const counts = new Map<Category, number>();
  for (const entry of entries(lang)) {
    counts.set(entry.category, (counts.get(entry.category) ?? 0) + 1);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-d1">{t("blog.title")}</h1>
      <UntranslatedNotice locale={lang} prefix="blog." />
      <p className="mt-4 max-w-measure text-lead text-muted-foreground">{t("blog.subtitle")}</p>

      {/* Only categories that have something. An empty category page is a promise the site is not
          keeping, and there is no version of it that reads as anything but abandoned. */}
      <nav aria-label={t("blog.title")} className="mt-8 flex flex-wrap gap-2">
        {CATEGORIES.filter((category) => (counts.get(category) ?? 0) > 0).map((category) => (
          <Link
            key={category}
            href={categoryHref(lang, category)}
            className="focus-ring rounded-chip border border-hairline bg-surface-2 px-3 py-1.5 text-sm text-muted-foreground transition duration-1 ease-out hover:bg-surface-hover hover:text-foreground"
          >
            {t(CATEGORY_LABEL[category])} · {counts.get(category)}
          </Link>
        ))}
        <a
          href={`${localePath(lang, "/blog")}rss.xml`}
          className="focus-ring rounded-chip border border-hairline px-3 py-1.5 text-sm text-accent2 transition duration-1 ease-out hover:bg-surface-hover"
        >
          {t("blog.feed")}
        </a>
      </nav>

      <div className="mt-8">
        <EntryList locale={lang} />
      </div>
    </div>
  );
}
