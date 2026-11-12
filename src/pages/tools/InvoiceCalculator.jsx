import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../../components/Seo'
import RelatedArticles from '../../components/RelatedArticles'
import { calculateInvoice, formatUSD } from '../../lib/tools'

const FAQ = [
  { q: 'How is the invoice total worked out?', a: 'Labour = hours × hourly rate. Subtotal = labour + expenses. Tax = subtotal × tax rate. Total = subtotal + tax. For example, 10 hours × $50 plus $100 of expenses is a $600 subtotal; 5% tax adds $30, for a $630.00 total.' },
  { q: 'Should I charge tax on an invoice?', a: 'It depends on where you work and what you sell — some freelancers must collect sales tax or VAT, others do not. The calculator simply applies the rate you enter, so check your local tax rules (or ask your accountant) before deciding what rate to use.' },
  { q: 'Is my data sent anywhere?', a: 'No. The calculation runs entirely in your browser. Nothing you enter is uploaded or stored.' },
]

export default function InvoiceCalculator() {
  const [form, setForm] = useState({ hours: '10', rate: '50', expenses: '100', taxRate: '5' })
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    if (['hours', 'rate', 'expenses', 'taxRate'].some((k) => Number.isNaN(parseFloat(form[k])) || parseFloat(form[k]) < 0)) {
      setError('Please enter valid amounts (0 or more) in every field.')
      return
    }
    setError('')
    setResult(calculateInvoice(form))
  }

  return (
    <>
      <Seo
        title="Free Invoice Calculator for Freelancers | AidForWork"
        description="Build an invoice total in seconds — hours times your rate, plus expenses and tax, with every line shown. Free for freelancers, no sign-up, and ready to send."
        path="/invoice-calculator"
        faq={FAQ}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Invoice Calculator', path: '/invoice-calculator' }]}
      />
      <section className="tool-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link> / Invoice Calculator</nav>
          <h1>Invoice Calculator</h1>
          <p>Work out what to charge — hours at your rate, plus expenses and tax — with every line of the invoice shown.</p>
        </div>
      </section>

      <div className="container tool-layout">
        <form className="tool-form" onSubmit={onSubmit} aria-label="Invoice calculator form">
          <div className="form-row">
            <div className="field">
              <label htmlFor="hours">Hours worked</label>
              <input id="hours" type="number" value={form.hours} onChange={set('hours')} min="0" max="10000" step="0.5" />
            </div>
            <div className="field">
              <label htmlFor="rate">Hourly rate ($)</label>
              <input id="rate" type="number" value={form.rate} onChange={set('rate')} min="0" max="10000" step="0.01" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="expenses">Expenses ($)</label>
            <input id="expenses" type="number" value={form.expenses} onChange={set('expenses')} min="0" max="1000000" step="0.01" />
            <span className="hint">Materials, travel, software or anything else you paid for on this job. Enter 0 if there are none.</span>
          </div>
          <div className="field">
            <label htmlFor="taxRate">Tax rate (%)</label>
            <input id="taxRate" type="number" value={form.taxRate} onChange={set('taxRate')} min="0" max="100" step="0.01" />
            <span className="hint">Sales tax or VAT to add. Enter 0 if no tax applies.</span>
          </div>
          {error && <p className="field-error" role="alert">{error}</p>}
          <div className="form-actions">
            <button className="btn" type="submit">Calculate invoice</button>
          </div>
        </form>

        <div className="tool-output" aria-live="polite">
          {result ? (
            <>
              <h2>Your invoice total</h2>
              <div className="result-grid">
                <div className="result-box"><div className="result-label">Labour</div><div className="result-value">{formatUSD(result.labour)}</div></div>
                <div className="result-box"><div className="result-label">Subtotal</div><div className="result-value">{formatUSD(result.subtotal)}</div></div>
                <div className="result-box"><div className="result-label">Tax ({result.taxRate}%)</div><div className="result-value">{formatUSD(result.taxAmount)}</div></div>
                <div className="result-box"><div className="result-label">Total due</div><div className="result-value">{formatUSD(result.total)}</div></div>
              </div>
              <p><strong>{result.hours} hours</strong> at {formatUSD(result.rate)} per hour is {formatUSD(result.labour)}; plus {formatUSD(result.expenses)} of expenses gives a subtotal of {formatUSD(result.subtotal)}. Tax at {result.taxRate}% adds {formatUSD(result.taxAmount)}, for a total of <strong>{formatUSD(result.total)}</strong>.</p>
              <p className="formula-note"><strong>How it is calculated:</strong> labour = hours × hourly rate; subtotal = labour + expenses; tax = subtotal × tax rate ÷ 100; total = subtotal + tax. All amounts are rounded to two decimal places.</p>
            </>
          ) : (
            <>
              <h2>Your invoice total will appear here</h2>
              <p>Fill in the form and click “Calculate invoice”. Try it with 10 hours at $50, $100 of expenses and 5% tax.</p>
            </>
          )}
        </div>
      </div>

      <section className="section">
        <div className="container guide-text">
          <h2>How to use the invoice calculator</h2>
          <p>Enter the hours you worked, your hourly rate, any expenses, and the tax rate if one applies. The calculator breaks the invoice into lines — labour, subtotal, tax and total — so you and your client can both see exactly how the total was reached.</p>
          <h3>List expenses separately</h3>
          <p>Keeping expenses on their own line is clearer for the client and easier for your own records. If a client reimburses expenses, they can see the exact amount instead of a single blended figure.</p>
          <h3>Check the tax rules before you send it</h3>
          <p>Whether you add tax depends on your location, your registration status and what you sold. If you are not sure, ask your accountant — charging the wrong tax rate causes more trouble than leaving the line out and adding it later.</p>
          <div className="callout"><p><strong>Also useful:</strong> not sure what hourly rate to charge? Work it out with the <Link to="/hourly-rate-calculator">freelance hourly rate calculator</Link>.</p></div>
          <h2>Frequently asked questions</h2>
          <div className="faq-list">
            {FAQ.map((f) => (
              <div className="faq-item" key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>
            ))}
          </div>
          <RelatedArticles category="accountants" />
        </div>
      </section>
    </>
  )
}
