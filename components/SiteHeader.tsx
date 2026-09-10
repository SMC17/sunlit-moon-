"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RequestLink } from "@/components/Subscribe";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/15 bg-sand-50">
      <div className="mx-auto flex max-w-page items-baseline justify-between gap-6 px-5 py-4 md:px-8">
        <Link href="/evanston" className="flex items-baseline gap-3">
          <span className="font-display text-[1.55rem] font-extrabold leading-none tracking-tight">
            {site.name}
          </span>
          <span className="label hidden sm:inline">{site.edition}</span>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex items-baseline gap-7">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`label ${active ? "text-ink" : "hover:text-ink"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <RequestLink className="label text-ink" />
            </li>
          </ul>
        </nav>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button type="button" className="label text-ink md:hidden" aria-label="Open menu">
              Index
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-sand-50" />
            <Dialog.Content
              data-lenis-prevent
              className="fixed inset-0 z-50 flex flex-col bg-sand-50 px-6 py-6"
            >
              <VisuallyHidden>
                <Dialog.Title>Index</Dialog.Title>
              </VisuallyHidden>
              <div className="flex items-baseline justify-between">
                <span className="font-display text-2xl">{site.name}</span>
                <Dialog.Close className="label">Close</Dialog.Close>
              </div>
              <ul className="mt-16 flex flex-col">
                {nav.map((item) => (
                  <li key={item.href} className="border-t border-ink/15">
                    <Link
                      href={item.href}
                      className="block py-4 font-display text-4xl tracking-tight"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="border-t border-b border-ink/15">
                  <RequestLink className="block py-4 font-display text-4xl tracking-tight" />
                </li>
              </ul>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
