import type { Metadata, Viewport } from "next";
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
import { SITE } from "@/lib/site";
import { PRE_PAINT_SCRIPT, THEME_COLOR } from "@/lib/theme";
import "@/styles/globals.css";

/**
 * The root layout, and it lives under `[lang]` on purpose.
 *
 * `<html lang>` has to be the page's real language. A layout above this one could not know it —
 * params do not reach the root — so every page would have shipped `lang="en"`, telling screen
 * readers to pronounce Japanese as English and telling search engines nine pages are the same
 * one. Pagefind found it first: it read the whole site as a single English language.
 *
 * The cost is that the bare `/` is not a route. `scripts/postbuild.ts` copies the English home to
 * `out/index.html` after the export — a copy, not a redirect, so the domain answers immediately
 * and the canonical inside it already points at `/`.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: LocaleSegment = isLocaleSegment(lang) ? lang : "en";
  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: "Chimera — the governed, self-evolving agent",
      template: "%s · Chimera",
    },
    description:
      "An open-source agent for your terminal and a desktop app to work with it. Apache-2.0, alpha, and it publishes the benchmarks it lost.",
    icons: { icon: "/favicon.ico", apple: "/brand/chimera-icon.png" },
    alternates: {
      canonical: canonicalPath(locale, "/"),
      // Every language on every page. Someone who lands on the German page from a German search
      // should not have to find the switcher to learn their language exists here.
      languages: Object.fromEntries(LOCALES.map((l) => [l.bcp47, canonicalPath(l.segment, "/")])),
    },
  };
}

export const viewport: Viewport = { themeColor: THEME_COLOR };

export function generateStaticParams() {
  return SEGMENTS.map((lang) => ({ lang }));
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
    <html lang={localeOf(locale).bcp47} suppressHydrationWarning>
      <head>
        {/*
          Theme and motion, resolved before the first frame. React sets these in an effect, which
          runs after the first paint — so without this the page would paint dark and flip. Inline
          on purpose: an external file is one more round-trip in front of the flash it prevents.
        */}
        <script dangerouslySetInnerHTML={{ __html: PRE_PAINT_SCRIPT }} />
      </head>
      <body className="min-h-dvh font-sans text-base antialiased">
        <div className="flex min-h-dvh flex-col">
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
      </body>
    </html>
  );
}
