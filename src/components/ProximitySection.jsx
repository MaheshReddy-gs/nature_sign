import { motion } from "framer-motion";

const PROXIMITY_IMAGES = [
  { id: 1, src: "/herobackgorund.webp", alt: "City flyover" },
  { id: 2, src: "/nature-sign_website_03.png", alt: "Ring road" },
];

const EDUCATION_LOGOS = [
  "Harrow International Bengaluru",
  "Amity University",
  "Gitam University",
  "Nagarjuna College of Engineering & Technology",
];

const LANDMARKS = [
  { id: 1, name: "Nandi Hills", src: "/herobackgorund.webp" },
  { id: 2, name: "SAB Labs", src: "/nature-sign_website_03.png" },
  { id: 3, name: "Exide Energy", src: "/herobackgorund.webp" },
  { id: 4, name: "Isha Foundation", src: "/nature-sign_website_03.png" },
  { id: 5, name: "Foxconn Manufacturing Plant", src: "/herobackgorund.webp" },
  { id: 6, name: "Zeiss", src: "/nature-sign_website_03.png" },
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
    transition: { staggerChildren: 0.12 },
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
    <section id="section3" className="relative w-full bg-[#FBF6EE] overflow-hidden py-16 lg:py-20">
      {/* Soft corner shapes */}
      <div className="pointer-events-none absolute -top-28 -left-24 h-60 w-60 rounded-full bg-gradient-to-br from-[#F6D7A7] to-[#F9E7CC] opacity-80" />
      <div className="pointer-events-none absolute -top-24 -right-20 h-56 w-56 rounded-full bg-gradient-to-br from-[#F7E78C] to-[#CFE8D2] opacity-70" />
      <div className="pointer-events-none absolute -bottom-32 -left-28 h-72 w-72 rounded-full bg-gradient-to-br from-[#F3D8B6] to-[#EAD6F1] opacity-60" />
      <div className="pointer-events-none absolute -bottom-28 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-[#F2E390] to-[#CDE6E0] opacity-70" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.p
          className="text-center text-[11px] tracking-[0.5em] uppercase font-['Barlow'] font-bold text-[#B56A4E]"
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.6 }}
        >
          Proximity
        </motion.p>

        {/* Top card */}
        <motion.div
          className="mt-10 bg-white shadow-[0_20px_40px_rgba(74,48,33,0.12)] border border-[#EFE7DD]"
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 p-8 lg:p-10">
            <motion.div className="grid grid-cols-2 gap-3" variants={STAGGER}>
              {PROXIMITY_IMAGES.map((img) => (
                <motion.div key={img.id} className="aspect-[4/3] overflow-hidden" variants={IMAGE_FADE}>
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="flex flex-col justify-center" variants={FADE_UP}>
              <h3 className="text-2xl font-semibold text-[#3B3A38]">
                Just 5 mins<br />from STRR
              </h3>
              <p className="mt-2 text-[14px] text-[#6B5D53]">
                (Satellite Town Ring Road Planning Authority)
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-[#6B5D53]">
                With the STRR (Satellite Town Ring Road Planning Authority) just 5 minutes away,
                enjoy quicker travel times, smoother access to prime hubs, and a well-connected
                lifestyle.
              </p>
              <p className="mt-6 text-[11px] tracking-[0.25em] uppercase text-[#6B5D53] font-semibold">
                JUST 5 MIN FROM STRR
              </p>
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
          <div className="bg-[#D28A56] px-8 py-10 lg:px-12 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
              <motion.div className="bg-white p-4 shadow-[0_14px_28px_rgba(78,52,34,0.18)]" variants={IMAGE_FADE}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="/herobackgorund.webp"
                    alt="Educational hub"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>

              <motion.div variants={FADE_UP}>
                <p className="text-white text-2xl leading-snug font-semibold max-w-[420px]">
                  Nature&apos;s Sign - Perfectly Positioned Near Reputed Educational Hubs.
                </p>
                <div className="mt-6 bg-white/95 p-5 inline-block">
                  <motion.div className="grid grid-cols-2 gap-4 text-[12px] text-[#6B5D53] font-semibold" variants={STAGGER}>
                    {EDUCATION_LOGOS.map((logo) => (
                      <motion.div key={logo} className="flex items-center gap-2" variants={CARD}>
                        <span className="h-8 w-8 rounded-full border border-[#E3D8CB] bg-[#F7F3EE]" />
                        <span>{logo}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Landmark grid */}
        <motion.div
          className="mt-16 lg:mt-20"
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
        >
          <h3 className="text-center text-xl font-medium text-[#4C3F35]">
            Live Close to the Landmarks That Matter.
          </h3>
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
                <div className="px-4 py-3 flex items-center gap-2 text-[12px] text-[#6B5D53]">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path d="M8.5 5L2 9V1L8.5 5Z" fill="#8A9A5B" />
                  </svg>
                  <span>{landmark.name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
