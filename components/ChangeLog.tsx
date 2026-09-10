import Link from "next/link";
import { formatShortDate } from "@/lib/format";
import { site } from "@/lib/site";
import type { MonthlyChange } from "@/lib/types";

export function ChangeLog({ changes }: { changes: MonthlyChange[] }) {
  return (
    <ol>
      {changes.map((change, index) => (
        <li
          key={change.title}
          className="grid gap-2 border-t border-ink/10 py-6 md:grid-cols-[7.5rem_1fr] md:gap-10"
        >
          <time className="label pt-1">
            {index === 0 ? `${site.updatedLabel} · ` : null}
            {formatShortDate(change.date)}
          </time>
          <div>
            <h3 className="font-display text-[1.5rem] tracking-tight">
              {change.href ? (
                <Link href={change.href} className="link-quiet">
                  {change.title}
                </Link>
              ) : (
                change.title
              )}
            </h3>
            <p className="mt-1 leading-relaxed text-ink-muted">{change.body}</p>
            {change.href ? (
              <p className="label mt-3 text-ink">See what changed →</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
