"use client";

import { motion } from "motion/react";
import { easeOut } from "@/lib/motion";

export function NewsletterForm() {
  return (
    <form className="mt-16 max-w-lg border-y border-ink/15 py-12" action="/newsletter" method="get">
      <label htmlFor="email" className="label">
        Leave an address
      </label>
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end">
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@northshore.example"
          className="flex-1 border-b border-ink/25 bg-transparent px-0 py-3 font-body text-lg outline-none placeholder:text-ink-faint focus:border-ink"
        />
        <motion.button
          type="submit"
          className="label border border-ink bg-ink px-5 py-3 text-sand-50"
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: easeOut }}
        >
          Hold my place
        </motion.button>
      </div>
      <p className="mt-5 text-sm text-ink-faint">
        No backend yet — this stub does not store mail. It exists so the edition has a door.
      </p>
    </form>
  );
}
