"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { EASE_OUT_EXPO, DURATION } from "@/lib/animations";
import SceneBackground from "./SceneBackground";

const PHRASES = [
  "Product Engineer",
  "AI Systems Builder",
  "Design × Engineering",
  "Full-Stack Developer",
];

// Each word blurs + fades + lifts in independently
const wordVariants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 12 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
};

const sentence1 = ["I", "build"];
const accent    = ["AI-powered", "products"];
const sentence2 = ["where", "design", "and", "engineering", "operate", "as", "one", "system"];
const sentence3 = ["—", "so", "decisions", "happen", "faster."];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [showCursor, setShowCursor] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const initial = shouldReduceMotion ? false : "hidden";

  // Typing/cycling phrase
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Blink cursor
  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => setShowCursor(v => !v), 530);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  // Typing effect
  useEffect(() => {
    if (shouldReduceMotion) return;
    const phrase = PHRASES[phraseIndex];
    const speed = isDeleting ? 40 : 70;
    const holdDelay = !isDeleting && charCount === phrase.length ? 2200 : speed;

    const id = setTimeout(() => {
      if (!isDeleting && charCount < phrase.length) {
        setCharCount(c => c + 1);
      } else if (!isDeleting && charCount === phrase.length) {
        setIsDeleting(true);
      } else if (isDeleting && charCount > 0) {
        setCharCount(c => c - 1);
      } else {
        setIsDeleting(false);
        setPhraseIndex(i => (i + 1) % PHRASES.length);
      }
    }, holdDelay);

    return () => clearTimeout(id);
  }, [shouldReduceMotion, phraseIndex, charCount, isDeleting]);

  // Mouse-reactive gradient orb — vanilla mousemove, scoped to viewport
  useEffect(() => {
    if (shouldReduceMotion) return;
    const orb = orbRef.current;
    if (!orb) return;

    let rafId: number;
    let targetX = window.innerWidth * 0.35;
    let targetY = window.innerHeight * 0.45;
    let currentX = targetX;
    let currentY = targetY;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      // Lerp toward mouse — very slow (5% per frame = heavy lag)
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      orb.style.transform = `translate(${currentX - 400}px, ${currentY - 400}px)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [shouldReduceMotion]);

  return (
    <>
      {/* Animated scene background — aurora orbs + dot grid + cursor */}
      {!shouldReduceMotion && <SceneBackground />}

      {/* Mouse-reactive gradient orb — fixed, large, very slow lerp */}
      {!shouldReduceMotion && (
        <div
          ref={orbRef}
          aria-hidden
          className="pointer-events-none fixed z-0"
          style={{
            width: 800,
            height: 800,
            top: 0,
            left: 0,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.10) 0%, rgba(99,102,241,0.05) 40%, transparent 70%)",
            filter: "blur(72px)",
            willChange: "transform",
          }}
        />
      )}

      <div ref={heroRef} className="relative min-h-screen flex flex-col justify-center px-6 pt-28 pb-24 max-w-layout mx-auto">
        <div className="relative z-10">

          {/* ── Status badge ───────────────────────────────────────── */}
          <motion.div
            initial={initial}
            animate="visible"
            variants={{
              hidden:  { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
            }}
            className="inline-flex items-center gap-2 border border-border bg-surface/60 backdrop-blur-sm px-3 py-1.5 rounded-full mb-10"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
            </span>
            <span className="text-xs font-mono text-muted tracking-widest uppercase">
              Open to work · Malaysia
            </span>
          </motion.div>

          {/* ── Headline: word-by-word blur-reveal ─────────────────── */}
          <motion.h1
            className="text-[clamp(2.8rem,6vw,5.5rem)] font-semibold tracking-tight leading-[1.05] max-w-5xl"
            variants={{
              hidden:  {},
              visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
            }}
            initial={initial}
            animate="visible"
          >
            <span className="block">
              {sentence1.map((word, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.28em] text-foreground">
                  {word}
                </motion.span>
              ))}
              {accent.map((word, i) => (
                <motion.span key={`a${i}`} variants={wordVariants} className="inline-block mr-[0.28em] relative">
                  <span className="text-accent-glow">{word}</span>
                  {i === accent.length - 1 && (
                    <motion.span
                      aria-hidden
                      className="absolute -inset-2 bg-accent/10 blur-2xl rounded-full -z-10"
                      animate={shouldReduceMotion ? {} : { opacity: [0.3, 0.85, 0.3] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                </motion.span>
              ))}
            </span>

            <span className="block mt-1">
              {sentence2.map((word, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.28em] text-foreground">
                  {word}
                </motion.span>
              ))}
              <span
                aria-hidden
                className="inline-block ml-1 w-0.75 h-[0.82em] bg-accent align-middle rounded-sm"
                style={{ opacity: showCursor ? 1 : 0, transition: "opacity 0.1s" }}
              />
            </span>

            <span className="block mt-1">
              {sentence3.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className={`inline-block mr-[0.28em] ${i === 0 ? "text-muted" : "text-foreground/60"}`}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* ── Typing phrase ──────────────────────────────────────── */}
          <motion.div
            className="mt-6 h-7 flex items-center"
            initial={initial}
            animate="visible"
            variants={{
              hidden:  { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.75 } },
            }}
          >
            <span className="text-sm font-mono text-accent/70 tracking-widest uppercase">
              {shouldReduceMotion ? PHRASES[0] : PHRASES[phraseIndex].slice(0, charCount)}
              <span
                aria-hidden
                className="inline-block w-0.5 h-[1em] bg-accent/60 align-middle ml-0.5 rounded-sm"
                style={{ opacity: showCursor ? 1 : 0, transition: "opacity 0.1s" }}
              />
            </span>
          </motion.div>

          {/* ── Sub-copy ───────────────────────────────────────────── */}
          <motion.p
            className="mt-8 text-lg text-muted max-w-[58ch] leading-relaxed"
            initial={initial}
            animate="visible"
            variants={{
              hidden:  { opacity: 0, y: 14 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT_EXPO, delay: 0.85 } },
            }}
          >
            Afnan Farid — Product Engineer. I translate complex AI workflows into
            interfaces that analysts and operators trust with real decisions.
          </motion.p>

          {/* ── CTAs ───────────────────────────────────────────────── */}
          <motion.div
            className="flex flex-wrap items-center gap-6 mt-12"
            initial={initial}
            animate="visible"
            variants={{
              hidden:  { opacity: 0, y: 14 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT_EXPO, delay: 1.0 } },
            }}
          >
            {/* Primary — full filled button */}
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
              whileTap={shouldReduceMotion  ? undefined : { scale: 0.97 }}
              transition={{ duration: DURATION.fast, ease: EASE_OUT_EXPO }}
              className="relative group/cta"
            >
              {!shouldReduceMotion && (
                <motion.div
                  aria-hidden
                  className="absolute inset-0 rounded blur-lg bg-accent/50 -z-10 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300"
                />
              )}
              <Link
                href="/work"
                className="relative inline-flex items-center gap-2.5 bg-accent hover:bg-accent-dim text-white text-sm font-medium px-6 py-3.5 rounded transition-colors duration-200"
              >
                View Selected Work
                <motion.span
                  aria-hidden
                  animate={shouldReduceMotion ? {} : { x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>

            {/* Secondary — plain text link */}
            <Link
              href="/approach"
              className="text-sm text-muted hover:text-foreground transition-colors duration-200"
            >
              My Approach
            </Link>

            {/* Tertiary — email plain text */}
            <a
              href="mailto:afnanfarid.dev@gmail.com"
              className="text-sm text-muted/60 hover:text-accent transition-colors duration-200 font-mono"
            >
              afnanfarid.dev@gmail.com
            </a>
          </motion.div>

          {/* ── Scroll indicator ───────────────────────────────────── */}
          {!shouldReduceMotion && (
            <motion.div
              className="absolute bottom-0 left-0 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              <motion.div
                className="w-px h-12 bg-linear-to-b from-transparent via-border to-transparent"
                animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
              />
            </motion.div>
          )}

        </div>
      </div>
    </>
  );
}
