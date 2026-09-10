"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

export function RequestLink({
  className = "",
  children = site.ctaPrimary,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Link href="#edition" className={`link-quiet ${className}`}>
      {children}
    </Link>
  );
}

export function EditionForm({
  id = "edition",
  note,
  tone = "light",
}: {
  id?: string;
  note?: string;
  tone?: "light" | "dark";
}) {
  const [done, setDone] = useState(false);
  const dark = tone === "dark";

  return (
    <section id={id} className="scroll-mt-24">
      <p className={`label ${dark ? "text-sand-50/70" : ""}`}>The edition</p>
      <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
        {site.ctaPrimary}
      </h2>
      <p className={`mt-3 max-w-md ${dark ? "text-sand-50/75" : "text-ink-muted"}`}>
        {note ?? site.subscribeDek}
      </p>
      {done ? (
        <p className="mt-8 font-display text-2xl font-bold tracking-tight">Received. We’ll write.</p>
      ) : (
        <form
          className="mt-8 max-w-md"
          onSubmit={(event) => {
            event.preventDefault();
            setDone(true);
          }}
        >
          <label htmlFor={`${id}-email`} className={`label ${dark ? "text-sand-50/70" : ""}`}>
            Post
          </label>
          <div
            className={`mt-3 flex items-end gap-4 border-b pb-2 ${
              dark ? "border-sand-50/50" : "border-ink"
            }`}
          >
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              required
              placeholder="name@domain"
              className={`flex-1 bg-transparent py-2 text-lg outline-none ${
                dark
                  ? "text-sand-50 placeholder:text-sand-50/40"
                  : "placeholder:text-ink-faint"
              }`}
            />
            <button type="submit" className={`btn-ink shrink-0 ${dark ? "border-sand-50 text-sand-50" : ""}`}>
              Send
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
