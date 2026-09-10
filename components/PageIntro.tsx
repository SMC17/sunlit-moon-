import { NagaiPanel } from "@/components/NagaiArt";
import type { NagaiScene } from "@/lib/nagai";

export function PageIntro({
  eyebrow,
  title,
  dek,
  scene = "facade",
}: {
  eyebrow: string;
  title: string;
  dek: string;
  scene?: NagaiScene;
}) {
  return (
    <header className="mx-auto grid max-w-page items-end gap-10 px-5 pb-10 pt-12 md:grid-cols-12 md:px-8 md:pb-14 md:pt-16">
      <div className="md:col-span-7">
        <p className="label">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-extrabold leading-[0.92] tracking-[-0.04em] text-pretty md:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-xl leading-relaxed text-ink-muted">{dek}</p>
      </div>
      <div className="md:col-span-4 md:col-start-9">
        <NagaiPanel scene={scene} className="aspect-[5/4]" />
      </div>
    </header>
  );
}
