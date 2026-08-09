import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { resolveProductRoot } from "../../scripts/sync-tokens";
import { MOTION_KEY, PRE_PAINT_SCRIPT, THEME_COLOR, THEME_KEY } from "./theme";

const APP_HTML = join(resolveProductRoot(), "apps", "desktop", "index.html");

/**
 * The site and the app share a user, a machine and a browser profile. If they disagree about
 * where the theme preference lives, someone sets light in one and gets dark in the other — and
 * concludes, reasonably, that one of them is broken.
 */
describe("theme — the site reads the app's preference", () => {
  it("uses the same storage keys as the desktop app", () => {
    if (!existsSync(APP_HTML)) {
      console.warn("skipped: chimera-agent not found");
      return;
    }
    const html = readFileSync(APP_HTML, "utf8");
    expect(html).toContain(THEME_KEY);
    expect(html).toContain(MOTION_KEY);
    expect(html).toContain(THEME_COLOR);
  });

  it("resolves the theme before paint, not in an effect", () => {
    // The whole point: React sets this in an effect, which runs after the first frame — so the
    // page would paint dark and flip. This assertion is the reason the string is a constant.
    expect(PRE_PAINT_SCRIPT).toContain("document.documentElement");
    expect(PRE_PAINT_SCRIPT).toContain("prefers-color-scheme: light");
  });

  it("only stamps an explicit motion override", () => {
    // `system` must leave the attribute absent so the CSS media query stays in charge. Stamping
    // `data-motion="system"` would match neither selector and silently disable both.
    expect(PRE_PAINT_SCRIPT).toContain('if(m!=="system")');
  });

  it("survives storage being unavailable", () => {
    // Private mode throws on localStorage access. A theme script that throws blocks the paint it
    // exists to protect.
    expect(PRE_PAINT_SCRIPT).toContain("catch(e)");
  });
});
