import { describe, expect, it } from "vitest";
import { checkNoTypedFigures, textOf, unnegatedAssertions } from "./verify-truth";

/**
 * A gate nobody has watched fail is not a gate.
 *
 * Both of these rules were shaped by their own first run: the phrase check flagged the
 * documentation quoting its own warning, and then flagged the site's own caveat. Each fix narrowed
 * what is forbidden, which is exactly the direction in which a gate can be quietly disarmed — so
 * the failing case is pinned here.
 */
describe("truth gate — it catches the assertion and spares the warning", () => {
  it("fails a page that asserts the slice is a SWE-bench Verified score", () => {
    const html = "<p>Chimera reaches a SWE-bench Verified score of nearly half.</p>";
    expect(unnegatedAssertions(html)).not.toEqual([]);
  });

  it("allows the sentence that denies it", () => {
    // The site's own caveat, and the product's documentation, both contain these words. Banning
    // them outright would ban the warning along with the lie.
    const html = "<p>This is not a SWE-bench Verified score — a real one needs the full 500.</p>";
    expect(unnegatedAssertions(html)).toEqual([]);
  });

  it("does not let markup separate the negation from the phrase", () => {
    // "not <em>a</em> SWE-bench Verified score" is one sentence to a reader and two text nodes to
    // a parser. The check reads the text, not the tags.
    const html = "<p>It is <strong>not</strong> a <em>SWE-bench Verified score</em>.</p>";
    expect(unnegatedAssertions(html)).toEqual([]);
  });

  it("ignores words that only appear inside a script", () => {
    const html = "<script>const s = 'SWE-bench Verified score'</script><p>Hello.</p>";
    expect(textOf(html)).not.toContain("SWE-bench");
  });

  it("finds no typed figure anywhere in the site's own source", () => {
    // The live assertion: every percentage on this site comes from <Stat>, which renders the
    // caveat in the same node. This is what stops a number being lifted out of its qualification
    // by somebody tightening a paragraph.
    expect(checkNoTypedFigures()).toEqual([]);
  });
});
