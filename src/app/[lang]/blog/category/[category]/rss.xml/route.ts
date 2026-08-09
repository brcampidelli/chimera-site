import { CATEGORIES, type Category } from "@/content/blog";
import { entries, rss } from "@/content/blog-feed";
import { SEGMENTS, isLocaleSegment } from "@/i18n/locales";

export const dynamic = "force-static";

export function generateStaticParams() {
  return SEGMENTS.flatMap((lang) => {
    const present = new Set(entries(lang).map((entry) => entry.category));
    return CATEGORIES.filter((category) => present.has(category)).map((category) => ({
      lang,
      category,
    }));
  });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lang: string; category: string }> },
): Promise<Response> {
  const { lang, category } = await params;
  if (!isLocaleSegment(lang) || !(CATEGORIES as readonly string[]).includes(category)) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(rss(lang, category as Category), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
