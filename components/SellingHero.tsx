"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Photo } from "@/components/Photo";
import { SubscribeButton } from "@/components/Subscribe";
import type { PulseStat } from "@/components/Pulse";
import { fadeUp, stagger } from "@/lib/motion";
import { media, site } from "@/lib/site";

export function SellingHero({ stats }: { stats: PulseStat[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.04, 1.16]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-ink text-sand-50">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Photo
          src={media.hero.src}
          alt={media.hero.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-page flex-col justify-end px-5 pb-0 pt-28 md:px-8">
        <motion.div
          className="max-w-3xl pb-8 md:pb-10"
          variants={stagger}
          initial={reduce ? false : "hidden"}
          animate="show"
        >
          <motion.p variants={fadeUp} className="label text-sand-200">
            {site.kicker} · {site.updatedLabel}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-[2.75rem] leading-[0.88] tracking-[-0.04em] text-pretty md:text-6xl lg:text-[4.7rem]"
          >
            {site.headline}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl font-body text-lg leading-relaxed text-sand-100 md:text-xl"
          >
            {site.subhead}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <SubscribeButton variant="hero">{site.ctaPrimary}</SubscribeButton>
            <Link href="#moving" className="btn-outline-light">
              {site.ctaSecondary}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          id="moving"
          variants={stagger}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="grid border-t border-sand-50/20 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <Link
                href={stat.href}
                className="group block border-sand-50/15 px-0 py-5 transition-colors duration-300 hover:bg-sand-50/10 sm:px-4 lg:border-l lg:first:border-l-0"
              >
                <p className="font-display text-4xl leading-none tracking-[-0.04em] md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 font-display text-lg leading-tight tracking-tight">{stat.label}</p>
                <p className="mt-1 text-sm text-sand-200">{stat.hint}</p>
                <p className="label mt-3 text-sand-50 group-hover:text-sea-mist">Open →</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <p className="py-3 text-xs text-sand-200/70">{media.hero.credit} · Chicago lakefront</p>
      </div>
    </section>
  );
}
