"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Where the six eyes are, as a percentage of the mark's box.
 *
 * Measured by `scripts/brand-probe.ts`, not estimated from a screenshot: three symmetric pairs —
 * the snake at the top, the goat and the dragon at the sides, the lion at the centre. Which six of
 * the sixteen bright-cyan clusters are pupils was a human call, because the horn, the crest and the
 * fangs are the same near-white cyan and no threshold separated them; `mark-debug.png` is the
 * picture that call was checked against.
 */
const EYES = [
  { id: "snake-left", x: 45.73, y: 18.47 },
  { id: "snake-right", x: 54.13, y: 18.49 },
  { id: "goat", x: 22.16, y: 51.69 },
  { id: "dragon", x: 80.88, y: 51.87 },
  { id: "lion-left", x: 43.04, y: 55.78 },
  { id: "lion-right", x: 56.72, y: 55.79 },
] as const;

interface Props {
  size?: number;
  alt: string;
}

/**
 * The mark, with depth.
 *
 * Poster-first: the image is the whole thing. It is in the HTML, it needs no JavaScript, and if
 * nothing below ever runs the hero is complete — which is what makes this cheap enough to justify
 * on a page whose job is to load fast.
 *
 * What runs on top is a bloom behind the mark, a few degrees of tilt following the pointer, and six
 * lights that come up last on the pupils. No WebGL, no 3D model, no library: the mark is a raster
 * and the depth is four layers and a transform.
 *
 * The dark plate behind it is deliberate and permanent. Removing the navy ground also removed the
 * dark facet lines *inside* the mane — they were the same colour and connected to the outside — so
 * the extracted mark is correct on a dark ground and moth-eaten on a light one. Rather than pretend
 * otherwise, the mark keeps a disc in both themes. It is how the logo has always been drawn.
 */
export function Hero({ size = 260, alt }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Behind the same gates the rest of the motion honours: the OS preference, the site's own
    // override, and a viewport wide enough that a phone is never asked to do this.
    const calm =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.motion === "reduced";
    if (calm) {
      setLit(true);
      return;
    }

    const ignite = window.setTimeout(() => setLit(true), 620);
    if (window.innerWidth < 768) return () => window.clearTimeout(ignite);

    let frame = 0;
    function onMove(event: PointerEvent) {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const rect = box.current?.getBoundingClientRect();
        if (!rect) return;
        const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
        const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
        // Four degrees. Enough to read as depth, little enough that it never looks like a toy.
        setTilt({ x: Math.max(-1, Math.min(1, dy)) * -4, y: Math.max(-1, Math.min(1, dx)) * 4 });
      });
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.clearTimeout(ignite);
      window.removeEventListener("pointermove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={box}
      className="hero-mark relative"
      style={{ width: size, height: size, perspective: "900px" }}
    >
      <div
        className="hero-tilt relative h-full w-full"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        {/* The bloom: the same silhouette, blurred and pushed back. */}
        <Image
          src="/brand/mark-512.webp"
          alt=""
          aria-hidden="true"
          width={size}
          height={size}
          className="hero-bloom absolute inset-0"
        />
        <Image
          src="/brand/mark-512.webp"
          alt={alt}
          width={size}
          height={size}
          priority
          className="relative h-full w-full object-contain"
        />
        {EYES.map((eye, i) => (
          <span
            key={eye.id}
            aria-hidden="true"
            className="hero-eye"
            data-lit={lit ? "" : undefined}
            style={{ left: `${eye.x}%`, top: `${eye.y}%`, ["--i" as string]: i }}
          />
        ))}
      </div>
    </div>
  );
}
