export default function GallerySection() {
    return (
        <section
            id="gallery"
            className="w-full min-h-screen bg-white px-6 md:px-16 py-20"
        >
            {/* TITLE */}
            <div className="text-center mb-14">
                <p className="text-[12px] tracking-[0.35em] text-orange-600 font-medium">
                    GALLERY
                </p>
            </div>

            {/* GALLERY GRID */}
            <div
                className="
          grid
          grid-cols-1
          gap-[10px]
          md:grid-cols-[1fr_1.15fr_1.6fr]
        "
            >
                {/* LEFT COLUMN */}
                <div className="flex flex-col gap-[10px]">
                    <img
                        src=""
                        alt=""
                        className="w-full h-[300px] object-cover"
                    />

                    <img
                        src=""
                        alt=""
                        className="w-full h-[300px] object-cover"
                    />
                </div>

                {/* CENTER COLUMN (TALL IMAGE) */}
                <img
                    src=""
                    alt=""
                    className="w-full h-[610px] object-cover"
                />

                {/* RIGHT COLUMN */}
                <div className="flex flex-col gap-[10px]">
                    <img
                        src=""
                        alt=""
                        className="w-full h-[300px] object-cover"
                    />

                    <div className="grid grid-cols-2 gap-[10px]">
                        <img
                            src=""
                            alt=""
                            className="w-full h-[300px] object-cover"
                        />

                        <img
                            src=""
                            alt=""
                            className="w-full h-[300px] object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
