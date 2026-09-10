import { CoverStory } from "@/components/CoverStory";
import { ChangeLog } from "@/components/ChangeLog";
import { DevelopmentTracker } from "@/components/DevelopmentTracker";
import { Pulse } from "@/components/Pulse";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { SellingHero } from "@/components/SellingHero";
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
      <SellingHero />

      <Pulse
        stats={[
          {
            value: pulse.inReview,
            label: "In review",
            hint: "Fountain Square is on the docket.",
            href: "/developments",
          },
          {
            value: pulse.developments,
            label: "On the board",
            hint: "Proposed through complete.",
            href: "/developments",
          },
          {
            value: pulse.stories,
            label: "This edition",
            hint: "The square, the mile, Tuesday night.",
            href: "/stories",
          },
          {
            value: pulse.places,
            label: "Places indexed",
            hint: "Rooms the city is made of.",
            href: "/places",
          },
        ]}
      />

      {featured ? (
        <Reveal>
          <CoverStory story={featured} />
        </Reveal>
      ) : null}

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-page px-5 md:px-8">
          <SectionHeader title="Also in this issue" href="/stories" hrefLabel="All stories" />
        </div>
        <StoryRail stories={latest} />
      </section>

      <div className="mx-auto max-w-page px-5 md:px-8">
        <Reveal>
          <section className="pb-16 md:pb-24">
            <SectionHeader
              eyebrow="The board"
              title="Developments"
              href="/developments"
              hrefLabel="Full ledger"
            />
            <p className="mb-8 max-w-md text-ink-muted">
              Status as a line of type. Open a file for the rest.
            </p>
            <DevelopmentTracker developments={developments} compact />
          </section>
        </Reveal>

        <Reveal>
          <section className="pb-20">
            <SectionHeader
              eyebrow={formatMonthYear(site.issueDate)}
              title="Amendments"
            />
            <p className="mb-6 max-w-md text-ink-muted">
              When a status changes, it is recorded here.
            </p>
            <ChangeLog changes={changes} />
          </section>
        </Reveal>
      </div>
    </>
  );
}
