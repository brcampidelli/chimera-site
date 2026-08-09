/**
 * Two derived brand assets, produced from `icon.png` and committed.
 *
 *   public/brand/mark.png        the chimera with the navy plate removed
 *   public/brand/mark-debug.png  the same, with a ring drawn on each of the six eyes
 *
 * The debug image exists because the eye positions were measured but the *selection* of which six
 * clusters are eyes was a human judgement — the mark's horn, crest and fangs are the same
 * near-white cyan as its pupils, and no threshold I tried separated them. Rendering the choice and
 * looking at it is the only honest verification, so the script that makes the claim also makes the
 * picture that checks it.
 *
 *   npm run brand:assets
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = join(ROOT, "public", "brand", "icon.png");
const MARK = join(ROOT, "public", "brand", "mark.png");
const HERO = join(ROOT, "public", "brand", "mark-512.webp");
const DEBUG = join(ROOT, "public", "brand", "mark-debug.png");

/**
 * Where the six eyes are, as a percentage of the mark's box.
 *
 * Measured by `brand-probe.ts` to two decimals, not estimated from a screenshot. Three symmetric
 * pairs: the snake at the top, the goat and dragon at the sides, the lion at the centre.
 */
export const EYES = [
  { id: "snake-left", x: 45.73, y: 18.47 },
  { id: "snake-right", x: 54.13, y: 18.49 },
  { id: "goat", x: 22.16, y: 51.69 },
  { id: "dragon", x: 80.88, y: 51.87 },
  { id: "lion-left", x: 43.04, y: 55.78 },
  { id: "lion-right", x: 56.72, y: 55.79 },
] as const;

/**
 * Erase the flat navy plate by flooding inward from the border.
 *
 * A plain colour-distance threshold would also erase any dark pixel *inside* the mark that happens
 * to be near the background colour — the shadowed facets at the bottom of the mane are exactly
 * that. Flooding only reaches pixels connected to the outside, so the mane keeps its darks.
 */
function removePlate(
  data: Buffer,
  w: number,
  h: number,
  channels: number,
  // The plate is rgb(1, 9, 37) and the squircle's outer ring is pure black, 47 units away. At 40
  // the flood cleared the plate and left a black frame around the mark, which only showed up when
  // the extracted file was composited onto something lighter. Flood-fill makes a generous
  // tolerance safe: it can only reach pixels connected to the outside, so nothing enclosed by the
  // artwork is ever a candidate.
  tolerance = 80,
): number {
  const at = (x: number, y: number) => (y * w + x) * channels;
  // Seed from inside the squircle, not from the corner. The corners are fully transparent and
  // their RGB is meaningless — seeding there made the flood compare the plate against (0,0,0),
  // miss by six units of tolerance, and stop at the squircle's edge having cleared nothing.
  const probe = at(Math.round(w / 2), Math.round(h * 0.05));
  const seed = [data[probe]!, data[probe + 1]!, data[probe + 2]!];
  console.log(`brand: plate colour rgb(${seed.join(", ")})`);
  const near = (i: number) =>
    Math.abs(data[i]! - seed[0]!) +
      Math.abs(data[i + 1]! - seed[1]!) +
      Math.abs(data[i + 2]! - seed[2]!) <=
    tolerance;

  const seen = new Uint8Array(w * h);
  const queue: number[] = [];
  for (let x = 0; x < w; x++) {
    queue.push(x, x + (h - 1) * w);
  }
  for (let y = 0; y < h; y++) {
    queue.push(y * w, w - 1 + y * w);
  }

  let cleared = 0;
  while (queue.length > 0) {
    const p = queue.pop()!;
    if (seen[p]) continue;
    seen[p] = 1;
    const i = p * channels;
    // Already transparent (outside the squircle) still spreads, so the flood reaches the plate.
    if (data[i + 3]! > 8 && !near(i)) continue;
    if (data[i + 3]! > 0) {
      data[i + 3] = 0;
      cleared++;
    }
    const x = p % w;
    const y = (p - x) / w;
    if (x > 0) queue.push(p - 1);
    if (x < w - 1) queue.push(p + 1);
    if (y > 0) queue.push(p - w);
    if (y < h - 1) queue.push(p + w);
  }
  return cleared;
}

async function main(): Promise<void> {
  if (!existsSync(SOURCE)) {
    console.error(`brand: ${SOURCE} is missing`);
    process.exit(1);
  }

  const { data, info } = await sharp(readFileSync(SOURCE))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels } = info;

  const total = w * h;
  const cleared = removePlate(data, w, h, channels);
  console.log(`brand: cleared ${((cleared / total) * 100).toFixed(1)}% of the box`);

  let opaque = 0;
  for (let i = 3; i < data.length; i += channels) if (data[i]! > 8) opaque++;
  console.log(`brand: ${((opaque / total) * 100).toFixed(1)}% of the box is still the mark`);
  if (opaque / total < 0.15) {
    console.error("brand: too little survived — the flood ate the mark");
    process.exit(1);
  }

  const png = await sharp(data, { raw: { width: w, height: h, channels } }).png().toBuffer();
  writeFileSync(MARK, png);
  console.log(`brand: wrote ${MARK} (${Math.round(png.length / 1024)} KB)`);

  /*
   * The hero copy, and it is not an optimisation detail.
   *
   * `images.unoptimized` is on — a static export has no image server — so whatever file the hero
   * names is the file every visitor downloads, at full size. The hero draws the mark twice, once
   * as itself and once blurred behind it, which made the home page of every language pull three
   * megabytes to render a 248-pixel square. WebP with alpha at 512 covers a 2× display and costs
   * a fraction of that.
   */
  const hero = await sharp(png).resize(512, 512).webp({ quality: 86 }).toBuffer();
  writeFileSync(HERO, hero);
  console.log(`brand: wrote ${HERO} (${Math.round(hero.length / 1024)} KB)`);
  if (hero.length > 120_000) {
    console.error("brand: the hero copy is over 120 KB — it is downloaded twice per page");
    process.exit(1);
  }

  // The check image: a ring on each chosen eye, over the extracted mark.
  const rings = EYES.map(
    (eye) =>
      `<circle cx="${(eye.x / 100) * w}" cy="${(eye.y / 100) * h}" r="${w * 0.035}" ` +
      `fill="none" stroke="#ff2d55" stroke-width="${w * 0.006}" />`,
  ).join("");
  const overlay = Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">${rings}</svg>`,
  );
  await sharp(png)
    .flatten({ background: "#0b1120" })
    .composite([{ input: overlay }])
    .png()
    .toFile(DEBUG);
  console.log(`brand: wrote ${DEBUG} — open it and check the rings sit on pupils`);
}

void main();
