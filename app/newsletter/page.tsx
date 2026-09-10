import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "The evening edition, when it exists.",
};

export default function NewsletterPage() {
  return (
    <article className="pb-24">
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <p className="label text-sea">The evening edition</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
          Not yet a letter. Already a desk.
        </h1>
        <p className="mt-8 max-w-xl text-xl leading-relaxed text-ink-muted">
          When Sunlit Moon has something worth sending after dark — a status change, a hearing, a
          street that shifted — it will arrive here first. Volume 0 keeps the chair warm.
        </p>

        <form
          className="mt-14 max-w-lg border-y border-ink/15 py-10"
          action="/newsletter"
          method="get"
        >
          <label htmlFor="email" className="label">
            Leave an address
          </label>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@northshore.example"
              className="flex-1 border-b border-ink/30 bg-transparent px-0 py-3 text-lg outline-none placeholder:text-ink-faint focus:border-sea"
            />
            <button
              type="submit"
              className="label border border-ink bg-ink px-5 py-3 text-sand-50 transition hover:bg-sea hover:border-sea"
            >
              Hold my place
            </button>
          </div>
          <p className="mt-4 text-sm text-ink-faint">
            No backend yet — this stub does not store mail. It exists so the edition has a door.
          </p>
        </form>

        <p className="mt-16 max-w-md font-display text-2xl leading-snug text-ink-muted">
          {site.comingSoon.join(", ")} will get their own evening light. Evanston holds the lamp
          for now.
        </p>
      </div>
    </article>
  );
}
