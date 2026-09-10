import { CoverStory } from "@/components/CoverStory";
import { NewsletterBand } from "@/components/Subscribe";
import { PageIntro } from "@/components/PageIntro";
import { StoryCard } from "@/components/StoryCard";
import { getStories } from "@/lib/content";
import { media } from "@/lib/site";

export const metadata = {
  title: "Stories",
  description: "Dispatches from Evanston — the square, the mile, Tuesday night.",
};

export default function StoriesPage() {
  const stories = getStories();
  const [featured, ...rest] = stories;

  return (
    <>
      <PageIntro
        eyebrow="Dispatches"
        title="Read what’s actually happening."
        dek="Four stories this edition. Fountain Square in review, the independent mile, the lakefront restored, and the Tuesday night room."
        image={media.path}
      />
      {featured ? <CoverStory story={featured} /> : null}
      <div className="mx-auto max-w-page px-5 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {rest.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      </div>
      <NewsletterBand title="The brief that follows the docket." />
    </>
  );
}
