import { motion } from 'framer-motion';

const GALLERY_IMAGES = [
    { id: 1, src: "/gallery_garden.png", alt: "Landscaped Garden" },
    { id: 2, src: "/gallery_clubhouse.png", alt: "Clubhouse with Pool" },
    { id: 3, src: "/gallery_interiors.png", alt: "Luxury Interiors" },
    { id: 4, src: "/gallery_aerial.png", alt: "Aerial Community View" },
    { id: 5, src: "/spec_entrance_gate.png", alt: "Grand Entrance" },
    { id: 6, src: "/spec_roads_pathway.png", alt: "Paved Pathways" },
];

const FADE_UP = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const GallerySection = () => {
    return (
        <section className="bg-white py-20 px-6 font-['Montserrat']">
            {/* Heading */}
            <motion.div
                className="text-center mb-12 lg:mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.6 }}
                variants={FADE_UP}
            >
                <p className="text-[#B96A42] font-bold tracking-[0.2em] text-xs uppercase">
                    GALLERY
                </p>
            </motion.div>

            {/* Gallery Grid */}
            <div className="max-w-7xl mx-auto h-[1200px] lg:h-[800px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-6 md:grid-rows-4 lg:grid-rows-2 gap-4">

                {/* 1. Top Left - Square */}
                <motion.div
                    className="relative overflow-hidden group lg:col-span-1 lg:row-span-1"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                >
                    <img
                        src={GALLERY_IMAGES[ 0 ].src}
                        alt={GALLERY_IMAGES[ 0 ].alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </motion.div>

                {/* 2. Middle - Tall Vertical */}
                <motion.div
                    className="relative overflow-hidden group lg:col-span-1 lg:row-span-2"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <img
                        src={GALLERY_IMAGES[ 1 ].src}
                        alt={GALLERY_IMAGES[ 1 ].alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </motion.div>

                {/* 3. Top Right - Wide */}
                <motion.div
                    className="relative overflow-hidden group lg:col-span-2 lg:row-span-1"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <img
                        src={GALLERY_IMAGES[ 2 ].src}
                        alt={GALLERY_IMAGES[ 2 ].alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </motion.div>

                {/* 4. Bottom Left - Square (Pink in ref) */}
                <motion.div
                    className="relative overflow-hidden group lg:col-span-1 lg:row-span-1"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <img
                        src={GALLERY_IMAGES[ 3 ].src}
                        alt={GALLERY_IMAGES[ 3 ].alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </motion.div>

                {/* 5. Bottom Right 1 - Square (Yellow in ref) */}
                <motion.div
                    className="relative overflow-hidden group lg:col-span-1 lg:row-span-1"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <img
                        src={GALLERY_IMAGES[ 4 ].src}
                        alt={GALLERY_IMAGES[ 4 ].alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </motion.div>

                {/* 6. Bottom Right 2 - Square (Grey in ref) */}
                <motion.div
                    className="relative overflow-hidden group lg:col-span-1 lg:row-span-1"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <img
                        src={GALLERY_IMAGES[ 5 ].src}
                        alt={GALLERY_IMAGES[ 5 ].alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </motion.div>

            </div>
        </section>
    );
};

export default GallerySection;
