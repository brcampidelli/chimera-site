import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UntranslatedNotice } from "@/components/ui/UntranslatedNotice";
import { SEGMENTS, alternatesFor, isLocaleSegment } from "@/i18n/locales";
import { translator } from "@/i18n/messages";
import { CONTACT } from "@/lib/site";

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
    title: translator(lang)("terms.title"),
    alternates: alternatesFor(lang, "/terms"),
  };
}

/**
 * Terms for the hosted S1-Pro API. The open-source agent is governed by its Apache-2.0 licence and
 * is not covered here. Written in English and Portuguese only: machine-translating legal text into
 * seven more languages would publish promises nobody has read in those languages.
 */
const SECTIONS = ["service", "keys", "use", "decisions", "data", "availability", "fees", "ip", "liability", "changes"] as const;

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocaleSegment(lang)) notFound();
  const t = translator(lang);

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-d1">{t("terms.title")}</h1>
      <UntranslatedNotice locale={lang} prefix="terms." />
      <p className="surface mt-5 max-w-measure border-l-2 border-l-warn p-4 text-sm text-muted-foreground">
        {t("terms.status")}
      </p>
      <p className="mt-6 max-w-measure text-prose text-muted-foreground">{t("terms.intro")}</p>
      {SECTIONS.map((s) => (
        <section key={s} className="mt-8">
          <h2 className="text-d3">{t(`terms.${s}.heading`)}</h2>
          <p className="mt-2 max-w-measure text-prose text-muted-foreground">{t(`terms.${s}.body`)}</p>
        </section>
      ))}
      <p className="mt-10 max-w-measure text-prose text-muted-foreground">
        {t("terms.contact")}{" "}
        <a href={`mailto:${CONTACT.support}`} className="focus-ring rounded text-accent2 hover:text-accent">
          {CONTACT.support}
        </a>
      </p>
    </div>
  );
}
