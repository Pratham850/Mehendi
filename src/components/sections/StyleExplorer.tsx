"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const styles = [
  {
    name: "BRIDAL",
    description: "Intricate, full-length storytelling. Traditional motifs spanning hands and feet.",
    svg: (
      <svg viewBox="0 0 100 100" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[40vw] h-[80vw] md:h-[40vw] max-w-[600px] max-h-[600px] pointer-events-none opacity-20" fill="none" stroke="var(--gold)" strokeWidth="0.5">
        <path d="M50 10 C60 20, 80 40, 50 50 C20 40, 40 20, 50 10" className="style-path" strokeDasharray="200" strokeDashoffset="200" />
        <path d="M50 90 C60 80, 80 60, 50 50 C20 60, 40 80, 50 90" className="style-path" strokeDasharray="200" strokeDashoffset="200" style={{ animationDelay: '0.1s' }} />
        <circle cx="50" cy="50" r="10" className="style-path" strokeDasharray="100" strokeDashoffset="100" style={{ animationDelay: '0.2s' }} />
        <circle cx="50" cy="50" r="15" className="style-path" strokeDasharray="2 2" strokeDashoffset="100" style={{ animationDelay: '0.3s' }} />
      </svg>
    )
  },
  {
    name: "ARABIC",
    description: "Flowing vines, bold shading, and floral elegance focusing on empty space.",
    svg: (
      <svg viewBox="0 0 100 100" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[40vw] h-[80vw] md:h-[40vw] max-w-[600px] max-h-[600px] pointer-events-none opacity-20" fill="none" stroke="var(--henna)" strokeWidth="0.5">
        <path d="M10 90 Q 50 50, 90 10" className="style-path" strokeDasharray="200" strokeDashoffset="200" />
        <path d="M40 60 C 20 40, 20 20, 40 40" className="style-path" strokeDasharray="100" strokeDashoffset="100" style={{ animationDelay: '0.2s' }} />
        <path d="M60 40 C 80 60, 80 80, 60 60" className="style-path" strokeDasharray="100" strokeDashoffset="100" style={{ animationDelay: '0.4s' }} />
      </svg>
    )
  },
  {
    name: "MINIMALIST",
    description: "Modern, subtle, and geometric. Less is more.",
    svg: (
      <svg viewBox="0 0 100 100" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[40vw] h-[80vw] md:h-[40vw] max-w-[600px] max-h-[600px] pointer-events-none opacity-20" fill="none" stroke="var(--beige)" strokeWidth="0.5">
        <rect x="35" y="35" width="30" height="30" className="style-path transform origin-center rotate-45" strokeDasharray="150" strokeDashoffset="150" />
        <circle cx="50" cy="50" r="5" className="style-path" strokeDasharray="50" strokeDashoffset="50" style={{ animationDelay: '0.3s' }} />
        <line x1="50" y1="10" x2="50" y2="25" className="style-path" strokeDasharray="50" strokeDashoffset="50" style={{ animationDelay: '0.5s' }} />
        <line x1="50" y1="90" x2="50" y2="75" className="style-path" strokeDasharray="50" strokeDashoffset="50" style={{ animationDelay: '0.5s' }} />
      </svg>
    )
  }
];

export default function StyleExplorer() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full py-32 bg-[#0D0A08] overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
      <style dangerouslySetInnerHTML={{__html: `
        .style-path {
          transition: stroke-dashoffset 1.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .style-hovered .style-path {
          stroke-dashoffset: 0;
        }
      `}} />

      <h2 className="text-xs tracking-widest text-gold uppercase mb-16 relative z-10">Find Your Style</h2>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-12 md:gap-16">
        {styles.map((style, i) => (
          <div 
            key={style.name}
            className="group relative flex flex-col items-center text-center cursor-none"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setHoveredIndex(hoveredIndex === i ? null : i)}
            data-cursor="hover"
          >
            <h3 className={cn(
              "font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl transition-colors duration-500 relative z-20",
              hoveredIndex === i ? "text-gold" : (hoveredIndex === null ? "text-foreground" : "text-foreground/20")
            )}>
              {style.name}
            </h3>
            
            <div className={cn(
              "overflow-hidden transition-all duration-500 max-w-md mx-auto relative z-20 mt-4",
              hoveredIndex === i ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
            )}>
              <p className="font-sans text-xs md:text-sm tracking-widest text-foreground/80 uppercase">
                {style.description}
              </p>
            </div>

            {/* SVG Pattern Container */}
            <div className={cn(
              "absolute inset-0 pointer-events-none z-10",
              hoveredIndex === i ? "style-hovered" : ""
            )}>
              {style.svg}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
