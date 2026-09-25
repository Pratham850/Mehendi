"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { artistConfig } from "@/lib/config";
import { siteImages } from "@/lib/siteImages";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ArtistSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const signatureRef = useRef<SVGSVGElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Organic Mask Reveal & Scroll Zoom (Rule 08, 09, 12)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        },
      });

      // Start small, heavily cropped via clip-path
      tl.fromTo(".artist-img-wrapper", 
        { clipPath: "circle(5% at 50% 50%)", filter: "grayscale(100%) blur(5px)" },
        { clipPath: "circle(70% at 50% 50%)", filter: "grayscale(0%) blur(0px)", ease: "power2.inOut", duration: 1 }
      );

      // SVG Frame drawing
      const paths = svgRef.current?.querySelectorAll("path");
      if (paths) {
        gsap.set(paths, { strokeDasharray: 800, strokeDashoffset: 800 });
        tl.to(paths, {
          strokeDashoffset: 0,
          duration: 1,
          ease: "none",
        }, 0);
      }

      // 2. Handwriting Signature Reveal (Rule 37, 38) over the image
      const sigPaths = signatureRef.current?.querySelectorAll("path, text");
      if (sigPaths) {
        gsap.set(sigPaths, { strokeDasharray: 500, strokeDashoffset: 500, fillOpacity: 0 });
        tl.to(sigPaths, {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1
        }, 0.5);
        tl.to(sigPaths, {
          fillOpacity: 1,
          duration: 0.2,
          ease: "power2.out"
        }, 1.2);
      }

      // Image Parallax scroll
      tl.to(".artist-img", {
        yPercent: 15,
        scale: 1.1,
        duration: 2,
        ease: "none"
      }, 0);

      // Mouse Parallax Effect (Rule 10, 11)
      const handleMouseMove = (e: MouseEvent) => {
        // Disable on touch/mobile widths
        if (window.innerWidth < 768) return;
        
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(".artist-img", { x: xPos * -0.5, y: yPos * -0.5, duration: 1, ease: "power2.out" });
        gsap.to(".artist-frame", { x: xPos * -1, y: yPos * -1, duration: 1, ease: "power2.out" });
        gsap.to(".artist-signature", { x: xPos * -1.5, y: yPos * -1.5, duration: 1, ease: "power2.out" });
      };

      const imgWrapper = imageContainerRef.current;
      if (imgWrapper) {
        imgWrapper.addEventListener("mousemove", handleMouseMove);
        return () => imgWrapper.removeEventListener("mousemove", handleMouseMove);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <section ref={containerRef} id="artist" className="relative w-full min-h-[120vh] bg-[#0D0A08] py-32 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden border-y border-gold/5">
      
      <div className="absolute top-20 left-6 md:left-12 z-20 font-sans text-xs tracking-widest text-gold/60 uppercase">
        01 — THE ARTIST
      </div>

      <div ref={imageContainerRef} className="relative w-full max-w-md lg:max-w-xl aspect-[4/5] mb-12 group hide-cursor" data-cursor="hover">
        
        {/* SVG Decorative frame (Rule 13) */}
        <div className="artist-frame absolute -inset-16 z-20 pointer-events-none opacity-80 mix-blend-screen transition-transform duration-700 group-hover:scale-105">
          <svg ref={svgRef} viewBox="0 0 100 120" className="w-full h-full" fill="none" stroke="var(--gold)" strokeWidth="0.5">
            <path d="M10 10 C 30 -10, 70 -10, 90 10 C 110 30, 110 90, 90 110 C 70 130, 30 130, 10 110 C -10 90, -10 30, 10 10" />
            <path d="M20 20 C 40 5, 60 5, 80 20" />
            <path d="M80 100 C 60 115, 40 115, 20 100" />
            {/* Hover details */}
            <circle cx="10" cy="10" r="2" className="opacity-0 group-hover:opacity-100 transition-opacity duration-1000" fill="var(--gold)" />
            <circle cx="90" cy="110" r="2" className="opacity-0 group-hover:opacity-100 transition-opacity duration-1000" fill="var(--gold)" />
          </svg>
        </div>

        {/* Portrait Image Wrapper */}
        <div className="artist-img-wrapper absolute inset-0 z-10 overflow-hidden bg-[#0D0A08] transition-all duration-700 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.1)]">
          <img
            src={siteImages.artist.main}
            alt={artistConfig.artistName}
            className="artist-img w-[120%] h-[120%] -top-[10%] -left-[10%] absolute object-cover transition-transform duration-1000"
          />
          <div className="cinematic-image-layer" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-1000 z-10" />
        </div>

        {/* Signature Overlay (Rule 38) */}
        <div className="artist-signature absolute inset-0 z-30 pointer-events-none flex items-center justify-center -rotate-6 scale-110 opacity-80 mix-blend-difference drop-shadow-2xl">
          <svg ref={signatureRef} viewBox="0 0 400 200" className="w-full h-full">
            <text x="50%" y="55%" textAnchor="middle" className="font-serif italic text-6xl" stroke="#fff" strokeWidth="1" fill="#fff">
              Srijana
            </text>
          </svg>
        </div>

        {/* Hover Label */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-serif italic text-gold text-lg">
          The Artist
        </div>
        
        {/* Cone Line Interaction (Rule 09) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
          <svg viewBox="0 0 400 600" className="w-[150%] h-[200%] absolute top-[50%] -left-[25%] opacity-50" fill="none" stroke="var(--gold)" strokeWidth="1">
            <path 
              d="M 200,0 C 250,150 50,250 200,400 C 350,550 200,600 200,600" 
              strokeDasharray="800" 
              strokeDashoffset="800"
              className="group-hover:animate-[drawBorder_3s_ease-in-out_forwards]"
            />
          </svg>
        </div>
      </div>

      <div className="text-center z-10 max-w-2xl px-4 mt-8 relative">
        <h3 className="font-serif text-3xl md:text-6xl text-foreground mb-4">
          {artistConfig.artistName}
        </h3>
        <p className="text-xs tracking-[0.3em] text-gold uppercase mb-8">Mehendi Artist</p>
        <p className="font-serif text-xl md:text-2xl text-foreground/80 leading-relaxed italic font-light">
          "{artistConfig.bio}"
        </p>
      </div>

    </section>
  );
}
