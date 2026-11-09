import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

const FAQ = [
  { q: 'How long does it take to get a reply?', a: 'We read every message and reply as soon as we can, usually within a few working days.' },
  { q: 'What should I include in my message?', a: 'Tell us which tool you were using, what you typed, and what went wrong or what you would like added. Please do not include personal information about students, clients or properties.' },
  { q: 'Can I suggest a new tool?', a: 'Yes — suggestions for new tools are welcome. Tell us the job you need done and who it is for, and we will consider it.' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Please enter a valid email address.'
    if (form.message.trim().length < 10) errs.message = 'Please write a message of at least 10 characters.'
    setErrors(errs)
    if (Object.keys(errs).length === 0) setSent(true)
  }

  const mailto = `mailto:hello@aidforwork.com?subject=${encodeURIComponent('AidForWork contact: ' + form.name)}&body=${encodeURIComponent(form.message)}`

  return (
    <>
      <Seo
        title="Contact AidForWork — Questions, Feedback & Support"
        description="Contact AidForWork with questions, corrections or suggestions about our free AI tools. Email hello@aidforwork.com or use the contact form on this page."
        path="/contact"
        faq={FAQ}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]}
      />
      <div className="container">
        <div className="contact-grid">
          <div className="page" style={{ paddingLeft: 0, paddingRight: 0 }}>
            <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link> / Contact</nav>
            <h1>Contact us</h1>
            <p>Questions, corrections or suggestions? We read every message and reply as soon as we can.</p>
            <p><strong>Email:</strong> <a href="mailto:hello@aidforwork.com">hello@aidforwork.com</a></p>
            <p><strong>What to tell us:</strong> which tool you were using, what you typed, and what went wrong or what you would like added. Screenshots help, but never include personal information about students, clients or properties.</p>
            <h2>Frequently asked questions</h2>
            <div className="faq-list">
              {FAQ.map((f) => (
                <div className="faq-item" key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>
              ))}
            </div>
          </div>
          <div>
            {sent ? (
              <div className="success-box" role="status">
                <h2 style={{ marginTop: 0 }}>Thank you — your message is ready to send</h2>
                <p>This site has no server, so the form prepares an email instead of sending one directly. Click the button below to open your email app with your message filled in, or copy the address and send it yourself.</p>
                <p><a className="btn" href={mailto}>Open email app</a></p>
                <p>Email: <a href="mailto:hello@aidforwork.com">hello@aidforwork.com</a></p>
                <button type="button" className="btn btn-ghost" onClick={() => setSent(false)}>Write another message</button>
              </div>
            ) : (
              <form className="tool-form" onSubmit={onSubmit} aria-label="Contact form" noValidate>
                <div className="field">
                  <label htmlFor="name">Your name</label>
                  <input id="name" type="text" value={form.name} onChange={set('name')} autoComplete="name" />
                  {errors.name && <span className="field-error" role="alert">{errors.name}</span>}
                </div>
                <div className="field">
                  <label htmlFor="email">Email address</label>
                  <input id="email" type="email" value={form.email} onChange={set('email')} autoComplete="email" />
                  {errors.email && <span className="field-error" role="alert">{errors.email}</span>}
                </div>
                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" rows="6" value={form.message} onChange={set('message')} placeholder="How can we help?" />
                  {errors.message && <span className="field-error" role="alert">{errors.message}</span>}
                </div>
                <div className="form-actions">
                  <button className="btn" type="submit">Send message</button>
                </div>
                <p className="hint">This form validates your message in your browser and prepares an email to hello@aidforwork.com. No account or server is involved.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
