import { describe, expect, it } from "vitest";
import { TIER1_PREFIXES, chromeKeysNotTier1, isTier1 } from "./i18n-pending";

/**
 * The gate that reported green over a real defect.
 *
 * The footer's "Translation coverage" link was keyed `coverage.title`. `coverage.` is not a Tier 1
 * prefix, so the rule filed it as page content and let it stay English — while `/coverage/` itself
 * went on printing "Tier 1 complete" for all nine languages and the link sat in English on 84
 * pages. Two independent audits found it before the build did.
 *
 * Nothing here would have caught it either, until the gate learned to look at where a string is
 * used rather than only at what it is called.
 */
describe("the Tier 1 rule", () => {
  it("finds no chrome string keyed outside Tier 1", () => {
    const offenders = chromeKeysNotTier1();
    expect(offenders, offenders.join("\n")).toEqual([]);
  });

  it("would have caught the key that escaped", () => {
    // The exact shape of the defect: a footer label filed under the page it links to.
    expect(isTier1("coverage.title")).toBe(false);
    expect(isTier1("footer.coverage")).toBe(true);
  });

  it("keeps the frame of the page inside Tier 1", () => {
    for (const prefix of ["nav.", "footer.", "lang.", "theme.", "search."]) {
      expect(TIER1_PREFIXES as readonly string[]).toContain(prefix);
    }
  });
});
