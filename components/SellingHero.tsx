import Link from "next/link";
import { NagaiSleeve } from "@/components/NagaiArt";
import { RequestLink } from "@/components/Subscribe";
import { formatIssueDate } from "@/lib/format";
import { site } from "@/lib/site";

export function SellingHero() {
  return (
    <section className="relative min-h-[88svh] overflow-hidden bg-cobalt text-sand-50">
      <NagaiSleeve />
      <div className="relative mx-auto flex min-h-[88svh] max-w-page flex-col justify-end px-5 pb-10 pt-10 md:px-8 md:pb-14">
        <p className="label text-sand-50/80">
          {site.volume} · {formatIssueDate(site.issueDate)} · {site.edition}
        </p>
        <h1 className="mt-4 max-w-xl font-display text-5xl font-extrabold leading-[0.92] tracking-[-0.04em] md:text-7xl">
          {site.headline}
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-sand-50/90 md:text-lg">
          {site.subhead}
        </p>
        <div className="mt-8 flex flex-wrap items-baseline gap-8">
          <RequestLink className="border-b border-sand-50 pb-1 text-sand-50 hover:border-pool hover:text-pool" />
          <Link href="/developments" className="label text-sand-50/80 hover:text-sand-50">
            {site.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
