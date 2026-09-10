import { CoverStory } from "@/components/CoverStory";
import { ChangeLog } from "@/components/ChangeLog";
import { DevelopmentTracker } from "@/components/DevelopmentTracker";
import { NewsletterBand } from "@/components/Subscribe";
import { Pulse } from "@/components/Pulse";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { SellingHero } from "@/components/SellingHero";
import { StoryRail } from "@/components/StoryRail";
import { getChanges, getDevelopments, getFeaturedStory, getPulse, getStories } from "@/lib/content";
import { formatMonthYear } from "@/lib/format";
import { media, site } from "@/lib/site";

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
            label: "In review now",
            hint: "Fountain Square is on the docket. Open the board.",
            href: "/developments",
            image: media.civic.src,
            alt: media.civic.alt,
          },
          {
            value: pulse.developments,
            label: "Developments tracked",
            hint: "Proposed through complete — every file we have.",
            href: "/developments",
            image: media.construction.src,
            alt: media.construction.alt,
          },
          {
            value: pulse.stories,
            label: "Dispatches this edition",
            hint: "The square, the mile, Tuesday night.",
            href: "/stories",
            image: featured?.hero.src ?? media.downtown.src,
            alt: featured?.hero.alt ?? media.downtown.alt,
          },
          {
            value: site.proof.hearings,
            label: "Hearings in the file",
            hint: "Plan Commission, in public, on the record.",
            href: "/people/plan-commission",
            image: media.downtown.src,
            alt: media.downtown.alt,
          },
        ]}
      />

      {featured ? (
        <Reveal>
          <CoverStory story={featured} />
        </Reveal>
      ) : null}

      <NewsletterBand />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-page px-5 md:px-8">
          <SectionHeader title="Keep reading" href="/stories" hrefLabel="All stories" />
        </div>
        <StoryRail stories={latest} />
      </section>

      <div className="mx-auto max-w-page px-5 md:px-8">
        <Reveal>
          <section className="pb-16 md:pb-24">
            <SectionHeader
              eyebrow="The board"
              title="What’s moving"
              href="/developments"
              hrefLabel="Full ledger"
            />
            <p className="mb-8 max-w-xl text-ink-muted">
              Two files in review. One rising on Chicago Avenue. Status chips you can actually use.
            </p>
            <DevelopmentTracker developments={developments} />
          </section>
        </Reveal>

        <Reveal>
          <section className="pb-16">
            <SectionHeader
              eyebrow={formatMonthYear(site.issueDate)}
              title="What changed — come back for this"
            />
            <p className="mb-6 max-w-xl text-ink-muted">
              The reason to return. When a status flips, it lands here first.
            </p>
            <ChangeLog changes={changes} />
          </section>
        </Reveal>
      </div>

      <NewsletterBand
        eyebrow="Stay ahead of Tuesday"
        title="The brief, before the group chat."
      />
    </>
  );
}
