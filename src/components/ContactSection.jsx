import { motion } from 'framer-motion';

const ContactSection = () => {
    return (
        <section id="contact" className="relative font-['Montserrat']">

            {/* 1. Header Title (Outside Background) */}
            <div className="bg-white pt-16 pb-12 text-center">
                <p className="text-[#B96A42] font-bold tracking-[0.2em] text-xs uppercase">
                    CONTACT
                </p>
            </div>

            {/* 2. Hero Background with Overlay Form */}
            <div className="relative w-full h-[650px] lg:h-[600px] bg-gray-800">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/contact_bg.png"
                        alt="Corporate Building"
                        className="w-full h-full object-cover opacity-60"
                        loading="lazy"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/60 mix-blend-multiply" />
                </div>

                {/* Form Card */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                    <motion.div
                        className="bg-white rounded-[2rem] shadow-2xl p-6 lg:p-8 w-full max-w-lg mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-xl lg:text-2xl font-semibold text-[#1A1A1A] text-center mb-6 leading-snug">
                            Share query by filling out the form, we will assist you at the earliest.
                        </h2>

                        <form className="space-y-4">
                            <div className="flex flex-col gap-4">
                                {/* Name */}
                                <input
                                    type="text"
                                    placeholder="Your Name*"
                                    className="w-full bg-[#F3F4F6] text-[#4A5568] px-5 py-3 rounded-full border-none outline-none focus:ring-2 focus:ring-[#FF5A00]/50 placeholder-gray-500 text-sm"
                                />
                                {/* Email */}
                                <input
                                    type="email"
                                    placeholder="Email*"
                                    className="w-full bg-[#F3F4F6] text-[#4A5568] px-5 py-3 rounded-full border-none outline-none focus:ring-2 focus:ring-[#FF5A00]/50 placeholder-gray-500 text-sm"
                                />
                                {/* Phone */}
                                <input
                                    type="tel"
                                    placeholder="Phone Number *"
                                    className="w-full bg-[#F3F4F6] text-[#4A5568] px-5 py-3 rounded-full border-none outline-none focus:ring-2 focus:ring-[#FF5A00]/50 placeholder-gray-500 text-sm"
                                />
                            </div>

                            <div className="flex flex-col items-center pt-2 gap-3">
                                <p className="text-[10px] text-center text-gray-500 font-medium w-full text-left ml-2">
                                    Required fields are marked *
                                </p>
                                <motion.button
                                    className="w-full bg-[#FF5A00] hover:bg-[#E04F00] text-white py-3 px-8 rounded-full shadow-lg uppercase text-[11px] font-bold tracking-[0.1em] flex items-center justify-center gap-2 transition-all duration-300"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    GET A CALL BACK
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* 3. Footer Section */}
            <footer className="bg-[#1C1C1C] text-gray-400 py-12 px-6 relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end md:items-center gap-8">

                    {/* Left Side: Copyright */}
                    <div className="text-xs space-y-3 font-light tracking-wide text-gray-500">
                        <p>Copyright © 2026 - All Rights Reserved</p>
                        <div className="flex gap-2">
                            <span className="cursor-pointer hover:text-white transition-colors">Disclaimer</span>
                            <span>|</span>
                            <span className="cursor-pointer hover:text-white transition-colors">RERA Disclaimer</span>
                        </div>
                    </div>

                    {/* Right Side: Logo & Socials */}
                    <div className="flex flex-col items-end gap-4">
                        <img
                            src="/naturesignlogo.svg"
                            alt="Nature's Sign"
                            className="h-8 md:h-10 w-auto opacity-80 invert brightness-0 grayscale"
                            // Styling logo to look white/grey on dark bg as per ref
                            style={{ filter: "brightness(0) invert(1) opacity(0.6)" }}
                        />

                        <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                            <span>Follow us on</span>
                            <div className="flex gap-3 text-sm">
                                <a href="#" className="hover:text-white transition-colors"><i className="fab fa-linkedin-in"></i> in</a>
                                <a href="#" className="hover:text-white transition-colors"><i className="fab fa-instagram"></i> ig</a>
                                <a href="#" className="hover:text-white transition-colors"><i className="fab fa-facebook-f"></i> fb</a>
                            </div>
                        </div>
                    </div>
                </div>

            </footer>
        </section>
    );
};

export default ContactSection;
