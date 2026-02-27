"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { useEffect, useState } from "react";

export default function SceneBackground() {
  const mouseX = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth / 2 : 760
  );
  const mouseY = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight / 2 : 400
  );

  const cursorX = useSpring(mouseX, { stiffness: 90, damping: 22 });
  const cursorY = useSpring(mouseY, { stiffness: 90, damping: 22 });

  const leanX = useSpring(mouseX, { stiffness: 16, damping: 24 });
  const leanY = useSpring(mouseY, { stiffness: 16, damping: 24 });

  const { scrollY } = useScroll();
  const gridY = useTransform(scrollY, [0, 800], [0, -80]);

  // Disable on touch devices — animated blur layers crash Safari iOS
  const [isTouch, setIsTouch] = useState(true);
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isTouch, mouseX, mouseY]);

  // On touch devices, render only the static dot grid — no blur, no animation
  if (isTouch) {
    return (
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="bg-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#F5F5F5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg-dots)" />
        </svg>
      </div>
    );
  }

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

      {/* ── Aurora orb 1 ─────────────────────────────────────────── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 900,
          height: 700,
          top: "-5%",
          left: "10%",
          background: "radial-gradient(ellipse, rgba(59,130,246,0.14) 0%, rgba(59,130,246,0.04) 50%, transparent 72%)",
          filter: "blur(48px)",
        }}
        animate={{
          x:     [0, 70,  -45,  25, 0],
          y:     [0, -50,  35, -18, 0],
          scale: [1, 1.08, 0.95, 1.04, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
      />

      {/* ── Aurora orb 2 ──────────────────────────────────────────── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 500,
          top: "25%",
          right: "0%",
          background: "radial-gradient(ellipse, rgba(99,102,241,0.11) 0%, rgba(99,102,241,0.03) 55%, transparent 75%)",
          filter: "blur(55px)",
        }}
        animate={{
          x:     [0, -80,  50, -30, 0],
          y:     [0,  55, -40,  22, 0],
          scale: [1, 0.91, 1.12, 0.97, 1],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.3, 0.6, 0.8, 1],
          delay: 4,
        }}
      />

      {/* ── Aurora orb 3 ─────────────────────────────────────────── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 750,
          height: 400,
          bottom: "0%",
          left: "25%",
          background: "radial-gradient(ellipse, rgba(37,99,235,0.09) 0%, rgba(37,99,235,0.02) 55%, transparent 78%)",
          filter: "blur(64px)",
        }}
        animate={{
          x:       [0,  35, -55,  10, 0],
          y:       [0, -28,  18, -10, 0],
          opacity: [0.55, 0.9, 0.65, 0.55],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 9,
        }}
      />

      {/* ── Lean orb ─────────────────────────────────────────────── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 560,
          height: 560,
          x: leanX,
          y: leanY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.13) 0%, rgba(59,130,246,0.03) 55%, transparent 72%)",
          filter: "blur(32px)",
        }}
      />

      {/* ── Sharp cursor spotlight ────────────────────────────────── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(96,165,250,0.14) 0%, rgba(59,130,246,0.05) 45%, transparent 70%)",
        }}
      />

      {/* ── Dot grid ─────────────────────────────────────────────── */}
      <motion.div className="absolute inset-0" style={{ y: gridY }}>
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="bg-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#F5F5F5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg-dots)" />
        </svg>
      </motion.div>

    </div>
  );
}
