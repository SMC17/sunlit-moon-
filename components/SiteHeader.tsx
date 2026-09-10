"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useLenis } from "lenis/react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SubscribeButton } from "@/components/Subscribe";
import { fadeUp, stagger } from "@/lib/motion";
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
    <header className="sticky top-0 z-30 border-b border-ink/[0.08] bg-sand-50">
      <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Link href="/evanston" className="flex items-baseline gap-2.5">
          <span className="font-display text-[1.45rem] leading-none tracking-tight md:text-[1.65rem]">
            {site.name}
          </span>
          <span className="label hidden sm:inline">{site.edition}</span>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6">
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
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <SubscribeButton className="hidden sm:inline-flex">{site.ctaPrimary}</SubscribeButton>
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
                  <Dialog.Close className="label">Close</Dialog.Close>
                </div>
                <motion.ul
                  className="mt-12 flex flex-col"
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
                </motion.ul>
                <div className="mt-8">
                  <SubscribeButton className="w-full justify-center">{site.ctaPrimary}</SubscribeButton>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
