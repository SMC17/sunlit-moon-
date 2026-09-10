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
    <header className="mx-auto max-w-page px-5 pb-12 pt-14 md:px-8 md:pb-16 md:pt-20">
      <p className="label">{eyebrow}</p>
      <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.92] tracking-[-0.03em] text-pretty md:text-7xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl font-body text-xl leading-relaxed text-ink-muted md:text-[1.35rem]">
        {dek}
      </p>
    </header>
  );
}
