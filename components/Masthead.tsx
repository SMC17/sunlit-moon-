"use client";

import { motion, useReducedMotion } from "motion/react";
import { formatIssueDate } from "@/lib/format";
import { fadeUp, stagger } from "@/lib/motion";
import { site } from "@/lib/site";

export function Masthead({ date }: { date: string }) {
  const reduce = useReducedMotion();

  return (
    <section className="masthead-wash border-b border-ink/[0.08]">
      <div className="mx-auto max-w-page px-5 pb-12 pt-10 md:px-8 md:pb-16 md:pt-14">
        <div className="flex items-center justify-between gap-4">
          <p className="label">{site.volume}</p>
          <p className="label hidden sm:block">{site.edition}</p>
          <p className="label">{formatIssueDate(date)}</p>
        </div>
        <div className="rule-double mt-6" />
        <motion.div
          className="py-12 text-center md:py-16"
          variants={stagger}
          initial={reduce ? false : "hidden"}
          animate="show"
        >
          <motion.p variants={fadeUp} className="label mb-6">
            {site.tagline}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="wordmark text-[19vw] text-ink sm:text-[13vw] md:text-[7.8rem] lg:text-[9.4rem]"
          >
            Sunlit <em className="not-italic md:italic">Moon</em>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-lg font-body text-xl leading-relaxed text-ink-muted md:text-[1.35rem]"
          >
            {site.edition}. A public ledger of stories, buildings, and civic life.
          </motion.p>
        </motion.div>
        <div className="rule-double" />
      </div>
    </section>
  );
}
