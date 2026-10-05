"use client";

import { useEffect, useRef, useState } from "react";

import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "framer-motion";

type Msg = { role: "user" | "model"; text: string };

const GREETING: Msg = {
  role: "model",
  text: "Hi! 👋 I can help with courses, batches and enrollment. Ask me anything.",
};

const QUICK = [
  "Courses offered?",
  "Tally course details",
  "Coding for kids age?",
  "How to enroll?",
];

/* ---------- Animated bot face (SVG) ---------- */

function BotFace({
  size = 36,
  px,
  py,
  animated = true,
}: {
  size?: number;
  px?: MotionValue<number>;
  py?: MotionValue<number>;
  animated?: boolean;
}) {
  const fill = {
    transformBox: "fill-box" as const,
    transformOrigin: "center",
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
    >
      {/* antenna */}
      <line
        x1="32"
        y1="17"
        x2="32"
        y2="10"
        stroke="#0a0a0a"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <motion.circle
        cx="32"
        cy="7"
        r="3.5"
        fill="#0a0a0a"
        style={fill}
        animate={animated ? { scale: [1, 1.5, 1] } : undefined}
        transition={{ duration: 1.6, repeat: Infinity }}
      />

      {/* ears */}
      <rect x="5" y="30" width="6" height="12" rx="3" fill="#0a0a0a" />
      <rect x="53" y="30" width="6" height="12" rx="3" fill="#0a0a0a" />

      {/* head */}
      <rect
        x="11"
        y="17"
        width="42"
        height="34"
        rx="12"
        fill="#0a0a0a"
      />

      {/* eyes (blink) */}
      <motion.g
        style={fill}
        animate={animated ? { scaleY: [1, 0.1, 1] } : undefined}
        transition={{
          duration: 0.25,
          repeat: Infinity,
          repeatDelay: 3.5,
        }}
      >
        <circle cx="23" cy="32" r="6.5" fill="#f97316" />
        <circle cx="41" cy="32" r="6.5" fill="#f97316" />

        {/* pupils follow cursor */}
        <motion.circle
          cx="23"
          cy="32"
          r="2.8"
          fill="#0a0a0a"
          style={{ x: px, y: py }}
        />

        <motion.circle
          cx="41"
          cy="32"
          r="2.8"
          fill="#0a0a0a"
          style={{ x: px, y: py }}
        />
      </motion.g>

      {/* mouth */}
      <path
        d="M25 43 Q32 48 39 43"
        stroke="#f97316"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const endRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const reduce = useReducedMotion();

  // Controls for returning bot to original position
  const botControls = useAnimationControls();

  /* ---------- eye tracking ---------- */

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const px = useSpring(mx, { stiffness: 200, damping: 20 });
  const py = useSpring(my, { stiffness: 200, damping: 20 });

  useEffect(() => {
    if (reduce) return;

    const onMove = (e: MouseEvent) => {
      const r = btnRef.current?.getBoundingClientRect();

      if (!r) return;

      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);

      const d = Math.hypot(dx, dy) || 1;
      const k = (Math.min(d, 200) / 200) * 3;

      mx.set((dx / d) * k);
      my.set((dy / d) * k);
    };

    window.addEventListener("mousemove", onMove);

    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, mx, my]);

  useEffect(() => {
    const t = setTimeout(() => setTeaser(true), 4000);

    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  async function send(text: string) {
    const q = text.trim();

    if (!q || loading) return;

    const next = [
      ...msgs,
      { role: "user", text: q } as Msg,
    ];

    setMsgs(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(1) }),
      });

      const { reply } = await res.json();

      setMsgs((m) => [
        ...m,
        { role: "model", text: reply },
      ]);
    } catch {
      setMsgs((m) => [
        ...m,
        {
          role: "model",
          text: "Network error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* ---------- Chat panel ---------- */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 26,
            }}
            className="flex h-[480px] w-[340px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141414] shadow-lg shadow-black/30"
          >
            {/* header */}

            <div className="flex items-center justify-between bg-gradient-to-r from-orange-400 to-orange-500 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <BotFace size={34} animated={!reduce} />

                <div className="leading-tight">
                  <p className="font-bold text-black">
                    mindx Assistant
                  </p>

                  <p className="flex items-center gap-1 text-[11px] text-black/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-700" />
                    Online
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-lg font-bold text-black/70 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* messages */}

            <div className="flex-1 space-y-2 overflow-y-auto p-3">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "flex justify-end"
                      : "flex items-end gap-2"
                  }
                >
                  {m.role === "model" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-400">
                      <BotFace size={20} animated={false} />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                      m.role === "user"
                        ? "rounded-br-sm bg-orange-400 font-medium text-black"
                        : "rounded-bl-sm border border-white/10 bg-white/5 text-white"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-1 pl-9">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-2 w-2 rounded-full bg-orange-400"
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              )}

              {msgs.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1 pl-9">
                  {QUICK.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="rounded-full border border-orange-400/40 px-3 py-1 text-xs text-orange-300 transition hover:bg-orange-400/10"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div ref={endRef} />
            </div>

            {/* input */}

            <div className="flex gap-2 border-t border-white/10 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && send(input)
                }
                maxLength={300}
                placeholder="Type your question…"
                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-orange-400"
              />

              <button
                onClick={() => send(input)}
                disabled={loading}
                className="rounded-lg bg-orange-400 px-4 text-sm font-semibold text-black transition hover:bg-orange-300 disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- Teaser bubble ---------- */}

      <AnimatePresence>
        {!open && teaser && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative rounded-xl border border-orange-400/50 bg-[#141414] px-4 py-2 text-sm font-medium text-white shadow-md"
          >
            Hi 👋 I can help you!

            <span className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 border-b border-r border-orange-400/50 bg-[#141414]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- Floating bot button ---------- */}

      <motion.div
        className="relative"
        animate={!open && !reduce ? { y: [0, -6, 0] } : { y: 0 }}
        transition={{
          duration: 2.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {!open && !reduce && (
          <motion.span
            className="absolute inset-0 rounded-full bg-orange-400"
            animate={{ scale: [1, 1.5], opacity: [0.25, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        )}

        <motion.button
          ref={btnRef}
          drag={!open}
          dragMomentum={false}
          dragElastic={0.1}
          animate={botControls}
          onDragEnd={() => {
            botControls.start({
              x: 0,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
              },
            });
          }}
          whileDrag={{ scale: 1.05 }}
          onClick={() => {
            setOpen((o) => !o);
            setTeaser(false);
          }}
          aria-label={open ? "Close chat" : "Open chat"}
          whileHover={
            reduce
              ? undefined
              : {
                  scale: 1.1,
                  rotate: [0, -8, 8, -8, 0],
                }
          }
          whileTap={{ scale: 0.88 }}
          transition={{ duration: 0.7 }}
          className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-300 to-orange-500 shadow-md shadow-orange-500/30"
        >
          {open ? (
            <span className="text-2xl font-bold text-black">
              ✕
            </span>
          ) : (
            <BotFace
              size={48}
              px={px}
              py={py}
              animated={!reduce}
            />
          )}
        </motion.button>
      </motion.div>
    </div>
  );
}