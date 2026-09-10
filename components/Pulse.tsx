"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Photo } from "@/components/Photo";
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
        className="grid sm:grid-cols-2 lg:grid-cols-4"
        variants={stagger}
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-8%" }}
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={fadeUp}>
            <Link href={stat.href} className="group relative block min-h-[22rem] overflow-hidden bg-ink md:min-h-[26rem]">
              <Photo
                src={stat.image}
                alt={stat.alt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/15" />
              <div className="relative flex min-h-[22rem] flex-col justify-end p-5 text-sand-50 md:min-h-[26rem] md:p-6">
                <p className="font-display text-6xl leading-none tracking-[-0.05em] md:text-7xl">
                  {stat.value}
                </p>
                <p className="mt-3 font-display text-2xl leading-tight tracking-tight">{stat.label}</p>
                <p className="mt-2 text-sm text-sand-200">{stat.hint}</p>
                <p className="label mt-5 text-sand-50 transition-colors duration-300 group-hover:text-sea-mist">
                  Open the file →
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
