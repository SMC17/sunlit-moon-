import { DEVELOPMENT_STATUSES, type DevelopmentStatus } from "@/lib/types";

const styles: Record<DevelopmentStatus, string> = {
  Proposed: "border-ink/20 text-ink-muted",
  "In review": "border-sea/35 text-sea",
  Approved: "border-sea/50 text-sea-deep",
  "Under construction": "border-copper/45 text-copper",
  Complete: "border-olive/45 text-olive",
};

export function StatusChip({ status }: { status: DevelopmentStatus }) {
  return (
    <span
      className={`inline-flex items-center border px-2 py-[0.18rem] font-sans text-[0.62rem] font-medium uppercase tracking-label ${styles[status]}`}
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
