export const DEVELOPMENT_STATUSES = [
  "Proposed",
  "In review",
  "Approved",
  "Under construction",
  "Complete",
] as const;

export type DevelopmentStatus = (typeof DEVELOPMENT_STATUSES)[number];

export type EntityType = "development" | "place" | "business" | "person";

export type Entity = {
  slug: string;
  type: EntityType;
  name: string;
  dek: string;
  summary: string;
  neighborhood?: string;
  related: string[];
  status?: DevelopmentStatus;
  address?: string;
  program?: string;
  category?: string;
  role?: string;
  since?: string;
};

export type StoryMeta = {
  slug: string;
  title: string;
  dek: string;
  kicker: string;
  date: string;
  author: string;
  featured?: boolean;
  tags: string[];
  entities: string[];
  hero: {
    src: string;
    alt: string;
    credit: string;
  };
};

export type Story = StoryMeta & {
  content: string;
};

export type MonthlyChange = {
  date: string;
  title: string;
  body: string;
  href?: string;
};

export const entityPath: Record<EntityType, string> = {
  development: "/developments",
  place: "/places",
  business: "/businesses",
  person: "/people",
};
