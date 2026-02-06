import FloatUpText from "./Animations/floatUpText";
import { useEffect, useState } from "react"
import RevealImage from "./Animations/TopDownImageReveal";

function SvgIcon({ src, color = "#f87130", className = "" }) {
  const [ svgContent, setSvgContent ] = useState("");
  useEffect(() => {
    fetch(src)
      .then(res => res.text())
      .then(text => {
        const coloredSvg = text.replace(/fill:\s*#[0-9a-fA-F]{3,6}/g, `fill: ${color}`);
        setSvgContent(coloredSvg);
      });
  }, [ src, color ]);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}

function Glance() {
  const [ modalImage, setModalImage ] = useState(null);
  const [ isVisible, setIsVisible ] = useState(false);
  const [ mobileExpanded, setMobileExpanded ] = useState(false);
  const [ animationState, setAnimationState ] = useState(null);

  const blocks = [
    {
      img: "/highlight_gallery/images/30cares layout.webp",
      alt: "30 Acres Layout",
      icon: "/highlight_gallery/icons/30acreslayout.svg",
    },
    {
      img: "/highlight_gallery/images/children play area.webp",
      alt: "Children Play Area",
      icon: "/highlight_gallery/icons/childrenplay.svg",
    },
    {
      img: "/highlight_gallery/images/clubhouse.webp",
      alt: "Luxury Clubhouse",
      icon: "/highlight_gallery/icons/clubhouse.svg",
    },
    {
      img: "/highlight_gallery/images/joggintrack.webp",
      alt: "Jogging Track",
      icon: "/highlight_gallery/icons/joggingtrack.svg",
    },
    {
      img: "/highlight_gallery/images/secirity.webp",
      alt: "24/7 Security",
      icon: "/highlight_gallery/icons/security.svg",
    },
    {
      img: "/highlight_gallery/images/50-40roads.webp",
      alt: "50, 40 Feet BT Roads",
      icon: "/highlight_gallery/icons/5-40roads.svg",
    },
    {
      img: "/highlight_gallery/images/amphitheatre.webp",
      alt: "Amphitheater",
      icon: "/highlight_gallery/icons/amphitheatre.svg",
    },
    {
      img: "/highlight_gallery/images/opengym.webp",
      alt: "open gym",
      icon: "/highlight_gallery/icons/opengym.svg",
    },
    {
      img: "/highlight_gallery/images/landscape.webp",
      alt: "Landscape Garden",
      icon: "/highlight_gallery/icons/landscaspegarden.svg",
    },
    {
      img: "/highlight_gallery/images/swimmingpool.webp",
      alt: "Swimming Pool",
      icon: "/highlight_gallery/icons/swimmingpool.svg",
    },
    {
      img: "/highlight_gallery/images/polutionfree.webp",
      alt: "Pollution Free Environment",
      icon: "/highlight_gallery/icons/pullutionfree.svg",
    },
  ];


  // Prevent body scroll when modal is open
  useEffect(() => {
    if (modalImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [ modalImage ]);

  const openModal = (block, event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    // Set initial position to match the clicked card
    setAnimationState({
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    });

    setModalImage(block);

    // Trigger animation after a brief delay
    setTimeout(() => {
      setIsVisible(true);

      // Calculate centered position
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const maxWidth = viewportWidth * 0.9;
      const maxHeight = viewportHeight * 0.85;

      // Calculate final size maintaining aspect ratio
      const img = new Image();
      img.src = block.img;

      setAnimationState({
        left: (viewportWidth - maxWidth) / 2,
        top: (viewportHeight - maxHeight) / 2,
        width: maxWidth,
        height: maxHeight,
      });
    }, 10);
  };

  const closeModal = (event) => {
    if (event) {
      // Find the original card position
      const originalCard = document.querySelector(`[data-modal-img="${modalImage?.img}"]`);

      if (originalCard) {
        const rect = originalCard.getBoundingClientRect();
        setAnimationState({
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        });
      }
    }

    setIsVisible(false);
    setTimeout(() => {
      setModalImage(null);
      setAnimationState(null);
    }, 350);
  };

  return (
    <section className="w-full bg-[#fbfaf6] py-20">
      <div className="mx-auto flex w-full items-center flex-col">
        <div
          className={`flex flex-col w-full items-center  overflow-hidden transition-[max-height] duration-700 ${mobileExpanded ? "max-h-[2000px]" : "max-h-[60vh] lg:max-h-full"
            }`}
        >
          <div className="columns-3 max-w-5xl px-6 lg:px-0 w-full gap-1.5 lg:gap-3 lg:columns-4">
            {blocks.map((block, index) => (
              <div key={index} className="lg:mb-6 mb-3 break-inside-avoid">
                <div
                  data-modal-img={block.img}
                  className="group relative rounded-lg lg:rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                  onClick={(e) => openModal(block, e)}
                >
                  {/* Main Image */}
                  <img
                    src={block.img}
                    alt={block.alt}
                    className="w-full h-auto object-cover"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#a1461a]/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex flex-col items-center gap-3 scale-95 group-hover:scale-100 transition-transform duration-300">

                      {/* Icon */}
                      <SvgIcon
                        src={block.icon}
                        color="#f87130"
                        className="w-10  h-10 lg:w-12 lg:h-12 object-contain overflow-hidden"
                      />



                      {/* Label */}
                      <span className="text-white text-sm  w-40 text-center flex justify-center items-center  tracking-wide uppercase">
                        {block.alt}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* See More Button - mobile only */}
        {!mobileExpanded && (
          <div className="bg-white/90 lg:hidden -my-10 z-50 mx-6 flex justify-center w-full py-2">
            <button
              className="px-6 py-2 uppercase text-xs tracking-[0.2em] rounded-md lg:hidden"
              onClick={() => setMobileExpanded(true)}
            >
              See More
            </button>
          </div>
        )}
      </div>

      {/* Modal / Lightbox with Google Photos style animation */}
      {modalImage && (
        <div
          className={`fixed inset-0 bg-white/10   backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
            }`}
          style={{ touchAction: 'none' }}
          onClick={closeModal}
        >
          {/* Animated Image Container */}
          <div
            className="fixed overflow-hidden    "
            style={{
              left: `${animationState?.left}px`,
              top: `${animationState?.top}px`,
              width: `${animationState?.width}px`,
              height: `${animationState?.height}px`,
              transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
              borderRadius: isVisible ? '1.5rem' : '0.5rem',
              pointerEvents: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          ><button
            className={`absolute h-full   -z-10 flex w-full  items-center justify-center   transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            onClick={closeModal}
          >
              ×
            </button>
            <img
              src={modalImage.img}
              alt={modalImage.alt}

              className="w-fit h-full rounded-lg   mx-auto object-contain"
              draggable="false"
            />
          </div>

          {/* Close Button */}

        </div>
      )}
    </section>
  );
}



export default function HighlightsSection() {
  return (<>

    <section id="highlights" className="w-full h-auto min-h-[40vh] bg-[#a1461a]
        pt-20 pb-0 lg:pb-0 flex flex-col items-center justify-center">
      <div className="max-w-5xl  px-6 lg:px-0 w-full   flex flex-col items-center justify-between h-full text-center">
        <FloatUpText className="text-orange-200 text-xs tracking-[0.2em] mb-5 ">
          HIGHLIGHTS
        </FloatUpText>
        <FloatUpText className="text-white section-heading   ">
          Project highlights at a glance
        </FloatUpText>
        <div className="w-full h-full flex lg:grid my-10 grid-cols-2 grid-rows-2 gap-10">
          <FloatUpText className="row-span-2 mb-5">
            <RevealImage
              src="/Highlights_image2.webp"
              alt="Highlight 2"
              className="w-full h-auto max-h-[70vh] rounded-lg lg:rounded-none object-cover"
            />
          </FloatUpText>

          <FloatUpText>
            <RevealImage
              src="/Highlights_image1.webp"
              alt="Highlight 1"
              className="w-full hidden lg:flex h-auto object-cover  "
            />
          </FloatUpText>


          <FloatUpText className="w-full h-full lg:text-left text-white">
            <span className="section-heading">
              Immerse yourself in magical club house experience.
            </span>
            <p className="text-lg mt-5 text-orange-200">
              luxurious amenities await you at our clubhouse, designed to elevate your lifestyle. Enjoy a refreshing dip in the
            </p>
          </FloatUpText>
        </div>


      </div>

      <Glance />
    </section>
  </>
  )
}