import type { MetadataRoute } from "next";
import { getEntities, getStories } from "@/lib/content";
import { entityPath } from "@/lib/types";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/evanston",
    "/stories",
    "/developments",
    "/places",
    "/businesses",
    "/people",
    "/about",
    "/newsletter",
  ].map((path) => ({
    url: `${site.url}${path || "/"}`,
    lastModified: site.issueDate,
  }));

  const stories = getStories().map((story) => ({
    url: `${site.url}/stories/${story.slug}`,
    lastModified: story.date,
  }));

  const entities = getEntities().map((entity) => ({
    url: `${site.url}${entityPath[entity.type]}/${entity.slug}`,
    lastModified: site.issueDate,
  }));

  return [...staticRoutes, ...stories, ...entities];
}
