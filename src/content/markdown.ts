import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

/**
 * Markdown → HTML, not markdown → MDX.
 *
 * These files were written for MkDocs by people who had no reason to avoid a stray `<` or a curly
 * brace, and MDX would treat both as syntax. Compiling them as plain markdown means the migration
 * cannot silently mangle a sentence that has been correct for a year.
 */

export interface Heading {
  readonly depth: 2 | 3;
  readonly id: string;
  readonly text: string;
}

export interface Rendered {
  readonly html: string;
  readonly title: string;
  readonly headings: readonly Heading[];
}

/** Resolve a relative `.md` link to a site path, or throw if it points nowhere. */
export type LinkResolver = (target: string) => string;

const ADMONITION = /^!!!\s+(\w+)(?:\s+"([^"]*)")?\s*\n((?:[ \t]+.*(?:\n|$))+)/gm;

/**
 * MkDocs admonitions (`!!! warning "Title"` plus an indented body) rendered as HTML before the
 * markdown parser sees them. Raw HTML in markdown is legal and passes straight through, which is
 * a smaller surface than a parser plugin for a construct used once in 1,901 lines — and it stays
 * correct if a second one appears.
 */
export function expandAdmonitions(source: string): string {
  return source.replace(ADMONITION, (_whole, kind: string, title: string | undefined, body: string) => {
    const text = body
      .split("\n")
      .map((line) => line.replace(/^[ \t]{1,4}/, ""))
      .join("\n")
      .trim();
    const heading = title ? `<p class="admonition-title">${title}</p>\n\n` : "";
    return `<div class="admonition admonition-${kind}">\n\n${heading}${text}\n\n</div>\n`;
  });
}

/** The first `# ` line is the page title; it is rendered as the page heading, not in the body. */
export function splitTitle(source: string): { title: string; body: string } {
  const match = source.match(/^#\s+(.+)$/m);
  if (!match) return { title: "", body: source };
  const line = match[0];
  return { title: match[1]!.trim(), body: source.replace(line, "").trimStart() };
}

interface HastNode {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

function walk(node: HastNode, visit: (n: HastNode) => void): void {
  visit(node);
  for (const child of node.children ?? []) walk(child, visit);
}

function textOf(node: HastNode): string {
  let out = "";
  walk(node, (n) => {
    if (n.type === "text" && typeof n.value === "string") out += n.value;
  });
  return out.trim();
}

/**
 * Rewrite `foo.md` and `foo.md#anchor` into site paths, and refuse anything that resolves to
 * nothing. A docs site whose internal links 404 is worse than one with fewer pages: the reader
 * assumes the content exists and that they did something wrong.
 */
function rewriteLinks(resolve: LinkResolver) {
  return () => (tree: HastNode) => {
    walk(tree, (node) => {
      if (node.tagName !== "a") return;
      const href = node.properties?.["href"];
      if (typeof href !== "string") return;
      if (/^([a-z]+:|\/\/|#|\/)/i.test(href)) {
        // Absolute, protocol-relative, in-page or already rooted. External links get the usual
        // hygiene; internal ones are left alone.
        if (/^[a-z]+:\/\//i.test(href)) {
          node.properties!["rel"] = "noreferrer";
        }
        return;
      }
      node.properties!["href"] = resolve(href);
    });
  };
}

function collectHeadings(sink: Heading[]) {
  return () => (tree: HastNode) => {
    walk(tree, (node) => {
      if (node.tagName !== "h2" && node.tagName !== "h3") return;
      const id = node.properties?.["id"];
      if (typeof id !== "string") return;
      sink.push({ depth: node.tagName === "h2" ? 2 : 3, id, text: textOf(node) });
    });
  };
}

export async function renderMarkdown(source: string, resolve: LinkResolver): Promise<Rendered> {
  const { title, body } = splitTitle(source);
  const headings: Heading[] = [];

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(collectHeadings(headings))
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeHighlight, { detect: true, ignoreMissing: true })
    .use(rewriteLinks(resolve))
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(expandAdmonitions(body));

  return { html: String(file), title, headings };
}
