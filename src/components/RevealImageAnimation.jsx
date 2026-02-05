import { useEffect, useRef, useState } from "react";

export default function RevealImageAnimation({
  image,
  alt = "",
  className = "",
  intialSize="50%",
  // controls
  zoom = 1.5,                 // start zoom (1.0 = no zoom)
  duration = 2500,             // image animation duration
  frameDuration = 2000,        // reveal frame duration
  easing = "cubic-bezier(.19,1,.22,1)", // smooth premium easing
  repeat = true,    
  // hover effect control
  hoverZoom = true,
  
  // ✅ NEW: external trigger control
  triggerAnimation = null,  // if provided, overrides IntersectionObserver
}) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  // ✅ Handle external trigger
  useEffect(() => {
    if (triggerAnimation !== null) {
      setShow(triggerAnimation);
      return; // skip IntersectionObserver when external trigger is provided
    }
  }, [triggerAnimation]);

  // ✅ Original IntersectionObserver (only runs when triggerAnimation is null)
  useEffect(() => {
    if (triggerAnimation !== null) return; // skip if externally controlled

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (repeat) setShow(entry.isIntersecting);
        else if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [repeat, triggerAnimation]);

  return (
    <div
      ref={ref}
      className={`relative rounded-lg overflow-hidden  ${className} ${hoverZoom ? "group" : ""}`}
    >
      {/* reveal box */}
      <div
        className="absolute rounded-lg inset-1/2 -translate-x-1/2 -translate-y-1/2 bg-white overflow-hidden"
        style={{
          width: show ? "100%" : intialSize,
          height: show ? "100%" : intialSize,
          transition: `width ${frameDuration}ms ${easing}, height ${frameDuration}ms ${easing}`,
        }}
      >
        {/* ✅ hover wrapper (tailwind hover scale works here) */}
        <div
          className={
            hoverZoom
              ? "absolute rounded-lg inset-0 transition-transform ease-in-out duration-700 group-hover:scale-105"
              : "absolute inset-0"
          }
        >
          {/* reveal zoom transform */}
          <div
            className="absolute rounded-lg inset-0 bg-cover bg-center will-change-transform"
            style={{
              backgroundImage: `url('${image}')`,
              transform: show
                ? "translate3d(0,0,0) scale3d(1,1,1)"
                : `translate3d(0,0,0) scale3d(${zoom},${zoom},1)`,
              transition: `transform ${duration}ms ${easing}`,
            }}
            role="img"
            aria-label={alt}
          />
        </div>
      </div>
    </div>
  );
}