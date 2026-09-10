"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { SubscribeButton } from "@/components/Subscribe";
import { fadeUp, stagger } from "@/lib/motion";
import { media, site } from "@/lib/site";

export function SellingHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-ink text-sand-50">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={media.hero.src}
        alt={media.hero.alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-page flex-col justify-end px-5 pb-10 pt-24 md:px-8 md:pb-14">
        <motion.div
          className="max-w-3xl"
          variants={stagger}
          initial={reduce ? false : "hidden"}
          animate="show"
        >
          <motion.p variants={fadeUp} className="label text-sand-200">
            {site.edition} · {site.updatedLabel} · {site.volume}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-[2.6rem] leading-[0.92] tracking-[-0.035em] text-pretty md:text-6xl lg:text-[4.4rem]"
          >
            {site.headline}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl font-body text-lg leading-relaxed text-sand-100 md:text-xl"
          >
            {site.subhead}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <SubscribeButton variant="light">{site.ctaPrimary}</SubscribeButton>
            <Link href="#moving" className="btn-outline-light">
              {site.ctaSecondary}
            </Link>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-8 text-sm text-sand-200">
            {site.proof.line}
          </motion.p>
        </motion.div>
        <p className="relative mt-8 text-xs text-sand-200/80">{media.hero.credit}</p>
      </div>
    </section>
  );
}
