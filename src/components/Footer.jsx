import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">AidForWork</p>
          <p>Free AI tools for teachers, accountants and real estate agents. Everything runs in your browser — no sign-up, no account.</p>
          <p><a href="mailto:hello@aidforwork.com">hello@aidforwork.com</a></p>
        </div>
        <nav aria-label="Tools">
          <p className="footer-heading">Tools</p>
          <ul>
            <li><Link to="/tools/ai-lesson-plan-generator">AI Lesson Plan Generator</Link></li>
            <li><Link to="/tools/ai-grading-quiz-generator">AI Grading &amp; Quiz Generator</Link></li>
            <li><Link to="/tools/listing-description-generator">Listing Description Generator</Link></li>
            <li><Link to="/tools/crm-cost-calculator">CRM Cost Calculator</Link></li>
            <li><Link to="/grade-calculator">Grade Calculator</Link></li>
            <li><Link to="/invoice-calculator">Invoice Calculator</Link></li>
            <li><Link to="/hourly-rate-calculator">Freelance Hourly Rate Calculator</Link></li>
            <li><Link to="/commission-calculator">Commission Calculator</Link></li>
          </ul>
        </nav>
        <nav aria-label="Blog and company">
          <p className="footer-heading">Blog &amp; Company</p>
          <ul>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/guides/ai-tools-for-teachers">AI Tools for Teachers</Link></li>
            <li><Link to="/guides/ai-tools-for-accountants">AI Tools for Accountants</Link></li>
            <li><Link to="/guides/ai-tools-for-real-estate-agents">AI Tools for Real Estate Agents</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <nav aria-label="Legal">
          <p className="footer-heading">Legal</p>
          <ul>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Use</Link></li>
          </ul>
        </nav>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 AidForWork. Tool outputs are starting drafts — please review them before use. CRM prices shown are examples; confirm current prices on the vendor's website.</p>
      </div>
    </footer>
  )
}
