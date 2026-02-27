import { motion } from "framer-motion";
import { useModal } from "../context/ModalContext";
import FloatUpText from "./Animations/floatUpText";
import { useRef, useState, useCallback } from "react";
import CustomButton from "./CustomButton";

const LocationSection = () => {
  const { openModal } = useModal();
  const mapRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef(null);

  const MIN_ZOOM = 1;
  const MAX_ZOOM = 4;
  const ZOOM_THRESHOLD = 1.8;

  // 📍 Pin data — major always visible, minor appear when zoomed
  const pins = [
    {
      id: "site",
      x: 50.5,
      y: 46,
      type: "major",
      title: "Nature's Sign Project Site",
      description:
        "Premium plotted development in Devanahalli with excellent road connectivity.",
    },
    // {
    //   id: "airport",
    //   x: 70,
    //   y: 32,
    //   type: "major",
    //   title: "Kempegowda International Airport",
    //   description:
    //     "Major international airport located about 15–20 minutes from the site.",
    // },
    // {
    //   id: "highway",
    //   x: 58,
    //   y: 55,
    //   type: "minor",
    //   title: "NH 44 Highway",
    //   description: "National Highway connecting Bengaluru to Hyderabad.",
    // },
    // {
    //   id: "hospital",
    //   x: 45,
    //   y: 42,
    //   type: "minor",
    //   title: "Nearby Hospital",
    //   description: "Multi-specialty hospital within 5km of the project site.",
    // },
    // {
    //   id: "school",
    //   x: 49,
    //   y: 52,
    //   type: "minor",
    //   title: "International School",
    //   description: "Reputed international school within the vicinity.",
    // },
    // {
    //   id: "metro",
    //   x: 62,
    //   y: 58,
    //   type: "minor",
    //   title: "Proposed Metro Station",
    //   description: "Upcoming metro connectivity planned for this corridor.",
    // },
  ];

  const [activePin, setActivePin] = useState(pins[0]);

  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();
      const delta = e.ctrlKey ? e.deltaY * 0.01 : e.deltaY * 0.003;
      setZoom((prev) => {
        const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev - delta));
        if (next <= MIN_ZOOM) {
          setPan({ x: 0, y: 0 });
          return MIN_ZOOM;
        }
        return next;
      });
    },
    []
  );

  const handleMouseDown = useCallback(
    (e) => {
      if (zoom <= 1) return;
      setIsPanning(true);
      panStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    },
    [zoom, pan]
  );

  const handleMouseMovePan = useCallback(
    (e) => {
      if (!isPanning || !panStart.current) return;
      const container = mapRef.current;
      if (!container) return;
      const { width, height } = container.getBoundingClientRect();
      const maxPanX = (width * (zoom - 1)) / 2;
      const maxPanY = (height * (zoom - 1)) / 2;
      const nx = Math.min(maxPanX, Math.max(-maxPanX, e.clientX - panStart.current.x));
      const ny = Math.min(maxPanY, Math.max(-maxPanY, e.clientY - panStart.current.y));
      setPan({ x: nx, y: ny });
    },
    [isPanning, zoom]
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
    panStart.current = null;
  }, []);

  // Attach wheel with passive:false so we can preventDefault
  const attachWheel = useCallback(
    (node) => {
      if (node) {
        node.addEventListener("wheel", handleWheel, { passive: false });
        mapRef.current = node;
      }
    },
    [handleWheel]
  );

  return (
    <section id="locations" className="w-full bg-white">
      {/* TOP LOCATION CONTENT */}
      <div className="py-16 md:py-14">
        <div className="max-w-6xl mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-10">
            <FloatUpText className="text-[#a1461a] text-center text-xs tracking-[0.2em] uppercase mb-5">
              LOCATION
            </FloatUpText>
          </div>

          {/* Logo + Address */}
          <div className="w-full flex justify-between mb-6 md:mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20 items-start">
              {/* Logo */}
              <div className="flex justify-center md:justify-start">
                <FloatUpText>
                  <img
                    src="/naturesignLogo1.png"
                    alt="Nature's Sign"
                    className="h-16 md:h-20 mb-5 md:mb-0 w-auto object-contain"
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
                    41/5,Mudugurki Village, Vijayapura Hobli, Devanahalli Taluk,
                    <br className="hidden md:block" /> Bengaluru Rural District,{" "}
                    <br className="md:hidden" />
                    Karnataka,India - 562135
                  </p>
                </FloatUpText>
              </div>
            </div>
          </div>

          {/* Map */}
          <FloatUpText className="w-full flex justify-center overflow-hidden mt-6 md:mt-10">
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-5">

              {/* LEFT DETAILS */}
              <div className="md:col-span-1 flex flex-col justify-center pl-5">
                <h3 className="text-lg font-semibold text-black mb-3">
                  {activePin.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {activePin.description}
                </p>
              </div>

              {/* MAP */}
              <div
                ref={attachWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMovePan}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="relative md:col-span-4 w-full aspect-[16/9] overflow-hidden rounded-lg"
                style={{
                  cursor: zoom > 1 ? (isPanning ? "grabbing" : "grab") : "default",
                  userSelect: "none",
                }}
              >
                {/* ZOOM + PAN WRAPPER */}
                <div
                  style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    transformOrigin: "center center",
                    transition: isPanning ? "none" : "transform 0.1s ease-out",
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  {/* IMAGE */}
                  <img
                    src="/locatiomap.jpg"
                    alt="Location Map"
                    draggable={false}
                    className="w-full h-full object-contain"
                  />

                  {/* PINS */}
                  {pins.map((pin) => {
                    const isVisible = pin.type === "major" || zoom >= ZOOM_THRESHOLD;
                    return (
                      <motion.div
                        key={pin.id}
                        onClick={() => setActivePin(pin)}
                        style={{
                          position: "absolute",
                          top: `${pin.y}%`,
                          left: `${pin.x}%`,
                          transform: "translate(-50%, -50%)",
                          opacity: isVisible ? 1 : 0,
                          transition: "opacity 0.3s ease",
                          pointerEvents: isVisible ? "auto" : "none",
                          zIndex: activePin.id === pin.id ? 10 : 5,
                        }}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        {/* Outer ring */}
                        <div
                          style={{
                            width: pin.type === "major" ? "3px" : "10px",
                            height: pin.type === "major" ? "3px" : "10px",
                            borderRadius: "50%",
                            backgroundColor:
                              activePin.id === pin.id
                                ? "#2563eb"
                                : pin.type === "major"
                                ? "#dc2626"
                                : "#7c3aed",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
                          }}
                        >
                          <span
                            style={{
                              display: "block",
                              width: "40%",
                              height: "40%",
                              background: "white",
                              borderRadius: "50%",
                            }}
                          />
                        </div>

                        {/* Label — counter-scales so text stays readable */}
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "50%",
                            transform: `translateX(-50%) scale(${1 / zoom})`,
                            transformOrigin: "top center",
                            marginTop: "3px",
                            background: "rgba(0,0,0,0.7)",
                            color: "white",
                            fontSize: "10px",
                            padding: "2px 5px",
                            borderRadius: "3px",
                            whiteSpace: "nowrap",
                            pointerEvents: "none",
                            display: pin.type === "major" ? "block" : "none",
                          }}
                        >
                          {pin.title}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Zoom hint */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "8px",
                    right: "8px",
                    background: "rgba(0,0,0,0.45)",
                    color: "white",
                    fontSize: "10px",
                    padding: "3px 7px",
                    borderRadius: "4px",
                    pointerEvents: "none",
                  }}
                >
                  {zoom > 1
                    ? `${Math.round(zoom * 100)}% · Scroll to zoom · Drag to pan`
                    : "Scroll to zoom"}
                </div>
              </div>

            </div>
          </FloatUpText>
        </div>
      </div>

      {/* ✅ BLUE CTA SECTION */}
      <div className="w-full bg-[#2F7F90] py-14">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-center justify-between gap-10">
          {/* Left Text */}
          <div className="text-center md:text-left max-w-3xl">
            <FloatUpText>
              <h2 className="section-heading text-white mb-4">
                Are you excited about the project?
              </h2>
            </FloatUpText>

            <FloatUpText>
              <p className="text-white atext-base leading-relaxed max-w-xl">
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