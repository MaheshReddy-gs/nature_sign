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

                {/* WhatsApp Floating Button */}
                <motion.a
                    href="#"
                    className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382C17.111 14.382 14.6 13.272 14.161 13.061C13.684 12.83 13.488 12.868 13.243 13.15C13.045 13.435 12.19 14.382 11.97 14.629C11.758 14.876 11.531 14.931 10.982 14.639C10.472 14.39 9.176 13.846 7.828 12.645C6.762 11.693 6.046 10.518 5.798 10.126C5.59 9.73 5.783 9.539 5.968 9.336C6.188 9.117 6.447 8.761 6.666 8.528C6.666 8.528 6.812 8.356 6.945 8.16C7.054 7.962 7.009 7.79 6.918 7.618C6.828 7.447 6.134 5.766 5.842 5.093C5.578 4.436 5.289 4.542 5.094 4.542H4.492C4.265 4.542 3.869 4.623 3.551 4.965C3.178 5.378 2.378 6.131 2.378 7.669C2.378 9.208 3.499 10.697 3.655 10.906C3.812 11.116 5.811 14.195 8.874 15.519C10.669 16.295 11.739 16.48 12.778 16.319C14.282 16.082 15.706 15.362 16.324 14.493C16.943 13.623 16.943 12.868 16.742 12.525C16.541 12.183 16.071 12.062 15.582 11.832L17.472 14.382Z" />
                    </svg>
                </motion.a>
            </footer>
        </section>
    );
};

export default ContactSection;
