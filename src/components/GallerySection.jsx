import { useState, useRef,useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import FloatUpText from "./Animations/floatUpText";

const images = [
    // Slide 1 (User Requested Order)
    "/gallery/img14.webp", "/gallery/img13.webp", "/gallery/img12.webp",
    "/gallery/img11.webp", "/gallery/img15.webp", "/gallery/img7.webp",

    // Slide 2 (Remaining - Optimized for layout)
    "/gallery/img1.webp", "/gallery/img2.webp", "/gallery/img4.webp",
    "/gallery/img3.webp", "/gallery/img5.webp", "/gallery/img6.webp",

    // Slide 3 (Remaining - Keeping tall images at end)
    "/gallery/img8.webp", "/gallery/img9.webp", "/gallery/img10.webp", "/gallery/img16.webp"
];

export default function GallerySection() {
    const scrollRef = useRef(null);const [mobileIndex, setMobileIndex] = useState(0);

    const [ lightboxIndex, setLightboxIndex ] = useState(null);

    const [ activeIndex, setActiveIndex ] = useState(0);
const [mobileActive, setMobileActive] = useState(1);
const [noAnim, setNoAnim] = useState(false);
const intervalRef = useRef(null);
const touchRef = useRef(false);
const startXRef = useRef(0);

const swipeThreshold = 50;

const mobileSlides = [
  images[images.length - 1], // clone last
  ...images,                 // real images
  images[0],                 // clone first
];
useEffect(() => {
  if (window.innerWidth >= 768) return;

  if (mobileActive === mobileSlides.length - 1) {
    setTimeout(() => {
      setNoAnim(true);
      setMobileActive(1);
    }, 700);
  }

  if (mobileActive === 0) {
    setTimeout(() => {
      setNoAnim(true);
      setMobileActive(mobileSlides.length - 2);
    }, 700);
  }

  if (noAnim) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setNoAnim(false));
    });
  }
}, [mobileActive]);
useEffect(() => {
  if (window.innerWidth >= 768) return;

  intervalRef.current = setInterval(() => {
    if (touchRef.current) return;
    setMobileActive((prev) => prev + 1);
  }, 2500);

  return () => clearInterval(intervalRef.current);
}, []);

    // Scroll to specific slide index
    const scrollToSlide = (index) => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            // Clamp index between 0 and number of slides - 1
            const maxIndex = container.children.length - 1;
            const targetIndex = Math.max(0, Math.min(index, maxIndex));

            const slide = container.children[ targetIndex ];
            if (slide) {
                container.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
            }
        }
    };

    // Scroll Handler for Main Slider Arrows
    const scroll = (direction) => {
        const newIndex = direction === "left" ? activeIndex - 1 : activeIndex + 1;
        scrollToSlide(newIndex);
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const index = Math.round(scrollLeft / clientWidth);
            setActiveIndex(index);
        }
    };

    // Lightbox Handlers
    const openLightbox = (index) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);
    const nextImage = (e) => {
        e.stopPropagation();
        setLightboxIndex((prev) => (prev + 1) % images.length);
    };
    const prevImage = (e) => {
        e.stopPropagation();
        setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <section id="gallery" className="w-full md:min-h-screen bg-white  py-20 relative">
            {/* TITLE */}
            <div className="text-center mb-10">
                <FloatUpText className="text-[#a1461a] text-xs tracking-[0.2em] mb-5 ">GALLERY</FloatUpText>
            </div>
{/* ===== MOBILE GALLERY SLIDER ===== */}
<div className="md:hidden relative w-full px-6">
  <div
    className="w-full overflow-hidden rounded-sm"
    onTouchStart={(e) => {
      touchRef.current = true;
      clearInterval(intervalRef.current);
      startXRef.current = e.touches[0].clientX;
    }}
    onTouchEnd={(e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startXRef.current - endX;

      if (Math.abs(diff) > swipeThreshold) {
        diff > 0
          ? setMobileActive((prev) => prev + 1)
          : setMobileActive((prev) => prev - 1);
      }

      setTimeout(() => {
        touchRef.current = false;
      }, 1000);
    }}
  >
    <div
      className={`flex ${
        noAnim ? "" : "transition-transform duration-700 ease-in-out"
      }`}
      style={{
        transform: `translateX(-${mobileActive * 100}%)`,
      }}
    >
      {mobileSlides.map((src, index) => (
        <div
          key={index}
          className="w-full shrink-0 h-[55vh]"
          onClick={() => openLightbox((index - 1 + images.length) % images.length)}
        >
          <img
            src={src}
            alt="Gallery"
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  </div>

  {/* DOTS */}
  <div className="flex justify-end pr-4 mt-3 gap-2">
    {images.map((_, i) => (
      <button
        key={i}
        onClick={() => setMobileActive(i + 1)}
        className={`w-2 h-2 rounded-full transition ${
          i + 1 === mobileActive ? "bg-orange-600" : "bg-gray-300"
        }`}
      />
    ))}
  </div>
</div>

            {/* MAIN CAROUSEL WRAPPER */}
            <div className="hidden md:block max-w-6xl px-6 mx-auto relative w-full group">
                <style>{`
                    .hide-scrollbar::-webkit-scrollbar { display: none; }
                    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `}</style>

                {/* Left Arrow */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        scroll("left");
                    }}
                    className="absolute left-[-15px] top-1/2 -translate-y-1/2 z-30 p-2 bg-white/80 hover:bg-white shadow-md rounded-full text-gray-800 transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Right Arrow */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        scroll("right");
                    }}
                    className="absolute right-[-15px] top-1/2 -translate-y-1/2 z-30 p-2 bg-white/80 hover:bg-white shadow-md rounded-full text-gray-800 transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
                >
                    <ChevronRight size={20} />
                </button>

                {/* HORIZONTAL SCROLL CONTAINER */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-8 pb-4 relative"
                    style={{ scrollBehavior: 'smooth' }}
                >

                    {/* === SLIDE 1 (Images 0-5) === */}
                    <div className="min-w-full snap-center">
                        <div className="grid grid-cols-1 gap-[10px] md:grid-cols-[1fr_1.15fr_1.6fr]">
                            <div className="flex flex-col gap-[10px]">
                                <GalleryImage src={images[ 0 ]} onClick={() => openLightbox(0)} height="h-[300px]" />
                                <GalleryImage src={images[ 1 ]} onClick={() => openLightbox(1)} height="h-[300px]" />
                            </div>
                            <GalleryImage src={images[ 2 ]} onClick={() => openLightbox(2)} height="h-[610px]" />
                            <div className="flex flex-col gap-[10px]">
                                <GalleryImage src={images[ 3 ]} onClick={() => openLightbox(3)} height="h-[300px]" />
                                <div className="grid grid-cols-2 gap-[10px]">
                                    <GalleryImage src={images[ 4 ]} onClick={() => openLightbox(4)} height="h-[300px]" />
                                    <GalleryImage src={images[ 5 ]} onClick={() => openLightbox(5)} height="h-[300px]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* === SLIDE 2 (Images 6-11) === */}
                    <div className="min-w-full snap-center">
                        <div className="grid grid-cols-1 gap-[10px] md:grid-cols-[1fr_1.15fr_1.6fr]">
                            <div className="flex flex-col gap-[10px]">
                                <GalleryImage src={images[ 6 ]} onClick={() => openLightbox(6)} height="h-[300px]" />
                                <GalleryImage src={images[ 7 ]} onClick={() => openLightbox(7)} height="h-[300px]" />
                            </div>
                            <GalleryImage src={images[ 9 ]} onClick={() => openLightbox(9)} height="h-[610px]" />
                            <div className="flex flex-col gap-[10px]">
                                <GalleryImage src={images[ 8 ]} onClick={() => openLightbox(8)} height="h-[300px]" />
                                <div className="grid grid-cols-2 gap-[10px]">
                                    <GalleryImage src={images[ 10 ]} onClick={() => openLightbox(10)} height="h-[300px]" />
                                    <GalleryImage src={images[ 11 ]} onClick={() => openLightbox(11)} height="h-[300px]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* === SLIDE 3 (Images 12-15) === */}
                    <div className="min-w-full snap-center">
                        <div className="grid grid-cols-1 gap-[10px] md:grid-cols-[1fr_1.15fr_1.6fr]">
                            <div className="flex flex-col gap-[10px]">
                                <GalleryImage src={images[ 12 ]} onClick={() => openLightbox(12)} height="h-[300px]" />
                                <GalleryImage src={images[ 13 ]} onClick={() => openLightbox(13)} height="h-[300px]" />
                            </div>
                            <GalleryImage src={images[ 14 ]} onClick={() => openLightbox(14)} height="h-[610px]" />
                            <div className="h-[610px] w-full">
                                <GalleryImage src={images[ 15 ]} onClick={() => openLightbox(15)} height="h-full" />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Dots / Hint */}
                <div className="flex justify-center mt-6 gap-2">
                    {[ 0, 1, 2 ].map((index) => (
                        <button
                            key={index}
                            onClick={() => scrollToSlide(index)}
                            className={`h-1.5 w-1.5 rounded-full transition-colors ${activeIndex === index ? "bg-orange-600/80" : "bg-gray-300"}`}
                        />
                    ))}
                </div>
            </div>

            {/* LIGHTBOX OVERLAY */}
            {lightboxIndex !== null && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                    onClick={closeLightbox}
                >
                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
                    >
                        <X size={32} />
                    </button>

                    <button
                        onClick={prevImage}
                        className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors p-2"
                    >
                        <ChevronLeft size={40} />
                    </button>

                    <img
                        src={images[ lightboxIndex ]}
                        alt="Enlarged View"
                        className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />

                    <button
                        onClick={nextImage}
                        className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors p-2"
                    >
                        <ChevronRight size={40} />
                    </button>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest font-light">
                        {lightboxIndex + 1} / {images.length}
                    </div>
                </div>
            )}
        </section>
    );
}

function GalleryImage({ src, onClick, height }) {
    return (
        <div
            onClick={onClick}
            className={`w-full ${height} overflow-hidden rounded-sm group cursor-pointer relative`}
        >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10" />
            <img
                src={src}
                alt="Gallery"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
        </div>
    );
}
