import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../../components/Seo'
import RelatedArticles from '../../components/RelatedArticles'
import { calculateCommission, formatUSD } from '../../lib/tools'

const FAQ = [
  { q: 'How is commission calculated?', a: 'Total commission = sale price × commission rate. The agent share = total commission × agent split. For example, a $250,000 sale at 6% is $15,000 total commission; with a 70% agent split the agent keeps $10,500 and the brokerage keeps $4,500.' },
  { q: 'What is a typical commission rate?', a: 'In the US, total commission is commonly 5–6% of the sale price, usually split between the listing agent and the buyer’s agent. Rates are negotiable and vary by market, property and agreement — always confirm the agreed rate in writing.' },
  { q: 'Is my data sent anywhere?', a: 'No. The calculation runs entirely in your browser. Nothing you enter is uploaded or stored.' },
]

export default function CommissionCalculator() {
  const [form, setForm] = useState({ salePrice: '250000', commissionPct: '6', agentSplitPct: '70' })
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    if (['salePrice', 'commissionPct', 'agentSplitPct'].some((k) => Number.isNaN(parseFloat(form[k])) || parseFloat(form[k]) < 0)) {
      setError('Please enter valid amounts (0 or more) in every field.')
      return
    }
    if (parseFloat(form.agentSplitPct) > 100) { setError('Agent split cannot be more than 100%.'); return }
    setError('')
    setResult(calculateCommission(form))
  }

  return (
    <>
      <Seo
        title="Free Commission Calculator for Real Estate | AidForWork"
        description="Work out commission on a sale in seconds — sale price times commission rate, split between agent and brokerage, with every figure shown. Free, no sign-up."
        path="/commission-calculator"
        faq={FAQ}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Commission Calculator', path: '/commission-calculator' }]}
      />
      <section className="tool-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link> / Commission Calculator</nav>
          <h1>Commission Calculator</h1>
          <p>Work out the commission on a sale — the total, the agent’s share and the brokerage’s share — in seconds.</p>
        </div>
      </section>

      <div className="container tool-layout">
        <form className="tool-form" onSubmit={onSubmit} aria-label="Commission calculator form">
          <div className="field">
            <label htmlFor="salePrice">Sale price ($)</label>
            <input id="salePrice" type="number" value={form.salePrice} onChange={set('salePrice')} min="0" max="1000000000" step="1000" />
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="commissionPct">Commission rate (%)</label>
              <input id="commissionPct" type="number" value={form.commissionPct} onChange={set('commissionPct')} min="0" max="100" step="0.1" />
              <span className="hint">Total commission on the sale. 5–6% is common in the US.</span>
            </div>
            <div className="field">
              <label htmlFor="agentSplitPct">Agent split (%)</label>
              <input id="agentSplitPct" type="number" value={form.agentSplitPct} onChange={set('agentSplitPct')} min="0" max="100" step="1" />
              <span className="hint">The agent’s share of the total commission.</span>
            </div>
          </div>
          {error && <p className="field-error" role="alert">{error}</p>}
          <div className="form-actions">
            <button className="btn" type="submit">Calculate commission</button>
          </div>
        </form>

        <div className="tool-output" aria-live="polite">
          {result ? (
            <>
              <h2>Your commission breakdown</h2>
              <div className="result-grid">
                <div className="result-box"><div className="result-label">Total commission</div><div className="result-value">{formatUSD(result.totalCommission)}</div></div>
                <div className="result-box"><div className="result-label">Agent share ({result.agentSplitPct}%)</div><div className="result-value">{formatUSD(result.agentShare)}</div></div>
                <div className="result-box"><div className="result-label">Brokerage share</div><div className="result-value">{formatUSD(result.brokerageShare)}</div></div>
                <div className="result-box"><div className="result-label">Sale price</div><div className="result-value">{formatUSD(result.salePrice)}</div></div>
              </div>
              <p>On a <strong>{formatUSD(result.salePrice)}</strong> sale at {result.commissionPct}% commission, the total commission is <strong>{formatUSD(result.totalCommission)}</strong>. With a {result.agentSplitPct}% agent split, the agent keeps {formatUSD(result.agentShare)} and the brokerage keeps {formatUSD(result.brokerageShare)}.</p>
              <p className="formula-note"><strong>How it is calculated:</strong> total commission = sale price × commission rate ÷ 100; agent share = total commission × agent split ÷ 100; brokerage share = total commission − agent share. Commission rates are negotiable and vary by market — confirm the agreed rate in writing.</p>
            </>
          ) : (
            <>
              <h2>Your commission breakdown will appear here</h2>
              <p>Fill in the form and click “Calculate commission”. Try it with a $250,000 sale at 6% and a 70% agent split.</p>
            </>
          )}
        </div>
      </div>

      <section className="section">
        <div className="container guide-text">
          <h2>How to use the commission calculator</h2>
          <p>Enter the sale price, the total commission rate and the agent’s split. The calculator shows the total commission and how it divides between the agent and the brokerage — the two numbers that matter most when you are checking a settlement statement or estimating earnings on a listing.</p>
          <h3>Remember the total is usually split twice</h3>
          <p>The commission rate on a sale is normally shared between the listing side and the buyer’s side first, and then each side splits again with its brokerage. This calculator handles the second split — the agent versus brokerage share — so enter the rate for your side of the deal, not the whole transaction, if you want your own number.</p>
          <h3>Confirm the rate in writing</h3>
          <p>Commission is negotiable and the agreed rate is what counts, not the local average. Check the listing agreement before relying on any estimate.</p>
          <div className="callout"><p><strong>Also useful:</strong> write the listing itself with the <Link to="/tools/listing-description-generator">listing description generator</Link>.</p></div>
          <h2>Frequently asked questions</h2>
          <div className="faq-list">
            {FAQ.map((f) => (
              <div className="faq-item" key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>
            ))}
          </div>
          <RelatedArticles category="realtors" />
        </div>
      </section>
    </>
  )
}
