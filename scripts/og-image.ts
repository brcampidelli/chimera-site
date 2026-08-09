/**
 * The card a link to this site turns into.
 *
 * One image, composed from the mark and the palette that are already in the repository — not a
 * per-route generator. A per-route card would need a renderer in the build and a font file to go
 * with it, and the thing it would buy is a page title that the link preview already shows from the
 * `<title>` tag. This is the cheap 90%.
 *
 *   npm run og
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MARK = join(ROOT, "public", "brand", "mark.png");
const OUT = join(ROOT, "public", "og.png");

const W = 1200;
const H = 630;

async function main(): Promise<void> {
  if (!existsSync(MARK)) {
    console.error("og: run `npm run brand:assets` first");
    process.exit(1);
  }

  // The dark ground and the accent wash, from the same values the site uses.
  const ground = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
       <defs>
         <radialGradient id="wash" cx="30%" cy="18%" r="70%">
           <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.30"/>
           <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
         </radialGradient>
         <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
           <stop offset="0%" stop-color="#3b82f6"/>
           <stop offset="100%" stop-color="#22d3ee"/>
         </linearGradient>
       </defs>
       <rect width="${W}" height="${H}" fill="#0b1120"/>
       <rect width="${W}" height="${H}" fill="url(#wash)"/>
       <rect x="0" y="${H - 6}" width="${W}" height="6" fill="url(#rule)"/>
     </svg>`,
  );

  const wordmark = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
       <text x="620" y="300" font-family="Segoe UI, Helvetica, Arial, sans-serif"
             font-size="104" font-weight="700" letter-spacing="-2" fill="#eef2f7">CHIMERA</text>
       <text x="624" y="360" font-family="Segoe UI, Helvetica, Arial, sans-serif"
             font-size="30" letter-spacing="14" fill="#22d3ee">AGENT</text>
       <text x="622" y="424" font-family="Segoe UI, Helvetica, Arial, sans-serif"
             font-size="27" fill="#93a3b8">The governed, self-evolving agent.</text>
       <text x="622" y="466" font-family="Segoe UI, Helvetica, Arial, sans-serif"
             font-size="22" fill="#6b7c93">Apache-2.0 · alpha · chimeraagent.space</text>
     </svg>`,
  );

  const mark = await sharp(readFileSync(MARK)).resize(430, 430, { fit: "contain" }).toBuffer();

  await sharp(ground)
    .composite([
      { input: mark, left: 110, top: 100 },
      { input: wordmark, left: 0, top: 0 },
    ])
    .png()
    .toFile(OUT);

  const bytes = readFileSync(OUT).length;
  console.log(`og: wrote ${OUT} (${Math.round(bytes / 1024)} KB)`);
  // Social scrapers give up on very large images, and this one has no reason to be big.
  if (bytes > 900_000) {
    console.error("og: the card is over 900 KB — scrapers will skip it");
    process.exit(1);
  }
  writeFileSync(join(ROOT, ".content", "og.ok"), "");
}

void main();
