"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{
        lerp: 0.1, // Increased from 0.05 (makes it more responsive, less "sluggish")
        duration: 1.2, // Slightly faster base animation
        smoothWheel: true,
        wheelMultiplier: 1.2, // Speeds up the scroll wheel distance
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {/* Ignore React 19 type mismatch */}
      {children as any} 
    </ReactLenis>
  );
}