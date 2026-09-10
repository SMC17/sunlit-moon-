"use client";

import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";
import { StatusChip } from "@/components/StatusChip";
import { DEVELOPMENT_STATUSES, entityPath, type Entity } from "@/lib/types";

export function DevelopmentTracker({
  developments,
  compact = false,
}: {
  developments: Entity[];
  compact?: boolean;
}) {
  return (
    <Tabs.Root defaultValue="all">
      <Tabs.List
        aria-label="Filter developments"
        className="mb-2 flex flex-wrap gap-x-6 gap-y-2 border-b border-ink/15 pb-3"
      >
        <Tabs.Trigger
          value="all"
          className="label pb-2 text-ink-faint data-[state=active]:text-ink data-[state=active]:shadow-[inset_0_-1px_0_0_#1C1A17]"
        >
          All
        </Tabs.Trigger>
        {DEVELOPMENT_STATUSES.map((status) => (
          <Tabs.Trigger
            key={status}
            value={status}
            className="label pb-2 text-ink-faint data-[state=active]:text-ink data-[state=active]:shadow-[inset_0_-1px_0_0_#1C1A17]"
          >
            {status}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Tabs.Content value="all">
        <TrackerList items={compact ? developments.slice(0, 6) : developments} />
      </Tabs.Content>
      {DEVELOPMENT_STATUSES.map((status) => (
        <Tabs.Content key={status} value={status}>
          <TrackerList items={developments.filter((item) => item.status === status)} />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}

function TrackerList({ items }: { items: Entity[] }) {
  if (items.length === 0) {
    return <p className="py-8 text-ink-muted">Nothing on this part of the board.</p>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li
          key={item.slug}
          className="grid items-baseline gap-2 border-b border-ink/15 py-5 md:grid-cols-[1fr_auto_9rem] md:gap-8"
        >
          <div>
            <Link
              href={`${entityPath.development}/${item.slug}`}
              className="font-display text-[1.45rem] tracking-tight link-quiet md:text-[1.6rem]"
            >
              {item.name}
            </Link>
            <p className="mt-1 text-sm text-ink-muted">{item.program ?? item.dek}</p>
          </div>
          {item.status ? (
            <div className="md:justify-self-end">
              <StatusChip status={item.status} />
            </div>
          ) : null}
          <p className="label md:text-right">{item.neighborhood}</p>
        </li>
      ))}
    </ul>
  );
}
