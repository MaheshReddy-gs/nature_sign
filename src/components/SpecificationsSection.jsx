import { motion } from "framer-motion";

const SPEC_ITEMS = [
  {
    id: 1,
    image: "/spec_roads_pathway.png",
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
    image: "/spec_entrance_gate.png",
    alt: "Grand entrance view",
    label: "INFRASTRUCTURE:",
    title: "Entrance and Security",
    points: [
      "Grand entrance gate with security cabin",
      "24/7 Security monitoring systems",
      "Landscaped gardens at the entrance"
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
    <section id="section2" className="w-full bg-[#F6F3EE]">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
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

      <div className="flex flex-col">
        {SPEC_ITEMS.map((item) => (
          <div key={item.id} className={`w-full ${item.bg} min-h-[80vh] flex items-center`}>
            <motion.div
              className={`max-w-6xl mx-auto px-6 py-20 lg:py-24 flex flex-col gap-10 lg:gap-24 items-center w-full ${item.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              variants={ROW_VARIANTS}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <motion.div
                className={`w-full flex justify-center ${item.reverse ? "lg:justify-end" : "lg:justify-start"
                  }`}
                variants={MEDIA_VARIANTS}
              >
                <div className="h-[300px] sm:h-[400px] lg:h-[500px] aspect-[4/5] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>

              <motion.div className="w-full max-w-[480px]" variants={TEXT_VARIANTS}>
                <p className="text-[13px] tracking-[0.2em] uppercase font-semibold text-[#4C6A5B]">
                  {item.label}
                </p>
                <h3 className="mt-2 text-[24px] lg:text-[28px] font-semibold text-[#3C5247]">
                  {item.title}
                </h3>
                <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-[#50645B]">
                  {item.points.map((point, index) => (
                    <p key={`${item.id}-${index}`} className="pl-4 border-l-2 border-[#B56A4E]/40">
                      {point}
                    </p>
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
