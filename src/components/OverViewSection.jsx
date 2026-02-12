import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

import { useRef } from 'react';
import { useModal } from '../context/ModalContext';
import FloatUpText from './Animations/floatUpText';

const natureSignImage = '/nature-sign_website_03.png';
const mangoBranchImage = '/mangobranch.png';

// --- Constants & Variants (Moved outside to prevent re-allocation) ---
const HEADLINE_TEXT = "At Nature's Sign, luxury takes on a deeper meaning Thoughtfully designed gardens, peaceful walkways, and a serene ambiance come together to create a life that feels indulgent, effortless, and beautifully enriching.";

// ===== BRANCH ANIMATION CONFIGURATION (Easy to adjust) =====
const BRANCH_CONFIG = {
    // Position (adjust these values easily)
    desktop: {
        left: '5%',        // Distance from left edge (try: '0%', '10%', '15%')
        top: '-10',          // Starting from top
        width: '400px',    // Branch width (try: '250px', '350px', '400px')
        height: '600px',   // Branch height (try: '450px', '550px', '600px')
    },
    // Animation timing (adjust for smoothness)
    scrollTiming: [0, 0.35, 0.65, 1],              // When animation happens during scroll
    revealPositions: ["-120%", "0%", "0%", "-110%"], // Start hidden, reveal, stay, hide
    opacityTiming: [0, 0.2, 0.65, 0.85],           // Fade in/out timing
    opacityValues: [0, 1, 1, 0],                   // Opacity values
    // Floating animation (subtle depth effect)
    F: {
        y: [0, -14, 0],      // Vertical movement (pixels)
        x: [0, 6, 0],        // Horizontal sway (pixels)
        rotate: [0, 2.5, 0], // Rotation (degrees)
        duration: 2,         // Duration in seconds (higher = slower)
        ease: "easeInOut",
    }
};

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

    // Branch reveal animation - smooth scroll-triggered reveal from top
  // Branch reveal animation - anchored at top
const rawBranchY = useTransform(
  scrollYProgress,
  [0.15, 0.55],
  [-600, 20] // start at 0 (top position), move down by max 100px
);

const branchY = useSpring(rawBranchY, {
  stiffness: 100,
//   damping: 22,
  mass: 0.5,
});


const branchOpacity = 1;


    return (
        <section id="overview" ref={sectionRef} className="relative overflow-hidden   md:h-screen flex flex-col justify-center py-14 md:py-0  bg-[#F7F2EA]">
            {/* Left Animated Wave Group (SVG) */}
            <motion.div style={{ y: yBackground }} className="  hidden md:block pointer-events-none absolute inset-0 z-0 overflow-hidden">
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
                <svg className="absolute  top-0 right-0 h-full w-[300px] lg:w-[400px]" preserveAspectRatio="none" viewBox="0 0 100 800">
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

           

            {/* Desktop Branch (Hidden on Mobile) */}
            <motion.div
  className="hidden md:block absolute pointer-events-none z-10 will-change-transform"
  style={{
    y: branchY,
    opacity: branchOpacity,  // keep fade-in
    left: BRANCH_CONFIG.desktop.left,
    top: '-50px',            // anchor top
    width: BRANCH_CONFIG.desktop.width,
    height: BRANCH_CONFIG.desktop.height,
  }}
>
  <img
    src={mangoBranchImage}
    alt="Mango branch decoration"
    className="w-full h-full object-contain"
  />
</motion.div>



            <motion.div
                className="relative w-full  max-w-[1400px] mx-auto px-2 lg:px-16 py-1 lg:py-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={CONTAINER_VARIANTS}
            > <FloatUpText
className="text-[#a1461a] text-xs md:pt-30 text-center     tracking-[0.2em] mb-5 ">                           
                        
                            OVERVIEW
                        </FloatUpText>
                <div className="flex flex-col mx-auto max-w-5xl lg:flex-row   gap-10 lg:gap-14 items-start justify-end">
                    {/* <motion.div
                        className="lg:w-[240px]  flex-shrink-0"
                        style={{ y: yImage }}
                        variants={IMAGE_VARIANTS}
                    >
                        <motion.img
                            src={natureSignImage}
                            alt="Decorative leaves"
                            animate={IMAGE_FLOAT_ANIMATION}
                            transition={IMAGE_FLOAT_TRANSITION}
                            className="w-[175px] lg:w-[220px]  h-auto   -mt-65"
                        />
                    </motion.div> */}

                    <div className="flex-1 max-w-4xl    px-6 ">
                        {/* Eyebrow */}
                        

                        {/* Section Heading with Word Reveal */}
                        <div className="mb-10 md:mb-6 ">
                            <FloatUpText className=" hidden md:block  section-heading">{HEADLINE_TEXT}</FloatUpText>
                            <FloatUpText className="md:hidden text-xl  ">{HEADLINE_TEXT}</FloatUpText>
                           
                        </div>


                        {/* Body */}
                        <FloatUpText className="space-y-5 text-base leading-loose ">
                            <p>
                                Welcome to Nature's Sign, a thoughtfully planned plotted development in Bengaluru. A feature-rich residential community designed for those who value space, flexibility, and a superior lifestyle. Every plot is seamlessly integrated with modern infrastructure and essential amenities, creating a harmonious and well-balanced living environment.
                            </p>

                            <p
                               
                            >
                                Strategically located, Nature's Sign places you close to everything a global citizen needs--yet remains peacefully secluded from the city's noise and chaos. With excellent connectivity, lush open spaces, and a vibrant neighborhood, it offers the perfect canvas to build your dream home in a truly thriving community.
                            </p>
                        </FloatUpText>
                    </div>

                </div>

                <div className="mt-2 md:mt-10 pt-4 ">
                    {/* Stats grid */}
                    

                    {/* CTA */}
                    
                </div>
            </motion.div>
        </section>
    );
};

export default OverviewDetailsSection;