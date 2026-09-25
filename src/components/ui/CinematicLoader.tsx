"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import HandMandalasLogo from "@/components/ui/HandMandalasLogo";

export default function CinematicLoader() {
  const [isAnimating, setIsAnimating] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    const isReturning = hasVisited === "true";
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("hasVisited", "true");
          setIsAnimating(false);
          window.dispatchEvent(new Event("loaderComplete"));
        },
      });

      if (isReturning || prefersReducedMotion) {
        // Reduced motion fallback
        tl.fromTo(".logo-svg", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1, ease: "power2.out" })
          .fromTo(".logo-text-group", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.5")
          .to(containerRef.current, { opacity: 0, duration: 0.8, delay: 0.5, ease: "power2.inOut" });
      } else {
        // --- THE 19-SCENE ULTIMATE CINEMATIC MEHENDI LOADER ---
        
        // Reset Paths
        gsap.set(".logo-start-dot", { scale: 0, opacity: 0, transformOrigin: "center" });
        gsap.set(".logo-first-stroke path", { strokeDasharray: 200, strokeDashoffset: 200 });
        
        gsap.set(".logo-leaf-stem path", { strokeDasharray: 50, strokeDashoffset: 50 });
        gsap.set(".logo-leaf-outline path", { strokeDasharray: 50, strokeDashoffset: 50 });
        gsap.set(".logo-leaf-interior path", { strokeDasharray: 50, strokeDashoffset: 50 });
        
        gsap.set(".logo-petal-outer path", { strokeDasharray: 100, strokeDashoffset: 100 });
        gsap.set(".logo-petal-inner path", { strokeDasharray: 50, strokeDashoffset: 50 });
        gsap.set(".logo-petal-veins path", { strokeDasharray: 50, strokeDashoffset: 50 });
        
        gsap.set(".logo-hand path", { strokeDasharray: 150, strokeDashoffset: 150 });
        
        gsap.set(".logo-hand-detail-large", { strokeDasharray: 50, strokeDashoffset: 50 });
        gsap.set(".logo-hand-detail-medium", { strokeDasharray: 50, strokeDashoffset: 50 });
        gsap.set(".logo-hand-detail-fine path", { strokeDasharray: 20, strokeDashoffset: 20 });
        gsap.set(".logo-hand-detail-dots circle", { scale: 0, opacity: 0, transformOrigin: "center" });
        
        gsap.set(".logo-s-curve path", { strokeDasharray: 250, strokeDashoffset: 250 });
        
        gsap.set(".logo-mandala-boundary circle", { strokeDasharray: 300, strokeDashoffset: 300 });
        gsap.set(".logo-boundary-interrupt", { strokeDasharray: 20, strokeDashoffset: 20 });
        
        gsap.set(".logo-mandala-details path", { strokeDasharray: 80, strokeDashoffset: 80 });
        
        gsap.set(".logo-final-dot", { scale: 0, opacity: 0, transformOrigin: "center" });
        gsap.set(".logo-brand-name", { y: "100%", opacity: 0 });
        gsap.set(".logo-brand-line", { scaleX: 0 });
        gsap.set(".logo-artist-name", { opacity: 0, filter: "blur(5px)" });
        gsap.set(".logo-artist-line", { scaleX: 0 });

        // Scene 1: Absolute Black/Brown Atmosphere (0.0-0.7s)
        tl.to(".intro-atmosphere", { opacity: 1, duration: 0.7, ease: "power2.inOut" });

        // Scene 2: Cone Arrives (0.7-1.1s)
        // Position cone over the first dot (50, 85)
        gsap.set(".henna-cone-wrapper", { x: 50, y: 70, opacity: 0, rotate: 15 });
        tl.to(".henna-cone-wrapper", { x: 50, y: 85, opacity: 1, duration: 0.4, ease: "power2.out" });

        // Scene 3: First Dot (1.1-1.5s)
        tl.to(".logo-start-dot", { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" });
        // Tiny henna drop effect from cone
        tl.to(".henna-cone-wrapper", { y: 83, duration: 0.2, yoyo: true, repeat: 1 }, "<");

        // Scene 4: First Stroke & Cone Follows (1.5-2.1s)
        const mainStroke = document.querySelector(".logo-first-stroke path");
        tl.to(mainStroke, { strokeDashoffset: 0, duration: 0.6, ease: "power1.inOut" });
        // Cone tracks the stroke vaguely from y:85 to y:40
        tl.to(".henna-cone-wrapper", { x: 50, y: 40, duration: 0.6, ease: "power1.inOut" }, "<");
        // Cone leaves
        tl.to(".henna-cone-wrapper", { opacity: 0, y: 30, duration: 0.3, ease: "power2.in" });

        // Scene 5: Vine & Leaves (2.1-2.8s) - layered drawing
        tl.to(".logo-leaf-stem path", { strokeDashoffset: 0, duration: 0.3, stagger: 0.1, ease: "power1.inOut" }, "-=0.1");
        tl.to(".logo-leaf-outline path", { strokeDashoffset: 0, duration: 0.3, stagger: 0.1, ease: "power1.inOut" }, "-=0.1");
        tl.to(".logo-leaf-interior path", { strokeDashoffset: 0, duration: 0.2, stagger: 0.1, ease: "power1.inOut" }, "-=0.1");

        // Scene 6 & 7: Petals & Lotus (2.8-3.5s)
        tl.to(".logo-petal-outer path", { strokeDashoffset: 0, duration: 0.4, stagger: 0.1, ease: "sine.inOut" }, "-=0.1");
        tl.to(".logo-petal-inner path", { strokeDashoffset: 0, duration: 0.3, ease: "sine.inOut" }, "-=0.2");
        tl.to(".logo-petal-veins path", { strokeDashoffset: 0, duration: 0.2, stagger: 0.05, ease: "power1.out" }, "-=0.1");

        // Scene 8: Hand Emerges (3.5-4.2s) - Wrist -> Palm -> Fingers
        tl.to(".logo-hand path", { 
          strokeDashoffset: 0, 
          duration: 0.4, 
          stagger: { each: 0.1, from: "start" }, 
          ease: "power1.inOut" 
        }, "-=0.1");

        // Scene 9: Mehendi Details on Hand (4.2-4.7s)
        tl.to(".logo-hand-detail-large", { strokeDashoffset: 0, duration: 0.3, ease: "power1.inOut" });
        tl.to(".logo-hand-detail-medium", { strokeDashoffset: 0, duration: 0.2, ease: "power1.out" }, "-=0.1");
        tl.to(".logo-hand-detail-fine path", { strokeDashoffset: 0, duration: 0.2, stagger: 0.05, ease: "power1.out" }, "-=0.1");
        tl.to(".logo-hand-detail-dots circle", { scale: 1, opacity: 1, duration: 0.2, stagger: 0.05, ease: "back.out(2)" }, "-=0.1");

        // Scene 10: The S Curve (4.7-5.1s)
        tl.to(".logo-s-curve path", { 
          strokeDashoffset: 0, 
          duration: 0.6, 
          ease: "sine.inOut" // Organic sweep
        });

        // Scene 11 & 12: The Circle & Mandala Completion (5.1-5.5s)
        tl.to(".logo-mandala-boundary circle", { strokeDashoffset: 0, duration: 0.5, stagger: 0.1, ease: "power2.inOut" }, "-=0.2");
        tl.to(".logo-boundary-interrupt", { strokeDashoffset: 0, duration: 0.2, stagger: 0.05, ease: "power1.out" }, "-=0.2");
        tl.to(".logo-mandala-details path", { strokeDashoffset: 0, duration: 0.4, stagger: 0.05, ease: "power1.out" }, "-=0.2");

        // Small pause for appreciation (Hold)
        tl.to({}, { duration: 0.4 });

        // Scene 13: Golden Breath (Warm light traveling through strokes)
        tl.to(".logo-svg", { 
          filter: "drop-shadow(0px 0px 8px rgba(201, 154, 74, 0.4))", 
          duration: 0.8, 
          yoyo: true, 
          repeat: 1,
          ease: "sine.inOut" 
        });

        // Scene 14: Brand Name Reveal (5.5-6.2s)
        tl.to(".logo-brand-line", { scaleX: 1, duration: 0.4, ease: "power2.inOut" });
        tl.to(".logo-brand-name", { y: "0%", opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.2");
        tl.to(".logo-artist-line", { scaleX: 1, duration: 0.3, ease: "power2.inOut", stagger: 0.1 }, "-=0.3");
        tl.to(".logo-artist-name", { opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power2.out" }, "-=0.2");

        // Scene 15: The Final Dot - Cone Returns (6.2-6.4s)
        gsap.set(".henna-cone-wrapper", { x: 50, y: 5, rotate: -15 });
        tl.to(".henna-cone-wrapper", { x: 50, y: 15, opacity: 1, duration: 0.3, ease: "power2.out" });
        tl.to(".logo-final-dot", { scale: 1, opacity: 1, duration: 0.2, ease: "back.out(2)" });
        tl.to(".henna-cone-wrapper", { opacity: 0, y: 0, duration: 0.3, ease: "power2.in" });

        // Scene 16: Artwork Comes Alive
        tl.to(".intro-particles", { opacity: 1, duration: 1 });
        tl.to(".logo-svg", { y: -2, duration: 2, ease: "sine.inOut", yoyo: true, repeat: 1 }, "-=1");

        // Scene 17 & 18: Magic Transition to Homepage
        tl.to(logoContainerRef.current, { scale: 3, opacity: 0, filter: "blur(20px)", duration: 1.5, ease: "power3.in" });
        tl.to(containerRef.current, { 
          clipPath: "circle(150% at 50% 50%)", 
          opacity: 0, 
          duration: 1.5, 
          ease: "power2.inOut"
        }, "-=1.2");
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!isAnimating) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070503] overflow-hidden"
      style={{ clipPath: "circle(100% at 50% 50%)" }}
    >
      {/* Scene 1: Absolute Black / Brown Atmosphere */}
      <div className="intro-atmosphere opacity-0 absolute inset-0 pointer-events-none">
        {/* Subtle radial warmth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1c1009_0%,_transparent_70%)]" />
        {/* Microscopic film grain */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] mix-blend-overlay" />
      </div>

      {/* Scene 16: Floating Particles (Hidden until end) */}
      <div className="intro-particles opacity-0 absolute inset-0 pointer-events-none">
        <div className="absolute top-[30%] left-[20%] w-[1px] h-[1px] bg-gold rounded-full shadow-[0_0_8px_var(--gold)] animate-[pulse_3s_infinite]" />
        <div className="absolute top-[60%] right-[25%] w-[1.5px] h-[1.5px] bg-henna rounded-full shadow-[0_0_10px_var(--henna)] animate-[pulse_4s_infinite]" />
        <div className="absolute top-[40%] left-[70%] w-[2px] h-[2px] bg-foreground/50 rounded-full animate-[pulse_5s_infinite]" />
      </div>

      <div ref={logoContainerRef} className="relative flex flex-col items-center justify-center text-gold drop-shadow-xl z-10 scale-90 md:scale-100">
        
        {/* The SVG Logo Structure */}
        <HandMandalasLogo />

        {/* The Henna Cone Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 100 100">
          <g className="henna-cone-wrapper">
            {/* The Cone Graphic */}
            <path 
              d="M 0 0 L 8 -25 C 10 -27, -10 -27, -8 -25 Z" 
              fill="url(#coneGradient)" 
              stroke="#5a3824"
              strokeWidth="0.5"
            />
            <path d="M 0 0 L 4 -12 C 5 -13, -5 -13, -4 -12 Z" fill="#70452C" /> {/* Henna tip */}
            
            {/* Cone Lighting/Gradients */}
            <defs>
              <linearGradient id="coneGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2c1a0f" />
                <stop offset="50%" stopColor="#5c3a22" />
                <stop offset="100%" stopColor="#1a0f08" />
              </linearGradient>
            </defs>
          </g>
        </svg>

      </div>
    </div>
  );
}
