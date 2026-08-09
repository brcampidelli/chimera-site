import { notFound } from "next/navigation";
import { Home } from "@/components/home/Home";
import { SEGMENTS, isLocaleSegment } from "@/i18n/locales";

export function generateStaticParams() {
  return SEGMENTS.map((lang) => ({ lang }));
}

export default async function LocaleHome({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocaleSegment(lang)) notFound();
  return <Home locale={lang} />;
}
