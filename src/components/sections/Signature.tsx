"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteImages } from "@/lib/siteImages";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Signature() {
  const containerRef = useRef<HTMLDivElement>(null);
  const flowerRef = useRef<SVGPathElement>(null);
  const leavesRef = useRef<SVGPathElement>(null);
  const paisleyRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: isMobile ? "+=150%" : "+=200%",
          scrub: 1,
          pin: true,
        },
      });

      // We animate the strokeDashoffset of the mask parts sequentially
      const parts = [flowerRef.current, leavesRef.current, paisleyRef.current];
      
      parts.forEach((part, i) => {
        if (part) {
          const length = part.getTotalLength();
          gsap.set(part, { strokeDasharray: length, strokeDashoffset: length });
          
          // Draw the outline slowly
          tl.to(part, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" }, i * 0.8);
          // Expand stroke width massively to reveal image through the mask
          tl.to(part, { strokeWidth: 1500, duration: 1.5, ease: "power3.in" }, (i * 0.8) + 1);
        }
      });

      // Annotations reveal
      const annotations = gsap.utils.toArray<HTMLElement>(".annotation");
      annotations.forEach((el, index) => {
        const line = el.querySelector('.annotation-line');
        const text = el.querySelector('.annotation-text');
        
        tl.to(line, { scaleX: 1, duration: 0.2, ease: "power3.out" }, 1.2 + index * 0.1);
        tl.to(text, { opacity: 1, duration: 0.2, ease: "power2.out" }, "<0.1");
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 bg-[#0f0d0b] relative z-10 overflow-hidden flex flex-col items-center justify-center min-h-screen border-y border-gold/10">
      <div className="absolute top-20 left-6 md:left-12 z-20 font-sans text-xs tracking-widest text-gold/60 uppercase">
        02 — THE SIGNATURE
      </div>
      <div className="absolute top-16 md:top-24 text-center z-20">
        <h3 className="font-serif text-4xl md:text-6xl text-foreground">The Signature</h3>
      </div>

      {/* The large image wrapper with SVG Mask */}
      <div className="relative w-full max-w-[90vw] md:max-w-4xl h-[60vh] md:h-[70vh] lg:h-[80vh] mt-24 flex items-center justify-center">
        
        <svg className="absolute inset-0 w-0 h-0">
          <defs>
            <mask id="drawingMask" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000">
              <rect width="100%" height="100%" fill="black" />
              {/* Sequential mask paths (flower, leaves, paisley) */}
              <g fill="none" stroke="white" strokeWidth="30" strokeLinecap="round" strokeLinejoin="round">
                <path ref={flowerRef} d="M 500,500 C 450,450 450,550 500,500 C 550,450 550,550 500,500" />
                <path ref={leavesRef} d="M 500,500 C 400,400 300,500 500,500 C 600,600 700,500 500,500" />
                <path ref={paisleyRef} d="M 500,500 C 400,200 600,200 600,400 C 600,500 500,500 500,500" />
              </g>
            </mask>
          </defs>
        </svg>

        {/* The actual image, masked */}
        <div 
          className="w-full h-full relative"
          style={{ WebkitMaskImage: "url(#drawingMask)", maskImage: "url(#drawingMask)" }}
        >
          <img 
            src={siteImages.details.main} 
            alt="Signature Mehendi"
            className="w-full h-full object-cover object-center rounded-sm opacity-80"
          />
          <div className="cinematic-image-layer z-10" />
        </div>

        {/* Annotations */}
        <div className="annotation hidden md:flex absolute top-[20%] -left-12 lg:-left-32 items-center gap-4 z-20">
          <div className="annotation-text text-right opacity-0">
            <div className="text-[10px] md:text-xs text-gold uppercase tracking-widest">Floral Detail</div>
            <div className="font-serif italic text-foreground/70 text-xs md:text-sm">Lotus motifs</div>
          </div>
          <div className="annotation-line w-12 lg:w-24 h-[1px] bg-gold/50 origin-right scale-x-0" />
        </div>

        <div className="annotation annotation-right hidden md:flex absolute top-[40%] -right-12 lg:-right-32 items-center gap-4 flex-row-reverse z-20">
          <div className="annotation-text text-left opacity-0">
            <div className="text-[10px] md:text-xs text-gold uppercase tracking-widest">Mandala</div>
            <div className="font-serif italic text-foreground/70 text-xs md:text-sm">Geometric core</div>
          </div>
          <div className="annotation-line w-12 lg:w-24 h-[1px] bg-gold/50 origin-left scale-x-0" />
        </div>

        <div className="annotation hidden md:flex absolute bottom-[30%] -left-12 lg:-left-32 items-center gap-4 z-20">
          <div className="annotation-text text-right opacity-0">
            <div className="text-[10px] md:text-xs text-gold uppercase tracking-widest">Fine Line Work</div>
            <div className="font-serif italic text-foreground/70 text-xs md:text-sm">Precision details</div>
          </div>
          <div className="annotation-line w-12 lg:w-24 h-[1px] bg-gold/50 origin-right scale-x-0" />
        </div>
      </div>
    </section>
  );
}
