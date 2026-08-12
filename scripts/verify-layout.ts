/**
 * The gate that catches a translation breaking the page's shape.
 *
 * Every other check in this repo reads text. This one has to look, because the failures it exists
 * for are invisible to text: a word that is correct, spelled right, and forty pixels too wide.
 *
 * Both bugs it guards against shipped on 2026-08-12, hours apart, from the same translation:
 *
 *   1. A nav label wrapped, made its `<li>` taller than the fixed-height row, and the centred
 *      overflow rendered ABOVE the header — outside the bar, on top of the page. Spanish and
 *      French were live like that.
 *   2. The Russian header was simply wider than its row and the whole page scrolled sideways. The
 *      bar looked perfect; the horizontal scrollbar was the only symptom.
 *
 * Neither is reachable from the DOM alone. The first needs box geometry, the second needs the
 * document's scroll width against the viewport — both are layout, and layout only exists in a
 * browser. So this is the only check here that starts one.
 *
 *   npm run build && npm run verify:layout
 */
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { SEGMENTS } from "../src/i18n/locales";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "out");

/**
 * The widths this promises to hold at, and the one it deliberately does not.
 *
 * 1280 is the narrowest width where the header currently fits, and is where Russian broke. 1440 is
 * a common laptop, and a check that only ever runs at one width will one day be true only at that
 * width.
 *
 * **Everything below 1280 is knowingly excluded, and that is a statement about the site rather than
 * about this file.** The nav appears at the `md` breakpoint and does not fit until roughly `xl`.
 * Measured on this build, horizontal overflow in pixels:
 *
 *      768px   all ten locales      en +228 · zh +147 · ja +398
 *      900px   all ten locales      en  +96 · zh  +15 · ja +266
 *     1024px   eight of ten         (en and zh fit) · ja +142 · de +96
 *     1152px   one                  ja +14
 *     1280px   none
 *
 * English overflows by 228px at 768, so this is not a translation problem — it is a breakpoint that
 * turns the nav on about 500px before there is room for it. Asserting down there would fail on the
 * first run for a defect this gate neither caused nor can fix: moving the breakpoint leaves that
 * whole range with no navigation at all, because there is no mobile menu to fall back to. That is a
 * design decision, and it belongs to a person.
 *
 * Written down with the numbers rather than picking 1280 quietly, because the difference between a
 * scope and an oversight is whether anybody said so — and because the next person deserves to know
 * that green here means "fits on a desktop", not "fits".
 */
const WIDTHS = [1280, 1440];

/** One page, measured. Everything the checks need and nothing that needs a browser to interpret. */
export interface Measurement {
  readonly locale: string;
  readonly width: number;
  readonly scrollWidth: number;
  readonly clientWidth: number;
  readonly header: { readonly top: number; readonly bottom: number };
  readonly items: readonly { readonly text: string; readonly top: number; readonly bottom: number }[];
}

/**
 * What is wrong with one measurement, in sentences a person can act on.
 *
 * Pure on purpose: the browser is the expensive, flaky, hard-to-test half, and none of the judgement
 * lives in it. This function is unit-tested against the two real failures.
 *
 * The 1px tolerances are not slop — `getBoundingClientRect` returns fractions, and a sub-pixel
 * difference between a border and its content box is not a bug. A real overflow was 12px and 310px.
 */
export function problems(m: Measurement): string[] {
  const found: string[] = [];

  if (m.scrollWidth > m.clientWidth + 1) {
    found.push(
      `${m.locale} at ${m.width}px scrolls sideways: the page is ${m.scrollWidth}px wide in a ` +
        `${m.clientWidth}px viewport (${m.scrollWidth - m.clientWidth}px over). Something in the ` +
        `header or the page is wider than its container — measure the header's parts to find which.`,
    );
  }

  for (const item of m.items) {
    if (item.top < m.header.top - 1 || item.bottom > m.header.bottom + 1) {
      found.push(
        `${m.locale} at ${m.width}px: "${item.text}" sits at ${item.top}–${item.bottom} but the ` +
          `header is ${m.header.top}–${m.header.bottom}. Something in the bar wrapped: the row has ` +
          `a fixed height, so the overflow renders over the page instead of making the bar taller.`,
      );
    }
  }

  if (m.items.length === 0) {
    // Otherwise every assertion above is vacuously true and the gate reports success for a page it
    // never looked at — which is how the site once shipped an i18n check that verified nothing.
    found.push(`${m.locale} at ${m.width}px: no nav items found. The gate measured nothing.`);
  }

  return found;
}

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

/**
 * A static server for `out/`, rather than `file://`.
 *
 * The export uses absolute asset paths, so `file://` loads the markup and none of the CSS — and a
 * page with no stylesheet has no layout to measure. It would pass every check in here while proving
 * nothing, which is the worst kind of green.
 */
function serve(): Promise<{ base: string; close: () => Promise<void> }> {
  const server = createServer((req, res) => {
    let path = decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname);
    if (path.endsWith("/")) path += "index.html";
    const file = resolve(join(OUT, path));
    if (!file.startsWith(OUT) || !existsSync(file) || statSync(file).isDirectory()) {
      res.writeHead(404).end("not found");
      return;
    }
    res.writeHead(200, { "content-type": MIME[extname(file)] ?? "application/octet-stream" });
    createReadStream(file).pipe(res);
  });
  return new Promise((ok) => {
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address() as AddressInfo;
      ok({
        base: `http://127.0.0.1:${port}`,
        close: () => new Promise<void>((done) => server.close(() => done())),
      });
    });
  });
}

async function main(): Promise<void> {
  if (!existsSync(OUT)) {
    console.error("layout: out/ does not exist. This gate measures the built site — run `npm run build` first.");
    process.exit(1);
  }

  const site = await serve();
  const browser = await chromium.launch();
  const found: string[] = [];
  let checked = 0;

  try {
    for (const width of WIDTHS) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      for (const locale of SEGMENTS) {
        await page.goto(`${site.base}/${locale}/`, { waitUntil: "load" });
        const m = await page.evaluate((): Omit<Measurement, "locale" | "width"> => {
          const header = document.querySelector("header");
          if (!header) throw new Error("no <header> on the page");
          const box = header.getBoundingClientRect();
          return {
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
            header: { top: Math.round(box.top), bottom: Math.round(box.bottom) },
            // EVERY interactive thing in the bar, not `nav a`.
            //
            // The first version of this gate measured the nav links, because those were the ones I
            // had just fixed. It then passed the Japanese home page at 1280 while 🌐日本語 and
            // システム were rendering outside the bar — they live in the right-hand cluster, which
            // `nav a` does not reach. A gate scoped to what its author was already looking at is
            // the exact failure it exists to prevent, and this is the third time in one day that
            // the sibling nobody checked was the broken one.
            //
            // `checkVisibility` is load-bearing: the language dropdown is a closed <details> whose
            // absolutely-positioned items still report boxes below the bar. Without this filter
            // every page fails with ten false alarms, and a gate that cries wolf gets deleted.
            items: [...header.querySelectorAll("a, button, summary")]
              .filter((e) => e.checkVisibility({ checkVisibilityCSS: true }))
              .map((e) => {
                const r = e.getBoundingClientRect();
                return {
                  text: (e.textContent ?? "").trim().slice(0, 24),
                  top: Math.round(r.top),
                  bottom: Math.round(r.bottom),
                };
              }),
          };
        });
        found.push(...problems({ locale, width, ...m }));
        checked += 1;
      }
      await page.close();
    }
  } finally {
    await browser.close();
    await site.close();
  }

  if (found.length > 0) {
    console.error(`layout: ${found.length} problem(s) across ${checked} page(s)\n`);
    for (const line of found) console.error(`  - ${line}\n`);
    process.exit(1);
  }
  console.log(`layout: ${checked} pages measured at ${WIDTHS.join("px, ")}px — no overflow`);
}

if (process.argv[1]?.replace(/\\/g, "/").endsWith("scripts/verify-layout.ts")) {
  void main();
}
