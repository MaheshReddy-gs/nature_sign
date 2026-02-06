import { motion } from 'framer-motion';
import { useModal } from '../context/ModalContext';
import { ReraBadge, BiaapaBadge } from './RotatingBadge';

export default function HeroSection() {
  const { openModal } = useModal();

  // Animation variants
  const slideFromLeft = {
    hidden: { opacity: 0, x: -120 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 2.4,
        ease: [ 0.25, 0.46, 0.45, 0.94 ]
      }
    }
  };

  const slideFromBottom = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [ 0.25, 0.46, 0.45, 0.94 ]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35,
        delayChildren: 0.4
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-[70vh] lg:h-screen flex items-center justify-center overflow-hidden pt-20 pb-5 md:pb-0"
      style={{
        backgroundImage: `url('/hero_background.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/30"></div>

      {/* Rotating Badges - Top right on mobile, bottom right on desktop */}
      <div className="absolute top-24 right-2 lg:bottom-20 lg:top-auto lg:right-12 z-20 flex flex-col lg:flex-row items-center gap-2 lg:gap-5">
        {/* RERA Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        >
          <ReraBadge size={80} className="lg:w-[140px] lg:h-[140px]" />
        </motion.div>

        {/* BIAAPA Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
        >
          <BiaapaBadge size={80} className="lg:w-[140px] lg:h-[140px]" />
        </motion.div>
      </div>

      {/* Content Container */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center lg:text-left"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >

        {/* Main Heading - Slide from left */}
        <motion.h1
          className="md:text-4xl text-3xl lg:text-6xl font-bold text-white mb-8 leading-tight"
          variants={slideFromLeft}
        >
          Nature's canvas,<br />crafted with finesse.
        </motion.h1>

        {/* Subheading - Slide from left */}
        <motion.p
          className="text-lg text-white mb-10 max-w-2xl mx-auto lg:mx-0 font-light"
          variants={slideFromLeft}
        >
          Premium Plotted Development in<br />
          Devanahalli, Bengaluru.
        </motion.p>

        {/* CTA Button - Slide from bottom */}
        <motion.div
          className="flex justify-center lg:justify-start"
          variants={slideFromBottom}
        >
          <motion.button
            onClick={() => openModal({ initialValues: { message: "Enquiry" } })}
            className="bg-[#FF5A00] hover:bg-[#E04F00] text-white py-4 px-12 rounded shadow-[0_10px_20px_rgba(255,90,0,0.3)] uppercase text-[11px] font-bold tracking-[0.2em] transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Enquire Now
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
