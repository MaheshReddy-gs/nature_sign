export default function BuilderSection() {
    return (
        <section
            id="builder"
            className="w-full bg-white py-20 px-6 md:px-12"
        >
            {/* SECTION TITLE */}
            <div className="text-center mb-10">
                <p className="text-xs tracking-[0.35em] text-orange-600 uppercase">
                    About Builder
                </p>
            </div>

            {/* LOGO + COMPANY INFO */}
            <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-6 mb-12">

                {/* LOGO (IMAGE) */}
                <div className="flex items-center gap-4">
                    <img
                        src="/screenshotlogo.jpeg" // 🔴 add logo image here

                        className="h-12 w-auto object-contain"
                    />


                </div>

                {/* TEXT INFO (NOT IMAGE) */}
                <div className="text-middle">
                    <p className="text-[34px] font-medium text-gray-800">
                        Shreyas Infra Projects Pvt.Ltd.
                    </p>
                    <p className="text-[18px] font-normal text-gray-500">
                        Marathahalli, Bengaluru
                    </p>
                </div>
            </div>

            {/* IMAGE WITH TEXT OVERLAY */}
            <div className="max-w-7xl mx-auto">
                <div className="relative w-full lg:h-[460px] overflow-hidden rounded-xl bg-[#2E869D]"> {/* Teal Background */}

                    {/* Decorative Background Circles */}
                    <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-[-50px] left-[30%] w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

                    {/* IMAGE - Desktop Right Side */}
                    <div className="hidden lg:block absolute top-0 right-0 w-[45%] h-full">
                        <img
                            src="/gallery_interiors.png" // Placeholder
                            alt="Builder Interiors"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* CONTENT - Left Side (Full width on mobile) */}
                    <div className="relative z-10 h-full w-full lg:w-[55%] p-8 lg:p-14 flex flex-col justify-center text-white">

                        <div>
                            <h3 className="text-xl lg:text-3xl font-normal mb-6 leading-snug">
                                Crafting meaningful experiences where every detail is carefully envisioned.
                            </h3>

                            <p className="text-sm lg:text-base leading-relaxed mb-6 opacity-90 font-light">
                                At Shreyas Infra, we know that true quality emerges from attention
                                to detail and the finesse of skilled craftsmanship. Guided by a
                                pursuit of perfection, we create more than living spaces, we
                                curate experiences where every feature holds purpose and intention.
                            </p>

                            <p className="text-sm lg:text-base leading-relaxed opacity-90 font-light">
                                For us at Shreyas Infra, excellence lives in the subtle details and
                                the artistry of creating with care. Rooted in our promise of
                                perfection, we design not just structures but thoughtfully crafted
                                environments that elevate everyday living.
                            </p>
                        </div>

                        <button className="mt-10 w-fit border border-white px-8 py-3 text-xs tracking-[0.2em] font-medium uppercase hover:bg-white hover:text-[#2E869D] transition-colors duration-300 rounded-sm">
                            Visit Shreyas Infra
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
