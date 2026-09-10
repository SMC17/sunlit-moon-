import Link from "next/link";
import { CoverStory } from "@/components/CoverStory";
import { ChangeLog } from "@/components/ChangeLog";
import { DevelopmentTracker } from "@/components/DevelopmentTracker";
import { Masthead } from "@/components/Masthead";
import { Pulse } from "@/components/Pulse";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { StoryRail } from "@/components/StoryRail";
import { getChanges, getDevelopments, getFeaturedStory, getPulse, getStories } from "@/lib/content";
import { formatMonthYear } from "@/lib/format";
import { site } from "@/lib/site";

export default function EvanstonPage() {
  const featured = getFeaturedStory();
  const latest = getStories().filter((story) => story.slug !== featured?.slug);
  const developments = getDevelopments();
  const changes = getChanges();
  const pulse = getPulse();

  return (
    <>
      <Masthead date={site.issueDate} />
      <div className="mx-auto max-w-page px-5 md:px-8">
        <Pulse
          stats={[
            { value: pulse.stories, label: "Stories in this edition" },
            { value: pulse.developments, label: "Developments on the board" },
            { value: pulse.inReview, label: "Now in review" },
            { value: pulse.entities, label: "Places, firms & people indexed" },
          ]}
        />
      </div>

      {featured ? (
        <Reveal>
          <CoverStory story={featured} />
        </Reveal>
      ) : null}

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-page px-5 md:px-8">
          <SectionHeader title="The rest of the edition" href="/stories" hrefLabel="All stories" />
        </div>
        <StoryRail stories={latest} />
      </section>

      <div className="mx-auto max-w-page px-5 md:px-8">
        <Reveal>
          <section className="pb-20 md:pb-28">
            <SectionHeader
              eyebrow="The board"
              title="Development tracker"
              href="/developments"
              hrefLabel="Full ledger"
            />
            <DevelopmentTracker developments={developments} />
          </section>
        </Reveal>

        <Reveal>
          <section className="pb-8">
            <SectionHeader eyebrow={formatMonthYear(site.issueDate)} title="What changed this month" />
            <ChangeLog changes={changes} />
          </section>
        </Reveal>

        <p className="mt-20 border-t border-ink/10 pt-8 text-center text-sm text-ink-faint">
          {site.comingSoon.join(", ")} — editions forthcoming.{" "}
          <Link href="/about" className="link-quiet text-ink-muted">
            Why Evanston first
          </Link>
          .
        </p>
      </div>
    </>
  );
}
