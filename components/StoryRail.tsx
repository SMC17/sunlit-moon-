"use client";

import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import type { Story } from "@/lib/types";
import { formatShortDate } from "@/lib/format";

export function StoryRail({ stories }: { stories: Story[] }) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex touch-pan-y gap-8 pl-5 md:gap-10 md:pl-8">
        {stories.map((story) => (
          <article
            key={story.slug}
            className="min-w-0 flex-[0_0_82%] border-t border-ink/15 pt-6 sm:flex-[0_0_48%] lg:flex-[0_0_30%]"
          >
            <p className="label">{story.kicker}</p>
            <h3 className="mt-3 font-display text-[1.85rem] leading-[1.05] tracking-tight">
              <Link href={`/stories/${story.slug}`} className="link-quiet">
                {story.title}
              </Link>
            </h3>
            <p className="mt-3 max-w-sm leading-relaxed text-ink-muted">{story.dek}</p>
            <p className="mt-5 text-sm text-ink-faint">{formatShortDate(story.date)}</p>
          </article>
        ))}
        <div className="w-5 shrink-0 md:w-8" aria-hidden />
      </div>
    </div>
  );
}
