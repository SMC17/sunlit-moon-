export const site = {
  name: "Sunlit Moon",
  tagline: "An edition",
  edition: "Evanston & North Shore",
  volume: "Vol. 0",
  issueDate: "2026-09-10",
  description:
    "An edition of Evanston: the square, the mile, and the Tuesday night room.",
  mission:
    "Sunlit Moon is an edition of a place. Volume 0 is Evanston. The work is to notice what is changing, and to write it down.",
  headline: "The square is in review.",
  subhead:
    "Fountain Square sits before Plan Commission. This edition follows the file, the independent mile, and the room that will decide it.",
  ctaPrimary: "Request the edition",
  ctaSecondary: "The ledger",
  subscribeDek: "Sent when the docket moves. Nothing else.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sunlitmoon.local",
  comingSoon: ["Long Island", "Palm Beach", "New York City"],
  email: "desk@sunlitmoon.local",
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
    src: "https://images.unsplash.com/photo-1756799155420-afde4216bda2?auto=format&fit=crop&w=1600&q=80",
    alt: "A white lighthouse on Lake Michigan",
    credit: "Unsplash / Yvette Garcia",
  },
  lakefront: {
    src: "https://images.unsplash.com/photo-1602173129480-f622447553a1?auto=format&fit=crop&w=1600&q=80",
    alt: "A North Shore beach, lighthouse on the breakwater",
    credit: "Unsplash",
  },
  path: {
    src: "https://images.unsplash.com/photo-1671858537358-877126245a10?auto=format&fit=crop&w=1600&q=80",
    alt: "The lakefront path, water to the east",
    credit: "Unsplash",
  },
  beach: {
    src: "https://images.unsplash.com/photo-1535688229403-482880338465?auto=format&fit=crop&w=1600&q=80",
    alt: "A Great Lakes beach under trees",
    credit: "Unsplash",
  },
  downtown: {
    src: "https://images.unsplash.com/photo-1474948131043-ba2e3e79cfb9?auto=format&fit=crop&w=1600&q=80",
    alt: "The Chicago lakefront from above",
    credit: "Unsplash",
  },
  construction: {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80",
    alt: "Rebar on a building in progress",
    credit: "Unsplash",
  },
  civic: {
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=80",
    alt: "Pale civic stone and glass",
    credit: "Unsplash",
  },
  storefront: {
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80",
    alt: "An independent shop interior",
    credit: "Unsplash",
  },
  bookstore: {
    src: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1400&q=80",
    alt: "A bookstore aisle",
    credit: "Unsplash",
  },
} as const;

export const mediaByType = {
  development: media.construction,
  place: media.lakefront,
  business: media.storefront,
  person: media.civic,
} as const;

export const developmentMedia: Record<string, { src: string; alt: string }> = {
  "fountain-square-redevelopment": media.civic,
  "1714-chicago-avenue": media.construction,
  "church-street-plaza": media.path,
  "maple-avenue-residences": media.construction,
  "lakefront-pavilion-restoration": media.hero,
  "main-street-lofts": media.storefront,
};
