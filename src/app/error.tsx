"use client";

import { useEffect } from "react";
import Link from "next/link";
import HandMandalasLogo from "@/components/ui/HandMandalasLogo";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error("Next.js Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground selection:bg-gold/30 selection:text-white p-6 text-center">
      <div className="max-w-md w-full space-y-8 flex flex-col items-center">
        <HandMandalasLogo className="mb-4" iconOnly />
        
        <div className="space-y-4">
          <h2 className="font-serif text-3xl text-gold">A Gentle Interruption</h2>
          <p className="font-sans text-sm text-foreground/80 leading-relaxed">
            We apologize, but something unexpected happened while preparing this experience.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full pt-4">
          <button
            onClick={() => reset()}
            className="flex-1 px-6 py-3 border border-gold text-gold hover:bg-gold/10 transition-colors duration-300 font-sans text-xs tracking-widest uppercase"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="flex-1 px-6 py-3 bg-gold text-background hover:bg-gold/90 transition-colors duration-300 font-sans text-xs tracking-widest uppercase text-center flex items-center justify-center"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
