import { motion } from 'framer-motion';
import { FaWhatsapp } from "react-icons/fa";
import ContactForm from './ContactForm';
import FloatUpText from "./Animations/floatUpText";
const ContactSection = () => {
    return (
        <section id="contact" className="relative font-sans">
            {/* 1. Header Title (Outside Background) */}
            <div className="bg-white pt-32 pb-12 text-center">
                 <FloatUpText className="text-[#a1461a] text-center text-xs tracking-[0.2em] uppercase mb-5 ">Contact</FloatUpText>
            </div>

            {/* 2. Hero Background with Overlay Form */}
            <div className="relative w-full h-[850px] lg:h-[650px] bg-gray-800">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/hero_background.webp"
                        alt="Corporate Building"
                        className="w-full h-full object-cover opacity-60"
                        loading="lazy"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/60 mix-blend-multiply" />
                     <div className="absolute inset-0 flex items-center justify-center p-4   ">
                    <motion.div
                        className="bg-white rounded-3xl shadow-2xl p-8 lg:p-18 w-full max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-2xl md:section-heading text-center text-black mb-12 ">
                            Share query by filling out the form,<br/> we will assist you at the earliest.
                        </h1>

                        <ContactForm />
                    </motion.div>
                </div>
                </div>

                {/* Form Card */}
               
            </div>

            {/* 3. Footer Section */}
            <footer className="bg-[#1C1C1C] text-gray-400 py-12 pb-20 px-6 relative z-10">
                {/* ✅ WhatsApp Icon exactly on footer edge */}
                <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute -top-7 right-10 z-[9999] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl"
                >
                    <FaWhatsapp className="text-white text-3xl" />
                </a>


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
                            style={{ filter: "brightness(0) invert(1) opacity(0.6)" }}
                        />

                        <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                            <span>Follow us on</span>
                            <div className="flex gap-3">
  <a
    href="https://www.linkedin.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
  >
    <img
      src="/LinkedIn.svg"
      className="w-4 h-4 opacity-70 hover:opacity-100 cursor-pointer transition"
    />
  </a>

  <a
    href="https://www.instagram.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <img
      src="/insta.svg"
      className="w-4 h-4 opacity-70 hover:opacity-100 cursor-pointer transition"
    />
  </a>

  <a
    href="https://www.facebook.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
  >
    <img
      src="/facebook.svg"
      className="w-4 h-4 opacity-70 hover:opacity-100 cursor-pointer transition"
    />
  </a>
</div>
                        </div>
                    </div>
                </div>

            </footer>

        </section >
    );
};

export default ContactSection;
