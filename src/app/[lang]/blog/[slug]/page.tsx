import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORY_LABEL } from "@/app/[lang]/blog/page";
import { blogHref, postBySlug, posts, translationsOf } from "@/content/blog";
import { renderMarkdown } from "@/content/markdown";
import {
  SEGMENTS,
  canonicalPath,
  isLocaleSegment,
  localeOf,
  type LocaleSegment,
} from "@/i18n/locales";
import { translator } from "@/i18n/messages";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return posts().map((post) => ({ lang: post.lang, slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocaleSegment(lang)) return {};
  const post = postBySlug(lang, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: canonicalPath(lang, `/blog/${slug}`),
      // Only the languages the post actually exists in. Claiming a translation that is really the
      // English text is lying to a search engine — the same sin as lying to a reader, different
      // audience.
      languages: Object.fromEntries(
        translationsOf(slug).map((l) => [localeOf(l).bcp47, canonicalPath(l, `/blog/${slug}`)]),
      ),
    },
  };
}

function PaperCard({ locale, post }: { locale: LocaleSegment; post: NonNullable<ReturnType<typeof postBySlug>> }) {
  const t = translator(locale);
  const readLabel =
    post.read === "full"
      ? t("blog.paperReadFull")
      : post.read === "partial"
        ? t("blog.paperReadPartial")
        : t("blog.paperReadAbstract");

  return (
    <aside className="surface mt-6 border-l-2 border-l-accent p-5">
      <h2 className="text-d3">{t("blog.paperHeading")}</h2>
      <p className="mt-2 max-w-measure text-sm text-muted-foreground">{t("blog.paperCaveat")}</p>
      <dl className="mt-4 grid gap-2 text-sm">
        <div className="flex gap-3">
          <dt className="w-40 shrink-0 text-muted-foreground">{t("blog.paperArxiv")}</dt>
          <dd>
            <a
              href={`https://arxiv.org/abs/${post.arxiv}`}
              rel="noreferrer"
              className="focus-ring rounded font-mono text-accent2 hover:text-accent"
            >
              {post.arxiv}
            </a>
          </dd>
        </div>
        <div className="flex gap-3">
          <dt className="w-40 shrink-0 text-muted-foreground">{t("blog.paperRead")}</dt>
          <dd>{readLabel}</dd>
        </div>
        {post.coverage ? (
          <div className="flex gap-3">
            <dt className="w-40 shrink-0 text-muted-foreground">{t("blog.paperCoverage")}</dt>
            <dd>{post.coverage}</dd>
          </div>
        ) : null}
        <div className="flex gap-3">
          <dt className="w-40 shrink-0 text-muted-foreground">{t("blog.paperVerdict")}</dt>
          <dd className="font-semibold">{t(`blog.verdict${post.verdict?.replace(/^./, (c) => c.toUpperCase())}`)}</dd>
        </div>
        {post.relevance ? (
          <div className="flex gap-3">
            <dt className="w-40 shrink-0 text-muted-foreground">{t("blog.paperRelevance")}</dt>
            <dd className="max-w-measure">{post.relevance}</dd>
          </div>
        ) : null}
      </dl>
    </aside>
  );
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocaleSegment(lang)) notFound();
  const post = postBySlug(lang, slug);
  if (!post) notFound();

  const t = translator(lang);
  // Blog posts link outward, never to `docs/*.md`, so nothing needs rewriting — an unexpected
  // relative link is left exactly as written rather than guessed at.
  const rendered = await renderMarkdown(post.body, (target) => target);

  return (
    <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <p className="text-sm">
        <Link href={blogHref(lang)} className="focus-ring rounded text-accent2 hover:text-accent">
          ← {t("blog.title")}
        </Link>
      </p>

      <div className="mt-4 flex flex-wrap items-baseline gap-3">
        <span className="rounded-chip bg-surface-2 px-2.5 py-0.5 text-xs text-muted-foreground">
          {t(CATEGORY_LABEL[post.category])}
        </span>
        <time dateTime={post.date} className="font-mono text-xs text-muted-foreground">
          {t("blog.published", { date: post.date })}
        </time>
        {post.updated ? (
          <time dateTime={post.updated} className="font-mono text-xs text-muted-foreground">
            {t("blog.updated", { date: post.updated })}
          </time>
        ) : null}
      </div>

      <h1 className="mt-3 text-d2">{post.title}</h1>
      <p className="mt-3 max-w-measure text-lead text-muted-foreground">{post.summary}</p>

      {post.category === "papers" ? <PaperCard locale={lang} post={post} /> : null}

      <div className="md mt-8 max-w-measure" dangerouslySetInnerHTML={{ __html: rendered.html }} />

      <p className="sr-only">{SITE.url}</p>
    </article>
  );
}
