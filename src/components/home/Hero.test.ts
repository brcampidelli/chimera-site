import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { EYES } from "../../../scripts/brand-assets";

const ROOT = resolve(import.meta.dirname, "..", "..", "..");
const HERO = join(ROOT, "src", "components", "home", "Hero.tsx");
const CSS = join(ROOT, "src", "styles", "motion.css");

/**
 * The eye positions are the one place on this site where a measured number lives in two files.
 *
 * `brand-assets.ts` uses them to draw the verification image; `Hero.tsx` uses them to place the
 * lights. If those drift apart, the debug image keeps showing rings on pupils while the live page
 * puts six glows on a horn — the check would still pass and the page would still be wrong.
 */
describe("hero — the six lights sit where the pupils were measured", () => {
  it("uses exactly the coordinates the brand script drew rings on", () => {
    const source = readFileSync(HERO, "utf8");
    for (const eye of EYES) {
      expect(source, eye.id).toContain(`id: "${eye.id}", x: ${eye.x}, y: ${eye.y}`);
    }
  });

  it("has six of them, in three symmetric pairs", () => {
    // A seventh light would mean a fang or a crest tip got promoted to an eye.
    expect(EYES).toHaveLength(6);
    const pair = (a: string, b: string) => {
      const left = EYES.find((e) => e.id === a)!;
      const right = EYES.find((e) => e.id === b)!;
      // Same height, and mirrored about the centre line.
      expect(Math.abs(left.y - right.y), `${a}/${b} height`).toBeLessThan(0.5);
      expect(Math.abs((left.x + right.x) / 2 - 50), `${a}/${b} centre`).toBeLessThan(2);
    };
    pair("snake-left", "snake-right");
    pair("lion-left", "lion-right");
    pair("goat", "dragon");
  });

  it("keeps the verification image alongside the numbers", () => {
    // Which clusters are eyes was a human judgement. The picture it was made against is committed,
    // so the claim can be re-checked rather than believed.
    expect(existsSync(join(ROOT, "public", "brand", "mark-debug.png"))).toBe(true);
    expect(existsSync(join(ROOT, "public", "brand", "mark.png"))).toBe(true);
  });

  it("animates only opacity and transform, and answers reduced motion", () => {
    // Comments are stripped first, and that is not fussiness: the first run of this test failed on
    // the comment in motion.css that *explains* the rule. A checker that cannot tell a rule from a
    // description of it is the same inversion as a gate that forbids the documentation from quoting
    // its own warning.
    const css = readFileSync(CSS, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
    const start = css.indexOf("@keyframes eye-open");
    const block = css.slice(start, css.indexOf("}\n}", start));
    expect(block).not.toMatch(/\b(width|height|top|left|margin|filter|box-shadow)\s*:/);
    // Every keyframe on this site starts at opacity 0, which is why reduced motion collapses
    // durations rather than removing animations — suppressing them would leave the page blank.
    expect(css).not.toMatch(/animation:\s*none/);
  });
});
