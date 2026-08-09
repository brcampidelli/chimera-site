import claims from "@/content/claims.json";
import { formatCI, formatDelta, formatRate, resolvePath } from "@/content/evidence";
import type { LocaleSegment } from "@/i18n/locales";
import { translator } from "@/i18n/messages";

type ClaimId = keyof typeof claims;

interface Props {
  locale: LocaleSegment;
  /** Which registered claim this figure belongs to. Not optional — see below. */
  claim: ClaimId;
  /** A path into the snapshots, e.g. `internal_lift.delta`. */
  path: string;
  /** How to read the raw number. */
  as?: "rate" | "delta" | "ci" | "count" | "text";
  /** Set on the one page that is entirely about the evidence, where caveats have their own row. */
  bare?: boolean;
}

/**
 * A published figure, with the sentence it is not allowed to travel without.
 *
 * `claim` is required and it carries a caveat, rendered by this same component. That is the whole
 * design: a number without its qualification is not discouraged here, it is *unrepresentable*.
 * A caveat that lives in a separate paragraph gets dropped by the next person tightening the copy,
 * and a caveat below the number arrives after the reader has already formed the belief it exists
 * to prevent.
 *
 * The value comes from the product's own snapshot. Nothing on this site types a figure.
 */
export function Stat({ locale, claim, path, as = "rate", bare = false }: Props) {
  const t = translator(locale);
  const entry = claims[claim];

  if (entry.retracted) {
    // A retracted claim has no number. Rendering one would be the site reviving something the
    // project withdrew on purpose.
    throw new Error(
      `Stat: "${claim}" is retracted and has no figure. Use <RetractedNotice> to say so.`,
    );
  }

  const raw = resolvePath(path);
  const text =
    as === "text"
      ? String(raw)
      : as === "count"
        ? String(raw as number)
        : as === "ci"
          ? formatCI(raw as [number, number])
          : as === "delta"
            ? formatDelta(raw as number)
            : formatRate(raw as number);

  if (bare) return <span className="font-mono tabular-nums">{text}</span>;

  return (
    <span className="inline-flex flex-col gap-1">
      <span className="font-mono text-d3 tabular-nums text-foreground">{text}</span>
      <span className="max-w-measure text-xs text-muted-foreground">{t(entry.caveat)}</span>
    </span>
  );
}

/**
 * The only place a withdrawn claim may appear.
 *
 * The README says "it gets better the more you use it" in its feature list and retracts exactly
 * that sentence in its benchmark section. A site inherits that contradiction by default — this is
 * the component that makes stating the claim require stating the retraction in the same breath.
 */
export function RetractedNotice({
  locale,
  claim,
  children,
}: {
  locale: LocaleSegment;
  claim: ClaimId;
  children: React.ReactNode;
}) {
  const t = translator(locale);
  const entry = claims[claim];
  if (!entry.retracted) {
    throw new Error(`RetractedNotice: "${claim}" is not retracted — do not frame it as one.`);
  }
  return (
    <div className="surface border-l-2 border-l-warn p-4">
      <p className="text-xs uppercase tracking-widest text-warn-foreground">
        {t("evidence.retracted")}
      </p>
      <div className="mt-2 max-w-measure text-sm text-muted-foreground">{children}</div>
      <p className="mt-3 max-w-measure text-sm">{t(entry.caveat)}</p>
    </div>
  );
}
