"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MehendiScrollLine() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const paths = svgRef.current?.querySelectorAll("path");
    if (!paths || paths.length === 0) return;

    paths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 flex justify-center opacity-30 mix-blend-screen overflow-hidden">
      <svg
        ref={svgRef}
        viewBox="0 0 100 2000"
        preserveAspectRatio="xMidYMin slice"
        className="w-full max-w-sm h-full drop-shadow-[0_0_8px_rgba(200,155,92,0.3)]"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="0.5"
      >
        {/* Main vine */}
        <path d="M50 0 C60 100, 40 200, 50 300 C60 400, 40 500, 50 600 C60 700, 40 800, 50 900 C60 1000, 40 1100, 50 1200 C60 1300, 40 1400, 50 1500 C60 1600, 40 1700, 50 1800 C60 1900, 40 2000, 50 2000" />
        
        {/* Leaves and flowers along the vine */}
        <path d="M50 300 C70 280, 80 320, 50 300" />
        <path d="M50 600 C30 580, 20 620, 50 600" />
        <path d="M50 900 C70 880, 80 920, 50 900" />
        <path d="M50 1200 C30 1180, 20 1220, 50 1200" />
        <path d="M50 1500 C70 1480, 80 1520, 50 1500" />
        
        {/* Inner details */}
        <path d="M55 290 C65 295, 60 305, 55 290" />
        <path d="M45 590 C35 595, 40 605, 45 590" />
      </svg>
    </div>
  );
}
