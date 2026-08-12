import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { SEGMENTS } from "@/i18n/locales";
import { untranslatedKeys } from "@/i18n/messages";

/**
 * The notice has to be true, and the only way it stays true is by being derived.
 *
 * It used to render for every non-English locale. That was correct the day it was written and
 * became a lie the moment the blog and the skills index were translated: nine languages served
 * Portuguese, German and Japanese under a banner announcing they were reading English. Bruno
 * caught it from a screenshot.
 *
 * A notice that is wrong is worse than no notice. This site's other disclosures — the translated
 * skill body under an English hash, the digest that cannot say more than its sources, the paper
 * post that admits how much was read — all depend on a reader believing a caveat when they see
 * one. One caveat caught lying devalues every one of them.
 */
describe("the untranslated notice — said only where it is true", () => {
  const PAGES = [
    ["blog.", "/blog"],
    ["skills.", "/skills"],
    ["cli.", "/cli"],
    ["evidence.", "/evidence"],
    ["press.", "/press"],
    ["privacy.", "/privacy"],
    ["coverage.", "/coverage"],
  ] as const;

  it("says nothing on a page whose strings are all translated", () => {
    // The two Bruno caught from a screenshot. Both were fully translated in all nine languages and
    // both were announcing English.
    for (const locale of SEGMENTS) {
      expect(untranslatedKeys(locale, "blog."), `blog/${locale}`).toEqual([]);
      expect(untranslatedKeys(locale, "skills."), `skills/${locale}`).toEqual([]);
    }
  });

  it("and says nothing on the pages that were lying in Portuguese too", () => {
    // Found by this test, not by looking: the first version asserted that `press.` and `privacy.`
    // still fell back in `pt` and it failed, because they do not. Portuguese is the furthest along
    // — its only debt is `cli.` and `evidence.` — so the old notice was wrong on four pages there,
    // not two. Asserting what I assumed is how the assumption got caught.
    for (const prefix of ["press.", "privacy.", "coverage."]) {
      expect(untranslatedKeys("pt", prefix), prefix).toEqual([]);
    }
  });

  it("still says it where the page really does fall back to English", () => {
    // Not a wish. If these get translated the assertion fails, and this test is the reminder that
    // the notice went quiet on its own — which is the whole point of deriving it.
    for (const prefix of ["cli.", "evidence."]) {
      expect(untranslatedKeys("pt", prefix).length, `pt ${prefix}`).toBeGreaterThan(0);
    }
    for (const prefix of ["cli.", "press.", "privacy.", "evidence.", "coverage."]) {
      expect(untranslatedKeys("de", prefix).length, `de ${prefix}`).toBeGreaterThan(0);
    }
  });

  it("never says it in English, where there is nothing to disclose", () => {
    for (const [prefix] of PAGES) {
      expect(untranslatedKeys("en", prefix), prefix).toEqual([]);
    }
  });

  it("gives every page that carries the notice its own namespace", () => {
    // A missing `prefix` would not compile, but a copy-pasted wrong one would — and it would make
    // the notice answer about somebody else's page.
    for (const [prefix, route] of PAGES) {
      const source = readFileSync(
        join(process.cwd(), "src", "app", "[lang]", route.slice(1), "page.tsx"),
        "utf8",
      );
      expect(source, route).toContain(`prefix="${prefix}"`);
    }
  });
});
