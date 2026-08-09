"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, LOCALES, isLocaleSegment, type LocaleSegment } from "@/i18n/locales";

interface Props {
  current: LocaleSegment;
  label: string;
}

/**
 * Swap the language and stay on the page you were reading. Sending someone to the home page to
 * change language is how a nine-language site gets used in one language.
 */
export function LanguageSwitcher({ current, label }: Props) {
  const pathname = usePathname() ?? "/";

  const segments = pathname.split("/").filter(Boolean);
  const rest = segments.length > 0 && isLocaleSegment(segments[0]!) ? segments.slice(1) : segments;
  const tail = rest.length > 0 ? `/${rest.join("/")}/` : "/";

  const href = (locale: LocaleSegment) =>
    locale === DEFAULT_LOCALE ? tail : `/${locale}${tail === "/" ? "/" : tail}`;

  return (
    <details className="group relative">
      <summary
        className="focus-ring flex cursor-pointer list-none items-center gap-1.5 rounded-chip border border-hairline bg-surface-2 px-3 py-1.5 text-xs text-muted-foreground transition duration-1 ease-out hover:text-foreground"
        aria-label={label}
      >
        <span aria-hidden="true">🌐</span>
        {LOCALES.find((l) => l.segment === current)?.endonym}
      </summary>
      <ul className="floating absolute right-0 z-20 mt-2 max-h-80 w-44 overflow-y-auto p-1">
        {LOCALES.map((locale) => (
          <li key={locale.segment}>
            <Link
              href={href(locale.segment)}
              hrefLang={locale.bcp47}
              lang={locale.bcp47}
              aria-current={locale.segment === current ? "true" : undefined}
              className={[
                "focus-ring block rounded-lg px-3 py-2 text-sm transition duration-1 ease-out",
                locale.segment === current
                  ? "bg-surface-2 text-foreground"
                  : "text-muted-foreground hover:bg-surface-hover hover:text-foreground",
              ].join(" ")}
            >
              {locale.endonym}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
