import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const TOOL_GROUPS = [
  {
    heading: 'For Teachers',
    links: [
      { to: '/tools/ai-lesson-plan-generator', label: 'Lesson Plans' },
      { to: '/tools/ai-grading-quiz-generator', label: 'Quizzes' },
      { to: '/grade-calculator', label: 'Grade Calculator' },
    ],
  },
  {
    heading: 'For Accountants',
    links: [
      { to: '/invoice-calculator', label: 'Invoice Calculator' },
      { to: '/hourly-rate-calculator', label: 'Hourly Rate Calculator' },
    ],
  },
  {
    heading: 'For Real Estate Agents',
    links: [
      { to: '/tools/listing-description-generator', label: 'Listing Descriptions' },
      { to: '/commission-calculator', label: 'Commission Calculator' },
      { to: '/tools/crm-cost-calculator', label: 'CRM Costs' },
    ],
  },
]

const TOOL_PATHS = TOOL_GROUPS.flatMap((g) => g.links.map((l) => l.to))

export default function Header() {
  const [open, setOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const location = useLocation()
  const onToolPage = TOOL_PATHS.some((p) => location.pathname === p || location.pathname.startsWith(p + '/'))
  const close = () => { setOpen(false); setToolsOpen(false) }
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
          <div
            className={toolsOpen ? 'nav-item open' : 'nav-item'}
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <button
              type="button"
              className={onToolPage ? 'nav-dropdown-btn active' : 'nav-dropdown-btn'}
              aria-expanded={toolsOpen}
              aria-haspopup="true"
              onClick={() => setToolsOpen((v) => !v)}
            >
              Tools <span aria-hidden="true">▾</span>
            </button>
            <div className="nav-dropdown">
              {TOOL_GROUPS.map((group) => (
                <div key={group.heading} className="nav-dropdown-group">
                  <p className="nav-dropdown-heading">{group.heading}</p>
                  {group.links.map((link) => (
                    <NavLink key={link.to} to={link.to} onClick={close}>{link.label}</NavLink>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <NavLink to="/blog" onClick={close}>Blog</NavLink>
          <NavLink to="/about" onClick={close}>About</NavLink>
          <NavLink to="/contact" onClick={close}>Contact</NavLink>
        </nav>
      </div>
    </header>
  )
}
