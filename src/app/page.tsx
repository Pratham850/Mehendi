import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import TheArt from "@/components/sections/TheArt";
import ArtistSection from "@/components/sections/ArtistSection";
import TheArtInMotion from "@/components/sections/TheArtInMotion";
import Stats from "@/components/sections/Stats";
import StyleExplorer from "@/components/sections/StyleExplorer";
import Portfolio from "@/components/sections/Portfolio";
import TheDetails from "@/components/sections/TheDetails";
import Signature from "@/components/sections/Signature";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Booking from "@/components/sections/Booking";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <TheArt />
      <ArtistSection />
      <TheArtInMotion />
      <Stats />
      <StyleExplorer />
      <Portfolio />
      <TheDetails />
      <Signature />
      <Services />
      <Testimonials />
      <Booking />
      <Footer />
    </main>
  );
}
