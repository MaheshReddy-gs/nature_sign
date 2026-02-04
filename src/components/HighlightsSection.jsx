import AnimatedHeading from "./Animations/animatedHeading";
import FloatUpText from "./Animations/floatUpText";

export default function  HighlightsSection() {
  return (
    <section id="section2" className="w-full h-auto min-h-[40vh] bg-[#a1461a]
     lg:h-screen  flex items-center justify-center pt-20 pb-5 md:pb-0">
      <div className="max-w-6xl px-6 w-full   flex flex-col items-center justify-between h-full text-center">
        <FloatUpText className="text-orange-200 text-lg tracking-widest ">
          HIGHLIGHTS
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
    </section>
  )
}
