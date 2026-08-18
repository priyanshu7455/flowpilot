import Navbar from './components/Navbar'
import Hero from './components/Hero'
import InsightSection from './components/InsightSection'
import InteractiveWorkspace from './components/InteractiveWorkspace'
import FeatureSection from './components/FeatureSection'
import HowItWorks from './components/HowItWorks'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-ink-primary font-body">
      <a
        href="#product"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-amber focus:text-bg focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-semibold"
      >
        Skip to product demo
      </a>
      <Navbar />
      <main>
        <Hero />
        <InsightSection />
        <InteractiveWorkspace />
        <FeatureSection />
        <HowItWorks />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
