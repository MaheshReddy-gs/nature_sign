import { motion } from "framer-motion";
import RevealImage from "./Animations/TopDownImageReveal";
import FloatUpText from "./Animations/floatUpText";
const SPEC_ITEMS = [
  {
    id: 1,
    image: "/infrastructure.webp",
    alt: "Roads and pathways",
    label: "Infrastructure:",
    title: "Roads and Pathways",
    points: [
      "15 mts and 12 mts wide internal roads as per design",
      "Pavements on either side of the road with kerbs and pavers as per design",
      "Plot extent marked with corner stones",
    ],
    bg: "bg-[#E3EFEA]",
    reverse: false,
    bulletStyle: "line",
  },
{
  id: 2,
  image: "/security.webp",
  alt: "Security",
  label: "Security",
  title: "",
  points: [
    "Grand entrance portal with security kiosk as per design",
    "24/7 security with boom barriers at entry / exit gates",
    "Compound wall surrounded all around the project",
    "CCTV surveillance at all major vantage points with individual street monitoring",
  ],
 bg: "bg-[#B7C2A5]", // same green background like image
  reverse: true,
  bulletStyle: "dots",
  //textColor: "text-white",
},


  // ✅ ELECTRICAL (same like screenshot)
  {
    id: 3,
    image: "/streetlight.webp",
    alt: "Electrical",
    label: "Electrical",
    title: "",
    points: [
      "HT works, LT works, Feeder pillars, and RMUs for power supply—capacity & location as per design",
      "Underground cabling network with power cable terminated at each plot",
      "Street lighting with LED poles and fixtures on either side/one side, controlled by timers",
    ],
    bg: "bg-[#DEE7F0]",
    reverse: false,
    bulletStyle: "dots",
    // textColor: "text-[#44584F]",
  },

  // ✅ LANDSCAPING (exact like your new screenshot)
 {
  id: 4,
  image: "/landscaping.webp",
  alt: "Landscaping",
  label: "Landscaping",
  title: "",
  points: [
    "Well-designed landscaped parks and open spaces with lighting fixtures",
    "Avenue trees along all streets and internal roads",
    "Specially curated parks for aesthetics and recreation",
  ],
  bg: "bg-[#AEB8C0]",
  reverse: true, // ✅ content left, image right
  bulletStyle: "dots",
 // textColor: "text-white",
},
{
  id: 5,
  image: "/plumbing.webp", // <-- your image
  alt: "Plumbing",
  label: "Plumbing",
  title: "",
  points: [
    "Irrigation network for landscape areas",
    "Underground water supply system using UPVC pipes for domestic use",
    "Water & sewerage plumbing lines are terminated within each plot",
    "Underground sump of suitable capacity with sufficient head pressure",
    "Rainwater Harvesting System",
    "Sewage Treatment Plant (STP) of required capacity, positioned as per the layout",
  ],
  bg: "bg-[#DDECE3]", // ✅ same light green background
  reverse: false, // ✅ image left, text right
  bulletStyle: "dots",
 // textColor: "text-[#44584F]",
},
{
  id: 6,
  image: "/clubhouse.webp",
  alt: "Club House",
  label: "Club House",
  title: "",
  points: [
    "Luxurious retreat with premium amenities designed to elevate your lifestyle. It provides the perfect blend of comfort and convenience.",
  ],
  bg: "bg-[#A9CFC2]", // ✅ same green background
  reverse: true, // ✅ image left, text right
  bulletStyle: "dots",
 // textColor: "text-white", // ✅ white like screenshot
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
    <section id="section2" className="w-full bg-[#F6F3EE] ">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <FloatUpText className="text-[#a1461a] text-center text-xs font-bold tracking-[0.2em] uppercase mb-5 ">SPECIFICATIONS</FloatUpText>

      </div>

      <div className="flex flex-col">
        {SPEC_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`w-full ${item.bg} min-h-[auto] lg:min-h-[80vh] flex items-center`}
          >
            <motion.div
              className={`max-w-6xl mx-auto px-6 py-10 sm:py-12 lg:py-24 flex flex-col gap-6 sm:gap-8 lg:gap-24 items-center w-full ${item.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              variants={ROW_VARIANTS}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              {/* IMAGE */}
              <motion.div
                className={`w-full flex justify-start ${item.reverse ? "lg:justify-end" : "lg:justify-start"
                  }`}
                variants={MEDIA_VARIANTS}
              >
                {/* ✅ image frame exactly */}
    <div className="h-[300px] sm:h-[400px] lg:h-[500px] aspect-[4/5] overflow-hidden">
               <RevealImage
  src={item.image}
  alt={item.alt}
  className="w-full h-full"
/>
                </div>
              </motion.div>

              {/* TEXT */}
              {/* TEXT */}
              <motion.div className="w-full max-w-[520px]" variants={TEXT_VARIANTS}>
                {/* HEADING */}
                <FloatUpText>
                  <p className="section-heading text-black">{item.label}</p>
                </FloatUpText>

  {/* title only for infra sections */}
  {item.title ? (
    <FloatUpText>
 <p className="mt-2 text-black text-left text-xs tracking-[0.2em] uppercase mb-5 ">
  {item.title}
</p>

    </FloatUpText>
  ) : null}

                {/* CONTENT */}
                <div className="mt-6">
                  {item.bulletStyle === "dots" ? (
                    <ul className="list-disc pl-6 space-y-6 text-base leading-[1.8] text-black">
                      {item.points.map((point, index) => (
                        <FloatUpText key={`${item.id}-${index}`}>
                          <li>{point}</li>
                        </FloatUpText>
                      ))}
                    </ul>

                  ) : (
                    <ul className="list-disc pl-6 space-y-6 text-base leading-[1.8] text-black">
                      {item.points.map((point, index) => (
                        <FloatUpText key={`${item.id}-${index}`}>
                          <li>{point}</li>
                        </FloatUpText>
                      ))}
                    </ul>


                  )}
                </div>
              </motion.div>


            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
