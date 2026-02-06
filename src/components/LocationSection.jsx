import { motion } from "framer-motion";
import { useModal } from "../context/ModalContext";
import FloatUpText from "./Animations/floatUpText";

const LocationSection = () => {
  const { openModal } = useModal();

  return (
    <section id="locations" className="w-full bg-white font-['Montserrat']">
      {/* TOP LOCATION CONTENT */}
      <div className="py-14">
        <div className="max-w-6xl mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-10">
            <FloatUpText className="text-[#a1461a] text-center text-xs font-bold tracking-[0.2em] uppercase mb-5 ">LOCATION</FloatUpText>
          </div>

          {/* Logo + Address */}
          <div className="w-full flex justify-center mb-6 md:mb-10">
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-20 items-start">
              {/* Logo */}
              <div className="flex justify-center md:justify-end">
                <FloatUpText>
                  <img
                    src="/naturesignLogo1.png"
                    alt="Nature's Sign"
                    className="h-16  w-auto object-contain"
                  />
                </FloatUpText>
              </div>

              {/* Address */}
              <div className="text-center md:text-left">
                <FloatUpText>
                  <h3 className="section-heading text-black mb-2">
                    Nature&apos;s sign
                  </h3>
                </FloatUpText>

                <FloatUpText>
                  <p className="text-black text-base leading-relaxed">
                    No.51, 3rd Floor, Chourasia Shreyas Arcade, 3rd Cross,
                    <br />
                    Aswath Nagar, Marathahalli, Bengaluru 560037, Karnataka
                  </p>
                </FloatUpText>
              </div>
            </div>
          </div>

          {/* Map */}
          <motion.div
            className="w-full flex justify-center overflow-hidden mt-6 md:mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/locatiomap.webp"
              alt="Location Map"
              className="w-full max-w-6xl lg:max-w-5xl h-[260px] sm:h-[320px] md:h-[520px] object-cover md:object-contain"

            />
          </motion.div>
        </div>
      </div>

      {/* ✅ BLUE CTA SECTION */}
      <div className="w-full bg-[#2F7F90] py-14">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          {/* Left Text */}
          <div className="text-center md:text-left max-w-3xl">
            <FloatUpText>
              <h2 className="section-heading text-white mb-4">
                Are you excited about the project?
              </h2>
            </FloatUpText>

            <FloatUpText>
              <p className="text-white text-base leading-relaxed max-w-xl">
                Don't miss the opportunity to own the property in fast growing
                satellite township of Devanahalli.
              </p>
            </FloatUpText>
          </div>

          {/* Right Button */}
          <FloatUpText>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                openModal({ initialValues: { message: "Request Site Visit" } })
              }
              className="bg-[#FF5A00] hover:bg-[#E04F00] text-white px-10 py-4 uppercase text-[11px] font-bold tracking-[0.2em] rounded shadow-[0_10px_20px_rgba(255,90,0,0.3)] hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            >
              REQUEST SITE VISIT
            </motion.button>
          </FloatUpText>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
