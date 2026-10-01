"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { BookOpen, Briefcase, Users, MonitorCheck, Sparkles } from "lucide-react";
import { MouseEvent } from "react";

const features = [
    {
        title: "Practical Learning",
        description: "Move beyond theory. We emphasize hands-on practice designed to build real-world confidence and execution.",
        Icon: MonitorCheck,
        colSpan: "md:col-span-2",
    },
    {
        title: "Expert Mentorship",
        description: "Learn directly from experienced professionals dedicated to your personal and technical growth.",
        Icon: Users,
        colSpan: "md:col-span-1",
    },
    {
        title: "Future-Ready Skills",
        description: "Equip yourself with the adaptable knowledge needed to thrive in an ever-evolving digital landscape.",
        Icon: BookOpen,
        colSpan: "md:col-span-1",
    },
    {
        title: "Collaborative Environment",
        description: "Join a supportive community where learners and mentors work together to unlock new possibilities.",
        Icon: Briefcase,
        colSpan: "md:col-span-2",
    },
];

export default function AboutSection() {
    return (
        <section id="about" className="relative z-20  px-4  sm:py-8 sm:px-6 lg:px-8 pt-20 sm:pt-24 overflow-hidden">

            {/* Ambient background light orbs to naturally fill left/right negative space */}
            <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-full  h-[350px] bg-[#ff7a00]/[0.03] blur-[120px] rounded-full" />

            {/* ==========================================
            HEADER AREA (Clean, Balanced & Wide)
        =========================================== */}
            <div className="relative  flex w-full flex-col items-center text-center">

                {/* Core Header Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#ff7a00]/30 bg-[#ff7a00]/10 px-4 py-2 text-xs font-medium text-[#ff7a00] backdrop-blur-sm"
                >
                    <Sparkles size={14} />
                    <span>Who We Are</span>
                </motion.div>

                <motion.h2
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.1 }}
  className="font-display text-3xl font-bold tracking-tight text-white/95 sm:text-5xl lg:text-7xl lg:leading-[1.1]"
>
  Empowering minds.
  <br />
  <span className="bg-gradient-to-br from-[#ff7a00] to-[#ffaa00] bg-clip-text pr-2 italic text-transparent">
    Building futures.
  </span>
</motion.h2>

                {/* Minimalist framing divider lines */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="my-8 flex items-center justify-center gap-4 w-full"
                >
                    <div className="h-px w-full bg-gradient-to-r from-transparent to-white/15" />
                    <div className="h-1.5 w-1.5 rounded-full bg-[#ff7a00]/60 shadow-[0_0_10px_rgba(255,122,0,0.8)]" />
                    <div className="h-px w-full bg-gradient-to-l from-transparent to-white/15" />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-sm leading-relaxed text-white/40 sm:text-base md:text-lg"
                >
                    mindx is a learning institute in Rajkot offering academic coaching,
                    academic classes, computer courses, Tally with GST, CCC, and coding
                    classes for kids.
                </motion.p>
            </div>

            {/* ==========================================
            BENTO GRID (Vertical Flow)
        =========================================== */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3"
            >
                {features.map((feature, index) => (
                    <GlowCard key={index} feature={feature} index={index} />
                ))}
            </motion.div>
        </section>
    );
}

/* ============================================================
MOUSE-TRACKING GLOW CARD
============================================================ */
function GlowCard({ feature, index }: { feature: any; index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md transition-colors hover:bg-white/[0.04] sm:p-10 ${feature.colSpan}`}
        >
            {/* The glowing flashlight effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                radial-gradient(
                450px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 122, 0, 0.12),
                transparent 80%
                )
            `,
                }}
            />

            {/* Animated Border Glow */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-3xl border border-[#ff7a00]/0 transition-colors duration-500 group-hover:border-[#ff7a00]/30"
            />

            <div className="relative z-10">
                {/* Icon Area */}
                <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] text-white/50 ring-1 ring-white/10 transition-all duration-300 group-hover:bg-[#ff7a00]/10 group-hover:text-[#ff7a00] group-hover:ring-[#ff7a00]/30 lg:h-16 lg:w-16">
                    <feature.Icon size={26} strokeWidth={1.5} />
                </div>

                {/* Text Content */}
                <h3 className="font-display text-xl font-medium tracking-wide text-white/90 lg:text-2xl">
                    {feature.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/40 transition-colors duration-300 group-hover:text-white/60 lg:text-base">
                    {feature.description}
                </p>
            </div>
        </motion.div>
    );
}