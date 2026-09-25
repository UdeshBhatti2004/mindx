"use client";

import { motion, MotionValue } from "framer-motion";

interface BackgroundProps {
  glowX: MotionValue<number>;
  glowY: MotionValue<number>;
}

export default function Background({ glowX, glowY }: BackgroundProps) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,0.8) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.8) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "clamp(45px, 6vw, 90px) clamp(45px, 6vw, 90px)",
        }}
      />

      {/* orange ambient glow */}
      <motion.div
        style={{
          x: glowX,
          y: glowY,
        }}
        className="
          absolute
          left-1/2
          top-[48%]
          h-[250px]
          w-[250px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#ff7a00]/[0.055]
          blur-[100px]
          sm:h-[350px]
          sm:w-[350px]
          lg:h-[450px]
          lg:w-[450px]
        "
      />
    </div>
  );
}