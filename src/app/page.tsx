import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Home } from "@/components/home/Home";
import { DEFAULT_LOCALE, LOCALES, canonicalPath, localeOf } from "@/i18n/locales";
import { translator } from "@/i18n/messages";

/**
 * The bare domain. It renders the same component as `/en/`, so there is one home page and two
 * addresses rather than two home pages — and the canonical below settles which address is the
 * real one.
 *
 * A redirect would have been the other answer and a worse one: a static export cannot redirect
 * without a meta refresh, and a meta refresh on the root of a site is a visible stutter on every
 * first visit.
 */
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: Object.fromEntries(LOCALES.map((l) => [l.bcp47, canonicalPath(l.segment, "/")])),
  },
};

export default function RootHome() {
  const t = translator(DEFAULT_LOCALE);
  return (
    <div lang={localeOf(DEFAULT_LOCALE).bcp47} className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="focus-ring sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-chip focus:bg-card focus:px-4 focus:py-2 focus:text-sm"
      >
        {t("common.skipToContent")}
      </a>
      <Header locale={DEFAULT_LOCALE} />
      <main id="main" className="flex-1">
        <Home locale={DEFAULT_LOCALE} />
      </main>
      <Footer locale={DEFAULT_LOCALE} />
    </div>
  );
}
