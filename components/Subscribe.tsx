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
import { Photo } from "@/components/Photo";
import { easeOut } from "@/lib/motion";
import { media, site } from "@/lib/site";

type SubscribeIntent = { project?: string } | null;

type SubscribeApi = {
  open: (intent?: SubscribeIntent) => void;
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
  const [intent, setIntent] = useState<SubscribeIntent>(null);
  const lenis = useLenis();
  const openDrawer = useCallback((next?: SubscribeIntent) => {
    setIntent(next ?? null);
    setOpen(true);
  }, []);
  const closeDrawer = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  return (
    <SubscribeContext.Provider value={{ open: openDrawer, close: closeDrawer }}>
      {children}
      <SubscribeDrawer open={open} onOpenChange={setOpen} intent={intent} />
      <StickySubscribe />
    </SubscribeContext.Provider>
  );
}

export function SubscribeButton({
  children,
  variant = "ink",
  className = "",
  intent,
}: {
  children: ReactNode;
  variant?: "ink" | "ghost" | "light" | "hero";
  className?: string;
  intent?: SubscribeIntent;
}) {
  const { open } = useSubscribe();
  const styles =
    variant === "ghost"
      ? "btn-ghost"
      : variant === "light"
        ? "btn-light"
        : variant === "hero"
          ? "btn-hero"
          : "btn-ink";

  return (
    <motion.button
      type="button"
      onClick={() => open(intent)}
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
  intent,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  intent: SubscribeIntent;
}) {
  const [step, setStep] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    if (open) setStep(0);
  }, [open]);

  const title = intent?.project
    ? `Follow ${intent.project}`
    : site.ctaPrimary;

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[70] bg-ink/55" />
        <Drawer.Content
          data-lenis-prevent
          className="fixed bottom-0 left-0 right-0 z-[70] mx-auto max-h-[92vh] max-w-xl overflow-y-auto rounded-t-md bg-sand-50 outline-none"
        >
          <div className="relative h-36 overflow-hidden bg-ink">
            <Photo
              src={media.lakefront.src}
              alt=""
              className="h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sand-50 via-transparent to-ink/20" />
          </div>
          <div className="px-6 pb-10 pt-2 md:px-8">
            <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-ink/20" />
            {step === 0 ? (
              <div>
                <Drawer.Title className="font-display text-3xl tracking-tight md:text-4xl">
                  {title}
                </Drawer.Title>
                <Drawer.Description className="mt-3 font-body text-lg leading-relaxed text-ink-muted">
                  {intent?.project
                    ? `We’ll flag this file in the brief when the status moves. Same Tuesday night email as the rest of the board.`
                    : site.subscribeDek}
                </Drawer.Description>
                <ul className="mt-6 space-y-3">
                  {site.benefits.map((item) => (
                    <li key={item.title} className="border-t border-ink/10 pt-3">
                      <p className="font-display text-xl tracking-tight">{item.title}</p>
                      <p className="mt-1 text-sm text-ink-muted">{item.body}</p>
                    </li>
                  ))}
                </ul>
                <aside className="mt-6 border border-ink/15 bg-sand-100 px-4 py-4">
                  <p className="label">{site.sampleBrief.eyebrow}</p>
                  <p className="mt-2 font-display text-2xl tracking-tight">
                    {site.sampleBrief.subject}
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-ink-muted">
                    {site.sampleBrief.items.map((item) => (
                      <li key={item}>· {item}</li>
                    ))}
                  </ul>
                </aside>
                <p className="mt-4 text-sm text-ink-faint">{site.proof.line}</p>
                <motion.button
                  type="button"
                  className="btn-ink mt-6 w-full justify-center"
                  onClick={() => setStep(1)}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue
                </motion.button>
              </div>
            ) : null}
            {step === 1 ? (
              <div>
                <Drawer.Title className="font-display text-3xl tracking-tight">
                  Where should it land?
                </Drawer.Title>
                <Drawer.Description className="mt-3 font-body text-lg text-ink-muted">
                  No feed. No spam. One brief when the board moves.
                </Drawer.Description>
                <SubscribeFields
                  idPrefix="drawer"
                  onDone={() => setStep(2)}
                />
                <button
                  type="button"
                  className="label mt-6 text-ink-muted"
                  onClick={() => setStep(0)}
                >
                  ← Benefits
                </button>
              </div>
            ) : null}
            {step === 2 ? (
              <div>
                <Drawer.Title className="font-display text-3xl tracking-tight">
                  You’re on the list.
                </Drawer.Title>
                <Drawer.Description className="mt-3 font-body text-lg text-ink-muted">
                  Tuesday night, before the gossip mill. We’ll be in touch.
                </Drawer.Description>
                <p className="mt-6 text-sm text-ink-faint">{site.proof.line}</p>
              </div>
            ) : null}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export function SubscribeFields({
  idPrefix,
  compact = false,
  tone = "light",
  onDone,
}: {
  idPrefix: string;
  compact?: boolean;
  tone?: "light" | "dark";
  onDone?: () => void;
}) {
  const [done, setDone] = useState(false);
  const dark = tone === "dark";

  if (done && !onDone) {
    return (
      <p className={`mt-6 font-display text-2xl tracking-tight ${dark ? "text-sand-50" : ""}`}>
        You’re on the list. We’ll be in touch.
      </p>
    );
  }

  return (
    <form
      className={compact ? "mt-4" : "mt-8"}
      onSubmit={(event) => {
        event.preventDefault();
        setDone(true);
        onDone?.();
      }}
    >
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
        {site.proof.line}
      </p>
    </form>
  );
}

export function NewsletterBand({
  eyebrow = "The weekly brief",
  title = "Don’t wait for the gossip mill.",
  tone = "ink",
}: {
  eyebrow?: string;
  title?: string;
  tone?: "ink" | "sea";
}) {
  const image = tone === "sea" ? media.aerial : media.hero;
  return (
    <section className={`relative overflow-hidden text-sand-50 ${tone === "sea" ? "bg-sea" : "bg-ink"}`}>
      <Photo
        src={image.src}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.32]"
      />
      <div
        className={`absolute inset-0 ${
          tone === "sea"
            ? "bg-gradient-to-r from-sea via-sea/80 to-ink/50"
            : "bg-gradient-to-r from-ink via-ink/80 to-ink/40"
        }`}
      />
      <div className="relative mx-auto grid max-w-page gap-8 px-5 py-16 md:grid-cols-[1.15fr_1fr] md:items-end md:px-8 md:py-20">
        <div>
          <p className="label text-sand-200">{eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl leading-[0.95] tracking-tight md:text-6xl">
            {title}
          </h2>
          <p className="mt-4 max-w-md font-body text-lg text-sand-200">{site.subscribeDek}</p>
        </div>
        <SubscribeFields idPrefix={`band-${tone}`} compact tone="dark" />
      </div>
    </section>
  );
}

function StickySubscribe() {
  const pathname = usePathname();
  const [showDesktop, setShowDesktop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowDesktop(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/newsletter") return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-ink text-sand-50 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 ease-out md:border-sand-50/10 ${
        showDesktop ? "md:translate-y-0" : "md:translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-page items-center justify-between gap-4">
        <p className="hidden font-display text-xl tracking-tight md:block">
          The brief, before Tuesday night.
        </p>
        <SubscribeButton variant="hero" className="w-full justify-center md:w-auto">
          {site.ctaPrimary}
        </SubscribeButton>
      </div>
    </div>
  );
}
