import { Link } from 'react-router-dom'
import { GUIDES } from '../data/guides'

/* Small "keep reading" cards at the end of a tool page: shows the live
   blog articles for the tool's profession. Renders nothing when no
   article exists for the category yet. */
export default function RelatedArticles({ category }) {
  const related = GUIDES.filter((g) => g.category === category)
  if (!related.length) return null
  return (
    <section className="related-articles" aria-label="Related articles">
      <h2>Related articles</h2>
      <div className="card-grid">
        {related.map((g) => (
          <article className="card" key={g.url}>
            <div className="card-img"><img src={g.image} alt={g.imageAlt} loading="lazy" /></div>
            <span className="tag">{g.tag}</span>
            <h3><Link to={g.url}>{g.title}</Link></h3>
            <p>{g.excerpt}</p>
            <Link className="card-link" to={g.url}>Read the article →</Link>
          </article>
        ))}
      </div>
    </section>
  )
}
