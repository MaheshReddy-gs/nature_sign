import { motion } from "framer-motion";

const SPEC_ITEMS = [
  {
    id: 1,
    image: "/herobackgorund.webp",
    alt: "Roads and pathways",
    label: "INFRASTRUCTURE:",
    title: "Roads and Pathways",
    points: [
      "15 mts and 12 mts wide internal roads as per design",
      "Pavements on either side of the road with kerbs and pavers as per design",
      "Plot extent marked with corner stones",
    ],
    bg: "bg-[#E3EFEA]",
    reverse: false,
  },
  {
    id: 2,
    image: "/nature-sign_website_03.png",
    alt: "Grand entrance view",
    label: "INFRASTRUCTURE:",
    title: "Roads and Pathways",
    points: [
      "15 mts and 12 mts wide internal roads as per design",
      "Pavements on either side of the road with kerbs and pavers as per design",
      "Plot extent marked with corner stones",
    ],
    bg: "bg-[#F6F3EE]",
    reverse: true,
  },
];

const HEADER_VARIANTS = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ROW_VARIANTS = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
};

const MEDIA_VARIANTS = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const TEXT_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function SpecificationsSection() {
  return (
    <section id="section2" className="w-full bg-[#F6F3EE] lg:h-screen lg:overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-6 lg:pt-8 lg:pb-4">
        <motion.p
          className="text-center text-[11px] tracking-[0.5em] uppercase font-['Barlow'] font-bold text-[#B56A4E]"
          variants={HEADER_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.6 }}
        >
          Specifications
        </motion.p>
      </div>

      <div className="lg:grid lg:grid-rows-2 lg:h-[calc(100vh-120px)]">
        {SPEC_ITEMS.map((item) => (
          <div key={item.id} className={`w-full ${item.bg} lg:h-full`}>
            <motion.div
              className={`max-w-6xl mx-auto px-6 py-10 lg:py-6 flex flex-col gap-8 lg:gap-12 items-center lg:h-full ${item.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              variants={ROW_VARIANTS}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.35 }}
            >
              <motion.div
                className={`w-full flex justify-center ${item.reverse ? "lg:justify-end" : "lg:justify-start"
                  }`}
                variants={MEDIA_VARIANTS}
              >
                <div className="h-[230px] sm:h-[260px] lg:h-[min(40vh,320px)] aspect-[4/5] overflow-hidden shadow-[0_18px_30px_rgba(0,0,0,0.12)]">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>

              <motion.div className="w-full max-w-[420px] lg:max-w-[440px]" variants={TEXT_VARIANTS}>
                <p className="text-[12px] tracking-[0.2em] uppercase font-semibold text-[#4C6A5B]">
                  {item.label}
                </p>
                <h3 className="mt-1 text-[16px] font-semibold text-[#3C5247]">
                  {item.title}
                </h3>
                <div className="mt-4 space-y-3 text-[14px] leading-relaxed text-[#50645B]">
                  {item.points.map((point, index) => (
                    <p key={`${item.id}-${index}`}>{point}</p>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
