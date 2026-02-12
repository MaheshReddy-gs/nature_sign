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
    <section id="master-plan" className="relative      md:h-screen  bg-[#FFFBF5] poverflow-hidden 
           flex items-start lg:items-center justify-center
           pt-16 lg:pt-0 pb-4 md:pb-0 ">
      {/* 1. Corner Blobs (Background) */}
      {/* Top Left - Greenish/Teal */}
      


      <div className="relative     mx-auto px-6 z-10 w-full h-full flex flex-col justify-center">

 <div className="md:absolute top-0   left-0 w-full md:bg-white md:pt-30 pb-10 z-10 flex  items-center justify-center">
        <FloatUpText className="text-[#a1461a]  text-center text-xs tracking-[0.2em] uppercase mb-5">
          MASTER PLAN
        </FloatUpText>
      </div>

        <div className="md:flex hidden   max-w-6xl flex-col lg:flex-row gap-8 lg:gap-16 items-start justify-end    h-auto lg:h-[80vh]">


          {/* LEFT SIDE: Plot sizes + Logo (ONLY this will move) */}
          <  FloatUpText
            className="relative  z-10   flex flex-col gap-10 lg:gap-14 w-full  lg:w-[260px]
           items-center lg:items-start mx-auto lg:mx-0 
           lg:absolute lg:left-[260px] lg:top-[180px]"
            
          >
            

            {/* Logo */}
            <div className="mt-4 sm:mt-6">
              <img
                src="/naturesignLogo1.png"
                alt="Nature's Sign"
                className="w-[180px] h-auto object-contain opacity-95"
              />
            </div>{/* Plot Sizes */}
            <div>
              <h3 className="text-black font-semibold text-base  mt-20 mb-2">
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
          </  FloatUpText>

          {/* RIGHT SIDE: Masterplan image (STAYS FIXED) */}
          <  FloatUpText
            className="w-full lg:absolute lg:right-[120px] lg:bottom-0 lg:w-[900px]
           mt-8 sm:mt-10 lg:mt-0"
       
          >
            <div className="w-full flex flex-col items-center">
              <img
                src="/masterplan.webp"
                alt="Master Plan Map"
                className="w-full object-contain max-h-[45vh] sm:max-h-[55vh] lg:max-h-[70vh]"
              />
            </div>
          </  FloatUpText>



        </div>
        <div className="flex md:hidden    max-w-6xl flex-col lg:flex-row gap-8 lg:gap-16 items-start justify-end    h-auto lg:h-[80vh]">


          {/* LEFT SIDE: Plot sizes + Logo (ONLY this will move) */}
          <  FloatUpText
            className="relative  z-10   flex flex-col gap-10 lg:gap-14 w-full  lg:w-[260px]
           items-center lg:items-start mx-auto lg:mx-0 
           lg:absolute lg:left-[260px] lg:top-[180px]"
            
          >
            {/* Plot Sizes */}
            

            {/* Logo */}
            <div className=" absolute top-0 left-0 mt-4   sm:mt-6">
              <img
                src="/naturesignLogo1.png"
                alt="Nature's Sign"
                className="w-[100px] h-auto object-contain opacity-95"
              />
            </div>

          {/* RIGHT SIDE: Masterplan image (STAYS FIXED) */}
          <  div
            className="w-full lg:absolute lg:right-[40px] lg:bottom-0 lg:w-[900px]
            mt-8 sm:mt-10 lg:mt-0"
       
          >
            <div className="w-full flex flex-col items-center">
              <img
                src="/masterplan.webp"
                alt="Master Plan Map"
                className="w-full object-contain max-h-[45vh] sm:max-h-[55vh] lg:max-h-[70vh]"
              />
            </div>
          </  div>
            </  FloatUpText>

<div className=' pb-14 flex flex-col items-center w-full'>
              <h3 className="text-black font-semibold text-base  mt-4 mb-2">
                Plot Sizes
              </h3>

               <div className="grid grid-cols-2 gap-2   w-full ">
                {PLOT_SIZES.map((size, index) => (
                  <div
                    key={index}
                    className="border border-[#7a7a7a] text-black font-semibold text-sm px-3 py-1.5 text-center leading-tight bg-transparent"
                  >
                    {size}
                  </div>
                ))}
              </div>
              </div>

        </div>
      </div>
    </section>
  );
};

export default MasterPlanSection;
