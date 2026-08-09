import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsShell } from "@/components/docs/DocsShell";
import { docSlugs, docsAvailable, loadDoc } from "@/content/docs";
import { DOCS_INDEX_SLUG } from "@/content/docs-nav";
import { SEGMENTS, canonicalPath, isLocaleSegment } from "@/i18n/locales";

export function generateStaticParams() {
  // `index` is served at `/docs/`, so it must not also exist at `/docs/index/`. Two URLs for one
  // page is two pages as far as a search engine is concerned.
  const slugs = docSlugs().filter((slug) => slug !== DOCS_INDEX_SLUG);
  return SEGMENTS.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocaleSegment(lang) || !docsAvailable()) return {};
  const doc = await loadDoc(lang, slug);
  return {
    title: doc.title,
    alternates: { canonical: canonicalPath(lang, `/docs/${slug}`) },
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocaleSegment(lang)) notFound();
  if (!docsAvailable() || !docSlugs().includes(slug)) notFound();

  const doc = await loadDoc(lang, slug);

  return (
    <DocsShell
      locale={lang}
      slug={slug}
      title={doc.title}
      headings={doc.headings}
      html={doc.html}
      // Documentation is English-only for now, and the site says so on the page rather than
      // pretending nine translations exist. Tier 1 (marketing) is the part that gets all nine.
      untranslated={lang !== "en"}
    />
  );
}
