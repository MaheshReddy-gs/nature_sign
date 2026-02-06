import { useState,useEffect ,useRef} from 'react'
import { Phone } from 'lucide-react'
import { useModal } from '../context/ModalContext'


export default function Navbar() {
  const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState(false)
  const { openModal } = useModal();
const [scrolled, setScrolled] = useState(false)


useEffect(() => {
  const onScroll = () => {
    setScrolled(window.scrollY > window.innerHeight-20)
  }
  window.addEventListener('scroll', onScroll)
  return () => window.removeEventListener('scroll', onScroll)
}, [])

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
    <>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes expandPanel {
          from {
            max-height: 0;
          }
          to {
            max-height: 100vh;
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.5s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-expandPanel {
          animation: expandPanel 0.8s ease-out forwards;
        }
      `}</style>

      <nav
        className={`fixed top-0 left-0   right-0 z-50 transition-all duration-300
          ${
            scrolled || isMobileMenuOpen
              ? '  bg-white/90 backdrop-blur-sm'
              : 'bg-gradient-to-b text-white from-black to-transparent'
          }`}
      >
        <div className="max-w-6xl  mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <button className="flex-shrink-0 z-[999] brightness-125 cursor-pointer" onClick={() => handleNavClick('hero')}>
              <img src="/naturesignLogo1.png" alt="NatureSign" className="h-20 w-auto" />
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-3 lg:gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className=" hover:text-orange-500 transition-colors font-medium text-[10px] lg:text-xs uppercase tracking-wide"
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
              className="md:hidden relative w-8 h-8 z-[999] flex items-center justify-center"
              aria-label="Toggle menu"
            >
             <span
              className={`absolute h-0.5 w-6 transition-transform duration-300
                ${isMobileMenuOpen ? 'rotate-45' : '-translate-y-2'}
                ${isMobileMenuOpen || scrolled ? 'bg-black' : 'bg-white'}
              `}
             />
            <span
              className={`absolute h-0.5 w-6 transition-opacity duration-300
                ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}
                ${isMobileMenuOpen || scrolled ? 'bg-black' : 'bg-white'}
              `}
             />
            <span
              className={`absolute h-0.5 w-6 transition-transform duration-300
                ${isMobileMenuOpen ? '-rotate-45' : 'translate-y-2'}
                ${isMobileMenuOpen || scrolled ? 'bg-black' : 'bg-white'}
              `}
             />
            </button>
          </div>
        </div>
      </nav>
 <div className="fixed bottom-0 left-0  right-0 z-50 md:hidden">
  
          <button
            onClick={() =>
              openModal({ initialValues: { message: "Request Callback" } })
            }
            className="w-full bg-orange-600 text-white px-6 py-4 
                       hover:bg-orange-700 transition-all duration-300
                        flex items-center gap-2 justify-around"
          >
            <Phone size={16} strokeWidth={2.5} className='flex-1'/>
            <span className='flex-3'>Request Callback</span>
          </button>
        </div>
      
   
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden   fixed left-0 right-0 bottom-0 top-20 z-40 bg-black/30 animate-fadeIn"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {/* Menu Panel - expands as items appear */}
          <div
            className="fixed left-0 top-0 pt-20 w-full h-sc bg-white text-black overflow-hidden animate-expandPanel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col px-6 py-10 space-y-4">
              {/* Menu Items with Staggered Top-Down Animation */}
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="w-full text-left text-black hover:text-orange-500 uppercase text-sm font-medium py-3 transition-all duration-500 opacity-0 -translate-y-8 animate-slideDown"
                  style={{
                    animationDelay: `${index * 80}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  {item.label}
                </button>
              ))}
             
              
             
            </div>
          </div>
        </div>
      )}
    </>
  )
}