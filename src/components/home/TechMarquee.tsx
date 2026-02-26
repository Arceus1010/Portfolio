"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

type Category = "Design" | "Frontend" | "AI / Backend";

const groups: { category: Category; tools: string[] }[] = [
  {
    category: "Design",
    tools: ["Figma", "Product Design", "System Architecture"],
  },
  {
    category: "Frontend",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "AI / Backend",
    tools: ["Python", "LLM Pipelines", "AI/ML Integration", "Node.js", "REST APIs", "PostgreSQL"],
  },
];

// Flatten into a sequence: tools within each group, then a group separator between groups
type ToolItem = { kind: "tool"; category: Category; name: string };
type SepItem  = { kind: "sep" };
type Item = ToolItem | SepItem;

const sequence: Item[] = [];
groups.forEach((g) => {
  g.tools.forEach((name) => {
    sequence.push({ kind: "tool", category: g.category, name });
  });
  // Group separator after each group (including last — forms the loop seam cleanly)
  sequence.push({ kind: "sep" });
});

const doubled = [...sequence, ...sequence];

export default function TechMarquee() {
  const shouldReduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="border-t border-b border-border py-3.5 overflow-hidden relative bg-surface/30"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-linear-to-l from-background to-transparent" />

      <motion.div
        className="flex items-center gap-6 w-max"
        animate={shouldReduceMotion || paused ? {} : { x: ["0%", "-50%"] }}
        transition={{
          duration: 34,   // 28 × 1.2 = ~33.6 → 34s (20% slower)
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {doubled.map((item, i) =>
          item.kind === "sep" ? (
            // ── Group separator — visually distinct from tool names ──
            <span key={i} aria-hidden className="flex items-center gap-1.5 shrink-0 px-2">
              <span className="w-px h-5 bg-border/60" />
              <span className="text-border/80 text-[10px] font-mono tracking-[0.2em] uppercase select-none">///</span>
              <span className="w-px h-5 bg-border/60" />
            </span>
          ) : (
            // ── Tool item ───────────────────────────────────────────
            <span key={i} className="flex flex-col shrink-0 group/item cursor-default select-none">
              <span className="text-[9px] font-mono text-muted/40 uppercase tracking-[0.18em] leading-none mb-1 transition-colors duration-200 group-hover/item:text-accent/50">
                {item.category}
              </span>
              <span className="text-sm font-mono text-muted uppercase tracking-widest whitespace-nowrap transition-colors duration-200 group-hover/item:text-accent">
                {item.name}
              </span>
            </span>
          )
        )}
      </motion.div>
    </div>
  );
}
