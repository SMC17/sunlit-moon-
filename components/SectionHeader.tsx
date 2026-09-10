export function SectionHeader({
  eyebrow,
  title,
  hrefLabel,
  href,
}: {
  eyebrow?: string;
  title: string;
  hrefLabel?: string;
  href?: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4 border-b border-ink/15 pb-3">
      <div>
        {eyebrow ? <p className="label mb-2">{eyebrow}</p> : null}
        <h2 className="font-display text-[2rem] tracking-tight md:text-[2.6rem]">{title}</h2>
      </div>
      {href && hrefLabel ? (
        <a href={href} className="label shrink-0 link-quiet">
          {hrefLabel}
        </a>
      ) : null}
    </div>
  );
}
