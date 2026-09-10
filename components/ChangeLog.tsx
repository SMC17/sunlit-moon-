import Link from "next/link";
import { formatShortDate } from "@/lib/format";
import type { MonthlyChange } from "@/lib/types";

export function ChangeLog({ changes }: { changes: MonthlyChange[] }) {
  return (
    <ol>
      {changes.map((change) => (
        <li key={change.title} className="grid gap-2 border-t border-ink/10 py-5 md:grid-cols-[7rem_1fr] md:gap-8">
          <time className="label pt-1">{formatShortDate(change.date)}</time>
          <div>
            <h3 className="font-display text-xl tracking-tight">
              {change.href ? (
                <Link href={change.href} className="hover:text-sea-deep">
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
