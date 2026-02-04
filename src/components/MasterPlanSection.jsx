import { motion } from 'framer-motion';

const PLOT_SIZES = [
    "30' x 50'",
    "60' x 40'",
    "40' x 50'",
    "Odd sizes"
];

const MasterPlanSection = () => {
    return (
        <section id="master-plan" className="relative bg-[#FFFBF5] overflow-hidden min-h-screen lg:h-screen flex items-center justify-center py-8 lg:py-0 font-['Montserrat']">
            {/* 1. Corner Blobs (Background) */}
            {/* Top Left - Greenish/Teal */}
            <div className="pointer-events-none absolute top-0 -left-20 w-64 h-64 bg-[#A3BCB6] rounded-full opacity-40 blur-3xl" />
            <div className="pointer-events-none absolute top-0 -left-10 w-40 h-40 bg-[#A3BCB6] rounded-full opacity-60" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }} />

            {/* Bottom Left - Yellow */}
            <div className="pointer-events-none absolute bottom-0 -left-20 w-80 h-80 bg-[#F9E98D] rounded-full opacity-30 blur-3xl transform translate-y-1/4" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 w-60 h-60 bg-[#F9E98D] rounded-full opacity-50" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }} />


            {/* Bottom Right - Beige/Orange */}
            <div className="pointer-events-none absolute -bottom-20 -right-20 w-96 h-96 bg-[#E8CCA5] rounded-full opacity-30 blur-2xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 w-64 h-80 bg-[#F2E1C2] opacity-60" style={{ borderRadius: '100% 0% 0% 0% / 50% 0% 0% 0%' }} />


            <div className="relative max-w-7xl mx-auto px-6 z-10 w-full h-full flex flex-col justify-center">
                {/* Heading */}
                <motion.div
                    className="text-center mb-6 lg:mb-8 flex-shrink-0"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-[#B56A4E] font-bold tracking-[0.2em] text-xs uppercase">
                        MASTER PLAN
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center h-auto lg:h-[80vh]">

                    {/* LEFT SIDE: Legend & Logo */}
                    <motion.div
                        className="flex flex-col gap-8 lg:gap-12 lg:w-[240px] flex-shrink-0 justify-center"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Plot Sizes Legend */}
                        <div>
                            <h3 className="text-[#3C4A42] font-semibold text-base mb-3">Plot Sizes</h3>
                            <div className="flex flex-col gap-2">
                                {PLOT_SIZES.map((size, index) => (
                                    <div
                                        key={index}
                                        className="bg-[#F0EBE0]/50 border border-[#8C8C8C]/30 px-5 py-1.5 rounded-sm text-[#4A4A4A] font-medium text-xs shadow-sm cursor-default hover:bg-white hover:border-[#ACACAC] transition-colors"
                                    >
                                        {size}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Logo */}
                        <div className="mt-2">
                            <img
                                src="/naturesignlogo.svg"
                                alt="Nature's Sign"
                                className="w-32 h-auto object-contain opacity-90"
                            />
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE: Map Image */}
                    <motion.div
                        className="flex-grow w-full max-w-[900px] h-full flex items-center"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative p-2 bg-white/40 rounded-lg shadow-xl backdrop-blur-sm border border-white/60 w-full max-h-full flex flex-col">
                            <img
                                src="/master_plan_layout.png"
                                alt="Master Plan Map"
                                className="w-full h-full object-contain max-h-[65vh] rounded shadow-inner"
                            />

                            {/* Highway Strip (as seen in ref) */}
                            <div className="mt-2 h-8 bg-[#2b3336] flex items-center justify-center rounded-sm overflow-hidden shadow-md flex-shrink-0 relative">
                                <div className="w-full border-t border-dashed border-white/30 h-0" />
                                <span className="absolute text-[8px] text-white/70 uppercase tracking-widest bg-[#2b3336] px-2">
                                    Bangalore - Hyderabad National Highway - 44
                                </span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default MasterPlanSection;
