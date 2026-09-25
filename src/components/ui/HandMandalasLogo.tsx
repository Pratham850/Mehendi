import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  iconOnly?: boolean;
}

export default function HandMandalasLogo({ className, showText = true, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center hand-mandalas-logo", className)}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className={cn(
          "transition-all duration-700 ease-in-out logo-svg overflow-visible",
          iconOnly ? "w-12 h-12" : "w-24 h-24 md:w-32 md:h-32" // Increased base size to show detail
        )}
      >
        {/* 1. First Stroke (Scene 4) */}
        <g className="logo-first-stroke">
          {/* Main stem growing up from center-bottom */}
          <path d="M50 85 C45 75, 55 60, 48 50" strokeWidth="0.8" strokeLinecap="round" />
        </g>

        {/* 2. Vine & Leaves (Scene 5) - The intricate left botanical flourish */}
        <g className="logo-leaves">
          <g className="logo-leaf-stem">
            <path d="M48 70 C30 75, 15 55, 25 35" strokeWidth="0.6" />
            <path d="M25 60 C18 50, 20 40, 28 32" strokeWidth="0.4" />
            <path d="M35 72 C25 80, 15 70, 20 60" strokeWidth="0.5" />
          </g>
          <g className="logo-leaf-outline">
            {/* Detailed leaves along the vines */}
            <path d="M25 35 C28 32, 32 35, 30 38 C28 41, 24 38, 25 35 Z" strokeWidth="0.4" />
            <path d="M22 45 C18 42, 16 45, 18 48 C20 51, 25 48, 22 45 Z" strokeWidth="0.4" />
            <path d="M32 55 C28 50, 30 45, 35 48 C38 52, 35 58, 32 55 Z" strokeWidth="0.4" />
            <path d="M20 60 C15 55, 12 60, 15 65 C18 70, 25 65, 20 60 Z" strokeWidth="0.4" />
            <path d="M40 75 C35 78, 38 82, 42 80 C45 78, 43 72, 40 75 Z" strokeWidth="0.4" />
          </g>
          <g className="logo-leaf-interior">
            {/* Veins inside the leaves */}
            <path d="M25 35 L30 38" strokeWidth="0.2" />
            <path d="M22 45 L18 48" strokeWidth="0.2" />
            <path d="M32 55 L35 48" strokeWidth="0.2" />
            <path d="M20 60 L15 65" strokeWidth="0.2" />
            <path d="M40 75 L42 80" strokeWidth="0.2" />
          </g>
        </g>

        {/* 3. Petals & Lotus (Scene 6 & 7) - The large base lotus */}
        <g className="logo-lotus">
          <g className="logo-petal-outer">
            {/* Center large petal */}
            <path d="M50 75 C45 65, 48 55, 50 50 C52 55, 55 65, 50 75 Z" strokeWidth="0.6" />
            {/* Left side petals */}
            <path d="M50 75 C40 70, 35 60, 38 52 C42 60, 48 68, 50 75 Z" strokeWidth="0.5" />
            <path d="M46 76 C35 78, 28 72, 25 65 C32 70, 40 74, 46 76 Z" strokeWidth="0.4" />
            {/* Right side petals */}
            <path d="M50 75 C60 70, 65 60, 62 52 C58 60, 52 68, 50 75 Z" strokeWidth="0.5" />
            <path d="M54 76 C65 78, 72 72, 75 65 C68 70, 60 74, 54 76 Z" strokeWidth="0.4" />
          </g>
          <g className="logo-petal-inner">
            {/* Inner layered petals */}
            <path d="M50 72 C47 65, 48 58, 50 55 C52 58, 53 65, 50 72 Z" strokeWidth="0.3" />
            <path d="M48 72 C42 68, 40 62, 42 56 C44 62, 47 68, 48 72 Z" strokeWidth="0.3" />
            <path d="M52 72 C58 68, 60 62, 58 56 C56 62, 53 68, 52 72 Z" strokeWidth="0.3" />
          </g>
          <g className="logo-petal-veins">
            {/* Intricate linework inside petals */}
            <path d="M50 75 L50 60" strokeWidth="0.2" />
            <path d="M48 74 L42 62" strokeWidth="0.2" />
            <path d="M52 74 L58 62" strokeWidth="0.2" />
            <path d="M45 75 L30 68" strokeWidth="0.2" />
            <path d="M55 75 L70 68" strokeWidth="0.2" />
          </g>
        </g>

        {/* 4. Hand Emerges (Scene 8) - Elegant upward pointing hand */}
        <g className="logo-hand">
          {/* Wrist and forearm emerging from lotus */}
          <path className="logo-hand-wrist" d="M48 50 C46 45, 50 40, 55 35" strokeWidth="0.7" />
          <path className="logo-hand-wrist" d="M52 52 C55 48, 58 42, 62 38" strokeWidth="0.7" />
          {/* Palm */}
          <path className="logo-hand-palm" d="M55 35 C60 32, 65 30, 70 30" strokeWidth="0.7" />
          {/* Fingers */}
          <path className="logo-hand-thumb" d="M62 38 C60 35, 58 32, 60 28 C62 26, 65 28, 65 32" strokeWidth="0.5" />
          <path className="logo-hand-index" d="M65 32 C68 25, 72 20, 74 18 C76 17, 78 19, 76 22 C74 25, 70 30, 70 30" strokeWidth="0.5" />
          <path className="logo-hand-middle" d="M68 31 C72 24, 76 18, 78 16 C80 15, 82 17, 80 20 C76 25, 72 31, 72 31" strokeWidth="0.5" />
          <path className="logo-hand-ring" d="M70 31 C74 26, 78 22, 80 20 C81 19, 83 21, 81 24 C78 28, 74 32, 74 32" strokeWidth="0.5" />
          <path className="logo-hand-pinky" d="M72 32 C75 28, 78 26, 80 25 C81 24, 82 26, 80 28 C78 31, 75 33, 75 33" strokeWidth="0.5" />
        </g>

        {/* 5. Mehendi Patterns on Hand (Scene 9) */}
        <g className="logo-hand-details">
          {/* Mandala on wrist/forearm */}
          <path className="logo-hand-detail-large" d="M52 46 C50 44, 48 45, 50 48 C52 49, 54 48, 52 46 Z" strokeWidth="0.4" />
          <path className="logo-hand-detail-large" d="M55 42 C53 40, 51 41, 53 44 C55 45, 57 44, 55 42 Z" strokeWidth="0.4" />
          <path className="logo-hand-detail-medium" d="M50 48 C53 46, 56 42, 58 40" strokeWidth="0.2" />
          {/* Fine lattice/details on fingers */}
          <g className="logo-hand-detail-fine">
            <path d="M62 35 L65 33" strokeWidth="0.2" />
            <path d="M64 36 L67 34" strokeWidth="0.2" />
            <path d="M68 28 L70 26" strokeWidth="0.2" />
            <path d="M72 22 L74 20" strokeWidth="0.2" />
          </g>
          {/* Decorative dots on hand and fingers */}
          <g className="logo-hand-detail-dots">
            <circle cx="50" cy="46" r="0.3" fill="currentColor" stroke="none" />
            <circle cx="53" cy="42" r="0.3" fill="currentColor" stroke="none" />
            <circle cx="68" cy="31" r="0.3" fill="currentColor" stroke="none" />
            <circle cx="72" cy="25" r="0.3" fill="currentColor" stroke="none" />
            <circle cx="76" cy="18" r="0.3" fill="currentColor" stroke="none" />
          </g>
        </g>

        {/* 6. The "S" / Hanging Motifs (Scene 10) */}
        <g className="logo-s-curve">
          {/* Hanging motifs from the hand */}
          <path d="M70 30 L70 45" strokeWidth="0.3" strokeDasharray="1 1" />
          <path d="M68 45 L70 48 L72 45 Z" strokeWidth="0.4" fill="currentColor" />
          <path d="M60 38 L60 48" strokeWidth="0.3" strokeDasharray="1 1" />
          <path d="M59 48 L60 50 L61 48 Z" strokeWidth="0.4" fill="currentColor" />
          
          {/* Small top lotus held/near hand */}
          <path d="M72 10 C70 12, 68 15, 72 15 C76 15, 74 12, 72 10 Z" strokeWidth="0.4" />
          <path d="M72 10 C68 10, 66 12, 68 14 C70 15, 72 14, 72 10 Z" strokeWidth="0.4" />
          <path d="M72 10 C76 10, 78 12, 76 14 C74 15, 72 14, 72 10 Z" strokeWidth="0.4" />
        </g>

        {/* 7. Mandala Circle Boundary (Scene 11) - Crescent Arc */}
        <g className="logo-mandala-boundary">
          {/* Outer thick crescent arching from top left to bottom right */}
          <path d="M55 5 C30 5, 10 25, 10 50 C10 70, 25 85, 45 90" strokeWidth="1.2" />
          {/* Inner thin crescent */}
          <path d="M53 8 C33 8, 14 26, 14 49 C14 67, 27 81, 43 86" strokeWidth="0.4" />
          {/* Top hanging diamond ornament from the arc */}
          <path d="M55 5 L55 -5" strokeWidth="0.4" strokeDasharray="1 1" />
          <path d="M53 -5 L55 -8 L57 -5 L55 -2 Z" strokeWidth="0.5" fill="currentColor" />
        </g>

        {/* 8. Final Mandala Details (Scene 12) */}
        <g className="logo-mandala-details">
          {/* Decorative elements along the crescent */}
          <circle cx="20" cy="30" r="0.5" fill="currentColor" />
          <circle cx="12" cy="50" r="0.5" fill="currentColor" />
          <circle cx="20" cy="70" r="0.5" fill="currentColor" />
          <path d="M10 50 L5 50" strokeWidth="0.4" />
          <path d="M12 30 L8 28" strokeWidth="0.4" />
          <path d="M12 70 L8 72" strokeWidth="0.4" />
          
          {/* Swirling flourish top right */}
          <path d="M55 5 C65 5, 70 8, 75 12" strokeWidth="0.3" />
        </g>

        {/* Dots (Scene 3 & 15) */}
        <circle cx="50" cy="85" r="1.5" className="logo-start-dot" fill="var(--henna)" stroke="none" />
        <circle cx="72" cy="15" r="1.0" className="logo-final-dot" fill="var(--henna)" stroke="none" />
      </svg>
      
      {showText && !iconOnly && (
        <div className="flex flex-col items-center mt-3 gap-1 text-center logo-text-group overflow-hidden">
          <div className="logo-brand-name-mask overflow-hidden relative">
            <span className="font-serif text-lg md:text-xl tracking-[0.2em] text-foreground logo-brand-name inline-block">
              HAND MANDALAS
            </span>
            <div className="logo-brand-line absolute bottom-0 left-0 h-[1px] bg-gold w-full origin-left" />
          </div>
          <span className="font-sans text-[10px] md:text-xs tracking-widest text-gold italic opacity-90 uppercase logo-artist-name flex items-center gap-2">
            <span className="w-4 h-[1px] bg-gold/50 logo-artist-line"></span>
            BY SRIJANA
            <span className="w-4 h-[1px] bg-gold/50 logo-artist-line"></span>
          </span>
        </div>
      )}
    </div>
  );
}
