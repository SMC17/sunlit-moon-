"use client";

import Link from "next/link";
import { Photo } from "@/components/Photo";
import type { Story } from "@/lib/types";
import { formatShortDate } from "@/lib/format";

export function StoryCard({ story }: { story: Story }) {
  return (
    <article className="group">
      <Link href={`/stories/${story.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-ink">
          <Photo
            src={story.hero.src}
            alt={story.hero.alt}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <p className="absolute bottom-3 left-3 label text-sand-50">
            {story.kicker} · {formatShortDate(story.date)}
          </p>
        </div>
        <h3 className="mt-4 font-display text-[1.7rem] leading-[1.06] tracking-tight md:text-[1.95rem]">
          {story.title}
        </h3>
        <p className="mt-2 line-clamp-3 leading-relaxed text-ink-muted">{story.dek}</p>
        <p className="label mt-4 text-ink transition-colors duration-300 group-hover:text-sea">
          Read the dispatch →
        </p>
      </Link>
    </article>
  );
}
