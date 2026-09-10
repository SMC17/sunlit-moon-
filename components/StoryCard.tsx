import Link from "next/link";
import { Photo } from "@/components/Photo";
import type { Story } from "@/lib/types";
import { formatShortDate } from "@/lib/format";

export function StoryCard({ story }: { story: Story }) {
  return (
    <article>
      <Link href={`/stories/${story.slug}`} className="group block">
        <Photo
          src={story.hero.src}
          alt={story.hero.alt}
          className="photo-print aspect-[5/4] w-full object-cover"
        />
        <p className="label mt-4">
          {story.kicker} · {formatShortDate(story.date)}
        </p>
        <h3 className="mt-2 font-display text-[1.65rem] leading-[1.05] tracking-tight md:text-[1.85rem]">
          {story.title}
        </h3>
        <p className="mt-2 line-clamp-3 font-body leading-relaxed text-ink-muted">{story.dek}</p>
      </Link>
    </article>
  );
}
