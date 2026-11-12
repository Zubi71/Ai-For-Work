import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../../components/Seo'
import AdSlot from '../../components/AdSlot'
import { calculateHourlyRate, formatUSD } from '../../lib/tools'

const FAQ = [
  { q: 'How is my hourly rate calculated?', a: 'Hourly rate = (target salary × (1 + overhead)) ÷ billable hours per year. For example, a $92,000 salary with 35% overhead is $124,200 to cover; divided by 1,960 billable hours (40 hours × 49 weeks) that is $63.37 per hour.' },
  { q: 'What counts as overhead?', a: 'Everything your salary alone does not cover: taxes, insurance, software subscriptions, equipment, unpaid admin time, holidays and sick days, and time spent finding clients. Most freelancers add 25–40% on top of their target salary.' },
  { q: 'How many billable hours should I use?', a: 'Start with 1,960 — 40 hours a week for 49 weeks, leaving 3 weeks off. Most freelancers only bill 60–80% of their working hours, because admin, marketing and gaps between jobs are not billable. Use your real billable hours, not your total working hours.' },
]

export default function HourlyRateCalculator() {
  const [form, setForm] = useState({ salary: '92000', overheadPct: '35', billableHours: '1960' })
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const salary = parseFloat(form.salary)
    const hours = parseFloat(form.billableHours)
    if (Number.isNaN(salary) || salary <= 0) { setError('Please enter a target annual salary greater than 0.'); return }
    if (Number.isNaN(hours) || hours <= 0) { setError('Please enter billable hours greater than 0.'); return }
    if (Number.isNaN(parseFloat(form.overheadPct)) || parseFloat(form.overheadPct) < 0) { setError('Please enter a valid overhead percentage.'); return }
    setError('')
    setResult(calculateHourlyRate(form))
  }

  return (
    <>
      <Seo
        title="Free Freelance Hourly Rate Calculator | AidForWork"
        description="Find the hourly rate that covers your salary and overhead — enter your target pay, overhead and billable hours to get your true rate. Free, no sign-up."
        path="/hourly-rate-calculator"
        faq={FAQ}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Hourly Rate Calculator', path: '/hourly-rate-calculator' }]}
      />
      <section className="tool-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link> / Hourly Rate Calculator</nav>
          <h1>Freelance Hourly Rate Calculator</h1>
          <p>Find the rate that actually covers your costs — your target salary plus overhead, divided by the hours you really bill.</p>
        </div>
      </section>

      <div className="container"><AdSlot position="below_heading" /></div>

      <div className="container tool-layout">
        <form className="tool-form" onSubmit={onSubmit} aria-label="Hourly rate calculator form">
          <div className="field">
            <label htmlFor="salary">Target annual salary ($)</label>
            <input id="salary" type="number" value={form.salary} onChange={set('salary')} min="0" max="10000000" step="1000" />
            <span className="hint">What you want to take home in a year, before overhead.</span>
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="overheadPct">Overhead (%)</label>
              <input id="overheadPct" type="number" value={form.overheadPct} onChange={set('overheadPct')} min="0" max="200" step="1" />
              <span className="hint">Taxes, insurance, software and unpaid time. 25–40% is typical.</span>
            </div>
            <div className="field">
              <label htmlFor="billableHours">Billable hours / year</label>
              <input id="billableHours" type="number" value={form.billableHours} onChange={set('billableHours')} min="1" max="4000" step="1" />
              <span className="hint">1,960 = 40 hours × 49 weeks (3 weeks off).</span>
            </div>
          </div>
          {error && <p className="field-error" role="alert">{error}</p>}
          <div className="form-actions">
            <button className="btn" type="submit">Calculate my rate</button>
          </div>
        </form>

        <div className="tool-output" aria-live="polite">
        <AdSlot position="before_result" />
          {result ? (
            <>
              <h2>Your hourly rate</h2>
              <div className="result-grid">
                <div className="result-box"><div className="result-label">Hourly rate</div><div className="result-value">{formatUSD(result.hourly)}/hr</div></div>
                <div className="result-box"><div className="result-label">Annual total to cover</div><div className="result-value">{formatUSD(result.annualTotal)}</div></div>
                <div className="result-box"><div className="result-label">Monthly at this rate</div><div className="result-value">{formatUSD(result.monthly)}</div></div>
                <div className="result-box"><div className="result-label">Overhead amount</div><div className="result-value">{formatUSD(result.annualTotal - result.salary)}</div></div>
              </div>
              <p>To take home <strong>{formatUSD(result.salary)}</strong> a year with {result.overheadPct}% overhead, you need to bring in {formatUSD(result.annualTotal)} a year. Across {result.billableHours.toLocaleString('en-US')} billable hours, that is <strong>{formatUSD(result.hourly)} per hour</strong>.</p>
              <p className="formula-note"><strong>How it is calculated:</strong> annual total = salary × (1 + overhead ÷ 100); hourly rate = annual total ÷ billable hours; monthly = annual total ÷ 12. This is a starting point — market rates, experience and demand in your field matter too.</p>
            </>
          ) : (
            <>
              <h2>Your hourly rate will appear here</h2>
              <p>Fill in the form and click “Calculate my rate”. Try it with a $92,000 salary, 35% overhead and 1,960 billable hours.</p>
            </>
          )}
        <AdSlot position="below_result" />
        </div>
      </div>

      <section className="section">
        <div className="container guide-text">
          <h2>How to use the hourly rate calculator</h2>
          <p>Most freelancers undercharge because they divide their old salary by 2,080 working hours and stop there. That misses two things: the overhead an employer used to pay for you, and the hours you work but cannot bill. This calculator adds both back in.</p>
          <h3>Start from the salary you want, not the one you had</h3>
          <p>Enter the annual pay you want to take home. Then add overhead — taxes, insurance, software, equipment, holidays, sick days and the time you spend on admin and finding work. For most freelancers that is 25–40% on top of salary.</p>
          <h3>Use billable hours, not working hours</h3>
          <p>A full-time year is about 2,080 working hours, but nobody bills all of them. 1,960 billable hours already assumes three weeks off; if a quarter of your week goes to admin and marketing, your real billable hours are closer to 1,500 — and your rate should be higher to match.</p>
          <div className="callout"><p><strong>Also useful:</strong> once you know your rate, build the invoice with the <Link to="/invoice-calculator">invoice calculator</Link>.</p></div>
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
