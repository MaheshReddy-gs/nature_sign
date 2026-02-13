import { motion } from "framer-motion";
import { useModal } from "../context/ModalContext";
import FloatUpText from "./Animations/floatUpText";
import { useRef, useState } from "react"; 
import CustomButton from "./CustomButton";
const LocationSection = () => {
   const { openModal } = useModal();
  const imageRef = useRef(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setPosition({ x, y });
  };

  return (
    <section id="locations" className="w-full bg-white ">
      {/* TOP LOCATION CONTENT */}
      <div className="py-16 md:py-14 ">
        <div className="max-w-6xl mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-10">
            <FloatUpText className="text-[#a1461a] text-center text-xs  tracking-[0.2em] uppercase mb-5 ">LOCATION</FloatUpText>
          </div>

          {/* Logo + Address */}
          <div className="w-full flex justify-center mb-6 md:mb-10">
            <div className="grid grid-cols-1    md:grid-cols-2 gap-6 md:gap-20 items-start">
              {/* Logo */}
              <div className="flex justify-center  md:justify-start">
                <FloatUpText>
                  <img
                    src="/naturesignLogo1.png"
                    alt="Nature's Sign"
                    className="h-16 md:h-20 mb-5 md:mb-0  w-auto object-contain"
                  />
                </FloatUpText>
              </div>

              {/* Address */}
              <div className="text-center md:text-left">
                <FloatUpText>
                  <h3 className="text-lg font-semibold text-black md:mb-2">
                    Nature&apos;s sign
                  </h3>
                </FloatUpText>

                <FloatUpText>
                  <p className="text-black md:pt-0 pt-5 text-base leading-relaxed">
                    No.51, 3rd Floor, Chourasia Shreyas Arcade,<br /> 3rd Cross,
                    
                    Aswath Nagar, Marathahalli,<br className="md:hidden"/> Bengaluru 560037, Karnataka
                  </p>
                </FloatUpText>
              </div>
            </div>
          </div>

          {/* Map */}
         <FloatUpText className="w-full flex justify-center overflow-hidden mt-6 md:mt-10">
  <div
    ref={imageRef}
    onMouseMove={handleMouseMove}
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => setIsHovering(false)}
    className="relative w-full max-w-6xl lg:max-w-5xl 
               h-[260px] sm:h-[320px] md:h-auto 
               overflow-hidden rounded-lg cursor-zoom-in"
  >
    <img
      src="/locatiomap.jpg"
      alt="Location Map"
      className="w-full h-full object-cover md:object-contain transition-transform duration-300 ease-out"
      style={{
        transform: isHovering ? "scale(2)" : "scale(1)",
        transformOrigin: `${position.x}% ${position.y}%`,
      }}
    />
  </div>
</FloatUpText>

        </div>
      </div>

      {/* ✅ BLUE CTA SECTION */}
      <div className="w-full bg-[#2F7F90] py-14 ">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-center justify-between gap-10">
          {/* Left Text */}
          <div className="text-center  md:text-left max-w-3xl">
            <FloatUpText>
              <h2 className="section-heading text-white mb-4">
                Are you excited about the project?
              </h2>
            </FloatUpText>

            <FloatUpText>
              <p className="text-white  atext-base leading-relaxed max-w-xl">
                Don't miss the opportunity to own the property in fast growing
                satellite township of Devanahalli.
              </p>
            </FloatUpText>
          </div>

          {/* Right Button */}
          <FloatUpText>
            <CustomButton
              onClick={() =>
                openModal({ initialValues: { message: "Request Site Visit" } })
              }
            >
              REQUEST SITE VISIT
            </CustomButton>
          </FloatUpText>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
