import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { GUIDES } from '../data/guides'

const FAQ = [
  { q: 'Are the AidForWork blog articles free to read?', a: 'Yes. Every article on the AidForWork blog is free to read, with no sign-up and no account.' },
  { q: 'Who is the blog written for?', a: 'Working professionals — teachers, accountants, real estate agents and lawyers — who want practical advice on using AI tools, not sales talk.' },
  { q: 'Do the articles recommend specific tools?', a: 'They explain what to look for and what to avoid, and link to the free tools on this site. They do not rank paid products or earn commissions from recommendations.' },
]

/* Blog listing (file kept as Guides.jsx — scheduled jobs reference it).
   Cards render from src/data/guides.js, newest first. */
export default function Guides() {
  return (
    <>
      <Seo
        title="AidForWork Blog: Practical Guides to AI Tools at Work"
        description="Short, practical blog posts for teachers, accountants, real estate agents and lawyers on using AI tools at work — what is worth your time and what to avoid."
        path="/blog"
        faq={FAQ}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }]}
      />
      <div className="container page">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link> / Blog</nav>
        <h1>Blog</h1>
        <p>Short, practical articles for working professionals. No hype, no sales talk — just what a tool can genuinely do, how to check its output, and where your judgement still matters most.</p>
        <div className="card-grid">
          {GUIDES.map((g) => (
            <article className="card" key={g.url}>
              <div className="card-img"><img src={g.image} alt={g.imageAlt} loading="lazy" /></div>
              <span className="tag">{g.tag}</span>
              <h3><Link to={g.url}>{g.title}</Link></h3>
              <p>{g.excerpt}</p>
              <p className="card-read">{g.readTime}</p>
              <Link className="card-link" to={g.url}>Read the article →</Link>
            </article>
          ))}
        </div>
        <h2 style={{ marginTop: 32 }}>Frequently asked questions</h2>
        <div className="faq-list">
          {FAQ.map((f) => (
            <div className="faq-item" key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>
          ))}
        </div>
      </div>
    </>
  )
}
