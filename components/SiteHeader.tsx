"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useLenis } from "lenis/react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { fadeUp, stagger } from "@/lib/motion";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const home = pathname === "/evanston" || pathname === "/";
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
    <header className={home ? "relative z-30" : "sticky top-0 z-30 bg-sand-50"}>
      <div className="border-b border-ink/[0.08]">
        <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-5 py-3.5 md:px-8">
          <p className="label hidden sm:block">{site.edition}</p>
          <Link href="/evanston" className="flex items-baseline gap-3">
            <span className="font-display text-[1.45rem] leading-none tracking-tight text-ink md:text-[1.65rem]">
              {site.name}
            </span>
            <span className="label">{site.tagline}</span>
          </Link>
          <div className="flex items-center gap-5">
            <Link href="/newsletter" className="label hidden hover:text-ink md:inline">
              Newsletter
            </Link>
            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger asChild>
                <button type="button" className="label text-ink md:hidden" aria-label="Open menu">
                  Menu
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-sand-50" />
                <Dialog.Content
                  data-lenis-prevent
                  className="fixed inset-0 z-50 flex flex-col bg-sand-50 px-6 py-6"
                >
                  <VisuallyHidden>
                    <Dialog.Title>Menu</Dialog.Title>
                  </VisuallyHidden>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl">{site.name}</span>
                    <Dialog.Close className="label text-ink">Close</Dialog.Close>
                  </div>
                  <motion.ul
                    className="mt-16 flex flex-col"
                    variants={stagger}
                    initial="hidden"
                    animate="show"
                  >
                    {nav.map((item) => (
                      <motion.li key={item.href} variants={fadeUp} className="border-b border-ink/10">
                        <Link
                          href={item.href}
                          className="block py-4 font-display text-4xl tracking-tight"
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    ))}
                    <motion.li variants={fadeUp} className="border-b border-ink/10">
                      <Link
                        href="/newsletter"
                        className="block py-4 font-display text-4xl tracking-tight"
                        onClick={() => setOpen(false)}
                      >
                        Newsletter
                      </Link>
                    </motion.li>
                  </motion.ul>
                  <p className="label mt-auto">{site.edition}</p>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </div>
      <nav className="hidden border-b border-ink/[0.08] md:block">
        <ul className="mx-auto flex max-w-page items-center gap-8 px-5 py-3 md:px-8">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`label relative pb-1 transition-colors duration-300 ease-out ${
                    active ? "text-ink after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-ink" : "hover:text-ink"
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
    </header>
  );
}
