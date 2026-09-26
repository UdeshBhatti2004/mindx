"use client";

import { useMotionValue, useSpring, useTransform } from "framer-motion";
import Background from "../components/Background";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FloatingIcons from "../components/FloatingIcons";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection"
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import MapSection from "@/components/MapSection";

export default function Home() {
  /*
   * ---------------------------------------------------------
   * MOUSE PARALLAX (Shared across the whole page!)
   * ---------------------------------------------------------
   */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const rotateX = useTransform(springY, [-400, 400], [3, -3]);
  const rotateY = useTransform(springX, [-400, 400], [-3, 3]);

  const glowX = useTransform(springX, [-500, 500], [-70, 70]);
  const glowY = useTransform(springY, [-500, 500], [-70, 70]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  function resetMouse() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <main
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouse}
      className="relative min-h-screen w-full overflow-hidden bg-[#080808] text-white selection:bg-[#ff7a00]/30"
    >
      {/* Background glow follows your mouse everywhere on the site */}
      <Background glowX={glowX} glowY={glowY} />
      
      {/* Floating Navbar */}
      <Navbar />

      {/* --- SECTION 1: HOME --- */}
      <section id="home" className="relative flex min-h-screen w-full items-center justify-center px-4 sm:px-6 md:px-8">
        <FloatingIcons />
        <Hero rotateX={rotateX} rotateY={rotateY} />
      </section>

      {/* --- SECTION 2: ABOUT --- */}
      <AboutSection />

      {/* SECTION 3: SERVICES */}
      <ServicesSection />

      {/* SECTION 4: Contact */}
      <ContactSection/>

      
      {/* SECTION 5: Map */}
      <MapSection/>


      {/* SECTION 6: Footer */}
      <Footer/>

      {/* You can easily add <ServicesSection id="services" /> here later! */}
      
      {/* Spacer to allow scrolling past the About section so you can see it work */}
      <div className="h-[20vh]" /> 
    </main>
  );
}