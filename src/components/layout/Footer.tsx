"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { artistConfig } from "@/lib/config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const ornamentRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      // 1. Draw final Mehendi leaf/flower ornament
      const paths = ornamentRef.current?.querySelectorAll("path");
      if (paths) {
        gsap.set(paths, { strokeDasharray: 200, strokeDashoffset: 200 });
        tl.to(paths, {
          strokeDashoffset: 0,
          duration: 3,
          ease: "power2.inOut",
          stagger: 0.5
        });
      }

      // 2. Handwritten Signature Reveal
      tl.fromTo(".signature-path",
        { strokeDasharray: 500, strokeDashoffset: 500, fillOpacity: 0 },
        { strokeDashoffset: 0, duration: 2.5, ease: "power2.inOut", stagger: 0.3 },
        "-=1"
      );
      
      tl.to(".signature-path", {
        fillOpacity: 1,
        duration: 1,
        ease: "power2.out",
        stagger: 0.3
      }, "-=1.5");

      // 3. Fade in links
      tl.from(".footer-link", {
        y: 10,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=1");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={containerRef} className="py-32 px-6 md:px-12 bg-[#0a0807] text-center relative overflow-hidden flex flex-col items-center">
      
      {/* Final Ornament Drawing */}
      <div className="w-24 h-48 mb-8">
        <svg ref={ornamentRef} viewBox="0 0 50 100" className="w-full h-full" fill="none" stroke="var(--gold)" strokeWidth="0.5">
          <path d="M25 0 C 25 30, 45 40, 25 50" />
          <path d="M25 50 C 5 60, 25 70, 25 100" />
          <path d="M25 35 C 10 30, 15 20, 25 25" />
          <path d="M25 65 C 40 70, 35 80, 25 75" />
        </svg>
      </div>

      {/* Signature */}
      <div ref={textRef} className="w-full max-w-xl h-24 md:h-32 mb-16 relative">
        <svg viewBox="0 0 600 100" className="w-full h-full overflow-visible">
          <text 
            x="50%" 
            y="50%" 
            textAnchor="middle" 
            dominantBaseline="middle"
            className="signature-path font-serif italic text-4xl md:text-6xl"
            stroke="var(--foreground)"
            strokeWidth="1"
            fill="var(--foreground)"
          >
            {artistConfig.brandName}
          </text>
        </svg>
      </div>
      
      <div className="flex gap-8 text-foreground/50 text-xs tracking-widest uppercase mb-12">
        <a href={`https://instagram.com/${artistConfig.contact.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="footer-link hover:text-gold transition-colors duration-500 hide-cursor min-h-[44px] flex items-center justify-center" data-cursor="hover">Instagram</a>
        <a href={`https://wa.me/${artistConfig.contact.whatsapp.replace(/\+/g, '')}`} target="_blank" rel="noreferrer" className="footer-link hover:text-gold transition-colors duration-500 hide-cursor min-h-[44px] flex items-center justify-center" data-cursor="hover">WhatsApp</a>
        <a href={`mailto:${artistConfig.contact.email}`} className="footer-link hover:text-gold transition-colors duration-500 hide-cursor min-h-[44px] flex items-center justify-center" data-cursor="hover">Email</a>
      </div>
      
      <div className="footer-link text-foreground/30 text-[10px] tracking-[0.3em] uppercase">
        &copy; {new Date().getFullYear()} {artistConfig.brandName}. All rights reserved.
      </div>

    </footer>
  );
}
