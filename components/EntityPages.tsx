import { notFound } from "next/navigation";
import { DevelopmentTracker } from "@/components/DevelopmentTracker";
import { EntityCard } from "@/components/EntityCard";
import { EntityLinkList } from "@/components/EntityCard";
import { NewsletterBand, SubscribeButton } from "@/components/Subscribe";
import { PageIntro } from "@/components/PageIntro";
import { Photo } from "@/components/Photo";
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
import { developmentMedia, mediaByType, site } from "@/lib/site";

const copy: Record<
  EntityType,
  { title: string; eyebrow: string; dek: string; singular: string }
> = {
  development: {
    eyebrow: "The board",
    title: "Developments",
    singular: "Development",
    dek: "Proposed, in review, approved, under construction, complete — follow a file before the status flips.",
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
  const intro = copy[type];
  const entities = type === "development" ? getDevelopments() : getEntitiesByType(type);
  const image = mediaByType[type];

  return (
    <>
      <PageIntro
        eyebrow={intro.eyebrow}
        title={intro.title}
        dek={intro.dek}
        image={image}
      />
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:pb-24">
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
      <NewsletterBand title="When a file on this list moves, you’ll know." />
    </>
  );
}

export function EntityDetail({ type, slug }: { type: EntityType; slug: string }) {
  const entity = getEntity(slug);
  if (!entity || entity.type !== type) notFound();
  const related = getRelatedEntities(entity);
  const stories = getStoriesForEntity(entity.slug);
  const intro = copy[type];
  const image = developmentMedia[entity.slug] ?? mediaByType[type];
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
    <article className="pb-0">
      <header className="relative min-h-[62vh] overflow-hidden bg-ink text-sand-50">
        <Photo
          src={image.src}
          alt={image.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/20" />
        <div className="relative mx-auto flex min-h-[62vh] max-w-page flex-col justify-end px-5 pb-10 pt-28 md:px-8">
          <p className="label text-sand-200">
            {intro.singular}
            {entity.neighborhood ? ` · ${entity.neighborhood}` : ""}
            {` · ${site.updatedLabel}`}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <h1 className="font-display text-5xl tracking-[-0.03em] md:text-7xl">{entity.name}</h1>
            {entity.status ? (
              <span className="bg-sand-50/95 px-1 py-1">
                <StatusChip status={entity.status} />
              </span>
            ) : null}
          </div>
          <p className="mt-6 max-w-2xl font-body text-xl leading-relaxed text-sand-100">
            {entity.dek}
          </p>
          {type === "development" ? (
            <div className="mt-8">
              <SubscribeButton variant="hero" intent={{ project: entity.name }}>
                Follow this project
              </SubscribeButton>
            </div>
          ) : (
            <div className="mt-8">
              <SubscribeButton variant="hero">{site.ctaPrimary}</SubscribeButton>
            </div>
          )}
        </div>
      </header>

      {type === "development" && entity.status ? (
        <div className="bg-sea px-5 py-6 text-sand-50 md:px-8">
          <div className="mx-auto max-w-page">
            <p className="label text-sand-200">Pipeline</p>
            <ol className="mt-3 flex flex-wrap gap-2">
              {DEVELOPMENT_STATUSES.map((status, index) => (
                <li
                  key={status}
                  className={`border px-3 py-1 text-sm ${
                    index === statusIndex
                      ? "border-sand-50 bg-sand-50 text-ink"
                      : index < statusIndex
                        ? "border-sand-50/40 text-sand-50"
                        : "border-sand-50/20 text-sand-200"
                  }`}
                >
                  {status}
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : null}

      {facts.length > 0 ? (
        <dl className={`mx-auto max-w-page grid gap-6 px-5 py-8 text-sm md:px-8 ${factCols}`}>
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="label">{fact.label}</dt>
              <dd className="mt-1">{fact.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="mx-auto max-w-measure px-5 py-8 font-body text-lg leading-relaxed md:px-0">
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
          <div className="grid gap-10 md:grid-cols-2">
            {stories.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </section>
      ) : null}

      <p className="mx-auto mt-14 mb-16 max-w-page px-5 text-sm text-ink-faint md:px-8">
        <a href={entityPath[type]} className="link-quiet">
          ← All {intro.title.toLowerCase()}
        </a>
      </p>
      <NewsletterBand title="When this file moves, you’ll know." />
    </article>
  );
}
