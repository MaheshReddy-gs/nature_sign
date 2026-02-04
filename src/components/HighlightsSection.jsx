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
    const blocks = [
        { h: "h-[340px]", c: "bg-red-400", t: "Tall Portrait" },
        { h: "h-[180px]", c: "bg-blue-400", t: "Landscape" },
        { h: "h-[260px]", c: "bg-yellow-400", t: "Portrait" },
        { h: "h-[220px]", c: "bg-purple-400", t: "Square" },
        { h: "h-[300px]", c: "bg-pink-400", t: "Portrait" },
        { h: "h-[160px]", c: "bg-indigo-400", t: "Landscape" },
        { h: "h-[280px]", c: "bg-green-400", t: "Portrait" },
        { h: "h-[190px]", c: "bg-orange-400", t: "Landscape" },
        { h: "h-[240px]", c: "bg-teal-400", t: "Square" },
        { h: "h-[360px]", c: "bg-rose-400", t: "Tall Portrait" },
        { h: "h-[210px]", c: "bg-cyan-400", t: "Square" },
        { h: "h-[330px]", c: "bg-lime-400", t: "Portrait" },
        { h: "h-[170px]", c: "bg-amber-400", t: "Landscape" },
        { h: "h-[290px]", c: "bg-emerald-400", t: "Portrait" },
        { h: "h-[200px]", c: "bg-fuchsia-400", t: "Square" },
        { h: "h-[350px]", c: "bg-sky-400", t: "Tall Portrait" },
        { h: "h-[180px]", c: "bg-violet-400", t: "Landscape" },
        { h: "h-[260px]", c: "bg-stone-400", t: "Portrait" },
        { h: "h-[230px]", c: "bg-orange-500", t: "Square" },
        { h: "h-[310px]", c: "bg-green-500", t: "Portrait" },
    ];

    return (
        <section className="w-full h-screen md:h-[90vh] bg-[#fbfaf6]">
            <div className="h-full mx-auto flex w-full py-20 items-center flex-col">
                <div className="flex flex-col w-full items-center overflow-y-auto">
                    <div className="columns-2 max-w-7xl w-full px-6 md:columns-3 lg:columns-4 gap-6">
                        {blocks.map((block, index) => (
                            <div key={index} className="mb-6 break-inside-avoid">
                                <LazyItem>
                                    <div
                                        className={`relative ${block.h} ${block.c} rounded-2xl shadow-lg overflow-hidden`}
                                    >
                                        {/* Card overlay */}
                                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500 text-center p-4 rounded-2xl">
                                            <div className="text-white text-lg font-semibold border-2 border-white rounded-md px-3 py-1 h-full w-full flex items-center justify-center border-dashed">

                                                {block.t}
                                            </div>
                                        </div>

                                        {/* Optional: placeholder content */}
                                        <div className="w-full h-full flex items-center justify-center text-white text-sm font-semibold">
                                            {/* Can leave empty or put a subtle icon */}
                                        </div>
                                    </div>
                                </LazyItem>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}


export default function HighlightsSection() {
    return (<>

        <section id="section2" className="w-full h-auto min-h-[40vh] bg-[#a1461a]
        pt-20 pb-5 md:pb-0 flex flex-col items-center justify-center">
            <div className="max-w-7xl  px-6 w-full   flex flex-col items-center justify-between h-full text-center">
                <FloatUpText className="text-orange-200 text-lg tracking-widest mb-5 ">
                    HIGHLIGHTS
                </FloatUpText>
                <FloatUpText className="text-white section-heading  font-semibold ">
                    Project highlights at a glance
                </FloatUpText>
                <div className="w-full h-full felx lg:grid my-10 grid-cols-2 grid-rows-2 gap-10">
                    <div className="w-full h-full bg-white row-span-2">

                    </div>
                    <div className="w-full h-full bg-white">

                    </div>

                    <FloatUpText className="w-full h-full md:text-left text-white">
                        <span className=" capitalize section-heading ">
                            imeerse yourself in magical club house expernce.
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