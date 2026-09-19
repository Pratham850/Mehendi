"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TheArt() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgSvgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const ctx = gsap.context(() => {
      const phrases = gsap.utils.toArray<HTMLElement>(".art-phrase");
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        },
      });

      // Background growth
      if (!prefersReducedMotion && bgSvgRef.current) {
        const bgPaths = bgSvgRef.current.querySelectorAll("path");
        gsap.set(bgPaths, { strokeDasharray: 500, strokeDashoffset: 500 });
        tl.to(bgPaths, {
          strokeDashoffset: 0,
          duration: phrases.length,
          ease: "none",
        }, 0);
      }

      phrases.forEach((phrase, i) => {
        // Fade in luxuriously
        tl.fromTo(phrase, 
          { opacity: 0, y: 30, filter: "blur(10px)" }, 
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5, ease: "power3.out" },
          i === 0 ? undefined : "-=0.5"
        );
        
        // Hold for reading
        tl.to(phrase, { opacity: 1, duration: 1 });
        
        // Fade out gracefully (except last)
        if (i < phrases.length - 1) {
          tl.to(phrase, { opacity: 0, y: -30, filter: "blur(10px)", duration: 1.5, ease: "power3.in" });
        }
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#0a0807] flex items-center justify-center overflow-hidden">
      
      {/* Background SVG Pattern */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <svg ref={bgSvgRef} viewBox="0 0 100 100" className="w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw]" fill="none" stroke="var(--gold)" strokeWidth="0.2">
          {Array.from({ length: 8 }).map((_, i) => (
            <path 
              key={i} 
              d="M50 50 C40 20, 20 40, 50 10 C80 40, 60 20, 50 50" 
              transform={`rotate(${i * 45} 50 50)`} 
            />
          ))}
          <circle cx="50" cy="50" r="30" strokeDasharray="2 4" />
        </svg>
      </div>

      {/* Phrases */}
      <div className="relative z-10 w-full max-w-4xl px-4 text-center">
        <h2 className="art-phrase absolute left-0 right-0 top-1/2 -translate-y-1/2 font-serif text-4xl md:text-7xl lg:text-8xl text-foreground opacity-0">
          EVERY LINE
        </h2>
        <h2 className="art-phrase absolute left-0 right-0 top-1/2 -translate-y-1/2 font-serif text-4xl md:text-7xl lg:text-8xl text-foreground opacity-0">
          HAS A STORY.
        </h2>
        <h2 className="art-phrase absolute left-0 right-0 top-1/2 -translate-y-1/2 font-serif text-4xl md:text-7xl lg:text-8xl text-foreground opacity-0">
          EVERY DETAIL
        </h2>
        <h2 className="art-phrase absolute left-0 right-0 top-1/2 -translate-y-1/2 font-serif text-4xl md:text-7xl lg:text-8xl text-gold opacity-0">
          IS DRAWN BY HAND.
        </h2>
      </div>
    </section>
  );
}
