import { useState } from 'react'
import { Phone } from 'lucide-react'

export default function Navbar() {
  const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState(false)

  const navItems = [
    { label: 'Overview', id: 'section1' },
    { label: 'About', id: 'section2' },
    { label: 'Highlights', id: 'section3' },
    { label: 'Unit Details', id: 'section4' },
    { label: 'Builder', id: 'section5' },
    { label: 'Gallery', id: 'section6' },
    { label: 'Proximity', id: 'section7' },
    { label: 'Contact', id: 'section8' },
  ]

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else if (sectionId === 'section1') {
      // fallback to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-b from-black to-transparent  z-50">
      <div className="max-w-6xl  mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 z-[999] brightness-125 cursor-pointer" onClick={() => handleNavClick('section1')}>
            <img src="/naturesignLogo1.png" alt="NatureSign" className="h-20 w-auto" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-white hover:text-orange-500 transition-colors font-medium text-xs uppercase tracking-wide"
              >
                {item.label}
              </button>
            ))}
            <button className="bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-700 transition-colors font-bold text-xs uppercase tracking-wide flex items-center gap-2 whitespace-nowrap">
              <Phone size={18} strokeWidth={2.5} />
              Request <br /> Callback
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1"
          >
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-700">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left px-6 py-2 text-white hover:bg-gray-900 transition-colors uppercase text-xs"
              >
                {item.label}
              </button>
            ))}
            <button className="w-full mt-2 bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition-colors font-bold flex items-center gap-2 justify-center whitespace-nowrap">
              <Phone size={16} strokeWidth={2.5} />
              Request Callback
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
