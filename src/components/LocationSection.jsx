import { motion } from "framer-motion";
import { useModal } from "../context/ModalContext";

const LocationSection = () => {
  const { openModal } = useModal();
  return (
    <section id="location" className="w-full bg-white font-['Montserrat']">
      {/* TOP LOCATION CONTENT */}
      <div className="py-14">
        <div className="max-w-6xl mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-10">
            <p className="text-[#B96A42] font-bold tracking-[0.25em] text-xs uppercase">
              LOCATION
            </p>
          </div>

          {/* Logo + Address */}
          <div className="w-full flex justify-center mb-10">
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-20 items-start">
              {/* Logo */}
              <div className="flex justify-center md:justify-end">
                <img
                  src="/logo.jpeg"
                  alt="Nature's Sign"
                  className="h-16 w-auto object-contain"
                />
              </div>

              {/* Address */}
              <div className="text-center md:text-left">
                <h3 className="text-[#2E2E2E] font-medium text-lg leading-tight mb-2">
                  Nature&apos;s sign
                </h3>

                <p className="text-[#4B4B4B] text-sm leading-relaxed">
                  No.51, 3rd Floor, Chourasia Shreyas Arcade, 3rd Cross,
                  <br />
                  Aswath Nagar, Marathahalli, Bengaluru 560037, Karnataka
                </p>
              </div>
            </div>
          </div>

          {/* Map */}
          <motion.div
            className="w-full flex justify-center overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/locatiomap.webp"
              alt="Location Map"
              className="w-full max-w-6xl lg:max-w-5xl h-[420px] md:h-[520px] object-contain"
            />

          </motion.div>
        </div>
      </div>

      {/* ✅ BLUE CTA SECTION (EXACT LIKE IMAGE) */}
      <div className="w-full bg-[#2F7F90] py-14">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          {/* Left Text */}
          <div className="text-center md:text-left max-w-3xl">
            <h2 className="text-white text-3xl md:text-4xl font-light mb-4">
              Are you excited about the project?
            </h2>

            <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-xl">
              Don't miss the opportunity to own the property in fast growing
              satellite township of Devanahalli.
            </p>
          </div>

          {/* Right Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal({ initialValues: { message: "Request Site Visit" } })}
            className="bg-[#FF5A00] hover:bg-[#E04F00] text-white px-10 py-4 uppercase text-xs font-bold tracking-[0.2em] shadow-lg whitespace-nowrap"
          >
            REQUEST SITE VISIT
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
