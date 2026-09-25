"use client";

import Link from "next/link";
import HandMandalasLogo from "@/components/ui/HandMandalasLogo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground selection:bg-gold/30 selection:text-white p-6 text-center">
      <div className="max-w-md w-full space-y-8 flex flex-col items-center">
        <HandMandalasLogo className="mb-4" iconOnly />
        
        <div className="space-y-4">
          <h2 className="font-serif text-3xl text-gold">404 - Journey Paused</h2>
          <p className="font-sans text-sm text-foreground/80 leading-relaxed">
            The page you are looking for has faded like old henna, or perhaps never existed.
          </p>
        </div>

        <div className="pt-4 w-full">
          <Link
            href="/"
            className="inline-flex w-full sm:w-auto px-8 py-3 bg-gold text-background hover:bg-gold/90 transition-colors duration-300 font-sans text-xs tracking-widest uppercase justify-center"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
