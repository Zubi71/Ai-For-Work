import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import LessonPlan from './pages/tools/LessonPlan'
import QuizGenerator from './pages/tools/QuizGenerator'
import ListingGenerator from './pages/tools/ListingGenerator'
import CrmCalculator from './pages/tools/CrmCalculator'
import GradeCalculator from './pages/tools/GradeCalculator'
import InvoiceCalculator from './pages/tools/InvoiceCalculator'
import HourlyRateCalculator from './pages/tools/HourlyRateCalculator'
import CommissionCalculator from './pages/tools/CommissionCalculator'
import Guides from './pages/Guides'
import GuideTeachers from './pages/GuideTeachers'
import GuideAccountants from './pages/GuideAccountants'
import GuideAgents from './pages/GuideAgents'
import GuideLawyers from './pages/GuideLawyers'
import GuideEstateAgentsUk from './pages/GuideEstateAgentsUk'
import About from './pages/About'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tools/ai-lesson-plan-generator" element={<LessonPlan />} />
        <Route path="tools/ai-grading-quiz-generator" element={<QuizGenerator />} />
        <Route path="tools/listing-description-generator" element={<ListingGenerator />} />
        <Route path="tools/crm-cost-calculator" element={<CrmCalculator />} />
        <Route path="grade-calculator" element={<GradeCalculator />} />
        <Route path="invoice-calculator" element={<InvoiceCalculator />} />
        <Route path="hourly-rate-calculator" element={<HourlyRateCalculator />} />
        <Route path="commission-calculator" element={<CommissionCalculator />} />
        <Route path="blog" element={<Guides />} />
        <Route path="guides" element={<Navigate to="/blog" replace />} />
        <Route path="guides/ai-tools-for-teachers" element={<GuideTeachers />} />
        <Route path="guides/ai-tools-for-accountants" element={<GuideAccountants />} />
        <Route path="guides/ai-tools-for-real-estate-agents" element={<GuideAgents />} />
        <Route path="guides/ai-tools-for-lawyers" element={<GuideLawyers />} />
        <Route path="guides/ai-tools-for-estate-agents-uk" element={<GuideEstateAgentsUk />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy-policy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
