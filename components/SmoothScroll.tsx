"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";
import "lenis/dist/lenis.css";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: reduce ? 1 : 0.075,
        duration: reduce ? 0 : 1.15,
        smoothWheel: !reduce,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.1,
      }}
    >
      {children}
    </ReactLenis>
  );
}
