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
import GuideContractReview from './pages/GuideContractReview'
import GuideSolicitorsUk from './pages/GuideSolicitorsUk'
import GuideBestCrm from './pages/GuideBestCrm'
import GuideTeachersUk from './pages/GuideTeachersUk'
import GuideArchitects from './pages/GuideArchitects'
import GuideAccountantsUk from './pages/GuideAccountantsUk'
import GuideNurses from './pages/GuideNurses'
import GuideSmallBusinessAu from './pages/GuideSmallBusinessAu'
import GuideDoctors from './pages/GuideDoctors'
import GuideTherapists from './pages/GuideTherapists'
import GuideFreelancers from './pages/GuideFreelancers'
import GuideMarketers from './pages/GuideMarketers'
import GuideFinancialAdvisors from './pages/GuideFinancialAdvisors'
import GuideWriters from './pages/GuideWriters'
import GuideMortgageBrokers from './pages/GuideMortgageBrokers'
import GuideInsuranceAgents from './pages/GuideInsuranceAgents'
import GuideHrUk from './pages/GuideHrUk'
import GuideRecruitersUk from './pages/GuideRecruitersUk'
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
        <Route path="guides/ai-contract-review-software" element={<GuideContractReview />} />
        <Route path="guides/ai-tools-for-solicitors-uk" element={<GuideSolicitorsUk />} />
        <Route path="guides/best-crm-for-small-business" element={<GuideBestCrm />} />
        <Route path="guides/ai-tools-for-teachers-uk" element={<GuideTeachersUk />} />
        <Route path="guides/ai-tools-for-architects" element={<GuideArchitects />} />
        <Route path="guides/ai-tools-for-accountants-uk" element={<GuideAccountantsUk />} />
        <Route path="guides/ai-tools-for-nurses" element={<GuideNurses />} />
        <Route path="guides/ai-tools-for-small-business-au" element={<GuideSmallBusinessAu />} />
        <Route path="guides/ai-tools-for-doctors" element={<GuideDoctors />} />
        <Route path="guides/ai-tools-for-therapists" element={<GuideTherapists />} />
        <Route path="guides/ai-tools-for-freelancers" element={<GuideFreelancers />} />
        <Route path="guides/ai-tools-for-marketers" element={<GuideMarketers />} />
        <Route path="guides/ai-tools-for-financial-advisors" element={<GuideFinancialAdvisors />} />
        <Route path="guides/ai-tools-for-writers" element={<GuideWriters />} />
        <Route path="guides/ai-tools-for-mortgage-brokers" element={<GuideMortgageBrokers />} />
        <Route path="guides/ai-tools-for-insurance-agents" element={<GuideInsuranceAgents />} />
        <Route path="guides/ai-tools-for-hr-professionals-uk" element={<GuideHrUk />} />
        <Route path="guides/ai-tools-for-recruiters-uk" element={<GuideRecruitersUk />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy-policy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
