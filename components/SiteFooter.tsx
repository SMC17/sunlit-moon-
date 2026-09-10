import Link from "next/link";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-ink/15 bg-sand-100">
      <div className="mx-auto max-w-page px-5 py-14 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="label mb-4 text-sea">{site.tagline}</p>
            <p className="font-display text-4xl leading-none tracking-tight md:text-5xl">
              {site.name}
            </p>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ink-muted">
              {site.mission}
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="label hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/newsletter" className="label hover:text-ink">
                Newsletter
              </Link>
            </li>
            <li>
              <Link href="/rss.xml" className="label hover:text-ink">
                RSS
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-12 border-t border-ink/10 pt-6">
          <p className="text-sm leading-relaxed text-ink-muted">
            {site.comingSoon.join(" · ")} editions: coming when the light is right.
          </p>
          <p className="mt-2 text-sm text-ink-faint">{site.volume} · Demo edition · {site.email}</p>
        </div>
      </div>
    </footer>
  );
}
