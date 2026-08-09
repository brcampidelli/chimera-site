interface Props {
  /** The second line: "AGENT" on the terminal product, "DESKTOP" on the app, nothing on its own. */
  sub?: string;
  className?: string;
}

/**
 * The wordmark, set in live type rather than scaled from `logo-wide.png`.
 *
 * The raster is 2241×702, which is fine to about 700 CSS pixels at 1x and soft on any 2x display
 * above that — and a hero is exactly where it would be biggest. Type solves it and buys three
 * things the image cannot: it stays sharp at any density, it is selectable and searchable, and it
 * re-themes with the rest of the page instead of carrying a baked-in navy background.
 *
 * The silver gradient and the cyan sub-line are the ones from the logo, read out of the file.
 */
export function Wordmark({ sub, className = "" }: Props) {
  return (
    <span className={`inline-flex flex-col items-start ${className}`}>
      <span className="wordmark-fill font-display font-bold uppercase tracking-tight">Chimera</span>
      {sub ? (
        <span className="flex w-full items-center gap-2 text-accent2">
          <span aria-hidden="true" className="h-px flex-1 bg-accent2/50" />
          <span className="font-display text-xs uppercase tracking-[0.4em]">{sub}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-accent2/50" />
        </span>
      ) : null}
    </span>
  );
}
