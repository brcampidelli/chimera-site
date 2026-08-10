import { translator } from "@/i18n/messages";
import type { LocaleSegment } from "@/i18n/locales";

/**
 * "You are reading the English original", said on a page that is not in your language.
 *
 * `/coverage/` describes the translation policy and ends the Tier 2 paragraph with a promise:
 * *"Those fall back to English behind a notice that says so."* The notice existed and was rendered
 * in exactly one component — the documentation shell — so `skills`, `blog`, `evidence`, `cli`,
 * `press` and `privacy` fell back to English behind nothing at all. A page that silently serves
 * another language is a smaller problem than a page that promised it would not.
 *
 * Costs no translation: `docs.untranslated` is Tier 1 and has been in all nine languages the whole
 * time. Renders nothing for English, where there is nothing to disclose.
 */
export function UntranslatedNotice({ locale }: { locale: LocaleSegment }) {
  if (locale === "en") return null;
  const t = translator(locale);
  return (
    <p className="surface mt-5 border-l-2 border-l-warn p-3 text-sm text-muted-foreground">
      {t("docs.untranslated")}
    </p>
  );
}
