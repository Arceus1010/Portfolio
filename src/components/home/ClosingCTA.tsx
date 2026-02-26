"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, EASE_OUT_EXPO, DURATION } from "@/lib/animations";

const viewport = { once: true, margin: "-60px" };

const MAILTO = "mailto:afnanfarid.dev@gmail.com?subject=Let%27s%20build%20something";

// 12 points evenly distributed on a circle, connected as a dodecagon
const POLYGON_POINTS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i * 30 - 90) * (Math.PI / 180);
  const r = 160;
  return `${r * Math.cos(angle)},${r * Math.sin(angle)}`;
}).join(" ");

// Inner ring — 6 points
const INNER_POINTS = Array.from({ length: 6 }, (_, i) => {
  const angle = (i * 60 - 90) * (Math.PI / 180);
  const r = 80;
  return `${r * Math.cos(angle)},${r * Math.sin(angle)}`;
}).join(" ");

export default function ClosingCTA() {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? false : "hidden";

  return (
    <section className="relative border-t border-border overflow-hidden">

      {/* ── Animated geometric background ─────────────────────────── */}
      {!shouldReduceMotion && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          {/* Outer soft glow */}
          <motion.div
            className="absolute w-150 h-150 rounded-full bg-accent/4 blur-3xl"
            animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Rotating dodecagon ring */}
          <motion.svg
            width="380"
            height="380"
            viewBox="-200 -200 400 400"
            className="absolute opacity-[0.07]"
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          >
            <polygon
              points={POLYGON_POINTS}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="1"
            />
            {/* Spokes from centre to each vertex */}
            {Array.from({ length: 12 }, (_, i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180);
              const r = 160;
              return (
                <line
                  key={i}
                  x1="0" y1="0"
                  x2={r * Math.cos(angle)}
                  y2={r * Math.sin(angle)}
                  stroke="#3B82F6"
                  strokeWidth="0.5"
                />
              );
            })}
          </motion.svg>

          {/* Inner hexagon — counter-rotates */}
          <motion.svg
            width="220"
            height="220"
            viewBox="-120 -120 240 240"
            className="absolute opacity-[0.05]"
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <polygon
              points={INNER_POINTS}
              fill="none"
              stroke="#60A5FA"
              strokeWidth="1"
            />
          </motion.svg>

          {/* Centre dot */}
          <motion.div
            className="absolute w-1 h-1 rounded-full bg-accent/40"
            animate={{ scale: [1, 2, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}

      {/* ── Content — centred, max 680px ──────────────────────────── */}
      <div className="relative z-10 py-36 px-6 mx-auto text-center" style={{ maxWidth: 680 }}>
        <motion.div
          variants={staggerContainer}
          initial={initial}
          whileInView="visible"
          viewport={viewport}
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="text-xs uppercase tracking-widest text-muted font-mono mb-8 flex items-center justify-center gap-3"
          >
            <span className="w-8 h-px bg-border inline-block" />
            What&apos;s Next
            <span className="w-8 h-px bg-border inline-block" />
          </motion.p>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(2.2rem,5.5vw,4rem)] font-semibold tracking-tight leading-[1.08]"
          >
            <span className="text-foreground">Let&apos;s build something </span>
            <span
              className="bg-linear-to-r from-accent via-accent-glow to-accent bg-clip-text text-transparent"
              style={shouldReduceMotion ? {} : {
                backgroundSize: "200% 100%",
                animation: "shimmer-cta 3.5s ease-in-out infinite",
              }}
            >
              that matters.
            </span>
          </motion.h2>

          {/* Sub-copy */}
          <motion.p
            variants={fadeUp}
            className="mt-7 text-lg text-muted leading-relaxed"
          >
            I&apos;m open to product engineering roles in AI-focused teams — globally.
            If you&apos;re building something where design and intelligence meet,
            I&apos;d love to talk.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          >
            {/* Primary — pulsing glow */}
            <div className="relative group/btn">
              {!shouldReduceMotion && (
                <motion.div
                  aria-hidden
                  className="absolute inset-0 rounded blur-xl bg-accent/50 -z-10"
                  animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <motion.a
                href={MAILTO}
                className="relative inline-flex items-center gap-2.5 bg-accent hover:bg-accent-dim text-white text-sm font-medium px-7 py-4 rounded transition-colors duration-200"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                transition={{ duration: DURATION.fast, ease: EASE_OUT_EXPO }}
              >
                Get in touch
                <span aria-hidden>→</span>
              </motion.a>
            </div>

            {/* Secondary — pre-filled mailto */}
            <a
              href={MAILTO}
              className="text-sm text-muted hover:text-accent transition-colors duration-200 font-mono"
            >
              Email me directly →
            </a>
          </motion.div>

          {/* Footer signature */}
          <motion.p
            variants={fadeUp}
            className="mt-16 text-xs font-mono text-border tracking-widest"
          >
            afnanfarid.dev@gmail.com · Malaysia · Available now
          </motion.p>
        </motion.div>
      </div>

      <style>{`
        @keyframes shimmer-cta {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}
