import Link from "next/link";
import { entityPath, type Entity } from "@/lib/types";
import { StatusChip } from "@/components/StatusChip";

export function EntityCard({ entity }: { entity: Entity }) {
  return (
    <article className="border-t border-ink/10 py-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="label">{entity.neighborhood ?? entity.category ?? entity.role}</p>
        {entity.status ? <StatusChip status={entity.status} /> : null}
      </div>
      <h3 className="mt-2 font-display text-[1.75rem] tracking-tight md:text-3xl">
        <Link href={`${entityPath[entity.type]}/${entity.slug}`} className="link-quiet">
          {entity.name}
        </Link>
      </h3>
      <p className="mt-2 max-w-2xl leading-relaxed text-ink-muted">{entity.dek}</p>
    </article>
  );
}

export function EntityLinkList({ entities }: { entities: Entity[] }) {
  if (entities.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {entities.map((entity) => (
        <li key={entity.slug}>
          <Link
            href={`${entityPath[entity.type]}/${entity.slug}`}
            className="inline-flex border border-ink/15 px-3 py-1 text-sm transition-colors duration-300 ease-out hover:border-ink/40 hover:bg-sand-100"
          >
            {entity.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
