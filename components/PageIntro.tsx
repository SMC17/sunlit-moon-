import { Photo } from "@/components/Photo";
import { SubscribeButton } from "@/components/Subscribe";
import { site } from "@/lib/site";

export function PageIntro({
  eyebrow,
  title,
  dek,
  image,
  subscribe = true,
}: {
  eyebrow: string;
  title: string;
  dek: string;
  image: { src: string; alt: string; credit?: string };
  subscribe?: boolean;
}) {
  return (
    <header className="relative min-h-[58vh] overflow-hidden bg-ink text-sand-50">
      <Photo
        src={image.src}
        alt={image.alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/20" />
      <div className="relative mx-auto flex min-h-[58vh] max-w-page flex-col justify-end px-5 pb-10 pt-28 md:px-8 md:pb-14">
        <p className="label text-sand-200">{eyebrow} · {site.updatedLabel}</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.9] tracking-[-0.035em] text-pretty md:text-7xl">
          {title}
        </h1>
        <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-sand-100 md:text-xl">
          {dek}
        </p>
        {subscribe ? (
          <div className="mt-8">
            <SubscribeButton variant="light">{site.ctaPrimary}</SubscribeButton>
          </div>
        ) : null}
        {image.credit ? (
          <p className="mt-6 text-xs text-sand-200/80">{image.credit}</p>
        ) : null}
      </div>
    </header>
  );
}
