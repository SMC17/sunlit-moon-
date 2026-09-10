export function PageIntro({
  eyebrow,
  title,
  dek,
}: {
  eyebrow: string;
  title: string;
  dek: string;
}) {
  return (
    <header className="mx-auto max-w-page px-5 pb-10 pt-12 md:px-8 md:pb-14 md:pt-16">
      <p className="label">{eyebrow}</p>
      <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.9] tracking-[-0.03em] text-pretty md:text-7xl">
        {title}
      </h1>
      <p className="mt-6 max-w-xl font-body text-xl leading-relaxed text-ink-muted">
        {dek}
      </p>
    </header>
  );
}
