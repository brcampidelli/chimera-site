import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORY_LABEL } from "@/app/[lang]/blog/page";
import { blogHref, postBySlug, posts, releaseTagUrl, translationsOf } from "@/content/blog";
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

/**
 * The articles the piece was written from, rendered from frontmatter.
 *
 * The body above is ours, which is the whole point of the format and also its risk: an agent wrote
 * it and merged it with nobody reading it first. So what a reader can check — headline, outlet,
 * date, link — stays in data, below the argument, where it can be compared against what the
 * argument claimed. Prose cannot contradict these fields because prose is not where they live.
 */
function Sources({
  locale,
  post,
}: {
  locale: LocaleSegment;
  post: NonNullable<ReturnType<typeof postBySlug>>;
}) {
  const t = translator(locale);
  const sources = post.sources ?? [];
  if (sources.length === 0) return null;

  return (
    <section className="mt-12 border-t border-hairline pt-6">
      <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
        {t("blog.sourcesHeading")}
      </h2>
      {/* Numerada, e a numeração é visível. The body cites `[1]`, `[3]`, and a reader who cannot
          see which entry is which is holding a pointer to nothing. Gaps are normal and honest:
          this list is what the piece was written from, not a reference list, so a story that was
          read and not cited still belongs here. */}
      <ol className="mt-4 grid gap-3">
        {sources.map((item, i) => (
          <li key={item.url} className="surface flex gap-3 p-4">
            <span className="shrink-0 font-mono text-sm text-muted-foreground">{i + 1}</span>
            <div>
              <a
                href={item.url}
                rel="noreferrer nofollow"
                className="focus-ring rounded text-sm hover:text-accent2"
              >
                {item.headline}
              </a>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {item.outlet} · <time dateTime={item.published}>{item.published}</time>
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* What the run looked at and threw away. A run that ships one piece after reading forty
          reads as "there was one story today" unless it says otherwise. */}
      {post.dropped ? (
        <p className="mt-4 max-w-measure text-xs text-muted-foreground">
          {t("blog.dropped")}: {post.dropped}
        </p>
      ) : null}
    </section>
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

      {/* Said before the piece, not after it. A reader who is three paragraphs in has already
          decided how to read them, and finding out then that this is our reading of someone
          else's reporting is finding out too late. */}
      {post.category === "analysis" ? (
        <p className="mt-4 max-w-measure border-l-2 border-l-accent pl-3 text-sm text-muted-foreground">
          {t("blog.analysisCaveat")}
        </p>
      ) : null}
      {post.category === "update" && post.version ? (
        <p className="mt-4 max-w-measure border-l-2 border-l-accent pl-3 text-sm text-muted-foreground">
          {t("blog.updateCaveat")}{" "}
          <a
            href={releaseTagUrl(post.version)}
            rel="noreferrer"
            className="focus-ring rounded text-accent2 hover:text-accent"
          >
            {t("blog.readingSource")} →
          </a>
        </p>
      ) : null}

      <div className="md mt-8 max-w-measure" dangerouslySetInnerHTML={{ __html: rendered.html }} />

      {post.category === "analysis" ? <Sources locale={lang} post={post} /> : null}

      <p className="sr-only">{SITE.url}</p>
    </article>
  );
}
