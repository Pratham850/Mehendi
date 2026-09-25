"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteImages } from "@/lib/siteImages";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TheDetails() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic slow pan
      gsap.fromTo(".details-img", 
        { scale: 1.1, yPercent: -10 },
        {
          scale: 1.3,
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[150vh] bg-[#0D0A08] flex items-center justify-center overflow-hidden border-t border-gold/10">
      
      <div className="absolute top-20 left-6 md:left-12 z-20 font-sans text-xs tracking-widest text-gold/60 uppercase">
        06 — THE DETAILS
      </div>

      <div className="absolute inset-0 z-0">
        <img 
          src={siteImages.details.main} 
          alt="Macro Mehendi Details"
          className="details-img w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0A08] via-transparent to-[#0D0A08]" />
      </div>

      <div className="relative z-10 text-center pointer-events-none mix-blend-overlay">
        <h2 className="font-serif italic text-6xl md:text-8xl lg:text-[10rem] text-gold opacity-30">
          Craftsmanship
        </h2>
      </div>

    </section>
  );
}
