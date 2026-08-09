"use client";

import { useEffect, useState } from "react";
import { applyTheme, storedTheme, type ThemeChoice } from "@/lib/theme";

interface Props {
  /** Resolved on the server and passed down — the site ships no dictionary to the browser. */
  labels: { label: string; system: string; light: string; dark: string };
}

const ORDER: readonly ThemeChoice[] = ["system", "light", "dark"];

/**
 * Three states, not two. "System" has to stay reachable: a toggle that only flips light/dark
 * quietly opts someone out of their own OS preference the first time they touch it, with no way
 * back except clearing storage.
 */
export function ThemeToggle({ labels }: Props) {
  // The server cannot know the choice — it lives in localStorage — so the control renders its
  // default and corrects itself on mount. Rendering nothing until mount would shift the header.
  const [choice, setChoice] = useState<ThemeChoice>("system");

  useEffect(() => {
    setChoice(storedTheme());
  }, []);

  function select(next: ThemeChoice) {
    setChoice(next);
    applyTheme(next);
  }

  const text: Record<ThemeChoice, string> = {
    system: labels.system,
    light: labels.light,
    dark: labels.dark,
  };

  return (
    <div
      role="radiogroup"
      aria-label={labels.label}
      className="inline-flex items-center gap-0.5 rounded-chip border border-hairline bg-surface-2 p-0.5"
    >
      {ORDER.map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={choice === option}
          onClick={() => select(option)}
          className={[
            "focus-ring rounded-chip px-2.5 py-1 text-xs transition duration-1 ease-out",
            choice === option
              ? "bg-card text-foreground"
              : "text-muted-foreground hover:text-foreground",
          ].join(" ")}
        >
          {text[option]}
        </button>
      ))}
    </div>
  );
}
