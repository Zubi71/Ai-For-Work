/* Central data for the AidForWork blog.
   One entry per live article. New posts go at the TOP (newest first) —
   the Blog listing (/blog) and the homepage blog section both render from
   this file, latest first. Adding a post = add one entry here + the guide
   page + route in App.jsx + sitemap.xml + llms.txt. Do NOT hardcode cards
   in Guides.jsx or Home.jsx.
   Featured-image mapping (existing files only): teachers -> teachers.webp,
   accountants -> accountants.webp, realtors -> realtors.webp, everything
   else (lawyers, architects, nurses, small business, CRM, contract
   review) -> hero.webp. */

export const GUIDES = [
  {
    url: '/guides/ai-tools-for-solicitors-uk',
    title: 'AI Tools for Solicitors: Draft Faster Without Losing Control',
    tag: 'For solicitors',
    excerpt: 'Drafting, client intake, legal research, time recording and case management — how UK solicitors can use AI without risking client confidentiality.',
    image: '/images/realtors.webp',
    imageAlt: 'Real estate agent showing a bright home to a couple',
    category: 'lawyers',
    readTime: '6 min read',
    date: '2026-11-13',
    keywords: ['AI tools for solicitors', 'AI tools for solicitors UK', 'solicitor AI tools', 'AI for law firms'],
  },
  {
    url: '/guides/ai-contract-review-software',
    title: 'AI Contract Review Software: Faster Review Without Losing Control',
    tag: 'For lawyers',
    excerpt: 'Redlining, clause extraction and risk flags — what AI contract review software does, which tools small US firms use, and what to check before buying.',
    image: '/images/hero.webp',
    imageAlt: 'Professional starting his workday at a laptop in a bright modern office',
    category: 'lawyers',
    readTime: '6 min read',
    date: '2026-11-13',
    keywords: ['AI contract review software', 'AI tools for lawyers', 'contract review AI', 'AI for law firms'],
  },
  {
    url: '/guides/ai-tools-for-estate-agents-uk',
    title: 'AI Tools for Estate Agents: List Faster, Follow Up Better',
    tag: 'For estate agents',
    excerpt: 'Listing descriptions, valuation support, viewing follow-ups and client messages — how UK estate agents can use AI without misleading buyers.',
    image: '/images/realtors.webp',
    imageAlt: 'Real estate agent showing a bright home to a couple',
    category: 'realtors',
    readTime: '6 min read',
    date: '2026-11-12',
    keywords: ['AI tools for estate agents', 'AI tools for estate agents UK', 'estate agent AI tools', 'AI for estate agents'],
  },
  {
    url: '/guides/ai-tools-for-lawyers',
    title: 'AI Tools for Lawyers: Review Faster Without Losing Control',
    tag: 'For lawyers',
    excerpt: 'Contract review, legal research, drafting, e-discovery and client intake — where AI saves time, and where it can go wrong.',
    image: '/images/hero.webp',
    imageAlt: 'Professional starting his workday at a laptop in a bright modern office',
    category: 'lawyers',
    readTime: '6 min read',
    date: '2026-11-12',
    keywords: ['AI tools for lawyers', 'AI contract review software', 'legal AI tools', 'AI for law firms'],
  },
  {
    url: '/guides/ai-tools-for-teachers',
    title: 'AI Tools for Teachers: Save Hours on Planning and Grading',
    tag: 'For teachers',
    excerpt: 'Planning, grading and quizzes — how teachers can save hours a week with AI, and the mistakes to avoid.',
    image: '/images/teachers.webp',
    imageAlt: 'Teacher planning lessons on a laptop in an empty classroom',
    category: 'teachers',
    readTime: '6 min read',
    date: '2026-11-09',
    keywords: ['AI tools for teachers', 'AI lesson plan generator', 'AI grading tools', 'AI tools for teachers free'],
  },
  {
    url: '/guides/ai-tools-for-accountants',
    title: 'AI Tools for Accountants: What Actually Helps a Small Firm',
    tag: 'For accountants',
    excerpt: 'What AI can genuinely help with in a small accounting firm, and how to choose software without overspending.',
    image: '/images/accountants.webp',
    imageAlt: 'Accountant working with a calculator, charts and a laptop',
    category: 'accountants',
    readTime: '6 min read',
    date: '2026-11-09',
    keywords: ['AI tools for accountants', 'AI accounting tools', 'AI bookkeeping tools', 'AI tools for small accounting firms'],
  },
  {
    url: '/guides/ai-tools-for-real-estate-agents',
    title: 'AI Tools for Real Estate Agents: Listings, Follow-Up and Pricing',
    tag: 'For real estate agents',
    excerpt: 'Listing copy, follow-up and pricing research — where AI saves time, and where it can mislead buyers.',
    image: '/images/realtors.webp',
    imageAlt: 'Real estate agent showing a bright home to a couple',
    category: 'realtors',
    readTime: '6 min read',
    date: '2026-11-09',
    keywords: ['AI tools for real estate agents', 'AI tools for realtors', 'AI listing tools', 'real estate AI tools'],
  },
]
