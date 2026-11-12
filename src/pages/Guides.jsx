import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import AdSlot from '../components/AdSlot'

const FAQ = [
  { q: 'Are the AidForWork guides free to read?', a: 'Yes. Every guide on AidForWork is free to read, with no sign-up and no account.' },
  { q: 'Who are the guides written for?', a: 'Working professionals — teachers, accountants and real estate agents — who want practical advice on using AI tools, not sales talk.' },
  { q: 'Do the guides recommend specific tools?', a: 'They explain what to look for and what to avoid, and link to the free tools on this site. They do not rank paid products or earn commissions from recommendations.' },
]

export default function Guides() {
  return (
    <>
      <Seo
        title="Free Practical Guides to AI Tools at Work | AidForWork"
        description="Short, practical guides for teachers, accountants and real estate agents on using AI tools well at work — which tools are worth your time and what to avoid."
        path="/guides"
        faq={FAQ}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Guides', path: '/guides' }]}
      />
      <div className="container page">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link> / Guides</nav>
        <h1>Guides: using AI tools at work</h1>
        <p>Short, practical guides for working professionals. No hype, no sales talk — just what a tool can genuinely do, how to check its output, and where your judgement still matters most.</p>
        <AdSlot position="below_heading" />
        <div className="card-grid">
          <article className="card">
            <span className="tag">For teachers</span>
            <h3><Link to="/guides/ai-tools-for-teachers">AI Tools for Teachers</Link></h3>
            <p>Planning, grading and quizzes — how teachers can save hours a week with AI, and the mistakes to avoid.</p>
            <Link className="card-link" to="/guides/ai-tools-for-teachers">Read the guide →</Link>
          </article>
          <article className="card">
            <span className="tag">For accountants</span>
            <h3><Link to="/guides/ai-tools-for-accountants">AI Tools for Accountants</Link></h3>
            <p>What AI can genuinely help with in a small accounting firm, and how to choose software without overspending.</p>
            <Link className="card-link" to="/guides/ai-tools-for-accountants">Read the guide →</Link>
          </article>
          <article className="card">
            <span className="tag">For real estate agents</span>
            <h3><Link to="/guides/ai-tools-for-real-estate-agents">AI Tools for Real Estate Agents</Link></h3>
            <p>Listing copy, follow-up and pricing research — where AI saves time, and where it can mislead buyers.</p>
            <Link className="card-link" to="/guides/ai-tools-for-real-estate-agents">Read the guide →</Link>
          </article>
        </div>
        <h2 style={{ marginTop: 32 }}>Frequently asked questions</h2>
        <div className="faq-list">
          {FAQ.map((f) => (
            <div className="faq-item" key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>
          ))}
        </div>
        <AdSlot position="below_result" />
      </div>
    </>
  )
}
