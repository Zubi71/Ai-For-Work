import { useEffect } from 'react'

const SITE = 'https://aidforwork.com'

function setMeta(attr, key, content) {
  const selector = attr === 'property' ? `meta[property="${key}"]` : `meta[name="${key}"]`
  let el = document.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Per-route SEO without extra dependencies: updates title, description,
 * canonical and social tags, and injects FAQPage / BreadcrumbList JSON-LD
 * that matches the visible FAQs on the page.
 */
export default function Seo({ title, description, path = '/', faq = null, breadcrumbs = null }) {
  useEffect(() => {
    const url = SITE + path
    document.title = title
    setMeta('name', 'description', description)
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', 'website')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)

    const graphs = []
    if (faq && faq.length) {
      graphs.push({
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      })
    }
    if (breadcrumbs && breadcrumbs.length) {
      graphs.push({
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: SITE + b.path,
        })),
      })
    }
    let script = document.getElementById('page-jsonld')
    if (script) script.remove()
    if (graphs.length) {
      script = document.createElement('script')
      script.id = 'page-jsonld'
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graphs })
      document.head.appendChild(script)
    }
    return () => {
      const s = document.getElementById('page-jsonld')
      if (s) s.remove()
    }
  }, [title, description, path, faq, breadcrumbs])

  return null
}
