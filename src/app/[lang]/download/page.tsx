import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Snippet } from "@/components/ui/Snippet";
import {
  downloadFor,
  formatBytes,
  releases,
  type Download,
} from "@/content/releases";
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
  const t = translator(lang);
  return {
    title: t("download.title"),
    description: t("download.subtitle"),
    alternates: { canonical: canonicalPath(lang, "/download") },
  };
}

const PLATFORMS: { platform: Download["platform"]; label: string }[] = [
  { platform: "windows", label: "download.windows" },
  { platform: "macos-arm64", label: "download.macosArm" },
  { platform: "macos-intel", label: "download.macosIntel" },
  { platform: "linux-appimage", label: "download.linuxAppImage" },
  { platform: "linux-deb", label: "download.linuxDeb" },
];

export default async function DownloadPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocaleSegment(lang)) notFound();
  const t = translator(lang);
  const release = releases();
  const copy = { copy: t("common.copy"), copied: t("common.copied") };

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-d1">{t("download.title")}</h1>
      <p className="mt-4 max-w-measure text-lead text-muted-foreground">
        {t("download.subtitle")}
      </p>
      {release ? (
        <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
          {t("download.version", {
            version: release.version,
            date: new Date(release.published).toISOString().slice(0, 10),
          })}
        </p>
      ) : null}

      {/*
        Said before the buttons, and not dismissible. A person who hits SmartScreen with no warning
        concludes the download is malware — which is the correct instinct, and the reason this
        paragraph is above the thing it explains rather than below it.
      */}
      <section className="surface mt-8 border-l-2 border-l-warn p-5">
        <h2 className="text-d3">{t("download.unsignedHeading")}</h2>
        <p className="mt-2 max-w-measure text-sm text-muted-foreground">
          {t("download.unsignedBody")}
        </p>
        <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          <li>{t("download.unsignedWindows")}</li>
          <li>{t("download.unsignedMacos")}</li>
          <li>{t("download.unsignedLinux")}</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-d2">{t("download.appHeading")}</h2>
        <p className="mt-2 max-w-measure text-sm text-muted-foreground">
          {t("download.appBody")}
        </p>
        {release ? (
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {PLATFORMS.map(({ platform, label }) => {
              const download = downloadFor(platform);
              if (!download) return null;
              return (
                <li key={platform}>
                  <a
                    href={download.url}
                    className="focus-ring surface flex h-full flex-col justify-between gap-2 p-5 transition duration-1 ease-out hover:bg-surface-hover"
                  >
                    <span className="text-base font-semibold">{t(label)}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {download.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatBytes(download.bytes)}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        ) : null}
        <p className="mt-5 text-sm">
          {/* Always here, even when the cards resolved: it is the link that keeps working when a
              build is old, and the one place every artefact is listed. */}
          <a
            href={LINKS.releasesLatest}
            rel="noreferrer"
            className="focus-ring rounded text-accent2 hover:text-accent"
          >
            {t("download.allReleases")} →
          </a>
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-d2">{t("download.terminalHeading")}</h2>
        <p className="mt-2 max-w-measure text-sm text-muted-foreground">
          {t("download.terminalBody")}
        </p>
        <div className="mt-5 grid gap-3">
          <Snippet command="pip install chimera-agent" labels={copy} />
          <Snippet command="pip install 'chimera-agent[full]'" labels={copy} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-d2">{t("download.signedHeading")}</h2>
        <p className="mt-2 max-w-measure text-sm text-muted-foreground">
          {t("download.signedBody")}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-d2">{t("download.requirementsHeading")}</h2>
        {/* The repository declares architectures and nothing else. Inventing a minimum macOS
            version here would be the site knowing something the product does not. */}
        <p className="mt-2 max-w-measure text-sm text-muted-foreground">
          {t("download.requirementsBody")}
        </p>
        <p className="mt-3 text-sm">
          <a
            href={LINKS.issues}
            rel="noreferrer"
            className="focus-ring rounded text-accent2 hover:text-accent"
          >
            {t("download.report")} →
          </a>
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-d2">{t("download.alphaHeading")}</h2>
        <p className="mt-2 max-w-measure text-sm text-muted-foreground">
          {t("download.alphaBody")}
        </p>
      </section>
    </div>
  );
}
