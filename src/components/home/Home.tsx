import Link from "next/link";
import { Stat } from "@/components/evidence/Stat";
import { Hero } from "@/components/home/Hero";
import { Card, Cards, Section } from "@/components/ui/Section";
import { Wordmark } from "@/components/Wordmark";
import { evidenceAvailable } from "@/content/evidence";
import { skillsAvailable } from "@/content/skills";
import { localePath, type LocaleSegment } from "@/i18n/locales";
import { translator } from "@/i18n/messages";

interface Props {
  locale: LocaleSegment;
}

export function Home({ locale }: Props) {
  const t = translator(locale);
  const to = (path: string) => localePath(locale, path);

  return (
    <>
      <section className="ambient-wash relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 sm:pt-28">
          <div data-reveal="in" className="flex flex-col items-center text-center">
            <Hero size={248} alt={t("brand.name")} />
            <Wordmark sub="Agent" className="mt-8 text-d1 leading-none" />
            <p className="mt-8 max-w-measure text-lead text-muted-foreground">{t("home.lead")}</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={to("/download")}
                className="focus-ring rounded-chip bg-accent-grad px-6 py-3 text-base font-semibold text-accent-foreground transition duration-1 ease-out"
              >
                {t("nav.download")}
              </Link>
              <Link
                href={to("/docs")}
                className="focus-ring rounded-chip border border-hairline bg-surface-2 px-6 py-3 text-base transition duration-1 ease-out hover:bg-surface-hover"
              >
                {t("nav.docs")}
              </Link>
            </div>
          </div>
        </div>
        {/* The single deliberate quotation of the app's launch sequence: a hairline drawing itself
            under the hero, once, on the house easing. */}
        <div data-sweep className="mx-auto h-px max-w-6xl bg-accent-grad opacity-60" />
      </section>

      <Section heading={t("home.panelHeading")}>
        <p data-reveal="in" className="max-w-measure text-prose text-muted-foreground">
          {t("home.panelBody")}
        </p>
      </Section>

      <Section heading={t("home.pillarsHeading")}>
        <Cards>
          <Card index={0} title={t("home.pillar1")} body={t("home.pillar1Body")} />
          <Card index={1} title={t("home.pillar2")} body={t("home.pillar2Body")} />
          <Card index={2} title={t("home.pillar3")} body={t("home.pillar3Body")} />
        </Cards>
      </Section>

      {evidenceAvailable() ? (
        <Section heading={t("home.evidenceHeading")}>
          {/*
            Two figures, each rendered by the component that also renders its caveat. There is no
            way to put a number on this page without the sentence that qualifies it — that is the
            point of <Stat>, not a convention someone has to remember.

            Deliberately not animated counters: a number climbing to its final value is the screen
            performing a claim.
          */}
          <div data-reveal="in" className="grid gap-8 sm:grid-cols-3">
            <div>
              <Stat locale={locale} claim="weak-lift" path="internal_lift.delta" as="delta" />
            </div>
            <div>
              <Stat locale={locale} claim="swe-bench" path="external[0].delta" as="delta" />
            </div>
            {/* The third figure is the loss. The pillar directly above this section is titled
                "Benchmarks published, including the losses", and until now this grid showed only
                the two wins — a page asserting a practice in one paragraph and not exercising it
                three paragraphs later. Terminal-Bench is already measured, already registered as a
                claim, and its caveat is already translated; showing it costs no new copy. */}
            <div>
              <Stat locale={locale} claim="terminal-bench" path="external[1].delta" as="delta" />
            </div>
          </div>
          <p data-reveal="in" className="mt-8">
            <Link
              href={to("/evidence")}
              className="focus-ring rounded-chip border border-hairline bg-surface-2 px-5 py-2.5 text-sm transition duration-1 ease-out hover:bg-surface-hover"
            >
              {t("home.evidenceCta")} →
            </Link>
          </p>
        </Section>
      ) : null}

      <Section heading={t("home.productsHeading")}>
        <Cards>
          {[
            { href: to("/agent"), title: t("nav.agent"), body: t("home.agentBlurb") },
            { href: to("/desktop"), title: t("nav.desktop"), body: t("home.desktopBlurb") },
          ].map((product, i) => (
            <li key={product.href} data-reveal="in" style={{ ["--i" as string]: i }}>
              <Link
                href={product.href}
                className="focus-ring surface block h-full p-6 transition duration-1 ease-out hover:bg-surface-hover"
              >
                <h3 className="text-d3">{product.title}</h3>
                <p className="mt-2 max-w-measure text-sm text-muted-foreground">{product.body}</p>
                <span className="mt-3 inline-block text-sm text-accent2">
                  {t("common.readMore")} →
                </span>
              </Link>
            </li>
          ))}
        </Cards>
      </Section>

      {/*
        The skill library, on the page rather than only in the header.

        It was reachable from the nav and from nowhere else, so a reader who scrolled the whole
        home page left without knowing it exists — and it is the part of this project that a
        catalogue with ninety thousand cards cannot copy, because what is on offer is provenance
        rather than volume.

        Guarded exactly like the evidence section: `/skills` calls `notFound()` when the product
        repository is not resolvable, and a home page linking to a 404 is worse than one that says
        nothing.
      */}
      {skillsAvailable() ? (
        <Section heading={t("home.skillsHeading")}>
          <p data-reveal="in" className="max-w-measure text-prose text-muted-foreground">
            {t("home.skillsBody")}
          </p>
          <p data-reveal="in" className="mt-8">
            <Link
              href={to("/skills")}
              className="focus-ring rounded-chip border border-hairline bg-surface-2 px-5 py-2.5 text-sm transition duration-1 ease-out hover:bg-surface-hover"
            >
              {t("nav.skills")} →
            </Link>
          </p>
        </Section>
      ) : null}

      <Section heading={t("home.alphaHeading")}>
        {/* Said on the home page, not buried in a footer. The README insists on it in four places
            and a site that is braver about the software than the software is about itself has
            already started lying. */}
        <p data-reveal="in" className="max-w-measure text-prose text-muted-foreground">
          {t("home.alphaBody")}
        </p>
      </Section>
    </>
  );
}
