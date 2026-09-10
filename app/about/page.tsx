import type { Metadata } from "next";
import { NewsletterBand, SubscribeButton } from "@/components/Subscribe";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { media, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: site.mission,
};

export default function AboutPage() {
  return (
    <article>
      <header className="relative min-h-[78vh] overflow-hidden bg-ink text-sand-50">
        <Photo
          src={media.lighthouse.src}
          alt={media.lighthouse.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-page flex-col justify-end px-5 pb-12 pt-28 md:px-8">
          <p className="label text-sand-200">{site.tagline} · {site.edition} · {site.updatedLabel}</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.9] tracking-[-0.035em] md:text-[5rem]">
            Local intelligence you’d actually pay for.
          </h1>
          <p className="mt-8 max-w-xl font-body text-xl leading-relaxed text-sand-100">
            {site.subhead}
          </p>
          <div className="mt-8">
            <SubscribeButton variant="hero">{site.ctaPrimary}</SubscribeButton>
          </div>
        </div>
      </header>

      <Reveal>
        <div className="mx-auto grid max-w-page gap-16 px-5 py-20 md:grid-cols-12 md:px-8">
          <section className="md:col-span-7">
            <h2 className="font-display text-4xl tracking-tight">Why subscribe</h2>
            <ul className="mt-8 space-y-6">
              {site.benefits.map((item) => (
                <li key={item.title} className="border-t border-ink/10 pt-5">
                  <h3 className="font-display text-2xl tracking-tight">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{item.body}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <SubscribeButton>{site.ctaPrimary}</SubscribeButton>
            </div>
          </section>
          <aside className="md:col-span-4 md:col-start-9">
            <p className="label">The proof</p>
            <p className="mt-4 font-display text-5xl leading-none">{site.proof.hearings}</p>
            <p className="mt-2 text-ink-muted">hearings in the Plan Commission file</p>
            <p className="mt-8 font-display text-5xl leading-none">{site.proof.developments}</p>
            <p className="mt-2 text-ink-muted">developments on the board</p>
            <p className="mt-8 font-display text-5xl leading-none">{site.proof.dispatches}</p>
            <p className="mt-2 text-ink-muted">dispatches this edition · {site.updatedLabel.toLowerCase()}</p>
          </aside>
        </div>
      </Reveal>

      <NewsletterBand tone="sea" title="One email. When the square moves." />
    </article>
  );
}
