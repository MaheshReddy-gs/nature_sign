import { motion } from "framer-motion";
import { useModal } from "../context/ModalContext";
import FloatUpText from "./Animations/floatUpText";
import { useRef, useState, useCallback } from "react";
import CustomButton from "./CustomButton";
import { MapPin, Plane, Building2, GraduationCap, Train, Landmark } from "lucide-react";

const LocationSection = () => {
  const { openModal } = useModal();
  const mapRef = useRef(null);
  const INITIAL_ZOOM = 1.1;
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef(null);

  const MIN_ZOOM = INITIAL_ZOOM;
  const MAX_ZOOM = 3;
  const ZOOM_THRESHOLD = 1.8;

  const pins = [
    {
      id: "site",
      x: 35.5, y: 29,
      type: "site",
      title: "Nature's Sign",
      label: "PLOTS",
      description: "Premium plotted development in Devanahalli with excellent road connectivity.",
      details: ["2400 sq ft avg plot size", "RERA Approved", "Gated Community"],
      image: "/naturesignLogo1.png",
    },
    {
      id: "airport", x: 70, y: 42, type: "major",
      title: "International Airport",
      description: "Major international airport serving Bengaluru.",
      eta: "15-20 min from site",
      image: "/map/nandhiHills.jpg",
    },
    {
      id: "nature", x: 26, y: 52, type: "major",
      title: "nandi hills",
      description: "hill of hills naddhi hills.",
      eta: "15-20 min from site",
      image: "/map/nandhiHills.jpg",
    },
    { id: "TADIPATRI", x: 10, y: 23, type: "road", title: "TADIPATRI", rotation: 0 },
    { id: "Chikkaballapura", x: 16, y: 43, type: "road", title: "Chikkaballapura", rotation: 0 },
    { id: " elevated expressway nh-44", x: 37, y: 38, type: "road", title: "elevated expressway nh-44", rotation: 2 },
    { id: " elevated expressway nh-442", x: 72, y: 75, type: "road", title: "elevated expressway nh-44", rotation: 28 },
    { id: "satellite town road", x: 49.5, y: 70, type: "road", title: "satellite town road", rotation: -77.5 },
    { id: "satellite town road2", x: 72, y: 11.8, type: "road", title: "satellite town road", rotation: -26.5 },
    { id: "bommanahalli", x: 54, y: 15, type: "road", title: "bommanahalli", rotation: 0 },
    { id: "devanahalli town", x: 63, y: 45, type: "road", title: "devanahalli town", rotation: 0 },
    { id: "yelahanka doddaballapura road", x: 63, y: 88.5, type: "road", title: "yelahanka - doddaballapura road", rotation: -5 },
    { id: " doddaballapura ", x: 40, y: 95, type: "road", title: "doddaballapura ", rotation: 2 },
    { id: " bengaluru ", x: 95, y: 85, type: "road", title: "bengaluru ", rotation: 2 },
  ];

  const pinIcons = {
    site: Landmark,
    airport: Plane,
    hospital: Building2,
    school: GraduationCap,
    metro: Train,
    default: MapPin,
  };

  const [activePin, setActivePin] = useState(pins[0]);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const container = mapRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const zoomDelta = e.ctrlKey ? e.deltaY * 0.01 : e.deltaY * 0.003;
    const prevZoom = zoom;
    const prevPan = pan;
    const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prevZoom - zoomDelta));
    if (nextZoom === prevZoom) return;

    let newPan;
    if (nextZoom <= MIN_ZOOM) {
      newPan = { x: 0, y: 0 };
    } else {
      const contentX = (mouseX - cx - prevPan.x) / prevZoom;
      const contentY = (mouseY - cy - prevPan.y) / prevZoom;
      const newPanX = (mouseX - cx) - contentX * nextZoom;
      const newPanY = (mouseY - cy) - contentY * nextZoom;
      const maxPanX = (rect.width * (nextZoom - 1)) / 2;
      const maxPanY = (rect.height * (nextZoom - 1)) / 2;
      newPan = {
        x: Math.min(maxPanX, Math.max(-maxPanX, newPanX)),
        y: Math.min(maxPanY, Math.max(-maxPanY, newPanY)),
      };
    }

    setZoom(nextZoom);
    setPan(newPan);
  }, [zoom, pan, MIN_ZOOM, MAX_ZOOM]);

  const handleMouseDown = useCallback((e) => {
    if (zoom <= 1) return;
    setIsPanning(true);
    panStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  }, [zoom, pan]);

  const handleMouseMovePan = useCallback((e) => {
    if (!isPanning || !panStart.current) return;
    const container = mapRef.current;
    if (!container) return;
    const { width, height } = container.getBoundingClientRect();
    const maxPanX = (width * (zoom - 1)) / 2;
    const maxPanY = (height * (zoom - 1)) / 2;
    const nx = Math.min(maxPanX, Math.max(-maxPanX, e.clientX - panStart.current.x));
    const ny = Math.min(maxPanY, Math.max(-maxPanY, e.clientY - panStart.current.y));
    setPan({ x: nx, y: ny });
  }, [isPanning, zoom]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
    panStart.current = null;
  }, []);

  // ── Touch support ──
  const lastTouchDist = useRef(null);

  const getTouchDist = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = useCallback((e) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      const t = e.touches[0];
      setIsPanning(true);
      panStart.current = { x: t.clientX - pan.x, y: t.clientY - pan.y };
      lastTouchDist.current = null;
    } else if (e.touches.length === 2) {
      lastTouchDist.current = getTouchDist(e.touches);
    }
  }, [pan]);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    const container = mapRef.current;
    if (!container) return;
    const { width, height } = container.getBoundingClientRect();

    if (e.touches.length === 2) {
      const dist = getTouchDist(e.touches);
      if (lastTouchDist.current !== null) {
        const ratio = dist / lastTouchDist.current;
        setZoom((prev) => {
          const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev * ratio));
          if (next <= MIN_ZOOM) setPan({ x: 0, y: 0 });
          return next;
        });
      }
      lastTouchDist.current = dist;
    } else if (e.touches.length === 1 && isPanning && panStart.current) {
      const t = e.touches[0];
      setZoom((currentZoom) => {
        const maxPanX = (width * (currentZoom - 1)) / 2;
        const maxPanY = (height * (currentZoom - 1)) / 2;
        const nx = Math.min(maxPanX, Math.max(-maxPanX, t.clientX - panStart.current.x));
        const ny = Math.min(maxPanY, Math.max(-maxPanY, t.clientY - panStart.current.y));
        setPan({ x: nx, y: ny });
        return currentZoom;
      });
    }
  }, [isPanning, MIN_ZOOM, MAX_ZOOM]);

  const handleTouchEnd = useCallback((e) => {
    if (e.touches.length === 0) {
      setIsPanning(false);
      panStart.current = null;
      lastTouchDist.current = null;
    } else if (e.touches.length === 1) {
      lastTouchDist.current = null;
      const t = e.touches[0];
      panStart.current = { x: t.clientX - pan.x, y: t.clientY - pan.y };
    }
  }, [pan]);

  const attachWheel = useCallback((node) => {
    if (node) {
      node.addEventListener("wheel", handleWheel, { passive: false });
      node.addEventListener("touchstart", handleTouchStart, { passive: false });
      node.addEventListener("touchmove", handleTouchMove, { passive: false });
      node.addEventListener("touchend", handleTouchEnd, { passive: false });
      mapRef.current = node;
    }
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Shared map pins renderer
  const renderPins = () =>
    pins.map((pin) => {
      if (pin.type === "road") {
        return (
          <div
            key={pin.id}
            style={{
              position: "absolute",
              top: `${pin.y}%`,
              left: `${pin.x}%`,
              transform: `translate(-50%, -50%) scale(${1 / zoom}) rotate(${pin.rotation ?? 0}deg)`,
              transformOrigin: "center center",
              pointerEvents: "none",
              zIndex: 3,
              fontWeight: "600",
              fontSize: "9px",
              color: "#000",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              textShadow: "0 1px 2px rgba(255,255,255,0.8)",
            }}
          >
            {pin.title}
          </div>
        );
      }

      const isVisible = pin.type !== "minor" || zoom >= ZOOM_THRESHOLD;
      const Icon = pinIcons[pin.id] || pinIcons.default;
      const isSite = pin.type === "site";
      const isMajor = pin.type === "major";

      const dotSize = isSite ? 28 : isMajor ? 20 : 14;
      const iconSize = isSite ? 16 : isMajor ? 11 : 8;
      const dotColor = isSite ? "#2F7F90" : isMajor ? "#dc2626" : "#7c3aed";
      const animateProps = isSite || isMajor
        ? { animate: { scale: [1, 1.12, 1] }, transition: { repeat: Infinity, duration: 1.8, ease: "easeInOut" } }
        : { animate: { scale: [1, 1.06, 1] }, transition: { repeat: Infinity, duration: 2.2, ease: "easeInOut" } };

      if (pin.type === "site") {
        return (
          <div
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
              zIndex: 20,
              cursor: "pointer",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              style={{ transformOrigin: "bottom center" }}
            >
              <div
                className="felx"
                style={{
                  position: "absolute",
                  bottom: "calc(100% + 14px)",
                  left: "5%",
                  transform: `translateX(-50%) scale(${1 / zoom})`,
                  transformOrigin: "bottom center",
                  background: "white",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  minWidth: "120px",
                  textAlign: "center",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                  pointerEvents: "none",
                  zIndex: 20,
                }}
              >
                <img
                  src="/naturesignLogo1.png"
                  alt="Nature's Sign"
                  className="w-full"
                  style={{ objectFit: "contain", marginBottom: 4 }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: -5,
                    right: "10%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "10px solid transparent",
                    borderRight: "10px solid transparent",
                    borderTop: "10px solid white",
                    filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.1))",
                  }}
                />
              </div>
            </motion.div>
            <div
              className="rotate-2"
              style={{
                background: "#E8620A",
                color: "white",
                fontWeight: 800,
                fontSize: 11,
                padding: "3px 8px",
                letterSpacing: "0.1em",
              }}
            >
              PLOTS
            </div>
          </div>
        );
      }

      return (
        <div
          key={pin.id}
          onClick={() => setActivePin(pin)}
          style={{
            position: "absolute",
            top: `${pin.y}%`,
            left: `${pin.x}%`,
            transform: `translate(-50%, -50%) scale(${1 / zoom})`,
            transformOrigin: "center center",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.3s ease",
            pointerEvents: isVisible ? "auto" : "none",
            zIndex: activePin.id === pin.id ? 10 : 5,
            cursor: "pointer",
          }}
        >
          <motion.div {...animateProps}>
            <div
              style={{
                width: `${dotSize}px`,
                height: `${dotSize}px`,
                borderRadius: "50%",
                backgroundColor: dotColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
              }}
            >
              <Icon size={iconSize} color="white" />
            </div>
          </motion.div>
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              transformOrigin: "top center",
              marginTop: "3px",
              color: "black",
              fontSize: "10px",
              padding: "2px 5px",
              borderRadius: "3px",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              display: "block",
            }}
          >
            {pin.title}
          </div>
        </div>
      );
    });

  return (
    <section id="locations" className="w-full bg-white">
      {/* TOP LOCATION CONTENT */}
      <div className="py-16 md:py-14">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-10">
            <FloatUpText className="text-[#a1461a] text-center text-xs tracking-[0.2em] uppercase mb-5">
              LOCATION
            </FloatUpText>
          </div>

          {/* ── DESKTOP LAYOUT (md and above) — unchanged ── */}
          <FloatUpText className="hidden md:flex w-full justify-center overflow-hidden mt-6 md:mt-10">
            <div className="w-full max-w-7xl gap-3 grid grid-cols-1 md:grid-cols-4">
              {/* LEFT DETAILS */}
              <div className="md:col-span-1 flex flex-col justify-top gap-3">
                {activePin.image && (
                  <div style={{ width: "100%", overflow: "hidden" }}>
                    <img
                      src={activePin.image}
                      alt={activePin.title}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </div>
                )}
                <h3 className="text-xl uppercase text-black">{activePin.title}</h3>
                {activePin.description && (
                  <p className="text-gray-700 text-base leading-relaxed">{activePin.description}</p>
                )}
                {activePin.eta && (
                  <p style={{ fontSize: "12px", color: "green", fontWeight: 600 }}>
                    {activePin.eta}
                  </p>
                )}
              </div>

              {/* MAP */}
              <div
                ref={attachWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMovePan}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="relative md:col-span-3 w-full aspect-auto overflow-hidden rounded-lg"
                style={{
                  cursor: zoom > 1 ? (isPanning ? "grabbing" : "grab") : "default",
                  userSelect: "none",
                }}
              >
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
                  <img
                    src="/map2.svg"
                    alt="Location Map"
                    draggable={false}
                    className="w-full h-full object-contain"
                  />
                  {renderPins()}
                </div>
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

          {/* ── MOBILE LAYOUT (below md) ── */}
          <div className="md:hidden mt-6">
            {/* Map — full width, 60vh, relative container for bottom strip */}
            <div
              className="relative w-full overflow-hidden rounded-lg"
              style={{ height: "60vh" }}
            >
              {/* Zoomable / pannable map */}
              <div
                ref={attachWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMovePan}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="absolute inset-0"
                style={{
                  cursor: zoom > 1 ? (isPanning ? "grabbing" : "grab") : "default",
                  userSelect: "none",
                  touchAction: "none",
                }}
              >
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
                  <img
                    src="/map2.svg"
                    alt="Location Map"
                    draggable={false}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                  {renderPins()}
                </div>
              </div>

              {/* Zoom hint */}
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  background: "rgba(0,0,0,0.45)",
                  color: "white",
                  fontSize: "10px",
                  padding: "3px 7px",
                  borderRadius: "4px",
                  pointerEvents: "none",
                  zIndex: 30,
                }}
              >
                {zoom > 1
                  ? `${Math.round(zoom * 100)}% · Drag to pan`
                  : "Scroll to zoom"}
              </div>

              {/* ── BOTTOM DETAIL STRIP ── */}
              <motion.div
                key={activePin.id}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 25,
                  background: "white",
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                  boxShadow: "0 -4px 24px rgba(0,0,0,0.12)",
                  padding: "16px 20px 20px",
                }}
              >
                {/* Small handle bar */}
                <div
                  style={{
                    width: "36px",
                    height: "4px",
                    borderRadius: "2px",
                    background: "#e5e7eb",
                    margin: "0 auto 14px",
                  }}
                />

                {/* Title */}
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#111",
                    marginBottom: "6px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {activePin.title}
                </h3>

                {/* Description */}
                {activePin.description && (
                  <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: "1.6", marginBottom: "8px" }}>
                    {activePin.description}
                  </p>
                )}

                {/* ETA */}
                {activePin.eta && (
                  <p style={{ fontSize: "12px", color: "#16a34a", fontWeight: 600, marginBottom: "6px" }}>
                    ⏱ {activePin.eta}
                  </p>
                )}

                {/* Details list (for site pin) */}
                {activePin.details && activePin.details.length > 0 && (
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "6px" }}>
                    {activePin.details.map((d, i) => (
                      <span
                        key={i}
                        style={{
                          background: "#f0fdf4",
                          color: "#166534",
                          fontSize: "11px",
                          fontWeight: 600,
                          padding: "3px 10px",
                          borderRadius: "20px",
                          border: "1px solid #bbf7d0",
                        }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
          {/* ── END MOBILE LAYOUT ── */}
        </div>
      </div>

      {/* BLUE CTA SECTION */}
      <div className="w-full bg-[#2F7F90] py-14">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-center justify-between gap-10">
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