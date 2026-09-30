import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Stat } from "@/components/evidence/Stat";
import { UntranslatedNotice } from "@/components/ui/UntranslatedNotice";
import { SEGMENTS, alternatesFor, isLocaleSegment } from "@/i18n/locales";
import { translator } from "@/i18n/messages";
import { CONTACT } from "@/lib/site";

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
    title: t("s1.title"),
    description: t("s1.subtitle"),
    alternates: alternatesFor(lang, "/s1"),
  };
}

/**
 * The request a developer would actually send — the OpenAI-compatible route, because that is the
 * format every client already speaks. Kept as data so the page shows exactly one example.
 */
const EXAMPLE = `curl https://api.chimeraagent.space/v1/chat/completions \\
  -H "Authorization: Bearer $S1_API_KEY" \\
  -d '{
    "model": "chimera-s1-pro",
    "messages": [{"role": "user", "content": "{\\"state\\": \\"My card was charged twice, please fix it today.\\", \\"questions\\": {\\"department\\": {\\"type\\": \\"choice\\", \\"criteria\\": {\\"billing\\": \\"Payment issues\\", \\"technical\\": \\"Bugs\\"}}, \\"urgent\\": {\\"type\\": \\"noul\\", \\"instructions\\": \\"The customer needs help today\\"}}}"}]
  }'`;

/**
 * S1-Pro, announced before launch.
 *
 * Every figure goes through <Stat>, which reads the S1 snapshot (generated from the S1 repository's
 * result files) and prints the registered caveat in the same node. The comparison with Jev is paired
 * against Jev's *published* predictions — no Jev API was used — and the caveat says where the benchmark
 * overlaps our training sources, because a headline without that is the kind of claim this site
 * exists not to make.
 */
export default async function S1Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocaleSegment(lang)) notFound();
  const t = translator(lang);

  const primitives = [
    { name: "Choice", body: t("s1.choiceBody") },
    { name: "Score", body: t("s1.scoreBody") },
    { name: "Yes / No", body: t("s1.noulBody") },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <p className="inline-block rounded-chip bg-accent/15 px-3 py-1 text-xs uppercase tracking-widest text-accent">
        {t("s1.badge")}
      </p>
      <h1 className="mt-4 text-d1">{t("s1.title")}</h1>
      <UntranslatedNotice locale={lang} prefix="s1." />
      <p className="mt-4 max-w-measure text-lead text-muted-foreground">{t("s1.subtitle")}</p>
      <p className="mt-3 max-w-measure text-prose text-muted-foreground">{t("s1.separate")}</p>

      <section className="mt-12">
        <h2 className="text-d2">{t("s1.howHeading")}</h2>
        <p className="mt-3 max-w-measure text-prose text-muted-foreground">{t("s1.howBody")}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {primitives.map((p) => (
            <article key={p.name} className="surface p-5">
              <h3 className="font-mono text-sm text-accent">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-d2">{t("s1.measuredHeading")}</h2>
        <p className="mt-3 max-w-measure text-prose text-muted-foreground">{t("s1.measuredBody")}</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="surface p-5">
            <p className="text-sm text-muted-foreground">{t("s1.jevBench")}</p>
            <Stat locale={lang} claim="s1-jev-bench" path="s1.jev_bench.s1pro" />
            <p className="mt-3 text-sm text-muted-foreground">
              {t("s1.jevReference")}{" "}
              <Stat locale={lang} claim="s1-jev-bench" path="s1.jev_bench.jev" bare />
            </p>
          </div>
          <div className="surface p-5">
            <p className="text-sm text-muted-foreground">{t("s1.jevbenchPublic")}</p>
            <Stat locale={lang} claim="s1-jevbench-public" path="s1.jevbench_public.s1pro" />
          </div>
          <div className="surface p-5">
            <p className="text-sm text-muted-foreground">{t("s1.injection")}</p>
            <Stat locale={lang} claim="s1-injection" path="s1.injection.flip_rate" />
          </div>
          <div className="surface p-5">
            <p className="text-sm text-muted-foreground">{t("s1.rules")}</p>
            <Stat locale={lang} claim="s1-rules" path="s1.declared_rules.s1pro" />
          </div>
          <div className="surface p-5">
            <p className="text-sm text-muted-foreground">{t("s1.abstention")}</p>
            <Stat locale={lang} claim="s1-abstention" path="s1.abstention.confident_wrong_v04" />
          </div>
          <div className="surface p-5">
            <p className="text-sm text-muted-foreground">{t("s1.latency")}</p>
            <p>
              <Stat locale={lang} claim="s1-latency" path="s1.latency.p50_ms_8_clients" as="count" />{" "}
              <span className="text-sm text-muted-foreground">ms</span>
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-d2">{t("s1.apiHeading")}</h2>
        <p className="mt-3 max-w-measure text-prose text-muted-foreground">{t("s1.apiBody")}</p>
        <pre className="surface mt-4 overflow-x-auto p-4 font-mono text-xs leading-relaxed">
          <code>{EXAMPLE}</code>
        </pre>
      </section>

      <section className="surface mt-12 border-l-2 border-l-accent p-6">
        <h2 className="text-d3">{t("s1.launchHeading")}</h2>
        <p className="mt-2 max-w-measure text-prose text-muted-foreground">{t("s1.launchBody")}</p>
        <p className="mt-3 text-sm">
          <a href={`mailto:${CONTACT.partners}`} className="focus-ring rounded text-accent2 hover:text-accent">
            {CONTACT.partners}
          </a>
        </p>
      </section>
    </div>
  );
}
