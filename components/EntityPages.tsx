import { notFound } from "next/navigation";
import { EntityCard } from "@/components/EntityCard";
import { EntityLinkList } from "@/components/EntityCard";
import { PageIntro } from "@/components/PageIntro";
import { StatusChip } from "@/components/StatusChip";
import { StoryCard } from "@/components/StoryCard";
import {
  getEntitiesByType,
  getEntity,
  getRelatedEntities,
  getStoriesForEntity,
} from "@/lib/content";
import { entityPath, type EntityType } from "@/lib/types";

const copy: Record<
  EntityType,
  { title: string; eyebrow: string; dek: string; singular: string }
> = {
  development: {
    eyebrow: "The board",
    title: "Developments",
    singular: "Development",
    dek: "Proposed, in review, approved, under construction, complete — the civic statuses of a city that is always becoming.",
  },
  place: {
    eyebrow: "The ground",
    title: "Places",
    singular: "Place",
    dek: "Squares, streets, a lakefront, a campus — the rooms a city is made of.",
  },
  business: {
    eyebrow: "The storefronts",
    title: "Businesses",
    singular: "Business",
    dek: "Independents, markets, and the civic leagues that speak for a block.",
  },
  person: {
    eyebrow: "The room",
    title: "People",
    singular: "Person",
    dek: "Commissioners, staff, architects, and the people who keep asking who the plaza is for.",
  },
};

export function EntityIndex({ type }: { type: EntityType }) {
  const entities = getEntitiesByType(type);
  const intro = copy[type];
  return (
    <>
      <PageIntro eyebrow={intro.eyebrow} title={intro.title} dek={intro.dek} />
      <div className="mx-auto max-w-page px-5 pb-20 md:px-8">
        <div className="border-t border-ink/20">
          {entities.map((entity) => (
            <EntityCard key={entity.slug} entity={entity} />
          ))}
        </div>
      </div>
    </>
  );
}

export function EntityDetail({ type, slug }: { type: EntityType; slug: string }) {
  const entity = getEntity(slug);
  if (!entity || entity.type !== type) notFound();
  const related = getRelatedEntities(entity);
  const stories = getStoriesForEntity(entity.slug);
  const intro = copy[type];

  return (
    <article className="pb-20">
      <header className="mx-auto max-w-page px-5 pt-12 md:px-8 md:pt-16">
        <p className="label text-sea">
          {intro.singular}
          {entity.neighborhood ? ` · ${entity.neighborhood}` : ""}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <h1 className="font-display text-4xl tracking-tight md:text-6xl">{entity.name}</h1>
          {entity.status ? <StatusChip status={entity.status} /> : null}
        </div>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">
          {entity.dek}
        </p>
        <dl className="mt-8 grid gap-6 border-y border-ink/15 py-6 text-sm md:grid-cols-3">
          {entity.address ? (
            <div>
              <dt className="label">Address</dt>
              <dd className="mt-1">{entity.address}</dd>
            </div>
          ) : null}
          {entity.program ? (
            <div>
              <dt className="label">Program</dt>
              <dd className="mt-1">{entity.program}</dd>
            </div>
          ) : null}
          {entity.role ? (
            <div>
              <dt className="label">Role</dt>
              <dd className="mt-1">{entity.role}</dd>
            </div>
          ) : null}
          {entity.category ? (
            <div>
              <dt className="label">Category</dt>
              <dd className="mt-1">{entity.category}</dd>
            </div>
          ) : null}
        </dl>
      </header>

      <div className="mx-auto max-w-measure px-5 py-10 md:px-0">
        <p className="text-lg leading-relaxed">{entity.summary}</p>
      </div>

      {related.length > 0 ? (
        <section className="mx-auto max-w-page px-5 md:px-8">
          <p className="label mb-4">Linked in the ledger</p>
          <EntityLinkList entities={related} />
        </section>
      ) : null}

      {stories.length > 0 ? (
        <section className="mx-auto mt-14 max-w-page px-5 md:px-8">
          <h2 className="mb-6 border-b border-ink/20 pb-3 font-display text-3xl tracking-tight">
            In the edition
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {stories.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </section>
      ) : null}

      <p className="mx-auto mt-12 max-w-page px-5 text-sm text-ink-faint md:px-8">
        <a href={entityPath[type]} className="hover:text-ink">
          ← All {intro.title.toLowerCase()}
        </a>
      </p>
    </article>
  );
}
