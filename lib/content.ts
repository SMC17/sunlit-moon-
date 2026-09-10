import fs from "fs";
import path from "path";
import matter from "gray-matter";
import developments from "@/content/entities/developments.json";
import places from "@/content/entities/places.json";
import businesses from "@/content/entities/businesses.json";
import people from "@/content/entities/people.json";
import changesJson from "@/content/changes.json";
import {
  type DevelopmentStatus,
  type Entity,
  type EntityType,
  type MonthlyChange,
  type Story,
  type StoryMeta,
  DEVELOPMENT_STATUSES,
} from "@/lib/types";

const STORIES_DIR = path.join(process.cwd(), "content/stories");

const allEntities: Entity[] = [
  ...(developments as Entity[]),
  ...(places as Entity[]),
  ...(businesses as Entity[]),
  ...(people as Entity[]),
];

export function getEntities(): Entity[] {
  return allEntities;
}

export function getEntitiesByType(type: EntityType): Entity[] {
  return allEntities.filter((entity) => entity.type === type);
}

export function getEntity(slug: string): Entity | undefined {
  return allEntities.find((entity) => entity.slug === slug);
}

export function getRelatedEntities(entity: Entity): Entity[] {
  return entity.related
    .map((slug) => getEntity(slug))
    .filter((related): related is Entity => Boolean(related));
}

function readStories(): Story[] {
  const files = fs.readdirSync(STORIES_DIR).filter((file) => file.endsWith(".md"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(STORIES_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const meta = data as StoryMeta;
      return {
        ...meta,
        slug: file.replace(/\.md$/, ""),
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getStories(): Story[] {
  return readStories();
}

export function getStory(slug: string): Story | undefined {
  return readStories().find((story) => story.slug === slug);
}

export function getFeaturedStory(): Story | undefined {
  const stories = readStories();
  return stories.find((story) => story.featured) ?? stories[0];
}

export function getStoriesForEntity(slug: string): Story[] {
  return readStories().filter((story) => story.entities.includes(slug));
}

export function resolveStoryEntities(story: Story): Entity[] {
  return story.entities
    .map((slug) => getEntity(slug))
    .filter((entity): entity is Entity => Boolean(entity));
}

const TRACKER_ORDER: DevelopmentStatus[] = [
  "In review",
  "Under construction",
  "Approved",
  "Proposed",
  "Complete",
];

export function getDevelopments() {
  return getEntitiesByType("development").sort((a, b) => {
    const order =
      TRACKER_ORDER.indexOf(a.status ?? "Proposed") -
      TRACKER_ORDER.indexOf(b.status ?? "Proposed");
    return order || a.name.localeCompare(b.name);
  });
}

export function getChanges(): MonthlyChange[] {
  return [...(changesJson as MonthlyChange[])].sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );
}

export function getPulse() {
  const stories = getStories();
  const developmentsList = getEntitiesByType("development");
  const byStatus = Object.fromEntries(
    DEVELOPMENT_STATUSES.map((status) => [
      status,
      developmentsList.filter((item) => item.status === status).length,
    ]),
  ) as Record<(typeof DEVELOPMENT_STATUSES)[number], number>;

  return {
    stories: stories.length,
    developments: developmentsList.length,
    inReview: byStatus["In review"],
    entities: allEntities.length,
    places: getEntitiesByType("place").length,
    byStatus,
  };
}
