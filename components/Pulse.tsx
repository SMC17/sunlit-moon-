import { getPulse } from "@/lib/content";

export function Pulse() {
  const pulse = getPulse();
  const stats = [
    { value: pulse.stories, label: "Stories in this edition" },
    { value: pulse.developments, label: "Developments on the board" },
    { value: pulse.inReview, label: "Now in review" },
    { value: pulse.entities, label: "Places, firms & people indexed" },
  ];

  return (
    <section aria-label="Edition pulse">
      <div className="grid grid-cols-2 border-y border-ink/15 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`px-1 py-8 text-center md:py-10 ${
              index < stats.length - 1 ? "md:border-r md:border-ink/15" : ""
            } ${index % 2 === 0 ? "border-r border-ink/15 md:border-r" : ""} ${
              index < 2 ? "border-b border-ink/15 md:border-b-0" : ""
            }`}
          >
            <p className="font-display text-5xl leading-none tracking-tight md:text-6xl">
              {stat.value}
            </p>
            <p className="label mx-auto mt-3 max-w-[11rem] text-ink-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
