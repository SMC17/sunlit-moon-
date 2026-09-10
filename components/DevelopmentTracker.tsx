import Link from "next/link";
import { StatusChip, StatusLegend } from "@/components/StatusChip";
import { entityPath, type Entity } from "@/lib/types";

export function DevelopmentTracker({ developments }: { developments: Entity[] }) {
  return (
    <div>
      <div className="mb-6">
        <StatusLegend />
      </div>
      <ul className="border-t border-ink/20">
        {developments.map((item) => (
          <li
            key={item.slug}
            className="grid items-baseline gap-2 border-b border-ink/10 py-4 md:grid-cols-[1fr_auto_10rem] md:gap-6"
          >
            <div>
              <Link
                href={`${entityPath.development}/${item.slug}`}
                className="font-display text-xl tracking-tight hover:text-sea-deep md:text-[1.35rem]"
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
            <p className="label text-ink-faint md:text-right">{item.neighborhood}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
