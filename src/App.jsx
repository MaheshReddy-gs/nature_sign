
import './App.css'
import Layout from './components/Layout'
import HeroSection from './components/HeroSection'
import Section2 from './components/Section2'
import Section3 from './components/Section3'
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
      <Section2 />
      <Section3 />
      <Section4 />
    </Layout>
  )
}

export default App
