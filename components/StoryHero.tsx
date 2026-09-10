import { Photo } from "@/components/Photo";
import type { Story } from "@/lib/types";
import { formatIssueDate } from "@/lib/format";

export function StoryHero({ story }: { story: Story }) {
  return (
    <header className="border-b border-ink/15">
      <div className="mx-auto max-w-page px-5 pt-12 md:px-8 md:pt-16">
        <p className="label">
          {story.kicker} · {formatIssueDate(story.date)}
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.9] tracking-[-0.03em] text-pretty md:text-7xl">
          {story.title}
        </h1>
        <p className="mt-6 max-w-xl font-body text-xl leading-relaxed text-ink-muted">
          {story.dek}
        </p>
        <p className="mt-4 text-sm text-ink-faint">{story.author}</p>
      </div>
      <figure className="mx-auto mt-10 max-w-page px-5 md:mt-14 md:grid md:grid-cols-12 md:px-8">
        <div className="md:col-span-8">
          <Photo
            src={story.hero.src}
            alt={story.hero.alt}
            className="photo-print aspect-[16/10] w-full object-cover"
          />
        </div>
        <figcaption className="label mt-3 md:col-span-3 md:col-start-10 md:mt-0 md:self-end">
          {story.hero.credit}
        </figcaption>
      </figure>
    </header>
  );
}
