"use client";

import { useReducedMotion } from "motion/react";

export function FilmGrain() {
  const reduce = useReducedMotion();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-multiply opacity-[0.05]"
      aria-hidden
    >
      <svg className="h-full w-full">
        <filter id="sunlit-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
            result="noise"
          >
            {reduce ? null : (
              <animate
                attributeName="baseFrequency"
                dur="14s"
                values="0.72;0.78;0.72"
                repeatCount="indefinite"
              />
            )}
          </feTurbulence>
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#sunlit-grain)" />
      </svg>
    </div>
  );
}
