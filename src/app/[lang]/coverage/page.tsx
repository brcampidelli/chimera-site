import type { Metadata } from "next";
import { notFound } from "next/navigation";
import pending from "@/i18n/messages/_pending.json";
import { LOCALES, SEGMENTS, alternatesFor, isLocaleSegment } from "@/i18n/locales";
import { KEYS, dictionaries } from "@/i18n/messages";
import { translator } from "@/i18n/messages";
import { TIER1_PREFIXES } from "../../../../scripts/i18n-pending";

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
    title: translator(lang)("coverage.title"),
    alternates: alternatesFor(lang, "/coverage"),
  };
}

/**
 * The translation debt, published.
 *
 * A site claiming nine languages owes its readers a straight answer about what that means. This
 * page is the same number CI enforces — not a summary of it, the number itself, read from the file
 * the gate reads.
 */
export default async function CoveragePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocaleSegment(lang)) notFound();
  const t = translator(lang);
  const dicts = dictionaries();
  const tier1 = KEYS.filter((key) => TIER1_PREFIXES.some((p) => key.startsWith(p)));

  const rows = LOCALES.map((locale) => {
    const table = dicts[locale.segment];
    const done = KEYS.filter((key) => key in table).length;
    const tier1Done = tier1.filter((key) => key in table).length;
    return {
      locale,
      done,
      total: KEYS.length,
      tier1Done,
      tier1Total: tier1.length,
    };
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-d1">{t("coverage.title")}</h1>
      <p className="mt-4 max-w-measure text-lead text-muted-foreground">{t("coverage.subtitle")}</p>
      <p className="mt-4 max-w-measure text-sm text-muted-foreground">{t("coverage.body")}</p>
      <p className="mt-4 max-w-measure text-sm text-muted-foreground">{t("coverage.ratchet")}</p>

      <table className="mt-8 w-full text-sm">
        <thead>
          <tr className="border-b border-hairline text-left text-xs uppercase tracking-widest text-muted-foreground">
            <th scope="col" className="py-2">
              {t("coverage.language")}
            </th>
            <th scope="col" className="py-2">
              {t("coverage.tier1")}
            </th>
            <th scope="col" className="py-2">
              {t("coverage.everything")}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.locale.segment} className="border-b border-hairline">
              <th scope="row" className="py-2.5 text-left font-normal">
                <span lang={row.locale.bcp47}>{row.locale.endonym}</span>
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  {row.locale.bcp47}
                </span>
              </th>
              <td className="py-2.5 font-mono tabular-nums">
                {row.tier1Done === row.tier1Total ? (
                  <span className="text-ok">
                    {row.tier1Done}/{row.tier1Total}
                  </span>
                ) : (
                  <span className="text-bad">
                    {row.tier1Done}/{row.tier1Total}
                  </span>
                )}
              </td>
              <td className="py-2.5 font-mono tabular-nums text-muted-foreground">
                {row.done}/{row.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-6 font-mono text-xs text-muted-foreground">
        {t("coverage.cap", { pending: pending.keys.length, cap: pending.maxPending })}
      </p>
    </div>
  );
}
