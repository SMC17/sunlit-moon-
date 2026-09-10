import Link from "next/link";
import { entityPath, type Entity } from "@/lib/types";
import { StatusChip } from "@/components/StatusChip";

export function EntityCard({ entity }: { entity: Entity }) {
  return (
    <article className="border-t border-ink/10 py-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="label">{entity.neighborhood ?? entity.category ?? entity.role}</p>
        {entity.status ? <StatusChip status={entity.status} /> : null}
      </div>
      <h3 className="mt-2 font-display text-2xl tracking-tight">
        <Link href={`${entityPath[entity.type]}/${entity.slug}`} className="hover:text-sea-deep">
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
            className="inline-flex border border-ink/15 bg-sand-50 px-3 py-1 text-sm text-sea hover:border-sea/40 hover:bg-sea-foam"
          >
            {entity.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
