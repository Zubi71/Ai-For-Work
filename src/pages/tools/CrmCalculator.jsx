import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../../components/Seo'
import { calculateCrm, formatUSD } from '../../lib/tools'

const FAQ = [
  { q: 'How does the CRM cost calculator work?', a: 'Enter your team size, the price per user per month, billing period and any one-time setup fee. The calculator shows your monthly cost, annual cost, first-year total and cost per user — and compares three example CRMs at the same team size.' },
  { q: 'What is the annual billing discount?', a: 'Annual billing applies a 20% discount to the per-user price: effective price = price × 0.80. So 5 users at $20 per user per month on annual billing costs 5 × $16 = $80 per month, or $960 per year before any setup fee.' },
  { q: 'Are the comparison prices exact?', a: 'No. HubSpot Starter ($20), Zoho CRM ($14) and Pipedrive ($24) are example per-user prices shown for comparison only. Vendors change prices and run promotions, so confirm the current price on the vendor’s website before buying.' },
  { q: 'What is included in the first-year total?', a: 'The first-year total is the annual subscription cost plus the one-time setup fee you entered. It does not include training, migration or add-ons — ask the vendor about those separately.' },
  { q: 'Is my data sent anywhere?', a: 'No. The calculation runs entirely in your browser. Nothing you enter is uploaded or stored.' },
]

export default function CrmCalculator() {
  const [form, setForm] = useState({ users: '5', pricePerUser: '20', billing: 'annual', setupFee: '0' })
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const users = parseInt(form.users, 10)
    const price = parseFloat(form.pricePerUser)
    if (!users || users < 1) { setError('Please enter at least 1 user.'); return }
    if (Number.isNaN(price) || price < 0) { setError('Please enter a valid price per user.'); return }
    setError('')
    setResult(calculateCrm(form))
  }

  return (
    <>
      <Seo
        title="Free CRM Cost Calculator — Monthly & Annual Costs | AidForWork"
        description="Calculate what a CRM really costs your team: monthly and annual cost, first-year total and cost per user, with an example comparison of HubSpot, Zoho and Pipedrive. Free, no sign-up."
        path="/tools/crm-cost-calculator"
        faq={FAQ}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'CRM Cost Calculator', path: '/tools/crm-cost-calculator' }]}
      />
      <section className="tool-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link> / CRM Cost Calculator</nav>
          <h1>CRM Cost Calculator</h1>
          <p>See what a CRM really costs your team — monthly, annually, and in the first year — then compare three popular options side by side.</p>
        </div>
      </section>

      <div className="container tool-layout">
        <form className="tool-form" onSubmit={onSubmit} aria-label="CRM cost calculator form">
          <div className="form-row">
            <div className="field">
              <label htmlFor="users">Number of users</label>
              <input id="users" type="number" value={form.users} onChange={set('users')} min="1" max="1000" />
            </div>
            <div className="field">
              <label htmlFor="pricePerUser">Price per user / month ($)</label>
              <input id="pricePerUser" type="number" value={form.pricePerUser} onChange={set('pricePerUser')} min="0" max="1000" step="0.01" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="billing">Billing period</label>
            <select id="billing" value={form.billing} onChange={set('billing')}>
              <option value="annual">Annual billing (20% discount)</option>
              <option value="monthly">Monthly billing (no discount)</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="setupFee">One-time setup fee ($)</label>
            <input id="setupFee" type="number" value={form.setupFee} onChange={set('setupFee')} min="0" max="100000" step="0.01" />
            <span className="hint">Enter 0 if there is no setup fee.</span>
          </div>
          {error && <p className="field-error" role="alert">{error}</p>}
          <div className="form-actions">
            <button className="btn" type="submit">Calculate costs</button>
          </div>
        </form>

        <div className="tool-output" aria-live="polite">
          {result ? (
            <>
              <h2>Your CRM cost estimate</h2>
              <div className="result-grid">
                <div className="result-box"><div className="result-label">Monthly cost</div><div className="result-value">{formatUSD(result.monthly)}</div></div>
                <div className="result-box"><div className="result-label">Annual cost</div><div className="result-value">{formatUSD(result.annual)}</div></div>
                <div className="result-box"><div className="result-label">First-year total</div><div className="result-value">{formatUSD(result.firstYear)}</div></div>
                <div className="result-box"><div className="result-label">Per user / month</div><div className="result-value">{formatUSD(result.perUserPerMonth)}</div></div>
              </div>
              <p><strong>{result.users} users</strong> at {formatUSD(result.pricePerUser)} per user/month, {result.billing} billing{result.billing === 'annual' ? ` (20% discount applied, effective ${formatUSD(result.effectivePricePerUser)} per user/month)` : ''}{result.setupFee > 0 ? `, plus a ${formatUSD(result.setupFee)} setup fee` : ''}.</p>
              <h3>Example comparison — same team, same billing</h3>
              <table className="data-table">
                <thead><tr><th scope="col">CRM</th><th scope="col">Example price / user</th><th scope="col">Monthly</th><th scope="col">Annual</th></tr></thead>
                <tbody>
                  <tr><td><strong>Your price</strong></td><td>{formatUSD(result.pricePerUser)}</td><td>{formatUSD(result.monthly)}</td><td>{formatUSD(result.annual)}</td></tr>
                  {result.comparison.map((c) => (
                    <tr key={c.name}><td>{c.name}</td><td>{formatUSD(c.pricePerUser)}</td><td>{formatUSD(c.monthly)}</td><td>{formatUSD(c.annual)}</td></tr>
                  ))}
                </tbody>
              </table>
              <p className="formula-note"><strong>How it is calculated:</strong> annual billing — effective price = price × 0.80; monthly cost = users × effective price; annual cost = monthly cost × 12. Monthly billing — monthly cost = users × price; annual cost = monthly cost × 12. First-year total = annual cost + setup fee. Comparison prices are examples only — confirm current prices on each vendor’s website.</p>
            </>
          ) : (
            <>
              <h2>Your estimate will appear here</h2>
              <p>Fill in the form and click “Calculate costs”. Try it with 5 users at $20 per user per month on annual billing.</p>
            </>
          )}
        </div>
      </div>

      <section className="section">
        <div className="container guide-text">
          <h2>How to use the CRM cost calculator</h2>
          <p>CRM pricing looks simple — a price per user per month — but the real cost is the annual total, and that is where teams get surprised. This calculator shows the full picture: what you pay each month, what you pay over a year, and what the first year costs once setup is included.</p>
          <h3>Watch the billing period</h3>
          <p>Most CRMs discount annual billing by around 20%. That is real money on a team of ten, but it also means paying a year up front. If you are trying a CRM for the first time, monthly billing costs more per month but lets you leave after a month or two.</p>
          <h3>Count everyone who needs a seat</h3>
          <p>The most common budgeting mistake is counting only the sales team. If managers, support staff or an assistant also need access, they need seats too — and the price multiplies.</p>
          <h3>Ask about the costs that are not in the price</h3>
          <p>Setup, data migration, training and add-ons (extra storage, advanced reporting, phone features) are often charged separately. Use the setup fee field for one-time costs you know about, and ask the vendor about the rest before signing.</p>
          <div className="callout"><p><strong>Also useful:</strong> accountants choosing software for a firm should read the <Link to="/guides/ai-tools-for-accountants">AI tools for accountants guide</Link>.</p></div>
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
