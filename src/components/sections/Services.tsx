"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { artistConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const motifs = [
  // 1: Mandala
  <path key="1" d="M50 10 C 70 30, 90 30, 90 50 C 90 70, 70 90, 50 90 C 30 90, 10 70, 10 50 C 10 30, 30 10, 50 10" />,
  // 2: Leaves
  <path key="2" d="M30 20 C 50 10, 70 10, 80 30 C 90 50, 70 80, 50 90 C 30 100, 10 70, 20 40 Z" />,
  // 3: Paisley
  <path key="3" d="M40 20 C 60 10, 80 20, 80 50 C 80 80, 50 90, 20 90 C -10 90, 10 50, 30 60 C 40 65, 40 40, 40 20 Z" />,
  // 4: Lotus
  <path key="4" d="M50 80 C 20 80, 10 50, 30 40 C 40 35, 45 20, 50 10 C 55 20, 60 35, 70 40 C 90 50, 80 80, 50 80 Z" />,
  // 5: Minimal
  <rect key="5" x="30" y="30" width="40" height="40" transform="rotate(45 50 50)" />,
  // 6: Custom abstract
  <path key="6" d="M50 10 Q 90 50, 50 90 Q 10 50, 50 10" />
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".service-row");
      
      sections.forEach((sec, i) => {
        ScrollTrigger.create({
          trigger: sec,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });

        // Parallax and Crop Reveal (Rule 22)
        const imgContainer = sec.querySelector(".service-img-container");
        const img = sec.querySelector(".service-img");
        const overlayMotif = sec.querySelector(".overlay-motif path");

        if (imgContainer && img) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sec,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1,
            },
          });

          // Crop Reveal
          tl.fromTo(imgContainer, 
            { clipPath: "inset(40% 10% 40% 10%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power2.inOut" }
          );

          // Parallax inner image
          tl.to(img, { yPercent: 15, ease: "none", duration: 2 }, 0);

          // Draw Motif over image
          if (overlayMotif) {
            gsap.set(overlayMotif, { strokeDasharray: 500, strokeDashoffset: 500 });
            tl.to(overlayMotif, { strokeDashoffset: 0, duration: 1, ease: "power2.out" }, 0.5);
          }
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={containerRef} className="py-32 px-4 md:px-12 bg-[#0a0807] relative z-10 overflow-hidden">
      
      {/* Sticky Background Motif */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-5">
        <div className="sticky top-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[60vw] md:h-[60vw]">
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="var(--gold)" strokeWidth="0.5">
            {motifs.map((motif, idx) => (
              <g 
                key={idx} 
                className={cn(
                  "transition-all duration-1000 ease-in-out transform origin-center",
                  activeIndex === idx ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 rotate-90"
                )}
              >
                {motif}
              </g>
            ))}
          </svg>
        </div>
      </div>

      <div className="absolute top-20 left-6 md:left-12 z-20 font-sans text-xs tracking-widest text-gold/60 uppercase">
        04 — THE EXPERIENCE
      </div>

      <div className="max-w-7xl mx-auto relative z-10 mt-16">
        <h2 className="text-center text-xs tracking-widest text-gold uppercase mb-24">
          Services
        </h2>

        <div className="flex flex-col gap-32">
          {artistConfig.services.map((service, idx) => (
            <div key={idx} className={`service-row flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-24`}>
              {/* Image with parallax and crop reveal */}
              <div className="w-full md:w-1/2 aspect-[4/5] relative group cursor-none" data-cursor="view">
                <div className="service-img-container w-full h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#2a1b12] z-0" />
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="service-img absolute -top-[10%] left-0 w-full h-[120%] object-cover opacity-0 transition-opacity duration-500 z-10 filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                    onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
                    onLoad={(e) => { (e.target as HTMLImageElement).style.opacity = '1'; }}
                  />
                  <div className="cinematic-image-layer z-10" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700 z-20" />
                  
                  {/* Overlay Motif that draws as we scroll */}
                  <div className="overlay-motif absolute inset-0 z-30 flex items-center justify-center opacity-30 pointer-events-none mix-blend-overlay">
                    <svg viewBox="0 0 100 100" className="w-[80%] h-[80%]" fill="none" stroke="var(--gold)" strokeWidth="0.5">
                       {/* Grab the corresponding motif from the array */}
                       {motifs[idx % motifs.length].props.children || motifs[idx % motifs.length]}
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-4 border border-gold/20 z-20 pointer-events-none group-hover:border-gold/50 transition-colors duration-700" />
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h3 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
                  {service.title}
                </h3>
                <p className="font-sans text-foreground/70 mb-8 leading-relaxed max-w-md">
                  {service.description}
                </p>
                <div className="text-gold tracking-widest uppercase text-xs mb-10">
                  {service.price}
                </div>
                <a href="#book" className="inline-block w-max text-xs tracking-widest uppercase text-foreground border-b border-gold/40 hover:border-gold pb-1 transition-colors" data-cursor="hover">
                  Inquire Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
