import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RetractedNotice } from "@/components/evidence/Stat";
import claims from "@/content/claims.json";
import {
  evidence,
  evidenceAvailable,
  formatCI,
  formatDelta,
  formatRate,
  type Measurement,
} from "@/content/evidence";
import { SEGMENTS, alternatesFor, isLocaleSegment, type LocaleSegment } from "@/i18n/locales";
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
  return {
    title: translator(lang)("evidence.title"),
    alternates: alternatesFor(lang, "/evidence"),
  };
}

/** The registry is the single source of which sentence belongs to which measurement. */
const CAVEATS = {
  "weak-lift": claims["weak-lift"].caveat,
  "swe-bench": claims["swe-bench"].caveat,
  "terminal-bench": claims["terminal-bench"].caveat,
} as const;

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-hairline py-2 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-mono tabular-nums">{value}</dd>
    </div>
  );
}

function Card({
  locale,
  measurement,
  claim,
}: {
  locale: LocaleSegment;
  measurement: Measurement;
  claim: "weak-lift" | "swe-bench" | "terminal-bench";
}) {
  const t = translator(locale);
  return (
    <article className="surface p-6">
      <h3 className="text-d3">{measurement.benchmark ?? measurement.suite}</h3>
      <p
        className={[
          "mt-2 inline-block rounded-chip px-2.5 py-0.5 text-xs",
          measurement.significant ? "bg-ok/15 text-ok" : "bg-muted text-muted-foreground",
        ].join(" ")}
      >
        {measurement.significant ? t("evidence.significant") : t("evidence.notSignificant")}
      </p>
      {/* The registered caveat, above the numbers rather than below them: a qualification that
          arrives after the figure arrives after the reader has already believed it. */}
      <p className="mt-3 max-w-measure text-sm text-muted-foreground">{t(CAVEATS[claim])}</p>

      <dl className="mt-4">
        <Row label={t("evidence.baseline")} value={formatRate(measurement.baseline_rate)} />
        <Row label={t("evidence.treatment")} value={formatRate(measurement.treatment_rate)} />
        <Row label={t("evidence.delta")} value={formatDelta(measurement.delta)} />
        <Row label={t("evidence.ci")} value={formatCI(measurement.ci)} />
        <Row label={t("evidence.sample")} value={`n = ${measurement.n}`} />
        <Row label={t("evidence.model")} value={<span className="text-xs">{measurement.model}</span>} />
      </dl>

      {/* The note is the project's own words about what the number does and does not mean. It is
          reproduced verbatim: paraphrasing a caveat is how a caveat gets softened. */}
      <p className="mt-4 max-w-measure whitespace-pre-line text-sm text-muted-foreground">
        {measurement.note}
      </p>

      <p className="mt-4 text-sm">
        <a
          href={`${LINKS.github}/blob/main/${measurement.source}`}
          rel="noreferrer"
          className="focus-ring rounded text-accent2 hover:text-accent"
        >
          {t("evidence.source")}: {measurement.source}
        </a>
      </p>

    </article>
  );
}

export default async function EvidencePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocaleSegment(lang)) notFound();
  if (!evidenceAvailable()) notFound();

  const t = translator(lang);
  const data = evidence();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-d1">{t("evidence.title")}</h1>
      <p className="mt-4 max-w-measure text-lead text-muted-foreground">
        {t("evidence.subtitle")}
      </p>
      <p className="mt-4 max-w-measure text-sm text-muted-foreground">{t("evidence.intro")}</p>
      <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
        {t("evidence.documenting", { version: data.generated_for })}
      </p>

      <div className="mt-10 grid gap-4">
        <Card locale={lang} measurement={data.internal_lift} claim="weak-lift" />
        {data.external.map((measurement, index) => (
          <Card
            key={measurement.benchmark}
            locale={lang}
            measurement={measurement}
            claim={index === 0 ? "swe-bench" : "terminal-bench"}
          />
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-d2">{t("evidence.maturityHeading")}</h2>
        <p className="mt-3 max-w-measure text-sm text-muted-foreground">
          {t("caveat.alphaNotGa")}
        </p>
        <p className="mt-4 font-mono text-d3 tabular-nums">
          {t("evidence.provenOf", { proven: data.maturity.proven, total: data.maturity.total })}
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {data.maturity.surfaces.map((surface) => (
            <li
              key={surface.name}
              className="surface flex items-baseline justify-between px-4 py-2.5 text-sm"
            >
              <span>{surface.name}</span>
              <span className="font-mono tabular-nums text-muted-foreground">
                {surface.proven}/{surface.total}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <RetractedNotice locale={lang} claim="learning-lift">
          <p>
            The agent extracts a skill from every verified success and reads them back on later
            runs. Whether that accumulation makes it measurably better at new tasks was tested
            across seven pre-registered runs. The sixth found a positive; the seventh, with more
            power, cut it to nothing.
          </p>
        </RetractedNotice>
      </section>
    </div>
  );
}
