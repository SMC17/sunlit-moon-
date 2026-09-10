import Link from "next/link";
import { SubscribeButton } from "@/components/Subscribe";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-sand-100">
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="font-display text-5xl leading-none tracking-[-0.03em]">{site.name}</p>
            <p className="mt-5 max-w-md font-body text-lg leading-relaxed text-ink-muted">
              {site.mission}
            </p>
            <div className="mt-6">
              <SubscribeButton>{site.ctaPrimary}</SubscribeButton>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-x-12 gap-y-2.5">
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
          <p className="text-sm text-ink-muted">{site.proof.line}</p>
          <p className="mt-2 text-sm text-ink-faint">
            {site.comingSoon.join(" · ")} editions forthcoming · {site.email}
          </p>
        </div>
      </div>
    </footer>
  );
}
