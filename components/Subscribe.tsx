"use client";

import { Drawer } from "vaul";
import { motion } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { easeOut } from "@/lib/motion";
import { media, site } from "@/lib/site";

type SubscribeApi = {
  open: () => void;
  close: () => void;
};

const SubscribeContext = createContext<SubscribeApi | null>(null);

export function useSubscribe() {
  const ctx = useContext(SubscribeContext);
  if (!ctx) throw new Error("useSubscribe must be used within SubscribeProvider");
  return ctx;
}

export function SubscribeProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const openDrawer = useCallback(() => setOpen(true), []);
  const closeDrawer = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  return (
    <SubscribeContext.Provider value={{ open: openDrawer, close: closeDrawer }}>
      {children}
      <SubscribeDrawer open={open} onOpenChange={setOpen} />
      <StickySubscribe />
    </SubscribeContext.Provider>
  );
}

export function SubscribeButton({
  children,
  variant = "ink",
  className = "",
}: {
  children: ReactNode;
  variant?: "ink" | "ghost" | "light";
  className?: string;
}) {
  const { open } = useSubscribe();
  const styles = variant === "ghost" ? "btn-ghost" : variant === "light" ? "btn-light" : "btn-ink";

  return (
    <motion.button
      type="button"
      onClick={open}
      className={`${styles} ${className}`}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: easeOut }}
    >
      {children}
    </motion.button>
  );
}

function SubscribeDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[70] bg-ink/45" />
        <Drawer.Content
          data-lenis-prevent
          className="fixed bottom-0 left-0 right-0 z-[70] mx-auto max-w-lg rounded-t-md bg-sand-50 px-6 pb-10 pt-4 outline-none md:px-8"
        >
          <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-ink/20" />
          <Drawer.Title className="font-display text-3xl tracking-tight md:text-4xl">
            {site.ctaPrimary}
          </Drawer.Title>
          <Drawer.Description className="mt-3 font-body text-lg leading-relaxed text-ink-muted">
            {site.subscribeDek}
          </Drawer.Description>
          <SubscribeFields idPrefix="drawer" />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export function SubscribeFields({
  idPrefix,
  compact = false,
  tone = "light",
}: {
  idPrefix: string;
  compact?: boolean;
  tone?: "light" | "dark";
}) {
  const [done, setDone] = useState(false);
  const dark = tone === "dark";

  return (
    <form
      className={compact ? "mt-4" : "mt-8"}
      onSubmit={(event) => {
        event.preventDefault();
        setDone(true);
      }}
    >
      {done ? (
        <p className={`font-display text-2xl tracking-tight ${dark ? "text-sand-50" : ""}`}>
          You’re on the list. We’ll be in touch.
        </p>
      ) : (
        <>
          <label htmlFor={`${idPrefix}-email`} className={`label ${dark ? "text-sand-200" : ""}`}>
            Email
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end">
            <input
              id={`${idPrefix}-email`}
              name="email"
              type="email"
              required
              placeholder="you@northshore.example"
              className={`flex-1 border-b bg-transparent px-0 py-3 font-body text-lg outline-none ${
                dark
                  ? "border-sand-50/40 text-sand-50 placeholder:text-sand-200/70 focus:border-sand-50"
                  : "border-ink/30 placeholder:text-ink-faint focus:border-ink"
              }`}
            />
            <motion.button
              type="submit"
              className={dark ? "btn-light" : "btn-ink"}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: easeOut }}
            >
              Subscribe
            </motion.button>
          </div>
          <p className={`mt-3 text-sm ${dark ? "text-sand-200/80" : "text-ink-faint"}`}>
            No feed. No spam. One brief when the board moves.
          </p>
        </>
      )}
    </form>
  );
}

export function NewsletterBand({
  eyebrow = "The weekly brief",
  title = "Don’t wait for the gossip mill.",
}: {
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-sand-50">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={media.hero.src}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.28]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/40" />
      <div className="relative mx-auto grid max-w-page gap-8 px-5 py-14 md:grid-cols-[1.15fr_1fr] md:items-end md:px-8 md:py-16">
        <div>
          <p className="label text-sand-200">{eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl leading-[0.95] tracking-tight md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-md font-body text-lg text-sand-200">{site.subscribeDek}</p>
        </div>
        <SubscribeFields idPrefix="band" compact tone="dark" />
      </div>
    </section>
  );
}

function StickySubscribe() {
  const pathname = usePathname();
  if (pathname === "/newsletter") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-sand-50 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <SubscribeButton className="w-full justify-center">{site.ctaPrimary}</SubscribeButton>
    </div>
  );
}
