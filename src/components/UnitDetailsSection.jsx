import FloatUpText from './Animations/floatUpText.jsx';
import { useRef, useState } from 'react';
import { useModal } from '../context/ModalContext.jsx';



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
            className={`relative isolate bg-[#f1c071] p-3 text-center h-full flex flex-col items-center justify-center min-h-0 overflow-hidden group will-change-transform ${className}`}
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
        { id: 3, size: '60 x 40 ft', area: '2400 sqft' },
        { id: 4, size: '40 x 50 ft', area: '2000 sqft' },
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
                className="sticky lg:h-[70vh]  top-0 left-0 w-full bg-[#f8e8d1]   flex items-center justify-center -z-10"
            >
                <img
                    src="/unitDetails_background.webp"
                    alt="Unit Details Background"
                    className="w-full h-full object-cover object-bottom"
                />
            </div>


            {/* Content Container - Slides up over the sticky image */}
            <div className="relative w-full md:h-[40vh] lg:h-[60vh] bg-[#f8e8d1] px-6 py-10 flex flex-col">
                {/* Heading */}
                <FloatUpText>
                    <h3 className="text-center text-[#a1461a] text-xs font-bold tracking-[0.2em] mb-5 uppercase">
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
        touch-pan-x
        snap-x snap-mandatory
        px-4 md:px-0
        scrollbar-hide
    "
                    >

                        {units.map((unit, idx) => (
                            <div
                                key={unit.id}
                                className="min-w-[85vw] md:min-w-0 md:w-auto shrink-0 snap-center h-full"
                            >
                                <TiltCard>
                                    {/* Unit Number */}
                                    <div className="text-4xl sm:text-5xl lg:text-7xl  absolute top-3 left-3 text-transparent  font-extrabold  mb-3 opacity-60" style={{ WebkitTextStroke: "2px white" }}>
                                        {unit.id}
                                    </div>

                                    {/* Unit Size */}
                                    <div className="mb-2">
                                        <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-black mb-1">
                                            {unit.size}
                                        </p>
                                        <p className="text-sm sm:text-lg text-black">
                                            ({unit.area})
                                        </p>
                                    </div>

                                    {/* CTA Button */}
                                    <button
                                        onClick={() => openModal({ initialValues: { message: "Price Inquiry for Unit " + unit.size } })}
                                        className="mt-2 bg-[#FF5A00] hover:bg-[#E04F00] text-white py-3 px-8 rounded shadow-[0_10px_20px_rgba(255,90,0,0.3)] uppercase text-[10px] font-bold tracking-[0.2em] transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                                    >
                                        Ask Price
                                    </button>
                                </TiltCard>
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