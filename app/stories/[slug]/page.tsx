import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { EntityLinkList } from "@/components/EntityCard";
import { ReadingProgress } from "@/components/ReadingProgress";
import { RequestLink } from "@/components/Subscribe";
import { StoryHero } from "@/components/StoryHero";
import { getStories, getStory, resolveStoryEntities } from "@/lib/content";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getStories().map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return { title: "Story" };
  return {
    title: story.title,
    description: story.dek,
  };
}

export default async function StoryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();
  const entities = resolveStoryEntities(story);

  return (
    <article>
      <ReadingProgress targetId="story-body" />
      <StoryHero story={story} />

      <div id="story-body" className="prose-story mx-auto mt-12 max-w-measure px-5 md:mt-16 md:px-0">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ href, children }) => (
              <Link href={href ?? "#"}>{children}</Link>
            ),
          }}
        >
          {story.content}
        </ReactMarkdown>
      </div>

      <aside className="mx-auto mt-16 max-w-measure border-t border-ink/15 px-5 py-10 md:px-0">
        <p className="label mb-5">In this story</p>
        <EntityLinkList entities={entities} />
        <p className="mt-10 font-display text-2xl tracking-tight">
          <RequestLink>The next dispatch is in the edition.</RequestLink>
        </p>
      </aside>
    </article>
  );
}
