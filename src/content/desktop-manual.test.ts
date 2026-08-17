import { describe, expect, it } from "vitest";
import { MANUAL_SCREENS, railAvailable, railDestinations } from "./desktop-manual";
import en from "../i18n/messages/en.json";

/**
 * The app has six destinations — five in the rail plus Settings in its footer — and the site
 * describes six. Keeping those two numbers equal by remembering to is how a manual ends up
 * describing a version of the product that shipped a year ago.
 */
describe("desktop manual — the site describes the app that exists", () => {
  it("covers every destination in the app's rail", () => {
    if (!railAvailable()) {
      console.warn("skipped: chimera-agent not found");
      return;
    }
    const missing = railDestinations().filter(
      (view) => !(MANUAL_SCREENS as readonly string[]).includes(view),
    );
    expect(missing, `the app has screens the manual does not: ${missing.join(", ")}`).toEqual([]);
  });

  it("describes no screen the app does not have", () => {
    if (!railAvailable()) return;
    // `settings` is the one entry not in the rail array — it lives in the rail's footer. Every
    // other entry has to be a real destination.
    const rail = new Set([...railDestinations(), "settings"]);
    const invented = MANUAL_SCREENS.filter((screen) => !rail.has(screen));
    expect(invented, `the manual invents: ${invented.join(", ")}`).toEqual([]);
  });

  it("does not document the screen the app hides from installed users", () => {
    // `maturity` is gated behind DEV in the app, because a permanently blank screen is a trust
    // cost with no upside. Documenting it publicly would send readers looking for it.
    expect((MANUAL_SCREENS as readonly string[]).includes("maturity")).toBe(false);
    if (railAvailable()) expect(railDestinations()).not.toContain("maturity");
  });

  it("has a title and a description for each screen", () => {
    const strings = en as Record<string, string>;
    for (let i = 1; i <= MANUAL_SCREENS.length; i++) {
      expect(strings[`desktop.screen${i}`], `desktop.screen${i}`).toBeTruthy();
      expect(strings[`desktop.screen${i}Body`], `desktop.screen${i}Body`).toBeTruthy();
    }
  });
});
