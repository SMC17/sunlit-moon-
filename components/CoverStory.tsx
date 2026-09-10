import Link from "next/link";
import { NagaiPanel } from "@/components/NagaiArt";
import { sceneForKicker } from "@/lib/nagai";
import type { Story } from "@/lib/types";
import { formatShortDate } from "@/lib/format";

export function CoverStory({ story }: { story: Story }) {
  return (
    <article className="border-b border-ink/10">
      <div className="mx-auto grid max-w-page items-center gap-10 px-5 py-14 md:grid-cols-12 md:px-8 md:py-20">
        <figure className="md:col-span-6">
          <NagaiPanel scene={sceneForKicker(story.kicker)} className="aspect-[5/4]" />
        </figure>
        <div className="md:col-span-5 md:col-start-8">
          <p className="label">
            Lead · {story.kicker} · {formatShortDate(story.date)}
          </p>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[0.94] tracking-[-0.04em] md:text-5xl">
            <Link href={`/stories/${story.slug}`} className="link-quiet">
              {story.title}
            </Link>
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-ink-muted">{story.dek}</p>
          <Link href={`/stories/${story.slug}`} className="btn-ink mt-8">
            Continue
          </Link>
        </div>
      </div>
    </article>
  );
}
