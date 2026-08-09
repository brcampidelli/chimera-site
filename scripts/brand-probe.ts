/**
 * Measure the mark before touching it.
 *
 * Two questions decide whether the layered hero is possible at all:
 *   1. Is the background flat enough to remove mechanically without eating the dark facets of the
 *      mane? "Flat navy" is an assumption until the histogram says so.
 *   2. Where exactly are the six glowing eyes? Guessing their positions from a screenshot would
 *      put six light sources slightly off the pupils, which reads as a printing error.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = join(ROOT, "public", "brand", "icon.png");

interface Cluster {
  x: number;
  y: number;
  count: number;
}

async function main(): Promise<void> {
  const image = sharp(readFileSync(SOURCE));
  const { width, height } = await image.metadata();
  const { data, info } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  console.log(`icon.png ${width}×${height}, channels ${info.channels}`);

  // --- 1. how flat is the background? -----------------------------------------------------------
  // Sample a ring just inside the squircle, away from the mark.
  const samples: [number, number, number][] = [];
  for (const [fx, fy] of [
    [0.08, 0.08],
    [0.92, 0.08],
    [0.08, 0.92],
    [0.5, 0.05],
    [0.05, 0.5],
    [0.95, 0.5],
  ] as const) {
    const x = Math.round(fx * w);
    const y = Math.round(fy * h);
    const i = (y * w + x) * info.channels;
    samples.push([data[i]!, data[i + 1]!, data[i + 2]!]);
  }
  console.log("background samples (r,g,b):", samples.map((s) => s.join(",")).join("  "));

  const bg = samples[0]!;
  let near = 0;
  let opaque = 0;
  for (let i = 0; i < data.length; i += info.channels) {
    if (data[i + 3]! < 8) continue;
    opaque++;
    const d =
      Math.abs(data[i]! - bg[0]) + Math.abs(data[i + 1]! - bg[1]) + Math.abs(data[i + 2]! - bg[2]);
    if (d <= 24) near++;
  }
  console.log(
    `pixels within 24 of the background: ${((near / opaque) * 100).toFixed(1)}% of the opaque area`,
  );

  // --- 2. where are the eyes? --------------------------------------------------------------------
  // The eyes are the only near-white cyan in the mark: very bright, blue >= green >> red.
  const hits: { x: number; y: number; r: number; g: number; b: number }[] = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * info.channels;
      const r = data[i]!;
      const g = data[i + 1]!;
      const b = data[i + 2]!;
      if (data[i + 3]! < 128) continue;
      // The horn, the dragon's crest and the snake's hood are also cyan, and far bigger than an
      // eye. What separates a pupil is that it is nearly white — a light source rather than a lit
      // surface. Raising the floor to 240 on both channels drops the scenery.
      if (g > 240 && b > 240 && r < 210 && b - r > 30) hits.push({ x, y, r, g, b });
    }
  }

  // Single-pass clustering: the eyes are far apart, so a generous radius is safe.
  const clusters: (Cluster & { sx: number; sy: number; cyan: number })[] = [];
  // The snake's two eyes are about 8% of the width apart, so a 6% radius merged them into one
  // blob sitting between them — a light source on the bridge of its nose.
  const radius = Math.round(w * 0.025);
  for (const hit of hits) {
    const found = clusters.find(
      (c) => Math.abs(c.x - hit.x) < radius && Math.abs(c.y - hit.y) < radius,
    );
    if (found) {
      found.sx += hit.x;
      found.sy += hit.y;
      found.cyan += hit.b - hit.r;
      found.count++;
      found.x = found.sx / found.count;
      found.y = found.sy / found.count;
    } else {
      clusters.push({
        x: hit.x,
        y: hit.y,
        sx: hit.x,
        sy: hit.y,
        cyan: hit.b - hit.r,
        count: 1,
      });
    }
  }

  /**
   * Six eyes, chosen by measurement rather than by eye.
   *
   * Three things are bright cyan in this mark: the eyes, the goat's horn with the dragon's crest,
   * and the snake's fangs. Size separates the scenery — a horn is thousands of pixels and a pupil
   * is a few hundred. Colour separates the fangs, which are near-white with barely any blue lead,
   * from the eyes, which are lit cyan.
   *
   * The rule is: a few hundred pixels, and the strongest blue-over-red in the mark.
   */
  const scored = clusters
    .filter((c) => c.count >= 150 && c.count <= 900)
    .map((c) => ({
      x: Number(((c.x / w) * 100).toFixed(2)),
      y: Number(((c.y / h) * 100).toFixed(2)),
      px: c.count,
      cyan: Math.round(c.cyan / c.count),
    }))
    .sort((a, b) => b.cyan - a.cyan);

  console.log(`bright-cyan pixels: ${hits.length}, candidate clusters: ${scored.length}`);
  console.table(scored);

  const eyes = scored
    .slice(0, 6)
    .map(({ x, y }) => ({ x, y }))
    .sort((a, b) => a.y - b.y || a.x - b.x);
  console.log("the six:", JSON.stringify(eyes));

  writeFileSync(join(ROOT, ".content", "eyes.json"), `${JSON.stringify(eyes, null, 2)}\n`);
}

void main();
