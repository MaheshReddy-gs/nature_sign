import { motion } from "framer-motion";
import { useModal } from "../context/ModalContext";
import AnimatedHeading from "./Animations/animatedHeading";
import FloatUpText from "./Animations/floatUpText";
import RevealImage from "./Animations/TopDownImageReveal";

export default function BuilderSection() {
    const { openModal } = useModal();
    return (
        <section
            id="builder"
            className="w-full    bg-white  md:py-20  flex justify-center items-center flex-col relative overflow-hidden"   
        >
            {/* 1. TOP TITLE - Centered */}
            <div className="text-center mb-10">
                 <FloatUpText className="text-[#a1461a] text-xs tracking-[0.2em] mb-5 ">
                    ABOUT BUILDER
                </FloatUpText>
            </div>

            <FloatUpText
                className="max-w-6xl gap-y-3 px-6 w-full mx-auto flex flex-col  md:flex-row items-center justify-between  mb-12 border-b-0 border-gray-200 pb-0"
            >
                {/* LOGO - Left */}
                <div className="flex    items-center gap-3 w-full md:w-auto justify-center md:justify-start">
                    <img
                        src="/shreyasLogo.png"
                        alt="Shreyas Infra Logo"
                        className="h-14 md:h-16 w-auto object-contain"
                    />
                </div>

                {/* TEXT INFO - Right */}
                <div className="text-center md:text-left w-full md:w-auto">
                    <h3 className=" text-lg font-bold  #222] leading-none mb-1   ">
                        Shreyas Infra Projects Pvt.Ltd.
                    </h3>
                    <p className=" text-base   ">
                        Marathahalli, Bengaluru
                    </p>
                </div>
            </FloatUpText>

            {/* MAIN CONTENT CARD */}
            <div className=" max-w-6xl px-6 mx-auto">
                <FloatUpText
                    className="relative w-full overflow-hidden bg-[#2D8EA2] rounded-lg  flex flex-col   md:flex-row" 
                  
                >
                    {/* Decorative Background Circles (Subtle) */}
                    <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-[-50px] right-[40%] w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

                    {/* TEXT CONTENT - Left Side (60%) */}
                    <div className="relative z-10 w-full   md:w-[55%]   p-8 md:p-10    flex flex-col justify-center text-white order-2   md:order-1">
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className=" section-heading mb-8  "
                        >
                            Crafting meaningful experiences where
                            every detail is carefully envisioned.
                        </motion.h3>

                        <div className="space-y-6  text-base  text-white/90   ">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                At Shreyas Infra, we know that true quality emerges from attention
                                to detail and the finesse of skilled craftsmanship. Guided by a
                                pursuit of perfection, we create more than living spaces, we
                                curate experiences where every feature holds purpose and intention.
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                For us at Shreyas Infra, excellence lives in the subtle details and
                                the artistry of creating with care. Rooted in our promise of
                                perfection, we design not just structures but thoughtfully crafted
                                environments that elevate everyday living.
                            </motion.p>
                        </div>

                        <motion.button
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-10 px-8 py-3 w-fit border border-white  text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-[#2D8EA2] transition-colors duration-300 rounded-[2px]"
                            onClick={() => openModal({ initialValues: { message: "Request Site Visit" } })}
                        >
                            Request Site Visit
                        </motion.button>
                    </div>

                    {/* IMAGE - Right Side (40%) */}
                    <div className="relative w-full   md:w-[45%] bg-gray-200 order-1   md:order-2 h-[300px]   md:h-auto">
                        <RevealImage
                            src="/builderIMG.webp"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x800/2D8EA2/FFFFFF?text=Builder+Image"; }}
                            alt="Builder Discussion"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>

                </FloatUpText>
            </div>
        </section>
    );
}
