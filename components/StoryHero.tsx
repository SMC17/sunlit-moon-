import { NagaiPanel } from "@/components/NagaiArt";
import { sceneForKicker } from "@/lib/nagai";
import type { Story } from "@/lib/types";
import { formatIssueDate } from "@/lib/format";

export function StoryHero({ story }: { story: Story }) {
  return (
    <header>
      <div className="mx-auto grid max-w-page items-end gap-10 px-5 pt-12 md:grid-cols-12 md:px-8 md:pt-16">
        <div className="md:col-span-7">
          <p className="label">
            {story.kicker} · {formatIssueDate(story.date)}
          </p>
          <h1 className="mt-4 font-display text-5xl font-extrabold leading-[0.92] tracking-[-0.04em] text-pretty md:text-7xl">
            {story.title}
          </h1>
          <p className="mt-6 max-w-xl text-xl leading-relaxed text-ink-muted">{story.dek}</p>
          <p className="mt-4 text-sm text-ink-faint">{story.author}</p>
        </div>
        <figure className="md:col-span-5">
          <NagaiPanel scene={sceneForKicker(story.kicker)} className="aspect-[5/4]" />
        </figure>
      </div>
    </header>
  );
}
