# Sunlit Moon

**Place OS** for Evanston & the North Shore — Volume 0.

A civic publication, not a dashboard: magazine hierarchy, newspaper discipline, and a public ledger of stories, buildings, and the people who tend them.

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

Homepage: masthead with issue date, data-driven pulse counters, featured + latest stories, development tracker with print-inspired status chips (**Proposed / In review / Approved / Under construction / Complete**), “What changed this month,” footer mission line, and a coming-soon note for Long Island, Palm Beach, and New York City.

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
