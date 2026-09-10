import { getStories } from "@/lib/content";
import { site } from "@/lib/site";

export async function GET() {
  const stories = getStories();
  const items = stories
    .map((story) => {
      const url = `${site.url}/stories/${story.slug}`;
      return `
    <item>
      <title><![CDATA[${story.title}]]></title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(`${story.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description><![CDATA[${story.dek}]]></description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${site.name} — ${site.edition}</title>
    <link>${site.url}</link>
    <description>${site.description}</description>
    <language>en-us</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
