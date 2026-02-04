import FloatUpText from './Animations/floatUpText.jsx';
import { useRef } from 'react';


function TiltCard({ children, className = '' }) {
    const ref = useRef(null);
    let raf = null;

    function handleMove(e) {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotY = (x - 0.5) * 20; // horizontal tilt
        const rotX = (0.5 - y) * 20; // vertical tilt
        const scale = 1.03;

        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
            el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
        });
    }

    function handleLeave() {
        const el = ref.current;
        if (!el) return;
        if (raf) cancelAnimationFrame(raf);
        el.style.transition = 'transform 450ms cubic-bezier(.2,.9,.2,1)';
        el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';

        setTimeout(() => {
            if (el) el.style.transition = '';
        }, 460);
    }

    function handleEnter() {
        const el = ref.current;
        if (!el) return;
        el.style.transition = 'transform 160ms ease-out';
    }

    return (
        <div
            ref={ref}
            className={`bg-[#f1c071] hover:bg-[#f6e0bb] transition-all  p-3 text-center h-full flex flex-col items-center justify-center min-h-0 duration-500  will-change-transform ${className}`}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            onMouseEnter={handleEnter}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {children}
        </div>
    );
}


export default function UnitDetailsSection() {

    const units = [
        { id: 1, size: '30 x 50 ft', area: '1500 sqft' },
        { id: 2, size: '60 x 40 ft', area: '2400 sqft' },
        { id: 3, size: '60 x 40 ft', area: '2400 sqft' },
        { id: 4, size: '40 x 50 ft', area: '2000 sqft' },
    ];

    return (
        <section
            id="section4"
            className="relative w-full min-h-[100vh] h-auto lg:h-screen overflow-hidden"
        >
            {/* Background Image - Sticky/Parallax */}
            <div
                className="sticky top-0 left-0 w-full h-screen bg-cover bg-center -z-10"
                style={{
                    backgroundImage: `url('/herobackgorund.webp')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                }}
            >

            </div>

            {/* Content Container - Bottom 60vh constrained to section */}
            <div className="absolute    bottom-0 left-0 w-full lg:h-[60vh]">
                <div className="w-full h-full py-10  bg-[#f8e8d1] px-6 flex flex-col">
                    {/* Unit Dimensions Heading */}
                    <FloatUpText>
                        <h3 className="text-center text-orange-900 text-lg font-semibold tracking-widest mb-4  uppercase">
                            Unit Dimensions
                        </h3>
                    </FloatUpText>




                    <div className="flex-1  overflow-hidden   min-h-0 mt-2">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-5xl mx-auto h-full overflow-auto md:overflow-hidden">
                            {units.map((unit, idx) => (
                                <FloatUpText key={unit.id} delay={idx * 0.2} yMultiplier={2}>
                                    <TiltCard>
                                        {/* Unit Number */}
                                        <div className="text-4xl sm:text-5xl lg:text-7xl  absolute top-3 left-3 text-transparent  font-extrabold  mb-3 opacity-60" style={{ WebkitTextStroke:"2px white"}}>
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
                                        <button className="mt-2 px-5 py-3  bg-orange-500 text-white hover:bg-orange-400 t font-bold rounded transition-colors uppercase text-xs sm:text-sm tracking-widest">
                                            Ask Price
                                        </button>
                                    </TiltCard>
                                </FloatUpText>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}