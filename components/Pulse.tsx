import Link from "next/link";

export type PulseStat = {
  value: number;
  label: string;
  hint: string;
  href: string;
};

const tiles = ["bg-cobalt text-sand-50", "bg-pool text-indigo", "bg-sand-200 text-ink", "bg-indigo text-sand-50"] as const;

export function Pulse({ stats }: { stats: PulseStat[] }) {
  return (
    <section aria-label="This edition">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`min-h-[11rem] px-5 py-6 transition-colors duration-nagai ${tiles[index % tiles.length]}`}
          >
            <p className="font-display text-5xl font-extrabold tabular-nums leading-none">
              {String(stat.value).padStart(2, "0")}
            </p>
            <p className="mt-4 font-display text-xl font-bold">{stat.label}</p>
            <p className="mt-1 text-sm opacity-80">{stat.hint}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
