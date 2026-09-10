"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const home = pathname === "/evanston" || pathname === "/";

  return (
    <header className={home ? "relative" : "sticky top-0 z-30 bg-sand-50/92 backdrop-blur-md"}>
      <div className="border-b border-ink/10">
        <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-5 py-3 md:px-8">
          <p className="label hidden sm:block">{site.edition}</p>
          <Link href="/evanston" className="flex items-baseline gap-3">
            <span className="font-display text-[1.35rem] font-normal tracking-tight text-ink md:text-[1.5rem]">
              {site.name}
            </span>
            <span className="label text-sea">{site.tagline}</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/newsletter" className="label hidden hover:text-ink md:inline">
              Newsletter
            </Link>
            <button
              type="button"
              className="label text-ink md:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label="Menu"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </div>
      <nav className="hidden border-b border-ink/10 md:block">
        <ul className="mx-auto flex max-w-page items-center gap-7 px-5 py-3 md:px-8">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`label transition-colors ${
                    active ? "text-ink" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="ml-auto">
            <Link href="/rss.xml" className="label text-ink-faint hover:text-ink">
              RSS
            </Link>
          </li>
        </ul>
      </nav>
      {open ? (
        <nav className="border-b border-ink/15 bg-sand-100 md:hidden">
          <ul className="px-5 py-4">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-ink/10 last:border-0">
                <Link
                  href={item.href}
                  className="block py-3 font-display text-2xl"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/newsletter" className="block py-3 font-display text-2xl" onClick={() => setOpen(false)}>
                Newsletter
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
