import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RevealImage = ({
  src,
  alt = "",
  className = "",
  duration = 1.2,
  scaleFrom = 1.5,
  start = "top 80%", // when animation triggers
  end = "top 20%", // when scroll trigger ends (optional)
}) => {
  const wrapperRef = useRef(null);
  const clipRef = useRef(null);
  const imgRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
  defaults: { ease: "power2.out" },
  paused: true,
  scrollTrigger: {
    trigger: wrapperRef.current,
    start: start,
    once: true,
    onEnter: () => tl.play(),
    // markers: true,
  },
});


      // Clip path reveal from top to bottom
      tl.fromTo(
        clipRef.current,
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration,
        }
      )
      // Scale image simultaneously
      .fromTo(
        imgRef.current,
        { scale: scaleFrom },
        { scale: 1, duration },
        0 // starts at the same time as clip animation
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, [duration, scaleFrom, start, end]);

  return (
    <div ref={wrapperRef} className={`w-full h-full overflow-hidden ${className}`}>
      <div ref={clipRef} className="w-full h-full overflow-hidden">
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default RevealImage;