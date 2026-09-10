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
}: {
  id?: string;
  note?: string;
}) {
  const [done, setDone] = useState(false);

  return (
    <section id={id} className="scroll-mt-24">
      <p className="label">The edition</p>
      <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
        {site.ctaPrimary}
      </h2>
      <p className="mt-3 max-w-md font-body text-ink-muted">
        {note ?? site.subscribeDek}
      </p>
      {done ? (
        <p className="mt-8 font-display text-2xl tracking-tight">Received. We’ll write.</p>
      ) : (
        <form
          className="mt-8 max-w-md"
          onSubmit={(event) => {
            event.preventDefault();
            setDone(true);
          }}
        >
          <label htmlFor={`${id}-email`} className="label">
            Post
          </label>
          <div className="mt-3 flex items-end gap-4 border-b border-ink pb-2">
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              required
              placeholder="name@domain"
              className="flex-1 bg-transparent py-2 font-body text-lg outline-none placeholder:text-ink-faint"
            />
            <button type="submit" className="btn-ink shrink-0">
              Send
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

