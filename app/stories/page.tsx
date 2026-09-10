import { CoverStory } from "@/components/CoverStory";
import { PageIntro } from "@/components/PageIntro";
import { StoryCard } from "@/components/StoryCard";
import { getStories } from "@/lib/content";

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
        title="This edition."
        dek="Fountain Square in review, the independent mile, the lakefront restored, and the Tuesday night room."
        scene="facade"
      />
      {featured ? <CoverStory story={featured} /> : null}
      <div className="mx-auto max-w-page px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {rest.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      </div>
    </>
  );
}
