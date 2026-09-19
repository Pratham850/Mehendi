import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import CinematicLoader from "@/components/ui/CinematicLoader";
import MehendiTrail from "@/components/ui/MehendiTrail";
import MehendiScrollLine from "@/components/ui/MehendiScrollLine";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cussent Mayya's Mehendi | Luxury Mehendi Artist",
  description: "Bespoke Mehendi artistry for the modern bride. Cinematic, elegant, and timeless.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} antialiased`}>
      <body className="font-sans selection:bg-gold/30 selection:text-white">
        <SmoothScroll>
          <CinematicLoader />
          <CustomCursor />
          <MehendiTrail />
          <MehendiScrollLine />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
