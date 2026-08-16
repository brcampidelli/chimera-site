"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export interface SkillCard {
  slug: string;
  href: string;
  name: string;
  description: string;
  kind: "pattern" | "anti_pattern";
  stage: string;
  topic: string;
  triggers: string[];
  provenance: string;
  status: string;
}

interface Props {
  cards: SkillCard[];
  labels: {
    search: string;
    all: string;
    pattern: string;
    antiPattern: string;
    noMatch: string;
    /** Stage headings, keyed by the vocabulary value. Missing key -> the raw value is shown. */
    stages: Record<string, string>;
  };
}

/**
 * The order a piece of work happens in, which is the order a browsing human reads.
 *
 * Alphabetical would put Build before Define and Ship before Verify — a list that is sorted and
 * says nothing. A stage absent from the library simply does not render; there is a test in the
 * product repo that fails if any of the five ends up empty, so an absence here means someone
 * removed a card, not that the page quietly lost a heading.
 */
const STAGE_ORDER = ["define", "build", "verify", "review", "ship"] as const;

/**
 * Filtering happens in the browser over a list that is already on the page.
 *
 * There is no search index to fetch and no request per keystroke: the whole library is small
 * enough to ship, and it will be small for a long time. Sorted by name — never by downloads,
 * because a hub with a popularity metric is a hub with something to farm.
 */
export function SkillFilter({ cards, labels }: Props) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<"all" | "pattern" | "anti_pattern">("all");

  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return cards.filter((card) => {
      if (kind !== "all" && card.kind !== kind) return false;
      if (!needle) return true;
      return [card.name, card.description, ...card.triggers]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [cards, query, kind]);

  /**
   * Group the VISIBLE cards, not the whole library, and drop empty groups.
   *
   * Grouping the library instead would leave headings standing over nothing every time a filter
   * narrows the list — the same "empty drawer" failure this page exists to avoid, arriving through
   * interaction rather than through the taxonomy. A card with no stage falls into a trailing group
   * keyed by "": the product test forbids that in `skills/`, so it can only appear for something
   * imported, and swallowing it silently would hide the card entirely.
   */
  const grouped = useMemo(() => {
    const buckets = new Map<string, SkillCard[]>();
    for (const card of shown) {
      const key = card.stage || "";
      const bucket = buckets.get(key);
      if (bucket) bucket.push(card);
      else buckets.set(key, [card]);
    }
    const ordered: Array<[string, SkillCard[]]> = [];
    for (const stage of STAGE_ORDER) {
      const bucket = buckets.get(stage);
      if (bucket?.length) ordered.push([stage, bucket]);
    }
    const ungrouped = buckets.get("");
    if (ungrouped?.length) ordered.push(["", ungrouped]);
    return ordered;
  }, [shown]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={labels.search}
          aria-label={labels.search}
          className="focus-ring min-w-0 flex-1 rounded-chip border border-hairline bg-input px-4 py-2 text-sm shadow-inset"
        />
        <div role="radiogroup" aria-label={labels.all} className="flex gap-1">
          {(
            [
              ["all", labels.all],
              ["pattern", labels.pattern],
              ["anti_pattern", labels.antiPattern],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={kind === value}
              onClick={() => setKind(value)}
              className={[
                "focus-ring rounded-chip px-3 py-1.5 text-sm transition duration-1 ease-out",
                kind === value
                  ? "bg-surface-2 text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">{labels.noMatch}</p>
      ) : (
        grouped.map(([stage, cards]) => (
          <section key={stage} className="mt-10 first:mt-6">
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
              {labels.stages[stage] ?? stage} · {cards.length}
            </h2>
            <ul className="mt-3 grid gap-3">
              {cards.map((card) => (
                <li key={card.slug}>
                  <Link
                    href={card.href}
                    className="focus-ring surface block p-5 transition duration-1 ease-out hover:bg-surface-hover"
                  >
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h3 className="font-mono text-base text-accent2">{card.name}</h3>
                      <span className="rounded-chip bg-surface-2 px-2 py-0.5 text-xs text-muted-foreground">
                        {card.kind === "pattern" ? labels.pattern : labels.antiPattern}
                      </span>
                      {card.topic ? (
                        // Untranslated on purpose: this is the aggregator ecosystem's vocabulary,
                        // and a reader who arrived searching "devops" should see "devops".
                        <span className="rounded-chip bg-surface-2 px-2 py-0.5 text-xs text-muted-foreground">
                          {card.topic}
                        </span>
                      ) : null}
                      <span className="rounded-chip bg-ok/15 px-2 py-0.5 text-xs text-ok">
                        {card.provenance}
                      </span>
                    </div>
                    <p className="mt-2 max-w-measure text-sm text-muted-foreground">
                      {card.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </>
  );
}
