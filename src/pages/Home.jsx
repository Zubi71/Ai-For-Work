import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

const HOME_FAQ = [
  { q: 'Are AidForWork tools really free?', a: 'Yes. Every tool on AidForWork is free to use with no sign-up and no account. You can generate as many lesson plans, quizzes, listings and cost estimates as you need.' },
  { q: 'Do I need to create an account to use the tools?', a: 'No. All tools run entirely in your browser. We do not ask for your name, email or payment details to use them.' },
  { q: 'Is my information sent to a server?', a: 'No. The text you type into a tool — lesson topics, property details, team size — stays on your device. Nothing you enter is uploaded or stored by us.' },
  { q: 'Can I use a generated lesson plan or listing in my work?', a: 'Yes, the outputs are yours to use. We recommend reviewing and adapting them first: check facts, adjust the tone, and make sure the details match your class, client or property.' },
  { q: 'Are the CRM prices in the calculator exact?', a: 'No — they are example prices shown so you can compare plans side by side. CRM vendors change their prices, so always confirm the current price on the vendor’s website before buying.' },
]

export default function Home() {
  return (
    <>
      <Seo
        title="Free AI Tools for Teachers, Accountants & Real Estate Agents | AidForWork"
        description="AidForWork offers free AI tools for teachers, accountants and real estate agents — lesson plan generator, grading and quiz generator, listing description generator and CRM cost calculator. No sign-up, instant results."
        path="/"
        faq={HOME_FAQ}
      />
      <section className="hero">
        <div className="container">
          <h1>Free AI tools that save working professionals time</h1>
          <p className="lead">AidForWork builds practical AI tools for teachers, accountants and real estate agents. Generate a lesson plan, a quiz, a property listing or a CRM cost estimate in under a minute — free, with no sign-up.</p>
          <div className="hero-cta">
            <Link className="btn" to="/tools/ai-lesson-plan-generator">Try the lesson plan generator</Link>
            <Link className="btn btn-secondary" to="/guides">Read the guides</Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="tools-heading">
        <div className="container">
          <p className="eyebrow">Free tools</p>
          <h2 id="tools-heading">Four tools, built for real work</h2>
          <p>Each tool runs entirely in your browser. Type in your details, get a finished draft, then copy, download or print it.</p>
          <div className="card-grid">
            <article className="card">
              <span className="tag">For teachers</span>
              <h3><Link to="/tools/ai-lesson-plan-generator">AI Lesson Plan Generator</Link></h3>
              <p>Turn a topic into a structured lesson plan with objectives, timed activities, assessment and homework.</p>
              <Link className="card-link" to="/tools/ai-lesson-plan-generator">Generate a lesson plan →</Link>
            </article>
            <article className="card">
              <span className="tag">For teachers</span>
              <h3><Link to="/tools/ai-grading-quiz-generator">AI Grading &amp; Quiz Generator</Link></h3>
              <p>Build a quiz on any topic — multiple choice, true/false or short answer — with an answer key included.</p>
              <Link className="card-link" to="/tools/ai-grading-quiz-generator">Generate a quiz →</Link>
            </article>
            <article className="card">
              <span className="tag">For real estate agents</span>
              <h3><Link to="/tools/listing-description-generator">Listing Description Generator</Link></h3>
              <p>Write a polished property headline, description and highlights from the details you already have.</p>
              <Link className="card-link" to="/tools/listing-description-generator">Write a listing →</Link>
            </article>
            <article className="card">
              <span className="tag">For small businesses</span>
              <h3><Link to="/tools/crm-cost-calculator">CRM Cost Calculator</Link></h3>
              <p>See what a CRM really costs your team per month and per year, and compare three popular options.</p>
              <Link className="card-link" to="/tools/crm-cost-calculator">Calculate CRM costs →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="who-heading">
        <div className="container">
          <p className="eyebrow">Who it is for</p>
          <h2 id="who-heading">Built for the people who do the work</h2>
          <div className="audience-grid">
            <div className="audience">
              <h3>Teachers</h3>
              <p>Planning takes hours every week. Our tools handle the first draft so you can focus on teaching.</p>
              <ul>
                <li>Lesson plans in minutes, not evenings</li>
                <li>Quizzes with answer keys ready to print</li>
                <li>Works for any grade and subject</li>
              </ul>
              <Link to="/guides/ai-tools-for-teachers">AI tools for teachers →</Link>
            </div>
            <div className="audience">
              <h3>Accountants</h3>
              <p>Software choices and costs add up. Compare options clearly before you commit your firm or your clients.</p>
              <ul>
                <li>CRM costs calculated honestly, with the formula shown</li>
                <li>Guides on choosing tools without the sales talk</li>
                <li>Built for small firms, not enterprises</li>
              </ul>
              <Link to="/guides/ai-tools-for-accountants">AI tools for accountants →</Link>
            </div>
            <div className="audience">
              <h3>Real estate agents</h3>
              <p>Every listing needs good copy, fast. Generate a strong first draft and polish it in your own voice.</p>
              <ul>
                <li>Headlines and descriptions in seconds</li>
                <li>Professional, friendly or luxury tone</li>
                <li>Highlights ready to paste into a listing</li>
              </ul>
              <Link to="/guides/ai-tools-for-real-estate-agents">AI tools for real estate agents →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="how-heading">
        <div className="container">
          <p className="eyebrow">How it works</p>
          <h2 id="how-heading">From idea to finished draft in three steps</h2>
          <div className="steps">
            <div className="step"><span className="step-num">1</span><h3>Enter your details</h3><p>Type the topic, property or team size. The tools only need the facts — nothing personal.</p></div>
            <div className="step"><span className="step-num">2</span><h3>Generate instantly</h3><p>Your result appears right away. Everything is generated on your device, so there is no waiting and no upload.</p></div>
            <div className="step"><span className="step-num">3</span><h3>Copy, download or print</h3><p>Take the result with you, then edit it to match your class, client or listing. The draft is a starting point, not the final word.</p></div>
          </div>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="guides-heading">
        <div className="container">
          <p className="eyebrow">Guides</p>
          <h2 id="guides-heading">Learn to use AI tools well</h2>
          <p>Short, practical guides — which tools are worth your time, how to check their output, and what to avoid.</p>
          <div className="card-grid">
            <article className="card">
              <h3><Link to="/guides/ai-tools-for-teachers">AI Tools for Teachers</Link></h3>
              <p>How teachers can use AI for planning, grading and quizzes — and where human judgement still matters most.</p>
              <Link className="card-link" to="/guides/ai-tools-for-teachers">Read the guide →</Link>
            </article>
            <article className="card">
              <h3><Link to="/guides/ai-tools-for-accountants">AI Tools for Accountants</Link></h3>
              <p>What AI can genuinely help with in a small accounting firm, and how to choose software without overspending.</p>
              <Link className="card-link" to="/guides/ai-tools-for-accountants">Read the guide →</Link>
            </article>
            <article className="card">
              <h3><Link to="/guides/ai-tools-for-real-estate-agents">AI Tools for Real Estate Agents</Link></h3>
              <p>Listing copy, follow-up and pricing research — where AI saves time, and where it can mislead buyers.</p>
              <Link className="card-link" to="/guides/ai-tools-for-real-estate-agents">Read the guide →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-heading">
        <div className="container">
          <h2 id="faq-heading">Frequently asked questions</h2>
          <div className="faq-list">
            {HOME_FAQ.map((f) => (
              <div className="faq-item" key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
