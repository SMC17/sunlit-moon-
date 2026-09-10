"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Photo } from "@/components/Photo";
import type { Story } from "@/lib/types";
import { formatIssueDate } from "@/lib/format";

export function StoryHero({ story }: { story: Story }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "16%"]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.02, 1.12]);

  return (
    <header ref={ref} className="relative min-h-[92svh] overflow-hidden bg-ink text-sand-50">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Photo
          src={story.hero.src}
          alt={story.hero.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/15" />
      <div className="relative mx-auto flex min-h-[92svh] max-w-page flex-col justify-end px-5 pb-12 pt-28 md:px-8 md:pb-16">
        <p className="label text-sand-200">
          {story.kicker} · {formatIssueDate(story.date)}
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.9] tracking-[-0.04em] text-pretty md:text-7xl">
          {story.title}
        </h1>
        <p className="mt-5 max-w-2xl font-body text-xl leading-relaxed text-sand-100">
          {story.dek}
        </p>
        <p className="mt-4 text-sm text-sand-200">{story.author}</p>
        <p className="mt-6 text-xs text-sand-200/70">{story.hero.credit}</p>
      </div>
    </header>
  );
}
