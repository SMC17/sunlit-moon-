import { formatIssueDate } from "@/lib/format";
import { site } from "@/lib/site";

export function Masthead({ date }: { date: string }) {
  return (
    <section className="border-b border-ink/10">
      <div className="mx-auto max-w-page px-5 pb-10 pt-8 md:px-8 md:pb-14 md:pt-12">
        <div className="flex items-center justify-between gap-4 text-ink-muted">
          <p className="label">{site.volume}</p>
          <p className="label hidden sm:block">{site.edition}</p>
          <p className="label">{formatIssueDate(date)}</p>
        </div>
        <div className="rule-double mt-5" />
        <div className="py-10 text-center md:py-14">
          <p className="label mb-5 text-sea">{site.tagline}</p>
          <h1 className="wordmark text-[18vw] text-ink sm:text-[12vw] md:text-[7.6rem] lg:text-[9rem]">
            Sunlit Moon
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-muted md:text-xl">
            {site.edition}. A public ledger of stories, buildings, and civic life.
          </p>
        </div>
        <div className="rule-double" />
      </div>
    </section>
  );
}
