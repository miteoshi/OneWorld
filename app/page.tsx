"use client"
import MultiBackground from "@/components/multi-background"
import InteractiveTitle from "@/components/interactive-title"
import { Marquee } from "@/components/marquee"
import Navbar from "@/components/navbar"
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import LandingNavbar from "@/components/landingNavbar"

// export default function Page() {
  
//   return (
//     <main className="relative min-h-screen text-foreground pb-24">
//       <Navbar />
//       {/* HERO */}
//       <section
//         id="home"
//         className="relative min-h-[92svh] flex items-center justify-center text-center px-6"
//       >
//         <MultiBackground />
//         <div className="relative z-10 max-w-6xl mx-auto">
//           <InteractiveTitle text="SYRCLE" />
//         </div>
//       </section>

//       {/* VISION */}
//       <section id="vision" className="relative py-20 md:py-28 bg-black">
//         <div className="mx-auto max-w-6xl px-6">
//           <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
//             {/* Kicker + Title */}
//             <div className="md:col-span-5">
//               <p
//                 className="text-xs tracking-[0.35em] uppercase opacity-70"
//               >
//                 Our Vision
//               </p>
//               <h2

//                 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-balance"
//               >
//                 One mark. One focus. Work that stands without context.
//               </h2>
//             </div>

//             {/* Copy blocks with vertical rule styling */}
//             <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
//               <Link
//                 href="/design"
//                 className="group block border-l pl-5 hover:opacity-90 transition-colors duration-200 ease-linear"
//               >
//                 <h3 className="text-sm font-semibold uppercase tracking-wide transition-colors duration-200 ease-linear group-hover:text-[#fca86f]">
//                   Merch
//                 </h3>
//                 <p className="mt-2 text-sm md:text-base opacity-80">
//                   A versatile collection built on clarity, comfort, and
//                   identity.
//                 </p>
//               </Link>
//               <Link
//                 href="/music"
//                 className="group block border-l pl-5 hover:opacity-90 transition-colors duration-200 ease-linear"
//               >
//                 <h3 className="text-sm font-semibold uppercase tracking-wide transition-colors duration-200 ease-linear group-hover:text-[#fca86f]">
//                   Music
//                 </h3>
//                 <p className="mt-2 text-sm md:text-base opacity-80">
//                   Rhythm as identity—clean structure cut with raw energy.
//                 </p>
//               </Link>
//               <Link
//                 href="/visuals"
//                 className="group block border-l pl-5 hover:opacity-90 transition-colors duration-200 ease-linear"
//               >
//                 <h3 className="text-sm font-semibold uppercase tracking-wide transition-colors duration-200 ease-linear group-hover:text-[#fca86f]">
//                   Visuals
//                 </h3>
//                 <p className="mt-2 text-sm md:text-base opacity-80">
//                   Framed with intent. Nothing accidental—everything deliberate.
//                 </p>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* INTRODUCTION */}
//       <section id="intro" className="bg-black border-t border-white/10">
//         <div className="mx-auto max-w-6xl px-6 py-14 md:py-20 grid md:grid-cols-2 gap-8 items-center">
//           <div className="aspect-[16/10] w-full overflow-hidden rounded-md border border-white/10">
//             <img
//               src="/images/logos/onewall.png"
//               alt="Introduction — stencil logo on brick wall with editorial panel"
//               className="h-full w-full object-cover"
//             />
//           </div>
//           <div>
//             <p className="text-xs tracking-[0.35em] uppercase opacity-70">
//               Introduction
//             </p>
//             <h2 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight text-balance">
//               We set the coordinates.
//             </h2>
//             <p className="mt-4 leading-relaxed opacity-85">
//               Born from concrete, built with a global view. We see the pavement
//               — we see the planet.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* WHAT WE DO */}
//       <section id="whatwedo" className="bg-black border-t border-white/10">
//         <div className="mx-auto max-w-6xl px-6 py-14 md:py-20 grid md:grid-cols-2 gap-8 items-center">
//           <div className="order-2 md:order-1">
//             <p className="text-xs tracking-[0.35em] uppercase opacity-70">
//               What We Do
//             </p>
//             <h2 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight text-balance">
//               One system. Many outputs.
//             </h2>
//             <ul className="mt-4 space-y-2 opa city-85 list-disc pl-5">
//               <li>Music — sophisticated, future-focused sound.</li>
//               <li>Apparel — high-end minimal streetwear.</li>
//               <li>Visuals — photography and design that demand attention.</li>
//             </ul>
//           </div>
//           <div className="order-1 md:order-2 aspect-[16/10] w-full overflow-hidden rounded-md border border-white/10">
//             <img
//               src="/images/logos/contact.png"
//               alt="What we do — editorial slide with artwork and portrait"
//               className="h-full w-full object-cover"
//             />
//           </div>
//         </div>
//       </section>

//       {/* CONTACT */}
//       <section
//         id="contact"
//         className="relative py-20 md:py-28 bg-black border-t border-white/10"
//       >
//         <div className="mx-auto max-w-6xl px-6">
//           <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
//             <div className="md:col-span-7">
//               <p className="text-xs tracking-[0.35em] uppercase opacity-70">
//                 Contact
//               </p>
//               <h2 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight text-balance">
//                 Collaboration with clarity.
//               </h2>
//               <p className="mt-4 leading-relaxed text-sm md:text-base opacity-85">
//                 For projects across music, apparel, or visuals—reach out
//                 directly. Precision first, noise last.
//               </p>

//               <div className="mt-8 flex flex-col gap-6">
//                 <div className="border border-white/10 rounded-md p-5">
//                   <h3 className="font-semibold tracking-wide uppercase text-xs opacity-90">
//                     Instagram
//                   </h3>
//                   <p className="mt-2 text-sm">@SYRCLE</p>
//                 </div>
//                 <div className="border border-white/10 rounded-md p-5">
//                   <h3 className="font-semibold tracking-wide uppercase text-xs opacity-90">
//                     Email
//                   </h3>
//                   <p className="mt-2 text-sm break-all">
//                     thatoneworld.contactus@gmail.com
//                   </p>
//                 </div>
//                 <div className="border border-white/10 rounded-md p-5">
//                   <h3 className="font-semibold tracking-wide uppercase text-xs opacity-90">
//                     Location
//                   </h3>
//                   <p className="mt-2 text-sm">THE GLOBE.</p>
//                 </div>
//               </div>
//             </div>

//             {/* Graphic panel echoing brand language */}
//             <div className="md:col-span-5">
//               <div className="aspect-video w-full overflow-hidden rounded-md border border-white/10">
//                 <img
//                   src="/images/logos/bwonewall.png"
//                   alt="Helmet silhouette with emblem background"
//                   className="h-full w-full object-cover grayscale-[12%] contrast-110"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Marquee text="SYRCLE — FOCUS — CRAFT — " />

//       <footer className="relative py-10 text-center text-xs opacity-70">
//         © {new Date().getFullYear()} SYRCLE
//       </footer>
//     </main>
//   );
// }


export default function Page(){
const formSectionRef = useRef<HTMLDivElement>(null);
 const [loading, setLoading] = useState(true);

const handlePreOrderClick = () => {
  formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
};

return (
  <main className="min-h-screen bg-black">
    <LandingNavbar />
    {/* Hero Section with GIF Background */}
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url(/images/bgjersey.gif)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="font-unbounded text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-20 md:mb-28 text-balance">
          READY FOR A NEW ERA ?
        </h1>
        <div className="flex justify-center">
          <div
            className="container-button"
            onClick={handlePreOrderClick}
            role="button"
            aria-label="Pre-order jersey"
          >
            <div className="hover bt-1"></div>
            <div className="hover bt-2"></div>
            <div className="hover bt-3"></div>
            <div className="hover bt-4"></div>
            <div className="hover bt-5"></div>
            <div className="hover bt-6"></div>
            <button type="button"></button>
          </div>
        </div>
      </div>
    </section>

    {/* Form Section */}

    <section ref={formSectionRef} className="w-full bg-black py-20">
      <div className="mx-auto max-w px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="font-unbounded text-xs tracking-[0.35em] uppercase opacity-70 mb-4">
            Pre-Order
          </p>
          <h2 className="font-unbounded text-4xl md:text-5xl font-bold text-white text-balance">
            Join the Movement
          </h2>
          <p className="font-unbounded  mt-4 text-base opacity-75 max-w-2xl mx-auto">
            Secure your spot for the new era. Fill out the form below to reserve
            your jersey.
          </p>
        </div>

        {/* Form Container - Seamlessly integrated */}
        <div className="relative bg-gradient-to-b from-white/5 to-white/0 border border-white/10 rounded-xl p-8 md:p-12 backdrop-blur-sm">
          {/* Loader Animation */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-xl z-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
            </div>
          )}

          {/* Google Form */}
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScpISgbja2LLhzCX_a1HhTvd-ofo-Djai0mf5HDqSu02fRRuQ/viewform?embedded=true"
            width="100%"
            height="1200"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            className="w-full rounded-lg"
            style={{ minHeight: "800px" }}
            onLoad={() => setLoading(false)} // ⬅ hides loader
          />
        </div>
      </div>
    </section>
    <section
      id="contact"
      className="relative py-20 md:py-28 bg-black border-t border-white/10"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <p className="text-xs tracking-[0.35em] uppercase opacity-70">
              Support
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight text-balance">
              Facing any problems?
            </h2>
            <p className="mt-4 leading-relaxed text-sm md:text-base opacity-85">
              For any inquiries or support, feel free to reach out. We're here
              to help you with questions, collaborations, or assistance of any
              kind.
            </p>

            <div className="mt-8 flex flex-col gap-6">
              <div className="border border-white/10 rounded-md p-5">
                <h3 className="font-semibold tracking-wide uppercase text-xs opacity-90">
                  Instagram
                </h3>

                <Link
                  href="https://instagram.com/fullsyrcle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-sm hover:opacity-80 no-underline inline-block"
                >
                  @fullsyrcle
                </Link>
              </div>
              <div className="border border-white/10 rounded-md p-5">
                <h3 className="font-semibold tracking-wide uppercase text-xs opacity-90">
                  Email
                </h3>
                <a
                  href="mailto:whosinyoursyrcle@gmail.com"
                  className="mt-2 text-sm break-all hover:opacity-80 transition cursor-pointer"
                >
                  whosinyoursyrcle@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Graphic panel echoing brand language */}
          <div className="md:col-span-5">
            <div className="aspect-video w-full overflow-hidden rounded-md border border-white/10">
              <img
                src="/images/logos/bwonewall.png"
                alt="Helmet silhouette with emblem background"
                className="h-full w-full object-cover grayscale-[12%] contrast-110"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer className="relative py-10 text-center text-xs opacity-70">
      © {new Date().getFullYear()} SYRCLE
    </footer>
  </main>
);
}