import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { EntityLinkList } from "@/components/EntityCard";
import { getStories, getStory, resolveStoryEntities } from "@/lib/content";
import { formatIssueDate } from "@/lib/format";

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
    <article className="pb-20">
      <header className="mx-auto max-w-page px-5 pt-12 md:px-8 md:pt-16">
        <p className="label text-sea">{story.kicker}</p>
        <h1 className="mx-auto mt-4 max-w-4xl text-center font-display text-4xl leading-[1.08] tracking-tight text-balance md:text-6xl">
          {story.title}
        </h1>
        <p className="mx-auto mt-6 max-w-measure text-center text-lg leading-relaxed text-ink-muted md:text-xl">
          {story.dek}
        </p>
        <p className="mt-6 text-center text-sm text-ink-faint">
          {formatIssueDate(story.date)} · {story.author}
        </p>
      </header>

      <figure className="mx-auto mt-12 max-w-page px-5 md:px-8">
        <div className="relative aspect-[16/9] overflow-hidden bg-sand-200">
          <Image
            src={story.hero.src}
            alt={story.hero.alt}
            fill
            className="object-cover"
            sizes="(min-width: 72rem) 72rem, 100vw"
            priority
          />
        </div>
        <figcaption className="mt-3 text-sm text-ink-faint">{story.hero.credit}</figcaption>
      </figure>

      <div className="prose-story mx-auto mt-12 max-w-measure px-5 md:px-0">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ href, children }) => (
              <Link href={href ?? "#"} className="text-sea">
                {children}
              </Link>
            ),
          }}
        >
          {story.content}
        </ReactMarkdown>
      </div>

      <aside className="mx-auto mt-16 max-w-measure border-t border-ink/15 px-5 pt-8 md:px-0">
        <p className="label mb-4">In this story</p>
        <EntityLinkList entities={entities} />
        <ul className="mt-6 flex flex-wrap gap-3">
          {story.tags.map((tag) => (
            <li key={tag} className="label text-ink-faint">
              {tag}
            </li>
          ))}
        </ul>
      </aside>
    </article>
  );
}
