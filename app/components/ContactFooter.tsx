 import Image from "next/image";
 import insta from "../../public/icons8-instagram-48.png";
 import twitter from "../../public/icons8-twitter-48.png";
 import github from "../../public/icons8-github-50.png";
import linkden from "../../public/icons8-linkedin-circled-48.png";
 import bg from "../../public/hands.png";

export function ContactFooter() {
  return (
//     <div className="mt-44 bg-slate-500 grid grid-cols-1 lg:grid-cols-12 min-h-60 rounded-2xl">
      
//       {/* Centering h1 tag for small devices */}
//       <h1 className="px-10 mt-10 text-center lg:text-left col-span-1 lg:col-span-4 text-[35px] lg:text-[100px] font-extrabold text-white">
//         LET'S GET IN TOUCH
//       </h1>

//       {/* Social media icons container */}
//       <div className="flex flex-col lg:flex-col col-span-1 lg:col-span-4 items-center lg:items-start mt-5 lg:mt-0">
//         <div className="flex space-x-4 lg:flex-col lg:space-x-0 items-center lg:items-start">
//           <a href="">
//             <Image
//               src={insta}
//               alt="instagram"
//               className="w-12 h-12 lg:w-16 lg:h-16 transition-transform duration-300 hover:scale-125 hover:shadow-xl hover:opacity-90"
//             />
//           </a>
//           <a href="">
//             <Image
//               src={twitter}
//               alt="twitter"
//               className="w-12 h-12 lg:w-16 lg:h-16 transition-transform duration-300 hover:scale-125 hover:shadow-xl hover:opacity-90"
//             />
//           </a>
//           <a href="">
//             <Image
//               src={github}
//               alt="github"
//               className="w-12 h-12 lg:w-16 lg:h-16 transition-transform duration-300 hover:scale-125 hover:shadow-xl hover:opacity-90"
//             />
//           </a>
//           <a href="">
//             <Image
//               src={linkden}
//               alt="linkedin"
//               className="w-12 h-12 lg:w-16 lg:h-16 transition-transform duration-300 hover:scale-125 hover:shadow-xl hover:opacity-90"
//             />
//           </a>
//         </div>
//       </div>

//       {/* Background image */}
//       <div className="flex items-start justify-center lg:justify-end col-span-1 lg:col-span-4 mt-10 lg:mt-24 rotate-90">
//         <Image
//           src={bg}
//           alt=""
//           className="w-40 h-40 lg:w-60 lg:h-60 transition-transform duration-300 hover:scale-125 hover:shadow-xl hover:opacity-90 rounded-full"
//         />
//       </div>
//     </div>


<div className="bg-slate-500 rounded-lg shadow-lg p-5 text-center mt-44 mb-2">
  <div className="py-5 mr-5 ml-5">
    <p className="text-white text-3xl font-bold   ">
     <span className="transition-transform duration-300 hover:scale-125 hover:shadow-xl hover:opacity-90 p-4 rounded-2xl">Crafting Code and Creativity</span> 
    </p>
  </div>



  <div className="inline-flex justify-center my-5 space-x-4">
    {/* Social Media Icon 1 */}
    <div className="w-8 h-8 bg-none rounded-full">
      <Image
        src={insta}
        alt="Instagram"
        className="w-full h-full rounded-full transition-transform duration-300 hover:scale-125 hover:shadow-xl hover:opacity-90"
      />
    </div>

    {/* Social Media Icon 2 */}
    <div className="w-8 h-8 bg-none rounded-full">
      <Image
        src={twitter}
        alt="Twitter"
        className="w-full h-full rounded-full transition-transform duration-300 hover:scale-125 hover:shadow-xl hover:opacity-90"
      />
    </div>

    {/* Social Media Icon 3 */}
    <div className="w-8 h-8 bg-none rounded-full">
      <Image
        src={linkden}
        alt="Linkedin"
        className="w-full h-full rounded-full transition-transform duration-300 hover:scale-125 hover:shadow-xl hover:opacity-90"
      />
    </div>
    <div className="w-8 h-8 bg-none rounded-full">
      <Image
        src={github}
        alt="Github"
        className="w-full h-full rounded-full transition-transform duration-300 hover:scale-125 hover:shadow-xl hover:opacity-90"
      />
    </div>
  </div>

  <div className="my-5">
    <p className="text-white text-sm">
      Ayush Meshram
    </p>
  </div>
</div>

  );

 }



