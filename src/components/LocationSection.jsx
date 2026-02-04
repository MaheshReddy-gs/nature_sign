import { motion } from 'framer-motion';

const LocationSection = () => {
    return (
        <section id="location" className="relative font-['Montserrat'] min-h-screen lg:h-screen flex flex-col bg-white">
            {/* 1. Main Content Area - Flex Grow to take available space */}
            <div className="flex-grow flex flex-col pt-8 pb-4 px-6 overflow-hidden">
                <div className="w-full max-w-7xl mx-auto flex flex-col h-full">
                    {/* Heading */}
                    <div className="text-center mb-6 flex-shrink-0">
                        <p className="text-[#B96A42] font-bold tracking-[0.2em] text-xs uppercase">
                            LOCATION
                        </p>
                    </div>

                    {/* Logo & Address Row */}
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 mb-4 px-4 md:px-0 flex-shrink-0">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <img
                                src="/naturesignlogo.svg"
                                alt="Nature's Sign"
                                className="h-12 lg:h-14 w-auto object-contain"
                            />
                        </div>

                        {/* Address */}
                        <div className="max-w-md text-center md:text-left">
                            <h3 className="text-[#4A5D56] font-bold text-base lg:text-lg mb-1">Nature&apos;s Sign</h3>
                            <p className="text-[#6B7C76] text-xs lg:text-sm leading-relaxed">
                                No.51, 3rd Floor, Chourasia Shreyas Arcade, 3rd Cross,<br className="hidden md:block" />
                                Aswath Nagar, Marathahalli, Bengaluru 560037, Karnataka
                            </p>
                        </div>
                    </div>

                    {/* Map Image Container - Grows to fill space */}
                    <motion.div
                        className="flex-grow bg-[#E8DCC6] p-2 rounded-sm overflow-hidden flex items-center justify-center relative min-h-0"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src="/location_map.png"
                            alt="Location Map"
                            className="w-full h-full object-contain border border-[#D6C8B0] max-h-full"
                        />
                    </motion.div>
                </div>
            </div>

            {/* 2. Blue CTA Footer - Fixed height at bottom */}
            <div className="bg-[#307889] py-8 px-6 text-white flex-shrink-0 z-10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                    <div className="max-w-2xl">
                        <h2 className="text-xl md:text-2xl font-medium mb-2">
                            Are you excited about the project?
                        </h2>
                        <p className="text-white/80 text-xs md:text-sm leading-relaxed font-light">
                            Don&apos;t miss the opportunity to own a property in the fast growing satellite township of Devanahalli.
                        </p>
                    </div>

                    <motion.button
                        className="bg-[#FF5A00] hover:bg-[#E04F00] text-white py-3 px-6 rounded shadow-lg uppercase text-[10px] md:text-xs font-bold tracking-[0.15em] transition-all duration-300 whitespace-nowrap"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        REQUEST SITE VISIT
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default LocationSection;
