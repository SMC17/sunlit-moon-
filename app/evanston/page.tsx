import Link from "next/link";
import { ChangeLog } from "@/components/ChangeLog";
import { DevelopmentTracker } from "@/components/DevelopmentTracker";
import { Masthead } from "@/components/Masthead";
import { Pulse } from "@/components/Pulse";
import { SectionHeader } from "@/components/SectionHeader";
import { StoryCard } from "@/components/StoryCard";
import { getChanges, getDevelopments, getFeaturedStory, getStories } from "@/lib/content";
import { formatMonthYear } from "@/lib/format";
import { site } from "@/lib/site";

export default function EvanstonPage() {
  const featured = getFeaturedStory();
  const latest = getStories().filter((story) => story.slug !== featured?.slug);
  const developments = getDevelopments();
  const changes = getChanges();

  return (
    <>
      <Masthead date={site.issueDate} />
      <div className="mx-auto max-w-page px-5 md:px-8">
        <Pulse />

        {featured ? (
          <section className="py-16 md:py-20">
            <SectionHeader eyebrow="Lead" title="Featured story" href="/stories" hrefLabel="All stories" />
            <StoryCard story={featured} featured />
          </section>
        ) : null}

        <section className="pb-16 md:pb-20">
          <SectionHeader title="The rest of the edition" />
          <div className="grid gap-10 md:grid-cols-3">
            {latest.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </section>

        <section className="pb-16 md:pb-20">
          <SectionHeader
            eyebrow="The board"
            title="Development tracker"
            href="/developments"
            hrefLabel="Full ledger"
          />
          <DevelopmentTracker developments={developments} />
        </section>

        <section className="pb-8">
          <SectionHeader
            eyebrow={formatMonthYear(site.issueDate)}
            title="What changed this month"
          />
          <ChangeLog changes={changes} />
        </section>

        <p className="mt-16 border-t border-ink/10 pt-8 text-center text-sm text-ink-faint">
          {site.comingSoon.join(", ")} — editions forthcoming.{" "}
          <Link href="/about" className="text-sea underline-offset-4 hover:underline">
            Why Evanston first
          </Link>
          .
        </p>
      </div>
    </>
  );
}
