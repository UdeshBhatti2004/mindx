"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Skip the preloader if it already played earlier this session
    if (sessionStorage.getItem("mindx-preloaded")) {
      setIsLoading(false);
      setShouldRender(false);
      return;
    }

    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("mindx-preloaded", "true");
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          // Premium slide-up exit
          exit={{
            y: "-100%",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#050505]"
        >
          {/* Subtle ambient cinematic glow behind the logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full bg-[#ff7a00]/[0.05] blur-[100px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex flex-col items-center gap-5"
          >
            {/* LOGO & TAGLINE BLOCK */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 3.5, ease: "easeOut" }}
              className="flex flex-col items-center "
            >
              {/* Added brightness-110 to help the original image pop */}
              <Image
                src="/mindx-logo.png"
                alt="mindx"
                width={404}
                height={126}
                loading="eager"
                className="w-40 sm:w-56 h-auto object-contain drop-shadow-[0_0_25px_rgba(255,122,0,0.2)] brightness-110"
              />


            </motion.div>

            {/* SLEEK LOADING LINE */}
            <div className="h-[2px] w-32 sm:w-48 overflow-hidden rounded-full bg-white/5 mt-2">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut"
                }}
                className="h-full w-full rounded-full bg-gradient-to-r from-transparent via-[#ff7a00]/90 to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}