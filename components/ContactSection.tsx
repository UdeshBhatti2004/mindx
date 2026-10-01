"use client";

import { motion } from "framer-motion";
import { Sparkles, Send, CheckCircle2, MapPin, Mail, Phone } from "lucide-react";
import { useState, SyntheticEvent } from "react";
const interests = [
  "Standards 1–9",
  "Tally with GST",
  "CCC Course",
  "Coding for Kids",
  "General Inquiry",
];

export default function ContactSection() {
  const [selectedInterest, setSelectedInterest] = useState("Standards 1–9");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });

   const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          contact: formData.contact,
          interest: selectedInterest,
          message: formData.message,
        }),
      });

      const result = await res.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: "", contact: "", message: "" });
      } else {
        setError("Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="relative z-20 w-full px-4 py-16 sm:px-6 lg:px-8">

      {/* Cinematic ambient background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden flex justify-center items-center">
        <div className="w-[600px] h-[600px] bg-[#ff7a00]/[0.04] blur-[150px] rounded-full" />
      </div>

      {/* SECTION HEADER */}
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ff7a00]/30 bg-[#ff7a00]/10 px-4 py-2 text-xs font-medium text-[#ff7a00] backdrop-blur-sm"
        >
          <Sparkles size={14} />
          <span>Start Your Journey</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl font-bold tracking-tight text-white/95 sm:text-5xl lg:text-7xl lg:leading-[1.1]"
        >
          Let's connect your <br />
          <span className="bg-gradient-to-br from-[#ff7a00] to-[#ffaa00] bg-clip-text pr-2 italic text-transparent">
            potential with purpose.
          </span>
        </motion.h2>

        {/* Minimalist framing divider line matching About & Services sections */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="my-8 flex items-center justify-center gap-4 w-full "
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
          className=" text-sm leading-relaxed text-white/40 sm:text-base md:text-lg"
        >
         Have questions about our academic coaching, computer courses, or other programs? Drop us a message below and our team will get back to you shortly.
        </motion.p>
      </div>

      {/* INTERACTIVE SPLIT CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

        {/* LEFT SIDE: Direct Info & Vibe */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10 backdrop-blur-xl"
        >
          <div>
            <h3 className="font-display text-2xl font-semibold text-white mb-4">
              Direct Contact
            </h3>
            <p className="text-sm text-white/40 leading-relaxed mb-8">
              We are based in Rajkot, Gujarat. Reach out directly through any of our channels or visit our center.
            </p>

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff7a00]/10 text-[#ff7a00] ring-1 ring-[#ff7a00]/20">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-white/40">Location</p>
                  <p className="text-sm text-white/80 mt-1">Rajkot, Gujarat, India</p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff7a00]/10 text-[#ff7a00] ring-1 ring-[#ff7a00]/20">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-white/40">Email Us</p>
                  <p className="text-sm text-white/80 mt-1">mindxyourxfactor@gmail.com</p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff7a00]/10 text-[#ff7a00] ring-1 ring-[#ff7a00]/20">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-white/40">Inquiries</p>
                  <p className="text-sm text-white/80 mt-1">+91 79904 96001</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Premium Agency-Style Live Status Badge */}
          <div className="mt-12 pt-8 border-t border-white/5">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/5 bg-white/[0.01] px-4 py-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff7a00] opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff7a00]"></span>
              </span>
              <p className="text-xs font-mono text-white/50 tracking-wider uppercase mt-px">
                Accepting New Enrollments
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Interactive Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 h-full rounded-3xl border border-white/10 bg-[#0c0c0c]/90 p-8 sm:p-10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-16"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ff7a00]/20 text-[#ff7a00] ring-2 ring-[#ff7a00]/40 mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">Message Received!</h3>
              <p className="text-sm text-white/50 ">
                Thank you for reaching out. Our team will review your inquiry regarding <span className="text-[#ff7a00]">{selectedInterest}</span> and get back to you shortly.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-8 rounded-full border border-white/10 bg-white/[0.05] px-6 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/10 cursor-pointer"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

              {/* Interest Selector Pills */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/40 mb-3">
                  I am interested in:
                </label>
                <div className="flex flex-wrap gap-2">
                  {interests.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSelectedInterest(item)}
                      className={`rounded-full px-4 py-2 text-xs font-medium transition-all cursor-pointer ${selectedInterest === item
                        ? "bg-[#ff7a00] text-black font-semibold shadow-[0_0_15px_rgba(255,122,0,0.4)]"
                        : "border border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white"
                        }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Contact Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/40 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none transition-all focus:border-[#ff7a00]/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-[#ff7a00]/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/40 mb-2">
                    Phone / Email
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="john@example.com"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none transition-all focus:border-[#ff7a00]/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-[#ff7a00]/50"
                  />
                </div>
              </div>

              {/* Message Box */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/40 mb-2">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what you'd like to learn or ask..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none transition-all focus:border-[#ff7a00]/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-[#ff7a00]/50 resize-none"
                />
              </div>

              {/* Submit Button */}
              {error && (
                <p className="text-xs text-red-400 text-center -mb-2">{error}</p>
              )}
              <motion.button
                whileHover={{ scale: isSending ? 1 : 1.02 }}
                whileTap={{ scale: isSending ? 1 : 0.98 }}
                type="submit"
                disabled={isSending}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#ff7a00] py-4 text-sm font-semibold text-black transition-colors hover:bg-[#ffaa00] shadow-[0_0_25px_rgba(255,122,0,0.3)] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span>{isSending ? "Sending..." : "Send Inquiry"}</span>
                <Send size={16} />
              </motion.button>

            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}