import Image from "next/image";

interface Props {
  size?: number;
  className?: string;
  priority?: boolean;
}

/**
 * The chimera mark: lion, goat, dragon and cobra, which is also the panel of models this thing
 * runs on — the metaphor was in the logo before it was in the copy.
 *
 * There is no vector source. The mark exists only as PNG, so it is used at the sizes a 256px
 * raster survives (header, favicon, cards) and the wordmark is set in live type instead of being
 * scaled up from `logo-wide.png`. `/press` says all of this out loud.
 */
export function BrandMark({ size = 32, className = "", priority = false }: Props) {
  return (
    <Image
      src="/brand/chimera-icon.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      priority={priority}
      className={`rounded-lg object-cover ${className}`}
    />
  );
}
