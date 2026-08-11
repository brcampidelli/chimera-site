import { describe, expect, it } from "vitest";
import {
  ARTICLE_MIN_WORDS,
  AUTHORED_BY_AGENT,
  CATEGORIES,
  GENERATED_CATEGORIES,
  NEWS_CATEGORIES,
  SOURCES_MAX,
  articleProblems,
  postProblems,
  posts,
  releaseTagUrl,
  type Post,
  type Source,
} from "./blog";
import { SEGMENTS } from "@/i18n/locales";

/**
 * The blog is the largest fabrication surface on this site.
 *
 * "AI news" written with a model's help is a plausible-invention generator, and a paper summary is
 * the easiest thing in the world to write without reading the paper. Neither can be prevented by
 * intent, so both are prevented by frontmatter that will not compile without the admission.
 */
describe("blog — what a post has to admit before it publishes", () => {
  it("has no problems in the posts that exist", () => {
    const problems = postProblems();
    expect(problems, problems.join("\n")).toEqual([]);
  });

  it("puts every post in a real category", () => {
    for (const post of posts()) {
      expect(CATEGORIES as readonly string[], post.slug).toContain(post.category);
    }
  });

  it("lets nobody hand-write a release post", () => {
    // The CHANGELOG and the GitHub release body already hold that text. A third copy of one truth
    // is three things to keep in step, and two of them will fall behind.
    for (const post of posts()) {
      expect(GENERATED_CATEGORIES as readonly string[]).not.toContain(post.category);
    }
  });

  it("requires a primary source on anything about the outside world", () => {
    for (const post of posts()) {
      if (!(NEWS_CATEGORIES as readonly string[]).includes(post.category)) continue;
      // An analysis declares its sources as data and is checked field by field instead.
      if (post.category === "analysis") continue;
      expect(post.body, `${post.lang}/${post.slug}`).toMatch(/\]\(https?:\/\//);
    }
  });

  it("requires a paper post to say how much of the paper was read", () => {
    for (const post of posts()) {
      if (post.category !== "papers") continue;
      expect(post.read, post.slug).toBeTruthy();
      expect(post.verdict, post.slug).toBeTruthy();
      if (post.read !== "full") expect(post.coverage, post.slug).toBeTruthy();
    }
  });

  it("dates every post, because news ages in weeks", () => {
    for (const post of posts()) {
      expect(post.date, post.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("publishes an agent-written piece in every language or in none", () => {
    // Nine languages is the whole reason this format exists. A run that wrote five and dropped
    // four leaves a site that looks deliberate: some languages simply have a thinner blog.
    const byLang = new Map<string, Set<string>>();
    for (const post of posts()) {
      if (!(AUTHORED_BY_AGENT as readonly string[]).includes(post.category)) continue;
      if (!byLang.has(post.slug)) byLang.set(post.slug, new Set());
      byLang.get(post.slug)?.add(post.lang);
    }
    for (const [slug, langs] of byLang) {
      expect([...langs].sort(), slug).toEqual([...SEGMENTS].sort());
    }
  });
});

/**
 * The article rules, tested against what a bad run would actually produce.
 *
 * An agent writes this text and merges it with nobody reading it first. The digest format this
 * replaced bought its safety by leaving the writer one capped field; an article cannot be defended
 * that way, so each rule below is a failure a fluent and confident run walks into.
 */
describe("blog — an article cannot cite what it never read", () => {
  const SRC = "https://techcrunch.com/2026/08/10/a-real-article/";

  const src = (over: Partial<Source> = {}): Source => ({
    headline: "OpenAI ships a model aimed at security work",
    url: SRC,
    outlet: "TechCrunch",
    published: "2026-08-10",
    ...over,
  });

  const long = (words = ARTICLE_MIN_WORDS + 20) => Array(words).fill("palavra").join(" ");

  const article = (over: Partial<Post> = {}): Post => ({
    slug: "what-a-security-model-changes",
    lang: "en",
    title: "What a security-shaped model changes",
    date: "2026-08-11",
    category: "analysis",
    summary: "Our reading.",
    body: `${long()}\n\nSee [the report](${SRC}).`,
    sources: [src()],
    ...over,
  });

  const problemsOf = (over: Partial<Post> = {}, english?: Post) =>
    articleProblems("en/x", article(over), english);

  it("accepts a well-formed article", () => {
    expect(problemsOf()).toEqual([]);
  });

  it("refuses an analysis with no sources", () => {
    expect(problemsOf({ sources: [] }).join(" ")).toMatch(/opinion with a dateline/);
  });

  it("refuses a reading list pretending to be a thesis", () => {
    const many = Array.from({ length: SOURCES_MAX + 1 }, (_, i) =>
      src({ url: `https://a.example/${i}` }),
    );
    expect(problemsOf({ sources: many, body: `${long()} https://a.example/0` }).join(" ")).toMatch(
      new RegExp(`at most ${SOURCES_MAX}`),
    );
  });

  it("catches a citation the post never declared — the shape of an invented source", () => {
    const body = `${long()}\n\nSee [the report](${SRC}) and [this](https://invented.example/study).`;
    expect(problemsOf({ body }).join(" ")).toMatch(/not one of its declared sources/);
  });

  it("lets the body link our own pages without declaring them", () => {
    const body = `${long()}\n\n[The card](https://chimeraagent.space/en/skills/) and [${SRC}](${SRC}).`;
    expect(problemsOf({ body })).toEqual([]);
  });

  it("catches sources listed as decoration under a piece that never used them", () => {
    expect(problemsOf({ body: long() }).join(" ")).toMatch(/links none of its sources/);
  });

  it("refuses a long quotation, the one invention that damages someone else", () => {
    const quote = `"${Array(20).fill("something").join(" ")}"`;
    expect(problemsOf({ body: `${long()} ${quote} [x](${SRC})` }).join(" ")).toMatch(/long quotation/);
  });

  it("allows a short quote, because that is how prose works", () => {
    expect(problemsOf({ body: `${long()} He called it "a reboot". [x](${SRC})` })).toEqual([]);
  });

  it("does not mistake a code block for a quotation", () => {
    const code = '```\nprint("' + Array(20).fill("x").join(" ") + '")\n```';
    expect(problemsOf({ body: `${long()} ${code} [x](${SRC})` })).toEqual([]);
  });

  it("refuses an article too short to be one", () => {
    expect(problemsOf({ body: `Three words. [x](${SRC})` }).join(" ")).toMatch(
      new RegExp(`starts at ${ARTICLE_MIN_WORDS}`),
    );
  });

  describe("and a translation that silently fell back", () => {
    const english = article();

    it("catches a body that is the English text again", () => {
      const problems = articleProblems("pt/x", article({ lang: "pt" }), english);
      expect(problems.join(" ")).toMatch(/is the English text/);
    });

    it("catches a translation that came back as one paragraph", () => {
      const stub = article({ lang: "pt", body: `Curto demais. [x](${SRC})` });
      expect(articleProblems("pt/x", stub, english).join(" ")).toMatch(/the length of the English/);
    });

    it("accepts a real translation", () => {
      const pt = article({ lang: "pt", body: `${Array(240).fill("palavra").join(" ")} [x](${SRC})` });
      expect(articleProblems("pt/x", pt, english)).toEqual([]);
    });
  });

  describe("and an update about one of our releases", () => {
    const update = (over: Partial<Post> = {}): Post =>
      article({
        category: "update",
        version: "0.42.0",
        sources: undefined,
        body: `${long()}\n\n[The notes](${releaseTagUrl("0.42.0")}).`,
        ...over,
      });

    it("accepts one that links its own release", () => {
      expect(articleProblems("en/x", update())).toEqual([]);
    });

    it("insists on a version", () => {
      expect(articleProblems("en/x", update({ version: "latest" })).join(" ")).toMatch(
        /names the version it is about/,
      );
    });

    it("refuses an announcement the reader has to take on faith", () => {
      const noLink = update({ body: `${long()} and nothing to open.` });
      expect(articleProblems("en/x", noLink).join(" ")).toMatch(/must link its own release/);
    });

    it("refuses a link to a different version than the one it names", () => {
      const wrong = update({ body: `${long()}\n\n[notes](${releaseTagUrl("0.41.0")}).` });
      expect(articleProblems("en/x", wrong).join(" ")).toMatch(/must link its own release/);
    });
  });
});
