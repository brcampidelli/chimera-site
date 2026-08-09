import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { Download, Releases } from "../../scripts/fetch-releases";

const FILE = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..", ".content", "releases.json");

export type { Download, Releases };

export function releasesAvailable(): boolean {
  return existsSync(FILE);
}

/**
 * The real assets of the current release, resolved at build time by `fetch-releases.ts`.
 *
 * Absent only when the build ran without the fetch — in which case the download page falls back to
 * the permanent GitHub link rather than rendering a button that goes nowhere.
 */
export function releases(): Releases | null {
  if (!existsSync(FILE)) return null;
  return JSON.parse(readFileSync(FILE, "utf8")) as Releases;
}

export function downloadFor(platform: Download["platform"]): Download | undefined {
  return releases()?.downloads.find((d) => d.platform === platform);
}

/** Sizes are shown because these installers are large and a surprise is worse than a number. */
export function formatBytes(bytes: number): string {
  return `${Math.round(bytes / 1024 / 1024)} MB`;
}
