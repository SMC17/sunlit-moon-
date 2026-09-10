import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Edition",
  description: site.subscribeDek,
};

export default function NewsletterPage() {
  return (
    <article>
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <p className="label">Correspondence</p>
        <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[0.9] tracking-[-0.03em] md:text-[4.4rem]">
          Request the edition.
        </h1>
        <p className="mt-6 max-w-md font-body text-xl text-ink-muted">
          {site.subscribeDek} The form is at the foot of every page.
        </p>
      </div>
    </article>
  );
}
