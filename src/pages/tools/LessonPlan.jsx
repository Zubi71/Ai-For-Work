import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../../components/Seo'
import ToolActions from '../../components/ToolActions'
import { generateLessonPlan } from '../../lib/tools'

const FAQ = [
  { q: 'How does the AI lesson plan generator work?', a: 'You enter the grade level, subject, topic, lesson length and learning objectives. The tool then builds a structured plan — objectives, warm-up, two timed main activities, assessment and homework — from classroom-tested activity templates, entirely in your browser.' },
  { q: 'Can I use the lesson plan as it is?', a: 'Treat it as a strong first draft. Check the examples, adjust the timings for your class, and replace any activity that does not fit your students or your curriculum.' },
  { q: 'What lesson lengths does it support?', a: 'Any lesson from 20 to 120 minutes. The warm-up takes about 10% of the time, assessment about 15%, and the rest is split between the two main activities.' },
  { q: 'Is my lesson topic sent anywhere?', a: 'No. The plan is generated on your device. Nothing you type is uploaded, stored or shared.' },
  { q: 'Does it work for any subject?', a: 'Yes. The tool has activity templates for maths, science and English as well as general activities that work across subjects.' },
]

const GRADES = ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'College / Adult']
const SUBJECTS = ['Mathematics', 'Science', 'English / Language Arts', 'History / Social Studies', 'Geography', 'Art', 'Computer Science', 'General']

export default function LessonPlan() {
  const [form, setForm] = useState({ grade: 'Grade 5', subject: 'Science', topic: '', length: '45', objectives: '' })
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.topic.trim()) { setError('Please enter a lesson topic.'); return }
    setError('')
    setResult(generateLessonPlan(form))
  }

  return (
    <>
      <Seo
        title="Free AI Lesson Plan Generator for Teachers | AidForWork"
        description="Generate a structured lesson plan in seconds — objectives, warm-up, timed activities, assessment and homework. Free for any grade and subject, no sign-up."
        path="/tools/ai-lesson-plan-generator"
        faq={FAQ}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'AI Lesson Plan Generator', path: '/tools/ai-lesson-plan-generator' }]}
      />
      <section className="tool-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link> / AI Lesson Plan Generator</nav>
          <h1>AI Lesson Plan Generator</h1>
          <p>Turn a topic into a complete, timed lesson plan — objectives, warm-up, activities, assessment and homework. Free, no sign-up, and your topic never leaves your device.</p>
        </div>
      </section>

      <div className="container tool-layout">
        <form className="tool-form" onSubmit={onSubmit} aria-label="Lesson plan generator form">
          <div className="form-row">
            <div className="field">
              <label htmlFor="grade">Grade level</label>
              <select id="grade" value={form.grade} onChange={set('grade')}>{GRADES.map((g) => <option key={g} value={g}>{g}</option>)}</select>
            </div>
            <div className="field">
              <label htmlFor="subject">Subject</label>
              <select id="subject" value={form.subject} onChange={set('subject')}>{SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}</select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="topic">Lesson topic</label>
            <input id="topic" type="text" value={form.topic} onChange={set('topic')} placeholder="e.g. Photosynthesis, Fractions, The Water Cycle" maxLength={120} />
            <span className="hint">Be specific — a clear topic gives a much better plan.</span>
          </div>
          <div className="field">
            <label htmlFor="length">Lesson length (minutes)</label>
            <input id="length" type="number" value={form.length} onChange={set('length')} min="20" max="120" step="5" />
            <span className="hint">Between 20 and 120 minutes.</span>
          </div>
          <div className="field">
            <label htmlFor="objectives">Learning objectives <span className="hint">(optional — one per line)</span></label>
            <textarea id="objectives" rows="3" value={form.objectives} onChange={set('objectives')} placeholder={'e.g.\nExplain how plants make food\nIdentify the parts of a leaf'} />
          </div>
          {error && <p className="field-error" role="alert">{error}</p>}
          <div className="form-actions">
            <button className="btn" type="submit">Generate lesson plan</button>
          </div>
        </form>

        <div className="tool-output" aria-live="polite">
          {result ? (
            <>
              <h2>{result.title}</h2>
              <ToolActions text={result.plainText} filename="lesson-plan.txt" />
              <div className="output-body">
                {result.sections.map((s) => (
                  <div key={s.heading}>
                    <h3>{s.heading}</h3>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{s.text}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2>Your lesson plan will appear here</h2>
              <p>Fill in the form and click “Generate lesson plan”. Try it with a topic like <strong>Photosynthesis</strong> for Grade 5 Science, 45 minutes.</p>
            </>
          )}
        </div>
      </div>

      <section className="section">
        <div className="container guide-text">
          <h2>How to use the lesson plan generator</h2>
          <p>Good lesson planning is mostly structure: a clear goal, a short warm-up, focused practice, and a quick check at the end. This tool builds that structure for you so you can spend your time on the parts that need your judgement — the examples, the questions you will ask, and how you will support students who struggle.</p>
          <h3>Write a specific topic</h3>
          <p>“Fractions” is vague. “Adding fractions with different denominators” gives the tool — and you — something concrete to plan around. The same applies to objectives: “students will understand photosynthesis” is hard to measure, while “students will explain in two sentences how a plant makes food” tells you exactly what success looks like.</p>
          <h3>Keep the timings honest</h3>
          <p>The plan reserves about 10% of the lesson for the warm-up and 15% for the exit ticket. If your class needs more time on the main activity, shorten the warm-up rather than cutting the assessment — the exit ticket is how you know whether the lesson worked.</p>
          <h3>Always review before you teach</h3>
          <p>The activities are templates, not a script. Read the plan, swap in your own examples, and check that the level matches your students. A generated plan saves you the blank page; it does not replace knowing your class.</p>
          <div className="callout"><p><strong>Also useful:</strong> pair this with the <Link to="/tools/ai-grading-quiz-generator">AI Grading &amp; Quiz Generator</Link> to make a short quiz for the same topic.</p></div>
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
