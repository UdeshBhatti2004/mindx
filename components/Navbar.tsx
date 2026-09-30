"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 pointer-events-none sm:px-6 md:pt-6">
        <motion.header
          layout
          className={`pointer-events-auto flex items-center justify-between rounded-full border transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled
            ? "h-16 w-full max-w-4xl border-white/10 bg-[#080808]/90 px-4 backdrop-blur-xl sm:px-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "h-20 w-full max-w-7xl border-transparent bg-transparent px-2 sm:px-4"
            }`}
        >
          {/* LOGO */}
          <a
            href="#home"
            className="relative z-50 flex shrink-0 items-center w-28 sm:w-44 md:w-48"
          >
            <Image
              src="/mindx-logo.png"
              alt="mindX Institute logo"
              width={866}
              height={288}
              priority
              className="w-full h-auto object-contain block drop-shadow-md"
            />
          </a>

          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-8 text-sm md:flex">
            <a href="#home" className={`transition-colors hover:text-white ${activeSection === "home" ? "font-medium text-white" : "text-white/50"}`}>
              Home
            </a>
            <a href="#about" className={`transition-colors hover:text-white ${activeSection === "about" ? "font-medium text-white" : "text-white/50"}`}>
              About
            </a>
            <a href="#services" className={`transition-colors hover:text-white ${activeSection === "services" ? "font-medium text-white" : "text-white/50"}`}>
              Services
            </a>
            <a href="#contact" className={`transition-colors hover:text-white ${activeSection === "contact" ? "font-medium text-white" : "text-white/50"}`}>
              Contact
            </a>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:flex h-10 lg:h-11 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-5 lg:px-6 text-xs sm:text-sm font-medium text-white transition-all hover:bg-white/10"
            >
              <span>Get Started</span>
              <ArrowUpRight size={16} />
            </motion.a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex md:hidden items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-white/10 bg-white/[0.03] text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </motion.header>
      </div>

      {/* FULLSCREEN MOBILE OVERLAY — Premium Editorial Vibe */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#080808] text-white flex flex-col overflow-hidden"
          >
            {/* Lightweight CSS pattern and radial glow (Zero lag on mobile) */}
            <div className="absolute inset-0 -z-10 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
            <div className="absolute top-0 right-0 -z-10 w-[80vw] h-[80vw] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,122,0,0.12) 0%, rgba(0,0,0,0) 70%)' }} />

            {/* Top bar inside overlay */}
            {/* Top bar inside overlay */}
<div className="flex items-center justify-between w-full px-6 pt-6">

  <div className="w-28 sm:w-32">
    <Image
      src="/mindx-logo.png"
      alt="mindX Institute logo"
      width={866}
      height={288}
      className="w-full h-auto object-contain"
    />
  </div>

  <button
    onClick={() => setMobileMenuOpen(false)}
    className="flex items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-white/[0.03] text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
    aria-label="Close menu"
  >
    <X size={18} />
  </button>

</div>

            {/* Center navigation links — Left aligned, premium sizing */}
            <div className="flex-1 flex flex-col justify-center px-8 sm:px-12">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-[#ff7a00] text-[10px] font-mono tracking-widest uppercase mb-8"
              >
                // Navigation
              </motion.span>

              <div className="flex flex-col gap-6">
                {[
                  { label: "Home", href: "#home", num: "01" },
                  { label: "About", href: "#about", num: "02" },
                  { label: "Services", href: "#services", num: "03" },
                  { label: "Contact", href: "#contact", num: "04" },
                ].map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex items-end gap-4 text-4xl sm:text-6xl font-display font-medium text-white hover:text-[#ff7a00] transition-colors"
                  >
                    <span>{item.label}</span>
                    <span className="text-sm sm:text-lg font-mono text-white/20 group-hover:text-[#ff7a00]/50 transition-colors mb-1 sm:mb-2">
                      {item.num}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Bottom info — Brand Punchline & CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="px-8 pb-10 flex flex-col gap-8 border-t border-white/5 pt-8 bg-gradient-to-t from-black/50 to-transparent"
            >
              <div>
                <p className="font-display text-xl font-bold tracking-tight text-white leading-tight">
                  SHAPE THE FUTURE.<br />
                  <span className="text-white/40">MASTER THE SKILL.</span>
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-[10px] font-mono text-white/40 tracking-wider">RAJKOT, GUJARAT</p>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-[#ff7a00] text-black hover:bg-[#ffaa00] transition-colors"
                >
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}