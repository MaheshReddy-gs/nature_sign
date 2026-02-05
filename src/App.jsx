
import './App.css'
import Layout from './components/Layout'
import HeroSection from './components/HeroSection'
import SpecificationsSection from './components/SpecificationsSection'
import ProximitySection from './components/ProximitySection'
import GallerySection from './components/GallerySection'
import LocationSection from './components/LocationSection'
import MasterPlanSection from './components/MasterPlanSection'
import ContactSection from './components/ContactSection'
import IntroSection from './components/IntroSection'
import OverViewSection from './components/OverViewSection'
import UnitDetailsSection from './components/UnitDetailsSection'
import HighlightsSection from './components/HighlightsSection'
import BuilderSection from './components/BuilderSection'
import { ModalProvider } from './context/ModalContext'
import ContactModal from './components/ContactModal'


function App() {
  return (
    <ModalProvider>
      <Layout>
        <HeroSection />
        <IntroSection />
        <OverViewSection />
        <UnitDetailsSection />
        <HighlightsSection />
        <BuilderSection />
        <GallerySection />
        <SpecificationsSection />
        <ProximitySection />
        <LocationSection />
        <MasterPlanSection />
        <ContactSection />
      </Layout>
      <ContactModal />
    </ModalProvider>
  )
}

export default App
