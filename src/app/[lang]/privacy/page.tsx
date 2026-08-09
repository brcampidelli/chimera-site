import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SEGMENTS, canonicalPath, isLocaleSegment } from "@/i18n/locales";
import { translator } from "@/i18n/messages";
import { LINKS } from "@/lib/site";

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
    title: translator(lang)("privacy.title"),
    alternates: { canonical: canonicalPath(lang, "/privacy") },
  };
}

/**
 * One page, three paragraphs, no consent banner.
 *
 * That is a consequence of a decision rather than a shortcut: with no cookies and no analytics
 * there is nothing to ask permission for, and a nine-language site with a consent dialog is a
 * nine-language consent dialog. The footer has linked here since the first commit; it was a broken
 * link until now, which is the kind of thing a site notices about itself only when somebody clicks.
 */
export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocaleSegment(lang)) notFound();
  const t = translator(lang);

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-d1">{t("privacy.title")}</h1>
      <p className="mt-6 max-w-measure text-prose text-muted-foreground">{t("privacy.body")}</p>
      <p className="mt-4 max-w-measure text-prose text-muted-foreground">
        {t("privacy.downloads")}
      </p>
      <p className="mt-4 max-w-measure text-prose text-muted-foreground">
        {t("privacy.contact")}{" "}
        <a
          href={LINKS.issues}
          rel="noreferrer"
          className="focus-ring rounded text-accent2 hover:text-accent"
        >
          {LINKS.issues.replace("https://", "")}
        </a>
      </p>
    </div>
  );
}
