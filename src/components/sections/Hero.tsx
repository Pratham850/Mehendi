"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { siteImages } from "@/lib/siteImages";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const textSvgRef = useRef<SVGSVGElement>(null);
  const vineSvgRef = useRef<SVGSVGElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  // Mouse Parallax Effect
  useEffect(() => {
    if (!mounted || !imageContainerRef.current) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20; // max 20px movement
      const yPos = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(".parallax-bg", { x: xPos * 0.2, y: yPos * 0.2, duration: 1, ease: "power2.out" });
      gsap.to(".parallax-img", { x: xPos * -0.5, y: yPos * -0.5, duration: 1, ease: "power2.out" });
      gsap.to(".parallax-ornament", { x: xPos * -1.5, y: yPos * -1.5, duration: 1, ease: "power2.out" });
      gsap.to(".parallax-particles", { x: xPos * -2, y: yPos * -2, duration: 1, ease: "power2.out" });
      gsap.to(".parallax-text", { x: xPos * -0.1, y: yPos * -0.1, duration: 1, ease: "power2.out" });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mounted]);

  useEffect(() => {
    if (!mounted || !container.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      // 1. Initial fade-in of background structure
      tl.to(".hero-bg", { opacity: 1, duration: 1.5, ease: "power2.inOut" });

      // 2. Image mask reveal (organic tear/wipe)
      tl.fromTo(".hero-image-container", 
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" },
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 2.5, ease: "power4.inOut" },
        "-=1"
      );
      
      // Scale down image slightly while revealing for cinematic depth
      tl.fromTo(".hero-img", 
        { scale: 1.2 }, 
        { scale: 1, duration: 3, ease: "power3.out" }, 
        "-=2.5"
      );

      // SVG Vine Drawing (Digital merging into Real)
      if (vineSvgRef.current) {
        const vines = vineSvgRef.current.querySelectorAll(".hero-vine");
        gsap.set(vines, { strokeDasharray: 400, strokeDashoffset: 400 });
        tl.to(vines, {
          strokeDashoffset: 0,
          duration: 3,
          ease: "power2.inOut",
          stagger: 0.5,
        }, "-=2.5");
      }

      // 3. Eyebrow Text
      tl.from(".hero-eyebrow", {
        opacity: 0,
        y: 20,
        filter: "blur(5px)",
        duration: 1.5,
        ease: "power3.out"
      }, "-=1.5");

      // 4. SVG Text Drawing (Brand Name)
      const textLines = textSvgRef.current?.querySelectorAll("text");
      if (textLines) {
        gsap.set(textLines, { strokeDasharray: 800, strokeDashoffset: 800 });
        
        // Draw outline
        tl.from(textLines, {
          strokeDashoffset: 800,
          duration: 3,
          ease: "power2.inOut",
          stagger: 0.4,
        }, "-=1");

        // Fill in
        tl.from(textLines, {
          fillOpacity: 0,
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.2,
        }, "-=2");
      }

      // 5. Tagline
      tl.from(".hero-tagline", {
        opacity: 0,
        y: 20,
        duration: 1.5,
        ease: "power3.out"
      }, "-=1.5");

      // 6. Buttons appear
      tl.from(".hero-btn", {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }, "-=1");

      // Background rotating mandala (always running slowly)
      gsap.to(".hero-mandala", {
        rotate: 360,
        duration: 180,
        repeat: -1,
        ease: "none",
      });

      // Play on intro complete
      const handleIntroComplete = () => tl.play();
      
      if (sessionStorage.getItem("hasVisitedIntro") === "true") {
        setTimeout(() => tl.play(), 500);
      }
      
      window.addEventListener("introComplete", handleIntroComplete);
      return () => window.removeEventListener("introComplete", handleIntroComplete);
    }, container);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <section ref={container} className="relative w-full min-h-screen overflow-hidden bg-[#0D0A08] flex items-center">
      
      {/* Absolute Background Mandala */}
      <div className="hero-bg absolute inset-0 z-0 flex items-center justify-end pointer-events-none pr-0 md:-mr-[20vw]">
        <svg viewBox="0 0 100 100" className="hero-mandala w-[120vw] h-[120vw] md:w-[70vw] md:h-[70vw] max-w-none opacity-5" fill="none" stroke="var(--gold)" strokeWidth="0.1">
          <circle cx="50" cy="50" r="40" strokeDasharray="1 2" />
          <circle cx="50" cy="50" r="30" />
          {Array.from({ length: 24 }).map((_, i) => (
            <path key={i} d="M50 20 C60 10, 60 10, 50 0 C40 10, 40 10, 50 20" transform={`rotate(${i * 15} 50 50)`} />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <path key={i} d="M50 30 C55 20, 55 20, 50 10 C45 20, 45 20, 50 30" transform={`rotate(${i * 30} 50 50)`} />
          ))}
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-32 flex flex-col md:flex-row items-center gap-12 lg:gap-20 min-h-screen">
        
        {/* LEFT 45%: Typography and Brand */}
        <div className="parallax-text w-full md:w-[45%] flex flex-col justify-center items-start pt-20 md:pt-0">
          
          <div className="hero-eyebrow text-gold text-xs tracking-[0.3em] uppercase mb-8">
            Art On Hands · Stories On Skin
          </div>

          <div className="w-full max-w-xl aspect-[2/1] relative mb-10">
            <svg
              ref={textSvgRef}
              viewBox="0 0 600 300"
              className="w-full h-full drop-shadow-2xl overflow-visible"
              preserveAspectRatio="xMinYMid meet"
            >
              <text x="0" y="45%" textAnchor="start" className="font-serif italic text-[clamp(3.5rem,15vw,8rem)]" stroke="var(--foreground)" strokeWidth="1.5" fill="var(--foreground)">
                HAND
              </text>
              <text x="0" y="95%" textAnchor="start" className="font-serif italic text-[clamp(3.5rem,15vw,8rem)] text-gold" stroke="var(--gold)" strokeWidth="1.5" fill="var(--gold)">
                MANDALAS
              </text>
            </svg>
          </div>

          <p className="hero-tagline font-sans text-xs md:text-sm tracking-[0.3em] text-foreground/80 uppercase mb-16 leading-loose max-w-md">
            More than Mehendi,<br />it&apos;s your story.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <a href="#work" data-cursor="hover" className="hero-btn group relative px-10 py-4 text-xs md:text-sm tracking-widest text-foreground border border-gold/40 hover:border-gold transition-all duration-700 rounded-sm text-center">
              <span className="relative z-10 uppercase">Explore My Work</span>
            </a>
            <a href="#book" data-cursor="book" className="hero-btn group relative px-10 py-4 text-xs md:text-sm tracking-widest text-[#0D0A08] bg-gold hover:bg-[#E0BD78] transition-all duration-700 hover:scale-[1.02] rounded-sm text-center">
              <span className="relative z-10 uppercase font-medium">Book Your Mehendi</span>
            </a>
          </div>
        </div>

        {/* RIGHT 55%: Cinematic Mehendi Image */}
        <div className="w-full md:w-[55%] h-[60vh] md:h-[85vh] relative flex items-center justify-end">
          <div ref={imageContainerRef} className="hero-image-container w-full h-full relative overflow-hidden rounded-sm hide-cursor" data-cursor="view">
            
            {/* Layer 1: Dark Base */}
            <div className="parallax-bg absolute inset-0 bg-[#050403] z-0" />
            
            {/* Layer 2: Hero Photograph with Cinematic Filter */}
            <img
              src={siteImages.hero.main}
              alt="Cinematic Mehendi Art"
              className="parallax-img hero-img absolute inset-0 w-[110%] h-[110%] -top-[5%] -left-[5%] object-cover z-10"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
            />
            <div className="cinematic-image-layer z-10" />

            {/* Layer 3: Subtle blurred duplicate for glow depth */}
            <img
              src={siteImages.hero.main}
              alt=""
              className="parallax-img absolute inset-0 w-[110%] h-[110%] -top-[5%] -left-[5%] object-cover z-10 opacity-30 blur-2xl mix-blend-screen"
            />
            
            {/* Layer 4: Animated Mehendi Vine merging into Hand */}
            <div className="parallax-ornament absolute inset-0 z-20 pointer-events-none mix-blend-screen opacity-60">
               <svg ref={vineSvgRef} viewBox="0 0 200 200" className="w-full h-full" fill="none" stroke="var(--gold)" strokeWidth="0.8">
                 {/* Vine starting from top-left, moving toward center-right */}
                 <path className="hero-vine" d="M -20,20 C 40,30 60,80 120,100 C 150,110 160,130 180,140" />
                 {/* Branch and flower */}
                 <path className="hero-vine" d="M 120,100 C 130,80 140,80 145,90" />
                 <circle className="hero-vine" cx="145" cy="90" r="3" />
                 <circle className="hero-vine" cx="145" cy="90" r="6" strokeDasharray="1 2" />
                 <path className="hero-vine" d="M 145,84 C 145,75 155,75 155,85 C 155,95 145,95 145,84" />
               </svg>
            </div>

            {/* Layer 5: Light Sweep */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden mix-blend-soft-light opacity-50">
               <div className="w-[200%] h-full absolute -left-1/2 top-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-45 translate-x-[-100%] animate-[sweep_8s_ease-in-out_infinite]" />
            </div>

            {/* Layer 6: Animated Particles */}
            <div className="parallax-particles absolute inset-0 z-30 pointer-events-none opacity-40">
              <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gold rounded-full animate-pulse shadow-[0_0_15px_var(--gold)]" />
              <div className="absolute top-3/4 left-1/3 w-1.5 h-1.5 bg-gold rounded-full animate-pulse shadow-[0_0_15px_var(--gold)]" style={{ animationDelay: '2s' }} />
              <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-henna rounded-full animate-pulse shadow-[0_0_15px_var(--henna)]" style={{ animationDelay: '1s' }} />
            </div>
            
            {/* Layer 7: Fine Golden Border */}
            <div className="absolute inset-4 border border-gold/30 z-30 pointer-events-none rounded-sm" />
          </div>
        </div>
        
      </div>
      
      {/* Anchor for the continuous scroll line */}
      <div id="hero-bottom" className="absolute bottom-0 left-0 w-full h-1" />
    </section>
  );
}
