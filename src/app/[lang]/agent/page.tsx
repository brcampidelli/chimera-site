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
          {/* The learned-skill loop, which this grid described everything around and never named —
              on the page for the terminal agent, which is the thing that writes the cards and
              reads them back. The pending state is part of the claim, not a footnote to it: a card
              distilled from a run that read untrusted content stays out of retrieval until a human
              approves it. */}
          <Card index={4} title={t("agent.what5")} body={t("agent.what5Body")} />
        </Cards>
      </Section>

      <Section heading={t("agent.installHeading")} lead={t("agent.installLead")}>
        {/*
          `grid-cols-1` rather than the bare `grid`, and it is load-bearing.

          An implicit `auto` column is sized to the max-content of its widest item, so a command
          longer than the viewport widens the track instead of scrolling inside it — and the whole
          page scrolls sideways. `grid-cols-1` is `minmax(0, 1fr)`, which caps the track at the
          container; `Snippet`'s `<code>` is already `min-w-0 overflow-x-auto`, so from there the
          command scrolls in its own box.

          Measured on the built page at 640px in Russian, which has the widest copy button of the
          ten: without this the document overflowed its viewport by 75px, and even the shorter
          command this section used to show was twelve characters from doing the same.
        */}
        <div data-reveal="in" className="grid max-w-3xl grid-cols-1 gap-3">
          {/* The commands the project documents, not a shorter one invented for a landing page.
              `[full]` is the batteries-included extra; the bare install is the lean one. The lead
              above used to promise everything for the bare one, and the line that would have made
              that true was named in this comment and never rendered.

              `--verify` is not decoration either: the card at the top of this page promises the run
              is reverted when the check fails, and the CLI does not auto-detect a verification
              command — `resolve_verify` lives in `chimera/api/`, not in the CLI path. Without the
              flag the strongest authority on the receipt is a diff and a reviewing model, which is
              not what the card said. */}
          <Snippet command="pip install chimera-agent" labels={copy} />
          <Snippet command="pip install 'chimera-agent[full]'" labels={copy} />
          <Snippet command="chimera init" labels={copy} />
          <Snippet
            command={'chimera solve "add a --json flag to the report command" --verify "pytest -q"'}
            labels={copy}
          />
        </div>

        {/*
          The page that hands out copyable commands for an agent that edits files and runs a shell
          is the page that has to say the fence is down. The home page already says the taint layer
          is opt-in; this one shipped the commands without it.
        */}
        <div data-reveal="in" className="surface mt-8 max-w-3xl border-l-2 border-l-warn p-5">
          <p className="max-w-measure text-sm text-muted-foreground">{t("agent.fenceNote")}</p>
          <p className="mt-3 text-sm">
            <Link
              href={to("/docs/security")}
              className="focus-ring rounded text-accent2 hover:text-accent"
            >
              {t("docs.navSecurity")} →
            </Link>
          </p>
        </div>

        <p data-reveal="in" className="mt-6">
          {/* `agent.commandsCta` was translated into ten languages and referenced by nothing, while
              this link borrowed `nav.docs` and pointed at one page of prose. `/cli` is generated
              from the product's own command snapshot, which is what "every command" means. */}
          <Link
            href={to("/cli")}
            className="focus-ring rounded text-sm text-accent2 hover:text-accent"
          >
            {t("agent.commandsCta")} →
          </Link>
        </p>
      </Section>

      <Section heading={t("agent.modelsHeading")}>
        <p data-reveal="in" className="max-w-measure text-prose text-muted-foreground">
          {t("agent.modelsBody")}
        </p>
        <div data-reveal="in" className="mt-6 grid max-w-3xl grid-cols-1 gap-3">
          <Snippet command="export CHIMERA_MODEL=ollama/llama3.1" labels={copy} />
        </div>
        <p data-reveal="in" className="mt-6">
          {/* The other orphan: a section about connecting a model, with no link to the page that
              explains how, and a translated key named for exactly that sitting unused. */}
          <Link
            href={to("/docs/usage")}
            className="focus-ring rounded text-sm text-accent2 hover:text-accent"
          >
            {t("agent.modelsCta")} →
          </Link>
        </p>
      </Section>
    </>
  );
}
