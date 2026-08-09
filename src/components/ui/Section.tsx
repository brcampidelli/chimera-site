import type { ReactNode } from "react";

interface SectionProps {
  heading?: string;
  lead?: string;
  children: ReactNode;
  className?: string;
}

/**
 * A page section that arrives once, on the house easing. `data-reveal` is picked up by the CSS in
 * motion.css — no library, and the reduced-motion contract stays in one auditable block instead of
 * spread across component props.
 */
export function Section({ heading, lead, children, className = "" }: SectionProps) {
  return (
    <section className={`mx-auto max-w-6xl px-4 py-14 sm:px-6 ${className}`}>
      {heading ? (
        <h2 data-reveal="in" className="text-d2">
          {heading}
        </h2>
      ) : null}
      {lead ? (
        <p data-reveal="in" className="mt-3 max-w-measure text-lead text-muted-foreground">
          {lead}
        </p>
      ) : null}
      <div className={heading || lead ? "mt-8" : undefined}>{children}</div>
    </section>
  );
}

export function Cards({ children }: { children: ReactNode }) {
  return <ul className="grid gap-4 sm:grid-cols-2">{children}</ul>;
}

export function Card({
  title,
  body,
  index = 0,
}: {
  title: string;
  body: string;
  index?: number;
}) {
  return (
    <li
      data-reveal="in"
      style={{ ["--i" as string]: index }}
      className="surface p-6"
    >
      <h3 className="text-d3">{title}</h3>
      <p className="mt-2 max-w-measure text-sm text-muted-foreground">{body}</p>
    </li>
  );
}
