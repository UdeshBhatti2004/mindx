"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calculator, Code, BookOpen, Sparkles, Trophy } from "lucide-react";

const services = [
  {
    tag: "Academic Foundation",
    title: "Standards 1 to 9 (English Medium)",
    description: "Comprehensive academic support tailored for young minds. Strong conceptual clarity, homework guidance, and core subject mastery.",
    icon: GraduationCap,
    gradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
    borderHover: "hover:border-blue-500/40",
    iconColor: "text-blue-400 bg-blue-500/10 ring-blue-500/20",
  },
  {
    tag: "Professional Accounting",
    title: "Tally with GST Course",
    description: "Master financial accounting from scratch ledger creation, inventory management, taxation, and GST filing.",
    icon: Calculator,
    gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
    borderHover: "hover:border-emerald-500/40",
    iconColor: "text-emerald-400 bg-emerald-500/10 ring-emerald-500/20",
  },
  {
    tag: "Digital Literacy",
    title: "CCC Course",
    description: "Build official digital competency operating systems, office automation, internet navigation, and certified IT skills.",
    icon: BookOpen,
    gradient: "from-[#ff7a00]/10 via-amber-500/5 to-transparent",
    borderHover: "hover:border-[#ff7a00]/40",
    iconColor: "text-[#ff7a00] bg-[#ff7a00]/10 ring-[#ff7a00]/20",
  },
  {
    tag: "Early Tech Skills",
    title: "Coding for Kids (Scratch)",
    description: "Introduce children to logic and computer science through visual block-based programming and interactive games.",
    icon: Code,
    gradient: "from-purple-500/15 via-pink-500/5 to-transparent",
    borderHover: "hover:border-purple-500/40",
    iconColor: "text-purple-400 bg-purple-500/10 ring-purple-500/20",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative z-20 w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      
      {/* CINEMATIC BACKGROUND LIGHTS */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute left-1/2 top-[20%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#ff7a00]/[0.035] blur-[120px]"
        />
      </div>

      {/* HEADER */}
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 35, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#ff7a00]/30 bg-[#ff7a00]/10 px-4 py-2 text-xs font-medium text-[#ff7a00] backdrop-blur-sm"
        >
          <Sparkles size={14} />
          <span>What We Offer</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 35, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl font-bold tracking-tight text-white/95 sm:text-5xl lg:text-7xl lg:leading-[1.1]"
        >
          Programs designed for <br className="hidden sm:block" />
          <span className="bg-gradient-to-br from-[#ff7a00] to-[#ffaa00] bg-clip-text pr-2 italic text-transparent">
            real-world success.
          </span>
        </motion.h2>

        {/* Minimalist framing divider line matching About Section */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="my-8 flex items-center justify-center gap-4 w-full max-w-md"
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent to-white/15" />
          <div className="h-1.5 w-1.5 rounded-full bg-[#ff7a00]/60 shadow-[0_0_10px_rgba(255,122,0,0.8)]" />
          <div className="h-px w-full bg-gradient-to-l from-transparent to-white/15" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 35, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-sm leading-relaxed text-white/40 sm:text-base md:text-lg"
        >
          Explore our structured academic and professional training paths built to elevate your knowledge, sharpen technical skills, and prepare you for the future.
        </motion.p>
      </div>

      {/* CARDS GRID */}
      <div className="relative mt-20">
        <div className="pointer-events-none absolute -bottom-10 left-1/2 h-20 w-[70%] -translate-x-1/2 rounded-[50%] bg-[#ff7a00]/[0.06] blur-[60px]" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{
                  opacity: 0,
                  y: 50,
                  scale: 0.95,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -6,
                  scale: 1.01,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className={`group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0c0c0c]/90 p-6 backdrop-blur-xl transition-colors duration-500 sm:p-8 ${service.borderHover}`}
              >
                {/* Spotlight gradient */}
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-700 group-hover:opacity-100`} />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex items-start gap-4">
                  {/* NUMBER */}
                  <div className="relative shrink-0">
                    <span className="font-display text-4xl font-bold tracking-tighter text-white/[0.08] transition-colors duration-500 group-hover:text-[#ff7a00]/30 sm:text-5xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                      className="absolute bottom-0 left-0 h-px w-full origin-left bg-[#ff7a00]/30"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    {/* TOP ROW */}
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center rounded-full border border-white/[0.06] bg-white/[0.035] px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white/40 ring-1 ring-white/[0.03]">
                        {service.tag}
                      </span>

                      {/* ICON */}
                      <div className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 transition-all duration-500 group-hover:scale-110 ${service.iconColor}`}>
                        <Icon size={19} strokeWidth={1.5} />
                        <div className="absolute inset-0 -z-10 rounded-xl bg-current opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20" />
                      </div>
                    </div>

                    {/* TITLE */}
                    <h3 className="font-display text-lg font-medium tracking-wide text-white/90 transition-colors duration-300 group-hover:text-white sm:text-xl">
                      {service.title}
                    </h3>

                    {/* UNDERLINE */}
                    <div className="mt-3 h-px w-14 origin-left bg-gradient-to-r from-[#ff7a00] to-transparent" />

                    {/* DESCRIPTION */}
                    <p className="mt-3 text-xs leading-relaxed text-white/35 transition-colors duration-500 group-hover:text-white/60 sm:text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* CORNER TROPHY */}
                <Trophy
                  size={70}
                  strokeWidth={0.5}
                  className="pointer-events-none absolute -bottom-5 -right-5 text-white/[0.015] transition-all duration-700 group-hover:rotate-6 group-hover:text-[#ff7a00]/[0.04]"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}