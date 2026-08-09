import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, Cards, Section } from "@/components/ui/Section";
import { Snippet } from "@/components/ui/Snippet";
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
    title: t("agent.title"),
    description: t("agent.lead"),
    alternates: alternatesFor(lang, "/agent"),
  };
}

export default async function AgentPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocaleSegment(lang)) notFound();
  const t = translator(lang);
  const to = (path: string) => localePath(lang, path);
  const copy = { copy: t("common.copy"), copied: t("common.copied") };

  return (
    <>
      <section className="ambient-wash">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6">
          <div data-reveal="in">
            <Wordmark sub="Agent" className="text-d1 leading-none" />
            <p className="mt-6 max-w-measure text-lead text-muted-foreground">{t("agent.lead")}</p>
          </div>
        </div>
      </section>

      <Section heading={t("agent.whatHeading")}>
        <Cards>
          <Card index={0} title={t("agent.what1")} body={t("agent.what1Body")} />
          <Card index={1} title={t("agent.what2")} body={t("agent.what2Body")} />
          <Card index={2} title={t("agent.what3")} body={t("agent.what3Body")} />
          <Card index={3} title={t("agent.what4")} body={t("agent.what4Body")} />
        </Cards>
      </Section>

      <Section heading={t("agent.installHeading")} lead={t("agent.installLead")}>
        <div data-reveal="in" className="grid max-w-3xl gap-3">
          {/* The commands the project documents, not a shorter one invented for a landing page.
              `[full]` is the batteries-included extra; the bare install is the lean one. */}
          <Snippet command="pip install chimera-agent" labels={copy} />
          <Snippet command="chimera init" labels={copy} />
          <Snippet command='chimera solve "add a --json flag to the report command"' labels={copy} />
        </div>
        <p data-reveal="in" className="mt-6">
          <Link
            href={to("/docs/usage")}
            className="focus-ring rounded text-sm text-accent2 hover:text-accent"
          >
            {t("nav.docs")} →
          </Link>
        </p>
      </Section>

      <Section heading={t("agent.modelsHeading")}>
        <p data-reveal="in" className="max-w-measure text-prose text-muted-foreground">
          {t("agent.modelsBody")}
        </p>
        <div data-reveal="in" className="mt-6 grid max-w-3xl gap-3">
          <Snippet command="export CHIMERA_MODEL=ollama/llama3.1" labels={copy} />
        </div>
      </Section>
    </>
  );
}
