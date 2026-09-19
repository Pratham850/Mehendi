"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { artistConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export default function CinematicLoader() {
  const [isAnimating, setIsAnimating] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user has visited before in this session
    const hasVisited = sessionStorage.getItem("hasVisited");
    const isReturning = hasVisited === "true";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("hasVisited", "true");
          setIsAnimating(false);
          // Dispatch event so other components know loading finished
          window.dispatchEvent(new Event("loaderComplete"));
        },
      });

      if (isReturning) {
        // Fast animation for returning users
        tl.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.inOut",
        });
      } else {
        // Full cinematic animation

        // 1. Dot appears (The seed of the Mehendi)
        tl.fromTo(
          dotRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.5, ease: "expo.out" }
        );

        // 2. SVG Path draws (Mandala)
        const paths = svgRef.current?.querySelectorAll("path, circle");
        if (paths) {
          gsap.set(paths, { strokeDasharray: 1000, strokeDashoffset: 1000 });
          tl.to(paths, {
            strokeDashoffset: 0,
            duration: 3.5,
            ease: "power2.inOut",
            stagger: 0.1,
          }, "-=0.5");
        }

        // 3. Dot fades as pattern completes
        tl.to(dotRef.current, { opacity: 0, duration: 1 }, "-=1");

        // 4. Text reveal (Ultra-slow tracking)
        const chars = textRef.current?.querySelectorAll(".loader-char");
        if (chars) {
          tl.from(
            chars,
            {
              filter: "blur(10px)",
              opacity: 0,
              duration: 2,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=2"
          );
        }

        // 5. Expand mask / Fade out (Cinematic wipe)
        tl.to(
          containerRef.current,
          {
            clipPath: "circle(150% at 50% 50%)",
            opacity: 0,
            duration: 2,
            ease: "power4.inOut",
          },
          "+=1"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!isAnimating) return null;

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="loader-char inline-block whitespace-pre text-gold font-serif text-sm md:text-xl tracking-[0.3em] uppercase">
        {char}
      </span>
    ));
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0807]"
      style={{ clipPath: "circle(100% at 50% 50%)" }}
    >
      <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
        {/* The moving dot */}
        <div 
          ref={dotRef}
          className="absolute z-10 w-2 h-2 rounded-full bg-henna opacity-0"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        />
        
        {/* Intricate Mandala SVG */}
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          fill="none"
          stroke="var(--henna)"
          strokeWidth="0.5"
          className="w-full h-full opacity-80 drop-shadow-[0_0_8px_rgba(140,59,36,0.3)]"
        >
          {/* Inner circle */}
          <circle cx="50" cy="50" r="10" strokeDasharray="1, 2" strokeWidth="0.5" />
          
          {/* Petals */}
          <path d="M50 40 C60 25, 75 40, 50 50" />
          <path d="M50 40 C40 25, 25 40, 50 50" />
          
          <path d="M60 50 C75 40, 60 75, 50 50" />
          <path d="M40 50 C25 40, 40 75, 50 50" />
          
          <path d="M50 60 C60 75, 75 60, 50 50" />
          <path d="M50 60 C40 75, 25 60, 50 50" />

          {/* Outer flourishes */}
          <path d="M50 20 C70 10, 80 30, 50 45" />
          <path d="M50 20 C30 10, 20 30, 50 45" />
          
          <path d="M50 80 C70 90, 80 70, 50 55" />
          <path d="M50 80 C30 90, 20 70, 50 55" />
        </svg>
      </div>
      
      <div ref={textRef} className="mt-8 flex flex-col items-center justify-center gap-2 overflow-hidden h-16">
        <div>{splitText("CUSSENT MAYYA'S")}</div>
        <div>{splitText("MEHENDI")}</div>
      </div>
    </div>
  );
}
