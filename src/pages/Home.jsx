import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { GUIDES } from '../data/guides'

/* FAQ copied from the uploaded AidForWork homepage file (8 questions). */
const HOME_FAQ = [
  { q: 'What is AidForWork?', a: 'AidForWork is a free resource site that builds and reviews AI tools and software for specific professions — starting with teachers, accountants and bookkeepers, and real estate agents in the United States. Every tool on the site runs free in your browser with no signup.' },
  { q: 'Are the tools on AidForWork really free?', a: 'Yes. The grade calculator, lesson plan generator, invoice calculator, hourly rate calculator, commission calculator and listing description generator are all free to use, with no account, no paywall and no usage limit.' },
  { q: 'Which AI tools are best for teachers?', a: 'The highest-value tools automate planning and grading: a lesson plan generator for first drafts, a grade calculator for instant percentage-to-letter conversions, and quiz and rubric generators. AidForWork’s teacher tools cover planning and grading — the two tasks that consume most of a teacher’s after-hours time.' },
  { q: 'How do accountants use AI tools?', a: 'Accountants and bookkeepers use AI tools to draft client emails, summarize documents, categorize transactions and speed up invoicing. The free invoice and hourly rate calculators on AidForWork handle the everyday arithmetic — totals, tax, discounts and pricing — in seconds.' },
  { q: 'How do real estate agents use AI tools?', a: 'Agents use AI tools to write listing descriptions, draft follow-up messages and estimate earnings. AidForWork’s listing description generator turns beds, baths, square footage and features into a polished MLS-ready paragraph, and its commission calculator shows the gross commission and the agent’s split before closing.' },
  { q: 'Is my data stored when I use these tools?', a: 'No. Every AidForWork tool runs entirely in your web browser. The numbers and text you enter are never sent to a server, stored, or shared — close the tab and they are gone.' },
  { q: 'Do the tools work on phones and tablets?', a: 'Yes. AidForWork is fully responsive: every page and tool is designed to work on phones, tablets, laptops and large desktop screens, in both light and dark mode.' },
  { q: 'Which professions will AidForWork cover next?', a: 'After teachers, accountants and real estate agents, AidForWork plans tool collections for nurses, lawyers, restaurant owners and e-commerce sellers — professions with heavy paperwork and repetitive writing tasks.' },
]

const PROFESSIONS = [
  {
    id: 'teachers',
    name: 'For Teachers',
    img: '/images/teachers.webp',
    alt: 'Teacher planning lessons on a laptop in an empty classroom',
    blurb: 'Planning, grading and parent emails eat your evenings. These tools hand the repetitive parts back to you — a lesson-plan first draft in seconds, grades converted instantly.',
    points: ['Lesson Plan Outline Generator', 'Grade Calculator (points → % → letter)', 'Blog: AI prompts that actually help in class'],
  },
  {
    id: 'accountants',
    name: 'For Accountants & Bookkeepers',
    img: '/images/accountants.webp',
    alt: 'Accountant working with a calculator, charts and a laptop',
    blurb: 'Client books, invoices and pricing decisions fill the week. Work the numbers faster with calculators built for practice life — and price freelance work so it actually pays.',
    points: ['Invoice Calculator with tax & discount', 'Freelance Hourly Rate Calculator', 'Blog: AI for busy-season workflows'],
  },
  {
    id: 'realtors',
    name: 'For Real Estate Agents',
    img: '/images/realtors.webp',
    alt: 'Real estate agent showing a bright home to a couple',
    blurb: 'Listings don’t write themselves and commissions shouldn’t be a surprise at closing. Generate MLS-ready descriptions and see your real split before the deal is done.',
    points: ['Listing Description Generator', 'Commission & Split Calculator', 'Blog: AI follow-ups that get replies'],
  },
]

/* Tool cards link to the real React routes. Descriptions are the uploaded
   file's tool subtitles; the Quiz and CRM cards (not in the file) reuse the
   existing site copy. */
const TOOL_TABS = [
  {
    id: 'teachers',
    label: 'Teachers',
    tools: [
      { to: '/grade-calculator', name: 'Grade Calculator', sub: 'Turn points earned into a percentage and letter grade instantly — no spreadsheet, no mental math at 11 p.m.' },
      { to: '/tools/ai-lesson-plan-generator', name: 'Lesson Plan Outline Generator', sub: 'A structured first draft in seconds — objective, timed lesson flow, differentiation and homework. Edit it into your own voice.' },
      { to: '/tools/ai-grading-quiz-generator', name: 'AI Grading & Quiz Generator', sub: 'Build a quiz on any topic — multiple choice, true/false or short answer — with an answer key included.' },
    ],
  },
  {
    id: 'accountants',
    label: 'Accountants & Bookkeepers',
    tools: [
      { to: '/invoice-calculator', name: 'Invoice Calculator', sub: 'Add line items, a discount and a tax rate — get a clean, client-ready total without touching a spreadsheet.' },
      { to: '/hourly-rate-calculator', name: 'Freelance Hourly Rate Calculator', sub: 'For independent bookkeepers and accountants: price your hours so salary, expenses, taxes buffer and time off are all covered.' },
      { to: '/tools/crm-cost-calculator', name: 'CRM Cost Calculator', sub: 'See what a CRM really costs your team per month and per year, and compare three popular options.' },
    ],
  },
  {
    id: 'realtors',
    label: 'Real Estate Agents',
    tools: [
      { to: '/commission-calculator', name: 'Commission Calculator', sub: 'See the gross commission on a sale — and what actually lands in your pocket after the brokerage split.' },
      { to: '/tools/listing-description-generator', name: 'Listing Description Generator', sub: 'Turn the facts of a property into a polished, MLS-ready description in one click. Rewrite the opening line in your own voice before posting.' },
    ],
  },
]

export default function Home() {
  const [toolTab, setToolTab] = useState('teachers')
  const [openFaq, setOpenFaq] = useState(0)
  const [email, setEmail] = useState('')
  const activeTab = TOOL_TABS.find((t) => t.id === toolTab) || TOOL_TABS[0]
  const mailto =
    'mailto:hello@aidforwork.com?subject=' +
    encodeURIComponent('AidForWork launch updates') +
    '&body=' +
    encodeURIComponent(
      'Hi AidForWork team,\n\nPlease send me new tools and guides for my profession.\n\nMy email: ' +
        email +
        '\nMy profession: ',
    )

  return (
    <div className="home-v2">
      <Seo
        title="Free AI Tools: Teachers, Accountants & Agents | AidForWork"
        description="Free AI tools that save working professionals time. Get drafts in minutes instead of hours — no sign-up, no account, and your data stays on your device."
        path="/"
        faq={HOME_FAQ}
      />

      <section className="hero" id="top">
        <div className="container hero-grid">
          <div>
            <span className="tag">Free tools · No signup</span>
            <h1>
              AI tools that do the busywork of <em>your</em> profession
            </h1>
            <p className="lede">
              AidForWork builds and reviews free AI tools and software for US teachers, accountants and real estate agents — the
              calculators, generators and guides that turn an hour of desk work into five minutes.
            </p>
            <div className="hero-ctas">
              <a className="btn" href="#tools">
                Try the free tools
              </a>
              <a className="btn ghost" href="#blog">
                Read the blog
              </a>
            </div>
            <div className="hero-points">
              <span>
                <span className="dot" />
                8 working tools, free forever
              </span>
              <span>
                <span className="dot" />
                Runs 100% in your browser
              </span>
              <span>
                <span className="dot" />
                Phone, tablet &amp; desktop
              </span>
            </div>
          </div>
          <div>
            <div className="hero-img">
              <img
                src="/images/hero.webp"
                alt="Professional starting his workday at a laptop in a bright modern office"
                width="1600"
                height="918"
                fetchpriority="high"
              />
            </div>
            <div className="hero-card">
              <span className="num">3 professions</span>
              <p>Teachers, accountants &amp; realtors first — chosen because their paperwork is the heaviest and their evenings are the shortest.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="answer">
            <h2>What is AidForWork, in one paragraph?</h2>
            <p>
              <strong>AidForWork (aidforwork.com)</strong> is a free website that publishes working AI tools and software guides for
              specific jobs instead of generic &ldquo;productivity&rdquo; advice. It currently serves{' '}
              <strong>teachers</strong> (lesson plan generator, grade calculator),{' '}
              <strong>accountants and bookkeepers</strong> (invoice calculator, hourly rate calculator) and{' '}
              <strong>real estate agents</strong> (listing description generator, commission calculator). Every tool is free, needs no
              signup, and runs entirely in the visitor&rsquo;s browser — no data is uploaded or stored.
            </p>
          </div>
        </div>
      </section>

      <section className="soft" id="professions">
        <div className="container">
          <div className="sec-head">
            <span className="tag">Who it&rsquo;s for</span>
            <h2>Built profession by profession</h2>
            <p className="lede">
              Generic AI advice doesn&rsquo;t survive contact with a real classroom, a real client list, or a real closing table. Each
              collection below is shaped around one job&rsquo;s actual week.
            </p>
          </div>
          <div className="prof-grid">
            {PROFESSIONS.map((p) => (
              <article className="prof" key={p.id}>
                <img src={p.img} alt={p.alt} loading="lazy" />
                <div className="prof-body">
                  <h3>{p.name}</h3>
                  <p>{p.blurb}</p>
                  <ul>
                    {p.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <a className="go" href="#tools" onClick={() => setToolTab(p.id)}>
                    Open these tools →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="tools">
        <div className="container">
          <div className="sec-head">
            <span className="tag">Free tools</span>
            <h2>Use them right here — no signup, no download</h2>
            <p className="lede">Every tool runs in your browser and recalculates as you type. Pick your profession to see its toolkit.</p>
          </div>
          <div className="tabs" role="tablist" aria-label="Choose your profession">
            {TOOL_TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={toolTab === t.id}
                className={toolTab === t.id ? 'tab active' : 'tab'}
                onClick={() => setToolTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="tool-grid">
            {activeTab.tools.map((tool) => (
              <article className="tool" key={tool.to}>
                <h3>
                  <Link to={tool.to}>{tool.name}</Link>
                </h3>
                <p className="sub">{tool.sub}</p>
                <Link className="go" to={tool.to}>
                  Open the tool →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="soft" id="blog">
        <div className="container">
          <div className="sec-head">
            <span className="tag">Blog</span>
            <h2>Straight answers, written for your job</h2>
            <p className="lede">
              Short, practical guides on where AI genuinely helps each profession — and where a professional should never hand over the
              final call.
            </p>
          </div>
          <div className="guide-grid">
            {GUIDES.slice(0, 4).map((g) => (
              <article className="guide" key={g.url}>
                <div className="guide-img"><img src={g.image} alt={g.imageAlt} loading="lazy" /></div>
                <div className="meta">
                  <span className="who">{g.tag}</span>
                  <span>{g.readTime}</span>
                </div>
                <h3>
                  <Link to={g.url}>{g.title}</Link>
                </h3>
                <p>{g.excerpt}</p>
                <Link className="go" to={g.url}>
                  Read the article →
                </Link>
              </article>
            ))}
          </div>
          <p style={{ marginTop: 28 }}>
            <Link className="go" to="/blog">
              View all blog articles →
            </Link>
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="sec-head">
            <span className="tag">How it works</span>
            <h2>From paperwork pile to done, in three steps</h2>
          </div>
          <div className="steps">
            <div className="step">
              <span className="n">STEP 01</span>
              <h3>Pick your profession</h3>
              <p>Teachers, accountants and realtors each get a toolkit shaped around their real tasks — not a generic chatbot with a new label.</p>
            </div>
            <div className="step">
              <span className="n">STEP 02</span>
              <h3>Run the tool in your browser</h3>
              <p>Type your numbers or property facts and get the result instantly. Nothing is uploaded, stored or shared — close the tab and it&rsquo;s gone.</p>
            </div>
            <div className="step">
              <span className="n">STEP 03</span>
              <h3>Add your professional judgment</h3>
              <p>AI drafts and calculates; you decide. Every guide on AidForWork shows where the tool&rsquo;s job ends and yours begins.</p>
            </div>
          </div>
          <div style={{ marginTop: 44 }}>
            <img
              src="/images/steps.webp"
              alt="Small business owner reviewing charts happily at his desk with a laptop"
              loading="lazy"
              style={{ width: '100%', borderRadius: 18, border: '1px solid var(--line)', aspectRatio: '21/9', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <section className="soft" id="faq">
        <div className="container">
          <div className="sec-head">
            <span className="tag">FAQ</span>
            <h2>Questions, answered directly</h2>
          </div>
          <div className="faq">
            {HOME_FAQ.map((f, i) => (
              <div className={'faq-item' + (openFaq === i ? ' open' : '')} key={f.q}>
                <button type="button" className="faq-q" aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  <span>{f.q}</span>
                  <span className="chev">+</span>
                </button>
                {openFaq === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>New tools land profession by profession</h2>
              <p>
                Tell us your job and we&rsquo;ll send the new calculators, generators and blog articles for it as they launch — starting with
                nurses, lawyers and restaurant owners.
              </p>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="you@yourwork.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Your email address"
              />
              <a className="btn" href={mailto}>
                Get updates
              </a>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
