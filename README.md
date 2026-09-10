# Sunlit Moon

**Place OS** for Evanston & the North Shore — Volume 0.

A civic publication with conversion energy: cinematic Chicago-lakefront photography, a selling hero with live pulse, and a weekly brief you’d actually subscribe to. Never NYC skyline. Never Patch ads.

## Craft

Editorial stack on top of Next.js + Tailwind:

- **Instrument Serif** + **Newsreader** + **Geist Sans**
- **Motion** — page transitions, staggered reveals, CTA press
- **Radix UI** — accessible mobile menu (Dialog) and development status tabs
- **Lenis** — smooth scroll on the edition
- **Embla** — story rail with thumbnails
- **Vaul** — subscribe drawer
- SVG film grain overlay (paper, not TV static)

Conversion surfaces: selling hero, clickable photographic pulse, story cards with images, sticky mobile CTA, mid-page and end-of-story brief.

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
| `/developments`, `/developments/[slug]` | Development tracker + files |
| `/places`, `/places/[slug]` | Civic rooms |
| `/businesses`, `/businesses/[slug]` | Storefronts and leagues |
| `/people`, `/people/[slug]` | Commissioners, staff, portraits |
| `/about` | Mission and forthcoming editions |
| `/newsletter` | Evening-edition stub (no backend) |
| `/rss.xml` | RSS of stories |
| `/sitemap.xml` | Sitemap |

Homepage: full-bleed lakefront hero with live pulse on the fold, cover story, sea conversion band, thumbnail story rail, development pipeline cards with follow stubs, “What changed,” sticky brief CTA. Stories get a magazine cover, reading progress, and an end-of-dispatch subscribe you cannot miss.

Stories and entities link both ways.

## Demo content

**All sample stories and several people/business portraits are demo material** for Volume 0. They are not reported news.

Highlighted file in the ledger:

- [Fountain Square redevelopment](content/entities/developments.json) — status **In review**, linked to Plan Commission, Downtown Evanston, Fountain Square, and the architect portrait.

Civic names (Fountain Square, Downtown Evanston, the lakefront, Plan Commission as a body) are used as place anchors. Named individuals other than public bodies are composite demo portraits.

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
