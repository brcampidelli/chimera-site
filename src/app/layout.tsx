import type { Metadata, Viewport } from "next";
import { PRE_PAINT_SCRIPT, THEME_COLOR } from "@/lib/theme";
import { SITE } from "@/lib/site";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Chimera — the governed, self-evolving agent",
    template: "%s · Chimera",
  },
  description:
    "An open-source agent for your terminal and a desktop app to work with it. Apache-2.0, alpha, and it publishes the benchmarks it lost.",
  icons: { icon: "/favicon.ico", apple: "/brand/chimera-icon.png" },
};

export const viewport: Viewport = { themeColor: THEME_COLOR };

/**
 * The root document. `<html lang>` is set by the locale layout below this one; the fallback here
 * exists only for the bare `/` route.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Theme and motion, resolved before the first frame. React sets these in an effect, which
          runs after the first paint — so without this the page would paint dark and flip. Inline
          on purpose: an external file is one more round-trip in front of the flash it prevents.
        */}
        <script dangerouslySetInnerHTML={{ __html: PRE_PAINT_SCRIPT }} />
      </head>
      <body className="min-h-dvh font-sans text-base antialiased">{children}</body>
    </html>
  );
}
