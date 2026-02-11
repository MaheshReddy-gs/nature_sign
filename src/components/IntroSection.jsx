import { motion } from 'framer-motion';
import { useModal } from '../context/ModalContext';
import FloatUpText from './Animations/floatUpText';

const leaf = "/leaf.webp";
const naturesignlogo = "/natureSignWhiteLogo.webp";

const IntroSection = () => {
    const { openModal } = useModal();
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

    return (<>
        <section className='relative flex  '>


            <div className=" bg-[#F7F2EA] top-0  py-10 md:py-0 left-1/2 transform min-h-[20vh] flex w-screen justify-center items-center   z-30 pt-10"
            >


                <div className="grid  p-6 md-p-0 grid-cols-2 gap-y-6 md:gap-y-4 gap-x-10 max-w-6xl w-full items-center
                md:flex md:justify-between">
                    {/* Item */}
                    <FloatUpText
                        className=" flex flex-col justify-start h-full md:border-r md:border-[#E6DDD0]  md:pr-6"

                    >
                        <p className="text-[#a1461a] text-xs    tracking-[0.2em] ">
                            LOCATION
                        </p>
                        <p className="text-base">
                            Devanahalli, Bengaluru
                        </p>
                    </FloatUpText>

                    <FloatUpText
                        className=" md:border-r flex flex-col justify-start h-full md:border-[#E6DDD0] md:px-6"

                    >
                        <p className="text-[#a1461a] text-xs    tracking-[0.2em] ">
                            LAND ACTIVATOR
                        </p>
                        <p className="text-base">
                            12,000-acre IT Investment Region (ITIR)
                        </p>
                    </FloatUpText>

                    <FloatUpText
                        className="flex flex-col justify-start h-full md:border-r md:border-[#E6DDD0] md:px-2"

                    >
                        <p className="text-[#a1461a] text-xs    tracking-[0.2em] ">
                            TOTAL LAND AREA
                        </p>
                        <p className="text-base">
                            30 Acres
                        </p>
                    </FloatUpText>

                    <FloatUpText
                    >
                        <p className="text-[#a1461a] text-xs    tracking-[0.2em] ">
                            TOTAL UNITS
                        </p>
                        <p className="text-base">
                            250 Units
                        </p>
                    </FloatUpText>
                    <FloatUpText className="col-span-2 flex justify-center md:col-auto">
                        <motion.button
                            onClick={() => openModal({ initialValues: { message: "Enquiry" } })}
                            className="bg-[#FF5A00] hover:bg-[#E04F00] text-white py-4 px-12 rounded shadow-[0_10px_20px_rgba(255,90,0,0.3)] uppercase text-[11px] font-bold tracking-[0.2em] transition-all duration-100 "
                            whileTap={{ scale: 1 }}
                        >
                            Ask Price
                        </motion.button></FloatUpText>
                </div>
            </div>
            {/* 🔶 TOP RERA BAR */}
            <div
                className="absolute top-0 left-1/2 md:w-auto w-full transform -translate-x-1/2  z-30"
                style={{
                    backgroundColor: "#8B4513",
                    color: "#FFFFFF",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    padding: "8px 24px",
                    borderBottomLeftRadius: "4px",
                    borderBottomRightRadius: "4px",
                }}
            >
                RERA Reg. NO. PRM/KA/RERA/1250/303/PR/041125/008220
            </div>
        </section>
        <section
            className="relative  py-16 md:py-0 md:h-screen w-full overflow-hidden"
            style={{
                background:
                    "linear-gradient(135deg, #A5B03B 0%, #D4C94A 30%, #E8C55A 50%, #EFB86A 75%, #D8A85F 100%)",
            }}
        >

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
                    className="text-[11px] tracking-[0.2em] uppercase mb-4  text-[#ffffff] "
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
                    className="max-w-3xl text-center mb-10 px-6"
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

                    onClick={() => openModal({
                        submitText: 'Download Brochure',
                        onSuccess: () => {
                            const link = document.createElement('a');
                            link.href = '/Naturessign_by_shreyasinfra_brochure.pdf';
                            link.download = 'NaturesSign_Brochure.pdf';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }
                    })}

                    className="bg-[#FF5A00] hover:bg-[#E04F00] text-white py-4 px-12 rounded shadow-[0_10px_20px_rgba(255,90,0,0.3)] uppercase text-[11px] font-bold tracking-[0.2em] transition-all duration-100 "
                    whileTap={{ scale: 1 }}

                >
                    DOWNLOAD BROCHURE
                </motion.button>

            </motion.div>
        </section></>
    );
};

export default IntroSection;
