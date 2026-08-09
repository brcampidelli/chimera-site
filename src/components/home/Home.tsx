import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { Wordmark } from "@/components/Wordmark";
import { localePath, type LocaleSegment } from "@/i18n/locales";
import { translator } from "@/i18n/messages";

interface Props {
  locale: LocaleSegment;
}

/**
 * The home page, shared by `/` and `/en/` so the bare domain works without a redirect and without
 * a second copy of the content.
 *
 * Deliberately number-free at this stage. Every figure this project publishes carries a caveat it
 * is not allowed to travel without, and the component that enforces that pairing arrives with the
 * claims registry — so until then the honest hero is the one that makes no measurable claim.
 */
export function Home({ locale }: Props) {
  const t = translator(locale);
  const to = (path: string) => localePath(locale, path);

  return (
    <>
      <section className="ambient-wash relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-20 sm:px-6 sm:pt-28">
          <div data-reveal="in" className="flex flex-col items-center text-center">
            <BrandMark size={112} className="shadow-elev-lg" priority />
            <Wordmark sub="Agent" className="mt-8 text-d1 leading-none" />
            <p className="mt-8 max-w-measure text-lead text-muted-foreground">
              {t("brand.tagline")}
            </p>
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
        {/* The one deliberate quotation of the app's launch sequence: a hairline drawing itself
            under the hero, once, on the house easing. */}
        <div data-sweep className="mx-auto h-px max-w-6xl bg-accent-grad opacity-60" />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <ul className="grid gap-4 sm:grid-cols-2">
          {[
            { href: to("/agent"), title: t("nav.agent") },
            { href: to("/desktop"), title: t("nav.desktop") },
          ].map((product, i) => (
            <li key={product.href} data-reveal="in" style={{ ["--i" as string]: i }}>
              <Link
                href={product.href}
                className="focus-ring surface block p-6 transition duration-1 ease-out hover:bg-surface-hover"
              >
                <h2 className="text-d3">{product.title}</h2>
                <span className="mt-2 inline-block text-sm text-accent2">
                  {t("common.readMore")} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
