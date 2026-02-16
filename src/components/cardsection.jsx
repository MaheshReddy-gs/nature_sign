import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import FloatUpText from "./Animations/floatUpText";
import { ArrowRight } from "lucide-react";

const Ongoing = () => {
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const autoScrollRef = useRef(null);
  const resumeTimeoutRef = useRef(null);

const services = [
  {
    id: 1,
    title: "A Serene development nestled in a Mango Orchard",
    description:
      "Set amidst the timeless charm of flourishing mango trees, this thoughtfully planned development offers a rare blend of natural beauty and modern comfort.",
    gradient: "from-[#bb7863] to-[#e8a950]",
    image: "/cards/mango.svg",
    imageClass: "h-44 translate-y-1 md:-translate-y-1 translate-x-[60%]",
  },
  {
    id: 2,
    title: "Live Just Moments from Nandi Hills",
    description:
      "Wake up to the promise of misty mornings and panoramic hill views, just a short drive from one of Karnataka’s most cherished natural escapes.",
    gradient: "from-[#867866] to-[#c28e26]",
    image: "/cards/mountain.svg",
    imageClass: "h-44 translate-y-3 translate-x-[40%]",
  },
  {
    id: 3,
    title: "Strategically Located 5 Minutes from STRR",
    description:
      "Positioned just five minutes from the Satellite Town Ring Road (STRR), this development offers exceptional connectivity and future-ready infrastructure advantage.",
    gradient: "from-[#bb7863] to-[#e8a950]",
    image: "/cards/strr.svg",
    imageClass: "h-44 translate-y-1 md:-translate-y-1 translate-x-[60%]",
  },
  {
    id: 4,
    title: "Perfectly Positioned Near Reputed Educational & IT Hubs",
    description:
      "Located in close proximity to well-established educational institutions and IT hubs, ensuring quality learning and work-life balance.",
    gradient: "from-[#867866] to-[#c28e26]",
    image: "/cards/school.svg",
    imageClass: "h-44 translate-y-1 md:-translate-y-1 translate-x-[60%]",
  },
  {
    id: 5,
    title: "Strong capital growth potential",
    description:
      "Experience significant value appreciation as the project progresses and surrounding infrastructure evolves.",
    gradient: "from-[#bb7863] to-[#e8a950]",
    image: "/cards/building.svg",
    imageClass: "h-44 translate-y-1   translate-x-1/3",
  },
  {
    id: 6,
    title: "Frontage on NH-44 for Seamless Connectivity",
    description:
      "Enjoy the advantage of direct frontage on NH-44, ensuring unmatched accessibility and visibility.",
    gradient: "from-[#867866] to-[#c28e26]",
    image: "/cards/road.svg",
    imageClass: "h-36 translate-y-1 translate-x-[40%]",
  },
  {
    id: 7,
    title: "Just 20 Minutes from Kempegowda International Airport",
    description:
      "This prime location ensures smooth and stress-free access to domestic and international destinations.",
    gradient: "  from-[#bb7863] to-[#e8a950]",
    image: "/cards/plane.svg",
    imageClass: "h-42 -translate-y-1 translate-x-[40%]",
  },
];


  /* ================= DESKTOP MOUSE SCROLL ================= */

  useEffect(() => {
    const container = desktopRef.current;
    if (!container) return;

    let animationFrame;
    let scrollSpeed = 0;
    let targetSpeed = 0;

    const maxScroll = () =>
      container.scrollWidth - container.clientWidth;

    const handleMouseMove = (e) => {
      const { left, width } = container.getBoundingClientRect();
      const mouseX = e.clientX - left;
      const center = width / 2;
      const normalized = (mouseX - center) / center;
      targetSpeed = normalized * 20;
    };

    const animate = () => {
      scrollSpeed += (targetSpeed - scrollSpeed) * 0.08;
      container.scrollLeft += scrollSpeed;

      if (container.scrollLeft <= 0)
        container.scrollLeft = 0;

      if (container.scrollLeft >= maxScroll())
        container.scrollLeft = maxScroll();

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrame);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  /* ================= MOBILE AUTO SCROLL ================= */

  useEffect(() => {
    const container = mobileRef.current;
    if (!container) return;

    autoScrollRef.current = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= services.length) nextIndex = 0;
      scrollToIndex(nextIndex);
    }, 3000);

    return () => clearInterval(autoScrollRef.current);
  }, [activeIndex]);

  const handleScroll = () => {
    const container = mobileRef.current;
    if (!container) return;

    const { scrollLeft, clientWidth } = container;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveIndex(index);
  };

  const scrollToIndex = (index) => {
    const container = mobileRef.current;
    if (!container) return;

    const child = container.children[index];
    if (!child) return;

    container.scrollTo({
      left:
        child.offsetLeft -
        (container.clientWidth - child.clientWidth) / 2,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  const pauseAutoScroll = () => {
    clearInterval(autoScrollRef.current);
    clearTimeout(resumeTimeoutRef.current);

    resumeTimeoutRef.current = setTimeout(() => {
      autoScrollRef.current = setInterval(() => {
        let nextIndex = activeIndex + 1;
        if (nextIndex >= services.length) nextIndex = 0;
        scrollToIndex(nextIndex);
      }, 3000);
    }, 4000);
  };

  return (
<section className="   lg:h-[calc(100vh-5rem)] pt-10 bg-gradient-to-br from-[#F8CC8B] to-[#e2db62]">
  <div className="w-full h-full       flex flex-col items-center">

    {/* Header */}
    <div className="pb-5 flex    flex-col md:flex-row justify-between max-w-6xl px-6 w-full shrink-0">
      <div>
       
      <FloatUpText className="text-3xl md:text-4xl text-text font-medium leading-tight">
        Key features
      </FloatUpText>
        </div>
    </div>

    {/* DESKTOP */}
    <div
      ref={desktopRef}
      className="w-screen     flex-col lg:my-auto    justify-center  overflow-hidden py-5 hidden lg:flex items-center"
    >
      <FloatUpText className="max-w-6xl mx-auto h-full    ">
        <div className="flex gap-6 w-max h-full pl-6 pr-14 overflow-y-visible   ">
          {services.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ y: -8 }}
              className="
                relative 
                w-[20vw]
                h-full max-h-[60vh]
                rounded-lg
                shadow-[0_12px_30px_rgba(0,0,0,0.06)]
                overflow-hidden
                flex flex-col
              "
            >
              {/* Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`}
              />

              {/* Content */}
              <div className="relative flex  flex-col h-full  pt-8 ">
                {/* Text */}
                <div className="shrink-0 px-8">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Image */}
                <div className="flex-1 flex items-end justify-center mt-6 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className={`object-contain max-h-full  opacity-60 ${service.imageClass}`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </FloatUpText>
    </div>

    {/* MOBILE (UNCHANGED) */}
    <div className="w-full pb-5 lg:hidden">
      <div
        ref={mobileRef}
        onScroll={handleScroll}
        onTouchStart={pauseAutoScroll}
        className="flex gap-4 px-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
      >
        {services.map((service) => (
          <div key={service.id} className="min-w-[85vw] snap-center">
            <motion.div
              className="
                relative
                h-[420px]
                
                rounded-lg
                shadow-lg
                overflow-hidden
                flex flex-col justify-between
              "
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`}
              />

              <div className="relative px-8 pt-8">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="relative flex justify-center mt-6 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className={`object-contain opacity-50 ${service.imageClass}`}
                />
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "bg-[#1A1A1A] w-4"
                : "bg-[#1A1A1A]/30 w-2"
            }`}
          />
        ))}
      </div>
    </div>

  </div>
</section>

  );
};

export default Ongoing;
