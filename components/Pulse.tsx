"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { fadeUp, stagger } from "@/lib/motion";

export type PulseStat = {
  value: number;
  label: string;
  hint: string;
  href: string;
  image: string;
  alt: string;
};

export function Pulse({ stats }: { stats: PulseStat[] }) {
  const reduce = useReducedMotion();

  return (
    <section aria-label="What’s moving" id="moving">
      <motion.div
        className="grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-4"
        variants={stagger}
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-8%" }}
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={fadeUp} className="bg-sand-50">
            <Link href={stat.href} className="group block h-full">
              <div className="relative aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={stat.image}
                  alt={stat.alt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>
              <div className="px-4 py-5 md:px-5 md:py-6">
                <p className="font-display text-5xl leading-none tracking-[-0.04em] md:text-6xl">
                  {stat.value}
                </p>
                <p className="mt-3 font-display text-xl tracking-tight">{stat.label}</p>
                <p className="mt-1 text-sm text-ink-muted">{stat.hint}</p>
                <p className="label mt-4 text-ink group-hover:text-sea">Open →</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
