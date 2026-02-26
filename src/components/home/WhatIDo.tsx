"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, EASE_OUT_EXPO, DURATION } from "@/lib/animations";

const capabilities = [
  {
    index: "01",
    label: "AI Interaction Design",
    description:
      "Interfaces that make AI reasoning transparent, inspectable, and trustworthy — not a black box. Confidence visualization, evidence chains, and human-in-the-loop controls built for operators who stake real decisions on the output.",
    tag: "Design Systems",
    proof: {
      text: "Eagle Eye — AI reasoning graph reduced analyst context-switching by surfacing evidence chains in a single view",
      slug: "/work/eagle-eye",
    },
  },
  {
    index: "02",
    label: "Enterprise UX Architecture",
    description:
      "High-density data systems where information is layered, decisions are complex, and workflow integrity matters. Built for analysts who need precision, not simplification.",
    tag: "Product Strategy",
    proof: {
      text: "NEWSS 2.0 — WCAG 2.1 AA compliant survey platform serving national government with complex conditional logic",
      slug: "/work/newss2",
    },
  },
  {
    index: "03",
    label: "Scalable Frontend Engineering",
    description:
      "Production-grade React systems with typed state management, virtualized rendering, and component architectures that survive years of iteration without becoming legacy.",
    tag: "React / TypeScript",
    proof: {
      text: "Eagle Eye — virtualized grid maintained sub-16ms frame budgets across tens of thousands of rows on constrained hardware",
      slug: "/work/eagle-eye",
    },
  },
];

const viewport = { once: true, margin: "-60px" };

export default function WhatIDo() {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? false : "hidden";

  return (
    <section className="border-t border-border py-24 px-6 max-w-layout mx-auto">
      {/* Section header */}
      <motion.div
        className="flex items-end justify-between mb-16"
        variants={fadeUp}
        initial={initial}
        whileInView="visible"
        viewport={viewport}
      >
        <div>
          <p className="text-xs uppercase tracking-widest text-muted font-mono mb-3">What I Do</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Three things I do exceptionally well.
          </h2>
        </div>
      </motion.div>

      {/* Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border"
        variants={staggerContainer}
        initial={initial}
        whileInView="visible"
        viewport={viewport}
      >
        {capabilities.map((cap) => (
          <motion.div
            key={cap.label}
            variants={fadeUp}
            initial="rest"
            whileHover={shouldReduceMotion ? undefined : "hover"}
            animate="rest"
            className="group relative bg-background p-8 overflow-hidden cursor-default flex flex-col"
            style={{ transition: "box-shadow 0.3s ease, transform 0.3s ease" }}
          >
            {/* Lift + border glow on hover */}
            {!shouldReduceMotion && (
              <motion.div
                aria-hidden
                className="absolute inset-0 pointer-events-none rounded-[inherit]"
                variants={{
                  rest: {
                    boxShadow: "0 0 0 0 rgba(59,130,246,0), 0 0 0 0 rgba(59,130,246,0)",
                  },
                  hover: {
                    boxShadow: "0 8px 32px -4px rgba(59,130,246,0.18), inset 0 0 0 1px rgba(59,130,246,0.22)",
                    transition: { duration: 0.3, ease: EASE_OUT_EXPO },
                  },
                }}
              />
            )}

            {/* Traced border on hover */}
            {!shouldReduceMotion && (
              <>
                {/* Top */}
                <motion.div aria-hidden className="absolute top-0 left-0 h-px w-full bg-accent origin-left"
                  variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1, transition: { duration: 0.35, ease: EASE_OUT_EXPO } } }}
                />
                {/* Right */}
                <motion.div aria-hidden className="absolute top-0 right-0 w-px h-full bg-accent origin-top"
                  variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1, transition: { duration: 0.35, ease: EASE_OUT_EXPO, delay: 0.1 } } }}
                />
                {/* Bottom */}
                <motion.div aria-hidden className="absolute bottom-0 right-0 h-px w-full bg-accent origin-right"
                  variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1, transition: { duration: 0.35, ease: EASE_OUT_EXPO, delay: 0.2 } } }}
                />
                {/* Left */}
                <motion.div aria-hidden className="absolute bottom-0 left-0 w-px h-full bg-accent origin-bottom"
                  variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1, transition: { duration: 0.35, ease: EASE_OUT_EXPO, delay: 0.3 } } }}
                />
              </>
            )}

            {/* Content */}
            <div className="flex items-start justify-between mb-6">
              <motion.span
                className="font-mono text-[11px] text-accent tracking-widest select-none"
                variants={shouldReduceMotion ? undefined : {
                  rest: { opacity: 0.4 },
                  hover: { opacity: 1, transition: { duration: DURATION.fast } },
                }}
              >
                {cap.index}
              </motion.span>
              <span className="text-[10px] font-mono text-border uppercase tracking-widest border border-border px-2 py-0.5 rounded-full">
                {cap.tag}
              </span>
            </div>

            <motion.h3
              className="text-xl font-semibold text-foreground mb-4 leading-snug"
              variants={shouldReduceMotion ? undefined : {
                rest: { y: 0 },
                hover: { y: -2, transition: { duration: DURATION.fast, ease: EASE_OUT_EXPO } },
              }}
            >
              {cap.label}
            </motion.h3>

            <p className="text-[15px] text-muted leading-relaxed flex-1">
              {cap.description}
            </p>

            {/* Proof line */}
            <div className="mt-6 pt-5 border-t border-border/60">
              <p className="text-[11px] font-mono text-muted/50 uppercase tracking-widest mb-1">Proof</p>
              <a
                href={cap.proof.slug}
                className="text-[13px] italic text-muted/70 hover:text-accent transition-colors duration-200 leading-snug block"
              >
                {cap.proof.text}
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
