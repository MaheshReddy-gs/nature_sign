import { motion, useScroll, useTransform } from 'framer-motion';
import { useModal } from '../context/ModalContext';
import { ReraBadge, BiaapaBadge } from './RotatingBadge';
import { useRef } from 'react';

export default function HeroSection() {
  const { openModal } = useModal();
  const heroRef = useRef(null);

  /* ---------------- PARALLAX SETUP ---------------- */

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Background moves slower → reveal lower part of image
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -220]);
  // adjust -220 based on how tall your image is

  /* ---------------- TEXT ANIMATIONS ---------------- */

  const slideRevealLeft = {
  hidden: { x: '-100%' },
  visible: {
    x: '0%',
    transition: {
      duration: 1.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};


  const slideFromBottom = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.35,
        delayChildren: 0.4,
      },
    },
  };

  /* ---------------- RENDER ---------------- */

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full h-[85vh] lg:h-screen overflow-hidden flex items-center pt-24"
    >
      {/* ================= PARALLAX BACKGROUND ================= */}
      <motion.div
  className="absolute top-0 left-0 w-full"
  style={{
    y: bgY,
    height: '130%', // or exact px matching your image
    backgroundImage: "url('/hero_background123.webp')",
    backgroundSize: 'cover',
    backgroundPosition: 'right top',
    willChange: 'transform',
  }}
/>


      {/* ================= OVERLAY ================= */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/10 via-black/25 to-black/40" />

      {/* ================= DESKTOP BADGES ================= */}
      <div className="hidden lg:flex absolute bottom-20 right-12 z-30 items-center gap-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          <ReraBadge size={140} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.9 }}
        >
          <BiaapaBadge size={140} />
        </motion.div>
      </div>

      {/* ================= CONTENT ================= */}
      <motion.div
        className="relative z-30 max-w-5xl mx-auto px-6 text-center lg:text-left"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="overflow-hidden">
  <motion.div
    variants={slideRevealLeft}
    initial="hidden"
    animate="visible"
    transition={{ delay: 0.5 }}
  >
    <div
      className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight"
    >
      Nature&apos;s canvas,<br/> crafted with finesse.
    </div>
  </motion.div>
</div>


       <div className="overflow-hidden">
  <motion.p
    className="text-lg text-white mb-10 max-w-2xl mx-auto lg:mx-0 font-light"
    variants={slideRevealLeft}
    initial="hidden"
    animate="visible"
    transition={{ delay: 1 }}
  >
    Premium Plotted Development in
    <br />
    Devanahalli, Bengaluru.
  </motion.p>
</div>


        {/* MOBILE BADGES */}
        <motion.div
          className="flex lg:hidden justify-center gap-4 mb-8"
          variants={ slideRevealLeft}
        >
          <ReraBadge size={110} />
          <BiaapaBadge size={110} />
        </motion.div>

        {/* CTA */}
        
        <motion.div
          className="flex justify-center lg:justify-start"
          variants={slideFromBottom}
        >
          <motion.button
            onClick={() => openModal({ initialValues: { message: 'Enquiry' } })}
            className="bg-[#FF5A00] hover:bg-[#E04F00] text-white py-4 px-12 rounded shadow-[0_10px_20px_rgba(255,90,0,0.3)] uppercase text-[11px] font-bold tracking-[0.2em]"
            whileTap={{ scale: 0.96 }}
          >
            Enquire Now
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
