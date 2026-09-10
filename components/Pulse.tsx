import Link from "next/link";

export type PulseStat = {
  value: number;
  label: string;
  hint: string;
  href: string;
};

export function Pulse({ stats }: { stats: PulseStat[] }) {
  return (
    <section aria-label="This edition" className="border-b border-ink/15">
      <div className="mx-auto max-w-page px-5 py-12 md:px-8 md:py-16">
        <p className="label mb-8">Contents</p>
        <ol>
          {stats.map((stat) => (
            <li key={stat.label} className="border-t border-ink/15 last:border-b">
              <Link
                href={stat.href}
                className="grid items-baseline gap-2 py-4 md:grid-cols-[1fr_auto] md:gap-8"
              >
                <span>
                  <span className="font-display text-2xl tracking-tight md:text-3xl">
                    {stat.label}
                  </span>
                  <span className="mt-1 block text-sm text-ink-muted">{stat.hint}</span>
                </span>
                <span className="font-mono text-sm tabular-nums text-ink-faint">
                  {String(stat.value).padStart(2, "0")}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
