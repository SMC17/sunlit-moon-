"use client";

import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import { SubscribeButton } from "@/components/Subscribe";
import { StatusChip } from "@/components/StatusChip";
import { developmentMedia, media } from "@/lib/site";
import { DEVELOPMENT_STATUSES, entityPath, type DevelopmentStatus, type Entity } from "@/lib/types";

export function DevelopmentTracker({
  developments,
  compact = false,
}: {
  developments: Entity[];
  compact?: boolean;
}) {
  const counts = Object.fromEntries(
    DEVELOPMENT_STATUSES.map((status) => [
      status,
      developments.filter((item) => item.status === status).length,
    ]),
  ) as Record<DevelopmentStatus, number>;

  return (
    <Tabs.Root defaultValue="all">
      <div className="mb-8 overflow-x-auto">
        <ol className="flex min-w-max items-center gap-1 text-sm">
          {DEVELOPMENT_STATUSES.map((status, index) => (
            <li key={status} className="flex items-center gap-1">
              {index > 0 ? <span className="mx-1 text-ink-faint">—</span> : null}
              <span className="label text-ink">{status}</span>
              <span className="font-display text-xl leading-none">{counts[status]}</span>
            </li>
          ))}
        </ol>
      </div>

      <Tabs.List
        aria-label="Filter developments"
        className="mb-8 flex flex-wrap gap-2"
      >
        <Tabs.Trigger
          value="all"
          className="border border-ink/15 px-3 py-1.5 font-sans text-[0.62rem] font-medium uppercase tracking-label text-ink-muted data-[state=active]:border-ink data-[state=active]:bg-ink data-[state=active]:text-sand-50"
        >
          All · {developments.length}
        </Tabs.Trigger>
        {DEVELOPMENT_STATUSES.map((status) => (
          <Tabs.Trigger
            key={status}
            value={status}
            className="border border-ink/15 px-3 py-1.5 font-sans text-[0.62rem] font-medium uppercase tracking-label text-ink-muted data-[state=active]:border-ink data-[state=active]:bg-ink data-[state=active]:text-sand-50"
          >
            {status} · {counts[status]}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Tabs.Content value="all">
        <TrackerGrid items={developments} compact={compact} />
      </Tabs.Content>
      {DEVELOPMENT_STATUSES.map((status) => (
        <Tabs.Content key={status} value={status}>
          <TrackerGrid
            items={developments.filter((item) => item.status === status)}
            compact={compact}
          />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}

function TrackerGrid({ items, compact }: { items: Entity[]; compact: boolean }) {
  if (items.length === 0) {
    return <p className="py-8 text-ink-muted">Nothing on this part of the board.</p>;
  }

  const shown = compact ? items.slice(0, 4) : items;

  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {shown.map((item) => (
        <DevelopmentCard key={item.slug} item={item} />
      ))}
    </ul>
  );
}

function DevelopmentCard({ item }: { item: Entity }) {
  const image = developmentMedia[item.slug] ?? media.construction;
  const statusIndex = DEVELOPMENT_STATUSES.indexOf(item.status ?? "Proposed");

  return (
    <li className="group overflow-hidden border border-ink/10 bg-sand-50">
      <Link href={`${entityPath.development}/${item.slug}`} className="block">
        <div className="relative aspect-[16/8] overflow-hidden bg-ink">
          <Photo
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          {item.status ? (
            <div className="absolute bottom-3 left-3">
              <StatusChip status={item.status} />
            </div>
          ) : null}
        </div>
      </Link>
      <div className="p-5">
        <p className="label">{item.neighborhood}</p>
        <h3 className="mt-2 font-display text-2xl tracking-tight">
          <Link href={`${entityPath.development}/${item.slug}`} className="link-quiet">
            {item.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.program ?? item.dek}</p>
        <ol className="mt-4 flex flex-wrap gap-1">
          {DEVELOPMENT_STATUSES.map((status, index) => (
            <li
              key={status}
              className={`h-1.5 w-8 ${index <= statusIndex ? "bg-ink" : "bg-ink/15"}`}
              title={status}
            />
          ))}
        </ol>
        <div className="mt-5 flex flex-wrap gap-2">
          <SubscribeButton intent={{ project: item.name }}>Follow this project</SubscribeButton>
          <Link href={`${entityPath.development}/${item.slug}`} className="btn-ghost">
            Open file
          </Link>
        </div>
      </div>
    </li>
  );
}
