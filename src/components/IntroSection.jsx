import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const leaf = "/leaf.webp";
const naturesignlogo = "/naturesignlogo.svg";

// --- Constants ---
const DESCRIPTION_TEXT = "30 acres of premium plotted development in a scenic mango farm with stunning Nandi Hills views, your sign to live closer to nature and secure high-growth investment.";

const LEAF_ANIMATION = {
    rotate: [ 12, 18, 12 ],
    y: [ 0, -25, 0 ]
};

const LEAF_TRANSITION = {
    rotate: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
    },
    y: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
    }
};

const IntroSection = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: [ "start start", "end start" ]
    });

    const yLeaf = useTransform(scrollYProgress, [ 0, 1 ], [ "-50%", "0%" ]); // Parallax for leaf
    const yContent = useTransform(scrollYProgress, [ 0, 1 ], [ "0%", "50%" ]); // Parallax for content

    return (
        <section
            ref={sectionRef}
            id="intro-section"
            className="relative h-screen w-full overflow-hidden"
            style={{
                background:
                    "linear-gradient(135deg, #A5B03B 0%, #D4C94A 30%, #E8C55A 50%, #EFB86A 75%, #D8A85F 100%)",
            }}
        >
            {/* 🔶 TOP RERA BAR */}
            <div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 z-[60]"
                style={{
                    backgroundColor: "#8B4513",
                    color: "#FFFFFF",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    padding: "8px 24px",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 600,
                    borderBottomLeftRadius: "4px",
                    borderBottomRightRadius: "4px",
                    whiteSpace: "nowrap"
                }}
            >
                RERA Reg. NO. PRM/KA/RERA/1250/303/PR/041125/008220
            </div>

            {/* 🍂 LEAF IMAGE */}
            <motion.div
                className="absolute pointer-events-none select-none right-0 w-[100vw] md:w-[70vw] lg:w-[60vw] xl:w-[58vw] h-auto z-10"
                style={{ top: yLeaf, willChange: 'transform' }}
                initial={{ opacity: 1, x: 0, scale: 1 }} // No entrance animation
            >
                <motion.img
                    src={leaf}
                    alt="leaf"
                    animate={LEAF_ANIMATION}
                    transition={LEAF_TRANSITION}
                    className="w-full h-full object-contain"
                />
            </motion.div>

            {/* CONTENT */}
            <motion.div
                className="relative z-20 h-full flex flex-col items-center justify-center text-center"
                style={{ y: yContent, willChange: 'transform' }} // Keep parallax only
            >

                {/* INTRODUCING */}
                <p className="text-[11px] tracking-[0.3em] uppercase mb-4 font-['Montserrat'] text-[#8B4513] font-bold">
                    INTRODUCING
                </p>

                {/* LOGO */}
                <motion.img
                    src={naturesignlogo}
                    alt="Nature Sign Logo"
                    className="object-contain mb-4"
                    style={{
                        width: "min(60vw, 350px)",
                        filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))"
                    }}
                    whileHover={{ scale: 1.05, filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.15))" }}
                    transition={{ duration: 0.3 }}
                />

                {/* DESCRIPTION (Static) */}
                <div className="max-w-[750px] mb-12 px-4">
                    <p className="font-['Montserrat'] text-[18px] md:text-[22px] leading-[1.4] text-[#2c2c2c] text-center tracking-wide font-medium">
                        {DESCRIPTION_TEXT}
                    </p>
                </div>

                {/* BUTTON */}
                <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#FF5A00] hover:bg-[#E04F00] text-white py-4 px-12 rounded shadow-[0_10px_20px_rgba(255,90,0,0.3)] uppercase text-[11px] font-bold tracking-[0.2em] transition-all duration-300 cursor-pointer"
                >
                    DOWNLOAD BROCHURE
                </motion.button>

            </motion.div>
        </section>
    );
};

export default IntroSection;
