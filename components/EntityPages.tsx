import { notFound } from "next/navigation";
import { DevelopmentTracker } from "@/components/DevelopmentTracker";
import { EntityCard } from "@/components/EntityCard";
import { EntityLinkList } from "@/components/EntityCard";
import { PageIntro } from "@/components/PageIntro";
import { RequestLink } from "@/components/Subscribe";
import { StatusChip } from "@/components/StatusChip";
import { StoryCard } from "@/components/StoryCard";
import {
  getDevelopments,
  getEntitiesByType,
  getEntity,
  getRelatedEntities,
  getStoriesForEntity,
} from "@/lib/content";
import { DEVELOPMENT_STATUSES, entityPath, type EntityType } from "@/lib/types";
import type { NagaiScene } from "@/lib/nagai";

const copy: Record<
  EntityType,
  { title: string; eyebrow: string; dek: string; singular: string; scene: NagaiScene }
> = {
  development: {
    eyebrow: "The board",
    title: "Developments",
    singular: "Development",
    dek: "Proposed, in review, approved, under construction, complete.",
    scene: "facade",
  },
  place: {
    eyebrow: "The ground",
    title: "Places",
    singular: "Place",
    dek: "Squares, streets, a lakefront, a campus.",
    scene: "lake",
  },
  business: {
    eyebrow: "The storefronts",
    title: "Businesses",
    singular: "Business",
    dek: "Independents, markets, and the leagues that speak for a block.",
    scene: "pool",
  },
  person: {
    eyebrow: "The room",
    title: "People",
    singular: "Person",
    dek: "Commissioners, staff, architects.",
    scene: "night",
  },
};

export function EntityIndex({ type }: { type: EntityType }) {
  const intro = copy[type];
  const entities = type === "development" ? getDevelopments() : getEntitiesByType(type);

  return (
    <>
      <PageIntro eyebrow={intro.eyebrow} title={intro.title} dek={intro.dek} scene={intro.scene} />
      <div className="mx-auto max-w-page px-5 pb-24 md:px-8">
        {type === "development" ? (
          <DevelopmentTracker developments={entities} />
        ) : (
          <div className="border-t border-ink/15">
            {entities.map((entity) => (
              <EntityCard key={entity.slug} entity={entity} />
            ))}
          </div>
        )}
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
  const facts = [
    entity.address ? { label: "Address", value: entity.address } : null,
    entity.program ? { label: "Program", value: entity.program } : null,
    entity.role ? { label: "Role", value: entity.role } : null,
    entity.category ? { label: "Category", value: entity.category } : null,
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact));
  const factCols =
    facts.length >= 3 ? "md:grid-cols-3" : facts.length === 2 ? "md:grid-cols-2" : "";
  const statusIndex = DEVELOPMENT_STATUSES.indexOf(entity.status ?? "Proposed");

  return (
    <article className="pb-20">
      <header className="mx-auto max-w-page px-5 pt-14 md:px-8 md:pt-20">
        <p className="label">
          {intro.singular}
          {entity.neighborhood ? ` · ${entity.neighborhood}` : ""}
        </p>
        <div className="mt-4 flex flex-wrap items-baseline gap-4">
          <h1 className="font-display text-5xl tracking-[-0.03em] md:text-7xl">{entity.name}</h1>
          {entity.status ? <StatusChip status={entity.status} /> : null}
        </div>
        <p className="mt-6 max-w-2xl font-body text-xl leading-relaxed text-ink-muted">
          {entity.dek}
        </p>
        {type === "development" && entity.status ? (
          <ol className="mt-8 flex flex-wrap gap-x-4 gap-y-2">
            {DEVELOPMENT_STATUSES.map((status, index) => (
              <li
                key={status}
                className={`label ${index === statusIndex ? "text-cobalt" : ""}`}
              >
                {status}
              </li>
            ))}
          </ol>
        ) : null}
        {facts.length > 0 ? (
          <dl className={`mt-10 grid gap-6 border-y border-ink/15 py-7 text-sm ${factCols}`}>
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="label">{fact.label}</dt>
                <dd className="mt-1">{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </header>

      <div className="mx-auto max-w-measure px-5 py-12 font-body text-lg leading-relaxed md:px-0">
        <p>{entity.summary}</p>
      </div>

      {related.length > 0 ? (
        <section className="mx-auto max-w-page px-5 md:px-8">
          <p className="label mb-4">Linked in the ledger</p>
          <EntityLinkList entities={related} />
        </section>
      ) : null}

      {stories.length > 0 ? (
        <section className="mx-auto mt-16 max-w-page px-5 md:px-8">
          <h2 className="mb-6 border-b border-ink/15 pb-3 font-display text-3xl tracking-tight">
            In the edition
          </h2>
          <div className="grid gap-12 md:grid-cols-2">
            {stories.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </section>
      ) : null}

      <p className="mx-auto mt-14 max-w-page px-5 text-sm md:px-8">
        <a href={entityPath[type]} className="link-quiet">
          ← {intro.title}
        </a>
        {type === "development" ? (
          <>
            {" · "}
            <RequestLink>Note this file</RequestLink>
          </>
        ) : null}
      </p>
    </article>
  );
}
