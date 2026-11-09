import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../../components/Seo'
import { calculateGrade } from '../../lib/tools'

const FAQ = [
  { q: 'How is the percentage calculated?', a: 'Percentage = score ÷ total marks × 100. For example, 42 out of 50 is 42 ÷ 50 × 100 = 84.0%.' },
  { q: 'What letter grade will I get?', a: 'This calculator uses the standard US grade scale: A is 90% and above, B is 80–89%, C is 70–79%, D is 60–69%, and F is below 60%. Schools and teachers sometimes use different cut-offs, so check your own grading scale too.' },
  { q: 'Is my data sent anywhere?', a: 'No. The calculation runs entirely in your browser. Nothing you enter is uploaded or stored.' },
]

const GRADE_SCALE = [
  { grade: 'A', range: '90% – 100%' },
  { grade: 'B', range: '80% – 89%' },
  { grade: 'C', range: '70% – 79%' },
  { grade: 'D', range: '60% – 69%' },
  { grade: 'F', range: 'Below 60%' },
]

export default function GradeCalculator() {
  const [form, setForm] = useState({ score: '42', total: '50' })
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const total = parseFloat(form.total)
    const score = parseFloat(form.score)
    if (Number.isNaN(total) || total <= 0) { setError('Please enter total marks greater than 0.'); return }
    if (Number.isNaN(score) || score < 0) { setError('Please enter a valid score.'); return }
    setError('')
    setResult(calculateGrade(form))
  }

  return (
    <>
      <Seo
        title="Free Online Grade Calculator & Letter Grade | AidForWork"
        description="Work out a grade in seconds — enter the score and total marks to get the percentage and letter grade, with the full grade scale explained. Free, no sign-up."
        path="/grade-calculator"
        faq={FAQ}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Grade Calculator', path: '/grade-calculator' }]}
      />
      <section className="tool-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link> / Grade Calculator</nav>
          <h1>Grade Calculator</h1>
          <p>Turn a score into a percentage and a letter grade in seconds — for a test, an assignment, or a whole course.</p>
        </div>
      </section>

      <div className="container tool-layout">
        <form className="tool-form" onSubmit={onSubmit} aria-label="Grade calculator form">
          <div className="form-row">
            <div className="field">
              <label htmlFor="score">Your score</label>
              <input id="score" type="number" value={form.score} onChange={set('score')} min="0" max="100000" step="0.01" />
            </div>
            <div className="field">
              <label htmlFor="total">Total marks</label>
              <input id="total" type="number" value={form.total} onChange={set('total')} min="0" max="100000" step="0.01" />
              <span className="hint">The maximum marks for the test or assignment.</span>
            </div>
          </div>
          {error && <p className="field-error" role="alert">{error}</p>}
          <div className="form-actions">
            <button className="btn" type="submit">Calculate grade</button>
          </div>
        </form>

        <div className="tool-output" aria-live="polite">
          {result ? (
            <>
              <h2>Your grade</h2>
              <div className="result-grid">
                <div className="result-box"><div className="result-label">Percentage</div><div className="result-value">{result.percentage.toFixed(1)}%</div></div>
                <div className="result-box"><div className="result-label">Letter grade</div><div className="result-value">{result.grade}</div></div>
              </div>
              <p><strong>{result.score} out of {result.total}</strong> is {result.percentage.toFixed(1)}%, which is a grade <strong>{result.grade}</strong> on the standard scale.</p>
              <h3>Grade scale used</h3>
              <table className="data-table">
                <thead><tr><th scope="col">Letter grade</th><th scope="col">Percentage</th></tr></thead>
                <tbody>
                  {GRADE_SCALE.map((g) => (
                    <tr key={g.grade}><td><strong>{g.grade}</strong></td><td>{g.range}</td></tr>
                  ))}
                </tbody>
              </table>
              <p className="formula-note"><strong>How it is calculated:</strong> percentage = score ÷ total marks × 100. The letter grade follows the standard US scale (A 90%+, B 80–89%, C 70–79%, D 60–69%, F below 60%). Some schools use different cut-offs — check your own grading scale if yours differs.</p>
            </>
          ) : (
            <>
              <h2>Your grade will appear here</h2>
              <p>Fill in the form and click “Calculate grade”. Try it with a score of 42 out of 50.</p>
            </>
          )}
        </div>
      </div>

      <section className="section">
        <div className="container guide-text">
          <h2>How to use the grade calculator</h2>
          <p>Enter the marks you scored and the total marks possible. The calculator gives you the percentage and the letter grade straight away — useful for a quick check after a test, or for working out what a student needs on the next assignment.</p>
          <h3>Checking what you need for the next grade</h3>
          <p>To find the score needed for a higher grade, multiply the total marks by the grade boundary. For a B on a 50-mark test you need 80% of 50, which is 40 marks. For an A you need 90% of 50, which is 45 marks.</p>
          <h3>Grading scales can differ</h3>
          <p>This calculator uses the standard US scale. Some teachers grade on a curve, use plus/minus grades (B+, A−), or set their own boundaries. The percentage is always the same — only the letter attached to it can change.</p>
          <div className="callout"><p><strong>Also useful:</strong> teachers can generate a full quiz with an answer key using the <Link to="/tools/ai-grading-quiz-generator">AI grading &amp; quiz generator</Link>.</p></div>
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
