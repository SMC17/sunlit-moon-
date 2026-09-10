import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { EntityLinkList } from "@/components/EntityCard";
import { NewsletterBand } from "@/components/Subscribe";
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
    <article className="pb-0">
      <header className="mx-auto max-w-page px-5 pt-12 md:px-8 md:pt-16">
        <p className="label">{story.kicker} · {formatIssueDate(story.date)}</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[0.92] tracking-[-0.035em] text-pretty md:text-6xl">
          {story.title}
        </h1>
        <p className="mt-5 max-w-2xl font-body text-xl leading-relaxed text-ink-muted">
          {story.dek}
        </p>
        <p className="mt-4 text-sm text-ink-faint">{story.author}</p>
      </header>

      <figure className="mt-10">
        <div className="relative h-[48vh] min-h-[16rem] max-h-[36rem] overflow-hidden bg-sand-200 md:h-[62vh]">
          <Image
            src={story.hero.src}
            alt={story.hero.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <figcaption className="mx-auto max-w-page px-5 pt-3 text-sm text-ink-faint md:px-8">
          {story.hero.credit}
        </figcaption>
      </figure>

      <div className="prose-story mx-auto mt-12 max-w-measure px-5 md:mt-16 md:px-0">
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
      </aside>

      <NewsletterBand
        eyebrow="If this mattered"
        title="Get the next one before Tuesday night."
      />
    </article>
  );
}
