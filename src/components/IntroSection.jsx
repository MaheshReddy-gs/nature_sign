import { motion } from 'framer-motion';

const leaf = "/leaf.webp";
const naturesignlogo = "/naturesignlogo.svg";

const IntroSection = () => {
    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section
            className="relative h-screen w-full overflow-hidden"
            style={{
                background:
                    "linear-gradient(135deg, #A5B03B 0%, #D4C94A 30%, #E8C55A 50%, #EFB86A 75%, #D8A85F 100%)",
            }}
        >
            {/* 🔶 TOP RERA BAR */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 z-40"
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
            </motion.div>

            {/* 🍂 LEAF IMAGE */}
            <motion.img
                src={leaf}
                alt="leaf"
                initial={{ opacity: 0, x: 100, rotate: 5, scale: 0.9 }}
                animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    rotate: [ 12, 18, 12 ], // Swaying breeze effect
                    y: [ 0, -25, 0 ] // Deeper floating motion
                }}
                transition={{
                    opacity: { duration: 1.5, ease: "easeOut" },
                    x: { duration: 1.5, ease: "easeOut" },
                    scale: { duration: 1.5, ease: "easeOut" },
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
                }}
                className="absolute pointer-events-none select-none"
                style={{
                    top: "-90%",
                    right: "-20%",
                    height: "200%",
                    width: "auto",
                    objectFit: "contain",
                    zIndex: 10,
                }}
            />

            {/* CONTENT */}
            <motion.div
                className="relative z-20 h-full flex flex-col items-center justify-center text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >

                {/* INTRODUCING */}
                <motion.p
                    variants={itemVariants}
                    className="text-[11px] tracking-[0.3em] uppercase mb-4 font-['Montserrat'] text-[#8B4513] font-bold"
                >
                    INTRODUCING
                </motion.p>

                {/* LOGO */}
                <motion.img
                    variants={itemVariants}
                    src={naturesignlogo}
                    alt="Nature Sign Logo"
                    className="object-contain mb-4"
                    style={{
                        width: "min(60vw, 350px)",
                        filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))"
                    }}
                />

                {/* DESCRIPTION – MATCHING IMAGE */}
                <motion.p
                    variants={itemVariants}
                    className="max-w-[720px] text-center mb-10 px-6"
                    style={{
                        fontFamily: "Lato, Open Sans, Poppins, sans-serif",
                        fontSize: "17px",
                        lineHeight: "1.8",
                        color: "#2f2f2f",
                        fontWeight: 400,
                    }}
                >
                    30 acres of premium plotted development in a scenic mango farm with
                    stunning Nandi Hills views, your sign to live closer to nature and
                    secure high-growth investment.
                </motion.p>

                {/* BUTTON */}
                <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#FF5A00] hover:bg-[#E04F00] text-white py-4 px-12 rounded shadow-[0_10px_20px_rgba(255,90,0,0.3)] uppercase text-[11px] font-bold tracking-[0.2em] transition-all duration-300"
                >
                    DOWNLOAD BROCHURE
                </motion.button>

            </motion.div>
        </section>
    );
};

export default IntroSection;
