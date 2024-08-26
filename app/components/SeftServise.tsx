
 import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import you from "../../public/profff.jpeg";
import code from "../../public/code.png"

export function SelfServise() {
  return (
    <div className="  grid grid-cols-1 lg:grid-cols-3 mt-44 gap-4 bg-slate-500 rounded-2xl px-10  ">
      <div className=" col-span-1 lg:col-span-2">
        <h1 className="font-bold text-start h-full min-h-[500px] text-3xl lg:text-6xl mt-10 text-white ">
          <span className=" hover:underline ">What</span> I {""}
          <span className="text-[#FFBB00] font-bold">do.</span>
          <span className="text-[25px] mt-5 font-light rounded-sm text-slate-300 grid grid-cols-1 lg:grid-cols-2 gap-2 ">
          A full stack developer with a passion for creative problem-solving.
            Whether it's building robust web applications or designing visually
            compelling graphics, I bring a creative approach to tackling
            real-world challenges. My work blends technical expertise with a
            keen eye for design, ensuring solutions that are both functional and
            aesthetically pleasing.
          </span>
          
          <Image src={code} alt=""  className="size-40"/>
          
        </h1>
      </div>
      <div className=" flex flex-col justify-center mr-auto lg:mr-24  relative mb-3 ">
        <Carousel className=" grid grid-cols-1 col-span-1 lg:col-span-2 drop-shadow-2xl">
          <CarouselContent>
            <CarouselItem >
              {" "}
              <Image src={you} alt="" />
            </CarouselItem >
            <CarouselItem ></CarouselItem>
            <CarouselItem></CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
