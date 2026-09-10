"use client";

import Link from "next/link";
import type { Story } from "@/lib/types";
import { formatShortDate } from "@/lib/format";

export function CoverStory({ story }: { story: Story }) {
  return (
    <article>
      <Link href={`/stories/${story.slug}`} className="group relative block">
        <div className="relative h-[70vh] min-h-[24rem] max-h-[48rem] overflow-hidden bg-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={story.hero.src}
            alt={story.hero.alt}
            className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-page px-5 pb-8 md:px-8 md:pb-12">
            <p className="label text-sand-200">Lead · {story.kicker} · {formatShortDate(story.date)}</p>
            <h2 className="mt-3 max-w-4xl font-display text-4xl leading-[0.92] tracking-[-0.035em] text-sand-50 md:text-6xl lg:text-7xl">
              {story.title}
            </h2>
            <p className="mt-4 max-w-xl font-body text-lg text-sand-100 md:text-xl">{story.dek}</p>
            <span className="btn-light mt-6">Read the dispatch</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
