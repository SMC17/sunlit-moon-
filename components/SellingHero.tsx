import Link from "next/link";
import { Photo } from "@/components/Photo";
import { RequestLink } from "@/components/Subscribe";
import { formatIssueDate } from "@/lib/format";
import { media, site } from "@/lib/site";

export function SellingHero() {
  return (
    <section className="border-b border-ink/15">
      <div className="mx-auto grid max-w-page items-end gap-10 px-5 py-14 md:grid-cols-12 md:px-8 md:py-20">
        <div className="md:col-span-7">
          <p className="label">
            {site.volume} · {formatIssueDate(site.issueDate)}
          </p>
          <h1 className="mt-6 font-display text-[3.4rem] leading-[0.88] tracking-[-0.03em] text-pretty md:text-7xl lg:text-[5.4rem]">
            {site.headline}
          </h1>
          <p className="mt-8 max-w-md font-body text-lg leading-relaxed text-ink-muted md:text-xl">
            {site.subhead}
          </p>
          <div className="mt-10 flex flex-wrap items-baseline gap-8">
            <RequestLink className="btn-ink" />
            <Link href="/developments" className="label link-quiet text-ink">
              {site.ctaSecondary}
            </Link>
          </div>
        </div>
        <figure className="md:col-span-4 md:col-start-9">
          <div className="overflow-hidden">
            <Photo
              src={media.hero.src}
              alt={media.hero.alt}
              className="photo-print aspect-[3/4] w-full object-cover object-[center_20%]"
            />
          </div>
          <figcaption className="label mt-3">
            {media.hero.credit}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
