"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { artistConfig } from "@/lib/config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stats = containerRef.current?.querySelectorAll(".stat-item");
      if (stats) {
        gsap.from(stats, {
          y: 40,
          opacity: 0,
          duration: 2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-12 bg-[#14110e] border-y border-gold/10 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between gap-12 text-center">
        {artistConfig.stats.map((stat, i) => (
          <div key={i} className="stat-item flex-1 min-w-[150px]">
            <div className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-4">
              {stat.value}
            </div>
            <div className="text-xs tracking-widest text-gold uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
