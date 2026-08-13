import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, Cards, Section } from "@/components/ui/Section";
import { Wordmark } from "@/components/Wordmark";
import { SEGMENTS, alternatesFor, isLocaleSegment, localePath } from "@/i18n/locales";
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
  const t = translator(lang);
  return {
    title: t("desktop.title"),
    description: t("desktop.lead"),
    alternates: alternatesFor(lang, "/desktop"),
  };
}

export default async function DesktopPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocaleSegment(lang)) notFound();
  const t = translator(lang);
  const to = (path: string) => localePath(lang, path);

  return (
    <>
      <section className="ambient-wash">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6">
          <div data-reveal="in">
            <Wordmark sub="Desktop" className="text-d1 leading-none" />
            <p className="mt-6 max-w-measure text-lead text-muted-foreground">
              {t("desktop.lead")}
            </p>
          </div>
        </div>
      </section>

      <Section heading={t("desktop.screensHeading")}>
        {/* One entry per destination in the app's rail. `desktop-manual.test.ts` reads the rail
            out of the product and fails if this list gains or loses one — a manual that describes
            a screen nobody has is worse than no manual. */}
        <Cards>
          <Card index={0} title={t("desktop.screen1")} body={t("desktop.screen1Body")} />
          <Card index={1} title={t("desktop.screen2")} body={t("desktop.screen2Body")} />
          <Card index={2} title={t("desktop.screen3")} body={t("desktop.screen3Body")} />
          <Card index={3} title={t("desktop.screen4")} body={t("desktop.screen4Body")} />
          <Card index={4} title={t("desktop.screen5")} body={t("desktop.screen5Body")} />
          <Card index={5} title={t("desktop.screen6")} body={t("desktop.screen6Body")} />
        </Cards>
      </Section>

      <Section heading={t("desktop.installHeading")}>
        <p data-reveal="in" className="max-w-measure text-prose text-muted-foreground">
          {t("desktop.installBody")}
        </p>
        <p data-reveal="in" className="mt-6">
          <Link
            href={to("/download")}
            className="focus-ring rounded-chip bg-accent-grad px-6 py-3 text-base font-semibold text-accent-foreground transition duration-1 ease-out"
          >
            {t("nav.download")}
          </Link>
        </p>
      </Section>
    </>
  );
}
