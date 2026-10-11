import { describe, expect, it } from "vitest";
import { releaseEntries } from "./blog-feed";
import { posts, updatePostFor } from "./blog";
import { releases } from "./releases";

/**
 * A release with our post in a language is listed once in that language, as the post; the raw
 * English card stays in the English list and stays reachable by URL, linking the post.
 */
describe("release cards and the post about the same release", () => {
  const withPost = posts().find((p) => p.lang === "pt" && p.category === "update" && p.version);

  it("finds our post for a release tag, with or without the leading v", () => {
    if (!withPost) return;
    expect(updatePostFor("pt", `v${withPost.version}`)?.version).toBe(withPost.version);
    expect(updatePostFor("pt", withPost.version!)?.version).toBe(withPost.version);
    expect(updatePostFor("pt", "v0.0.0-none")).toBeNull();
  });

  it("has at most one post per release in each language", () => {
    // 0.49.2 shipped twice and 0.49.3 three times (Sept-Oct 2026): the release writer retried a
    // version whose PR was stuck behind a red CI, and the backlog later merged every attempt.
    const seen = new Map<string, string>();
    const dupes: string[] = [];
    for (const p of posts()) {
      if (p.category !== "update" || !p.version) continue;
      const key = `${p.lang}:${p.version}`;
      if (seen.has(key)) dupes.push(`${key} (${seen.get(key)} and ${p.slug})`);
      else seen.set(key, p.slug);
    }
    expect(dupes).toEqual([]);
  });

  it("does not list the English card twice in another language", () => {
    const data = releases();
    if (!withPost || !data?.history.some((r) => r.tag.replace(/^v/, "") === withPost.version)) return;
    const tag = data.history.find((r) => r.tag.replace(/^v/, "") === withPost.version)!.tag;
    expect(releaseEntries("pt").some((e) => e.slug === tag)).toBe(false);
    expect(releaseEntries("en").some((e) => e.slug === tag)).toBe(true);
  });
});
