import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { localePath, type LocaleSegment } from "@/i18n/locales";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const BLOG_DIR = join(ROOT, "content", "blog");

/**
 * The blog has two natures and they need opposite treatment.
 *
 * `release` is **generated** from the GitHub release body. The CHANGELOG already holds thousands
 * of lines of carefully written notes and every release already has an authored body; rewriting
 * that into a post would create a third version of the same truth, and three versions of one
 * truth diverge. So no one may author a `release` post — `blog.test.ts` enforces it.
 *
 * The other six are editorial and hand-written. They are also the largest fabrication surface on
 * this site: "AI news" written with a model's help is a plausible-invention generator. The defence
 * is cheap and absolute — every factual post must link a primary source, and a paper post must
 * declare how much of the paper was actually read.
 */
export const CATEGORIES = [
  "release",
  "terminal",
  "desktop",
  "ai",
  "llms",
  "agents",
  "papers",
  "digest",
] as const;

export type Category = (typeof CATEGORIES)[number];

/** Categories nobody may author. */
export const GENERATED_CATEGORIES: readonly Category[] = ["release"];

/** Categories that report on the outside world, and therefore owe a source. */
export const NEWS_CATEGORIES: readonly Category[] = ["ai", "llms", "agents", "papers", "digest"];

export type ReadDepth = "full" | "partial" | "abstract-only";
export type Verdict = "adopt" | "adapt" | "park" | "skip";

/**
 * One item in a digest, as data rather than as prose.
 *
 * This is the whole defence. A digest is assembled twice a day by an agent reading the feeds, and
 * the failure mode of that arrangement is not a missing link — it is a post that links a real
 * article and then describes, fluently and at length, something the article does not say. A link
 * was already required and would not have caught it.
 *
 * So the headline, the outlet, the date and the URL live here, in frontmatter, and the page renders
 * them from these fields. Prose cannot contradict them because prose is not where they are. What is
 * left for the writer is `comment` — ours, labelled as ours, and short enough that it cannot smuggle
 * a paragraph of invented fact past a reader who came for the headline.
 */
export interface DigestItem {
  /** The headline as the outlet published it. Not a rewrite, not a translation. */
  readonly headline: string;
  readonly url: string;
  readonly outlet: string;
  /** The article's own publication date, not ours. */
  readonly published: string;
  /** Our commentary. Rendered as commentary, capped, and never confusable with reporting. */
  readonly comment: string;
}

/** How many items a single digest may carry. Three is the cadence Bruno asked for; the cap is what
 * stops a bad run from emptying a feed reader onto the site. */
export const DIGEST_MAX_ITEMS = 3;

/** Two sentences of opinion. Past this it stops being commentary and starts being reporting. */
export const DIGEST_COMMENT_MAX = 400;

export interface PostMeta {
  readonly slug: string;
  readonly lang: LocaleSegment;
  readonly title: string;
  readonly date: string;
  readonly updated?: string;
  readonly category: Category;
  readonly summary: string;
  /** Papers only. */
  readonly arxiv?: string;
  readonly read?: ReadDepth;
  readonly coverage?: string;
  readonly verdict?: Verdict;
  readonly relevance?: string;
  /** Digests only. */
  readonly items?: readonly DigestItem[];
  /**
   * Candidates the run gathered and threw away, and why.
   *
   * A digest that silently ships two items when it looked at nine reads as "there were two". The
   * run knows the difference and the page says it.
   */
  readonly dropped?: string;
}

export interface Post extends PostMeta {
  readonly body: string;
}

/**
 * A frontmatter date as `YYYY-MM-DD`, in the day it was written.
 *
 * YAML parses an unquoted `2026-08-09` into a `Date` at UTC midnight. Rendering that with
 * `String()` prints it in the *reader's* timezone, so a post dated the 9th shows as the 8th to
 * everyone west of UTC — a date that is wrong for a third of the planet and right where it was
 * tested. The instant is UTC, so the UTC parts are the ones that mean what the author typed.
 */
function isoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

/** One frontmatter item, with every field coerced to a string so a malformed one fails the gate
 * with a message about the field rather than crashing the build with a message about `undefined`. */
function digestItem(raw: Record<string, unknown>): DigestItem {
  return {
    headline: String(raw?.headline ?? ""),
    url: String(raw?.url ?? ""),
    outlet: String(raw?.outlet ?? ""),
    published: isoDate(raw?.published),
    comment: String(raw?.comment ?? ""),
  };
}

export function blogAvailable(): boolean {
  return existsSync(BLOG_DIR);
}

function langDirs(): LocaleSegment[] {
  if (!blogAvailable()) return [];
  return readdirSync(BLOG_DIR) as LocaleSegment[];
}

/**
 * Every authored post. Posts exist in the languages they were written in — the blog is Tier 2, and
 * a post that only exists in English is not pretending otherwise.
 */
export function posts(): Post[] {
  const out: Post[] = [];
  for (const lang of langDirs()) {
    const dir = join(BLOG_DIR, lang);
    for (const file of readdirSync(dir)) {
      if (!file.endsWith(".md")) continue;
      const parsed = matter(readFileSync(join(dir, file), "utf8"));
      const data = parsed.data as Record<string, unknown>;
      out.push({
        slug: file.slice(0, -3),
        lang,
        title: String(data.title ?? ""),
        date: isoDate(data.date),
        updated: data.updated ? isoDate(data.updated) : undefined,
        category: String(data.category ?? "") as Category,
        summary: String(data.summary ?? ""),
        arxiv: data.arxiv ? String(data.arxiv) : undefined,
        read: data.read ? (String(data.read) as ReadDepth) : undefined,
        coverage: data.coverage ? String(data.coverage) : undefined,
        verdict: data.verdict ? (String(data.verdict) as Verdict) : undefined,
        relevance: data.relevance ? String(data.relevance) : undefined,
        items: Array.isArray(data.items)
          ? (data.items as unknown[]).map((raw) => digestItem(raw as Record<string, unknown>))
          : undefined,
        dropped: data.dropped ? String(data.dropped) : undefined,
        body: parsed.content,
      });
    }
  }
  return out.sort((a, b) => b.date.localeCompare(a.date));
}

export function postsFor(lang: LocaleSegment): Post[] {
  return posts().filter((post) => post.lang === lang);
}

export function postBySlug(lang: LocaleSegment, slug: string): Post | undefined {
  return posts().find((post) => post.lang === lang && post.slug === slug);
}

/** The languages a post exists in — what `hreflang` may honestly claim. */
export function translationsOf(slug: string): LocaleSegment[] {
  return posts()
    .filter((post) => post.slug === slug)
    .map((post) => post.lang);
}

const EXTERNAL_LINK = /\]\(https?:\/\//;

/**
 * Everything wrong with one digest.
 *
 * These rules exist because a digest is written by a machine twice a day and merged without anyone
 * reading it first. That is the arrangement Bruno chose, and it is defensible only if the format
 * itself refuses the failure — so every rule here is one a fluent, confident, wrong run would trip
 * over.
 */
export function digestProblems(id: string, post: Post): string[] {
  const problems: string[] = [];
  const items = post.items ?? [];

  if (items.length === 0) {
    problems.push(`${id}: a digest with no items is an empty page with a date on it`);
  }
  if (items.length > DIGEST_MAX_ITEMS) {
    problems.push(`${id}: ${items.length} items, and a digest carries at most ${DIGEST_MAX_ITEMS}`);
  }

  // Links belong in `items`, where they are checked. A link loose in the body is prose that got
  // its own source, which is exactly the structure this format replaced.
  if (EXTERNAL_LINK.test(post.body) || /https?:\/\//.test(post.body)) {
    problems.push(`${id}: a digest keeps its links in items, not in the body`);
  }

  const seen = new Set<string>();
  items.forEach((item, i) => {
    const at = `${id}: item ${i + 1}`;
    if (!item.headline) problems.push(`${at} has no headline`);
    if (!item.outlet) problems.push(`${at} does not say which outlet published it`);
    if (!/^https:\/\//.test(item.url)) {
      problems.push(`${at} needs an https url, got "${item.url}"`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(item.published)) {
      problems.push(`${at} needs the article's own date as YYYY-MM-DD, got "${item.published}"`);
    }
    if (!item.comment) {
      problems.push(`${at} has no comment — a headline with no reading is a bookmark, not a post`);
    }
    if (item.comment.length > DIGEST_COMMENT_MAX) {
      problems.push(
        `${at}: comment is ${item.comment.length} characters and the cap is ${DIGEST_COMMENT_MAX}. ` +
          "Past that it stops being commentary and starts being reporting we did not do.",
      );
    }
    if (seen.has(item.url)) problems.push(`${at} repeats a url already in this digest`);
    seen.add(item.url);
  });

  return problems;
}

/**
 * Everything wrong with the authored posts.
 *
 * Returned rather than thrown so the gate can report all of it at once — a validator that stops at
 * the first problem turns one review into five.
 */
export function postProblems(): string[] {
  const problems: string[] = [];
  for (const post of posts()) {
    const id = `${post.lang}/${post.slug}`;

    if (!post.title) problems.push(`${id}: no title`);
    if (!post.summary) problems.push(`${id}: no summary`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date)) {
      problems.push(`${id}: date must be YYYY-MM-DD, got "${post.date}"`);
    }
    if (!(CATEGORIES as readonly string[]).includes(post.category)) {
      problems.push(`${id}: "${post.category}" is not a category`);
    }
    if ((GENERATED_CATEGORIES as readonly string[]).includes(post.category)) {
      problems.push(
        `${id}: "${post.category}" posts are generated from the GitHub release, not written. ` +
          "A hand-written copy becomes a third version of the same truth.",
      );
    }
    if (/^v?\d+\.\d+\.\d+/.test(post.slug)) {
      problems.push(`${id}: a version-numbered slug belongs to the generated release stream`);
    }

    // News owes a source. A post about the outside world with no link out is an assertion the
    // reader cannot check, which is the shape every fabricated claim takes. A digest carries its
    // sources as data instead, and is checked field by field below.
    if ((NEWS_CATEGORIES as readonly string[]).includes(post.category) && post.category !== "digest") {
      if (!EXTERNAL_LINK.test(post.body)) {
        problems.push(`${id}: a ${post.category} post must link at least one primary source`);
      }
    }

    if (post.category === "digest") {
      problems.push(...digestProblems(id, post));
    } else if (post.items || post.dropped) {
      problems.push(`${id}: items/dropped belong to a digest`);
    }

    if (post.category === "papers") {
      if (!post.arxiv) problems.push(`${id}: a paper post needs its arXiv id`);
      if (!post.read) {
        problems.push(`${id}: declare how much of it you read — full, partial or abstract-only`);
      }
      if (post.read && post.read !== "full" && !post.coverage) {
        problems.push(`${id}: read is "${post.read}", so coverage is required`);
      }
      if (!post.verdict) {
        problems.push(`${id}: a paper post needs a verdict — adopt, adapt, park or skip`);
      }
    } else if (post.arxiv || post.read || post.verdict) {
      problems.push(`${id}: arxiv/read/verdict belong to a papers post`);
    }
  }
  return problems;
}

export function blogHref(locale: LocaleSegment, slug?: string): string {
  return slug ? localePath(locale, `/blog/${slug}`) : localePath(locale, "/blog");
}

export function categoryHref(locale: LocaleSegment, category: Category): string {
  return localePath(locale, `/blog/category/${category}`);
}
