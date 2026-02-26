"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { cn } from "@/lib/utils";
import type { ProjectPreview } from "@/data/types";
import { EASE_OUT_EXPO, DURATION } from "@/lib/animations";

type Props = {
  projects: ProjectPreview[];
  tags: string[];
};

const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: DURATION.fast, ease: "easeIn" as const },
  },
};

export default function TagFilter({ projects, tags }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const filtered = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects;

  return (
    <div>
      {/* Tag pills */}
      {/* WCAG 4.1.2 — role="group" + label groups the filter controls semantically */}
      <div role="group" aria-label="Filter projects by tag" className="flex flex-wrap gap-2 mb-12">
        {/* WCAG 4.1.2 — aria-pressed exposes toggle state to screen readers */}
        <button
          onClick={() => setActiveTag(null)}
          aria-pressed={activeTag === null}
          className={cn(
            "text-xs px-3 py-1.5 rounded border font-mono transition-colors duration-200",
            activeTag === null
              ? "bg-foreground border-foreground text-background"
              : "bg-surface border-border text-muted hover:text-foreground hover:border-muted"
          )}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            aria-pressed={activeTag === tag}
            className={cn(
              "text-xs px-3 py-1.5 rounded border font-mono transition-colors duration-200",
              activeTag === tag
                ? "bg-accent border-accent text-white"
                : "bg-surface border-border text-muted hover:text-foreground hover:border-muted"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* WCAG 3.2.2 — aria-live announces filter result count to screen readers */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {filtered.length === 0
          ? "No projects match this filter."
          : `Showing ${filtered.length} project${filtered.length === 1 ? "" : "s"}${activeTag ? ` filtered by ${activeTag}` : ""}.`}
      </p>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              variants={shouldReduceMotion ? undefined : cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <motion.div
              key="empty"
              variants={shouldReduceMotion ? undefined : cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="col-span-2 py-20 text-center text-muted text-sm"
            >
              No projects match this filter.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
