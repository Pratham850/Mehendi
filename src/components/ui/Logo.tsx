import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  iconOnly?: boolean;
}

export default function Logo({ className, showText = true, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={cn(
          "transition-all duration-700 ease-in-out",
          iconOnly ? "w-12 h-12" : "w-16 h-16 md:w-20 md:h-20"
        )}
      >
        {/* Outer Mandala Dots & Lines */}
        <circle cx="50" cy="50" r="45" strokeDasharray="1 6" strokeWidth="2" opacity="0.4" />
        <circle cx="50" cy="50" r="38" strokeWidth="0.5" opacity="0.6" />
        
        {/* Lotus Petals */}
        <path d="M50 20 C65 35, 70 50, 50 65 C30 50, 35 35, 50 20 Z" strokeWidth="1" />
        <path d="M50 20 C60 30, 60 45, 50 55 C40 45, 40 30, 50 20 Z" strokeWidth="0.75" />
        
        {/* Side Petals */}
        <path d="M30 40 C35 55, 45 60, 50 65 C35 65, 25 50, 30 40 Z" strokeWidth="1" />
        <path d="M70 40 C65 55, 55 60, 50 65 C65 65, 75 50, 70 40 Z" strokeWidth="1" />

        {/* Decorative Henna Elements */}
        <path d="M50 65 C55 75, 60 75, 65 70" strokeWidth="0.75" strokeDasharray="2 2" />
        <path d="M50 65 C45 75, 40 75, 35 70" strokeWidth="0.75" strokeDasharray="2 2" />

        {/* Inner S Monogram */}
        <path d="M54 35 C45 35, 44 42, 50 45 C56 48, 55 55, 46 55 C43 55, 42 52, 42 50" 
          strokeWidth="1.25" 
          strokeLinecap="round" 
        />
        <circle cx="56" cy="33" r="0.5" fill="currentColor" stroke="none" />
        <circle cx="44" cy="57" r="0.5" fill="currentColor" stroke="none" />
      </svg>
      
      {showText && !iconOnly && (
        <div className="flex flex-col items-center mt-3 gap-1 text-center">
          <span className="font-serif text-lg md:text-xl tracking-[0.2em] text-foreground">
            HAND MANDALAS
          </span>
          <span className="font-sans text-[10px] md:text-xs tracking-widest text-gold italic opacity-90 uppercase">
            By Srijana
          </span>
        </div>
      )}
    </div>
  );
}
