import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsShell } from "@/components/docs/DocsShell";
import { docsAvailable, loadDoc } from "@/content/docs";
import { DOCS_INDEX_SLUG } from "@/content/docs-nav";
import { SEGMENTS, alternatesFor, isLocaleSegment } from "@/i18n/locales";
import { translator } from "@/i18n/messages";

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
  return {
    title: translator(lang)("docs.title"),
    alternates: alternatesFor(lang, "/docs"),
  };
}

/** `/docs/` is `index.md` — the section landing page, not a page called "index". */
export default async function DocsIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocaleSegment(lang)) notFound();
  if (!docsAvailable()) notFound();

  const doc = await loadDoc(lang, DOCS_INDEX_SLUG);

  return (
    <DocsShell
      locale={lang}
      slug={DOCS_INDEX_SLUG}
      title={doc.title}
      headings={doc.headings}
      html={doc.html}
      untranslated={lang !== "en"}
    />
  );
}
