import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Search } from "@/components/Search";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Wordmark } from "@/components/Wordmark";
import { localePath, type LocaleSegment } from "@/i18n/locales";
import { translator } from "@/i18n/messages";
import { LINKS } from "@/lib/site";

interface Props {
  locale: LocaleSegment;
}

export function Header({ locale }: Props) {
  const t = translator(locale);
  const to = (path: string) => localePath(locale, path);

  const nav = [
    { href: to("/agent"), label: t("nav.agent") },
    { href: to("/desktop"), label: t("nav.desktop") },
    { href: to("/docs"), label: t("nav.docs") },
    { href: to("/blog"), label: t("nav.blog") },
    { href: to("/skills"), label: t("nav.skills") },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-hairline bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link
          href={to("/")}
          className="focus-ring flex shrink-0 items-center gap-2 rounded-lg"
          aria-label={t("brand.name")}
        >
          <BrandMark size={28} priority />
          <Wordmark className="text-lg leading-none" />
        </Link>

        <nav aria-label={t("nav.primary")} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="focus-ring rounded-chip px-3 py-1.5 text-sm text-muted-foreground transition duration-1 ease-out hover:bg-surface-hover hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Search
            labels={{
              open: t("search.open"),
              placeholder: t("search.placeholder"),
              empty: t("search.empty"),
              unavailable: t("search.unavailable"),
              close: t("search.close"),
            }}
          />
          <Link
            href={to("/download")}
            className="focus-ring rounded-chip bg-accent-grad px-3.5 py-1.5 text-sm font-semibold text-accent-foreground transition duration-1 ease-out"
          >
            {t("nav.download")}
          </Link>
          <a
            href={LINKS.github}
            rel="noreferrer"
            className="focus-ring hidden rounded-chip px-3 py-1.5 text-sm text-muted-foreground transition duration-1 ease-out hover:text-foreground sm:block"
          >
            {t("nav.github")}
          </a>
          <LanguageSwitcher current={locale} label={t("lang.label")} />
          <ThemeToggle
            labels={{
              label: t("theme.label"),
              system: t("theme.system"),
              light: t("theme.light"),
              dark: t("theme.dark"),
            }}
          />
        </div>
      </div>
    </header>
  );
}
