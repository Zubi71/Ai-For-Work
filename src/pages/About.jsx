import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

const FAQ = [
  { q: 'What is AidForWork?', a: 'AidForWork is a free website of AI tools for teachers, accountants and real estate agents — lesson plans, quizzes, listing descriptions and CRM cost estimates — plus practical guides on using AI at work.' },
  { q: 'Do I need an account to use AidForWork?', a: 'No. Every tool is free with no sign-up and no account, and everything runs in your browser.' },
  { q: 'Who makes AidForWork?', a: 'AidForWork is a small independent website. Questions, corrections and suggestions can be sent to hello@aidforwork.com.' },
]

export default function About() {
  return (
    <>
      <Seo
        title="About AidForWork — Free AI Tools for Working Professionals"
        description="AidForWork builds free, client-side AI tools for teachers, accountants and real estate agents. No sign-up, no account, and your data never leaves your device."
        path="/about"
        faq={FAQ}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]}
      />
      <div className="container page">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link> / About</nav>
        <h1>About AidForWork</h1>
        <p>AidForWork is a small, independent website that builds free AI tools for working professionals — teachers, accountants and real estate agents, and the small businesses around them.</p>
        <h2>Why we built it</h2>
        <p>Working professionals lose hours every week to repetitive writing: lesson plans, quizzes, listing descriptions, cost comparisons. AI can draft all of these in seconds, but most AI tools are either expensive, require an account, or send your data to a server. We wanted tools that do the job simply: open the page, type the facts, get a draft, and leave — no sign-up, no tracking of what you typed.</p>
        <h2>How the tools work</h2>
        <p>Every tool on AidForWork runs entirely in your browser. The text you type — a lesson topic, a property's details, a team size — is processed on your own device and is never uploaded to us or to anyone else. The outputs are generated from templates and your inputs. They are starting drafts, not finished professional work: please review and adapt them before using them in a classroom, a listing or a client file.</p>
        <h2>What we do not do</h2>
        <p>We do not sell your data, because we never receive it. We do not require accounts. We do not claim our tools are a substitute for professional judgement — a teacher's knowledge of their class, an accountant's review of a tax position, or an agent's inspection of a property cannot be automated.</p>
        <h2>Contact</h2>
        <p>Questions, corrections or suggestions? Email us at <a href="mailto:hello@aidforwork.com">hello@aidforwork.com</a> or use the <Link to="/contact">contact form</Link>. We read every message.</p>
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          {FAQ.map((f) => (
            <div className="faq-item" key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>
          ))}
        </div>
      </div>
    </>
  )
}
