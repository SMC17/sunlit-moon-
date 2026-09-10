import Link from "next/link";
import type { Story } from "@/lib/types";
import { formatShortDate } from "@/lib/format";

export function StoryCard({
  story,
  featured = false,
}: {
  story: Story;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <article className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <Link href={`/stories/${story.slug}`} className="group lg:col-span-7">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={story.hero.src}
            alt={story.hero.alt}
            className="aspect-[16/10] w-full object-cover grayscale-[20%] transition duration-500 group-hover:grayscale-0"
          />
        </Link>
        <div className="lg:col-span-5 lg:pb-2">
          <p className="label text-sea">{story.kicker}</p>
          <h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight text-balance md:text-5xl">
            <Link href={`/stories/${story.slug}`} className="hover:text-sea-deep">
              {story.title}
            </Link>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">{story.dek}</p>
          <p className="mt-6 text-sm text-ink-faint">
            {formatShortDate(story.date)} · {story.author}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="group border-t border-ink/10 pt-6">
      <p className="label text-sea">{story.kicker}</p>
      <h3 className="mt-2 font-display text-2xl leading-tight tracking-tight md:text-[1.7rem]">
        <Link href={`/stories/${story.slug}`} className="hover:text-sea-deep">
          {story.title}
        </Link>
      </h3>
      <p className="mt-2 text-[1.02rem] leading-relaxed text-ink-muted">{story.dek}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-faint">
        <time>{formatShortDate(story.date)}</time>
        {story.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="label text-[0.6rem] text-ink-faint">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
