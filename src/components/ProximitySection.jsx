import { motion } from "framer-motion";
import FloatUpText from "./Animations/floatUpText";

const PROXIMITY_IMAGES = [
  { id: 1, src: "/strr.webp", alt: "STRR Proximity" },
];

const EDUCATION_LOGOS = [
  { name: "Harrow International Bengaluru", src: "/SCHOOL_01.jpg" },
  { name: "Amity University", src: "/SCHOOL_02.jpg" },
  { name: "Gitam University", src: "/SCHOOL_03.jpg" },
  { name: "Nagarjuna College of Engineering & Technology", src: "/SCHOOL_04.jpg" },
];


const LANDMARKS = [
  { id: 1, name: "Nandi Hills", src: "/nandihills.webp" },
  { id: 2, name: "SAB Labs", src: "/saplabs.webp" },
  { id: 3, name: "Exide Energy", src: "/exide.webp" },
  { id: 4, name: "Isha Foundation", src: "/isha.webp" },
  { id: 5, name: "Foxconn Manufacturing Plant", src: "/foxconn.webp" },
  { id: 6, name: "Zeiss", src: "/zeiss.webp" },
];

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const STAGGER = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const CARD = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const IMAGE_FADE = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function ProximitySection() {
  return (
    <section id="proximity" className="relative w-full bg-[#FBF6EE] overflow-hidden py-16 lg:py-20">
      {/* Soft corner shapes */}
  

      <div className="relative max-w-6xl mx-auto px-6">
      <FloatUpText>
  <FloatUpText className="text-[#a1461a] text-center text-xs tracking-[0.2em] uppercase mb-5 ">Proximity</FloatUpText>
</FloatUpText>


        {/* Top card */}
        <motion.div
          className="mt-10 bg-white shadow-[0_20px_40px_rgba(74,48,33,0.12)] border border-[#EFE7DD]"
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 p-8 lg:p-10">
            <motion.div
              className="overflow-hidden bg-white"
              variants={IMAGE_FADE}
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-white">
                <img
                  src={PROXIMITY_IMAGES[ 0 ].src}
                  alt={PROXIMITY_IMAGES[ 0 ].alt}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            </motion.div>


            <motion.div className="flex flex-col justify-center" variants={FADE_UP}>
  <FloatUpText>
   <h3 className="text-2xl font-semibold  3B3A38] text-black">
      Just 5 mins<br />from STRR
    </h3>
  </FloatUpText>

  <FloatUpText>
    <p className="mt-2 text-base text-black">
      (Satellite Town Ring Road Planning Authority)
    </p>
  </FloatUpText>

  <FloatUpText>
    <p className="mt-4 text-base leading-relaxed text-black">
      With the STRR (Satellite Town Ring Road Planning Authority) just 5 minutes away,
      enjoy quicker travel times, smoother access to prime hubs, and a well-connected
      lifestyle.
    </p>
  </FloatUpText>

  
</motion.div>

          </div>
        </motion.div>

        {/* Bottom block */}
        <motion.div
          className="mt-14 relative"
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="relative w-full">

            {/* ✅ BACKGROUND SPLIT (TOP BROWN + BOTTOM WHITE) */}
            <div className="absolute inset-0">
              <div className="h-2/3 md:h-1/2  w-full  bg-[#D28A56]" />
              <div className="h-1/3 md:h-1/2 w-full bg-white" />
            </div>

            {/* ✅ CONTENT (IMPORTANT: give padding + min height) */}
            <div className="relative z-10 px-8  shadow-[0_20px_40px_rgba(74,48,33,0.12)] py-12 lg:px-12 lg:py-14">
      
              <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">

                {/* IMAGE */}
                <motion.div
                  className="bg-white p-4 "
                  variants={IMAGE_FADE}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src="/schoolhubs.webp"
                      alt="Educational hub"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </motion.div>

        {/* TEXT + LOGOS */}
       <motion.div className="md:pt-8 lg:pt-0">
  <p className="text-white   text-[18px] sm:text-[20px] lg:text-2xl  font-semibold max-w-[420px] break-words">
    Nature&apos;s Sign - Perfectly Positioned Near Reputed Educational Hubs.
  </p>

                  {/* LOGO WHITE BOX */}
                  <div className="mt-6  bg-white p-6 w-full max-w-[560px] ">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-5 items-center">
                      {EDUCATION_LOGOS.map((item) => (
                        <div key={item.name} className="flex  items-center justify-center">
                          <img
                            src={item.src}
                            alt={item.name}
                            className="h-20 w-auto object-contain"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </motion.div>


        {/* Landmark grid */}
        <FloatUpText
          className="mt-16 lg:mt-20"
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          
          viewport={{ once: false, amount: 0.25 }}
        >
       <FloatUpText>
  <h3 className="section-heading text-black text-center">
    Live Close to the Landmarks That Matter.
  </h3>
</FloatUpText>
          <motion.div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={STAGGER}>
            {LANDMARKS.map((landmark) => (
              <motion.div
                key={landmark.id}
                className="bg-white shadow-[0_12px_24px_rgba(74,48,33,0.1)] group"
                variants={CARD}
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={landmark.src}
                    alt={landmark.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="px-4 py-3 flex items-center gap-2 text-[12px] text-black">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path d="M8.5 5L2 9V1L8.5 5Z" fill="#000000" />
                  </svg>
                  
  <span>{landmark.name}</span>

                </div>
              </motion.div>
            ))}
          </motion.div>
        </FloatUpText>
      </div>
    </section>
  );
}
