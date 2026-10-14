"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact-footer" className="relative z-20 w-full bg-transparent text-white pt-20 border-t border-white/10 overflow-hidden">

      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gradient-to-t from-[#ff7a00]/10 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* Perfectly aligned with max-w-7xl and identical padding structure */}
      <div className="  px-4 sm:px-6 lg:px-8">

        {/* Top Section: Editorial Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">

          <div className="lg:col-span-7 flex flex-col justify-between gap-8">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#ff7a00] px-3 py-1 rounded-full bg-[#ff7a00]/10 border border-[#ff7a00]/20 inline-block">
                Start a Conversation
              </span>
              <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white/90 leading-[1.1]">
                Let's build the <span className="bg-gradient-to-br from-[#ff7a00] to-[#ffaa00] bg-clip-text text-transparent font-normal italic pr-2">future</span> together.
              </h2>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="mailto:mindxyourxfactor@gmail.com"
                className="group inline-flex items-center gap-2 text-lg sm:text-xl font-light text-white/70 hover:text-white transition-colors"
              >
                <span>mindxyourxfactor@gmail.com</span>
                <ArrowUpRight className="w-5 h-5 text-[#ff7a00] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 text-sm font-mono text-white/50">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-white/30">Navigation</p>
              <ul className="space-y-2">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-white/30">Socials</p>
              <ul className="space-y-2">
                <li>
                  <a href="#" target="_blank" rel="noreferrer" aria-label="Instagram" className="inline-flex items-center gap-2 hover:text-white transition-colors">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="inline-flex items-center gap-2 hover:text-white transition-colors">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8.34 18H5.67V9.4h2.67ZM7 8.23a1.55 1.55 0 1 1 .02-3.1 1.55 1.55 0 0 1-.02 3.1ZM18.34 18h-2.67v-4.18c0-1-.02-2.29-1.4-2.29s-1.61 1.1-1.61 2.22V18H10V9.4h2.56v1.17h.04a2.8 2.8 0 0 1 2.51-1.38c2.69 0 3.19 1.77 3.19 4.08Z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar - Changed from Flex to Grid for perfect alignment */}
        <div className="pt-8 pb-10 flex flex-col md:grid md:grid-cols-3 items-center gap-6 text-xs text-white/40 font-mono">

          <div className="md:justify-self-start text-center md:text-left">
            <p>© {new Date().getFullYear()} MINDX INSTITUTE. ALL RIGHTS RESERVED.</p>
          </div>

          <div className="md:justify-self-center text-white/60 font-medium tracking-widest bg-white/[0.03] px-4 py-2 rounded-lg border border-white/5 whitespace-nowrap text-center">
            DESIGNED & DEVELOPED BY UDESH BHATTI
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center justify-center md:justify-self-end gap-2 text-white/70 hover:text-white transition-colors cursor-pointer px-3 py-2 rounded-md hover:bg-white/5"
          >
            <span className="tracking-wider">BACK TO TOP</span>
            <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center transition-transform group-hover:-translate-y-1 group-hover:border-[#ff7a00]">
              <ArrowUp size={12} className="text-white group-hover:text-[#ff7a00]" />
            </div>
          </button>

        </div>

      </div>
    </footer>
  );
}
