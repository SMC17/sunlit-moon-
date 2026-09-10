"use client";

import { useState } from "react";
import { media } from "@/lib/site";

export function Photo({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={failed ? media.downtown.src : src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
