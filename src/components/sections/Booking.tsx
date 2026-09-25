"use client";

import { artistConfig } from "@/lib/config";
import { useState } from "react";

export default function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    event: "",
    date: "",
    location: "",
    style: "Bridal"
  });

  const handleWhatsApp = () => {
    const text = `Hello ${artistConfig.artistName}, I would like to inquire about a booking.\n\nName: ${formData.name || "[My Name]"}\nEvent: ${formData.event || "[Event Type]"}\nDate: ${formData.date || "[Date]"}\nLocation: ${formData.location || "[Location]"}\nStyle: ${formData.style}`;
    const url = `https://wa.me/${artistConfig.contact.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="book" className="py-32 px-6 md:px-12 bg-[#0D0A08] relative z-10 border-t border-gold/10">
      {/* Subtle Mehendi background ornament */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden flex items-center justify-center">
        <svg width="800" height="800" viewBox="0 0 100 100" fill="none" stroke="var(--gold)" strokeWidth="0.2">
           <circle cx="50" cy="50" r="45" />
           <circle cx="50" cy="50" r="35" strokeDasharray="1 1" />
           <path d="M50 5 C 80 40, 95 50, 95 50 C 95 50, 80 60, 50 95 C 50 95, 20 60, 5 50 C 5 50, 20 40, 50 5 Z" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
        {/* Terminus of the continuous scroll line */}
        <div className="w-2 h-2 bg-henna rounded-full mb-16 animate-pulse shadow-[0_0_15px_var(--henna)]" />

        <div className="text-center mb-16 w-full">
          <h2 className="font-serif text-4xl md:text-6xl text-foreground mb-6">
            Let&apos;s create<br/>something beautiful.
          </h2>
          <p className="text-foreground/70 font-light">
            Please provide your details below to check availability.
          </p>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group relative">
              <input type="text" placeholder="Your Name" className="w-full bg-transparent border-b border-foreground/10 py-4 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-gold transition-colors duration-500 text-sm tracking-[0.2em] uppercase font-light"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="group relative">
              <input type="text" placeholder="Event Type" className="w-full bg-transparent border-b border-foreground/10 py-4 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-gold transition-colors duration-500 text-sm tracking-[0.2em] uppercase font-light"
                value={formData.event} onChange={e => setFormData({...formData, event: e.target.value})}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group relative">
              <input type="date" className="w-full bg-transparent border-b border-foreground/10 py-4 text-foreground/50 focus:text-foreground focus:outline-none focus:border-gold transition-colors duration-500 text-sm tracking-[0.2em] uppercase font-light"
                value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="group relative">
              <input type="text" placeholder="Location" className="w-full bg-transparent border-b border-foreground/10 py-4 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-gold transition-colors duration-500 text-sm tracking-[0.2em] uppercase font-light"
                value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>

          <div className="group relative">
            <select className="w-full bg-transparent border-b border-foreground/10 py-4 text-foreground/70 focus:text-foreground focus:outline-none focus:border-gold transition-colors duration-500 text-sm tracking-[0.2em] uppercase font-light appearance-none"
              value={formData.style} onChange={e => setFormData({...formData, style: e.target.value})}
            >
              <option value="Bridal" className="bg-[#0D0A08]">Bridal Canvas</option>
              <option value="Arabic" className="bg-[#0D0A08]">Arabic Vine</option>
              <option value="Minimal" className="bg-[#0D0A08]">Minimalist Form</option>
              <option value="Custom" className="bg-[#0D0A08]">Bespoke Creation</option>
            </select>
          </div>

          <div className="pt-12 flex flex-col md:flex-row gap-6 justify-center items-center">
            <button className="w-full md:w-auto px-12 py-4 bg-transparent border border-gold/40 text-foreground text-xs tracking-widest uppercase hover:border-gold transition-colors duration-500 rounded-sm">
              Send Email Inquiry
            </button>
            <button 
              onClick={handleWhatsApp}
              className="w-full md:w-auto px-12 py-4 bg-gold text-[#0D0A08] text-xs tracking-widest uppercase font-medium hover:bg-[#E0BD78] transition-colors duration-500 rounded-sm flex items-center justify-center gap-3"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Book via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
