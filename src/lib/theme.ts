/**
 * Theme and motion, resolved before first paint — the same two storage keys the desktop app uses,
 * so someone who set the app to light does not get a dark website.
 *
 * The script below is inlined into `<head>`. It has to be inline: an external file would be one
 * more round-trip in front of the flash it exists to prevent. It is a byte-for-byte port of the
 * one in `apps/desktop/index.html`, and `theme.test.ts` asserts the keys still match.
 */
export const THEME_KEY = "chimera.theme";
export const MOTION_KEY = "chimera.motion";

export type ThemeChoice = "system" | "light" | "dark";
export type MotionChoice = "system" | "full" | "reduced";

export const THEME_CHOICES: readonly ThemeChoice[] = ["system", "light", "dark"];
export const MOTION_CHOICES: readonly MotionChoice[] = ["system", "full", "reduced"];

/** The navy the app declares as `theme-color`, and the only brand hex in either codebase. */
export const THEME_COLOR = "#0b1120";

export const PRE_PAINT_SCRIPT = `(function(){var d=document.documentElement;function pick(k,valid,fb){try{var v=localStorage.getItem(k);return valid.indexOf(v)>=0?v:fb}catch(e){return fb}}var t=pick("${THEME_KEY}",["light","dark","system"],"system");d.dataset.theme=t!=="system"?t:matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";var m=pick("${MOTION_KEY}",["full","reduced","system"],"system");if(m!=="system")d.dataset.motion=m})();`;

/** Apply a choice at runtime. `system` removes the attribute so the media query takes over again. */
export function applyTheme(choice: ThemeChoice): void {
  const root = document.documentElement;
  if (choice === "system") {
    root.dataset.theme = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  } else {
    root.dataset.theme = choice;
  }
  try {
    localStorage.setItem(THEME_KEY, choice);
  } catch {
    // Private mode. The choice applies to this page and does not survive — which is the correct
    // behaviour, and better than refusing to switch at all.
  }
}

export function storedTheme(): ThemeChoice {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return THEME_CHOICES.includes(value as ThemeChoice) ? (value as ThemeChoice) : "system";
  } catch {
    return "system";
  }
}
