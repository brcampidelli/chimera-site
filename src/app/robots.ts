import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Everything is public and indexable. The one thing worth saying is where the map is.
 *
 * No `Disallow` on the language prefixes: the alternates are declared honestly per page, and
 * hiding eight of the nine would be solving a duplicate-content worry the `hreflang` tags already
 * answer correctly.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
