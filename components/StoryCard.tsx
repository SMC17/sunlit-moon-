import Link from "next/link";
import { NagaiPanel } from "@/components/NagaiArt";
import { sceneForKicker } from "@/lib/nagai";
import type { Story } from "@/lib/types";
import { formatShortDate } from "@/lib/format";

export function StoryCard({ story }: { story: Story }) {
  return (
    <article>
      <Link href={`/stories/${story.slug}`} className="block">
        <NagaiPanel scene={sceneForKicker(story.kicker)} className="aspect-[5/4]" />
        <p className="label mt-4">
          {story.kicker} · {formatShortDate(story.date)}
        </p>
        <h3 className="mt-2 font-display text-[1.55rem] font-bold leading-[1.05] tracking-tight">
          {story.title}
        </h3>
        <p className="mt-2 line-clamp-3 leading-relaxed text-ink-muted">{story.dek}</p>
      </Link>
    </article>
  );
}
