/**
 * One table. Everything about languages resolves here.
 *
 * Three code systems have to agree and none of them spell things the same way:
 *   - the desktop app uses two-letter codes (`pt`, `zh`) in `localStorage["chimera.lang"]`
 *   - the READMEs use regional filenames (`README.pt-BR.md`, `README.zh-CN.md`)
 *   - HTML and search engines want BCP-47 (`pt-BR`, `zh-Hans`)
 *
 * The URL segment follows the app, because that is the value already sitting in a user's
 * localStorage — so someone who reads the site in Portuguese and opens the app gets Portuguese
 * without being asked twice. Everything else is derived from this table, never re-guessed.
 */
export type LocaleSegment = "en" | "pt" | "es" | "fr" | "de" | "it" | "pl" | "zh" | "ja";

export interface Locale {
  /** The URL segment, and the app's `chimera.lang` value. */
  readonly segment: LocaleSegment;
  /** What goes in `<html lang>` and `hreflang`. */
  readonly bcp47: string;
  /** The language's name in that language. Never translated. */
  readonly endonym: string;
  /** The matching README in the product repo. */
  readonly readme: string;
  /** Written right-to-left. None today; here so a future locale is a data change. */
  readonly rtl?: boolean;
}

export const LOCALES: readonly Locale[] = [
  { segment: "en", bcp47: "en", endonym: "English", readme: "README.md" },
  { segment: "pt", bcp47: "pt-BR", endonym: "Português", readme: "README.pt-BR.md" },
  { segment: "es", bcp47: "es", endonym: "Español", readme: "README.es.md" },
  { segment: "fr", bcp47: "fr", endonym: "Français", readme: "README.fr.md" },
  { segment: "de", bcp47: "de", endonym: "Deutsch", readme: "README.de.md" },
  { segment: "it", bcp47: "it", endonym: "Italiano", readme: "README.it.md" },
  { segment: "pl", bcp47: "pl", endonym: "Polski", readme: "README.pl.md" },
  { segment: "zh", bcp47: "zh-Hans", endonym: "中文", readme: "README.zh-CN.md" },
  { segment: "ja", bcp47: "ja", endonym: "日本語", readme: "README.ja.md" },
] as const;

export const DEFAULT_LOCALE: LocaleSegment = "en";

export const SEGMENTS: readonly LocaleSegment[] = LOCALES.map((l) => l.segment);

export function isLocaleSegment(value: string): value is LocaleSegment {
  return (SEGMENTS as readonly string[]).includes(value);
}

export function localeOf(segment: LocaleSegment): Locale {
  const found = LOCALES.find((l) => l.segment === segment);
  if (!found) throw new Error(`unknown locale: ${segment}`);
  return found;
}

/**
 * The path a route takes in a given language. Every locale is prefixed, English included.
 *
 * The tempting alternative — English unprefixed at the root — costs a duplicate route file for
 * every page on the site, because a static export has no rewrites. Fourteen three-line files that
 * exist only to re-export another file are fourteen files that will drift. Uniform prefixes keep
 * one tree.
 *
 * The one exception is the home page, which also answers at `/` so the domain works bare. `/en/`
 * carries a canonical link pointing there, which is exactly what canonical links are for.
 */
export function localePath(segment: LocaleSegment, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const base = `/${segment}${clean === "/" ? "" : clean}`;
  return base.endsWith("/") ? base : `${base}/`;
}

/** Where search engines should be told the page really lives. */
export function canonicalPath(segment: LocaleSegment, path = "/"): string {
  if (segment === DEFAULT_LOCALE && path === "/") return "/";
  return localePath(segment, path);
}
