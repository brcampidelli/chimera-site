import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SEGMENTS, alternatesFor, isLocaleSegment } from "@/i18n/locales";
import { translator } from "@/i18n/messages";
import { LINKS, SITE } from "@/lib/site";
import { THEME_COLOR } from "@/lib/theme";

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
  const t = translator(lang);
  return {
    title: t("press.title"),
    description: t("press.subtitle"),
    alternates: alternatesFor(lang, "/press"),
  };
}

/**
 * The tokens, listed by hand *for display only*.
 *
 * The values that matter are in `tokens.generated.css`, synced from the app and guarded by CI.
 * These are the ones worth naming to somebody designing next to the product, and the test asserts
 * they still exist in the generated file — a swatch chart that has drifted from the palette it
 * documents is the exact failure this site keeps trying not to have.
 */
const SWATCHES = [
  { token: "--accent", label: "Accent" },
  { token: "--accent2", label: "Accent 2" },
  { token: "--background", label: "Background" },
  { token: "--card", label: "Card" },
  { token: "--foreground", label: "Foreground" },
  { token: "--muted-foreground", label: "Muted" },
  { token: "--ok", label: "OK" },
  { token: "--warn", label: "Warn" },
  { token: "--bad", label: "Bad" },
] as const;

const FILES = [
  { src: "/brand/icon.png", key: "press.fileIcon", name: "icon.png", size: 1254 },
  { src: "/brand/mark.png", key: "press.fileMark", name: "mark.png", size: 1254 },
  { src: "/brand/logo-wide.png", key: "press.fileWide", name: "logo-wide.png", size: 2241 },
  { src: "/brand/logo.png", key: "press.fileStacked", name: "logo.png", size: 1254 },
] as const;

export default async function PressPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocaleSegment(lang)) notFound();
  const t = translator(lang);

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-d1">{t("press.title")}</h1>
      <p className="mt-4 max-w-measure text-lead text-muted-foreground">{t("press.subtitle")}</p>

      <section className="mt-10">
        <h2 className="text-d2">{t("press.markHeading")}</h2>
        <p className="mt-3 max-w-measure text-prose text-muted-foreground">
          {t("press.markBody")}
        </p>
        {/* The missing vector, said out loud. A brand page that lists only what exists reads as
            complete; this one is not, and hiding that costs somebody an afternoon. */}
        <p className="surface mt-4 max-w-measure border-l-2 border-l-warn p-4 text-sm text-muted-foreground">
          {t("press.markGap")}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-d2">{t("press.filesHeading")}</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {FILES.map((file) => (
            <li key={file.src} className="surface p-5">
              <div className="brand-ground flex items-center justify-center rounded-lg p-4">
                <Image
                  src={file.src}
                  alt={file.name}
                  width={220}
                  height={110}
                  className="h-24 w-auto object-contain"
                />
              </div>
              <p className="mt-3 font-mono text-xs text-accent2">
                <a href={file.src} className="focus-ring rounded hover:text-accent">
                  {file.name}
                </a>{" "}
                <span className="text-muted-foreground">{file.size}px</span>
              </p>
              <p className="mt-2 max-w-measure text-sm text-muted-foreground">{t(file.key)}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-measure text-sm text-muted-foreground">{t("press.clearance")}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-d2">{t("press.coloursHeading")}</h2>
        <p className="mt-3 max-w-measure text-prose text-muted-foreground">
          {t("press.coloursBody")}
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {SWATCHES.map((swatch) => (
            <li key={swatch.token} className="surface overflow-hidden">
              <div
                className="h-16 w-full"
                style={{ background: `hsl(var(${swatch.token}))` }}
                aria-hidden="true"
              />
              <div className="p-3">
                <p className="text-sm">{swatch.label}</p>
                <p className="font-mono text-xs text-muted-foreground">{swatch.token}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-mono text-xs text-muted-foreground">
          theme-color {THEME_COLOR} · {SITE.domain}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-d2">{t("press.usageHeading")}</h2>
        <p className="mt-3 max-w-measure text-prose text-muted-foreground">
          {t("press.usageBody")}
        </p>
        <p className="mt-4 text-sm">
          <a
            href={LINKS.license}
            rel="noreferrer"
            className="focus-ring rounded text-accent2 hover:text-accent"
          >
            Apache-2.0 →
          </a>
        </p>
      </section>
    </div>
  );
}
