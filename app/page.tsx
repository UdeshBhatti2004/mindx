import Preloader from "@/components/Preloader";

import HomeInteractive from "@/components/HomeInteractive";

import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#080808] text-white selection:bg-[#ff7a00]/30">
      <Preloader />

      <HomeInteractive />

      <AboutSection />

      <ServicesSection />

      <ContactSection />

      <MapSection />

      <Footer />
    </main>
  );
}