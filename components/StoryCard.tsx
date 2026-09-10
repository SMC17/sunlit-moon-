"use client";

import Link from "next/link";
import type { Story } from "@/lib/types";
import { formatShortDate } from "@/lib/format";

export function StoryCard({ story }: { story: Story }) {
  return (
    <article className="group">
      <Link href={`/stories/${story.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-sand-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={story.hero.src}
            alt={story.hero.alt}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
        <p className="label mt-4">{story.kicker}</p>
        <h3 className="mt-2 font-display text-[1.65rem] leading-[1.08] tracking-tight md:text-[1.85rem]">
          {story.title}
        </h3>
        <p className="mt-2 line-clamp-3 leading-relaxed text-ink-muted">{story.dek}</p>
        <p className="mt-4 text-sm text-ink-faint">
          {formatShortDate(story.date)} · Read the dispatch →
        </p>
      </Link>
    </article>
  );
}
