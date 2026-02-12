import { motion, useScroll, useTransform } from 'framer-motion';
import { useModal } from '../context/ModalContext';
import { ReraBadge, BiaapaBadge } from './RotatingBadge';
import { useRef, useState, useEffect } from 'react';

export default function HeroSection() {
  const { openModal } = useModal();
  const heroRef = useRef(null);

  /* ---------------- PARALLAX SETUP ---------------- */

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

const bgY = useTransform(
  scrollYProgress,
  [0, 1],
  isMobile ? [0, -120] : [0, -220]
);


  /* ---------------- SLIDE STATE (ONLY ADDITION) ---------------- */

 const slides = [
  {
    image: "/hero_background123.webp", // desktop
    mobileImage: "/hero_mobile_bg1.webp", // mobile
    subtext: (
      <>
        Premium Pre-Launch Plots&nbsp;&nbsp; |&nbsp;&nbsp;Airport–Nandi Hills Corridor <br />
        Price starting at ₹5,799/sq.ft
      </>
    ),
    duration: 4000,
  },
  {
    image: "/hero_image_2.webp", // desktop
    mobileImage: "/hero_mobile_bg2.webp", // mobile
    subtext: (
  <>
    North Bengaluru is fast becoming the city&apos;s next investment hotspot <br/> with NH-44, Airport & Foxconn driving growth.
  </>


    ),
    duration: 5000,
  }
];


useEffect(() => {
  slides.forEach(slide => {
    const img = new Image();
    img.src = slide.image;
  });
}, []);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent(prev => (prev === 0 ? 1 : 0));
    }, slides[current].duration);

    return () => clearTimeout(timer);
  }, [current]);

  /* ---------------- TEXT ANIMATIONS (UNCHANGED) ---------------- */

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
  className="relative w-full min-h-[85vh] lg:h-screen overflow-hidden flex md:items-center  pt-24 bg-black"
>

      {/* ================= PARALLAX BACKGROUNDS (STACKED) ================= */}
      <div className="absolute inset-0">
  {slides.map((slide, index) => {
    const isActive = index === current;

    return (
      <>
        {/* Desktop Background */}
        <motion.div
          key={`desktop-${index}`}
          className="hidden md:block absolute top-0 left-0 w-full h-[135%]"
          style={{
            y: bgY,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'right top',
            willChange: 'transform',
            zIndex: slides.length - index,
          }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />

        {/* Mobile Background */}
        <motion.div
          key={`mobile-${index}`}
className="block md:hidden absolute top-0 left-0 w-full h-[135%]"
          style={{
            y: bgY,
            backgroundImage: `url(${slide.mobileImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'right bottom',
            willChange: 'transform',
            zIndex: slides.length - index,
          }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </>
    );
  })}
</div>



      {/* ================= OVERLAY (UNCHANGED) ================= */}
      <div className="absolute  hidden md:block inset-0 z-10 bg-gradient-to-b from-black/10 via-black/25 to-black/40" />

      {/* ================= DESKTOP BADGES (UNCHANGED) ================= */}
      <div className="hidden lg:flex  absolute bottom-20 right-12 z-30 items-center gap-5">
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

      {/* ================= CONTENT (100% SAME STRUCTURE) ================= */}
      <motion.div
        className="relative  z-30 max-w-5xl mx-auto px-6 text-center lg:text-left"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* HEADING (UNCHANGED) */}
        <div className="overflow-hidden">
          <motion.div
            variants={slideRevealLeft}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <div className="text-[1.7rem] md:text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Smart money is moving to
              <br className="hidden md:block" /> Airport–Nandi hills belt
            </div>
          </motion.div>
        </div>

        {/* SUBTEXT (ENTRY ANIMATION SAME — ONLY CONTENT FADES INSIDE) */}
        <div className="overflow-hidden">
          <motion.p
            className="relative text-base md:text-lg text-white mb-8 md:mb-10 max-w-2xl mx-auto lg:mx-0 font-light h-[90px] md:h-auto"

            variants={slideRevealLeft}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1 }}
          >
            {slides.map((slide, index) => (
              <span
                key={index}
                style={{
                  position: index === current ? 'relative' : 'absolute',
                  opacity: current === index ? 1 : 0,
                  transition: 'opacity 0.9s ease-in-out',
                  left: 0,
                  top: 0,
                }}
              >
                {slide.subtext}
              </span>
            ))}
          </motion.p>
        </div>

        {/* MOBILE BADGES (UNCHANGED) */}
        <motion.div
          className="flex lg:hidden justify-center gap-4 mb-8"
          variants={slideRevealLeft}
        >
          <ReraBadge size={90} />
          <BiaapaBadge size={90} />
        </motion.div>

        {/* CTA (UNCHANGED) */}
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
