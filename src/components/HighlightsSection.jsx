import FloatUpText from "./Animations/floatUpText";
import { useEffect, useRef, useState } from "react"

function LazyItem({ children }) {
    const ref = useRef(null)
    const [ visible, setVisible ] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([ entry ]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    observer.disconnect()
                }
            },
            {
                threshold: 0.2,
            }
        )

        if (ref.current) observer.observe(ref.current)

        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={ref}
            className={`
        transition-all duration-700 ease-out
        ${visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"}
      `}
        >
            {children}
        </div>
    )
}


function Glance() {  
  const [modalImage, setModalImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false); 
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [animationState, setAnimationState] = useState(null);
const blocks = Array.from({ length: 20 }, (_, i) => {
  const width = 400;
  const height = 200 + Math.floor(Math.random() * 300); // 200–400px

  return {
    img: `https://picsum.photos/seed/block-${i}/${width}/${height}`,
    alt: `Placeholder Image ${i + 1}`,
  };
});

  // const blocks = [
  //   { img: "/location_map.png", alt: "Location Map", height: "540px" },
  //   { img: "/herobackgorund.webp", alt: "Hero Background", height: "280px" },
  //   { img: "/contact_bg.png", alt: "Contact Background", height: "260px" },
  //   { img: "/master_plan_layout.png", alt: "Master Plan", height: "220px" },
  //   { img: "/location_map.png", alt: "Location Map", height: "300px" },
  //   { img: "/herobackgorund.webp", alt: "Hero Background", height: "190px" },
  //   { img: "/contact_bg.png", alt: "Contact Background", height: "160px" },
  //   { img: "/master_plan_layout.png", alt: "Master Plan", height: "280px" },
  //   { img: "/location_map.png", alt: "Location Map", height: "240px" },
  //   { img: "/herobackgorund.webp", alt: "Hero Background", height: "210px" },
  //   { img: "/contact_bg.png", alt: "Contact Background", height: "360px" },
  //   { img: "/master_plan_layout.png", alt: "Master Plan", height: "330px" },
  //   { img: "/location_map.png", alt: "Location Map", height: "170px" },
  //   { img: "/herobackgorund.webp", alt: "Hero Background", height: "290px" },
  //   { img: "/contact_bg.png", alt: "Contact Background", height: "200px" },
  //   { img: "/master_plan_layout.png", alt: "Master Plan", height: "350px" },
  //   { img: "/location_map.png", alt: "Location Map", height: "180px" },
  //   { img: "/herobackgorund.webp", alt: "Hero Background", height: "260px" },
  //   { img: "/contact_bg.png", alt: "Contact Background", height: "230px" },
  //   { img: "/master_plan_layout.png", alt: "Master Plan", height: "310px" },
  // ];

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
  }, [modalImage]);

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
      const clickedElement = event.currentTarget;
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
          className={`flex flex-col w-full items-center  overflow-hidden transition-[max-height] duration-700 ${
            mobileExpanded ? "max-h-[2000px]" : "max-h-[60vh] md:max-h-full"
          }`}
        >
          <div className="columns-3 max-w-7xl px-6 w-full gap-1.5 lg:gap-3 md:columns-3 lg:columns-4">
            {blocks.map((block, index) => (
              <div key={index} className="md:mb-6 mb-3 break-inside-avoid">
                <div
                  data-modal-img={block.img}
                  className="relative rounded-lg md:rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                  onClick={(e) => openModal(block, e)}
                >
                  <img
                    src={block.img}
                    alt={block.alt}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500 text-center p-4 rounded-2xl">
                    <div className="text-white text-lg font-semibold border-2 border-white rounded-md px-3 py-1 h-full w-full flex items-center justify-center border-dashed">
                      {block.alt}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* See More Button - mobile only */}
        {!mobileExpanded && (
          <div className="bg-white/90 md:hidden -my-10 z-50 mx-6 flex justify-center w-full py-2">
            <button
              className="px-6 py-2 uppercase text-xs tracking-[0.2em] rounded-md md:hidden"
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
          className={`fixed inset-0 bg-white/10   backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
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
            className={`absolute h-full   -z-10 flex w-full  items-center justify-center   transition-all duration-300 ${
              isVisible ? 'opacity-100' : 'opacity-0'
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

      <section id="section2" className="w-full h-auto min-h-[40vh] bg-[#a1461a]
        pt-20 pb-0 md:pb-0 flex flex-col items-center justify-center">
            <div className="max-w-7xl  px-6 w-full   flex flex-col items-center justify-between h-full text-center">
                <FloatUpText className="text-orange-200 text-xs tracking-[0.2em] mb-5 ">
                    HIGHLIGHTS
                </FloatUpText>
                <FloatUpText className="text-white section-heading   ">
                    Project highlights at a glance
                </FloatUpText>
                <div className="w-full h-full felx lg:grid my-10 grid-cols-2 grid-rows-2 gap-10">
                    <div className="w-full h-full bg-white row-span-2">

                    </div>
                    <div className="w-full h-full bg-white">

                    </div>

                    <FloatUpText className="w-full h-full md:text-left text-white">
                        <span className="  section-heading ">
                            Immerse yourself in magical club house expernce.
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