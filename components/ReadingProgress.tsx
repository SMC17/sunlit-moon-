"use client";

import { useEffect, useState } from "react";

export function ReadingProgress({ targetId }: { targetId: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById(targetId);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const start = window.scrollY + rect.top - 72;
      const end = start + el.offsetHeight - window.innerHeight * 0.5;
      const next = (window.scrollY - start) / Math.max(end - start, 1);
      setProgress(Math.min(1, Math.max(0, next)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-px">
      <div
        className="h-px bg-lacquer"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
