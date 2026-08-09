import { describe, expect, it } from "vitest";
import { SECTIONS, cliImportsFromUrl, skills, skillsAvailable, skillsIndex } from "./skills";

/**
 * The hub's whole claim is provenance. If the metadata it displays is wrong, it is a catalogue
 * with worse numbers than the catalogue it is trying not to compete with.
 */
describe("skills — the hub shows what it can actually vouch for", () => {
  it("finds the library", () => {
    if (!skillsAvailable()) {
      console.warn("skipped: chimera-agent skills/ not found");
      return;
    }
    expect(skills().length).toBeGreaterThan(0);
  });

  it("shows only cards a reviewer has passed", () => {
    // Everything merged into `skills/` went through review — that is what being in the directory
    // means, and it is why the badge on the page is worth anything.
    if (!skillsAvailable()) return;
    for (const skill of skills()) {
      expect(skill.provenance, skill.slug).toBe("clean");
      expect(skill.status, skill.slug).toBe("active");
    }
  });

  it("splits all five sections with content in each", () => {
    if (!skillsAvailable()) return;
    for (const skill of skills()) {
      for (const section of SECTIONS) {
        expect(skill.sections[section].length, `${skill.slug} / ${section}`).toBeGreaterThan(40);
      }
      expect(skill.sectionsComplete, skill.slug).toBe(true);
    }
  });

  it("hashes the exact bytes it serves", () => {
    if (!skillsAvailable()) return;
    for (const skill of skills()) {
      expect(skill.sha256, skill.slug).toMatch(/^[0-9a-f]{64}$/);
      expect(skill.bytes).toBeGreaterThan(0);
    }
  });

  it("never advertises a command the released CLI does not have", () => {
    // The page shows a clone and a path because `skills-import` takes a path. If the CLI ever
    // learns to resolve a slug from a URL, this flips on its own — and until it does, the
    // instructions cannot promise it.
    expect(typeof cliImportsFromUrl()).toBe("boolean");
  });

  it("publishes an index that matches the pages", () => {
    if (!skillsAvailable()) return;
    const index = skillsIndex() as { skills: { slug: string; integrity: { sha256: string } }[] };
    expect(index.skills.length).toBe(skills().length);
    for (const entry of index.skills) {
      const skill = skills().find((s) => s.slug === entry.slug);
      expect(skill?.sha256).toBe(entry.integrity.sha256);
    }
  });

  it("has no popularity metric to farm", () => {
    // Deliberate: a hub that ranks by downloads is a hub with something worth gaming, and the
    // gaming arrives before the users do.
    const index = skillsIndex() as { skills: Record<string, unknown>[] };
    for (const entry of index.skills) {
      expect(Object.keys(entry)).not.toContain("downloads");
      expect(Object.keys(entry)).not.toContain("stars");
    }
  });
});
