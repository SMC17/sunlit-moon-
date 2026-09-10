import type { Metadata } from "next";
import { NewsletterBand, SubscribeButton } from "@/components/Subscribe";
import { Reveal } from "@/components/Reveal";
import { media, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: site.mission,
};

export default function AboutPage() {
  return (
    <article>
      <header className="relative overflow-hidden bg-ink text-sand-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.lakefront.src}
          alt={media.lakefront.alt}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/25" />
        <div className="relative mx-auto max-w-page px-5 py-24 md:px-8 md:py-32">
          <p className="label text-sand-200">{site.tagline} · {site.edition}</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.9] tracking-[-0.035em] md:text-[5rem]">
            Local intelligence you’d actually pay for.
          </h1>
          <p className="mt-8 max-w-xl font-body text-xl leading-relaxed text-sand-100">
            {site.subhead}
          </p>
          <div className="mt-8">
            <SubscribeButton variant="light">{site.ctaPrimary}</SubscribeButton>
          </div>
        </div>
      </header>

      <Reveal>
        <div className="mx-auto grid max-w-page gap-16 px-5 py-20 md:grid-cols-12 md:px-8">
          <section className="md:col-span-7">
            <h2 className="font-display text-4xl tracking-tight">Why subscribe</h2>
            <ul className="mt-8 space-y-6">
              {[
                {
                  t: "Before the gossip mill",
                  b: "Status changes land in one brief — In review, Approved, Under construction — so you are not learning downtown from a neighbor who was at Plan Commission.",
                },
                {
                  t: "The board, not the feed",
                  b: "Six developments tracked. Twelve hearings in the file. Stories bound to buildings both ways.",
                },
                {
                  t: "Evanston first, on purpose",
                  b: "If a place OS cannot hold Fountain Square, it cannot hold a city. Long Island, Palm Beach, and New York City come when this one is true.",
                },
              ].map((item) => (
                <li key={item.t} className="border-t border-ink/10 pt-5">
                  <h3 className="font-display text-2xl tracking-tight">{item.t}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{item.b}</p>
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

      <NewsletterBand title="One email. When the square moves." />
    </article>
  );
}
