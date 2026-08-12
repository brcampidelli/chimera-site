import { translator, untranslatedKeys } from "@/i18n/messages";
import type { LocaleSegment } from "@/i18n/locales";

/**
 * "You are reading the English original", said only on a page that really is.
 *
 * `/coverage/` describes the translation policy and ends the Tier 2 paragraph with a promise:
 * *"Those fall back to English behind a notice that says so."* The notice existed and was rendered
 * in exactly one component — the documentation shell — so `skills`, `blog`, `evidence`, `cli`,
 * `press` and `privacy` fell back to English behind nothing at all.
 *
 * The first fix rendered it for every non-English locale, which was true the day it was written
 * and became false the moment those pages were translated: the blog and the skills index served
 * Portuguese under a banner announcing English. **A notice that is wrong is worse than no notice**,
 * because a reader who catches one lying stops believing the ones that are right — and the ones
 * that are right are load-bearing on this site.
 *
 * So it asks instead of asserting. `prefix` is the page's message namespace, and the answer comes
 * from the dictionaries themselves: if every key under that namespace exists in this language,
 * nothing is falling back and there is nothing to disclose. It goes quiet on its own as
 * translations land, which is the only version of this that stays true without anyone remembering.
 *
 * Costs no translation: `docs.untranslated` is Tier 1 and has been in all nine languages the whole
 * time.
 */
export function UntranslatedNotice({ locale, prefix }: { locale: LocaleSegment; prefix: string }) {
  if (untranslatedKeys(locale, prefix).length === 0) return null;
  const t = translator(locale);
  return (
    <p className="surface mt-5 border-l-2 border-l-warn p-3 text-sm text-muted-foreground">
      {t("docs.untranslated")}
    </p>
  );
}
