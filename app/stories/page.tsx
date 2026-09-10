import { CoverStory } from "@/components/CoverStory";
import { PageIntro } from "@/components/PageIntro";
import { StoryCard } from "@/components/StoryCard";
import { getStories } from "@/lib/content";

export const metadata = {
  title: "Stories",
  description: "Dispatches from Evanston and the North Shore — buildings, streets, and civic life.",
};

export default function StoriesPage() {
  const stories = getStories();
  const [featured, ...rest] = stories;

  return (
    <>
      <PageIntro
        eyebrow="The edition"
        title="Stories"
        dek="Dispatches from the square, the lakefront, and the Tuesday night room where the next shape of the city is argued in public."
      />
      {featured ? (
        <div className="mb-8">
          <CoverStory story={featured} />
        </div>
      ) : null}
      <div className="mx-auto max-w-page px-5 pb-24 md:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {rest.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      </div>
    </>
  );
}
