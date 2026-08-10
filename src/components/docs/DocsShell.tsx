import Link from "next/link";
import { docHref, docTitles } from "@/content/docs";
import { DOCS_NAV } from "@/content/docs-nav";
import type { Heading } from "@/content/markdown";
import type { LocaleSegment } from "@/i18n/locales";
import { translator } from "@/i18n/messages";
import { LINKS } from "@/lib/site";

interface Props {
  locale: LocaleSegment;
  slug: string;
  title: string;
  headings: readonly Heading[];
  html: string;
  /** True when this locale has no translation and the reader is getting English. */
  untranslated: boolean;
}

export function DocsShell({ locale, slug, title, headings, html, untranslated }: Props) {
  const t = translator(locale);
  const titles = docTitles();

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[16rem_minmax(0,1fr)_14rem]">
      <nav aria-label={t("nav.docs")} className="lg:sticky lg:top-20 lg:self-start">
        <ul className="space-y-6">
          {DOCS_NAV.map((section) => (
            <li key={section.heading}>
              <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
                {t(section.heading)}
              </h2>
              <ul className="mt-2 space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={docHref(locale, item.slug)}
                      aria-current={item.slug === slug ? "page" : undefined}
                      className={[
                        "focus-ring block rounded-lg px-2.5 py-1.5 text-sm transition duration-1 ease-out",
                        item.slug === slug
                          ? "bg-accent/15 text-accent"
                          : "text-muted-foreground hover:bg-surface-hover hover:text-foreground",
                      ].join(" ")}
                    >
                      {/* The label is the curated one, as a translation key; the file's own H1 is
                          the fallback, so a renamed page never shows a stale name from this list.
                          `t()` falls through locale → English → the key itself, so a missing
                          translation degrades to English rather than to a visible `docs.nav*`. */}
                      {(item.label && t(item.label)) || titles[item.slug] || item.slug}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>

      <article className="min-w-0">
        <h1 className="text-d2">{title}</h1>
        {untranslated ? (
          /*
            Said before the content, not after. A reader who works out for themselves that the
            page is in the wrong language has already spent the confusion this notice exists to
            prevent — and the site should never quietly pass English off as a translation.
          */
          <p className="surface mt-5 border-l-2 border-l-warn p-3 text-sm text-muted-foreground">
            {t("docs.untranslated")}
          </p>
        ) : null}
        <div className="md mt-6 max-w-measure" dangerouslySetInnerHTML={{ __html: html }} />
        <p className="mt-12 border-t border-hairline pt-5 text-sm text-muted-foreground">
          <a
            href={`${LINKS.github}/blob/main/docs/${slug}.md`}
            rel="noreferrer"
            className="focus-ring rounded hover:text-foreground"
          >
            {t("docs.editOnGitHub")}
          </a>
        </p>
      </article>

      {headings.length > 0 ? (
        <nav aria-label={t("docs.onThisPage")} className="hidden lg:sticky lg:top-20 lg:block lg:self-start">
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
            {t("docs.onThisPage")}
          </h2>
          <ul className="mt-2 space-y-1">
            {headings.map((heading) => (
              <li key={heading.id} className={heading.depth === 3 ? "pl-3" : undefined}>
                <a
                  href={`#${heading.id}`}
                  className="focus-ring block rounded py-0.5 text-sm text-muted-foreground transition duration-1 ease-out hover:text-foreground"
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
