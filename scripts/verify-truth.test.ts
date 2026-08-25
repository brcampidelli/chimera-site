import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { alphaCaveatFor, checkNoTypedFigures, textOf, uncaveatedNames } from "./verify-truth";

const CAVEATS = join(import.meta.dirname, "..", "src", "i18n", "messages");
const caveat = (lang: string) =>
  (JSON.parse(readFileSync(join(CAVEATS, `${lang}.json`), "utf8")) as Record<string, string>)[
    "caveat.easySlice"
  ] ?? "";

const page = (lang: string, body: string) => `<html lang="${lang}"><body>${body}</body></html>`;

/**
 * A gate nobody has watched fail is not a gate.
 *
 * Both of these rules were shaped by their own first run: the phrase check flagged the
 * documentation quoting its own warning, and then flagged the site's own caveat. Each fix narrowed
 * what is forbidden, which is exactly the direction in which a gate can be quietly disarmed — so
 * the failing case is pinned here.
 */
describe("truth gate — the benchmark's name may only appear with its caveat", () => {
  it("fails a page that names the benchmark and drops the qualification", () => {
    expect(uncaveatedNames(page("en", "<p>Chimera reaches SWE-bench Verified results.</p>"))).not.toEqual(
      [],
    );
  });

  it("passes when the registered caveat is on the page", () => {
    const html = page("en", `<p>SWE-bench Verified</p><p>${caveat("en")}</p>`);
    expect(uncaveatedNames(html)).toEqual([]);
  });

  it("checks the page in its own language, not in English", () => {
    // The second version of this gate looked for an English phrase and a list of English
    // negations. Every translation passed, because none of them contains the English words — the
    // check reported success for eight of nine languages it was never examining.
    const wrongLanguage = page("de", `<p>SWE-bench Verified</p><p>${caveat("en")}</p>`);
    expect(uncaveatedNames(wrongLanguage)).not.toEqual([]);
    const right = page("de", `<p>SWE-bench Verified</p><p>${caveat("de")}</p>`);
    expect(uncaveatedNames(right)).toEqual([]);
  });

  it("survives an apostrophe", () => {
    // React escapes `'` to `&#x27;`, so the French caveat never matched itself and exactly one of
    // nine languages went red for a reason that had nothing to do with its content. A checker
    // that fails on punctuation is a checker somebody weakens.
    const escaped = caveat("fr").replace(/'/g, "&#x27;");
    expect(escaped).not.toBe(caveat("fr"));
    expect(uncaveatedNames(page("fr", `<p>SWE-bench Verified</p><p>${escaped}</p>`))).toEqual([]);
  });

  it("ignores words that only appear inside a script", () => {
    const html = "<script>const s = 'SWE-bench Verified'</script><p>Hello.</p>";
    expect(textOf(html)).not.toContain("SWE-bench");
  });

  it("finds no typed figure anywhere in the site's own source", () => {
    // The live assertion: every percentage on this site comes from <Stat>, which renders the
    // caveat in the same node. This is what stops a number being lifted out of its qualification
    // by somebody tightening a paragraph.
    expect(checkNoTypedFigures()).toEqual([]);
  });
});


describe("the alpha caveat is looked for in the page's own language", () => {
  // Written as `/alpha/i`, this check read the Japanese and Russian pages as missing a caveat they
  // carry in full — theirs say アルファ版 and Альфа — and took four builds down for it. The pages
  // were right and the rule was English. Measured on the built output before it was changed:
  // ja/blog carried アルファ and no Latin "alpha"; pt/blog carried both and passed.

  it("accepts the Japanese page's own wording", () => {
    expect(alphaCaveatFor("ja/blog/index.html").test("… アルファ版 — 堅実で …")).toBe(true);
  });

  it("accepts the Russian page's own wording", () => {
    expect(alphaCaveatFor("ru/blog/index.html").test("… Альфа — надёжно …")).toBe(true);
  });

  it("still refuses a page in that language that carries no caveat at all", () => {
    // The risk of narrowing a rule is blinding it. A Japanese page with neither wording must fail.
    expect(alphaCaveatFor("ja/blog/index.html").test("<p>maturity 37/37 GA</p>")).toBe(false);
    expect(alphaCaveatFor("ru/blog/index.html").test("<p>maturity 37/37 GA</p>")).toBe(false);
  });

  it("does not accept one language's wording on another language's page", () => {
    // Otherwise the fix would be "any of the ten words, anywhere", which is the English rule with
    // more spellings — a page could satisfy it with a word its own reader cannot see.
    expect(alphaCaveatFor("ja/blog/index.html").test("… Альфа …")).toBe(false);
    expect(alphaCaveatFor("ru/blog/index.html").test("… アルファ版 …")).toBe(false);
  });

  it("falls back to English for a path with no language prefix", () => {
    expect(alphaCaveatFor("blog/index.html").test("Alpha — solid and heavily tested")).toBe(true);
  });

  it("reads the wording from the dictionaries rather than from a list kept here", () => {
    // A language added tomorrow has to work without anybody remembering this file exists.
    const messages = JSON.parse(
      readFileSync(join(__dirname, "..", "src", "i18n", "messages", "ja.json"), "utf8"),
    ) as Record<string, string>;
    expect(alphaCaveatFor("ja/x.html").test(messages["footer.alpha"] ?? "")).toBe(true);
  });
});
