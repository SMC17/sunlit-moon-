# Sunlit Moon

An edition of Evanston & the North Shore — Volume 0.

Art-directed as a city-pop sleeve: original geometric illustration in the vocabulary of Hiroshi Nagai — printed sky bands, cream modernism, pool aqua, long cobalt shadows — translated to the lakefront.

## Craft

- **Syne** (display) · **Zen Kaku Gothic New** (text)
- Custom SVG illustration (`NagaiArt`) — one world, cropped: airbrushed sky, 3/4 villa with rails and glass, perspective pool with coping and chrome ladder, fronded palms, long afternoon shadows. Original, not scans.
- **Motion** — 320ms parallax on the cover, no bounce
- **Radix** — index menu, development filters
- **Lenis** — quiet scroll
- **Embla** — story rail

Request the edition as a hairline form in the night footer. No drawer, no sticky bar, no film grain, no Unsplash hero.

## Product

Next.js App Router, TypeScript, Tailwind. Content lives in-repo:

- Markdown stories in `content/stories/`
- JSON entities in `content/entities/` (`developments`, `places`, `businesses`, `people`)
- Monthly change log in `content/changes.json`

### Routes

| Path | What |
| --- | --- |
| `/` | Redirects to `/evanston` |
| `/evanston` | Edition homepage |
| `/stories`, `/stories/[slug]` | Dispatches |
| `/developments`, `/developments/[slug]` | Development ledger + files |
| `/places`, `/places/[slug]` | Civic rooms |
| `/businesses`, `/businesses/[slug]` | Storefronts and leagues |
| `/people`, `/people/[slug]` | Commissioners, staff, portraits |
| `/about` | Colophon |
| `/newsletter` | Request the edition (form in footer) |
| `/rss.xml` | RSS of stories |
| `/sitemap.xml` | Sitemap |

Stories and entities link both ways.

## Demo content

**All sample stories and several people/business portraits are demo material** for Volume 0. They are not reported news.

Highlighted file in the ledger:

- [Fountain Square redevelopment](content/entities/developments.json) — status **In review**, linked to Plan Commission, Downtown Evanston, Fountain Square, and the architect portrait.

## Develop

```bash
npm install
npm run dev
```

```bash
npm run build
```

Set `NEXT_PUBLIC_SITE_URL` for canonical links in RSS and the sitemap (defaults to `https://sunlitmoon.local`).

## Out of scope (v0)

Auth, maps product, scrapers, multi-edition switcher, ecommerce, backend newsletter.
