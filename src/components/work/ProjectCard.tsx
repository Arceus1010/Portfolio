"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Tag from "@/components/ui/Tag";
import type { ProjectPreview } from "@/data/types";
import { EASE_OUT_EXPO, DURATION } from "@/lib/animations";

const MotionLink = motion.create(Link as React.ComponentType<React.ComponentProps<typeof Link>>);

const arrowVariants = {
  rest: { x: 0 },
  hover: {
    x: 4,
    transition: { duration: DURATION.fast, ease: EASE_OUT_EXPO },
  },
};

const borderVariants = {
  rest: { scaleY: 0, opacity: 0 },
  hover: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: DURATION.fast, ease: EASE_OUT_EXPO },
  },
};

const emojiVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: -4,
    transition: { duration: DURATION.fast, ease: EASE_OUT_EXPO },
  },
};

type Props = {
  project: ProjectPreview;
  size?: "default" | "large";
};

export default function ProjectCard({ project, size = "default" }: Props) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionLink
      href={`/work/${project.slug}`}
      className="group relative block bg-background hover:bg-surface transition-colors duration-200 p-8 overflow-hidden"
      initial="rest"
      whileHover={shouldReduceMotion ? undefined : "hover"}
      animate="rest"
    >
      {/* Left accent border flash */}
      <motion.div
        aria-hidden
        variants={shouldReduceMotion ? undefined : borderVariants}
        className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent origin-top"
      />

      <div className="flex items-start justify-between gap-4">
        {/* WCAG 1.1.1 — role="img" + aria-label gives the emoji a reliable accessible name */}
        <motion.span
          role="img"
          aria-label={project.name}
          variants={shouldReduceMotion ? undefined : emojiVariants}
          className={size === "large" ? "text-5xl" : "text-4xl"}
        >
          {project.emoji}
        </motion.span>
        {/* Decorative arrow — hidden from assistive technology */}
        <motion.span
          aria-hidden="true"
          className="text-muted group-hover:text-accent transition-colors duration-200 text-lg mt-1"
          variants={arrowVariants}
        >
          →
        </motion.span>
      </div>

      <h3
        className={`font-semibold text-foreground mt-4 tracking-tight ${
          size === "large" ? "text-2xl" : "text-xl"
        }`}
      >
        {project.name}
      </h3>

      <p className="text-muted mt-2 text-sm leading-relaxed">
        {project.tagline}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-5">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </MotionLink>
  );
}
