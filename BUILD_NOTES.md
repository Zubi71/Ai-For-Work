# AidForWork — Build Notes (v1, 2026-11-09)

## What was built
Complete GitHub-ready Vite + React 18 (JavaScript) source site in `~/workspace/aidforwork/`.
Brand: AidForWork, indigo #4F46E5, navy #0F172A, teal #14B8A6, white background, system font stack.
Domain: **aidforwork.com — verified unregistered via Verisign RDAP 404 on 2026-11-09, NOT yet purchased.** Buy it before deploying. Logo: `public/logo.png` (2736×912, copied from `assets/logo.png`). Favicon: `public/favicon.png` (512×512, resized from 1600×1600 source) + `public/favicon.ico` (48/32/16).

## Structure — multi-page, NOT one-page
React Router `BrowserRouter` with **13 separate routes**, each its own page component, own URL, own title, meta description, canonical and FAQ + JSON-LD. Verified in a real headless Chromium (Playwright): all 13 routes render their own distinct title, exactly one `<h1>`, correct canonical, and FAQPage JSON-LD. Header nav links navigate between pages (SPA navigation, no reload); Vercel SPA fallback is in `vercel.json` so direct URLs and refreshes work after deploy.

| Route | Page |
|---|---|
| `/` | Homepage (hero, 4 tool cards, audiences, how-it-works, 5 FAQs, guides teaser) |
| `/tools/ai-lesson-plan-generator` | Lesson plan generator + guide + 5 FAQs |
| `/tools/ai-grading-quiz-generator` | Quiz generator + guide + 5 FAQs |
| `/tools/listing-description-generator` | Listing generator + guide + 5 FAQs |
| `/tools/crm-cost-calculator` | CRM calculator + guide + 5 FAQs |
| `/guides` | Guides index + 3 FAQs |
| `/guides/ai-tools-for-teachers` | Guide article, ~1,024 words + 5 FAQs |
| `/guides/ai-tools-for-accountants` | Guide article, ~905 words + 5 FAQs |
| `/guides/ai-tools-for-real-estate-agents` | Guide article, ~921 words + 5 FAQs |
| `/about` | About + 3 FAQs |
| `/contact` | Contact form (validates, mailto success flow) + 3 FAQs |
| `/privacy-policy` | Privacy policy + 3 FAQs |
| `/terms` | Terms of use + 3 FAQs |
| `*` | 404 page (own route, not in sitemap) |

## Tools — all real, client-side, no placeholders
Pure logic lives in `src/lib/tools.js` (also Node-testable):
- **Lesson plan:** grade/subject/topic/length/objectives → 8-section plan (overview, objectives, warm-up, 2 timed activities, assessment, homework, materials). Timings sum to the lesson length (verified: 5+18+15+7 = 45 for a 45-min lesson). Copy + Download .txt + Print.
- **Quiz:** topic/grade/count (1–20)/type → MCQ (4 options, shuffled correct answer), True/False, or short answer, with answer key. Copy + Download + Print.
- **Listing:** property details + tone → headline + description + highlights. Copy + Download.
- **CRM calculator:** see formula below. Copy is not needed (results are on-page); comparison table included.

## CRM formula (exact)
- Annual billing: effective price per user/month = price × 0.80 (20% discount); monthly cost = users × effective price; annual cost = monthly cost × 12.
- Monthly billing: monthly cost = users × price; annual cost = monthly cost × 12.
- First-year total = annual cost + one-time setup fee. All money values rounded to 2 decimals (a floating-point artifact, e.g. $672.0000000000001, was found in testing and fixed with rounding).
- **Verified example:** 5 users × $20/user/mo, annual billing, $0 setup → monthly $80, annual $960, first year $960. Monthly billing same inputs + $100 setup → monthly $100, annual $1,200, first year $1,300.
- Comparison prices are **examples only** (labelled in UI and code): HubSpot Starter $20, Zoho CRM $14, Pipedrive $24 per user/month.

## SEO / AEO / GEO
- `src/components/Seo.jsx` (useEffect hook, no extra dep): per-route title, meta description, canonical, OG + Twitter tags; injects FAQPage + BreadcrumbList JSON-LD matching the visible FAQs.
- `index.html`: WebSite + Organization JSON-LD, OG/Twitter, theme-color, favicon links.
- `public/sitemap.xml` (13 routes, lastmod 2026-11-09), `public/robots.txt`, `public/llms.txt`.
- Semantic HTML: one `<h1>` per page (verified), header/nav/main/footer landmarks, skip link, aria labels, logo alt text with width/height (no CLS). System fonts only — no Google Fonts, no external images.

## Verification (all done 2026-11-09)
- `npm install && npm run build`: **succeeds, zero errors** (Vite 5.4.21; dist: 3.01 kB HTML, 10.19 kB CSS, 258–262 kB JS gzipped ~79 kB).
- Node logic tests (`/tmp/test_tools.mjs`, 29 checks): **all pass** — lesson plan structure/timings, quiz counts for all 3 types (incl. exact question counts, 4 MCQ options, TF True/False mix), listing includes all inputs, CRM math incl. the $80/$960 example and Zoho comparison $672.
- `vite preview` curl: **all 200** — homepage, 4 tool routes, guides index + 3 guides, about, contact, privacy, terms, sitemap.xml, robots.txt, llms.txt, favicon.png, favicon.ico, logo.png; unknown path also 200 (SPA fallback serving the 404 page).
- Playwright headless Chromium (real browser): **all checks pass** — 13 routes each with own title (13 distinct), exactly 1 `<h1>`, meta + canonical correct, FAQ JSON-LD present on all 13; header nav clicks navigate correctly; CRM tool computes $80/$960 in-browser; lesson plan generates for "Photosynthesis" in-browser; 360px viewport: **0px horizontal overflow** on homepage and tool page; mobile hamburger opens nav; **zero JS console/page errors**.
- `grep dist` for lorem / TODO / "coming soon": **zero hits**.
- Note: jsdom could NOT render the app (it does not execute `<script type="module">`) — that is why Playwright/Chromium was installed and used instead.

## Known limits / not verified
- **Not deployed, not pushed to GitHub** (per brief — user creates the repo; parent deploys to Vercel).
- **Domain not purchased** — buy aidforwork.com first, then add it in Vercel and set DNS.
- No real-browser check on an actual phone (only 360px headless viewport); no PageSpeed/Lighthouse run yet — run after deploy.
- Contact form has no server: it validates client-side and opens the visitor's email app via mailto to hello@aidforwork.com (stated in the UI).
- Quiz/lesson outputs are template-based drafts, not AI-model output — labelled as drafts in the UI and guides; accuracy review is the user's job (stated on tool pages).
- `dist/` and `node_modules/` are present locally but gitignored; do not commit them.

## WebP update (2026-11-09, after v1 verification)
- All images converted to WebP per user request: public/logo.webp (36KB, was 284KB PNG), public/favicon.webp (8KB 512x512, was 204KB PNG). No .png/.jpg references remain in src/ or index.html. favicon.ico kept as a silent fallback file only (not referenced as an image on pages). Rebuilt + re-verified: npm run build passes, vite preview curl 200 for /, tool/guide routes, sitemap, robots, llms.txt, logo.webp, favicon.webp.
- Target repo: Zubi71/Ai-For-Work (created by user).
