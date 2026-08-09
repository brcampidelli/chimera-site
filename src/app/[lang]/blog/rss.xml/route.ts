import { rss } from "@/content/blog-feed";
import { SEGMENTS, isLocaleSegment } from "@/i18n/locales";

/** A static file, written at build time — there is no server to serve it from. */
export const dynamic = "force-static";

export function generateStaticParams() {
  return SEGMENTS.map((lang) => ({ lang }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lang: string }> },
): Promise<Response> {
  const { lang } = await params;
  if (!isLocaleSegment(lang)) return new Response("Not found", { status: 404 });
  return new Response(rss(lang), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
