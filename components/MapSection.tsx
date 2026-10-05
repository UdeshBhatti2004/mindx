"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

export default function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loadMap, setLoadMap] = useState(false);

  useEffect(() => {
    const element = mapRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadMap(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "300px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative z-20  w-full px-4 pb-10 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c0c]/90 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-4"
      >
        {/* Top Info Bar */}
        <div className="absolute left-6 top-6 z-10 flex items-center gap-4 rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur-md sm:left-8 sm:top-8">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff7a00]/20 text-[#ff7a00] ring-1 ring-[#ff7a00]/30">
            <MapPin size={18} />
          </div>

          <div className="pr-4">
            <p className="font-display text-sm font-semibold tracking-wide text-white">
              mindx
            </p>
            <p className="mt-0.5 font-mono text-xs text-white/50">
              Rajkot, Gujarat, India
            </p>
          </div>
        </div>

        {/* Action Button */}
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=22.3039438%2C70.7846653"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-6 right-6 z-10 flex items-center gap-2 rounded-full bg-[#ff7a00] px-5 py-2.5 text-xs font-semibold text-black shadow-[0_0_20px_rgba(255,122,0,0.4)] transition-transform hover:scale-105 sm:bottom-8 sm:right-8"
        >
          <Navigation size={14} className="fill-black" />
          <span>Get Directions</span>
        </a>

        {/* Map */}
        <div
          ref={mapRef}
          className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-[#080808] sm:h-[450px]"
        >
          {loadMap && (
            <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118106.70010221669!2d70.73147529437155!3d22.30516132717804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98ac71cbd84%3A0x11cea626e46ea537!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
  width="100%"
  height="100%"
  style={{
    border: 0,
    filter:
      "grayscale(100%) invert(92%) contrast(83%) hue-rotate(180deg)",
  }}
  allowFullScreen={false}
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  className="absolute inset-0"
/>
          )}

          {/* Overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]" />
        </div>
      </motion.div>
    </section>
  );
}