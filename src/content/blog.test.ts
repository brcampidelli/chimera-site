import { describe, expect, it } from "vitest";
import {
  CATEGORIES,
  DIGEST_COMMENT_MAX,
  DIGEST_MAX_ITEMS,
  GENERATED_CATEGORIES,
  NEWS_CATEGORIES,
  digestProblems,
  postProblems,
  posts,
  type DigestItem,
  type Post,
} from "./blog";

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
      // A digest carries its sources as data, not as links in prose, and is checked field by field.
      if (post.category === "digest") continue;
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
});

/**
 * The digest rules, tested against what a bad run would actually produce.
 *
 * A digest is assembled by an agent twice a day and merged without a human reading it. That only
 * works if the format refuses the failures, so each of these is a failure a fluent and confident
 * run would walk into.
 */
describe("blog — a digest cannot say more than its sources", () => {
  const item = (over: Partial<DigestItem> = {}): DigestItem => ({
    headline: "OpenRouter publishes usage rankings for August",
    url: "https://openrouter.ai/blog/august-rankings",
    outlet: "OpenRouter",
    published: "2026-08-09",
    comment: "Useful as a demand signal, not as a quality one: it counts tokens, not outcomes.",
    ...over,
  });

  const digest = (over: Partial<Post> = {}): Post => ({
    slug: "boletim-2026-08-09-tarde",
    lang: "pt",
    title: "Boletim",
    date: "2026-08-09",
    category: "digest",
    summary: "Três notícias.",
    body: "",
    items: [item()],
    ...over,
  });

  const problemsOf = (over: Partial<Post> = {}) => digestProblems("pt/x", digest(over));

  it("accepts a well-formed digest", () => {
    expect(problemsOf()).toEqual([]);
  });

  it("refuses a digest with no items", () => {
    expect(problemsOf({ items: [] }).join(" ")).toMatch(/no items/);
  });

  it("refuses more items than the cadence allows", () => {
    const four = [item(), item({ url: "https://a.example/1" }), item({ url: "https://a.example/2" }), item({ url: "https://a.example/3" })];
    expect(problemsOf({ items: four }).join(" ")).toMatch(new RegExp(`at most ${DIGEST_MAX_ITEMS}`));
  });

  it("refuses a link loose in the body", () => {
    // The structure this format replaced: prose that fetched its own source.
    expect(problemsOf({ body: "Veja [aqui](https://exemplo.com)." }).join(" ")).toMatch(/links in items/);
  });

  it("insists the headline, the outlet, the url and the article's own date are all present", () => {
    expect(problemsOf({ items: [item({ headline: "" })] }).join(" ")).toMatch(/no headline/);
    expect(problemsOf({ items: [item({ outlet: "" })] }).join(" ")).toMatch(/which outlet/);
    expect(problemsOf({ items: [item({ url: "http://x.example" })] }).join(" ")).toMatch(/https url/);
    expect(problemsOf({ items: [item({ published: "ontem" })] }).join(" ")).toMatch(/YYYY-MM-DD/);
  });

  it("caps the comment, because a long comment is reporting we did not do", () => {
    const long = item({ comment: "x".repeat(DIGEST_COMMENT_MAX + 1) });
    expect(problemsOf({ items: [long] }).join(" ")).toMatch(/cap is 400/);
  });

  it("refuses a headline with no reading attached", () => {
    expect(problemsOf({ items: [item({ comment: "" })] }).join(" ")).toMatch(/bookmark, not a post/);
  });

  it("catches the same story twice in one digest", () => {
    expect(problemsOf({ items: [item(), item()] }).join(" ")).toMatch(/repeats a url/);
  });
});
