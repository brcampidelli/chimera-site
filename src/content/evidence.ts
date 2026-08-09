import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { resolveProductRoot } from "../../scripts/sync-tokens";

/**
 * Every number this site is allowed to show, and where it comes from.
 *
 * The product already generates two machine-readable snapshots and stamps them at each release —
 * `chimera/_benchmark_snapshot.json` and `chimera/_maturity_snapshot.json`. The site reads those.
 * It never types a figure, because a typed figure is correct exactly once: the day it was typed.
 */
const PRODUCT = resolveProductRoot();
const BENCH_FILE = join(PRODUCT, "chimera", "_benchmark_snapshot.json");
const MATURITY_FILE = join(PRODUCT, "chimera", "_maturity_snapshot.json");

export interface Measurement {
  readonly benchmark?: string;
  readonly suite?: string;
  readonly model: string;
  readonly n: number;
  readonly baseline_rate: number;
  readonly treatment_rate: number;
  readonly delta: number;
  readonly ci: readonly [number, number];
  readonly significant: boolean;
  readonly note: string;
  readonly source: string;
  readonly discordant?: { baseline_only: number; treatment_only: number };
  readonly decomposition?: readonly {
    arm: string;
    n: number;
    resolved: number;
    rate: number;
    precision_when_edited: number;
  }[];
}

export interface Surface {
  readonly name: string;
  readonly proven: number;
  readonly total: number;
  readonly ratio: number;
  readonly level: string;
  readonly missing: readonly string[];
}

export interface Evidence {
  readonly generated_for: string;
  readonly internal_lift: Measurement;
  readonly external: readonly Measurement[];
  readonly maturity: {
    readonly generated_for: string;
    readonly proven: number;
    readonly total: number;
    readonly ratio: number;
    readonly level: string;
    readonly surfaces: readonly Surface[];
  };
}

/**
 * Paths the site may not read, no matter who asks.
 *
 * `maturity.level` is the literal string `"GA"` — an internal surface-coverage verdict for a
 * product whose own README calls itself alpha in four places. It is the one real number in this
 * repository that could be rendered accurately and still mislead every reader, so it is closed
 * here rather than left to whoever writes the next page to remember.
 */
const FORBIDDEN = new Set(["maturity.level", "maturity.weakest"]);

let cached: Evidence | null = null;

export function evidenceAvailable(): boolean {
  return existsSync(BENCH_FILE) && existsSync(MATURITY_FILE);
}

export function evidence(): Evidence {
  if (cached) return cached;
  const bench = JSON.parse(readFileSync(BENCH_FILE, "utf8")) as Omit<Evidence, "maturity">;
  const maturity = JSON.parse(readFileSync(MATURITY_FILE, "utf8")) as Evidence["maturity"];
  cached = { ...bench, maturity };
  return cached;
}

/**
 * Read one figure by path, e.g. `internal_lift.delta` or `external[0].n`.
 *
 * Throws on an unknown path rather than returning undefined. In a static export a throw is a
 * failed build, which is the point: a page that references a figure the snapshot no longer
 * carries must not ship rendering a blank.
 */
export function resolvePath(path: string): unknown {
  if (FORBIDDEN.has(path)) {
    throw new Error(
      `evidence: "${path}" is off limits. ` +
        "The maturity level is internal surface coverage, not product maturity — the product is alpha.",
    );
  }
  const parts = path.split(/[.[\]]+/).filter(Boolean);
  let node: unknown = evidence();
  for (const part of parts) {
    if (node === null || typeof node !== "object") {
      throw new Error(`evidence: "${path}" does not exist in the snapshots`);
    }
    node = (node as Record<string, unknown>)[part];
    if (node === undefined) {
      throw new Error(`evidence: "${path}" does not exist in the snapshots`);
    }
  }
  return node;
}

export function forbiddenPaths(): readonly string[] {
  return [...FORBIDDEN];
}

/** `0.23` → `+23pp`. Rates are shares; deltas are percentage points, and the two are not the same. */
export function formatDelta(value: number): string {
  const pp = Math.round(value * 1000) / 10;
  return `${pp > 0 ? "+" : ""}${pp}pp`;
}

/** `0.71` → `71%`. */
export function formatRate(value: number): string {
  return `${Math.round(value * 1000) / 10}%`;
}

export function formatCI(ci: readonly [number, number]): string {
  const one = (v: number) => `${v > 0 ? "+" : ""}${Math.round(v * 1000) / 10}%`;
  return `[${one(ci[0])}, ${one(ci[1])}]`;
}
