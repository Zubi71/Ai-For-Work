import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found | AidForWork"
        description="The page you were looking for does not exist on AidForWork. Try one of our free tools or guides instead."
        path="/404"
      />
      <div className="container page">
        <h1>Page not found</h1>
        <p>Sorry — the page you were looking for does not exist or has moved. Try one of these instead:</p>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tools/ai-lesson-plan-generator">AI Lesson Plan Generator</Link></li>
          <li><Link to="/tools/ai-grading-quiz-generator">AI Grading &amp; Quiz Generator</Link></li>
          <li><Link to="/tools/listing-description-generator">Listing Description Generator</Link></li>
          <li><Link to="/tools/crm-cost-calculator">CRM Cost Calculator</Link></li>
          <li><Link to="/guides">Guides</Link></li>
        </ul>
      </div>
    </>
  )
}
