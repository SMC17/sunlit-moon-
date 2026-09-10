"use client";

import { motion, useReducedMotion } from "motion/react";
import { fadeUp, stagger } from "@/lib/motion";

type PulseStat = { value: number; label: string };

export function Pulse({ stats }: { stats: PulseStat[] }) {
  const reduce = useReducedMotion();

  return (
    <section aria-label="Edition pulse">
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4"
        variants={stagger}
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-8%" }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            className={`px-3 py-10 text-center md:px-4 md:py-12 ${
              index < stats.length - 1 ? "md:border-r md:border-ink/10" : ""
            } ${index % 2 === 0 ? "border-r border-ink/10" : ""} ${
              index < 2 ? "border-b border-ink/10 md:border-b-0" : ""
            }`}
          >
            <p className="font-display text-[3.4rem] leading-none tracking-[-0.04em] md:text-[4.6rem]">
              {stat.value}
            </p>
            <p className="label mx-auto mt-4 max-w-[10.5rem]">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
