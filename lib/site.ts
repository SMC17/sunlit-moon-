export const site = {
  name: "Sunlit Moon",
  tagline: "Place OS",
  edition: "Evanston & North Shore",
  volume: "Vol. 0",
  issueDate: "2026-09-10",
  updatedLabel: "Updated today",
  description:
    "Know what’s changing in Evanston before it hits the gossip mill — hearings, storefronts, and the square.",
  mission:
    "Sunlit Moon is local intelligence for people who live here: the brief on buildings, businesses, and civic life before it becomes rumor.",
  headline: "Know what’s changing in Evanston before it hits the gossip mill.",
  subhead:
    "The weekly brief for people who actually live here — Plan Commission, Fountain Square, the independent mile. Not Patch. Not the group chat.",
  ctaPrimary: "Get the weekly brief",
  ctaSecondary: "See what’s moving",
  subscribeDek:
    "One email when the board moves. Tuesday night, before the alderman’s cousin texts you.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sunlitmoon.local",
  comingSoon: ["Long Island", "Palm Beach", "New York City"],
  email: "desk@sunlitmoon.local",
  proof: {
    hearings: 12,
    dispatches: 4,
    developments: 6,
    inReview: 2,
    indexed: 24,
    line: "12 hearings in the file · 6 developments on the board · updated today",
  },
} as const;

export const nav = [
  { href: "/stories", label: "Stories" },
  { href: "/developments", label: "Developments" },
  { href: "/places", label: "Places" },
  { href: "/businesses", label: "Businesses" },
  { href: "/people", label: "People" },
  { href: "/about", label: "About" },
] as const;

export const media = {
  hero: {
    src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=2000&q=80",
    alt: "A city meeting the water at dusk, lights along the shore",
    credit: "Unsplash / Luca Bravo",
  },
  downtown: {
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1400&q=80",
    alt: "Brick downtown street in late light",
    credit: "Unsplash",
  },
  construction: {
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
    alt: "Steel and timber of a building going up",
    credit: "Unsplash",
  },
  civic: {
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=80",
    alt: "Pale stone civic architecture",
    credit: "Unsplash",
  },
  lakefront: {
    src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1400&q=80",
    alt: "Open water under a pale sky",
    credit: "Unsplash",
  },
  storefront: {
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80",
    alt: "Independent storefront interior",
    credit: "Unsplash",
  },
} as const;
