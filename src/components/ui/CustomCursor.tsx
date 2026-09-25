"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'view' | 'book'>('default');

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setTimeout(() => setIsTouchDevice(true), 0);
      return;
    }
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    document.body.classList.add("custom-cursor-active");
    
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const cursorState = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      
      if (cursorState === 'view') {
        setCursorType('view');
      } else if (cursorState === 'book') {
        setCursorType('book');
      } else if (
        cursorState === 'hover' || 
        target.closest('a') || 
        target.closest('button')
      ) {
        setCursorType('hover');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[60] flex items-center justify-center transition-all duration-300"
    >
      {/* State: Default - Tiny henna dot */}
      <div className={cn(
        "absolute w-1.5 h-1.5 bg-henna rounded-full transition-transform duration-300",
        cursorType === 'default' ? "scale-100 opacity-100" : "scale-0 opacity-0"
      )} />

      {/* State: Hover - Tiny circular ornament (mandala) */}
      <div className={cn(
        "absolute w-6 h-6 border-[0.5px] border-henna rounded-full transition-transform duration-300 flex items-center justify-center",
        cursorType === 'hover' ? "scale-100 opacity-100" : "scale-0 opacity-0"
      )}>
        <div className="w-1.5 h-1.5 bg-henna rounded-full" />
      </div>

      {/* State: View - Delicate Mehendi circle with "VIEW" */}
      <div className={cn(
        "absolute w-16 h-16 border-[0.5px] border-gold rounded-full transition-all duration-500 flex flex-col items-center justify-center bg-[#0D0A08]/40 backdrop-blur-sm",
        cursorType === 'view' ? "scale-100 opacity-100" : "scale-0 opacity-0"
      )}>
        <span className="text-[8px] text-gold tracking-widest uppercase">View</span>
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full rotate-45 opacity-50" stroke="var(--gold)" fill="none" strokeWidth="0.5">
          <path d="M50 10 C60 20, 80 40, 50 50 C20 40, 40 20, 50 10" />
          <path d="M50 90 C60 80, 80 60, 50 50 C20 60, 40 80, 50 90" />
        </svg>
      </div>

      {/* State: Book - Animated Mehendi flower */}
      <div className={cn(
        "absolute w-8 h-8 transition-transform duration-300 flex items-center justify-center",
        cursorType === 'book' ? "scale-100 opacity-100 animate-spin-slow" : "scale-0 opacity-0"
      )}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="var(--henna)">
          <path d="M50 0 C60 30, 70 40, 50 50 C30 40, 40 30, 50 0" />
          <path d="M100 50 C70 60, 60 70, 50 50 C60 30, 70 40, 100 50" />
          <path d="M50 100 C40 70, 30 60, 50 50 C70 60, 60 70, 50 100" />
          <path d="M0 50 C30 40, 40 30, 50 50 C40 70, 30 60, 0 50" />
          <circle cx="50" cy="50" r="10" fill="var(--gold)" />
        </svg>
      </div>
    </div>
  );
}
