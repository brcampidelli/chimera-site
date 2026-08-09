import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  LOCALES,
  SEGMENTS,
  canonicalPath,
  isLocaleSegment,
  localeOf,
  type LocaleSegment,
} from "@/i18n/locales";
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
    alternates: {
      canonical: canonicalPath(lang, "/"),
      // Every language, on every page. A visitor who lands on the German page from a German
      // search should not have to find the switcher to discover their language exists.
      languages: Object.fromEntries(
        LOCALES.map((l) => [l.bcp47, canonicalPath(l.segment, "/")]),
      ),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocaleSegment(lang)) notFound();
  const locale: LocaleSegment = lang;
  const t = translator(locale);

  return (
    <div lang={localeOf(locale).bcp47} className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="focus-ring sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-chip focus:bg-card focus:px-4 focus:py-2 focus:text-sm"
      >
        {t("common.skipToContent")}
      </a>
      <Header locale={locale} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer locale={locale} />
    </div>
  );
}
