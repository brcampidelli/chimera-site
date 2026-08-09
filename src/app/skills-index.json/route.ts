import { skillsIndex } from "@/content/skills";

/**
 * The library as data, at a stable URL.
 *
 * Published so tooling can read it without scraping the pages, and because a hub that shows a
 * hash on screen should let you fetch the hash. Written at build time — there is no server.
 */
export const dynamic = "force-static";

export function GET(): Response {
  return new Response(`${JSON.stringify(skillsIndex(), null, 2)}\n`, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
