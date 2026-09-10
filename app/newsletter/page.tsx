import type { Metadata } from "next";
import { SubscribeFields } from "@/components/Subscribe";
import { media, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Newsletter",
  description: site.subscribeDek,
};

export default function NewsletterPage() {
  return (
    <article className="pb-24">
      <div className="relative overflow-hidden bg-ink text-sand-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.downtown.src}
          alt={media.downtown.alt}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/40" />
        <div className="relative mx-auto max-w-page px-5 py-20 md:px-8 md:py-28">
          <p className="label text-sand-200">The weekly brief</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[0.9] tracking-[-0.035em] md:text-[4.6rem]">
            Tuesday night, in your inbox, before the gossip mill.
          </h1>
          <p className="mt-6 max-w-lg font-body text-xl text-sand-100">{site.subscribeDek}</p>
        </div>
      </div>
      <div className="mx-auto max-w-page px-5 py-16 md:grid md:max-w-2xl md:px-8">
        <SubscribeFields idPrefix="page" />
        <p className="mt-12 font-display text-2xl leading-snug text-ink-muted">
          {site.proof.line}
        </p>
      </div>
    </article>
  );
}
