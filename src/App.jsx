
import './App.css'
import Layout from './components/Layout'
import HeroSection from './components/HeroSection'
import SpecificationsSection from './components/SpecificationsSection'
import ProximitySection from './components/ProximitySection'
import Section4 from './components/Section4'
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
      <Section4 />
    </Layout>
  )
}

export default App
