import { DEVELOPMENT_STATUSES, type DevelopmentStatus } from "@/lib/types";

export function StatusChip({ status }: { status: DevelopmentStatus }) {
  return (
    <span className="text-[0.6875rem] uppercase tracking-label text-ink-muted">
      {status === "In review" ? (
        <span className="text-cobalt">{status}</span>
      ) : (
        status
      )}
    </span>
  );
}

export function StatusLegend() {
  return (
    <ul className="flex flex-wrap gap-4">
      {DEVELOPMENT_STATUSES.map((status) => (
        <li key={status}>
          <StatusChip status={status} />
        </li>
      ))}
    </ul>
  );
}
