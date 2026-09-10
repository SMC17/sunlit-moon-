import Link from "next/link";
import { Photo } from "@/components/Photo";
import type { Story } from "@/lib/types";
import { formatShortDate } from "@/lib/format";

export function CoverStory({ story }: { story: Story }) {
  return (
    <article className="border-b border-ink/15">
      <div className="mx-auto grid max-w-page items-start gap-10 px-5 py-14 md:grid-cols-12 md:px-8 md:py-20">
        <figure className="md:col-span-5 md:pt-10">
          <Photo
            src={story.hero.src}
            alt={story.hero.alt}
            className="photo-print aspect-[4/5] w-full object-cover"
          />
          <figcaption className="label mt-3">{story.hero.credit}</figcaption>
        </figure>
        <div className="md:col-span-6 md:col-start-7">
          <p className="label">
            Lead · {story.kicker} · {formatShortDate(story.date)}
          </p>
          <h2 className="mt-5 font-display text-4xl leading-[0.92] tracking-[-0.03em] md:text-6xl">
            <Link href={`/stories/${story.slug}`} className="link-quiet">
              {story.title}
            </Link>
          </h2>
          <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-ink-muted">
            {story.dek}
          </p>
          <Link href={`/stories/${story.slug}`} className="btn-ink mt-8">
            Continue
          </Link>
        </div>
      </div>
    </article>
  );
}
