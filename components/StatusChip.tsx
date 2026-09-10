import { DEVELOPMENT_STATUSES, type DevelopmentStatus } from "@/lib/types";

const styles: Record<DevelopmentStatus, string> = {
  Proposed: "border-ink/25 bg-sand-100 text-ink-muted",
  "In review": "border-sea/40 bg-sea-foam text-sea-deep",
  Approved: "border-sea/50 bg-sea-mist text-sea-deep",
  "Under construction": "border-copper/40 bg-copper-pale text-copper",
  Complete: "border-olive/40 bg-olive-pale text-olive",
};

export function StatusChip({ status }: { status: DevelopmentStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2 py-[0.2rem] font-sans text-[0.65rem] font-semibold uppercase tracking-label ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export function StatusLegend() {
  return (
    <ul className="flex flex-wrap gap-2">
      {DEVELOPMENT_STATUSES.map((status) => (
        <li key={status}>
          <StatusChip status={status} />
        </li>
      ))}
    </ul>
  );
}
