"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import HandMandalasLogo from "@/components/ui/HandMandalasLogo";

export default function HandMandalasIntro() {
  const [isAnimating, setIsAnimating] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisitedIntro");
    const isReturning = hasVisited === "true";
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      let fallbackTimeout: NodeJS.Timeout;
      let isComplete = false;
      const completeIntro = () => {
        if (isComplete) return;
        isComplete = true;
        sessionStorage.setItem("hasVisitedIntro", "true");
        setIsAnimating(false);
        window.dispatchEvent(new Event("introComplete"));
        clearTimeout(fallbackTimeout);
      };

      const tl = gsap.timeline({
        onComplete: completeIntro,
      });

      // Hard failsafe: force complete after 12 seconds no matter what
      fallbackTimeout = setTimeout(completeIntro, 12000);

      if (isReturning || prefersReducedMotion) {
        // Reduced motion / Returning visitor fallback
        tl.fromTo(".logo-svg", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" })
          .fromTo(".logo-text-group", { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4")
          .to(containerRef.current, { opacity: 0, duration: 0.6, delay: 0.2, ease: "power2.inOut" });
      } else {
        // --- 1. SETUP ---
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
        gsap.set(".logo-mandala-boundary path", { strokeDasharray: 300, strokeDashoffset: 300 });
        gsap.set(".logo-boundary-interrupt", { strokeDasharray: 20, strokeDashoffset: 20 });
        gsap.set(".logo-mandala-details *", { strokeDasharray: 80, strokeDashoffset: 80 });
        gsap.set(".logo-final-dot", { scale: 0, opacity: 0, transformOrigin: "center" });
        
        gsap.set(".logo-brand-name", { opacity: 0, letterSpacing: "0.4em" });
        gsap.set(".logo-brand-line", { scaleX: 0 });
        gsap.set(".logo-artist-name", { opacity: 0 });
        gsap.set(".logo-artist-line", { scaleX: 0 });

        // --- 1. OPENING — PURE DARKNESS (0.0s - 0.5s) ---
        tl.to(".intro-atmosphere", { opacity: 1, duration: 0.5, ease: "power1.inOut" });

        // --- 2. THE FIRST DOT & LINE (0.5s - 1.2s) ---
        tl.to(".logo-start-dot", { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)" });
        tl.to(".logo-first-stroke path", { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" }, "-=0.1");
        
        // --- 3. BOTANICAL GROWTH (1.2s - 1.8s) ---
        tl.to(".logo-leaf-stem path", { strokeDashoffset: 0, duration: 0.4, stagger: 0.1, ease: "sine.inOut" }, "-=0.2");
        tl.to(".logo-leaf-outline path", { strokeDashoffset: 0, duration: 0.4, stagger: 0.1, ease: "sine.inOut" }, "-=0.2");
        tl.to(".logo-leaf-interior path", { strokeDashoffset: 0, duration: 0.3, stagger: 0.05, ease: "sine.out" }, "-=0.2");

        // --- 4. MANDALA FORMATION (1.8s - 2.8s) ---
        tl.to(".logo-s-curve path", { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut" }, "-=0.1");
        tl.to(".logo-mandala-boundary path", { strokeDashoffset: 0, duration: 0.6, stagger: 0.1, ease: "power2.inOut" }, "-=0.2");
        tl.to(".logo-boundary-interrupt", { strokeDashoffset: 0, duration: 0.3, stagger: 0.05, ease: "power1.out" }, "-=0.3");
        tl.to(".logo-mandala-details *", { strokeDashoffset: 0, duration: 0.4, stagger: 0.05, ease: "power1.out" }, "-=0.3");
        tl.to(".logo-petal-outer path", { strokeDashoffset: 0, duration: 0.5, stagger: 0.1, ease: "power1.inOut" }, "-=0.5");
        tl.to(".logo-petal-inner path", { strokeDashoffset: 0, duration: 0.4, stagger: 0.1, ease: "power1.inOut" }, "-=0.4");
        tl.to(".logo-petal-veins path", { strokeDashoffset: 0, duration: 0.3, stagger: 0.05, ease: "power1.out" }, "-=0.3");

        // --- 5. THE HAND REVEAL (2.8s - 3.5s) ---
        tl.to(".logo-hand path", { 
          strokeDashoffset: 0, 
          duration: 0.7, 
          stagger: { each: 0.1, from: "start" }, 
          ease: "sine.inOut" 
        }, "-=0.2");
        tl.to(".logo-hand-detail-large", { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, "-=0.2");
        tl.to(".logo-hand-detail-medium", { strokeDashoffset: 0, duration: 0.3, ease: "power1.out" }, "-=0.2");
        tl.to(".logo-hand-detail-fine path", { strokeDashoffset: 0, duration: 0.3, stagger: 0.05, ease: "sine.out" }, "-=0.2");
        tl.to(".logo-hand-detail-dots circle", { scale: 1, opacity: 1, duration: 0.2, stagger: 0.05, ease: "back.out(2)" }, "-=0.2");

        // --- 6. FINAL DOT & BRAND TYPOGRAPHY (3.5s - 4.2s) ---
        tl.to(".logo-final-dot", { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" });
        
        // Brand name reveals simultaneously
        tl.to(".logo-brand-line", { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, "-=0.2");
        tl.to(".logo-brand-name", { opacity: 1, letterSpacing: "0.2em", duration: 0.8, ease: "power3.out" }, "-=0.3");
        tl.to(".logo-artist-line", { scaleX: 1, duration: 0.4, ease: "power2.inOut", stagger: 0.1 }, "-=0.4");
        tl.to(".logo-artist-name", { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.3");

        // --- 7. FINAL HOLD & GOLDEN FLOW (0.7s hold) ---
        tl.add("hold", "+=0.7");

        // Subtle warm gold catchlight travels through the mandala
        tl.to(".logo-svg", { 
          filter: "drop-shadow(0px 0px 12px rgba(201, 154, 74, 0.6))", 
          duration: 0.8, 
          yoyo: true, 
          repeat: 1,
          ease: "sine.inOut" 
        }, "hold");

        // The final dot pulses once, sending a ripple
        tl.to(".logo-final-dot", { 
          scale: 1.8, 
          opacity: 0.5, 
          duration: 0.4, 
          yoyo: true, 
          repeat: 1,
          ease: "power2.out"
        }, "hold+=0.2");

        // --- 8. MANDALA EXPANDS TO WEBSITE (Doorway Effect) ---
        // Outer boundaries scale up massively to frame the screen
        tl.to(".logo-mandala-boundary path", { 
          scale: 18, 
          strokeWidth: 0.02, 
          duration: 1.8, 
          ease: "power3.inOut", 
          transformOrigin: "center" 
        }, "hold+=0.5");
        
        // Interior elements fade and scale slightly to dissolve into the hero
        tl.to(".logo-s-curve path, .logo-hand, .logo-lotus, .logo-leaves, .logo-first-stroke", { 
          scale: 1.5, 
          opacity: 0, 
          duration: 1.4, 
          ease: "power3.inOut", 
          transformOrigin: "center" 
        }, "hold+=0.5");

        // Typography gently reduces in scale/opacity while hero text appears underneath
        tl.to(".logo-text-group", { 
          scale: 0.95, 
          opacity: 0, 
          duration: 1.2, 
          ease: "power2.inOut" 
        }, "hold+=0.5");
        
        // --- 9. ORGANIC BACKGROUND REVEAL ---
        // Cut a growing transparent hole in the intro overlay to reveal the homepage
        let maskObj = { size: 0 };
        tl.to(maskObj, {
          size: 150,
          duration: 1.8,
          ease: "power3.inOut",
          onUpdate: () => {
            if (containerRef.current) {
              const size = maskObj.size;
              const edge = size + 15; // Soft organic edge
              containerRef.current.style.webkitMaskImage = `radial-gradient(circle, transparent ${size}%, rgba(0,0,0,1) ${edge}%)`;
              containerRef.current.style.maskImage = `radial-gradient(circle, transparent ${size}%, rgba(0,0,0,1) ${edge}%)`;
            }
          }
        }, "hold+=0.6");
        
        // Final safety fade to ensure completely unblocked interaction
        tl.to(containerRef.current, { 
          opacity: 0, 
          duration: 0.4 
        }, "hold+=2.2");

      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!isAnimating) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070403] overflow-hidden pointer-events-none"
    >
      {/* Scene 1: Absolute Black / Deep Brown Atmosphere */}
      <div className="intro-atmosphere opacity-0 absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1A0D07_0%,_transparent_80%)] opacity-80" />
        {/* Subtle dust/noise */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] mix-blend-overlay" />
      </div>

      <div ref={logoContainerRef} className="relative flex flex-col items-center justify-center text-gold drop-shadow-lg z-10 w-full max-w-[200px] md:max-w-[300px]">
        {/* The SVG Logo */}
        <HandMandalasLogo />
      </div>
    </div>
  );
}
