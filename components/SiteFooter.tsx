import Link from "next/link";
import { NagaiPanel } from "@/components/NagaiArt";
import { EditionForm } from "@/components/Subscribe";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-indigo text-sand-50">
      <NagaiPanel scene="night" className="h-40 w-full md:h-52" />
      <div className="mx-auto grid max-w-page gap-16 px-5 py-16 md:grid-cols-12 md:px-8 md:py-20">
        <div className="md:col-span-6">
          <EditionForm tone="dark" />
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <p className="font-display text-4xl font-extrabold tracking-tight">{site.name}</p>
          <p className="mt-4 max-w-sm leading-relaxed text-sand-50/75">{site.mission}</p>
          <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="label text-sand-50/70 hover:text-sand-50">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/newsletter" className="label text-sand-50/70 hover:text-sand-50">
                Edition
              </Link>
            </li>
            <li>
              <Link href="/rss.xml" className="label text-sand-50/70 hover:text-sand-50">
                RSS
              </Link>
            </li>
          </ul>
          <p className="mt-10 text-sm text-sand-50/50">
            {site.comingSoon.join(" · ")} · {site.email}
          </p>
        </div>
      </div>
    </footer>
  );
}
