import { motion } from 'framer-motion';
import FloatUpText from "./Animations/floatUpText";
const PLOT_SIZES = [
  "30' x 50'",
  "60' x 40'",
  "40' x 50'",
  "Odd sizes"
];

const MasterPlanSection = () => {
  return (
    <section id="master-plan" className="relative      h-screen  bg-[#FFFBF5] poverflow-hidden 
           flex items-start lg:items-center justify-center
           pt-[135px] sm:pt-[145px] lg:pt-0 pb-4 md:pb-0 ">
      {/* 1. Corner Blobs (Background) */}
      {/* Top Left - Greenish/Teal */}
      


      <div className="relative     mx-auto px-6 z-10 w-full h-full flex flex-col justify-center">

 <div className="absolute top-0 left-0 w-full bg-white pt-30 pb-10 z-10 flex  items-center justify-center">
        <FloatUpText className="text-[#  461a]  text-center text-xs font-bold tracking-[0.2em] uppercase mb-5">
          MASTER PLAN
        </FloatUpText>
      </div>

        <div className="flex  max-w-6xl flex-col lg:flex-row gap-8 lg:gap-16 items-start justify-end    h-auto lg:h-[80vh]">


          {/* LEFT SIDE: Plot sizes + Logo (ONLY this will move) */}
          <motion.div
            className="relative z-10 flex flex-col gap-10 lg:gap-14 w-full  lg:w-[260px]
           items-center lg:items-start mx-auto lg:mx-0
           lg:absolute lg:left-[260px] lg:top-[180px]"
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
            <div className="mt-4 sm:mt-6">
              <img
                src="/naturesignLogo1.png"
                alt="Nature's Sign"
                className="w-[180px] h-auto object-contain opacity-95"
              />
            </div>
          </motion.div>

          {/* RIGHT SIDE: Masterplan image (STAYS FIXED) */}
          <motion.div
            className="w-full lg:absolute lg:right-[40px] lg:bottom-0 lg:w-[900px]
           mt-8 sm:mt-10 lg:mt-0"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full flex flex-col items-center">
              <img
                src="/masterplan.webp"
                alt="Master Plan Map"
                className="w-full object-contain max-h-[45vh] sm:max-h-[55vh] lg:max-h-[70vh]"
              />
            </div>
          </motion.div>



        </div>
      </div>
    </section>
  );
};

export default MasterPlanSection;
