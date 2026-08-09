import Link from "next/link";
import { localePath, type LocaleSegment } from "@/i18n/locales";
import { translator } from "@/i18n/messages";
import { LINKS, SITE } from "@/lib/site";

interface Props {
  locale: LocaleSegment;
}

/** The year the build ran. Static export means it is stamped at build time, which is honest. */
const YEAR = new Date().getUTCFullYear();

export function Footer({ locale }: Props) {
  const t = translator(locale);
  const to = (path: string) => localePath(locale, path);

  const columns: { heading: string; links: { href: string; label: string; external?: boolean }[] }[] =
    [
      {
        heading: t("footer.product"),
        links: [
          { href: to("/agent"), label: t("nav.agent") },
          { href: to("/desktop"), label: t("nav.desktop") },
          { href: to("/download"), label: t("nav.download") },
        ],
      },
      {
        heading: t("footer.learn"),
        links: [
          { href: to("/docs"), label: t("nav.docs") },
          { href: to("/blog"), label: t("nav.blog") },
          { href: to("/skills"), label: t("nav.skills") },
        ],
      },
      {
        heading: t("footer.community"),
        links: [
          { href: LINKS.github, label: t("nav.github"), external: true },
          { href: LINKS.discord, label: t("nav.discord"), external: true },
          { href: LINKS.reddit, label: t("footer.reddit"), external: true },
          { href: LINKS.donate, label: t("footer.donate"), external: true },
        ],
      },
    ];

  return (
    <footer className="mt-24 border-t border-hairline">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
                {column.heading}
              </h2>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) =>
                  link.external ? (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        rel="noreferrer"
                        className="focus-ring rounded-lg text-sm text-muted-foreground transition duration-1 ease-out hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="focus-ring rounded-lg text-sm text-muted-foreground transition duration-1 ease-out hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 border-t border-hairline pt-6 text-xs text-muted-foreground">
          {/* The product is alpha and the README insists on it in four places. A footer that
              quietly drops that is the site being braver about the software than the software is
              about itself. */}
          <p className="max-w-measure">{t("footer.alpha")}</p>
          <p className="mt-3">
            <a href={LINKS.license} rel="noreferrer" className="focus-ring rounded hover:text-foreground">
              {t("footer.license")}
            </a>
            {" · "}
            {t("footer.copyright", { year: YEAR })}
            {" · "}
            <Link href={to("/privacy")} className="focus-ring rounded hover:text-foreground">
              {t("footer.privacy")}
            </Link>
            {" · "}
            <Link href={to("/press")} className="focus-ring rounded hover:text-foreground">
              {t("footer.press")}
            </Link>
            {" · "}
            {/* A site claiming nine languages owes a straight answer about what that means. */}
            <Link href={to("/coverage")} className="focus-ring rounded hover:text-foreground">
              {t("footer.coverage")}
            </Link>
          </p>
          <p className="sr-only">{SITE.domain}</p>
        </div>
      </div>
    </footer>
  );
}
