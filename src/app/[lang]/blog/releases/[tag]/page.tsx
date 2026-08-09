import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogHref } from "@/content/blog";
import { renderMarkdown } from "@/content/markdown";
import { releases } from "@/content/releases";
import { SEGMENTS, canonicalPath, isLocaleSegment } from "@/i18n/locales";
import { translator } from "@/i18n/messages";

/**
 * A release note, published as written.
 *
 * Not rewritten into a post. The CHANGELOG and the GitHub release already hold this text; a third
 * version would be a third thing to keep in step, and two of the three would fall behind. Nobody
 * can author one of these either — `blog.test.ts` rejects a hand-written `release` post.
 */
export function generateStaticParams() {
  const data = releases();
  if (!data) return [];
  return SEGMENTS.flatMap((lang) => data.history.map((release) => ({ lang, tag: release.tag })));
}

function noteFor(tag: string) {
  return releases()?.history.find((release) => release.tag === tag);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; tag: string }>;
}): Promise<Metadata> {
  const { lang, tag } = await params;
  if (!isLocaleSegment(lang)) return {};
  const note = noteFor(tag);
  if (!note) return {};
  return {
    title: note.name,
    alternates: { canonical: canonicalPath(lang, `/blog/releases/${tag}`) },
  };
}

export default async function ReleasePost({
  params,
}: {
  params: Promise<{ lang: string; tag: string }>;
}) {
  const { lang, tag } = await params;
  if (!isLocaleSegment(lang)) notFound();
  const note = noteFor(tag);
  if (!note) notFound();

  const t = translator(lang);
  const rendered = await renderMarkdown(note.body, (target) => target);

  return (
    <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <p className="text-sm">
        <Link href={blogHref(lang)} className="focus-ring rounded text-accent2 hover:text-accent">
          ← {t("blog.title")}
        </Link>
      </p>

      <div className="mt-4 flex flex-wrap items-baseline gap-3">
        <span className="rounded-chip bg-surface-2 px-2.5 py-0.5 text-xs text-muted-foreground">
          {t("blog.catRelease")}
        </span>
        <time dateTime={note.published} className="font-mono text-xs text-muted-foreground">
          {t("blog.published", { date: note.published.slice(0, 10) })}
        </time>
        <span className="font-mono text-xs text-accent2">{note.tag}</span>
      </div>

      <h1 className="mt-3 text-d2">{note.name}</h1>

      {/* Two facts a reader deserves before the text: this is the note as published, and it is in
          whatever language it was written in. The release notes of this project are written in
          Portuguese, and a reader arriving from an English page should be told rather than left to
          discover it. */}
      <p className="mt-4 max-w-measure text-sm text-muted-foreground">
        {t("blog.releaseNote")} {t("blog.releaseLanguage")}
      </p>

      <div className="md mt-8 max-w-measure" dangerouslySetInnerHTML={{ __html: rendered.html }} />

      <p className="mt-10 border-t border-hairline pt-5 text-sm">
        <a
          href={note.url}
          rel="noreferrer"
          className="focus-ring rounded text-accent2 hover:text-accent"
        >
          {t("blog.readingSource")} →
        </a>
      </p>
    </article>
  );
}
