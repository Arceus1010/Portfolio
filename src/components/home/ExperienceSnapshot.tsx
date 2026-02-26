"use client";

import { motion, useReducedMotion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { fadeUp, EASE_OUT_EXPO, DURATION } from "@/lib/animations";

function LiveClock() {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString("en-MY", { timeZone: "Asia/Kuala_Lumpur", hour12: true })
  );
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-MY", { timeZone: "Asia/Kuala_Lumpur", hour12: true }));
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="text-xs font-mono text-muted tabular-nums">
      KUL · {time} · GMT+8
    </span>
  );
}

// Count-up: animates from 0 → target on scroll entry
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView || shouldReduceMotion) return;
    const controls = animate(count, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.15,
    });
    return controls.stop;
  }, [inView, count, target, shouldReduceMotion]);

  return (
    <span ref={ref}>
      {shouldReduceMotion ? target : <motion.span>{rounded}</motion.span>}
      {suffix}
    </span>
  );
}

type Stat = {
  // If numeric, CountUp animates it. If string, rendered verbatim.
  display: string | { value: number; suffix?: string };
  label: string;
};

const stats: Stat[] = [
  {
    display: { value: 3 },
    label: "AI platforms shipped end-to-end",
  },
  {
    display: { value: 100, suffix: "%" },
    label: "Design-to-dev ownership on every project",
  },
  {
    display: { value: 4 },
    label: "Enterprise products live in production",
  },
  {
    display: { value: 0 },
    label: "Audit failures across all deployments",
  },
];

const viewport = { once: true, margin: "-60px" };

export default function ExperienceSnapshot() {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? false : "hidden";

  return (
    <section className="border-t border-border py-24 px-6 max-w-layout mx-auto">
      {/* Section label */}
      <motion.div
        className="mb-16"
        variants={fadeUp}
        initial={initial}
        whileInView="visible"
        viewport={viewport}
      >
        <p className="text-xs uppercase tracking-widest text-muted font-mono flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-40" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
          </span>
          By the numbers
        </p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-px">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="bg-background p-8 md:p-10"
            variants={fadeUp}
            initial={initial}
            whileInView="visible"
            viewport={viewport}
            transition={{ delay: i * 0.08 }}
          >
            {/* Large bold number */}
            <div className="mb-4 leading-none">
              <span className="text-[3.5rem] sm:text-[4.5rem] font-semibold tracking-tighter text-foreground">
                {typeof stat.display === "string"
                  ? stat.display
                  : <CountUp target={stat.display.value} suffix={stat.display.suffix} />
                }
              </span>
            </div>
            {/* One-line description */}
            <p className="text-[13px] text-muted leading-snug font-mono">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Company bio strip */}
      <motion.div
        className="bg-surface border border-border p-8 flex flex-col sm:flex-row sm:items-center gap-6"
        variants={fadeUp}
        initial={initial}
        whileInView="visible"
        viewport={viewport}
        transition={{ duration: DURATION.entrance, ease: EASE_OUT_EXPO, delay: 0.2 }}
      >
        <div className="shrink-0">
          <div className="text-xs font-mono text-muted uppercase tracking-widest mb-1">Current role</div>
          <div className="text-sm font-semibold text-foreground">Datamicron Systems</div>
        </div>
        <div className="w-px h-12 bg-border hidden sm:block shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-muted leading-relaxed">
            Sole UI/UX Designer and Frontend Engineer across multiple AI-driven enterprise
            platforms — leading interfaces from workflow architecture through React implementation
            to production deployment.
          </p>
          <div className="mt-4">
            <LiveClock />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
