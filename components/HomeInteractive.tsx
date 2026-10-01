"use client";

import { useMotionValue, useSpring, useTransform } from "framer-motion";

import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FloatingIcons from "@/components/FloatingIcons";

export default function HomeInteractive() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 80,
    damping: 20,
  });

  const springY = useSpring(mouseY, {
    stiffness: 80,
    damping: 20,
  });

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
    <>
      <Background glowX={glowX} glowY={glowY} />

      <Navbar />

      <section
        id="home"
        className="relative flex w-full items-start justify-center px-4 pt-20 sm:px-6 sm:pt-24 md:px-8"
        onMouseMove={handleMouseMove}
        onMouseLeave={resetMouse}
      >
        <FloatingIcons />

        <Hero
          rotateX={rotateX}
          rotateY={rotateY}
        />
      </section>
    </>
  );
}