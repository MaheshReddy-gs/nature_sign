import { useState } from 'react'
import { Phone } from 'lucide-react'
import { useModal } from '../context/ModalContext'

export default function Navbar() {
  const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState(false)
  const { openModal } = useModal();

  const navItems = [
    { label: 'Overview', id: 'overview' },
    { label: 'Highlights', id: 'highlights' },
    { label: 'Unit Details', id: 'unit' },
    { label: 'About Builder', id: 'builder' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Proximity', id: 'proximity' },
    { label: 'Contact', id: 'contact' },
  ]

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else if (sectionId === 'hero') {
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
          <button className="flex-shrink-0 z-[999] brightness-125 cursor-pointer" onClick={() => handleNavClick('hero')}>
            <img src="/naturesignLogo1.png" alt="NatureSign" className="h-20 w-auto" />
          </button>

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
            <a
              href="tel:+918151884545"
              className="bg-orange-600 text-white px-5 py-2 rounded hover:bg-orange-700 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Phone size={18} strokeWidth={2.5} />
              <div className="text-left">
                <div className="font-bold text-xs uppercase tracking-wide">Call</div>
                <div className="text-[10px] font-medium">+91 81518 84545</div>
              </div>
            </a>
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
            <a
              href="tel:+918151884545"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full mt-2 bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-700 transition-colors flex items-center gap-3 justify-center whitespace-nowrap"
            >
              <Phone size={18} strokeWidth={2.5} />
              <div className="text-left">
                <div className="font-bold text-xs uppercase tracking-wide">Call</div>
                <div className="text-[11px] font-medium">+91 81518 84545</div>
              </div>
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
