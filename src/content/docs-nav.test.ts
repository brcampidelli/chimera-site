import { describe, expect, it } from "vitest";
import { docSlugs, docsAvailable, linkResolver } from "./docs";
import { DOCS_NAV, NAV_SLUGS } from "./docs-nav";
import { expandAdmonitions, splitTitle, stripMaterialSyntax } from "./markdown";

/**
 * The navigation used to live in `mkdocs.yml`, which this change retires. These assertions are
 * what replaces the tool: the grouping is now a hand-authored list, and a hand-authored list of
 * files is exactly the thing that goes stale the first time somebody adds a page.
 */
describe("docs nav — every page reachable, every entry real", () => {
  it("lists every documentation file exactly once", () => {
    if (!docsAvailable()) {
      console.warn("skipped: chimera-agent docs not found");
      return;
    }
    const onDisk = docSlugs();
    const missing = onDisk.filter((slug) => !NAV_SLUGS.includes(slug));
    // A page that exists and is not in the nav is a page nobody reads. Adding a doc should force
    // the author to decide where it belongs, not let it disappear.
    expect(missing, `not reachable from the nav: ${missing.join(", ")}`).toEqual([]);
  });

  it("has no entry pointing at a file that does not exist", () => {
    if (!docsAvailable()) return;
    const onDisk = new Set(docSlugs());
    const dead = NAV_SLUGS.filter((slug) => !onDisk.has(slug));
    expect(dead, `nav entries with no file: ${dead.join(", ")}`).toEqual([]);
  });

  it("never lists the same page in two places", () => {
    expect(new Set(NAV_SLUGS).size).toBe(NAV_SLUGS.length);
  });

  it("gives every section a heading and at least one page", () => {
    for (const section of DOCS_NAV) {
      expect(section.heading.length).toBeGreaterThan(0);
      expect(section.items.length).toBeGreaterThan(0);
    }
  });
});

describe("docs links — a dead internal link fails the build", () => {
  it("rewrites a sibling .md link into a site path", () => {
    if (!docsAvailable()) return;
    const resolve = linkResolver("en", "index");
    expect(resolve("usage.md")).toBe("/en/docs/usage/");
    expect(resolve("usage.md#configure")).toBe("/en/docs/usage/#configure");
  });

  it("sends index.md to the section root, not to /docs/index/", () => {
    if (!docsAvailable()) return;
    expect(linkResolver("pt", "usage")("index.md")).toBe("/pt/docs/");
  });

  it("throws rather than emitting a 404 for the reader to find", () => {
    if (!docsAvailable()) return;
    expect(() => linkResolver("en", "index")("nope.md")).toThrow(/does not exist/);
  });

  it("sends a link that climbs out of docs/ to the file on GitHub", () => {
    // `usage.md` links to `../bench/swe_bench/RESULTS.md`: real, in the repository, and with no
    // page here. Dropping it would lose the evidence the documentation leans on hardest.
    if (!docsAvailable()) return;
    expect(linkResolver("en", "usage")("../bench/swe_bench/RESULTS.md")).toBe(
      "https://github.com/brcampidelli/chimera-agent/blob/main/bench/swe_bench/RESULTS.md",
    );
    expect(linkResolver("en", "extending")("../examples")).toContain("/blob/main/examples");
  });
});

describe("markdown — MkDocs constructs survive the move", () => {
  it("turns an admonition into a callout instead of leaving `!!!` on the page", () => {
    const out = expandAdmonitions('!!! warning "The one rule"\n    Body text here.\n');
    expect(out).toContain('class="admonition admonition-warning"');
    expect(out).toContain("The one rule");
    expect(out).toContain("Body text here.");
    expect(out).not.toContain("!!!");
  });

  it("leaves ordinary prose alone", () => {
    const prose = "Just a paragraph with an exclamation!\n";
    expect(expandAdmonitions(prose)).toBe(prose);
  });

  it("drops a Material icon instead of publishing its source", () => {
    // Six of these were live on /docs/ in all nine languages, as the first thing on the page.
    const out = stripMaterialSyntax("- **:material-rocket-launch: Get started**\n");
    expect(out).toBe("- **Get started**\n");
    expect(out).not.toContain("material-");
  });

  it("lets a card grid render as a list rather than an inert div", () => {
    // `markdown="1"` is a Python-Markdown attribute; nothing here reads it, so the list inside
    // stayed unparsed. The class survives because the stylesheet is what it is for.
    const out = stripMaterialSyntax('<div class="grid cards" markdown>\n\n- One\n\n</div>\n');
    expect(out).toContain('<div class="grid cards">');
    expect(out).not.toContain("markdown>");
  });

  it("leaves a colon that is not an icon alone", () => {
    const prose = "Run it: the ratio is 3:1 and the flag is `--fuse`.\n";
    expect(stripMaterialSyntax(prose)).toBe(prose);
  });

  it("lifts the H1 out of the body so it is not rendered twice", () => {
    const { title, body } = splitTitle("# Chimera — Architecture\n\nThe core.\n");
    expect(title).toBe("Chimera — Architecture");
    expect(body).not.toContain("# Chimera");
  });
});
