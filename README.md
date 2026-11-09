# AidForWork

Free AI tools for teachers, accountants and real estate agents — lesson plan generator, grading & quiz generator, listing description generator and CRM cost calculator, plus practical guides. Every tool runs 100% client-side: no sign-up, no backend, no data leaves the visitor's browser.

Live site (once deployed): https://aidforwork.com

## Domain note

**aidforwork.com was verified as unregistered (RDAP 404) on 9 November 2026, but it has NOT been purchased yet.** Buy the domain before deploying, then point its DNS at Vercel (see Deploy below). Until then the site works on any Vercel preview/production URL.

## Tech stack

- Vite + React 18 (JavaScript, no TypeScript)
- react-router-dom 6 with `BrowserRouter` (SPA fallback via `vercel.json` rewrites)
- Plain CSS in `src/index.css` (no Tailwind) — mobile-first, responsive
- No backend, no database, no external fonts or images (logo is local)

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Project structure

```
index.html                  # title/meta/OG + WebSite & Organization JSON-LD
public/
  logo.png  favicon.png  favicon.ico
  robots.txt  sitemap.xml  llms.txt
src/
  main.jsx  App.jsx  index.css
  components/  Seo.jsx  Header.jsx  Footer.jsx  Layout.jsx  ToolActions.jsx
  lib/tools.js              # pure tool logic (lesson plan, quiz, listing, CRM)
  pages/  Home.jsx  Guides.jsx  GuideTeachers.jsx  GuideAccountants.jsx
          GuideAgents.jsx  About.jsx  Contact.jsx  Privacy.jsx  Terms.jsx  NotFound.jsx
  pages/tools/  LessonPlan.jsx  QuizGenerator.jsx  ListingGenerator.jsx  CrmCalculator.jsx
vercel.json                 # SPA rewrites + security headers + /assets cache
```

## CRM calculator formula

- Annual billing: effective price = price × 0.80 (20% annual discount); monthly cost = users × effective price; annual cost = monthly cost × 12.
- Monthly billing: monthly cost = users × price; annual cost = monthly cost × 12.
- First-year total = annual cost + one-time setup fee.
- Example check: 5 users × $20/user/mo, annual billing, $0 setup → monthly 5 × $16 = $80, annual $960, first year $960.
- Comparison prices (HubSpot Starter $20, Zoho CRM $14, Pipedrive $24 per user/month) are **examples only** — confirm current prices on each vendor's website.

## Deploy on Vercel

1. Create a GitHub repo and push this folder (see below).
2. In Vercel: **Add New → Project → Import** the repo. Framework preset: **Vite**. Build command `npm run build`, output directory `dist`.
3. Deploy. Then add the custom domain `aidforwork.com` in Vercel → Project → Settings → Domains, and set the DNS records Vercel shows (A / CNAME) at your registrar.
4. `vercel.json` already handles SPA rewrites (all routes fall back to `index.html`), security headers, and long caching for `/assets/*`.

## Push to GitHub (first time)

```bash
git init
git add .
git commit -m "AidForWork v1: React tools site (lesson plans, quizzes, listings, CRM costs)"
git branch -M main
git remote add origin https://github.com/Zubi71/Ai-For-Work.git
git push -u origin main
```

## SEO / AEO / GEO

- Unique title + meta description + canonical per route (see `src/components/Seo.jsx`), Open Graph + Twitter cards, `theme-color`, favicon.
- `public/sitemap.xml` (all 13 routes), `public/robots.txt`, `public/llms.txt` for AI crawlers.
- JSON-LD: WebSite + Organization in `index.html`; FAQPage + BreadcrumbList injected per page by the `Seo` component, matching the visible FAQs.
- Semantic HTML: one `h1` per page, `header`/`nav`/`main`/`footer` landmarks, `aria` labels on the mobile nav toggle and forms, descriptive alt text on the logo.
- Performance: system font stack (no Google Fonts), local logo only, no heavy dependencies.
