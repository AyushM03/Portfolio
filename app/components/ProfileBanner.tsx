import Image from "next/image";
import me from "../../public/ayush.jpeg";

export function ProfileBanner() {
  return (
    <div
      className="mr-10 mt-40 grid grid-cols-1 lg:grid-cols-3 gap-4 drop-shadow 
    hover:shadow-input-grow border-primary-700 active:shadow-input-shrink    transition-all duration-150 
    ease-in-out will-change-transform hover:-translate-y-0.5
     active:translate-y-0.5 active:duration-100  "
     >
      <div className="col-span-1 lg:col-span-2 h-full bg-gradient-to-r from-[#FFBB00] to-[#e09200] min-h-[500px] lg:min-h-[300px] rounded-2xl p-8">
        <h1 className="text-4xl lg:text-6xl font-bold text-white">
          Hi, Im Ayush Meshram
          <br />
          <span className=" mt-4 drop-shadow-2xl text-muted-foreground hover:text-[#ffffff]  min-h-[500px] lg:min-h-[300px] text-border-black text-shadow-black ">
            A passionate full stack WEB developer
          </span>
        </h1>
        <h5 className=" mt-4  text-muted-foreground  text-xl ">
          I enjoy crafting efficient and scalable solutions, from designing
          intuitive front-end interfaces to building robust back-end systems.
          Whether it's a complex web application or a simple script. <br />I
          thrive on the challenge of turning ideas into reality through code.
        </h5>
        <h6>
          <a
            href="mailto:aayushmeshram9168@mail.com"
            className="relative  items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group"
          >
            <span className="  w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
            <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
              Get in touch
            </span>
            <span className="absolute inset-0 border-2 border-white rounded-full"></span>
          </a>
        </h6>
      </div>
      <Image
        src={me}
        alt="Ayush Meshram"
        className="col-span-1 h-[500px] object-cover rounded-e-full ml-14 bg-gray-100 border-10 shadow-lg "
        priority
      />
    </div>
  );
}
