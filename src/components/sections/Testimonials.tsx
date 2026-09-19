"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteImages } from "@/lib/siteImages";
import gsap from "gsap";

const testimonials = [
  {
    quote: "Every detail was perfect. The design was even more beautiful than I imagined, and it lasted perfectly through the entire wedding week.",
    name: "Priya Sharma",
    role: "Bride",
    image: siteImages.testimonials.t1
  },
  {
    quote: "Her artistry is unmatched. The patience and precision she brings to her craft made the entire experience feel so calm and luxurious.",
    name: "Aisha Khan",
    role: "Bride",
    image: siteImages.testimonials.t2
  },
  {
    quote: "Not just a mehendi artist, but a true creative. She understood my vision for a modern, minimal design and executed it flawlessly.",
    name: "Sarah Jenkins",
    role: "Client",
    image: siteImages.testimonials.t3
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" ref={containerRef} className="py-32 px-6 md:px-12 bg-background relative z-10 overflow-hidden border-t border-gold/10">
      <div className="absolute top-20 left-6 md:left-12 z-20 font-sans text-xs tracking-widest text-gold/60 uppercase">
        05 — YOUR STORY
      </div>
      <h2 className="text-center text-xs tracking-widest text-gold uppercase mb-16 relative z-10 mt-16">Kind Words</h2>
      
      <div className="max-w-6xl mx-auto h-auto min-h-[50vh] flex flex-col items-center justify-center relative">
        <div className="text-gold opacity-5 font-serif text-[15rem] leading-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 pointer-events-none select-none z-0">
          &quot;
        </div>

        <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 min-h-[400px]">
          {/* Image Side with Mask Transition */}
          <div className="w-48 h-48 md:w-64 md:h-64 relative shrink-0">
            {/* SVG line that redraws the mask frame */}
            <div className="absolute inset-[-10px] pointer-events-none z-20 opacity-60">
               <svg key={`mask-${currentIndex}`} viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="var(--gold)" strokeWidth="0.5">
                 <path 
                   d="M 50,0 C 100,0 100,50 100,50 C 100,100 50,100 50,100 C 0,100 0,50 0,50 C 0,0 50,0 50,0 Z" 
                   strokeDasharray="400" 
                   strokeDashoffset="400"
                   className="animate-[drawBorder_1.5s_ease-out_forwards]"
                 />
                 <circle cx="50" cy="50" r="48" strokeDasharray="300" strokeDashoffset="300" className="animate-[drawBorder_2s_ease-out_forwards]" style={{ animationDelay: '0.5s' }} />
               </svg>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ clipPath: "circle(0% at 50% 50%)", opacity: 0 }}
                animate={{ clipPath: "circle(50% at 50% 50%)", opacity: 1 }}
                exit={{ clipPath: "circle(0% at 50% 50%)", opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute inset-0 z-10 rounded-full overflow-hidden"
              >
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name}
                  className="w-[120%] h-[120%] -top-[10%] -left-[10%] absolute object-cover"
                />
                <div className="cinematic-image-layer z-10" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Text Side */}
          <div className="w-full max-w-2xl text-center md:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <p className="font-serif italic text-xl md:text-4xl text-foreground leading-relaxed mb-8">
                  &quot;{testimonials[currentIndex].quote}&quot;
                </p>
                <div className="flex flex-col gap-1">
                  <span className="text-sm tracking-widest text-gold uppercase">
                    &mdash; {testimonials[currentIndex].name}
                  </span>
                  <span className="text-xs text-foreground/50 uppercase tracking-widest">
                    {testimonials[currentIndex].role}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        <div className="flex gap-4 mt-16 z-20">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 cursor-none ${
                i === currentIndex ? "bg-gold scale-150" : "bg-gold/30 hover:bg-gold/60"
              }`}
              data-cursor="hover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
