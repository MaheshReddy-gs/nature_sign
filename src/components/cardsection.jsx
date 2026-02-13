import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import FloatUpText from "./Animations/floatUpText";

const DigitalDesignSection = () => {
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
        " Set amidst the timeless charm of flourishing mango trees, this thoughtfully planned development offers a rare blend of natural beauty and modern comfort.",
      gradient: "from-[#a0b8d8] to-[#7a9bc4]",
      image: "/cards/mango.svg",
      imageClass:"h-44 translate-y-1 md:-translate-y-1  translate-x-3/5"
    },
    {
      id: 2,
      title: "Live Just Moments from Nandi Hills",
      description:
        " Wake up to the promise of misty mornings and panoramic hill views, just a short drive from one of Karnataka’s most cherished natural escapes.",
      gradient: "from-[#8b6fb8] to-[#c74ba0]",
      image: "/cards/mountain.svg",      imageClass:"h-44 translate-y-3  translate-x-2/5"

    },
    {
      id: 3,
      title: "Strategically Located 5 Minutes from STRR",
      description:
        " Positioned just five minutes from the Satellite Town Ring Road (STRR), this development offers exceptional connectivity and future-ready infrastructure advantage",
      gradient: "from-[#5a7c4d] to-[#7d9b6f]",
      image: "/cards/strr.svg",      imageClass:"h-44 translate-y-1 md:-translate-y-1  translate-x-3/5"

    },
    {
      id: 4,
      title: "Perfectly Positioned Near Reputed Educational & IT Hubs",
      description:
        "Located in close proximity to well-established educational institutions, IT Hubs, this development ensures that quality learning is always within easy reach.",
      gradient: "from-[#4a5d7c] to-[#5a7ba0]",
      image: "/cards/school.svg",      imageClass:"h-44 translate-y-1 md:-translate-y-1  translate-x-3/5"

    },
    {
      id: 5,
      title: "Strong capital growth potential",
      description:
        "Experience significant value appreciation as the project progresses and surrounding infrastructure evolves.",
      gradient: "from-[#a0b8d8] to-[#7a9bc4]",
      image: "/cards/building.svg",      imageClass:"h-44 translate-y-1  translate-x-1/3"

    },
    {
      id: 6,
      title: "Frontage on NH-44 for Seamless Connectivity",
      description:
        "Enjoy the advantage of direct frontage on NH-44, one of India’s most prominent national highways, ensuring unmatched accessibility and visibility.",
      gradient: "from-[#8b6fb8] to-[#c74ba0]",
      image: "/cards/road.svg",      imageClass:"h-36 translate-y-1  translate-x-2/5"

    },
    {
      id: 7,
      title: "Just 20 Minutes from Kempegowda International Airport",
      description:
        " This prime location ensures smooth and stress-free access to domestic and international destinations",
      gradient: "from-[#5a7c4d] to-[#7d9b6f]",
      image: "/cards/plane.svg",      imageClass:"h-42 -translate-y-1  translate-x-2/5"

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

    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        let nextIndex = activeIndex + 1;
        if (nextIndex >= services.length) nextIndex = 0;
        scrollToIndex(nextIndex);
      }, 3000);
    };

    startAutoScroll();

    return () => {
      clearInterval(autoScrollRef.current);
    };
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
    <section className="min-h-[80vh] py-16 flex items-center bg-gradient-to-br from-[#1a1d2e] via-[#2d1f3d] to-[#1a1d2e]">
      <div className="w-full flex flex-col items-center">

        {/* Header */}
        <div className="mb-12 max-w-7xl px-6 w-full">
          <FloatUpText className="text-[#04c2ae] uppercase text-xs tracking-[0.2em] mb-5">
            ✱ Ongoing Project
          </FloatUpText>
          <FloatUpText className="text-4xl text-white leading-tight">
            Introducing <br className="md:hidden"/> Nature`s Sign
          </FloatUpText>
        </div>

        {/* DESKTOP */}
        <div
          ref={desktopRef}
          className="w-screen overflow-hidden hidden lg:block"
        >
          <FloatUpText className="max-w-7xl py-6 mx-auto">
            <div className="flex gap-6  w-max pl-6 pr-14">
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  whileHover={{ y: -8 }}
                  className={`w-[20vw]  h-[420px] bg-gradient-to-br ${service.gradient} rounded-3xl  flex flex-col justify-between`}
                >
                  <div className="px-8 pt-8">
                    <h3 className="text-2xl font-semibold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex justify-center mt-6 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className={`object-contain ${service.imageClass}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </FloatUpText>
        </div>

        {/* MOBILE */}
        <div className="w-full lg:hidden">
          <div
            ref={mobileRef}
            onScroll={handleScroll}
            onTouchStart={pauseAutoScroll}
            className="flex gap-4 px-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          >
            {services.map((service) => (
              <div key={service.id} className="min-w-[85vw] snap-center">
                <motion.div
                  className={`h-[420px] bg-gradient-to-br ${service.gradient} rounded-lg  overflow-hidden flex flex-col justify-between`}
                >
                  <div className="px-8 pt-8">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex  justify-center mt-6 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className={` object-contain ${service.imageClass}`}
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
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-white w-4"
                    : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalDesignSection;
