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

## Polish pass 2026-11-09 (user feedback: more professional, like the first one-page preview)
- **Palette UNCHANGED:** indigo #4F46E5, navy #0F172A, teal #14B8A6, white background, logo.webp. No new colours.
- **Full width site-wide (same fix as portfolio 2026-11-03):** removed the centred 1120px `.container` — header, hero, tool pages, guides, footer now span the full viewport with 32px side margins on desktop, 20px on mobile. Card grids: 2 cols ≥640px, 3 cols ≥1200px, 4 cols ≥1400px. Only long article prose is capped at a readable ~75ch measure (`.guide-text`, `.article`/`.page` direct text children).
- **Professional polish:** homepage hero is now a deep indigo gradient band (#4F46E5 → #4338CA → #1E1B4B) with white headline, teal eyebrow, white primary button and a trust line ("No sign-up · Free forever · Your data stays on your device"); cards/audience cards have subtle shadows + hover lift; sticky header with logo.webp (width/height set, no CLS) + soft shadow; tool-hero deepened to #E0E7FF with a bottom border. All 13 routes, all 4 tools (logic in `src/lib/tools.js` untouched), guides, FAQs and JSON-LD intact. No new dependencies, no Google Fonts, WebP images only.
- **Meta titles (50–60 chars) + descriptions (150–160 chars), rewritten for all 13 routes** — general homepage wording (no tool counts, no tool-name lists, so it stays correct as tools are added), keyword-first, every page unique. Verified from the source files AND in a real headless Chromium (titles below are the rendered `document.title` values).

| Route | Title (chars) | Description (chars) |
|---|---|---|
| `/` | Free AI Tools: Teachers, Accountants & Agents \| AidForWork (58) | Free AI tools that save working professionals time. Get drafts in minutes instead of hours — no sign-up, no account, and your data stays on your device. (152) |
| `/tools/ai-lesson-plan-generator` | Free AI Lesson Plan Generator for Teachers \| AidForWork (55) | Generate a structured lesson plan in seconds — objectives, warm-up, timed activities, assessment and homework. Free for any grade and subject, no sign-up. (154) |
| `/tools/ai-grading-quiz-generator` | Free AI Quiz Generator with Answer Key \| AidForWork (51) | Create a quiz on any topic in seconds — multiple choice, true/false or short answer, with a ready answer key. Free, no sign-up, print or download it today. (155) |
| `/tools/listing-description-generator` | Free Listing Description Generator for Agents \| AidForWork (58) | Write a polished property listing in seconds — headline, description and highlights from your property details. Free, no sign-up, and ready to share today. (155) |
| `/tools/crm-cost-calculator` | Free CRM Cost Calculator for Small Business \| AidForWork (56) | Work out what a CRM really costs your team — monthly and annual cost, first-year total and cost per user, with an example comparison. Free, no sign-up. (151) |
| `/guides` | Free Practical Guides to AI Tools at Work \| AidForWork (54) | Short, practical guides for teachers, accountants and real estate agents on using AI tools well at work — which tools are worth your time and what to avoid. (156) |
| `/guides/ai-tools-for-teachers` | AI Tools for Teachers: Plan, Grade & Quiz \| AidForWork (54) | How teachers can use AI tools for lesson planning, grading and quizzes — which tools save real time, how to check their output, and what to avoid in class. (155) |
| `/guides/ai-tools-for-accountants` | AI Tools for Accountants: Save Time, Cut Costs \| AidForWork (59) | What AI can genuinely help with in a small accounting firm — bookkeeping, reconciliation, client messages and software costs — plus data safety rules. (150) |
| `/guides/ai-tools-for-real-estate-agents` | AI Tools for Real Estate Agents: List Faster \| AidForWork (57) | How real estate agents can use AI for listing copy, follow-up and pricing research — where it saves time, where it can mislead, and how to stay honest. (151) |
| `/about` | About AidForWork — Free AI Tools for Professionals (50) | AidForWork builds free, client-side AI tools for teachers, accountants and real estate agents. No sign-up, no account, and your data never leaves your device. (158) |
| `/contact` | Contact AidForWork — Questions, Feedback & Support (50) | Contact AidForWork with questions, corrections or suggestions about our free AI tools. Email hello@aidforwork.com or use the contact form on this page. (151) |
| `/privacy-policy` | Privacy Policy: Your Data Stays on Your Device \| AidForWork (59) | AidForWork privacy policy: our tools run entirely in your browser, we do not collect what you type, and we never sell personal information. Read it here. (153) |
| `/terms` | AidForWork Terms of Use: Free Tools Provided As-Is (50) | AidForWork terms of use: free tools provided as-is, outputs are starting drafts to review, and example prices must be confirmed with the vendor first. (150) |

(The 404 page is not listed — it is not in the sitemap and is not indexed. `index.html` title/meta/OG/Twitter + WebSite JSON-LD description updated to match the new homepage title/description.)

## Polish-pass verification (2026-11-09, all done)
- `npm run build`: **succeeds, zero errors** (dist: 3.04 kB HTML, 11.16 kB CSS, 262.19 kB JS gzipped ~79.6 kB).
- `vite preview` curl: **18/18 × 200** — `/`, all 4 tool routes, `/guides` + 3 guides, `/about`, `/contact`, `/privacy-policy`, `/terms`, `sitemap.xml`, `robots.txt`, `llms.txt`, `logo.webp`, `favicon.webp`.
- Headless Chromium (Playwright, 1400px + 360px viewports): **all 13 routes** render their exact new title (50–60 chars), exactly **one `<h1>`** each, header spans the full viewport width (1400px at 1400px viewport), **0px horizontal overflow at 1400px and at 360px**, **zero console/page errors**. Homepage hero computed background confirmed as the indigo gradient `linear-gradient(135deg, rgb(79,70,229), rgb(67,56,202) 55%, rgb(30,27,75))`.
- Tool smoke tests in-browser: CRM computes $80/mo + $960/yr for the 5-user × $20 annual example; lesson plan generates for "Photosynthesis"; quiz generates with topic (Q1, MCQ options, answer key present); listing form renders all inputs. Empty-topic quiz submit correctly shows the validation error ("Please enter a quiz topic.").
- `grep src` for `max-width: 1120px / 1140px / 1200px / 780px / 760px` container rules: **zero** (remaining `max-width` rules are only `img 100%`, hero/tool-hero lead 680px, and the ~75ch prose caps). `grep dist` for lorem/TODO/coming soon: **zero**. `grep src + index.html` for `.png/.jpg/.jpeg` references: **zero** (WebP only).
- Not verified: no check on a real physical phone (only 360px headless viewport); no PageSpeed/Lighthouse run yet — run after deploy. NOT pushed to GitHub, NOT deployed (per brief — parent pushes and verifies).

## WebP update (2026-11-09, after v1 verification)
- All images converted to WebP per user request: public/logo.webp (36KB, was 284KB PNG), public/favicon.webp (8KB 512x512, was 204KB PNG). No .png/.jpg references remain in src/ or index.html. favicon.ico kept as a silent fallback file only (not referenced as an image on pages). Rebuilt + re-verified: npm run build passes, vite preview curl 200 for /, tool/guide routes, sitemap, robots, llms.txt, logo.webp, favicon.webp.
- Target repo: Zubi71/Ai-For-Work (created by user).

## Green re-skin + 4 new tools (2026-11-09 evening — user rejected the indigo polish, v1 green design is final)
- **Palette REVERTED to v1 green:** primary #0b6b4f, dark #084f3a, light tint #eaf5f0 / #d1fae5, dark-green headings/footer #0a2e22, accent emerald #047857. **Zero indigo left** (grep for 4f46e5/4338ca/1e1b4b/eef2ff/e0e7ff = 0 in src + index.html). Green gradient hero (#0b6b4f → #084f3a → #052e21).
- **Centred container RESTORED (full-width polish reverted):** `.container` max-width 1180px, margin auto, 32px side padding (20px mobile). `.article`/`.page` also capped at 1180px. Card grid caps at 3 columns ≥1200px (polish-only 4-col @1400px rule removed).
- **Branding:** public/logo.webp (33KB) + public/favicon.webp (8KB) replaced with the green versions from assets/ (identical md5); public/favicon.ico regenerated from the green favicon via PIL (48/32/16). theme-color now #0b6b4f. Logo visually viewed: green square, white "A", green spark, dark-green "AidForWork" wordmark.
- **4 new tools added** (routes are top-level, matching v1's tool set; each with own title 50–60 chars, description 150–160 chars, canonical, FAQPage 3 Q&As + Breadcrumb JSON-LD, guide section, footer/header nav + homepage grid + sitemap + llms.txt):
  - Grade Calculator `/grade-calculator` — % = score/total×100, US scale A≥90/B≥80/C≥70/D≥60/F<60. Verified: 42/50 → 84.0%, B.
  - Invoice Calculator `/invoice-calculator` — labour = hours×rate, subtotal = labour+expenses, tax = subtotal×rate, total = subtotal+tax. Verified: 10h×$50+$100, 5% tax → $630.00.
  - Freelance Hourly Rate Calculator `/hourly-rate-calculator` — (salary×(1+overhead)) ÷ billable hours. Verified: $92,000 + 35% ÷ 1,960h (40h×49wks) → $63.37/hr, $124,200/yr.
  - Commission Calculator `/commission-calculator` — total = price×rate, agent = total×split. Verified: $250,000×6% → $15,000; 70% split → agent $10,500, brokerage $4,500.
  - Logic in `src/lib/tools.js` (`calculateGrade`, `calculateInvoice`, `calculateHourlyRate`, `calculateCommission`); CRM $80/$960 example regression-checked.
  - **Bug caught by browser test:** billable-hours input had `step="10"` with `min="1"`, so 1,960 failed native step validation (valid values 1, 11, … 1951, 1961) and the form silently refused to submit. Fixed to `step="1"`. All other step/min pairs audited — no other mismatch.
- **Routes now 17** (13 old + 4 new); sitemap.xml 17 URLs; homepage has 8 tool cards + 3 guide cards; homepage meta unchanged (general, no tool counts/names).
- **Verification (all done 2026-11-09 evening):** `npm run build` succeeds zero errors (dist: 3.04 kB HTML, 11.16 kB CSS, 292.29 kB JS, gzip ~85.5 kB). Node logic tests 10/10 pass (incl. all 4 reference values + grade boundaries + CRM regression). `vite preview` curl 22/22 × 200 (17 routes + sitemap/robots/llms/logo/favicon/ico). Headless Chromium (Playwright-core + cached Chromium): 102/102 checks pass — all 17 routes exact title + exactly 1 h1 + FAQPage JSON-LD + canonical + meta 150–160 chars; container computed max-width 1180px; hero computed gradient rgb(11,107,79); all 5 tools compute their reference values in-browser; 0px horizontal overflow at 1400px and at 360px (home + all 4 new tool pages); mobile hamburger opens; zero console/page errors. Greps: lorem/TODO/coming soon 0, .png/.jpg refs 0, indigo hexes 0.
- **Not done (per brief):** NOT pushed to GitHub, NOT deployed — parent handles push + Vercel verify. Domain aidforwork.com still not purchased.
- **Note:** v1 preview's profession sections used real photos, but the React source never had photo assets (no image files in the project, no external-image URLs) — profession sections stay text-based, as in the current source. No photos were added; WebP-only rule kept.
