import type { Metadata } from "next";
import { SubscribeFields } from "@/components/Subscribe";
import { Photo } from "@/components/Photo";
import { media, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Newsletter",
  description: site.subscribeDek,
};

export default function NewsletterPage() {
  return (
    <article>
      <div className="relative min-h-[92svh] overflow-hidden bg-ink text-sand-50">
        <Photo
          src={media.skyline.src}
          alt={media.skyline.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/25" />
        <div className="relative mx-auto flex min-h-[92svh] max-w-page flex-col justify-end px-5 pb-16 pt-28 md:px-8">
          <p className="label text-sand-200">The weekly brief · {site.updatedLabel}</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[0.9] tracking-[-0.035em] md:text-[4.6rem]">
            Tuesday night, in your inbox, before the gossip mill.
          </h1>
          <p className="mt-6 max-w-lg font-body text-xl text-sand-100">{site.subscribeDek}</p>
          <div className="mt-8 max-w-xl">
            <SubscribeFields idPrefix="page" tone="dark" />
          </div>
          <aside className="mt-10 max-w-lg border border-sand-50/20 px-4 py-4">
            <p className="label text-sand-200">{site.sampleBrief.eyebrow}</p>
            <p className="mt-2 font-display text-2xl">{site.sampleBrief.subject}</p>
            <ul className="mt-3 space-y-1 text-sm text-sand-200">
              {site.sampleBrief.items.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </article>
  );
}
