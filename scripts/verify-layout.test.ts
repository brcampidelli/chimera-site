/**
 * The judgement half of the layout gate, tested without a browser.
 *
 * The two cases below are not invented shapes — they are the numbers measured off the live site on
 * 2026-08-12, before each was fixed. A gate written after the fact is easy to write so that it
 * passes; feeding it the real failures is the only way to know it would have caught them.
 */
import { describe, expect, it } from "vitest";
import { type Measurement, problems } from "./verify-layout";

/** A page with nothing wrong: six items well inside a 57px bar, no overflow. */
function fine(over: Partial<Measurement> = {}): Measurement {
  return {
    locale: "en",
    width: 1280,
    scrollWidth: 1270,
    clientWidth: 1270,
    header: { top: 0, bottom: 57 },
    items: [
      { text: "Agent", top: 14, bottom: 43 },
      { text: "Desktop app", top: 14, bottom: 43 },
      { text: "Docs", top: 14, bottom: 43 },
      { text: "Blog", top: 14, bottom: 43 },
      { text: "Skills", top: 14, bottom: 43 },
      { text: "Support", top: 13, bottom: 44 },
    ],
    ...over,
  };
}

describe("problems — the two failures this gate exists for", () => {
  it("passes a page that is fine", () => {
    expect(problems(fine())).toEqual([]);
  });

  it("catches the Russian page scrolling sideways", () => {
    // Measured live: scrollWidth 1282 in a 1270 viewport. The bar itself was correct, which is why
    // looking at the header alone would have reported success.
    const found = problems(fine({ locale: "ru", scrollWidth: 1282, clientWidth: 1270 }));
    expect(found).toHaveLength(1);
    expect(found[0]).toContain("ru");
    expect(found[0]).toContain("12px over");
  });

  it("catches a nav label escaping the bar", () => {
    // Measured live before the fix: 「支援」 stacked one character per line, 55px tall in a 57px
    // header — and in Spanish the item rendered above the bar entirely.
    const found = problems(
      fine({
        locale: "es",
        items: [
          { text: "Agente de terminal", top: -12, bottom: 43 },
          { text: "Aplicación", top: 14, bottom: 43 },
        ],
      }),
    );
    expect(found).toHaveLength(1);
    // The facts, not the sentence. An earlier version of this asserted the phrase "escapes the
    // bar" and went red the moment the message was reworded — punishing an improvement to the
    // wording while proving nothing about the check. What a reader needs is which item and where
    // it sat; that is what gets asserted.
    expect(found[0]).toContain("Agente de terminal");
    expect(found[0]).toContain("-12");
    expect(found[0]).toContain("0–57");
  });

  it("reports both when both are wrong, rather than stopping at the first", () => {
    const found = problems(
      fine({
        locale: "ja",
        scrollWidth: 1400,
        clientWidth: 1270,
        items: [{ text: "支援", top: 1, bottom: 56 }, { text: "ブログ", top: 70, bottom: 99 }],
      }),
    );
    // One overflow + one escaped item. A gate that stops at the first problem turns one fix into
    // three round trips.
    expect(found).toHaveLength(2);
  });

  it("refuses to pass a page where it found no items to measure", () => {
    // The failure mode of every gate in this repo that has ever been wrong: reporting success for
    // something it never looked at. A selector change, a renamed element, and this silently becomes
    // an expensive no-op.
    const found = problems(fine({ items: [] }));
    expect(found).toHaveLength(1);
    expect(found[0]).toContain("measured nothing");
  });

  it("tolerates sub-pixel geometry, which is not a defect", () => {
    // getBoundingClientRect returns fractions; a half-pixel is rounding, not a label escaping.
    expect(problems(fine({ scrollWidth: 1271, clientWidth: 1270 }))).toEqual([]);
    expect(problems(fine({ header: { top: 0, bottom: 43 } }))).toEqual([]);
  });
});
