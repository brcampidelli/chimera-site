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
  /** Translation key for the group heading (`docs.nav*`). */
  readonly heading: string;
  /** Each item's `label` is a translation key too, not the text. */
  readonly items: readonly { readonly slug: string; readonly label: string }[];
}

export const DOCS_NAV: readonly DocsSection[] = [
  {
    heading: "docs.navHome",
    items: [{ slug: "index", label: "docs.navOverview" }],
  },
  {
    heading: "docs.navGetStarted",
    items: [{ slug: "usage", label: "docs.navInstall" }],
  },
  {
    heading: "docs.navDoSomethingReal",
    items: [{ slug: "recipes", label: "docs.navRecipes" }],
  },
  {
    heading: "docs.navConnect",
    items: [
      { slug: "mcp", label: "docs.navMcp" },
      // A whole agent rather than a tool, but the reader arrives with the same question — "how do
      // I connect the thing I already use?" — and this grouping is the one that answers it.
      { slug: "external-agents", label: "docs.navExternalAgents" },
    ],
  },
  {
    heading: "docs.navExtend",
    items: [{ slug: "extending", label: "docs.navExtending" }],
  },
  {
    heading: "docs.navOperate",
    items: [
      { slug: "deploy", label: "docs.navDeploy" },
      { slug: "security", label: "docs.navSecurity" },
    ],
  },
  {
    heading: "docs.navUnderstand",
    items: [
      { slug: "architecture", label: "docs.navArchitecture" },
      // All 79, generated from the CLI itself in the agent repo — including the 33 that used to
      // appear in no doc at all. Under "Understand" rather than "Get started": it is a reference
      // you come back to, not a page you read once.
      { slug: "commands", label: "docs.navCommands" },
      { slug: "fusion-receipts", label: "docs.navFusionReceipts" },
      { slug: "benchmarks", label: "docs.navBenchmarks" },
    ],
  },
];

/** Every slug the nav points at, in reading order. */
export const NAV_SLUGS: readonly string[] = DOCS_NAV.flatMap((s) => s.items.map((i) => i.slug));

/** `index` is the docs landing page and lives at `/docs/`, not `/docs/index/`. */
export const DOCS_INDEX_SLUG = "index";
