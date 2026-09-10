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
      <p className="label text-sea">{eyebrow}</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">{dek}</p>
    </header>
  );
}
