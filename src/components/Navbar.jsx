import { useState,useEffect ,useRef} from 'react'
import { Phone } from 'lucide-react'
import { useModal } from '../context/ModalContext'
import gsap from "gsap"

export default function Navbar() {
  const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState(false)
  const { openModal } = useModal();
const [scrolled, setScrolled] = useState(false)
const overlayRef = useRef(null)
const panelRef = useRef(null)

useEffect(() => {
  const onScroll = () => {
    setScrolled(window.scrollY > 60)
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
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
  className={`fixed top-0 left-0  right-0 z-50 transition-all duration-300
    ${
      scrolled
        ? ' shadow-md bg-white/90 backdrop-blur-sm'
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
            <button
              onClick={() => openModal({ initialValues: { message: "Request Callback" } })}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg lg:rounded hover:bg-orange-700 transition-colors font-bold text-xs uppercase tracking-wide flex items-center gap-2 whitespace-nowrap"
            >
              <Phone size={18} strokeWidth={2.5} />
             <span className='hidden lg:block'> Request <br /> Callback</span>
            </button>
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

        {/* Mobile Menu */}
       
         
<div
  className={`md:hidden fixed left-0 right-0 bottom-0 top-20 z-40 bg-black/30 transition-opacity duration-300
    ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
  onClick={() => setIsMobileMenuOpen(false)}
>
  {/* Menu Panel */}
  <div
    className={`fixed left-0 top-0 pt-20 w-full h-screen bg-white  text-black   overflow-y-auto
      transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
      ${isMobileMenuOpen ? "translate-x-0" : "-translate-y-full"}`}
    onClick={(e) => e.stopPropagation()}
  >
    <div className="flex flex-col px-6 py-8 space-y-4 ">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleNavClick(item.id)}
          className="w-full text-left text-black  hover:text-orange-500 uppercase text-sm font-medium py-3 transition-colors"
        >
          {item.label}
        </button>
      ))}
      <button
        onClick={() => {
          openModal({ initialValues: { message: "Request Callback" } });
          setIsMobileMenuOpen(false);
        }}
        className="w-full mt-2 bg-orange-600  text-white px-6 py-3 rounded hover:bg-orange-700 transition-colors font-bold flex items-center gap-2 justify-center "
      >
        <Phone size={16} strokeWidth={2.5} />
        Request Callback
      </button>
    </div>
  </div>
</div>

        
      </div>
    </nav>
  )
}
