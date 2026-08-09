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
] as const;

export type Category = (typeof CATEGORIES)[number];

/** Categories nobody may author. */
export const GENERATED_CATEGORIES: readonly Category[] = ["release"];

/** Categories that report on the outside world, and therefore owe a source. */
export const NEWS_CATEGORIES: readonly Category[] = ["ai", "llms", "agents", "papers"];

export type ReadDepth = "full" | "partial" | "abstract-only";
export type Verdict = "adopt" | "adapt" | "park" | "skip";

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
    // reader cannot check, which is the shape every fabricated claim takes.
    if ((NEWS_CATEGORIES as readonly string[]).includes(post.category)) {
      if (!EXTERNAL_LINK.test(post.body)) {
        problems.push(`${id}: a ${post.category} post must link at least one primary source`);
      }
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
