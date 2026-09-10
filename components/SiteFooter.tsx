import Link from "next/link";
import { EditionForm } from "@/components/Subscribe";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/15">
      <div className="mx-auto grid max-w-page gap-16 px-5 py-16 md:grid-cols-12 md:px-8 md:py-20">
        <div className="md:col-span-6">
          <EditionForm />
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <p className="font-display text-4xl tracking-tight">{site.name}</p>
          <p className="mt-4 max-w-sm font-body text-ink-muted">{site.mission}</p>
          <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="label hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/newsletter" className="label hover:text-ink">
                Edition
              </Link>
            </li>
            <li>
              <Link href="/rss.xml" className="label hover:text-ink">
                RSS
              </Link>
            </li>
          </ul>
          <p className="mt-10 text-sm text-ink-faint">
            {site.comingSoon.join(" · ")} · {site.email}
          </p>
        </div>
      </div>
    </footer>
  );
}
