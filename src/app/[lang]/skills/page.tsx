import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillFilter } from "@/components/skills/SkillFilter";
import { describeSkill, skillHref, skills, skillsAvailable } from "@/content/skills";
import { SEGMENTS, alternatesFor, isLocaleSegment } from "@/i18n/locales";
import { translator } from "@/i18n/messages";
import { LINKS } from "@/lib/site";
import { UntranslatedNotice } from "@/components/ui/UntranslatedNotice";

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
    title: t("skills.title"),
    description: t("skills.subtitle"),
    alternates: alternatesFor(lang, "/skills"),
  };
}

export default async function SkillsIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocaleSegment(lang)) notFound();
  if (!skillsAvailable()) notFound();

  const t = translator(lang);
  const cards = skills().map((skill) => ({
    slug: skill.slug,
    href: skillHref(lang, skill.slug),
    name: skill.name,
    // The description is the one part of a card that can be translated without breaking the hash,
    // the CLI import or what the agent reads at runtime. Everything else stays English by design.
    description: describeSkill(lang, skill).text,
    kind: skill.kind,
    triggers: [...skill.triggers],
    provenance: skill.provenance,
    status: skill.status,
  }));

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-d1">{t("skills.title")}</h1>
      <UntranslatedNotice locale={lang} />
      <p className="mt-4 max-w-measure text-lead text-muted-foreground">{t("skills.subtitle")}</p>

      {/*
        The honest framing of a small library. There is no version of this hub that wins on volume
        against an index that aggregates ninety thousand cards from eleven registries, so the page
        does not pretend to be in that race — it says what it has instead.
      */}
      <p className="mt-4 max-w-measure text-sm text-muted-foreground">{t("skills.positioning")}</p>
      <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
        {t("skills.count", { count: cards.length })}
      </p>

      <div className="mt-8">
        <SkillFilter
          cards={cards}
          labels={{
            search: t("skills.filterSearch"),
            all: t("skills.filterAll"),
            pattern: t("skills.filterPattern"),
            antiPattern: t("skills.filterAntiPattern"),
            noMatch: t("skills.noMatch"),
          }}
        />
      </div>

      <section className="surface mt-12 p-6">
        <h2 className="text-d3">{t("skills.contribute")}</h2>
        <p className="mt-2 max-w-measure text-sm text-muted-foreground">
          {t("skills.contributeBody")}
        </p>
        <p className="mt-4 flex flex-wrap gap-4 text-sm">
          <a
            href={`${LINKS.github}/tree/main/skills`}
            rel="noreferrer"
            className="focus-ring rounded text-accent2 hover:text-accent"
          >
            skills/ →
          </a>
          <a href="/skills-index.json" className="focus-ring rounded text-accent2 hover:text-accent">
            {t("skills.indexLink")} →
          </a>
        </p>
      </section>
    </div>
  );
}
