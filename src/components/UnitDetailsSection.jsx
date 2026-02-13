import FloatUpText from './Animations/floatUpText.jsx';
import { useRef, useState } from 'react';
import { useModal } from '../context/ModalContext.jsx';
import CustomButton from './CustomButton.jsx';



function TiltCard({ children, className = '' }) {
    const ref = useRef(null);
    let raf = null;

    const isTouch =
        typeof window !== 'undefined' &&
        (window.matchMedia('(hover: none)').matches || window.innerWidth < 1024);

    function handleMove(e) {
        if (isTouch) return;

        const el = ref.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotY = (x - 0.5) * 20;
        const rotX = (0.5 - y) * 20;

        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
            el.style.transform = `
              perspective(900px)
              rotateX(${rotX}deg)
              rotateY(${rotY}deg)
              scale(1.03)
            `;
        });
    }

    function handleEnter() {
        if (isTouch) return;
        const el = ref.current;
        if (!el) return;
        el.style.transition = 'transform 160ms ease-out';
    }

    function handleLeave() {
        if (isTouch) return;
        const el = ref.current;
        if (!el) return;

        if (raf) cancelAnimationFrame(raf);
        el.style.transition = 'transform 450ms cubic-bezier(.2,.9,.2,1)';
        el.style.transform =
            'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';

        setTimeout(() => {
            if (el) el.style.transition = '';
        }, 460);
    }

    return (
        <div
            ref={ref}
            className={`relative isolate  bg-[#f1c071] p-3 text-center h-full flex flex-col items-center justify-center min-h-0 overflow-hidden group will-change-transform ${className}`}
            onMouseMove={handleMove}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            style={{
                transformStyle: 'preserve-3d',
                contain: 'layout paint size'
            }}
        >
            {/* Radial Reveal */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-0 h-0 bg-[#f6e0bb] transition-all duration-[2500ms] ease-out lg:group-hover:w-[250%] lg:group-hover:h-[250%]" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                {children}
            </div>
        </div>
    );
}

export default function UnitDetailsSection() {
    const { openModal } = useModal();
    const [ activeUnit, setActiveUnit ] = useState(0);
    const scrollRef = useRef(null);

    const units = [
        { id: 1, size: '30 x 50 ft', area: '1500 sqft' },
        { id: 2, size: '60 x 40 ft', area: '2400 sqft' },
        { id: 3, size: '40 x 50 ft', area: '2000 sqft' },
        { id: 4, size: 'Odd sites', area: '' },
    ];

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const index = Math.round(scrollLeft / clientWidth);
            setActiveUnit(index);
        }
    };

    const scrollToUnit = (index) => {
        if (scrollRef.current) {
            const width = scrollRef.current.clientWidth;
            // Scroll to the specific slide width * index
            // Or since we use snap-x, just scrolling close to it works, but let's be precise if possible or just use width * index
            // But width of item is 85vw. The container has overflow. 
            // Actually, for snap scrolling, creating a ref to children is better, but width calculation works if consistent.
            // Since elements are 85vw wide, scrollLeft should be index * width of element? 
            // It's safer to rely on the container width if items are full width, but here items are 85vw.
            // Let's assume scrollTo works with simple offset for now or try child offset.
            const childElement = scrollRef.current.children[ index ];
            if (childElement) {
                scrollRef.current.scrollTo({
                    left: childElement.offsetLeft - (scrollRef.current.clientWidth - childElement.clientWidth) / 2, // Center it
                    behavior: 'smooth'
                });
            }
            setActiveUnit(index);
        }
    };

    return (
        <section
            id="unit"
            className="relative w-full "
        >
            {/* Background Image - Sticky, natural size */}
            <div
                className="sticky lg:h-[70vh] top-16 md:top-0 left-0 w-full bg-[#f8e8d1]   flex items-center justify-center -z-10"
            >
                <img
                    src="/unitDetails_background.webp"
                    alt="Unit Details Background"
                    className="w-full h-full object-cover object-bottom"
                />
            </div>


            {/* Content Container - Slides up over the sticky image */}
            <div className="relative w-full md:h-[40vh] bg-[#f0f3f1]  border border-white 
 lg:h-fit py-10   bg-white/ px-6 py-10 flex flex-col">
                {/* Heading */}
                <FloatUpText>
                    <h3 className="text-center text-[#a1461a] text-xs tracking-[0.2em] mb-5 uppercase">
                        UNIT DETAILS
                    </h3>
                </FloatUpText>

                <div className="flex-1 w-full min-h-0 mt-2 flex flex-col">
                    {/* Container: Flex row with horizontal scroll on mobile, Grid on desktop */}
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="
        flex flex-row md:grid md:grid-cols-4
        gap-4 md:gap-3 lg:gap-6
        max-w-5xl mx-auto w-full 
        h-[320px] md:h-full
        overflow-x-auto overflow-y-hidden
        
        snap-x snap-mandatory
        px-4 md:px-0 py-5
        scrollbar-hide
    "
                    >

                      {units.map((unit, idx) => (
  <div
    key={unit.id}
    className="
      min-w-[85vw] md:min-w-0 md:w-auto 
      shrink-0 snap-center 
      h-full
    "
  >
    <div
      className="
        group relative h-full rounded-2xl 
        bg-[#ebeeec] backdrop-blur-md 
        border border-white 
        overflow-hidden
        transition-all duration-500 ease-out
        hover:bg-white hover:backdrop-blur-xl hover:-translate-y-2
        p-6 flex flex-col justify-between
      "
    >
      {/* Big Background Number */}
      <div
        className="
          absolute top-4 left-4 text-8xl font-extrabold 
          text-[#dfe2e0] transition-all duration-500
          group-hover:text-[#FF5A00]
        "
      >
        {unit.id}
      </div>

      <div className="relative z-10 mt-28">
        {/* Unit Size */}
        <div className="mb-6">
          <p className="text-xl lg:text-2xl font-semibold text-black mb-1">
            {unit.size}
          </p>

          {unit.area ? (
            <p className="text-sm lg:text-lg text-black">
              ({unit.area})
            </p>
          ) : (
            <p className="text-sm lg:text-lg text-transparent">
              ({unit.area})
            </p>
          )}
        </div>

        {/* CTA */}
        <CustomButton hoverBorderColor="#ebeeec" className=''
          onClick={() =>
            openModal({
              initialValues: {
                message: "Price Inquiry for Unit " + unit.size,
              },
            })
          }
          
        >
          Unlock Price
        </CustomButton>
      </div>

      {/* Glass Shine */}
      <div
        className="
          absolute inset-0 bg-gradient-to-br 
          from-white/30 via-transparent to-transparent 
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-500 pointer-events-none
        "
      />
    </div>
  </div>
))}

                    </div>

                    {/* Mobile Dots Navigation */}
                    <div className="flex md:hidden justify-center mt-6 gap-2">
                        {units.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToUnit(index)}
                                className={`h-2 w-2 rounded-full transition-all duration-300 ${activeUnit === index ? "bg-[#a1461a] w-4" : "bg-orange-200"
                                    }`}
                                aria-label={`Go to unit ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
}