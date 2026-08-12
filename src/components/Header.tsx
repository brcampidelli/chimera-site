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

  // `nav.agentShort` here and `nav.agent` everywhere else, on purpose. The header is a fixed-height
  // row with five items, a search box, a download button and two toggles; "Agente da terminale" is
  // nineteen characters and "ターミナルエージェント" is eleven wide ones, and neither fits. The home
  // page's product card and the footer keep the full name, because there the contrast between the
  // terminal one and the desktop one IS the information — the constraint is this row's width, not
  // what the product is called.
  const nav = [
    { href: to("/agent"), label: t("nav.agentShort") },
    { href: to("/desktop"), label: t("nav.desktop") },
    { href: to("/docs"), label: t("nav.docs") },
    { href: to("/blog"), label: t("nav.blog") },
    { href: to("/skills"), label: t("nav.skills") },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-hairline bg-background/85 backdrop-blur">
      {/*
        `gap-4` and, below, `gap-1.5` in the cluster — about 26px bought back without removing
        anything from the bar.

        Needed because the fonts are not the same everywhere. The stack is `system-ui`, so Cyrillic
        renders in Segoe UI on Windows and in something wider on Linux, and Russian fits on one and
        overflows on the other. It passed here, it passed on the live site read from this machine,
        and CI — which renders with Linux fonts, like every Linux reader — measured it 10px over at
        1280 and 7px over at 1440. A layout verified on one operating system is verified for the
        people using that operating system.

        Tightening the gaps rather than dropping another element: nothing leaves the bar, and it is
        one revert away if it reads too cramped.
      */}
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link
          href={to("/")}
          className="focus-ring flex shrink-0 items-center gap-2 rounded-lg"
          aria-label={t("brand.name")}
        >
          <BrandMark size={28} priority />
          <Wordmark className="text-lg leading-none" />
        </Link>

        {/*
          `whitespace-nowrap` is load-bearing, and its absence is what made a long label ugly in a
          specific way rather than merely wide. The row is `h-14` with `items-center`: a label that
          wraps makes its `<li>` taller than the row, and the overflow is centred, so it renders
          ABOVE and BELOW the header — outside the bar, over the page. Spanish and French shipped
          like that. Shortening the label fixes those two; this fixes the class, so the next long
          word overflows sideways (visible, ordinary) instead of escaping the container.
        */}
        <nav aria-label={t("nav.primary")} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="focus-ring whitespace-nowrap rounded-chip px-3 py-1.5 text-sm text-muted-foreground transition duration-1 ease-out hover:bg-surface-hover hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {/*
              Beside Skills, and deliberately not competing with Download.

              An outlined chip rather than the filled gradient: this project has exactly one primary
              action per page and it is the one that gets the product into someone's hands. A second
              filled button next to it makes both read as equally urgent, and asking for money at the
              same volume as "try it" is the wrong order to put those in.

              A plain link, not Stripe's `buy-button` embed. The header is on all 1181 pages, so the
              embed would load a third-party script on every one of them — for a button most visitors
              never press — and hand Stripe a view of the whole site's traffic. The payment link opens
              the same Stripe-hosted checkout with none of that.
            */}
            <li>
              <a
                href={LINKS.donate}
                rel="noreferrer"
                className="focus-ring whitespace-nowrap rounded-chip border border-hairline px-3 py-1.5 text-sm text-accent2 transition duration-1 ease-out hover:bg-surface-hover hover:text-accent"
              >
                {t("nav.donate")}
              </a>
            </li>
          </ul>
        </nav>

        {/*
          `whitespace-nowrap` on the container, because `white-space` inherits and the alternative is
          the same class in four component files that will drift apart.

          The nav got this earlier and this side did not, which is how Japanese shipped with 「システム」
          split across two lines and 「🌐日本語」 stacked across three — both rendering outside a bar
          with a fixed height. CJK has no spaces to break on, so a container even slightly too narrow
          breaks between any two characters; the text does not have to be long, only the box tight.
        */}
        <div className="ml-auto flex items-center gap-1.5 whitespace-nowrap">
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
            // Appears at 1330px, not at a named breakpoint. With nothing in the bar allowed to wrap
            // any more, Japanese with this link showing needs 1303px, so the honest threshold is
            // "just above what it measured" rather than the nearest round number. `xl` is 1280 and
            // fails at exactly 1280 — `min-width` matches there, and whether the page then fits
            // depends on the user's scrollbar: a classic one leaves 1270 and hides this, an overlay
            // one leaves 1280 and shows it. Half the users would have seen a sideways-scrolling
            // page. `2xl` (1536) would work and costs the link on every ordinary laptop.
            //
            // The link is the cheapest thing here to give up: secondary action, and the footer
            // carries it on all 1181 pages. Measured alternatives, all of which also clear it and
            // each of which costs more: the wordmark (79px), the theme toggle (180px), search (48px).
            className="focus-ring hidden rounded-chip px-3 py-1.5 text-sm text-muted-foreground transition duration-1 ease-out hover:text-foreground min-[1330px]:block"
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
