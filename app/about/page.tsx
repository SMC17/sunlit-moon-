import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: site.mission,
};

export default function AboutPage() {
  return (
    <article className="pb-24">
      <header className="border-b border-ink/10">
        <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
          <p className="label text-sea">{site.tagline}</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
            A public ledger for a city that faces the water.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-ink-muted">
            {site.name} is not a newsfeed and not a dashboard. It is a place operating system:
            stories bound to buildings, buildings bound to people, and a monthly record of what
            actually changed.
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-page gap-16 px-5 py-16 md:grid-cols-12 md:px-8">
        <section className="md:col-span-7">
          <h2 className="font-display text-3xl tracking-tight">Why Evanston first</h2>
          <div className="prose-story mt-6">
            <p>
              Evanston is the right first edition because it is already a complete civic sentence:
              a downtown with a named square, a lakefront that behaves like a public room, a
              university that is also a landscape, and a Tuesday-night commission that still argues
              in public. If a place OS cannot hold Fountain Square, it cannot hold a city.
            </p>
            <p>
              Volume 0 is a working model. The stories are marked as demo in the repository. The
              entities are real streets and invented portraits, bound the way a later newsroom
              would bind them: both directions, always.
            </p>
            <p>
              We will not pretend that software replaces a court reporter. We will keep the docket,
              the dek, and the status chip in the same family of objects.
            </p>
          </div>
        </section>
        <aside className="border-t border-ink/15 pt-8 md:col-span-4 md:col-start-9 md:border-l md:border-t-0 md:pl-8 md:pt-0">
          <p className="label">Forthcoming editions</p>
          <ul className="mt-5 space-y-4">
            {site.comingSoon.map((place) => (
              <li key={place} className="border-b border-ink/10 pb-4 font-display text-2xl">
                {place}
                <span className="mt-1 block font-sans text-sm tracking-normal text-ink-faint">
                  Coming when the light is right
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <section className="mx-auto max-w-page px-5 md:px-8">
        <div className="grid gap-8 border-y border-ink/15 py-12 md:grid-cols-3">
          {[
            {
              title: "Stories",
              body: "Magazine length, newspaper discipline. A dek, a kicker, and links into the ledger.",
            },
            {
              title: "The board",
              body: "Developments carry print-inspired statuses: Proposed, In review, Approved, Under construction, Complete.",
            },
            {
              title: "The month",
              body: "What changed is a civic weather report — not a changelog for its own sake.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="font-display text-2xl">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-xl text-ink-muted">
          Desk: {site.email}. The evening edition, when it exists, lives on the{" "}
          <Link href="/newsletter" className="text-sea underline-offset-4 hover:underline">
            newsletter
          </Link>{" "}
          page.
        </p>
      </section>
    </article>
  );
}
