"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/animations";

export default function PhilosophyQuote() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-surface/50 px-6 py-20 relative overflow-hidden">
      {/* Top rule */}
      <div className="max-w-content mx-auto">
        <div className="h-px bg-border mb-14" />

        <motion.blockquote
          className="text-center"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          <p
            className="text-[clamp(1.6rem,3.5vw,2.6rem)] leading-tight tracking-tight text-foreground/90"
            style={{ fontFamily: "var(--font-display)" }}
          >
            "Good software disappears — it stops being a tool and becomes the thinking itself."
          </p>
          <footer className="mt-6 text-xs font-mono text-muted uppercase tracking-widest">
            — Afnan Farid
          </footer>
        </motion.blockquote>

        {/* Bottom rule */}
        <div className="h-px bg-border mt-14" />
      </div>
    </section>
  );
}
