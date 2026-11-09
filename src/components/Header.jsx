import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={close} aria-label="AidForWork — home">
          <img src="/logo.webp" alt="AidForWork logo" width="180" height="60" fetchpriority="high" />
        </Link>
        <button
          className="nav-toggle"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>
        <nav className={open ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/tools/ai-lesson-plan-generator" onClick={close}>Lesson Plans</NavLink>
          <NavLink to="/tools/ai-grading-quiz-generator" onClick={close}>Quizzes</NavLink>
          <NavLink to="/tools/listing-description-generator" onClick={close}>Listings</NavLink>
          <NavLink to="/tools/crm-cost-calculator" onClick={close}>CRM Costs</NavLink>
          <NavLink to="/grade-calculator" onClick={close}>Grade</NavLink>
          <NavLink to="/invoice-calculator" onClick={close}>Invoice</NavLink>
          <NavLink to="/hourly-rate-calculator" onClick={close}>Hourly Rate</NavLink>
          <NavLink to="/commission-calculator" onClick={close}>Commission</NavLink>
          <NavLink to="/guides" onClick={close}>Guides</NavLink>
          <NavLink to="/about" onClick={close}>About</NavLink>
          <NavLink to="/contact" onClick={close}>Contact</NavLink>
        </nav>
      </div>
    </header>
  )
}
