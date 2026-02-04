import { motion } from 'framer-motion';
const leftWave = '/Shreyasinfra_bannersAsset 732-100.svg';
const rightWave = '/Shreyasinfra_bannersAsset 832-100.svg';
const natureSignImage = '/nature-sign_website_03.png';

const OverviewDetailsSection = () => {
    return (
        <section className="relative overflow-hidden min-h-screen flex flex-col justify-center bg-[#F7F2EA]">
            {/* Left Animated Wave */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                {/* Left Wave */}
                <motion.img
                    src={leftWave}
                    alt=""
                    initial={{ rotate: 90, x: 0 }}
                    animate={{ x: [ 0, -15, 0 ] }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -left-90 top-0 h-[110vh] w-[600px] lg:w-[800px] opacity-90 pointer-events-none"
                />

                {/* Right Wave */}
                <motion.img
                    src={rightWave}
                    alt=""
                    initial={{ rotate: 270, x: 0 }}
                    animate={{ x: [ 0, 15, 0 ] }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -right-90 top-0 h-[110vh] w-[600px] lg:w-[800px] object-fill opacity-90 pointer-events-none"
                />
            </div>

            <div className="relative w-full max-w-[1400px] mx-auto px-2 lg:px-16 py-10 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
                    <div className="lg:w-[240px] flex-shrink-0">
                        <motion.img
                            src={natureSignImage}
                            alt="Decorative leaves"
                            animate={{ y: [ 0, -50, 0 ] }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="w-[175px] lg:w-[220px] h-auto -mt-65"
                        />
                    </div>

                    <div className="flex-1 mt-20">
                        {/* Eyebrow */}
                        <p className="text-xs tracking-[0.35em] uppercase mb-8 font-['DIN_Alternate'] text-orange-800 font-medium">
                            OVERVIEW
                        </p>

                        {/* Section Heading */}
                        <h2 className="font-['Inter_Tight'] text-2xl md:text-3xl leading-snug font-semibold mb-4 max-w-[900px] text-[#2C2C2C]">
                            At Nature's Sign, luxury takes on a deeper meaning                             Thoughtfully designed gardens, peaceful walkways, and a serene ambiance come together to create a life that feels indulgent, effortless, and beautifully enriching.

                        </h2>

                        {/* Sub Heading */}


                        {/* Body */}
                        <div className="space-y-5 max-w-[800px]">
                            <p className="font-['Inter_Tight'] text-base leading-[1.85] text-[#5A514C]">
                                Welcome to Nature's Sign, a thoughtfully planned plotted development in Bengaluru. A feature-rich residential community designed for those who value space, flexibility, and a superior lifestyle. Every plot is seamlessly integrated with modern infrastructure and essential amenities, creating a harmonious and well-balanced living environment.
                            </p>

                            <p className="font-['Inter_Tight'] text-base leading-[1.85] text-[#5A514C]">
                                Strategically located, Nature's Sign places you close to everything a global citizen needs--yet remains peacefully secluded from the city's noise and chaos. With excellent connectivity, lush open spaces, and a vibrant neighborhood, it offers the perfect canvas to build your dream home in a truly thriving community.
                            </p>
                        </div>
                    </div>

                </div>

                <div className="mt-2 pt-4">
                    {/* Stats grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-10 text-center mx-auto max-w-5xl">
                        {/* Item */}
                        <div className="md:border-r md:border-[#E6DDD0] md:pr-6">
                            <p className="text-xs tracking-[0.1em] uppercase mb-2 font-['DIN_Alternate'] font-medium text-orange-800">
                                LOCATION
                            </p>
                            <p className="font-['Inter_Tight'] text-base font-medium text-[#2C2C2C]">
                                Devanahalli, Bengaluru
                            </p>
                        </div>

                        <div className="md:border-r md:border-[#E6DDD0] md:px-6">
                            <p className="text-xs tracking-[0.1em] uppercase mb-2 font-['DIN_Alternate'] font-medium text-orange-800">
                                BUILDER
                            </p>
                            <p className="font-['Inter_Tight'] text-base font-medium text-[#2C2C2C]">
                                Shreyas Infra
                            </p>
                        </div>

                        <div className="md:border-r md:border-[#E6DDD0] md:px-6">
                            <p className="text-xs tracking-[0.1em] uppercase mb-2 font-['DIN_Alternate'] font-medium text-orange-800">
                                TOTAL LAND AREA
                            </p>
                            <p className="font-['Inter_Tight'] text-base font-medium text-[#2C2C2C]">
                                30 Acres
                            </p>
                        </div>

                        <div className="md:pl-6">
                            <p className="text-xs tracking-[0.1em] uppercase mb-2 font-['DIN_Alternate'] font-medium text-orange-800">
                                TOTAL UNITS
                            </p>
                            <p className="font-['Inter_Tight'] text-base font-medium text-[#2C2C2C]">
                                250 Units
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="flex justify-center mt-12">
                        <a
                            href="#contact"
                            className="inline-block bg-[#ff5e13] text-white py-3.5 px-8 rounded uppercase text-xs font-['DIN_Alternate'] font-semibold tracking-[0.3em] shadow-[0_4px_18px_rgba(255,94,19,0.28)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,94,19,0.38)] transition-all duration-300"
                        >
                            ASK PRICE
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default OverviewDetailsSection;
