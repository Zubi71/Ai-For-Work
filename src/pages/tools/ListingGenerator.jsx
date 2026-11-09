import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../../components/Seo'
import ToolActions from '../../components/ToolActions'
import { generateListing } from '../../lib/tools'

const FAQ = [
  { q: 'How does the listing description generator work?', a: 'Enter the property type, bedrooms, bathrooms, size, location, key features and tone. The tool writes a headline, a full description and bullet highlights — all in your browser, with nothing uploaded.' },
  { q: 'Can I publish the description as it is?', a: 'You can, but you should not. Always check every fact first — room counts, sizes, features and location details. A wrong detail in a listing can mislead buyers and create legal problems.' },
  { q: 'Which tone should I choose?', a: 'Professional fits most homes. Friendly suits family homes and first-time-buyer areas. Luxury fits high-end properties — but only use it if the home genuinely is high-end, or the copy will feel dishonest.' },
  { q: 'Does it work for rentals as well as sales?', a: 'Yes. The description works for any property type — house, apartment, condo or townhouse, for sale or for rent. Just describe the property accurately.' },
  { q: 'Is my property information stored anywhere?', a: 'No. Everything is generated on your device and nothing you type is sent to a server.' },
]

const TYPES = ['House', 'Apartment', 'Condo', 'Townhouse', 'Duplex', 'Studio', 'Villa', 'Land / Lot']

export default function ListingGenerator() {
  const [form, setForm] = useState({ propertyType: 'House', bedrooms: '3', bathrooms: '2', sqft: '1800', location: '', features: '', tone: 'professional' })
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.location.trim()) { setError('Please enter a location.'); return }
    setError('')
    setResult(generateListing(form))
  }

  return (
    <>
      <Seo
        title="Free Listing Description Generator for Agents | AidForWork"
        description="Write a polished property listing in seconds — headline, description and highlights from your property details. Free, no sign-up, and ready to share today."
        path="/tools/listing-description-generator"
        faq={FAQ}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Listing Description Generator', path: '/tools/listing-description-generator' }]}
      />
      <section className="tool-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link> / Listing Description Generator</nav>
          <h1>Listing Description Generator</h1>
          <p>Turn property details into a polished listing — headline, description and highlights — in seconds. Free, no sign-up.</p>
        </div>
      </section>

      <div className="container tool-layout">
        <form className="tool-form" onSubmit={onSubmit} aria-label="Listing description generator form">
          <div className="form-row">
            <div className="field">
              <label htmlFor="propertyType">Property type</label>
              <select id="propertyType" value={form.propertyType} onChange={set('propertyType')}>{TYPES.map((t) => <option key={t} value={t}>{t}</option>)}</select>
            </div>
            <div className="field">
              <label htmlFor="tone">Tone</label>
              <select id="tone" value={form.tone} onChange={set('tone')}>
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="bedrooms">Bedrooms</label>
              <input id="bedrooms" type="number" value={form.bedrooms} onChange={set('bedrooms')} min="0" max="20" />
            </div>
            <div className="field">
              <label htmlFor="bathrooms">Bathrooms</label>
              <input id="bathrooms" type="number" value={form.bathrooms} onChange={set('bathrooms')} min="0" max="20" step="0.5" />
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="sqft">Size (sq ft)</label>
              <input id="sqft" type="number" value={form.sqft} onChange={set('sqft')} min="0" max="100000" />
            </div>
            <div className="field">
              <label htmlFor="location">Location</label>
              <input id="location" type="text" value={form.location} onChange={set('location')} placeholder="e.g. Austin, TX" maxLength={120} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="features">Key features <span className="hint">(comma separated)</span></label>
            <textarea id="features" rows="3" value={form.features} onChange={set('features')} placeholder="e.g. Updated kitchen, large backyard, garage, near top-rated schools" />
          </div>
          {error && <p className="field-error" role="alert">{error}</p>}
          <div className="form-actions">
            <button className="btn" type="submit">Generate listing</button>
          </div>
        </form>

        <div className="tool-output" aria-live="polite">
          {result ? (
            <>
              <h2>{result.headline}</h2>
              <ToolActions text={result.plainText} filename="listing-description.txt" />
              <div className="output-body">
                <p>{result.description}</p>
                <h3>Highlights</h3>
                <ul>{result.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
              </div>
            </>
          ) : (
            <>
              <h2>Your listing will appear here</h2>
              <p>Fill in the form and click “Generate listing”. Try a 3-bed, 2-bath house in Austin, TX with an updated kitchen and large backyard.</p>
            </>
          )}
        </div>
      </div>

      <section className="section">
        <div className="container guide-text">
          <h2>How to write a listing that sells</h2>
          <p>Buyers decide in seconds whether to keep reading. A good listing leads with the strongest facts — bedrooms, location, size — then gives one clear reason to book a viewing. The generator handles that structure; your job is to make sure the facts are right and the voice sounds like you.</p>
          <h3>Lead with facts, not adjectives</h3>
          <p>“Beautiful” and “stunning” tell a buyer nothing. “3 bedrooms, updated kitchen, 10 minutes from downtown” tells them whether the home fits their life. Use adjectives sparingly, and only where they describe something real.</p>
          <h3>Match the tone to the home</h3>
          <p>A luxury tone on a starter home feels dishonest, and buyers notice. A friendly tone works well for family homes; professional works almost everywhere. When in doubt, choose professional.</p>
          <h3>Check every fact before publishing</h3>
          <p>Room counts, square footage, school districts and included features must be accurate. A generated draft can invent nothing — but it can only repeat what you typed, so double-check your inputs too.</p>
          <div className="callout"><p><strong>Also useful:</strong> read the <Link to="/guides/ai-tools-for-real-estate-agents">AI tools for real estate agents guide</Link> for where AI helps — and where it can mislead buyers.</p></div>
          <h2>Frequently asked questions</h2>
          <div className="faq-list">
            {FAQ.map((f) => (
              <div className="faq-item" key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
