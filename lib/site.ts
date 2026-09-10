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
  kicker: "This week’s docket is already moving.",
  subhead:
    "Fountain Square is in review. One brief — Plan Commission, the independent mile, the lakefront — before Tuesday night and before the group chat.",
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
    line: "12 hearings covered · 6 developments on the board · updated today",
  },
  benefits: [
    {
      title: "Before the hearing, not after the rumor",
      body: "Status flips land in one brief — In review, Approved, Under construction.",
    },
    {
      title: "The board, not the feed",
      body: "Developments, storefronts, and the Tuesday night room, bound both ways.",
    },
    {
      title: "Evanston first, on purpose",
      body: "If we can’t hold Fountain Square, we can’t hold a city.",
    },
  ],
  sampleBrief: {
    eyebrow: "Sample · Tuesday edition",
    subject: "Fountain Square in review — and three other moves",
    items: [
      "Fountain Square redevelopment → In review",
      "Maple Avenue Residences → Approved",
      "Lakefront Pavilion → Complete",
    ],
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
    src: "https://images.unsplash.com/photo-1490376653299-e25ec8c1d02c?auto=format&fit=crop&w=2200&q=80",
    alt: "Lake Michigan in the foreground, the Hancock rising through weather — Chicago lakefront looking south",
    credit: "Unsplash",
  },
  skyline: {
    src: "https://images.unsplash.com/photo-1563718944-758794a56b34?auto=format&fit=crop&w=1800&q=80",
    alt: "The Chicago skyline across open water on Lake Michigan",
    credit: "Unsplash",
  },
  aerial: {
    src: "https://images.unsplash.com/photo-1563333576-c5c1ccec85fd?auto=format&fit=crop&w=2000&q=80",
    alt: "Lake Shore Drive and the beaches at dusk, the lake holding the whole east side",
    credit: "Unsplash",
  },
  lakefront: {
    src: "https://images.unsplash.com/photo-1602173129480-f622447553a1?auto=format&fit=crop&w=1600&q=80",
    alt: "A North Shore beach under a hard blue sky, lighthouse on the breakwater",
    credit: "Unsplash",
  },
  lighthouse: {
    src: "https://images.unsplash.com/photo-1756799155420-afde4216bda2?auto=format&fit=crop&w=1600&q=80",
    alt: "Chicago Harbor Lighthouse on Lake Michigan — the cousin of Grosse Point",
    credit: "Unsplash / Yvette Garcia",
  },
  path: {
    src: "https://images.unsplash.com/photo-1671858537358-877126245a10?auto=format&fit=crop&w=1600&q=80",
    alt: "Walkers and bikes on the lakefront path, water on the right, the city ahead",
    credit: "Unsplash",
  },
  beach: {
    src: "https://images.unsplash.com/photo-1535688229403-482880338465?auto=format&fit=crop&w=1600&q=80",
    alt: "A packed Great Lakes beach under trees — Clark Street weather",
    credit: "Unsplash",
  },
  downtown: {
    src: "https://images.unsplash.com/photo-1474948131043-ba2e3e79cfb9?auto=format&fit=crop&w=1600&q=80",
    alt: "The Chicago lakefront from above: beaches, the drive, the grid meeting the water",
    credit: "Unsplash",
  },
  construction: {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80",
    alt: "Rebar and orange on a mid-rise going up",
    credit: "Unsplash",
  },
  civic: {
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=80",
    alt: "Pale stone civic architecture — the kind of room a hearing happens in",
    credit: "Unsplash",
  },
  storefront: {
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80",
    alt: "Independent storefront interior",
    credit: "Unsplash",
  },
  bookstore: {
    src: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1400&q=80",
    alt: "Warm light in an independent bookstore aisle",
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
  "lakefront-pavilion-restoration": media.lighthouse,
  "main-street-lofts": media.storefront,
};
