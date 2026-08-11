import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { SEGMENTS, localePath, type LocaleSegment } from "@/i18n/locales";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const BLOG_DIR = join(ROOT, "content", "blog");

/**
 * The blog has three natures and they need different treatment.
 *
 * `release` is **generated** from the GitHub release body. The CHANGELOG already holds thousands
 * of lines of carefully written notes and every release already has an authored body; rewriting
 * that into a post would create a third version of the same truth, and three versions of one
 * truth diverge. So no one may author a `release` post — `blog.test.ts` enforces it.
 *
 * `terminal`, `desktop`, `ai`, `llms`, `agents` and `papers` are editorial and hand-written. They
 * are the largest fabrication surface on this site: "AI news" written with a model's help is a
 * plausible-invention generator. The defence is cheap and absolute — every factual post must link
 * a primary source, and a paper post must declare how much of the paper was actually read.
 *
 * `analysis` and `update` are **written by an agent and merged without a human reading them**,
 * which is a different problem again. It replaced a digest format whose whole defence was leaving
 * the writer almost nothing to say: headline, outlet, date and link lived in frontmatter and the
 * only prose was one capped comment. That defence does not survive an article, so `articleProblems`
 * below is its replacement, and every rule there is one a fluent, confident, wrong run trips over.
 */
export const CATEGORIES = [
  "release",
  "terminal",
  "desktop",
  "ai",
  "llms",
  "agents",
  "papers",
  "analysis",
  "update",
] as const;

export type Category = (typeof CATEGORIES)[number];

/** Categories nobody may author. */
export const GENERATED_CATEGORIES: readonly Category[] = ["release"];

/** Categories that report on the outside world, and therefore owe a source. */
export const NEWS_CATEGORIES: readonly Category[] = ["ai", "llms", "agents", "papers", "analysis"];

/**
 * The two categories an agent writes, in nine languages, in one run.
 *
 * Grouped because the rules that matter apply to both: the whole run publishes or none of it does,
 * and a translation that silently fell back to English is a failure the reader cannot see.
 */
export const AUTHORED_BY_AGENT: readonly Category[] = ["analysis", "update"];

export type ReadDepth = "full" | "partial" | "abstract-only";
export type Verdict = "adopt" | "adapt" | "park" | "skip";

/**
 * One article the piece was written from, as data rather than as prose.
 *
 * The headline, the outlet, the date and the URL live here and the page renders them from these
 * fields, so the reader can always see what was actually read — the one property of the old digest
 * format worth keeping. Prose cannot contradict them because prose is not where they are.
 *
 * What changed is everything else: the body is now ours. So the rules moved from "the writer has
 * almost nothing to say" to "whatever the writer says, it cannot cite a source it did not declare
 * and it cannot put words in anyone's mouth". See `articleProblems`.
 */
export interface Source {
  /** The headline as the outlet published it. Not a rewrite, not a translation. */
  readonly headline: string;
  readonly url: string;
  readonly outlet: string;
  /** The article's own publication date, not ours. */
  readonly published: string;
}

/** How many articles one piece may declare. Past this it is a reading list, not a thesis. */
export const SOURCES_MAX = 4;

/** An English article shorter than this is a comment with a headline on it. */
export const ARTICLE_MIN_WORDS = 250;

/** And longer than this is reporting we did not do. */
export const ARTICLE_MAX_WORDS = 1400;

/**
 * How far a translation may sit from the English, measured in characters.
 *
 * Not style policing — a truncation detector. A run where the model returned one paragraph instead
 * of eight produces a page that reads fine and is missing most of the argument, and nobody reads
 * nine languages before merging. Chinese runs near half the character count of English and German
 * somewhat over it, so the band is wide enough to never fire on a real translation.
 */
export const TRANSLATION_LENGTH_BAND = { min: 0.35, max: 2.6 } as const;

/**
 * Links to our own things, which need no declared source because they are not claims about others.
 *
 * Anything else in the body has to be a URL the post declared in `sources` — an article that cites
 * a page it never listed is the exact shape of an invented citation.
 */
const OURS = /^https:\/\/(chimeraagent\.space|github\.com\/brcampidelli|pypi\.org\/project\/chimera-agent)/;

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
  /** Analysis only — the articles the piece was written from. */
  readonly sources?: readonly Source[];
  /** Updates only — the version this post is about, so the page can link the release it names. */
  readonly version?: string;
  /**
   * Candidates the run gathered and threw away, and why.
   *
   * A run that ships one piece after reading forty reads as "there was one story today" unless it
   * says otherwise. The run knows the difference and the page says it.
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

/** One frontmatter source, with every field coerced to a string so a malformed one fails the gate
 * with a message about the field rather than crashing the build with a message about `undefined`. */
function source(raw: Record<string, unknown>): Source {
  return {
    headline: String(raw?.headline ?? ""),
    url: String(raw?.url ?? ""),
    outlet: String(raw?.outlet ?? ""),
    published: isoDate(raw?.published),
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
        sources: Array.isArray(data.sources)
          ? (data.sources as unknown[]).map((raw) => source(raw as Record<string, unknown>))
          : undefined,
        version: data.version ? String(data.version) : undefined,
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

/** Code, removed before any rule looks at prose. A shell one-liner is not a quotation. */
function prose(body: string): string {
  return body.replace(/```[\s\S]*?```/g, " ").replace(/`[^`\n]*`/g, " ");
}

const URL_IN_BODY = /https?:\/\/[^\s)<>"'\]]+/g;

/**
 * A quotation long enough to be words in someone's mouth.
 *
 * Of everything a confident model invents, this is the one that does real damage to someone else:
 * a plausible sentence attributed to a named person who never said it. Short quotes — a phrase from
 * a headline, a product name — are how normal prose works and stay legal. Written with explicit
 * code points so the CJK and European quote marks survive any editor that touches this file.
 */
const LONG_QUOTE = new RegExp(
  [
    '"[^"\\n]{60,}"',
    "“[^”\\n]{60,}”",
    "«[^»\\n]{60,}»",
    "「[^」\\n]{30,}」",
    "„[^“”\\n]{60,}[“”]",
  ].join("|"),
);

export const releaseTagUrl = (version: string) =>
  `https://github.com/brcampidelli/chimera-agent/releases/tag/v${version}`;

/**
 * Everything wrong with one agent-written article.
 *
 * These rules exist because an agent writes this text and it merges without anyone reading it
 * first. That is the arrangement Bruno chose, and it is defensible only if the format itself
 * refuses the failure. The old digest format bought that by leaving the writer one capped field;
 * an article cannot be defended that way, so the defence moved to what a wrong run would do:
 * cite a page it never read, quote someone who never spoke, and — the quiet one — return the
 * English text again for a language it failed to translate.
 *
 * `english` is the same post in English, when there is one. Pass it and the translation rules
 * apply; omit it and only the single-post rules do.
 */
export function articleProblems(id: string, post: Post, english?: Post): string[] {
  const problems: string[] = [];
  const sources = post.sources ?? [];
  const body = prose(post.body);

  if (post.category === "analysis") {
    if (sources.length === 0) {
      problems.push(`${id}: an analysis with no sources is an opinion with a dateline`);
    }
    if (sources.length > SOURCES_MAX) {
      problems.push(`${id}: ${sources.length} sources, and a piece declares at most ${SOURCES_MAX}`);
    }
  }

  if (post.category === "update") {
    if (!/^\d+\.\d+\.\d+$/.test(post.version ?? "")) {
      problems.push(`${id}: an update names the version it is about, got "${post.version ?? ""}"`);
    } else if (!post.body.includes(releaseTagUrl(post.version as string))) {
      problems.push(
        `${id}: an update about ${post.version} must link its own release, ` +
          `${releaseTagUrl(post.version as string)}. A version nobody can open is an announcement ` +
          "the reader has to take on faith.",
      );
    }
  }

  const declared = new Set<string>();
  sources.forEach((item, i) => {
    const at = `${id}: source ${i + 1}`;
    if (!item.headline) problems.push(`${at} has no headline`);
    if (!item.outlet) problems.push(`${at} does not say which outlet published it`);
    if (!/^https:\/\//.test(item.url)) {
      problems.push(`${at} needs an https url, got "${item.url}"`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(item.published)) {
      problems.push(`${at} needs the article's own date as YYYY-MM-DD, got "${item.published}"`);
    }
    if (declared.has(item.url)) problems.push(`${at} repeats a url already declared`);
    declared.add(item.url);
  });

  // A citation to something the post never declared. This is what an invented source looks like:
  // a real-looking URL, in a sentence that reads like it was checked.
  for (const url of body.match(URL_IN_BODY) ?? []) {
    const clean = url.replace(/[.,;:]+$/, "");
    if (!declared.has(clean) && !OURS.test(clean)) {
      problems.push(`${id}: the body cites ${clean}, which is not one of its declared sources`);
    }
  }

  // And the opposite failure: sources listed as decoration under a piece that never used them.
  if (post.category === "analysis" && sources.length > 0) {
    if (![...declared].some((url) => post.body.includes(url))) {
      problems.push(
        `${id}: the body links none of its sources — a reader cannot check a claim against a list`,
      );
    }
  }

  if (LONG_QUOTE.test(body)) {
    problems.push(
      `${id}: a long quotation. Words in a named person's mouth are the one invention that ` +
        "damages someone outside this project, so the format does not carry them.",
    );
  }

  if (post.lang === "en") {
    const words = body.split(/\s+/).filter(Boolean).length;
    if (words < ARTICLE_MIN_WORDS) {
      problems.push(`${id}: ${words} words, and an article starts at ${ARTICLE_MIN_WORDS}`);
    }
    if (words > ARTICLE_MAX_WORDS) {
      problems.push(`${id}: ${words} words, and ${ARTICLE_MAX_WORDS} is where analysis becomes reporting`);
    }
  } else if (english) {
    if (post.body.trim() === english.body.trim()) {
      problems.push(
        `${id}: the body is the English text. A translation run that fell back is invisible to ` +
          "the reader and has to be visible here.",
      );
    }
    const ratio = post.body.length / Math.max(english.body.length, 1);
    if (ratio < TRANSLATION_LENGTH_BAND.min || ratio > TRANSLATION_LENGTH_BAND.max) {
      problems.push(
        `${id}: ${Math.round(ratio * 100)}% the length of the English. A translation that came ` +
          "back as one paragraph reads fine and is missing the argument.",
      );
    }
  }

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
  const all = posts();
  for (const post of all) {
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
    // reader cannot check, which is the shape every fabricated claim takes. An analysis declares
    // its sources as data instead, and is checked field by field below.
    if ((NEWS_CATEGORIES as readonly string[]).includes(post.category) && post.category !== "analysis") {
      if (!EXTERNAL_LINK.test(post.body)) {
        problems.push(`${id}: a ${post.category} post must link at least one primary source`);
      }
    }

    if ((AUTHORED_BY_AGENT as readonly string[]).includes(post.category)) {
      problems.push(...articleProblems(id, post, all.find((p) => p.slug === post.slug && p.lang === "en")));
    } else if (post.sources || post.version || post.dropped) {
      problems.push(`${id}: sources/version/dropped belong to an agent-written post`);
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

  // An agent-written piece publishes in nine languages or not at all.
  //
  // Not a nicety. The reason this format exists is that the reader gets our text in their own
  // language; a run that wrote five and dropped four leaves a site that looks deliberate — four
  // quiet 404s, or worse, a language whose blog simply has less in it. The hand-written categories
  // are exempt: the blog is Tier 2 and a post written in one language is not pretending otherwise.
  const byLang = new Map<string, Set<string>>();
  for (const post of all) {
    if (!(AUTHORED_BY_AGENT as readonly string[]).includes(post.category)) continue;
    if (!byLang.has(post.slug)) byLang.set(post.slug, new Set());
    byLang.get(post.slug)?.add(post.lang);
  }
  for (const [slug, langs] of byLang) {
    const missing = SEGMENTS.filter((seg) => !langs.has(seg));
    if (missing.length) {
      problems.push(`${slug}: written in ${langs.size} of ${SEGMENTS.length} languages, missing ${missing.join(", ")}`);
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
