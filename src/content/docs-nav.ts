/**
 * The documentation's shape.
 *
 * Carried over once from the `nav:` block of the product's `mkdocs.yml`, which is retired in the
 * same change that this file lands. The grouping is curated — task-oriented, not alphabetical —
 * and that judgement was worth keeping even though the tool that held it is going away.
 *
 * From here on it is the site's, and `docs-nav.test.ts` is what keeps it honest: every synced
 * `.md` appears here exactly once, and every entry resolves to a file that exists. A page that
 * exists and is unreachable is a page nobody reads; an entry that resolves to nothing is a dead
 * link in the one place a reader is most likely to trust.
 */
export interface DocsSection {
  /** Translation key for the group heading. Untranslated groups fall back to English. */
  readonly heading: string;
  readonly items: readonly { readonly slug: string; readonly label: string }[];
}

export const DOCS_NAV: readonly DocsSection[] = [
  {
    heading: "Home",
    items: [{ slug: "index", label: "Overview" }],
  },
  {
    heading: "Get started",
    items: [{ slug: "usage", label: "Install & first run" }],
  },
  {
    heading: "Do something real",
    items: [{ slug: "recipes", label: "Recipes overview" }],
  },
  {
    heading: "Connect",
    items: [{ slug: "mcp", label: "MCP servers" }],
  },
  {
    heading: "Extend",
    items: [{ slug: "extending", label: "Add a tool, skill, or recipe" }],
  },
  {
    heading: "Operate",
    items: [
      { slug: "deploy", label: "Deploy (Docker / systemd)" },
      { slug: "security", label: "Security & safeguards" },
    ],
  },
  {
    heading: "Understand",
    items: [
      { slug: "architecture", label: "Architecture" },
      { slug: "fusion-receipts", label: "Fusion receipts" },
      { slug: "benchmarks", label: "Benchmarks" },
    ],
  },
];

/** Every slug the nav points at, in reading order. */
export const NAV_SLUGS: readonly string[] = DOCS_NAV.flatMap((s) => s.items.map((i) => i.slug));

/** `index` is the docs landing page and lives at `/docs/`, not `/docs/index/`. */
export const DOCS_INDEX_SLUG = "index";
