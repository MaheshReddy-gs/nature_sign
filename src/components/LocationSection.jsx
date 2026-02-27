import { motion } from "framer-motion";
import { useModal } from "../context/ModalContext";
import FloatUpText from "./Animations/floatUpText";
import { useRef, useState, useCallback, useEffect } from "react";
import CustomButton from "./CustomButton";
import { MapPin, Plane, Building2, GraduationCap, Train, Landmark } from "lucide-react";

const LocationSection = () => {
  const { openModal } = useModal();

  // ── Refs ──
  const desktopMapRef = useRef(null); // desktop map container
  const mapRef = useRef(null);        // mobile map container
  const mapImgRef = useRef(null);

  const INITIAL_ZOOM = 1.1;
  const MIN_ZOOM = INITIAL_ZOOM;
  const MAX_ZOOM = 3;
  const ZOOM_THRESHOLD = 1.8;

  // Mobile-only constants
  const MOBILE_SCROLL_RELEASE_EPSILON = 0.02;
  const MOBILE_IMAGE_HEIGHT_MULTIPLIER = 1.28;
  const MOBILE_IMAGE_TOP_SHIFT_RATIO = 0.14;
  const SITE_PIN_X_RATIO = 0.355;

  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef(null);
  const basePanRef = useRef({ x: 0, y: 0 });

  const zoomRef = useRef(INITIAL_ZOOM);
  const panRef = useRef({ x: 0, y: 0 });
  const isPanningRef = useRef(false);
  const lastTouchDist = useRef(null);

  zoomRef.current = zoom;
  panRef.current = pan;
  isPanningRef.current = isPanning;

  // ── Pin data ──
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
  const [isStripMinimised, setIsStripMinimised] = useState(false);

  const handlePinSelect = useCallback((pin) => {
    setActivePin(pin);
    setIsStripMinimised(false);
  }, []);

  // ── Mobile base-pan helpers ──
  const getBasePan = useCallback((frameW, frameH) => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile) return { x: 0, y: 0 };

    const img = mapImgRef.current;
    if (!img || !img.naturalWidth || !img.naturalHeight) return { x: 0, y: 0 };

    const baseContentH = frameH * MOBILE_IMAGE_HEIGHT_MULTIPLIER;
    const baseContentW = (img.naturalWidth / img.naturalHeight) * baseContentH;
    const centeredPanX = (0.5 - SITE_PIN_X_RATIO) * baseContentW;
    const maxX = Math.max(0, (baseContentW - frameW) / 2);

    return {
      x: Math.min(maxX, Math.max(-maxX, centeredPanX)),
      y: 0,
    };
  }, [MOBILE_IMAGE_HEIGHT_MULTIPLIER, SITE_PIN_X_RATIO]);

  useEffect(() => {
    const container = mapRef.current;
    if (!container) return;
    const { width, height } = container.getBoundingClientRect();
    const basePan = getBasePan(width, height);
    basePanRef.current = basePan;
    if (zoom <= MIN_ZOOM) {
      setPan(basePan);
      panRef.current = basePan;
    }
  }, [zoom, MIN_ZOOM, getBasePan]);

  useEffect(() => {
    const applyBasePan = () => {
      if (zoomRef.current > MIN_ZOOM) return;
      const container = mapRef.current;
      if (!container) return;
      const { width, height } = container.getBoundingClientRect();
      const basePan = getBasePan(width, height);
      basePanRef.current = basePan;
      panRef.current = basePan;
      setPan(basePan);
    };

    const img = mapImgRef.current;
    if (img && !img.complete) {
      img.addEventListener("load", applyBasePan);
    } else {
      applyBasePan();
    }
    window.addEventListener("resize", applyBasePan);
    return () => {
      if (img && !img.complete) img.removeEventListener("load", applyBasePan);
      window.removeEventListener("resize", applyBasePan);
    };
  }, [MIN_ZOOM, getBasePan]);

  // ── Clamp helpers ──
  const getMapCanvasWidth = () => {
    const img = mapImgRef.current;
    if (!img || !img.naturalWidth || !img.naturalHeight) return null;
    const frameH = mapRef.current?.getBoundingClientRect().height || window.innerHeight * 0.7;
    return (img.naturalWidth / img.naturalHeight) * frameH;
  };

  const clampPan = (px, py, z, frameW, frameH) => {
    if (z <= MIN_ZOOM) return basePanRef.current;
    const mapW = getMapCanvasWidth();
    if (mapW) {
      const scaledMapW = mapW * z;
      const maxX = Math.max(0, (scaledMapW - frameW) / 2);
      const maxY = Math.max(0, (frameH * (z - 1)) / 2);
      return {
        x: Math.min(maxX, Math.max(-maxX, px)),
        y: Math.min(maxY, Math.max(-maxY, py)),
      };
    }
    const maxX = Math.max(0, (frameW * (z - 1)) / 2);
    const maxY = Math.max(0, (frameH * (z - 1)) / 2);
    return {
      x: Math.min(maxX, Math.max(-maxX, px)),
      y: Math.min(maxY, Math.max(-maxY, py)),
    };
  };

  const clampPanMobile = (px, py, z, frameW, frameH) => {
    if (z <= MIN_ZOOM) return basePanRef.current;
    const img = mapImgRef.current;
    const hasNaturalSize = !!(img && img.naturalWidth && img.naturalHeight);
    const baseContentH = frameH * MOBILE_IMAGE_HEIGHT_MULTIPLIER;
    const topInset = frameH * MOBILE_IMAGE_TOP_SHIFT_RATIO;
    const bottomExtent = baseContentH - topInset;
    let baseContentW;
    if (hasNaturalSize) {
      baseContentW = (img.naturalWidth / img.naturalHeight) * baseContentH;
    } else {
      baseContentW = frameW;
    }
    const scaledW = baseContentW * z;
    const maxX = Math.max(0, (scaledW - frameW) / 2);
    const minY = frameH - bottomExtent * z;
    const maxY = topInset * z;
    return {
      x: Math.min(maxX, Math.max(-maxX, px)),
      y: Math.min(maxY, Math.max(minY, py)),
    };
  };

  const getMobileVerticalPanBounds = (z, frameH) => {
    if (z <= MIN_ZOOM) return { minY: 0, maxY: 0 };
    const baseContentH = frameH * MOBILE_IMAGE_HEIGHT_MULTIPLIER;
    const topInset = frameH * MOBILE_IMAGE_TOP_SHIFT_RATIO;
    const bottomExtent = baseContentH - topInset;
    return {
      minY: frameH - bottomExtent * z,
      maxY: topInset * z,
    };
  };

  // ══════════════════════════════════════════════════════
  // DESKTOP wheel handler — copied exactly from original desktop version
  // Always preventDefault, plain scroll zooms (deltaY * 0.003)
  // ══════════════════════════════════════════════════════
  const handleWheelDesktop = useCallback((e) => {
    e.preventDefault();
    const container = desktopMapRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const zoomDelta = e.ctrlKey ? e.deltaY * 0.01 : e.deltaY * 0.003;

    const prevZoom = zoomRef.current;
    const prevPan = panRef.current;

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

    zoomRef.current = nextZoom;
    panRef.current = newPan;
    setZoom(nextZoom);
    setPan(newPan);
  }, [MIN_ZOOM, MAX_ZOOM]);

  // ══════════════════════════════════════════════════════
  // MOBILE wheel handler — smart scroll-release version
  // ══════════════════════════════════════════════════════
  const handleWheelMobile = useCallback((e) => {
    const container = mapRef.current;
    if (!container) return;
    const currentZoom = zoomRef.current;
    const currentPan = panRef.current;
    const { width, height } = container.getBoundingClientRect();

    if (currentZoom <= MIN_ZOOM) return;

    const maxY = Math.max(0, (height * (currentZoom - 1)) / 2);
    const scrollingDown = e.deltaY > 0;
    const scrollingUp = e.deltaY < 0;
    const atTopEdge = currentPan.y >= maxY - 0.5;
    const atBottomEdge = currentPan.y <= -maxY + 0.5;
    const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);

    if (!isHorizontalScroll) {
      if (scrollingUp && atTopEdge) return;
      if (scrollingDown && atBottomEdge) return;
    }

    e.preventDefault();

    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    if (e.ctrlKey) {
      const zoomDelta = e.deltaY * 0.01;
      const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, currentZoom - zoomDelta));
      if (nextZoom === currentZoom) return;
      let newPan;
      if (nextZoom <= MIN_ZOOM) {
        newPan = basePanRef.current;
      } else {
        const contentX = (mouseX - cx - currentPan.x) / currentZoom;
        const contentY = (mouseY - cy - currentPan.y) / currentZoom;
        const newPanX = (mouseX - cx) - contentX * nextZoom;
        const newPanY = (mouseY - cy) - contentY * nextZoom;
        const maxPanX = (rect.width * (nextZoom - 1)) / 2;
        const maxPanY = (rect.height * (nextZoom - 1)) / 2;
        newPan = {
          x: Math.min(maxPanX, Math.max(-maxPanX, newPanX)),
          y: Math.min(maxPanY, Math.max(-maxPanY, newPanY)),
        };
      }
      zoomRef.current = nextZoom;
      panRef.current = newPan;
      setZoom(nextZoom);
      setPan(newPan);
    } else {
      if (currentZoom <= MIN_ZOOM) {
        if (panRef.current.x !== basePanRef.current.x || panRef.current.y !== basePanRef.current.y) {
          panRef.current = basePanRef.current;
          setPan(basePanRef.current);
        }
        return;
      }
      const newPan = clampPan(
        currentPan.x - e.deltaX,
        currentPan.y - e.deltaY,
        currentZoom, width, height
      );
      panRef.current = newPan;
      setPan(newPan);
    }
  }, [MIN_ZOOM, MAX_ZOOM]);

  const getTouchDist = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // ── Mouse handlers (desktop drag-to-pan) ──
  const handleMouseDown = useCallback((e) => {
    if (zoomRef.current <= MIN_ZOOM) return;
    isPanningRef.current = true;
    setIsPanning(true);
    panStart.current = { x: e.clientX - panRef.current.x, y: e.clientY - panRef.current.y };
  }, [MIN_ZOOM]);

  const handleMouseMovePan = useCallback((e) => {
    if (!isPanningRef.current || !panStart.current) return;
    const container = desktopMapRef.current || mapRef.current;
    if (!container) return;
    const { width, height } = container.getBoundingClientRect();
    const newPan = clampPan(
      e.clientX - panStart.current.x,
      e.clientY - panStart.current.y,
      zoomRef.current, width, height
    );
    panRef.current = newPan;
    setPan(newPan);
  }, []);

  const handleMouseUp = useCallback(() => {
    isPanningRef.current = false;
    setIsPanning(false);
    panStart.current = null;
  }, []);

  // ── Touch handlers (mobile) ──
  const touchStartPos = useRef(null);
  const isMapGesture = useRef(false);

  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 2) {
      setIsStripMinimised(true);
      e.preventDefault();
      isMapGesture.current = true;
      lastTouchDist.current = getTouchDist(e.touches);
      return;
    }
    if (e.touches.length === 1) {
      const t = e.touches[0];
      touchStartPos.current = { x: t.clientX, y: t.clientY };
      panStart.current = { x: t.clientX - panRef.current.x, y: t.clientY - panRef.current.y };
      lastTouchDist.current = null;
      isMapGesture.current = false;
    }
  }, []);

  const handleTouchMove = useCallback((e) => {
    const container = mapRef.current;
    if (!container) return;
    const { width, height } = container.getBoundingClientRect();

    if (e.touches.length === 2) {
      setIsStripMinimised(true);
      e.preventDefault();
      const dist = getTouchDist(e.touches);
      if (lastTouchDist.current !== null) {
        const ratio = dist / lastTouchDist.current;
        const prevZ = zoomRef.current;
        const nextZ = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prevZ * ratio));
        const newPan = nextZ <= MIN_ZOOM
          ? basePanRef.current
          : clampPanMobile(panRef.current.x, panRef.current.y, nextZ, width, height);
        zoomRef.current = nextZ;
        panRef.current = newPan;
        setZoom(nextZ);
        setPan(newPan);
      }
      lastTouchDist.current = dist;
      return;
    }

    if (e.touches.length === 1 && panStart.current) {
      const t = e.touches[0];
      const currentZ = zoomRef.current;
      const isMeaningfullyZoomed = currentZ > MIN_ZOOM + MOBILE_SCROLL_RELEASE_EPSILON;

      if (!isMeaningfullyZoomed) {
        isMapGesture.current = false;
        isPanningRef.current = false;
        setIsPanning(false);
        return;
      }

      if (!isMapGesture.current && touchStartPos.current) {
        const dx = Math.abs(t.clientX - touchStartPos.current.x);
        const dy = Math.abs(t.clientY - touchStartPos.current.y);

        if (dx < 5 && dy < 5) return;

        if (dy > dx) {
          const { minY, maxY } = getMobileVerticalPanBounds(currentZ, height);
          const fingerMovingUp = t.clientY < touchStartPos.current.y;
          const atTopEdge = panRef.current.y >= maxY - 0.5;
          const atBottomEdge = panRef.current.y <= minY + 0.5;

          if (
            Math.abs(maxY - minY) < 1 ||
            (fingerMovingUp && atBottomEdge) ||
            (!fingerMovingUp && atTopEdge)
          ) {
            isMapGesture.current = false;
            return;
          }
        }

        isMapGesture.current = true;
        isPanningRef.current = true;
        setIsPanning(true);
        setIsStripMinimised(true);
      }

      if (!isMapGesture.current) return;

      if (touchStartPos.current) {
        const dyFromStart = t.clientY - touchStartPos.current.y;
        const movingMostlyVertical = Math.abs(dyFromStart) > Math.abs(t.clientX - touchStartPos.current.x);
        if (movingMostlyVertical) {
          const { minY, maxY } = getMobileVerticalPanBounds(currentZ, height);
          const fingerMovingUp = dyFromStart < 0;
          const atTopEdge = panRef.current.y >= maxY - 0.5;
          const atBottomEdge = panRef.current.y <= minY + 0.5;
          if ((fingerMovingUp && atBottomEdge) || (!fingerMovingUp && atTopEdge)) {
            isMapGesture.current = false;
            isPanningRef.current = false;
            setIsPanning(false);
            return;
          }
        }
      }

      e.preventDefault();
      const newPan = clampPanMobile(
        t.clientX - panStart.current.x,
        t.clientY - panStart.current.y,
        zoomRef.current, width, height
      );
      panRef.current = newPan;
      setPan(newPan);
    }
  }, [
    MIN_ZOOM,
    MAX_ZOOM,
    MOBILE_SCROLL_RELEASE_EPSILON,
    MOBILE_IMAGE_HEIGHT_MULTIPLIER,
    MOBILE_IMAGE_TOP_SHIFT_RATIO,
  ]);

  const handleTouchEnd = useCallback((e) => {
    if (e.touches.length === 0) {
      isPanningRef.current = false;
      isMapGesture.current = false;
      touchStartPos.current = null;
      setIsPanning(false);
      panStart.current = null;
      lastTouchDist.current = null;
    } else if (e.touches.length === 1) {
      lastTouchDist.current = null;
      const t = e.touches[0];
      panStart.current = { x: t.clientX - panRef.current.x, y: t.clientY - panRef.current.y };
    }
  }, []);

  // ── Desktop attach — original simple wheel only ──
  const attachWheelDesktop = useCallback((node) => {
    if (node) {
      node.addEventListener("wheel", handleWheelDesktop, { passive: false });
      desktopMapRef.current = node;
    }
  }, [handleWheelDesktop]);

  // ── Mobile attach — smart wheel + all touch events ──
  const attachWheelMobile = useCallback((node) => {
    if (node) {
      node.addEventListener("wheel", handleWheelMobile, { passive: false });
      node.addEventListener("touchstart", handleTouchStart, { passive: false });
      node.addEventListener("touchmove", handleTouchMove, { passive: false });
      node.addEventListener("touchend", handleTouchEnd, { passive: true });
      mapRef.current = node;
    }
  }, [handleWheelMobile, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // ── Shared pin renderer ──
  const renderPins = () =>
    pins.map((pin) => {
      if (pin.type === "road") {
        return (
          <div
            key={pin.id}
            className="pointer-events-none absolute z-[3] whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.08em] text-black [text-shadow:0_1px_2px_rgba(255,255,255,0.8)]"
            style={{
              top: `${pin.y}%`,
              left: `${pin.x}%`,
              transform: `translate(-50%, -50%) scale(${1 / zoom}) rotate(${pin.rotation ?? 0}deg)`,
              transformOrigin: "center center",
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
            onClick={() => handlePinSelect(pin)}
            className="absolute z-20 cursor-pointer transition-opacity duration-300 ease-in-out"
            style={{
              top: `${pin.y}%`,
              left: `${pin.x}%`,
              transform: "translate(-50%, -50%)",
              opacity: isVisible ? 1 : 0,
              pointerEvents: isVisible ? "auto" : "none",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="origin-bottom"
            >
              <div
                className="felx pointer-events-none absolute bottom-[calc(100%+14px)] left-[5%] z-20 min-w-[120px] rounded-lg bg-white px-4 py-3 text-center shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
                style={{
                  transform: `translateX(-50%) scale(${1 / zoom})`,
                  transformOrigin: "bottom center",
                }}
              >
                <img
                  src="/naturesignLogo1.png"
                  alt="Nature's Sign"
                  className="mb-1 w-full object-contain"
                />
                <div
                  className="absolute bottom-[-5px] right-[10%] h-0 w-0 -translate-x-1/2 border-x-[10px] border-x-transparent border-t-[10px] border-t-white [filter:drop-shadow(0_2px_2px_rgba(0,0,0,0.1))]"
                  style={{ transform: "translateX(-50%)" }}
                />
              </div>
            </motion.div>
            <div className=" rotate-2 bg-[#E8620A] px-2 py-[3px] text-[11px] font-extrabold tracking-[0.1em] text-white">
              PLOTS
            </div>
          </div>
        );
      }

      return (
        <div
          key={pin.id}
          onClick={() => handlePinSelect(pin)}
          className="absolute cursor-pointer transition-opacity duration-300 ease-in-out"
          style={{
            top: `${pin.y}%`,
            left: `${pin.x}%`,
            transform: `translate(-50%, -50%) scale(${1 / zoom})`,
            transformOrigin: "center center",
            opacity: isVisible ? 1 : 0,
            pointerEvents: isVisible ? "auto" : "none",
            zIndex: activePin.id === pin.id ? 10 : 5,
          }}
        >
          <motion.div {...animateProps}>
            <div
              className="flex items-center justify-center rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
              style={{
                width: `${dotSize}px`,
                height: `${dotSize}px`,
                backgroundColor: dotColor,
              }}
            >
              <Icon size={iconSize} color="white" />
            </div>
          </motion.div>
          <div
            className="pointer-events-none absolute left-1/2 top-full mt-[3px] block -translate-x-1/2 whitespace-nowrap rounded-[3px] px-[5px] py-[2px] text-[10px] text-black"
            style={{ transformOrigin: "top center" }}
          >
            {pin.title}
          </div>
        </div>
      );
    });

  return (
    <section id="locations" className="w-full bg-white">
      <div className="py-16 md:py-14">
        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}
          <div className="text-center mb-10">
            <FloatUpText className="text-[#a1461a] text-center text-xs tracking-[0.2em] uppercase mb-5">
              LOCATION
            </FloatUpText>
          </div>

          {/* ══════════════════════════════════════
              DESKTOP LAYOUT  (hidden on mobile)
          ══════════════════════════════════════ */}
          <FloatUpText className="hidden md:flex w-full justify-center overflow-hidden mt-6 md:mt-10">
            <div className="w-full max-w-7xl gap-3  grid grid-cols-1 md:grid-cols-4">

              {/* LEFT DETAILS */}
              <div className="md:col-span-1 flex flex-col justify-top  gap-3">

                {/* IMAGE */}
                {activePin.image && (
                  <div style={{ width: "100%", overflow: "hidden" }}>
                    <img className=""
                      src={activePin.image}
                      alt={activePin.title}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </div>
                )}

                {/* TITLE */}
                <h3 className="text-xl uppercase text-black">
                  {activePin.title}
                </h3>

                {/* DESCRIPTION */}
                {activePin.description && (
                  <p className="text-gray-700 text-base leading-relaxed">
                    {activePin.description}
                  </p>
                )}

                {/* ETA */}
                {activePin.eta && (
                  <p style={{ fontSize: "12px", color: "green", fontWeight: 600 }}>
                     {activePin.eta}
                  </p>
                )}

              </div>

              {/* MAP */}
              <div
                ref={attachWheelDesktop}
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
                    src="/map2.svg"
                    alt="Location Map"
                    draggable={false}
                    className="w-full h-full object-contain"
                  />

                  {/* PINS */}
                  {renderPins()}
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

          {/* ══════════════════════════════════════
              MOBILE LAYOUT  (hidden on desktop)
          ══════════════════════════════════════ */}
          <div className="md:hidden mt-6">
            <div className="relative h-[60vh] w-full overflow-hidden rounded-lg">
              <div
                ref={attachWheelMobile}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMovePan}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="absolute inset-0 overflow-hidden select-none"
                style={{
                  cursor: isPanning ? "grabbing" : "grab",
                  touchAction: "pan-y",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    height: "70vh",
                    width: "auto",
                    transform: `translateX(calc(-50% + ${pan.x}px)) translateY(${pan.y}px) scale(${zoom})`,
                    transformOrigin: "center top",
                    transition: isPanning ? "none" : "transform 0.1s ease-out",
                  }}
                >
                  <img
                    ref={mapImgRef}
                    src="/map2.svg"
                    alt="Location Map"
                    draggable={false}
                    className="ob block w-auto max-w-none"
                    style={{
                      height: "calc(70vh * 1.28)",
                      marginTop: "calc(70vh * -0.14)",
                    }}
                  />
                  <div className="absolute left-0 w-full" style={{
                    top: "calc(70vh * -0.14)",
                    height: "calc(70vh * 1.28)",
                  }}>
                    {renderPins()}
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute right-2 top-2 z-30 rounded bg-black/45 px-[7px] py-[3px] text-[10px] text-white">
                {zoom > 1
                  ? `${Math.round(zoom * 100)}% · Drag to pan`
                  : "Pinch to zoom"}
              </div>

              <motion.div
                key={activePin.id}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute bottom-0 left-0 right-0 z-[25] rounded-t-2xl bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.12)]"
              >
                <div
                  onClick={() => setIsStripMinimised(m => !m)}
                  className="flex cursor-pointer items-center justify-between px-5 pb-2 pt-3"
                >
                  <div className="h-1 w-9 rounded-[2px] bg-gray-200" />
                  <motion.span
                    animate={{ rotate: isStripMinimised ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm leading-none text-gray-400"
                  >
                    ▼
                  </motion.span>
                </div>

                <motion.div
                  animate={{ height: isStripMinimised ? 0 : "auto", opacity: isStripMinimised ? 0 : 1 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <div style={{ padding: "0 20px 20px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, textTransform: "uppercase", color: "#111", marginBottom: "6px", letterSpacing: "0.05em" }}>
                      {activePin.title}
                    </h3>
                    {activePin.description && (
                      <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: "1.6", marginBottom: "8px" }}>
                        {activePin.description}
                      </p>
                    )}
                    {activePin.eta && (
                      <p style={{ fontSize: "12px", color: "#16a34a", fontWeight: 600, marginBottom: "6px" }}>
                        ⏱ {activePin.eta}
                      </p>
                    )}
                    {activePin.details && activePin.details.length > 0 && (
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "6px" }}>
                        {activePin.details.map((d, i) => (
                          <span key={i} style={{ background: "#f0fdf4", color: "#166534", fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px", border: "1px solid #bbf7d0" }}>
                            {d}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

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