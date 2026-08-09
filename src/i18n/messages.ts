import type { LocaleSegment } from "./locales";
import de from "./messages/de.json";
import en from "./messages/en.json";
import es from "./messages/es.json";
import fr from "./messages/fr.json";
import it from "./messages/it.json";
import ja from "./messages/ja.json";
import pl from "./messages/pl.json";
import pt from "./messages/pt.json";
import zh from "./messages/zh.json";

/**
 * Flat `Record<string, string>` with `{name}` interpolation — deliberately the same shape as
 * `apps/desktop/src/lib/i18n.tsx`, so a string can move between the app and the site without a
 * conversion step.
 *
 * English is the key set. Anything missing elsewhere falls back to English at render time and is
 * carried as debt in `_pending.json`, which CI forces to shrink. A missing string showing English
 * is a small failure; a missing string showing a raw key is the site admitting it is broken.
 */
export type Messages = Record<string, string>;

const DICTS: Record<LocaleSegment, Messages> = {
  en,
  pt,
  es,
  fr,
  de,
  it,
  pl,
  zh,
  ja,
};

export const KEYS: readonly string[] = Object.keys(en);

export function messagesFor(segment: LocaleSegment): Messages {
  return DICTS[segment];
}

export function dictionaries(): Record<LocaleSegment, Messages> {
  return DICTS;
}

function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (whole, name: string) =>
    name in vars ? String(vars[name]) : whole,
  );
}

export type Translate = (key: string, vars?: Record<string, string | number>) => string;

/**
 * The translator for one language. Server-side: the strings a client component needs are passed
 * to it as props, so no dictionary is ever shipped to the browser.
 */
export function translator(segment: LocaleSegment): Translate {
  const table = messagesFor(segment);
  const fallback = DICTS.en;
  return (key, vars) => interpolate(table[key] ?? fallback[key] ?? key, vars);
}
