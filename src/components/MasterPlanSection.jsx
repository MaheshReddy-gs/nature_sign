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
  {/* ✅ WHITE STRIP HERE (FULL WIDTH) */}
  <div className="absolute top-0 left-0 w-full bg-white h-[110px] z-50">
    <motion.p
      className="h-full flex items-center justify-center text-[#B56A4E] font-bold tracking-[0.2em] text-xs uppercase"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6 }}
    >
      MASTER PLAN
    </motion.p>
  </div>

            <div className="relative max-w-7xl mx-auto px-6 z-10 w-full h-full flex flex-col justify-center">



              <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start justify-center h-auto lg:h-[80vh]">


{/* LEFT SIDE: Plot sizes + Logo (ONLY this will move) */}
<motion.div
  className="relative z-10 flex flex-col gap-10 lg:gap-14 w-full lg:w-[260px] 
             items-start mx-auto lg:mx-0 lg:absolute lg:left-[260px] lg:top-[180px]"
  initial={{ opacity: 0, x: -30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: false }}
  transition={{ duration: 0.8 }}
>
  {/* Plot Sizes */}
  <div>
    <h3 className="text-black font-semibold text-base mb-2">
      Plot Sizes
    </h3>

    <div className="flex flex-col gap-2 w-[170px]">
      {PLOT_SIZES.map((size, index) => (
        <div
          key={index}
          className="border border-[#7a7a7a] text-black font-semibold text-sm px-6 py-1.5 text-center leading-tight bg-transparent"
        >
          {size}
        </div>
      ))}
    </div>
  </div>

  {/* Logo */}
  <div className="mt-10">
    <img
      src="/logo.jpeg"
      alt="Nature's Sign"
      className="w-[180px] h-auto object-contain opacity-95"
    />
  </div>
</motion.div>

{/* RIGHT SIDE: Masterplan image (STAYS FIXED) */}
<motion.div
  className="w-full lg:absolute lg:right-[40px] lg:top-[150px] lg:w-[900px]"
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: false }}
  transition={{ duration: 0.8 }}
>
  <div className="w-full flex flex-col items-center">
    <img
      src="/masterplan.webp"
      alt="Master Plan Map"
      className="w-full object-contain max-h-[65vh]"
    />
  </div>
</motion.div>



                </div>
            </div>
        </section>
    );
};

export default MasterPlanSection;
