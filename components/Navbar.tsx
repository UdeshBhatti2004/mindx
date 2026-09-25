"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

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
      <div className="fixed left-0 right-0 top-0 z-50 flex justify-center px-3 pt-3 pointer-events-none sm:px-6 md:pt-6">
        <motion.header
          layout
          className={`pointer-events-auto flex items-center justify-between rounded-full border transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled
              ? "h-16 w-full max-w-4xl border-white/10 bg-[#080808]/80 px-4 backdrop-blur-xl sm:px-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              : "h-16 sm:h-20 w-full max-w-7xl border-transparent bg-transparent px-2 sm:px-6"
          }`}
        >
          {/* LOGO — bigger, no cramped padding */}
          <a href="#home" className="relative z-50 flex shrink-0 items-center w-32 sm:w-36 md:w-40">
            <img
              src="/mindx-logo.png"
              alt="mindX"
              className="w-full h-auto object-contain block drop-shadow-sm"
            />
          </a>

          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-8 text-sm md:flex">
            <a
              href="#about"
              className={`transition-colors hover:text-white ${
                activeSection === "about" ? "font-medium text-white" : "text-white/50"
              }`}
            >
              About
            </a>
            <a
              href="#services"
              className={`transition-colors hover:text-white ${
                activeSection === "services" ? "font-medium text-white" : "text-white/50"
              }`}
            >
              Services
            </a>
            <a
              href="#contact"
              className={`transition-colors hover:text-white ${
                activeSection === "contact" ? "font-medium text-white" : "text-white/50"
              }`}
            >
              Contact
            </a>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs sm:text-sm font-medium text-white transition-all hover:bg-white/10"
            >
              <span>Get Started</span>
              <ArrowUpRight size={15} />
            </motion.a>

            {/* Mobile menu trigger — plain icon button, no cramped pill/label */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex md:hidden items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </motion.header>
      </div>

      {/* FULLSCREEN MOBILE OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 90% 10%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 90% 10%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 90% 10%)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#050505] text-white flex flex-col justify-between p-5 sm:p-12 overflow-hidden"
          >
            <div
              className="absolute inset-0 -z-10 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Top bar inside overlay — logo now matches header size */}
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
              <div className="w-32 sm:w-36">
                <img src="/mindx-logo.png" alt="mindX" className="w-full h-auto object-contain" />
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
                aria-label="Close menu"
              >
                <X size={18} className="transition-transform group-hover:rotate-90" />
              </button>
            </div>

            {/* Center navigation links */}
            <div className="w-full max-w-7xl mx-auto flex flex-col gap-3 sm:gap-6 my-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-[#ff7a00]">
                Navigation
              </span>
              <ul className="flex flex-col gap-2 sm:gap-4 text-[13vw] sm:text-6xl leading-none font-light tracking-tight">
                {[
                  { label: "Home", href: "#home", num: "01" },
                  { label: "About", href: "#about", num: "02" },
                  { label: "Services", href: "#services", num: "03" },
                  { label: "Contact", href: "#contact", num: "04" },
                ].map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="hover:text-[#ff7a00] transition-colors inline-flex items-baseline gap-3"
                    >
                      {item.label}
                      <span className="text-xs sm:text-sm font-mono text-white/30">
                        {item.num}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom info */}
            <div className="w-full max-w-7xl mx-auto pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-white/40">
              <p>RAJKOT, GUJARAT, INDIA</p>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#ff7a00] hover:underline flex items-center gap-1"
              >
                <span>GET IN TOUCH DIRECTLY</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}