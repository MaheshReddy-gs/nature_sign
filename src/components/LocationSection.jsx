import { motion } from 'framer-motion';

const LocationSection = () => {
    return (
        <section id="location" className="relative font-['Montserrat']">
            {/* 1. Main Content Area */}
            <div className="bg-white pt-20 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Heading */}
                    <div className="text-center mb-16">
                        <p className="text-[#B96A42] font-bold tracking-[0.2em] text-xs uppercase">
                            LOCATION
                        </p>
                    </div>

                    {/* Logo & Address Row */}
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12 px-4 md:px-0">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <img
                                src="/naturesignlogo.svg"
                                alt="Nature's Sign"
                                className="h-16 w-auto object-contain"
                            />
                        </div>

                        {/* Address */}
                        <div className="max-w-md text-center md:text-left">
                            <h3 className="text-[#4A5D56] font-bold text-lg mb-2">Nature&apos;s Sign</h3>
                            <p className="text-[#6B7C76] text-sm leading-relaxed">
                                No.51, 3rd Floor, Chourasia Shreyas Arcade, 3rd Cross,<br className="hidden md:block" />
                                Aswath Nagar, Marathahalli, Bengaluru 560037, Karnataka
                            </p>
                        </div>
                    </div>

                    {/* Map Image */}
                    <motion.div
                        className="w-full bg-[#E8DCC6] p-2 md:p-4 rounded-sm"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src="/location_map.png"
                            alt="Location Map"
                            className="w-full h-auto object-cover border border-[#D6C8B0]"
                        />
                    </motion.div>
                </div>
            </div>

            {/* 2. Blue CTA Footer */}
            <div className="bg-[#307889] py-16 px-6 text-white">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
                    <div className="max-w-2xl">
                        <h2 className="text-2xl md:text-3xl font-medium mb-4">
                            Are you excited about the project?
                        </h2>
                        <p className="text-white/80 text-sm md:text-base leading-relaxed font-light">
                            Don&apos;t miss the opportunity to own a property in the fast growing satellite township of Devanahalli.
                        </p>
                    </div>

                    <motion.button
                        className="bg-[#FF5A00] hover:bg-[#E04F00] text-white py-4 px-8 rounded shadow-lg uppercase text-xs font-bold tracking-[0.15em] transition-all duration-300"
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
