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

/**
 * The keys of one page that this language does not have, and therefore reads in English.
 *
 * Same definition the ratchet uses in `scripts/i18n-pending.ts`: a key absent from the locale's
 * table falls back to English at render time. Derived from the dictionaries rather than read from
 * `_pending.json`, because the dictionaries are the source and that file is generated from them —
 * a page that decides what to disclose should ask the thing itself, not its summary.
 *
 * This exists so `UntranslatedNotice` can *check* instead of *assert*. It used to render for every
 * non-English locale, which was true on the day it was written and became a lie the moment the
 * blog and the skills pages were translated: nine languages reading Portuguese under a banner
 * saying they were reading English. A notice that is wrong is worse than no notice, because the
 * reader who believes it stops trusting the ones that are right.
 */
export function untranslatedKeys(segment: LocaleSegment, prefix: string): string[] {
  if (segment === "en") return [];
  const table = DICTS[segment];
  return KEYS.filter((key) => key.startsWith(prefix) && !(key in table));
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
