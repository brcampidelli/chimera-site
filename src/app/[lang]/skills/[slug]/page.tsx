import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Snippet } from "@/components/ui/Snippet";
import { renderMarkdown } from "@/content/markdown";
import {
  SECTIONS,
  cliImportsFromUrl,
  skillBySlug,
  skillHref,
  skillSourceUrl,
  skills,
  skillsAvailable,
  type SectionName,
} from "@/content/skills";
import { SEGMENTS, alternatesFor, isLocaleSegment } from "@/i18n/locales";
import { translator } from "@/i18n/messages";
import { LINKS } from "@/lib/site";

export function generateStaticParams() {
  if (!skillsAvailable()) return [];
  return SEGMENTS.flatMap((lang) => skills().map((skill) => ({ lang, slug: skill.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocaleSegment(lang)) return {};
  const skill = skillBySlug(slug);
  if (!skill) return {};
  return {
    title: skill.name,
    description: skill.description,
    alternates: alternatesFor(lang, `/skills/${slug}`),
  };
}

const SECTION_KEY: Record<SectionName, string> = {
  Trigger: "skills.sectionTrigger",
  Do: "skills.sectionDo",
  Avoid: "skills.sectionAvoid",
  Check: "skills.sectionCheck",
  Risk: "skills.sectionRisk",
};

/** Avoid and Check carry the weight; Do is the section everybody writes. */
const EMPHASISED: readonly SectionName[] = ["Avoid", "Check"];

export default async function SkillPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocaleSegment(lang)) notFound();
  const skill = skillBySlug(slug);
  if (!skill) notFound();

  const t = translator(lang);
  const rendered = await Promise.all(
    SECTIONS.map(async (section) => ({
      section,
      html: (await renderMarkdown(skill.sections[section], (target) => target)).html,
    })),
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <p className="text-sm">
        <Link href={skillHref(lang)} className="focus-ring rounded text-accent2 hover:text-accent">
          ← {t("skills.title")}
        </Link>
      </p>

      <h1 className="mt-4 font-mono text-d2">{skill.name}</h1>
      <p className="mt-3 max-w-measure text-lead text-muted-foreground">{skill.description}</p>

      <div className="mt-5 flex flex-wrap gap-2 text-xs">
        <span className="rounded-chip bg-surface-2 px-2.5 py-1 text-muted-foreground">
          {skill.kind === "pattern" ? t("skills.filterPattern") : t("skills.filterAntiPattern")}
        </span>
        <span className="rounded-chip bg-ok/15 px-2.5 py-1 text-ok">
          {t("skills.provenance")}: {skill.provenance}
        </span>
        <span className="rounded-chip bg-surface-2 px-2.5 py-1 text-muted-foreground">
          {t("skills.status")}: {skill.status}
        </span>
        <span className="rounded-chip bg-surface-2 px-2.5 py-1 font-mono text-muted-foreground">
          v{skill.version} · {skill.license}
        </span>
      </div>

      {/* What "clean" means, stated where the badge is — a label whose meaning lives on another
          page is a label people invent a meaning for. */}
      <p className="mt-4 max-w-measure text-sm text-muted-foreground">
        {t("skills.provenanceCleanBody")}
      </p>

      <section className="mt-8">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
          {t("skills.triggers")}
        </h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {skill.triggers.map((trigger) => (
            <li
              key={trigger}
              className="rounded-chip border border-hairline px-3 py-1 text-sm text-muted-foreground"
            >
              {trigger}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-8 max-w-measure text-sm text-muted-foreground">{t("skills.emphasis")}</p>

      <div className="mt-4 grid gap-4">
        {rendered.map(({ section, html }) => (
          <section
            key={section}
            id={section.toLowerCase()}
            className={[
              "surface scroll-mt-20 p-5",
              EMPHASISED.includes(section) ? "border-l-2 border-l-accent" : "",
            ].join(" ")}
          >
            <h2 className="text-d3">{t(SECTION_KEY[section])}</h2>
            <div className="md mt-3 max-w-measure" dangerouslySetInnerHTML={{ __html: html }} />
          </section>
        ))}
      </div>

      <section className="surface mt-10 p-6">
        <h2 className="text-d3">{t("skills.install")}</h2>
        <p className="mt-2 max-w-measure text-sm text-muted-foreground">
          {t("skills.installBody")}
        </p>
        <div className="mt-4 grid gap-3">
          {/*
            A clone and a path, because that is what the released CLI accepts. `cliImportsFromUrl`
            reads the command's own parameters out of the CLI snapshot, so this page cannot
            advertise a one-liner the installed version does not have.
          */}
          <Snippet
            command={`git clone ${LINKS.github}.git`}
            labels={{ copy: t("common.copy"), copied: t("common.copied") }}
          />
          <Snippet
            command={
              cliImportsFromUrl()
                ? `chimera skills-import ${skill.slug}`
                : `chimera skills-import chimera-agent/${skill.source}`
            }
            labels={{ copy: t("common.copy"), copied: t("common.copied") }}
          />
        </div>
      </section>

      <section className="mt-10 border-t border-hairline pt-6">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
          {t("skills.integrity")}
        </h2>
        <p className="mt-2 max-w-measure text-sm text-muted-foreground">
          {t("skills.integrityBody")}
        </p>
        <p className="mt-2 break-all font-mono text-xs text-muted-foreground">{skill.sha256}</p>
        <p className="mt-4 text-sm">
          <a
            href={skillSourceUrl(skill)}
            rel="noreferrer"
            className="focus-ring rounded text-accent2 hover:text-accent"
          >
            {t("skills.viewSource")} →
          </a>
        </p>
      </section>
    </div>
  );
}
