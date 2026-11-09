import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

const FAQ = [
  { q: 'Does AidForWork collect what I type into the tools?', a: 'No. Tool inputs are processed entirely in your browser and are never sent to our servers, stored by us, or shared with anyone.' },
  { q: 'Do you use cookies?', a: 'We do not currently use analytics or advertising cookies. The site may set strictly necessary technical cookies only if required for basic operation.' },
  { q: 'How can I ask you to delete my email?', a: 'If you have emailed us, you can ask us to delete your message at any time by writing to hello@aidforwork.com.' },
]

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy | AidForWork"
        description="AidForWork privacy policy: our tools run entirely in your browser, we do not collect what you type, and we do not sell personal information."
        path="/privacy-policy"
        faq={FAQ}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy-policy' }]}
      />
      <div className="container page">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link> / Privacy Policy</nav>
        <h1>Privacy Policy</h1>
        <p><em>Last updated: 9 November 2026</em></p>
        <p>AidForWork (“we”, “us”) operates the website aidforwork.com. This policy explains what information we collect and how we use it. In short: our tools run entirely in your browser, and we do not collect what you type into them.</p>
        <h2>Information you type into the tools</h2>
        <p>When you use a tool — for example a lesson topic, property details or a team size — that information is processed on your own device. It is not sent to our servers, stored by us, or shared with anyone. We have no way to see it.</p>
        <h2>Information you send us directly</h2>
        <p>If you email us at hello@aidforwork.com or use the contact form (which prepares an email in your own email app), we receive your name, email address and message. We use that information only to reply to you, and we do not share it with third parties or use it for marketing.</p>
        <h2>Analytics and cookies</h2>
        <p>We do not currently use analytics cookies or advertising cookies on this site. If that changes, this policy will be updated and the change will be disclosed here. The site may set strictly necessary technical cookies only if required for basic operation.</p>
        <h2>Third-party services</h2>
        <p>The site is hosted on infrastructure that may log basic technical information (such as IP addresses) for security and reliability, as most web hosts do. We do not combine those logs with any personal information you type into the tools, because that information never reaches us.</p>
        <h2>Children</h2>
        <p>Our tools are designed for working professionals. We do not knowingly collect personal information from children. Teachers should not enter students’ personal information into any tool on this site.</p>
        <h2>Your rights</h2>
        <p>If you have emailed us, you may ask us to delete your message at any time by emailing hello@aidforwork.com. Because tool inputs never leave your device, there is nothing for us to delete in that respect.</p>
        <h2>Changes to this policy</h2>
        <p>We may update this policy from time to time. The “last updated” date above will change when we do, and significant changes will be noted on this page.</p>
        <h2>Contact</h2>
        <p>Questions about this policy: <a href="mailto:hello@aidforwork.com">hello@aidforwork.com</a>. See also our <Link to="/terms">Terms of Use</Link>.</p>
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          {FAQ.map((f) => (
            <div className="faq-item" key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>
          ))}
        </div>
      </div>
    </>
  )
}
