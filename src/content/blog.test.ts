import { describe, expect, it } from "vitest";
import {
  CATEGORIES,
  GENERATED_CATEGORIES,
  NEWS_CATEGORIES,
  postProblems,
  posts,
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
