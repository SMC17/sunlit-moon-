# Sunlit Moon

An edition of Evanston & the North Shore — Volume 0.

Print discipline on the web: Bodoni Moda, Literata, Fragment Mono. Bone, charcoal, and a single lacquer red. Photography treated as objects — cropped, grayscale — not a stock-hero wallpaper.

## Craft

- **Bodoni Moda** (display) · **Literata** (text) · **Fragment Mono** (labels)
- **Motion** — opacity and 8–12px translate only
- **Radix UI** — index menu, development filters
- **Lenis** — quiet scroll
- **Embla** — story rail

Request the edition as a letterpress form in the footer. No drawer, no sticky bar, no film grain.

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
