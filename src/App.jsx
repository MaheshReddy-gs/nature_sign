
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

function App() {
  return (
    <Layout>
      <HeroSection />
      <IntroSection />
      <OverViewSection />
      <UnitDetailsSection />
      <SpecificationsSection />
      <ProximitySection />
      <GallerySection />
      <LocationSection />
      <MasterPlanSection />
      <ContactSection />
    </Layout>
  )
}

export default App
