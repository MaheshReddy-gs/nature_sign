import AnimatedHeading from './Animations/animatedHeading.jsx'
import FloatUpText from './Animations/floatUpText.jsx'
import { useModal } from '../context/ModalContext'

export default function Section1() {
  const { openModal } = useModal();
  return (
    <section
      id="hero"
      className="relative w-full h-[70vh] lg:h-screen flex items-center justify-center overflow-hidden pt-20 pb-5 md:pb-0"
      style={{
        backgroundImage: `url('/hero_background.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Vignette Overlay - Radial gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/30"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center lg:text-left">
        {/* Badges/Icons */}
        {/* <div className="flex justify-center  lg:justify-start gap-6 mb-12">
          <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-white text-xs font-bold text-center">RERA<br/>Approved</span>
          </div>
          <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-white text-xs font-bold text-center">ECO<br/>Friendly</span>
          </div>
        </div> */}
        <img
          src="/hero_tags.webp"
          alt="Badges"
          className=" -translate-x-5 mb-5 h-20 object-contain"
        />

        {/* Main Heading */}
        <AnimatedHeading className="md:text-4xl  text-3xl lg:text-6xl font-bold text-white mb-8 leading-tight">
          Nature's canvas,{'\n'}crafted with finesse.
        </AnimatedHeading>
        {/* Subheading */}
        <FloatUpText>
          <p className="text-lg text-white mb-10 max-w-2xl mx-auto font-light">
            Premium Plotted Development in
            <br />
            Devanahalli, Bengaluru.

          </p>
          {/* CTA Button */}
          <div className="flex justify-center lg:justify-start">
            <button
              onClick={() => openModal({ initialValues: { message: "Enquiry" } })}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-10 rounded transition-colors uppercase text-sm tracking-widest"
            >
              Enquire Now
            </button>
          </div>
        </FloatUpText>

        {/* Scroll Indicator */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2  animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
