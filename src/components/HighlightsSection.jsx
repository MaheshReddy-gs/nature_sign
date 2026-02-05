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
  const [mobileExpanded, setMobileExpanded] = useState(false); // new state for mobile

  const blocks = [
    { img: "/location_map.png", alt: "Location Map", height: "540px" },
    { img: "/herobackgorund.webp", alt: "Hero Background", height: "280px" },
    { img: "/contact_bg.png", alt: "Contact Background", height: "260px" },
    { img: "/master_plan_layout.png", alt: "Master Plan", height: "220px" },
    { img: "/location_map.png", alt: "Location Map", height: "300px" },
    { img: "/herobackgorund.webp", alt: "Hero Background", height: "190px" },
    { img: "/contact_bg.png", alt: "Contact Background", height: "160px" },
    { img: "/master_plan_layout.png", alt: "Master Plan", height: "280px" },
    { img: "/location_map.png", alt: "Location Map", height: "240px" },
    { img: "/herobackgorund.webp", alt: "Hero Background", height: "210px" },
    { img: "/contact_bg.png", alt: "Contact Background", height: "360px" },
    { img: "/master_plan_layout.png", alt: "Master Plan", height: "330px" },
    { img: "/location_map.png", alt: "Location Map", height: "170px" },
    { img: "/herobackgorund.webp", alt: "Hero Background", height: "290px" },
    { img: "/contact_bg.png", alt: "Contact Background", height: "200px" },
    { img: "/master_plan_layout.png", alt: "Master Plan", height: "350px" },
    { img: "/location_map.png", alt: "Location Map", height: "180px" },
    { img: "/herobackgorund.webp", alt: "Hero Background", height: "260px" },
    { img: "/contact_bg.png", alt: "Contact Background", height: "230px" },
    { img: "/master_plan_layout.png", alt: "Master Plan", height: "310px" },
  ];

  const openModal = (block) => {
    setModalImage(block);
    setTimeout(() => setIsVisible(true), 10); 
  };

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => setModalImage(null), 300); 
  };

  return (
    <section className="w-full bg-[#fbfaf6]">
      <div className="mx-auto flex w-full pt-5 md:py-20 items-center flex-col">
        <div
          className={`flex flex-col w-full items-center px-6 overflow-hidden transition-[max-height] duration-700 ${
            mobileExpanded ? "max-h-[2000px]" : "max-h-[60vh] md:max-h-full"
          }`}
        >
          <div className="columns-3 max-w-7xl w-full gap-1.5 lg:gap-3 md:columns-3 lg:columns-4">
            {blocks.map((block, index) => (
              <div key={index} className="md:mb-6 mb-3 break-inside-avoid">
                <div
                  className="relative rounded-lg md:rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                  onClick={() => openModal(block)}
                >
                  <img
                    src={block.img}
                    alt={block.alt}
                    className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
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
          <div className=" bg-white/90 -my-10 z-50  mx-6 flex justify-center w-full py-2">
          <button
            className=" px-6 py-2 uppercase text-xs tracking-[0.2em] rounded-md md:hidden"
            onClick={() => setMobileExpanded(true)}
          >
            See More
          </button></div>
        )}
        
      </div>

      {/* Modal / Lightbox */}
      {modalImage && (
        <div
          className={`fixed inset-0 bg-black/30 flex pointer items-center justify-center z-50 p-4 transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeModal}
        >
          <div
            className={`relative max-w-4xl w-fit transition-transform duration-300 ${
              isVisible ? "scale-100" : "scale-70"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={modalImage.img}
              alt={modalImage.alt}
              className="w-auto h-auto max-h-[70vh] rounded-2xl shadow-2xl"
            />
            <button
              className="absolute top-1 right-1 px-4 py-1 rounded-full bg-white shadow-md text-3xl font-bold"
              onClick={closeModal}
            >
              ×
            </button>
          </div>
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