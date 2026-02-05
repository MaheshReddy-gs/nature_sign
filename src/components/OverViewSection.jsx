import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useModal } from '../context/ModalContext';

const natureSignImage = '/nature-sign_website_03.png';

// --- Constants & Variants (Moved outside to prevent re-allocation) ---
const HEADLINE_TEXT = "At Nature's Sign, luxury takes on a deeper meaning Thoughtfully designed gardens, peaceful walkways, and a serene ambiance come together to create a life that feels indulgent, effortless, and beautifully enriching.";
const HEADLINE_WORDS = HEADLINE_TEXT.split(" ");

const WAVE_TRANSITION_LEFT = {
    duration: 10,
    repeat: Infinity,
    ease: "easeInOut"
};
const WAVE_TRANSITION_LEFT_2 = {
    duration: 15,
    repeat: Infinity,
    ease: "easeInOut"
};
const WAVE_TRANSITION_RIGHT = {
    duration: 12,
    repeat: Infinity,
    ease: "easeInOut"
};
const WAVE_TRANSITION_RIGHT_2 = {
    duration: 14,
    repeat: Infinity,
    ease: "easeInOut"
};

const CONTAINER_VARIANTS = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
};


const FADE_UP_SMALL_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const IMAGE_VARIANTS = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const STATS_VARIANTS = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: "backOut" }
    }
};

const WORD_VARIANTS = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const IMAGE_FLOAT_ANIMATION = { y: [ 0, -20, 0 ] };
const IMAGE_FLOAT_TRANSITION = {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut"
};

const OverviewDetailsSection = () => {
    const { openModal } = useModal();
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: [ "start end", "end start" ]
    });

    // Parallax effects
    const yBackground = useTransform(scrollYProgress, [ 0, 1 ], [ "0%", "20%" ]);
    const yImage = useTransform(scrollYProgress, [ 0, 1 ], [ "0%", "-15%" ]);

    return (
        <section id="overview" ref={sectionRef} className="relative overflow-hidden  min-h-screen flex flex-col justify-center bg-[#F7F2EA]">
            {/* Left Animated Wave Group (SVG) */}
            <motion.div style={{ y: yBackground }} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <svg className="absolute top-0 left-0 h-full w-[300px] lg:w-[400px]" preserveAspectRatio="none" viewBox="0 0 100 800">
                    <motion.path
                        initial={{ d: "M0,0 C30,200 80,400 0,800 L-50,800 L-50,0 Z" }}
                        fill="#D4C94A"
                        fillOpacity="0.2"
                        animate={{
                            d: [
                                "M0,0 C30,200 80,400 0,800 L-50,800 L-50,0 Z",
                                "M0,0 C60,200 40,500 0,800 L-50,800 L-50,0 Z",
                                "M0,0 C30,200 80,400 0,800 L-50,800 L-50,0 Z"
                            ]
                        }}
                        transition={WAVE_TRANSITION_LEFT}
                    />
                    <motion.path
                        initial={{ d: "M0,0 C50,300 10,600 0,800 L-50,800 L-50,0 Z" }}
                        fill="#A5B03B"
                        fillOpacity="0.1"
                        animate={{
                            d: [
                                "M0,0 C50,300 10,600 0,800 L-50,800 L-50,0 Z",
                                "M0,0 C20,300 70,600 0,800 L-50,800 L-50,0 Z",
                                "M0,0 C50,300 10,600 0,800 L-50,800 L-50,0 Z"
                            ]
                        }}
                        transition={WAVE_TRANSITION_LEFT_2}
                    />
                </svg>

                {/* Right Animated Wave Group (SVG) */}
                <svg className="absolute top-0 right-0 h-full w-[300px] lg:w-[400px]" preserveAspectRatio="none" viewBox="0 0 100 800">
                    <motion.path
                        initial={{ d: "M100,0 C70,200 20,400 100,800 L150,800 L150,0 Z" }}
                        fill="#EFB86A"
                        fillOpacity="0.2"
                        animate={{
                            d: [
                                "M100,0 C70,200 20,400 100,800 L150,800 L150,0 Z",
                                "M100,0 C40,200 60,500 100,800 L150,800 L150,0 Z",
                                "M100,0 C70,200 20,400 100,800 L150,800 L150,0 Z"
                            ]
                        }}
                        transition={WAVE_TRANSITION_RIGHT}
                    />
                    <motion.path
                        initial={{ d: "M100,0 C50,300 90,600 100,800 L150,800 L150,0 Z" }}
                        fill="#D8A85F"
                        fillOpacity="0.1"
                        animate={{
                            d: [
                                "M100,0 C50,300 90,600 100,800 L150,800 L150,0 Z",
                                "M100,0 C80,300 30,600 100,800 L150,800 L150,0 Z",
                                "M100,0 C50,300 90,600 100,800 L150,800 L150,0 Z"
                            ]
                        }}
                        transition={WAVE_TRANSITION_RIGHT_2}
                    />
                </svg>
            </motion.div>

            <motion.div
                className="relative w-full max-w-[1400px] mx-auto px-2 lg:px-16 py-10 lg:py-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={CONTAINER_VARIANTS}
            >
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
                    <motion.div
                        className="lg:w-[240px] flex-shrink-0"
                        style={{ y: yImage }}
                        variants={IMAGE_VARIANTS}
                    >
                        <motion.img
                            src={natureSignImage}
                            alt="Decorative leaves"
                            animate={IMAGE_FLOAT_ANIMATION}
                            transition={IMAGE_FLOAT_TRANSITION}
                            className="w-[175px] lg:w-[220px] h-auto -mt-65"
                        />
                    </motion.div>

                    <div className="flex-1 mt-20">
                        {/* Eyebrow */}
                        <motion.p
                            className="text-xs tracking-[0.35em] uppercase mb-8 font-['DIN_Alternate'] text-orange-800 font-medium"
                            variants={FADE_UP_SMALL_VARIANTS}
                        >
                            OVERVIEW
                        </motion.p>

                        {/* Section Heading with Word Reveal */}
                        <div className="mb-4 max-w-[900px]">
                            <h2 className="sr-only">{HEADLINE_TEXT}</h2>
                            <motion.div
                                className="font-['Inter_Tight'] text-2xl md:text-3xl leading-snug font-semibold text-[#2C2C2C] flex flex-wrap gap-x-2"
                                variants={{
                                    hidden: { opacity: 1 },
                                    visible: {
                                        opacity: 1,
                                        transition: { staggerChildren: 0.02, delayChildren: 0.1 }
                                    }
                                }}
                            >
                                {HEADLINE_WORDS.map((word, index) => (
                                    <motion.span
                                        key={index}
                                        variants={WORD_VARIANTS}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </div>


                        {/* Body */}
                        <div className="space-y-5 max-w-[800px]">
                            <motion.p
                                className="font-['Inter_Tight'] text-base leading-[1.85] text-[#5A514C]"
                                variants={FADE_UP_SMALL_VARIANTS}
                            >
                                Welcome to Nature's Sign, a thoughtfully planned plotted development in Bengaluru. A feature-rich residential community designed for those who value space, flexibility, and a superior lifestyle. Every plot is seamlessly integrated with modern infrastructure and essential amenities, creating a harmonious and well-balanced living environment.
                            </motion.p>

                            <motion.p
                                className="font-['Inter_Tight'] text-base leading-[1.85] text-[#5A514C]"
                                variants={FADE_UP_SMALL_VARIANTS}
                            >
                                Strategically located, Nature's Sign places you close to everything a global citizen needs--yet remains peacefully secluded from the city's noise and chaos. With excellent connectivity, lush open spaces, and a vibrant neighborhood, it offers the perfect canvas to build your dream home in a truly thriving community.
                            </motion.p>
                        </div>
                    </div>

                </div>

                <div className="mt-2 pt-4">
                    {/* Stats grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-10 text-center mx-auto max-w-5xl">
                        {/* Item */}
                        <motion.div
                            className="md:border-r md:border-[#E6DDD0] md:pr-6"
                            variants={STATS_VARIANTS}
                        >
                            <p className="text-xs tracking-[0.1em] uppercase mb-2 font-['DIN_Alternate'] font-medium text-orange-800">
                                LOCATION
                            </p>
                            <p className="font-['Inter_Tight'] text-base font-medium text-[#2C2C2C]">
                                Devanahalli, Bengaluru
                            </p>
                        </motion.div>

                        <motion.div
                            className="md:border-r md:border-[#E6DDD0] md:px-6"
                            variants={STATS_VARIANTS}
                        >
                            <p className="text-xs tracking-[0.1em] uppercase mb-2 font-['DIN_Alternate'] font-medium text-orange-800">
                                BUILDER
                            </p>
                            <p className="font-['Inter_Tight'] text-base font-medium text-[#2C2C2C]">
                                Shreyas Infra
                            </p>
                        </motion.div>

                        <motion.div
                            className="md:border-r md:border-[#E6DDD0] md:px-6"
                            variants={STATS_VARIANTS}
                        >
                            <p className="text-xs tracking-[0.1em] uppercase mb-2 font-['DIN_Alternate'] font-medium text-orange-800">
                                TOTAL LAND AREA
                            </p>
                            <p className="font-['Inter_Tight'] text-base font-medium text-[#2C2C2C]">
                                30 Acres
                            </p>
                        </motion.div>

                        <motion.div
                            className="md:pl-6"
                            variants={STATS_VARIANTS}
                        >
                            <p className="text-xs tracking-[0.1em] uppercase mb-2 font-['DIN_Alternate'] font-medium text-orange-800">
                                TOTAL UNITS
                            </p>
                            <p className="font-['Inter_Tight'] text-base font-medium text-[#2C2C2C]">
                                250 Units
                            </p>
                        </motion.div>
                    </div>

                    {/* CTA */}
                    <div className="flex justify-center mt-12">
                        <motion.button
                            onClick={() => openModal({ initialValues: { message: "Ask Price" } })}
                            className="inline-block bg-[#ff5e13] text-white py-3.5 px-8 rounded uppercase text-xs font-['DIN_Alternate'] font-semibold tracking-[0.3em] shadow-[0_4px_18px_rgba(255,94,19,0.28)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,94,19,0.38)] transition-all duration-300"
                            variants={FADE_UP_SMALL_VARIANTS}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            ASK PRICE
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default OverviewDetailsSection;
