"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "About", href: "#artist" },
    { name: "Services", href: "#services" },
    { name: "Reviews", href: "#reviews" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out py-6 px-6 md:px-12",
          isScrolled
            ? "bg-[#0f0d0b]/40 backdrop-blur-md border-b border-gold/5 py-4"
            : "bg-transparent",
          isMenuOpen ? "bg-transparent backdrop-blur-none border-transparent" : ""
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-foreground font-serif tracking-widest text-xl uppercase relative z-50">
            AM.
          </div>
          
          <div className="hidden md:flex items-center space-x-10 text-xs tracking-widest uppercase text-foreground/80">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} data-cursor="hover" className="hover:text-gold transition-colors">
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="hidden md:block">
            <a href="#book" data-cursor="hover" className="text-xs tracking-widest uppercase text-gold border-b border-gold/30 pb-1 hover:border-gold transition-colors">
              Book
            </a>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-foreground relative z-50 p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-4 relative flex flex-col justify-between">
              <span className={cn("w-full h-[1px] bg-foreground transition-all duration-300", isMenuOpen ? "rotate-45 translate-y-[7.5px]" : "")} />
              <span className={cn("w-full h-[1px] bg-foreground transition-all duration-300", isMenuOpen ? "opacity-0" : "")} />
              <span className={cn("w-full h-[1px] bg-foreground transition-all duration-300", isMenuOpen ? "-rotate-45 -translate-y-[7.5px]" : "")} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.32, 0, 0.67, 0] }}
            className="fixed inset-0 z-40 bg-[#0a0807] flex flex-col justify-center px-8 md:hidden overflow-hidden"
          >
            {/* Background motif for menu */}
            <svg viewBox="0 0 100 100" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] opacity-5 pointer-events-none" fill="none" stroke="var(--gold)" strokeWidth="0.2">
              <circle cx="50" cy="50" r="40" />
              <circle cx="50" cy="50" r="30" strokeDasharray="2 2" />
              <path d="M50 0 C 60 30, 70 40, 50 50 C 30 40, 40 30, 50 0" />
              <path d="M100 50 C 70 60, 60 70, 50 50 C 60 30, 70 40, 100 50" />
            </svg>

            <div className="flex flex-col space-y-8 relative z-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
                  className="font-serif italic text-4xl text-foreground hover:text-gold transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#book"
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (navLinks.length * 0.1), duration: 0.5 }}
                className="font-sans text-xs tracking-[0.3em] uppercase text-gold pt-8 mt-8 border-t border-gold/10 inline-block w-max"
              >
                Book Appointment
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
