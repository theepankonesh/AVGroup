# AV Group: Property Services Website (Ottawa)

Website for AV Group's four services: **Grass Cutting, Power Washing, Window Cleaning, and Residential & Commercial Cleaning** in Ottawa.

**Tech stack:** React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · static prerendering (every page is built to its own HTML file) · Vercel (hosting + `/api/quote` serverless function) · Resend (quote emails)

## Run locally

Requires Node 24.

```bash
npm install
cp .env.example .env     # optional for local dev; fill in values to test the quote form
npm run dev              # http://localhost:3000
```

Production build and a Vercel-like local preview (clean URLs, redirects, headers, 404s, `/api/quote`):

```bash
npm run build
npm run preview          # http://localhost:4173
npm run check-links      # verifies every internal link, image and #anchor in dist/
```

## Deploy to Vercel

1. Push the repository to GitHub.
2. In Vercel: **Add New… → Project → Import** the repository. Settings are read from `vercel.json` (build `npm run build`, output `dist`).
3. Add the environment variables from `.env.example` under **Settings → Environment Variables**, then redeploy.
4. Add your domain under **Settings → Domains** and update DNS as Vercel instructs.

## Where to edit things

| What | File |
|---|---|
| Phone, email, hours, insurance amount, Google/social links | `src/config/site.ts` |
| Seasonal promo bar, homepage service order, grass plans vs. "book early" | `src/config/season.ts` |
| Service pages, FAQs, pricing, grass plans, bundles | `src/data/services.ts` |
| Local area pages | `src/data/areas.ts` |
| Blog posts (Markdown) | `src/data/blog.ts` |
| Customer reviews and before/after photos | `src/data/proof.ts` |
| 301 redirects | `src/config/redirects.ts` **and** `vercel.json` (the build checks they match) |
| Page titles, descriptions, schema | `src/seo.ts` and the data files |
| Quote form email delivery | `api/quote.ts` |

Search the code for `PLACEHOLDER` to find anything that still needs real business information.
