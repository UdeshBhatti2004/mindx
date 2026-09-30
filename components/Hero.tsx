"use client";

import { motion, MotionValue } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface HeroProps {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
}

export default function Hero({ rotateX, rotateY }: HeroProps) {
  return (
    // Replaced the fragment <></> with a flex container to handle spacing naturally
    <div className="flex w-full flex-col items-center justify-center pt-10 sm:pt-24 md:pt-24">
      
      {/* 3D PARALLAX CONTAINER */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative z-30 flex w-full max-w-4xl flex-col items-center justify-center text-center [perspective:1000px]"
      >
        {/* TOP LABEL */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 flex items-center justify-center gap-3 sm:mb-8"
        >
          <span className="h-px w-6 bg-gradient-to-r from-transparent to-[#ff7a00] sm:w-10" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/50 sm:text-[10px]">
            Learn · Build · Grow
          </span>
          <span className="h-px w-6 bg-gradient-to-l from-transparent to-[#ff7a00] sm:w-10" />
        </motion.div>

        {/* MAIN HEADING */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(3.2rem,10vw,7.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-white/95"
        >
          Build your{" "}
          <span className="inline-block bg-gradient-to-br from-[#ff7a00] to-[#ffaa00] bg-clip-text pr-1 font-serif text-[0.9em] italic text-transparent drop-shadow-[0_0_25px_rgba(255,122,0,0.3)]">
            x
          </span>{" "}
          factor.
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mx-auto mt-6 max-w-[300px] text-[13px] leading-relaxed text-white/40 sm:mt-8 sm:max-w-md sm:text-sm md:text-base md:leading-relaxed"
        >
          A place to learn, explore and build skills for the future. Unlock your potential today.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 flex items-center justify-center gap-4 sm:mt-10"
        >
          <motion.a
            href="#services"
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 30px rgba(255,122,0,.25)",
            }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-full bg-[#ff7a00] px-6 py-3 text-[11px] font-semibold text-black transition-colors hover:bg-[#ff8a1a] sm:px-7 sm:py-3.5 sm:text-[13px]"
          >
            Explore Now
            <ArrowUpRight size={15} strokeWidth={2.5} />
          </motion.a>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/40 sm:h-12 sm:w-12"
          >
            <Sparkles size={16} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* BOTTOM LABEL - Now in normal document flow instead of absolute positioning */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-8 flex items-center justify-center gap-3 whitespace-nowrap opacity-60 sm:mt-12"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff7a00] shadow-[0_0_10px_rgba(255,122,0,0.8)]" />
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 sm:text-[10px]">
          Academic · Computer · Coding
        </span>
      </motion.div>
      
    </div>
  );
}