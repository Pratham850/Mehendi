"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { siteImages } from "@/lib/siteImages";
import gsap from "gsap";

const categories = ["ALL", "BRIDAL", "ARABIC", "INDO-ARABIC", "MINIMAL", "PARTY", "FEET", "CUSTOM"];

const renderBorder = (category: string) => {
  switch (category) {
    case "BRIDAL":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" preserveAspectRatio="none" fill="none" stroke="var(--gold)" strokeWidth="0.5">
           <path d="M 50,0 C 70,20 100,50 100,50 C 100,50 70,80 50,100 C 30,80 0,50 0,50 C 0,50 30,20 50,0 Z" strokeDasharray="400" strokeDashoffset="400" className="group-hover:animate-[drawBorder_1.5s_ease-out_forwards]" />
           <circle cx="50" cy="50" r="40" strokeDasharray="300" strokeDashoffset="300" className="group-hover:animate-[drawBorder_1s_ease-out_forwards]" style={{ animationDelay: '0.5s' }} />
        </svg>
      );
    case "ARABIC":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" preserveAspectRatio="none" fill="none" stroke="var(--gold)" strokeWidth="0.5">
          <path d="M 0,100 Q 50,50 100,0" strokeDasharray="200" strokeDashoffset="200" className="group-hover:animate-[drawBorder_1s_ease-out_forwards]" />
          <path d="M 50,50 Q 80,70 100,100" strokeDasharray="200" strokeDashoffset="200" className="group-hover:animate-[drawBorder_1s_ease-out_forwards]" style={{ animationDelay: '0.5s' }} />
          <path d="M 50,50 Q 20,30 0,0" strokeDasharray="200" strokeDashoffset="200" className="group-hover:animate-[drawBorder_1s_ease-out_forwards]" style={{ animationDelay: '0.5s' }} />
        </svg>
      );
    case "MINIMAL":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" preserveAspectRatio="none" fill="none" stroke="var(--gold)" strokeWidth="0.5">
          <rect x="10" y="10" width="80" height="80" strokeDasharray="400" strokeDashoffset="400" className="group-hover:animate-[drawBorder_1s_ease-out_forwards]" />
        </svg>
      );
    case "FEET":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" preserveAspectRatio="none" fill="none" stroke="var(--gold)" strokeWidth="0.5">
          <path d="M 0,90 Q 25,80 50,90 T 100,90" strokeDasharray="200" strokeDashoffset="200" className="group-hover:animate-[drawBorder_1s_ease-out_forwards]" />
          <circle cx="25" cy="85" r="2" fill="var(--gold)" className="opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-500" />
          <circle cx="75" cy="85" r="2" fill="var(--gold)" className="opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-500" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" preserveAspectRatio="none" fill="none" stroke="var(--gold)" strokeWidth="0.5">
          <path d="M 0,20 C 10,10 10,10 20,0" strokeDasharray="50" strokeDashoffset="50" className="group-hover:animate-[drawBorder_1s_ease-out_forwards]" />
          <path d="M 80,0 C 90,10 90,10 100,20" strokeDasharray="50" strokeDashoffset="50" className="group-hover:animate-[drawBorder_1s_ease-out_forwards]" />
          <path d="M 100,80 C 90,90 90,90 80,100" strokeDasharray="50" strokeDashoffset="50" className="group-hover:animate-[drawBorder_1s_ease-out_forwards]" />
          <path d="M 20,100 C 10,90 10,90 0,80" strokeDasharray="50" strokeDashoffset="50" className="group-hover:animate-[drawBorder_1s_ease-out_forwards]" />
        </svg>
      );
  }
};

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const filterContainerRef = useRef<HTMLDivElement>(null);

  const filteredItems = siteImages.portfolio.filter(
    (item) => activeCategory === "ALL" || item.category === activeCategory
  );

  const handleCategoryChange = (cat: string) => {
    if (cat === activeCategory || isTransitioning) return;
    setIsTransitioning(true);
    
    // Animate old items out into a "Mehendi dot" (Rule 20)
    gsap.to(".portfolio-item", {
      scale: 0,
      opacity: 0,
      borderRadius: "50%",
      duration: 0.6,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        // Create the flower bloom effect in the center
        const bloom = document.createElement("div");
        bloom.className = "absolute inset-0 flex items-center justify-center z-50 pointer-events-none";
        bloom.innerHTML = `
          <svg viewBox="0 0 100 100" class="w-32 h-32" fill="none" stroke="var(--gold)" stroke-width="1">
             <circle cx="50" cy="50" r="0" class="bloom-circle" />
             <path d="M50 50 C 40 20, 60 20, 50 50" class="bloom-petal" />
             <path d="M50 50 C 80 40, 80 60, 50 50" class="bloom-petal" />
             <path d="M50 50 C 60 80, 40 80, 50 50" class="bloom-petal" />
             <path d="M50 50 C 20 60, 20 40, 50 50" class="bloom-petal" />
          </svg>
        `;
        if (filterContainerRef.current) {
          filterContainerRef.current.appendChild(bloom);
          
          gsap.timeline({
            onComplete: () => {
              bloom.remove();
              setActiveCategory(cat);
              setIsTransitioning(false);
            }
          })
          .to(".bloom-circle", { attr: { r: 5 }, duration: 0.3 })
          .fromTo(".bloom-petal", 
            { strokeDasharray: 50, strokeDashoffset: 50 },
            { strokeDashoffset: 0, duration: 0.5, stagger: 0.1 }
          )
          .to(bloom, { opacity: 0, scale: 2, duration: 0.4 }, "+=0.2");
        } else {
          setActiveCategory(cat);
          setIsTransitioning(false);
        }
      }
    });
  };

  // 3D Perspective Mouse Tilt (Rule 17)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -3; // max 3 degrees
    const rotateY = ((x - centerX) / centerX) * 3;

    gsap.to(e.currentTarget, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.5
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
      duration: 0.5
    });
  };

  return (
    <section id="work" className="py-32 px-4 md:px-8 lg:px-12 bg-[#0a0807] relative z-10 overflow-hidden">
      <div className="absolute top-20 left-6 md:left-12 z-20 font-sans text-xs tracking-widest text-gold/60 uppercase">
        03 — THE COLLECTION
      </div>
      
      <div className="max-w-[1400px] mx-auto mt-16" ref={filterContainerRef}>
        <h2 className="text-center font-serif text-4xl md:text-6xl text-foreground mb-16">
          Selected Works
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-6 mb-16 relative z-30">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={cn(
                "relative text-xs tracking-widest uppercase transition-colors duration-500 pb-2",
                activeCategory === cat 
                  ? "text-gold" 
                  : "text-foreground/40 hover:text-foreground"
              )}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold/50"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[300px] relative z-20"
        >
          <AnimatePresence mode="popLayout">
            {!isTransitioning && filteredItems.map((item, i) => {
              // Alternate reveal variants based on index
              const revealVariants = [
                { initial: { clipPath: "circle(0% at 50% 50%)" }, animate: { clipPath: "circle(100% at 50% 50%)" } },
                { initial: { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }, animate: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" } },
                { initial: { clipPath: "inset(50% 50% 50% 50%)" }, animate: { clipPath: "inset(0% 0% 0% 0%)" } },
              ];
              const variant = revealVariants[i % revealVariants.length];

              return (
                <motion.div
                  layout
                  initial={variant.initial}
                  animate={variant.animate}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
                  key={item.id}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className={cn(
                    "portfolio-item relative group cursor-none will-change-transform",
                    item.type === "portrait" && "row-span-2",
                    item.type === "landscape" && "col-span-1 md:col-span-2",
                    item.type === "square" && "row-span-1 col-span-1"
                  )}
                  onClick={() => setSelectedImage(item.src)}
                  data-cursor="view"
                >
                  {/* SVG Border that draws on hover */}
                  <div className="absolute inset-0 z-20 pointer-events-none p-4">
                    {renderBorder(item.category)}
                  </div>

                  <div className="w-full h-full relative overflow-hidden rounded-sm">
                    <div className="absolute inset-0 bg-[#2a1b12]" />
                    <motion.img
                      layoutId={`img-${item.src}`}
                      src={item.src}
                      alt={item.category}
                      className="w-full h-full object-cover transition-transform duration-[10000ms] ease-out group-hover:scale-105"
                    />
                    <div className="cinematic-image-layer z-10" />
                    
                    {/* Mobile Persistent Overlay */}
                    <div className="lg:hidden absolute inset-0 flex flex-col items-center justify-end pb-6 z-10 pointer-events-none drop-shadow-md">
                      <span className="text-gold text-[10px] tracking-widest uppercase bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                        {item.category}
                      </span>
                    </div>

                    {/* Desktop Hover Overlay */}
                    <div className="hidden lg:flex absolute inset-0 transition-opacity duration-700 flex-col items-center justify-end pb-8 opacity-0 group-hover:opacity-100 z-10 pointer-events-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                      <span className="text-gold text-xs tracking-widest uppercase mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                        {item.category}
                      </span>
                      <span className="text-foreground font-serif italic text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out delay-75 drop-shadow-md">
                        View Design
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Cinematic Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-foreground/50 hover:text-gold transition-colors text-xs tracking-widest uppercase cursor-pointer z-50"
              onClick={() => setSelectedImage(null)}
            >
              Close
            </button>
            <div className="relative w-full max-w-6xl h-[90vh] p-4 flex items-center justify-center">
              <motion.img
                layoutId={`img-${selectedImage}`}
                src={selectedImage}
                alt="Selected Design"
                className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
              />
              <div className="cinematic-image-layer" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
