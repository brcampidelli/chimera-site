import { describe, expect, it } from "vitest";
import claims from "./claims.json";
import {
  evidence,
  evidenceAvailable,
  formatCI,
  formatDelta,
  formatRate,
  forbiddenPaths,
  resolvePath,
} from "./evidence";

/**
 * These assertions are the difference between a policy and a mechanism.
 *
 * "Do not quote the maturity level" is a rule somebody eventually forgets. A path that throws is
 * a build that fails.
 */
describe("evidence — the numbers come from the product, or not at all", () => {
  it("reads a real figure out of the snapshot", () => {
    if (!evidenceAvailable()) {
      console.warn("skipped: chimera-agent snapshots not found");
      return;
    }
    expect(typeof resolvePath("internal_lift.delta")).toBe("number");
    expect(typeof resolvePath("external[0].n")).toBe("number");
    expect(typeof resolvePath("maturity.proven")).toBe("number");
  });

  it("refuses the maturity level, which is the one accurate number that would mislead", () => {
    // The snapshot literally says `"level": "GA"` for a product whose README calls itself alpha in
    // four places. Nothing on this site may render it.
    if (!evidenceAvailable()) return;
    expect(() => resolvePath("maturity.level")).toThrow(/off limits/);
    expect(forbiddenPaths()).toContain("maturity.level");
  });

  it("throws on a path the snapshot no longer carries", () => {
    // In a static export a throw is a failed build. A page referencing a figure that has gone away
    // must not ship rendering a blank where a number used to be.
    if (!evidenceAvailable()) return;
    expect(() => resolvePath("internal_lift.made_up")).toThrow(/does not exist/);
  });

  it("keeps rates and deltas in different units, because they are different things", () => {
    expect(formatRate(0.71)).toBe("71%");
    expect(formatDelta(0.23)).toBe("+23pp");
    expect(formatDelta(-0.05)).toBe("-5pp");
    expect(formatCI([-0.035, 0.167])).toBe("[-3.5%, +16.7%]");
  });

  it("carries the project's own note verbatim on every measurement", () => {
    // The note is where the qualification lives. A measurement without one is a number the site
    // would have to explain in its own words, which is where softening starts.
    if (!evidenceAvailable()) return;
    const data = evidence();
    for (const measurement of [data.internal_lift, ...data.external]) {
      expect(measurement.note.length, measurement.benchmark ?? measurement.suite).toBeGreaterThan(
        40,
      );
      expect(measurement.source).toMatch(/^bench\//);
    }
  });
});

describe("claims — a figure may not travel without its caveat", () => {
  it("gives every claim a caveat", () => {
    for (const [id, entry] of Object.entries(claims)) {
      expect(entry.caveat, id).toMatch(/^caveat\./);
    }
  });

  it("keeps the retracted claim without evidence", () => {
    // A retracted claim has no number. Giving it one would be the site reviving something the
    // project withdrew on purpose.
    expect(claims["learning-lift"].retracted).toBe(true);
    expect(claims["learning-lift"].evidence).toBeNull();
  });

  it("points every live claim at a path that resolves", () => {
    if (!evidenceAvailable()) return;
    for (const [id, entry] of Object.entries(claims)) {
      if (entry.retracted || entry.evidence === null) continue;
      expect(() => resolvePath(entry.evidence as string), id).not.toThrow();
    }
  });
});
