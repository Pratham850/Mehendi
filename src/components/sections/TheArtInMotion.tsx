"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteImages } from "@/lib/siteImages";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TheArtInMotion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineSvgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 50%",
          scrub: 1,
        }
      });

      // Cinematic Reveal Sequence: Cone -> Hand -> Design -> Full
      // Using an expanding circular mask starting from the center (where cone is assumed to be)
      tl.fromTo(".motion-img-wrapper", 
        { clipPath: "circle(5% at 50% 50%)" },
        { clipPath: "circle(100% at 50% 50%)", duration: 2, ease: "power2.inOut" }
      );

      // Line originating from the cone and exiting bottom
      if (lineSvgRef.current) {
        const line = lineSvgRef.current.querySelector("path");
        if (line) {
          gsap.set(line, { strokeDasharray: 800, strokeDashoffset: 800 });
          tl.to(line, { strokeDashoffset: 0, duration: 1.5, ease: "none" }, 1);
        }
      }

      // Parallax effect
      gsap.to(".motion-img", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#0D0A08] py-32 px-6 flex flex-col items-center justify-center overflow-hidden">
      
      <div className="absolute top-20 left-6 md:left-12 z-20 font-sans text-xs tracking-widest text-gold/60 uppercase">
        02 — THE ART IN MOTION
      </div>

      <div className="w-full max-w-5xl aspect-video md:aspect-[21/9] relative z-10 group cursor-none" data-cursor="view">
        
        <div className="motion-img-wrapper absolute inset-0 overflow-hidden rounded-sm bg-[#0D0A08]">
          <img 
            src={siteImages.application.main} 
            alt="Applying Mehendi"
            className="motion-img w-[110%] h-[110%] -top-[5%] -left-[5%] absolute object-cover opacity-80"
          />
          <div className="cinematic-image-layer z-10" />
        </div>

        {/* SVG Line emerging from the cone (center) down to the next section */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-visible mix-blend-screen opacity-80">
          <svg ref={lineSvgRef} viewBox="0 0 200 400" className="w-full h-[200%] absolute top-0 left-0" fill="none" stroke="var(--gold)" strokeWidth="0.5">
            <path d="M 100,100 C 120,200 80,300 100,400" />
            <circle cx="100" cy="100" r="2" fill="var(--gold)" />
          </svg>
        </div>
      </div>

    </section>
  );
}
