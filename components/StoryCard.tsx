"use client";

import Link from "next/link";
import type { Story } from "@/lib/types";
import { formatShortDate } from "@/lib/format";

export function StoryCard({ story }: { story: Story }) {
  return (
    <article className="group border-t border-ink/10 pt-6">
      <p className="label">{story.kicker}</p>
      <h3 className="mt-2 font-display text-[1.7rem] leading-[1.08] tracking-tight md:text-3xl">
        <Link href={`/stories/${story.slug}`} className="link-quiet">
          {story.title}
        </Link>
      </h3>
      <p className="mt-2 text-[1.02rem] leading-relaxed text-ink-muted">{story.dek}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-faint">
        <time>{formatShortDate(story.date)}</time>
        {story.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="label text-[0.58rem] text-ink-faint">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
