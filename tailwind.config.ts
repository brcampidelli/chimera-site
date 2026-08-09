import type { Config } from "tailwindcss";

/**
 * The app's design system, extended for a website — never redefined.
 *
 * The five type sizes keep the exact meaning they have in `apps/desktop`: they are the chrome
 * (nav, badges, labels, table cells, buttons). Reusing `text-xl` for a 64px hero would silently
 * redefine a token the app also owns, so the editorial scale is separate and prefixed: `d1`,
 * `d2`, `d3`, `prose`.
 *
 * Colour, radius, shadow and motion values are NOT here — they live in
 * `src/styles/tokens.generated.css`, which is produced by `scripts/sync-tokens.ts` from the app's
 * `index.css` and guarded by a CI diff. Copying rots because nobody notices; copying with a test
 * that fails is synchronisation.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        accent2: "hsl(var(--accent2))",
        ring: "hsl(var(--ring))",
        ok: "hsl(var(--ok))",
        bad: "hsl(var(--bad))",
        warn: "hsl(var(--warn))",
        "warn-foreground": "hsl(var(--warn-foreground))",
        hairline: "hsl(var(--hairline))",
        "surface-2": "hsl(var(--surface-2))",
        "surface-hover": "hsl(var(--surface-hover))",
        scrim: "hsl(var(--scrim))",
      },
      borderRadius: {
        chip: "1.5rem",
        xl2: "1.15rem",
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // The app's scale — same names, same meaning, same pixels.
        xs: ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.01em" }],
        sm: ["0.8125rem", { lineHeight: "1.25rem" }],
        base: ["0.9375rem", { lineHeight: "1.6" }],
        lg: ["1.125rem", { lineHeight: "1.5rem", letterSpacing: "-0.01em" }],
        xl: ["1.375rem", { lineHeight: "1.75rem", letterSpacing: "-0.02em" }],
        // The site's editorial scale — prefixed so it can never be mistaken for the app's.
        d1: ["clamp(2.5rem, 1.1rem + 4.4vw, 4.5rem)", { lineHeight: "1.04", letterSpacing: "-0.03em" }],
        d2: ["clamp(1.875rem, 1.1rem + 2.4vw, 2.75rem)", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        d3: ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.015em" }],
        lead: ["1.25rem", { lineHeight: "1.6" }],
        prose: ["1.0625rem", { lineHeight: "1.7" }],
      },
      transitionDuration: {
        "1": "var(--dur-1)",
        "2": "var(--dur-2)",
        "3": "var(--dur-3)",
        "4": "var(--dur-4)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
        "in-out": "var(--ease-in-out)",
        spring: "var(--ease-spring)",
      },
      boxShadow: {
        elev: "var(--elev)",
        "elev-lg": "var(--elev-lg)",
        inset: "var(--inset)",
        glow: "var(--glow)",
      },
      backgroundImage: {
        "accent-grad": "linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--accent2)) 100%)",
      },
      maxWidth: {
        measure: "68ch",
      },
    },
  },
  plugins: [],
};

export default config;
