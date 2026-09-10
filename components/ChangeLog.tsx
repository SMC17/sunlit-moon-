import Link from "next/link";
import { formatShortDate } from "@/lib/format";
import type { MonthlyChange } from "@/lib/types";

export function ChangeLog({ changes }: { changes: MonthlyChange[] }) {
  return (
    <ol>
      {changes.map((change) => (
        <li
          key={change.title}
          className="grid gap-2 border-t border-ink/15 py-6 md:grid-cols-[7rem_1fr] md:gap-10"
        >
          <time className="label pt-1">{formatShortDate(change.date)}</time>
          <div>
            <h3 className="font-display text-[1.45rem] tracking-tight">
              {change.href ? (
                <Link href={change.href} className="link-quiet">
                  {change.title}
                </Link>
              ) : (
                change.title
              )}
            </h3>
            <p className="mt-1 leading-relaxed text-ink-muted">{change.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
