import type { Metadata } from "next";
import { NewsletterForm } from "@/components/NewsletterForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "The evening edition, when it exists.",
};

export default function NewsletterPage() {
  return (
    <article className="pb-28">
      <div className="masthead-wash mx-auto max-w-page px-5 py-20 md:px-8 md:py-28">
        <p className="label">The evening edition</p>
        <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[0.9] tracking-[-0.035em] md:text-[5.2rem]">
          Not yet a letter. Already a desk.
        </h1>
        <p className="mt-8 max-w-xl font-body text-xl leading-relaxed text-ink-muted md:text-[1.35rem]">
          When Sunlit Moon has something worth sending after dark — a status change, a hearing, a
          street that shifted — it will arrive here first. Volume 0 keeps the chair warm.
        </p>
        <NewsletterForm />
        <p className="mt-20 max-w-md font-display text-3xl leading-snug tracking-tight text-ink-muted">
          {site.comingSoon.join(", ")} will get their own evening light. Evanston holds the lamp
          for now.
        </p>
      </div>
    </article>
  );
}
