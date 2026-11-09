import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../../components/Seo'
import ToolActions from '../../components/ToolActions'
import { generateQuiz } from '../../lib/tools'

const FAQ = [
  { q: 'How does the AI quiz generator work?', a: 'Enter a topic, grade level, number of questions and question type. The tool builds a quiz with an answer key, entirely in your browser — nothing is uploaded.' },
  { q: 'What question types can I make?', a: 'Multiple choice (four options), true/false, or short answer with a sample answer and marking note.' },
  { q: 'How many questions can I generate?', a: 'From 1 to 20 questions per quiz. For a class quiz, 5 to 10 questions usually works best.' },
  { q: 'Are the answers always correct?', a: 'The answer key is generated from the same templates as the questions, so the key matches the quiz. For short-answer questions, the sample answer is a guide — accept any answer that covers the main idea accurately. Always check a quiz against your source material before using it for a grade.' },
  { q: 'Can I print the quiz?', a: 'Yes. Use the Print button after generating, or download the quiz as a .txt file and print it from any text editor.' },
]

const GRADES = ['Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'College / Adult']

export default function QuizGenerator() {
  const [form, setForm] = useState({ topic: '', grade: 'Grade 6', count: '5', type: 'mcq' })
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.topic.trim()) { setError('Please enter a quiz topic.'); return }
    setError('')
    setResult(generateQuiz(form))
  }

  const typeLabel = result ? (result.type === 'mcq' ? 'Multiple choice' : result.type === 'true-false' ? 'True / False' : 'Short answer') : ''

  return (
    <>
      <Seo
        title="Free AI Quiz Generator with Answer Key | AidForWork"
        description="Create a quiz on any topic in seconds — multiple choice, true/false or short answer, with a ready answer key. Free, no sign-up, print or download it today."
        path="/tools/ai-grading-quiz-generator"
        faq={FAQ}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'AI Grading & Quiz Generator', path: '/tools/ai-grading-quiz-generator' }]}
      />
      <section className="tool-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link> / AI Grading &amp; Quiz Generator</nav>
          <h1>AI Grading &amp; Quiz Generator</h1>
          <p>Build a ready-to-use quiz on any topic, with an answer key included. Choose multiple choice, true/false or short answer — free, no sign-up.</p>
        </div>
      </section>

      <div className="container tool-layout">
        <form className="tool-form" onSubmit={onSubmit} aria-label="Quiz generator form">
          <div className="field">
            <label htmlFor="topic">Quiz topic</label>
            <input id="topic" type="text" value={form.topic} onChange={set('topic')} placeholder="e.g. The Solar System, World War II, Fractions" maxLength={120} />
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="grade">Grade level</label>
              <select id="grade" value={form.grade} onChange={set('grade')}>{GRADES.map((g) => <option key={g} value={g}>{g}</option>)}</select>
            </div>
            <div className="field">
              <label htmlFor="count">Number of questions</label>
              <input id="count" type="number" value={form.count} onChange={set('count')} min="1" max="20" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="type">Question type</label>
            <select id="type" value={form.type} onChange={set('type')}>
              <option value="mcq">Multiple choice (4 options)</option>
              <option value="true-false">True / False</option>
              <option value="short-answer">Short answer</option>
            </select>
          </div>
          {error && <p className="field-error" role="alert">{error}</p>}
          <div className="form-actions">
            <button className="btn" type="submit">Generate quiz</button>
          </div>
        </form>

        <div className="tool-output" aria-live="polite">
          {result ? (
            <>
              <h2>{result.title} — {typeLabel}</h2>
              <ToolActions text={result.plainText} filename="quiz.txt" />
              {result.questions.map((q) => (
                <div className="quiz-q" key={q.number}>
                  <p>{q.number}. {q.question}</p>
                  {q.options && (
                    <ul>{q.options.map((o) => <li key={o.letter}><strong>{o.letter}.</strong> {o.text}</li>)}</ul>
                  )}
                </div>
              ))}
              <div className="answer-key">
                <h3>Answer key</h3>
                <ul>
                  {result.questions.map((q) => (
                    <li key={q.number}><strong>{q.number}.</strong> {q.answer}{q.explanation ? ` — ${q.explanation}` : ''}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <h2>Your quiz will appear here</h2>
              <p>Fill in the form and click “Generate quiz”. Try it with <strong>The Solar System</strong>, 5 multiple-choice questions.</p>
            </>
          )}
        </div>
      </div>

      <section className="section">
        <div className="container guide-text">
          <h2>How to use the quiz generator</h2>
          <p>A good quiz checks understanding, not memory of the textbook's exact words. Start with the topic and the level, keep the number of questions small, and mix question types when you can — multiple choice for quick checks, short answer when you want to see reasoning.</p>
          <h3>Check the answer key</h3>
          <p>Before you hand a quiz to students, read every question and its answer. If a question is ambiguous, rewrite it in your own words. If a short-answer sample answer misses something important, add it. The generator gives you the structure; the accuracy is your job, especially for graded work.</p>
          <h3>Use quizzes for learning, not just testing</h3>
          <p>Short, low-stakes quizzes help students remember far more than re-reading. Try a five-question quiz at the start of a lesson to review last week, or at the end as an exit ticket.</p>
          <div className="callout"><p><strong>Also useful:</strong> plan the lesson first with the <Link to="/tools/ai-lesson-plan-generator">AI Lesson Plan Generator</Link>, then build the quiz for the same topic.</p></div>
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
