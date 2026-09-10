import type { Metadata } from "next";
import { RequestLink } from "@/components/Subscribe";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: site.mission,
};

export default function AboutPage() {
  return (
    <article>
      <header className="mx-auto max-w-page px-5 pb-12 pt-14 md:px-8 md:pt-20">
        <p className="label">
          {site.tagline} · {site.edition}
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[0.9] tracking-[-0.03em] md:text-[4.6rem]">
          An edition of a place.
        </h1>
        <p className="mt-8 max-w-xl font-body text-xl leading-relaxed text-ink-muted">
          {site.mission}
        </p>
      </header>

      <div className="mx-auto grid max-w-page gap-16 px-5 pb-20 md:grid-cols-12 md:px-8">
        <section className="md:col-span-7">
          <ol className="space-y-8">
            {[
              {
                t: "The file, not the rumor",
                b: "When a status changes — In review, Approved, Under construction — it is written here first.",
              },
              {
                t: "Bound both ways",
                b: "Stories point to buildings. Buildings point back. The ledger is the product.",
              },
              {
                t: "Evanston, on purpose",
                b: "If the edition cannot hold Fountain Square, it cannot hold a city. Other places come later.",
              },
            ].map((item, index) => (
              <li key={item.t} className="border-t border-ink/15 pt-6">
                <p className="label">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 font-display text-3xl tracking-tight">{item.t}</h2>
                <p className="mt-2 leading-relaxed text-ink-muted">{item.b}</p>
              </li>
            ))}
          </ol>
          <p className="mt-12">
            <RequestLink className="btn-ink" />
          </p>
        </section>
        <aside className="md:col-span-4 md:col-start-9">
          <p className="label">Forthcoming</p>
          <p className="mt-4 font-display text-3xl leading-snug tracking-tight">
            {site.comingSoon.join(". ")}.
          </p>
          <p className="mt-6 text-sm text-ink-faint">{site.email}</p>
        </aside>
      </div>
    </article>
  );
}
