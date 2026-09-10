"use client";

import useEmblaCarousel from "embla-carousel-react";
import { StoryCard } from "@/components/StoryCard";
import type { Story } from "@/lib/types";

export function StoryRail({ stories }: { stories: Story[] }) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  return (
    <div className="overflow-hidden" ref={emblaRef} data-lenis-prevent>
      <div className="flex touch-pan-y gap-6 pl-5 md:gap-8 md:pl-8">
        {stories.map((story) => (
          <div key={story.slug} className="min-w-0 flex-[0_0_82%] sm:flex-[0_0_46%] lg:flex-[0_0_31%]">
            <StoryCard story={story} />
          </div>
        ))}
        <div className="w-5 shrink-0 md:w-8" aria-hidden />
      </div>
    </div>
  );
}
