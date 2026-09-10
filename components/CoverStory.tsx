"use client";

import Link from "next/link";
import type { Story } from "@/lib/types";
import { formatShortDate } from "@/lib/format";

export function CoverStory({ story }: { story: Story }) {
  return (
    <article>
      <Link href={`/stories/${story.slug}`} className="group block">
        <div className="relative h-[58vh] min-h-[20rem] max-h-[44rem] overflow-hidden bg-sand-200 md:h-[72vh] md:max-h-[52rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={story.hero.src}
            alt={story.hero.alt}
            className="h-full w-full origin-center object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none"
          />
        </div>
      </Link>
      <div className="mx-auto max-w-page px-5 py-10 md:px-8 md:py-16">
        <p className="label">Lead · {story.kicker}</p>
        <h2 className="mt-4 max-w-5xl font-display text-[2.7rem] leading-[0.92] tracking-[-0.035em] text-pretty md:text-7xl lg:text-[5.4rem]">
          <Link href={`/stories/${story.slug}`} className="link-quiet">
            {story.title}
          </Link>
        </h2>
        <p className="mt-6 max-w-xl font-body text-xl leading-relaxed text-ink-muted md:text-[1.35rem]">
          {story.dek}
        </p>
        <p className="mt-8 text-sm text-ink-faint">
          {formatShortDate(story.date)} · {story.author}
        </p>
      </div>
    </article>
  );
}
