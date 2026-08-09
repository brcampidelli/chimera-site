import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { resolveProductRoot } from "../../scripts/sync-tokens";

/**
 * The destinations the desktop app actually has.
 *
 * The site describes the app screen by screen, and a manual that names a screen nobody has — or
 * quietly omits one — is worse than no manual: the reader concludes they installed the wrong
 * thing. So the list is checked against the app's own rail.
 *
 * `settings` is not in the rail array; it sits in the rail's footer alongside the theme toggle.
 * It is a destination all the same, and the manual covers it.
 */
export const MANUAL_SCREENS = [
  "code",
  "work",
  "knowledge",
  "automation",
  "settings",
] as const;

const RAIL = join(resolveProductRoot(), "apps", "desktop", "src", "components", "IconRail.tsx");

export function railAvailable(): boolean {
  return existsSync(RAIL);
}

/**
 * The rail's destinations, read from the app.
 *
 * `maturity` is excluded on purpose: the app itself gates it behind `import.meta.env.DEV`, on the
 * grounds that a permanently blank screen is a trust cost with no upside. A public manual must not
 * document a screen an installed user cannot reach.
 */
export function railDestinations(): string[] {
  const source = readFileSync(RAIL, "utf8");
  const start = source.indexOf("const NAV");
  const end = source.indexOf("];", start);
  const block = source.slice(start, end);
  const views = [...block.matchAll(/view:\s*"([a-z]+)"/g)].map((m) => m[1] as string);
  return views.filter((view) => view !== "maturity");
}
