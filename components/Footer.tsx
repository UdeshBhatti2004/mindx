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
      <div className="max-w-7xl  px-4 sm:px-6 lg:px-8">

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
                <li><a href="#" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter / X</a></li>
                <li><a href="#" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
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