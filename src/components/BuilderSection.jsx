import { motion } from "framer-motion";
import { useModal } from "../context/ModalContext";

export default function BuilderSection() {
    const { openModal } = useModal();
    return (
        <section
            id="builder"
            className="w-full bg-white py-12 md:py-20 px-4 md:px-8 lg:px-12 font-sans" // Enforcing font-sans
        >
            {/* 1. TOP TITLE - Centered */}
            <div className="text-center mb-16">
                <p className="text-[12px] tracking-[0.25em] text-[#D06B28] font-bold uppercase font-sans">
                    About Builder
                </p>
            </div>

            {/* 2. HEADER ROW: Logo (Left) - Company Info (Right) */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 mb-12 border-b-0 border-gray-200 pb-0"
            >
                {/* LOGO - Left */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
                    <img
                        src="/shreyaslogo.png"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/200x60?text=Shreyas+Logo"; }}
                        alt="Shreyas Infra Logo"
                        className="h-16 md:h-20 w-auto object-contain"
                    />
                </div>

                {/* TEXT INFO - Right */}
                <div className="text-center md:text-left w-full md:w-auto">
                    <h3 className="text-[20px] md:text-[24px] font-bold text-[#222] leading-none mb-1 font-sans">
                        Shreyas Infra Projects Pvt.Ltd.
                    </h3>
                    <p className="text-[14px] font-medium text-[#666] font-sans">
                        Marathahalli, Bengaluru
                    </p>
                </div>
            </motion.div>

            {/* MAIN CONTENT CARD */}
            <div className="max-w-[1100px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="relative w-full overflow-hidden bg-[#2D8EA2] rounded-lg shadow-2xl flex flex-col lg:flex-row" // Flex row is key
                    style={{ minHeight: '520px' }}
                >
                    {/* Decorative Background Circles (Subtle) */}
                    <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-[-50px] right-[40%] w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

                    {/* TEXT CONTENT - Left Side (60%) */}
                    <div className="relative z-10 w-full lg:w-[55%] p-8 md:p-12 lg:p-16 flex flex-col justify-center text-white order-2 lg:order-1">
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-[22px] lg:text-[28px] font-semibold mb-8 leading-[1.3] font-sans tracking-wide"
                        >
                            Crafting meaningful experiences where
                            every detail is carefully envisioned.
                        </motion.h3>

                        <div className="space-y-6 text-[14px] lg:text-[15px] leading-[1.7] font-light text-white/90 font-sans">
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
                            className="mt-10 px-8 py-3 w-fit border border-white text-[12px] tracking-[0.15em] font-bold uppercase hover:bg-white hover:text-[#2D8EA2] transition-colors duration-300 rounded-[2px]"
                            onClick={openModal}
                        >
                            Request Site Visit
                        </motion.button>
                    </div>

                    {/* IMAGE - Right Side (40%) */}
                    <div className="relative w-full lg:w-[45%] bg-gray-200 order-1 lg:order-2 h-[300px] lg:h-auto">
                        <img
                            src="/builder.png"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x800/2D8EA2/FFFFFF?text=Builder+Image"; }}
                            alt="Builder Discussion"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
