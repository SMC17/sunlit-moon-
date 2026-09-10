import Link from "next/link";
import { NagaiSleeve } from "@/components/NagaiArt";
import { RequestLink } from "@/components/Subscribe";
import { formatIssueDate } from "@/lib/format";
import { site } from "@/lib/site";

export function SellingHero() {
  return (
    <section className="relative min-h-[92svh] overflow-hidden bg-[#2B6FBC] text-sand-50">
      <NagaiSleeve />
      <div className="relative mx-auto flex min-h-[92svh] max-w-page flex-col justify-end px-5 pb-8 pt-10 md:px-8 md:pb-12">
        <p className="label text-sand-50/75">
          {site.volume} · {formatIssueDate(site.issueDate)} · {site.edition}
        </p>
        <h1 className="mt-3 max-w-lg font-display text-4xl font-extrabold leading-[0.94] tracking-[-0.04em] md:text-6xl">
          {site.headline}
        </h1>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-sand-50/85 md:text-base">
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
