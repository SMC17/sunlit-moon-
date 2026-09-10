export const site = {
  name: "Sunlit Moon",
  tagline: "Place OS",
  edition: "Evanston & North Shore",
  volume: "Vol. 0",
  issueDate: "2026-09-10",
  description:
    "A civic operating system for Evanston and the North Shore — stories, buildings, and the people who tend them.",
  mission:
    "Sunlit Moon is a place operating system: a public ledger of stories, buildings, and civic life for the towns we love.",
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
