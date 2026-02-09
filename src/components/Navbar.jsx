import { useState, useEffect, useRef } from 'react'
import { Phone } from 'lucide-react'
import { useModal } from '../context/ModalContext'


export default function Navbar() {
  const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState(false)
  const { openModal } = useModal();
  const [ scrolled, setScrolled ] = useState(false)


  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { label: 'Overview', id: 'overview' },
    { label: 'Units', id: 'unit' },
    { label: 'Highlights', id: 'highlights' },
    { label: 'Specifications', id: 'specifications' },
    { label: 'About Builder', id: 'builder' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Proximity', id: 'proximity' },
    { label: 'Location', id: 'locations' },
    { label: 'Contact', id: 'contact' },
  ]

  // Custom smooth scroll function for slower duration
  const smoothScrollTo = (targetY, duration = 2000) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Easing function (easeInOutCubic)
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startY + (distance * ease));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const handleNavClick = (sectionId) => {
    setIsMobileMenuOpen(false);

    let targetPosition = 0;
    const startPosition = window.scrollY;

    if (sectionId !== 'hero') {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      targetPosition = elementPosition + window.scrollY - headerOffset;
    }

    const distance = Math.abs(targetPosition - startPosition);
    // Dynamic duration based on distance: Min 1000ms, Max 2500ms
    // Factor 0.8 means 1000px takes +800ms
    const calculatedDuration = Math.min(2500, Math.max(1000, distance * 0.8));

    smoothScrollTo(targetPosition, calculatedDuration);
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
          animation: slideDown 0.4s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-expandPanel {
          animation: expandPanel 0.6s ease-out forwards;
        }
      `}</style>

     <nav className="fixed top-0 left-0 right-0 z-50 overflow-hidden">
  
  {/* Gradient background (base layer) */}
  <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent" />

  {/* White animated overlay */}
  <div
    className={`absolute inset-x-0 top-0 bg-white transition-transform duration-500 ease-out origin-top
      ${scrolled || isMobileMenuOpen ? 'scale-y-100' : 'scale-y-0'}
    `}
    style={{ height: '100%' }}
  />

  {/* Navbar content */}
  <div
    className={`relative z-10 transition-colors duration-300
      ${scrolled || isMobileMenuOpen ? 'text-black' : 'text-white'}
    `}
  >



        <div className="max-w-7xl  mx-auto px-6    flex w-full justify-center gap-3">
          <div className="flex justify-between w-full items-center h-16 md:h-20   ">
            {/* Logo */}
            <button className="flex-shrink-0 z-[999] brightness-125 cursor-pointer" onClick={() => handleNavClick('hero')}>
              <img src="/naturesignLogo1.png" alt="NatureSign" className="h-16 w-auto" />
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex  items-center gap-3 lg:gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className=" hover:text-orange-500 duration-500 transition-colors font-medium text-[10px] lg:text-xs uppercase tracking-wide"
                >
                  {item.label}
                </button>
              ))}

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
          </div><a
            href="tel:+918151884545"
            className="bg-[#97390b] hidden  text-white      py-2  w-42 hover:bg-[#E04F00] transition-colors md:flex items-center gap-2 px-2 duration-500"
          >
            <div>
            </div>
            <img src='call.svg' className='h-5 ' />
            <div className="text-left      ">
              <div className=" text-xs uppercase w-full">Call</div>
              <div className="text-xs  w-fit">+91 81518 84545</div>
            </div>
          </a>
        </div>
        </div>
      </nav>
      <div className="fixed bottom-0  flex left-0 right-0 z-50 md:hidden">
        <a
          
            href="tel:+918151884545"
          className="w-full bg-[#d75916] text-white px-6 py-4 
                       hover:bg-[#E04F00] transition-all duration-300
                        flex flex-1 items-center gap-2 justify-around"
        >
          
          <Phone size={16} strokeWidth={2.5} className='f' />
        </a>
        <button
          onClick={() =>
            openModal({ initialValues: { message: "Request Callback" } })
          }
          className="w-full uppercase text-xs uppercase text-[11px] font-bold tracking-[0.2em] bg-[#FF5A00] flex-3 text-white px-6 py-4 
                       hover:bg-[#E04F00] transition-all duration-300
                        flex items-center gap-2 justify-around"
        >
          
          <span className=''>Request Callback</span>
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
                  className="w-full text-left text-black  hover:text-orange-500 uppercase text-sm font-medium py-3 transition-all duration-500 opacity-0 -translate-y-8 animate-slideDown"
                  style={{
                    animationDelay: `${index * 60}ms`,
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