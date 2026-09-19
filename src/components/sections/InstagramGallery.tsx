"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { artistConfig } from "@/lib/config";
import { siteImages } from "@/lib/siteImages";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function InstagramGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal animations
      gsap.utils.toArray<HTMLElement>(".insta-img-wrapper").forEach((wrapper, i) => {
        gsap.fromTo(
          wrapper,
          { clipPath: i % 2 === 0 ? "inset(100% 0 0 0)" : "circle(0% at 50% 50%)" },
          {
            clipPath: i % 2 === 0 ? "inset(0% 0 0 0)" : "circle(100% at 50% 50%)",
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 85%",
            },
          }
        );
      });

      // 2. Scroll Parallax (different speeds)
      gsap.utils.toArray<HTMLElement>(".insta-col").forEach((col, i) => {
        const speed = i % 2 === 0 ? 30 : -30;
        gsap.to(col, {
          yPercent: speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-4 md:px-12 bg-[#0a0807] border-t border-gold/10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="flex flex-col items-center mb-24">
          <h2 className="text-xs tracking-widest text-gold uppercase mb-4">Follow the Journey</h2>
          <a 
            href={`https://instagram.com/${artistConfig.contact.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif text-3xl md:text-5xl text-foreground hover:text-gold transition-colors duration-500 cursor-none"
            data-cursor="hover"
          >
            {artistConfig.contact.instagram}
          </a>
        </div>

        {/* Editorial Masonry Layout */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 w-full max-w-5xl mx-auto h-[120vh] md:h-[80vh]">
          
          {/* Col 1 */}
          <div className="insta-col w-full md:w-1/3 flex flex-col gap-6 md:gap-12 pt-0 md:pt-20">
            {siteImages.instagram.slice(0, 2).map((src, i) => (
              <a 
                key={i}
                href={`https://instagram.com/${artistConfig.contact.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "insta-img-wrapper relative group overflow-hidden bg-[#2a1b12] cursor-none",
                  i === 0 ? "aspect-[3/4]" : "aspect-square"
                )}
                data-cursor="view"
              >
                <div className="absolute inset-4 z-20 pointer-events-none border border-gold/0 group-hover:border-gold/30 transition-colors duration-700" />
                <img 
                  src={src} 
                  alt={`Instagram post`}
                  className="w-full h-full object-cover transition-transform duration-[10000ms] ease-out group-hover:scale-110"
                />
                <div className="cinematic-image-layer z-10" />
              </a>
            ))}
          </div>

          {/* Col 2 */}
          <div className="insta-col w-full md:w-1/3 flex flex-col gap-6 md:gap-12">
            {siteImages.instagram.slice(2, 4).map((src, i) => (
              <a 
                key={i + 2}
                href={`https://instagram.com/${artistConfig.contact.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "insta-img-wrapper relative group overflow-hidden bg-[#2a1b12] cursor-none",
                  i === 0 ? "aspect-[4/5]" : "aspect-[3/4]"
                )}
                data-cursor="view"
              >
                <div className="absolute inset-4 z-20 pointer-events-none border border-gold/0 group-hover:border-gold/30 transition-colors duration-700" />
                <img 
                  src={src} 
                  alt={`Instagram post`}
                  className="w-full h-full object-cover transition-transform duration-[10000ms] ease-out group-hover:scale-110"
                />
                <div className="cinematic-image-layer z-10" />
              </a>
            ))}
          </div>

          {/* Col 3 */}
          <div className="insta-col w-full md:w-1/3 flex flex-col gap-6 md:gap-12 pt-0 md:pt-40">
            {siteImages.instagram.slice(4, 6).map((src, i) => (
              <a 
                key={i + 4}
                href={`https://instagram.com/${artistConfig.contact.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "insta-img-wrapper relative group overflow-hidden bg-[#2a1b12] cursor-none",
                  i === 0 ? "aspect-square" : "aspect-[4/5]"
                )}
                data-cursor="view"
              >
                <div className="absolute inset-4 z-20 pointer-events-none border border-gold/0 group-hover:border-gold/30 transition-colors duration-700" />
                <img 
                  src={src} 
                  alt={`Instagram post`}
                  className="w-full h-full object-cover transition-transform duration-[10000ms] ease-out group-hover:scale-110"
                />
                <div className="cinematic-image-layer z-10" />
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
