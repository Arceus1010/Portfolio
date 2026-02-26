"use client";

import { motion, useReducedMotion } from "framer-motion";
import { getAllProjects } from "@/lib/utils";
import { fadeUp, staggerContainer, EASE_OUT_EXPO, DURATION } from "@/lib/animations";
import Tag from "@/components/ui/Tag";
import Link from "next/link";

// Per-project config: gradient, accent colour, outcome metric, and SVG thumbnail
const projectMeta: Record<string, {
  gradientFrom: string;
  gradientTo: string;
  accent: string;
  outcome: string;
  Thumbnail: () => React.ReactElement;
}> = {
  "eagle-eye": {
    gradientFrom: "rgba(59,130,246,0.18)",
    gradientTo:   "rgba(37,99,235,0.04)",
    accent: "#3B82F6",
    outcome: "Analysts completed investigations significantly faster vs. prior multi-tool workflow",
    Thumbnail: () => (
      // Node graph — AI reasoning graph metaphor
      <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Edges */}
        <line x1="60" y1="60" x2="100" y2="35" stroke="#3B82F6" strokeWidth="0.8" strokeOpacity="0.4"/>
        <line x1="60" y1="60" x2="100" y2="85" stroke="#3B82F6" strokeWidth="0.8" strokeOpacity="0.4"/>
        <line x1="100" y1="35" x2="145" y2="25" stroke="#3B82F6" strokeWidth="0.8" strokeOpacity="0.3"/>
        <line x1="100" y1="35" x2="145" y2="55" stroke="#3B82F6" strokeWidth="0.8" strokeOpacity="0.3"/>
        <line x1="100" y1="85" x2="145" y2="70" stroke="#3B82F6" strokeWidth="0.8" strokeOpacity="0.3"/>
        <line x1="100" y1="85" x2="145" y2="98" stroke="#3B82F6" strokeWidth="0.8" strokeOpacity="0.3"/>
        {/* Confidence weight lines */}
        <line x1="30" y1="40" x2="60" y2="60" stroke="#60A5FA" strokeWidth="0.5" strokeOpacity="0.25" strokeDasharray="3 3"/>
        <line x1="30" y1="80" x2="60" y2="60" stroke="#60A5FA" strokeWidth="0.5" strokeOpacity="0.25" strokeDasharray="3 3"/>
        {/* Leaf nodes */}
        <circle cx="145" cy="25" r="4" fill="#1D4ED8" fillOpacity="0.6"/>
        <circle cx="145" cy="55" r="5.5" fill="#2563EB" fillOpacity="0.7"/>
        <circle cx="145" cy="70" r="3.5" fill="#1D4ED8" fillOpacity="0.5"/>
        <circle cx="145" cy="98" r="4.5" fill="#2563EB" fillOpacity="0.6"/>
        {/* Mid nodes */}
        <circle cx="100" cy="35" r="7" fill="#3B82F6" fillOpacity="0.5"/>
        <circle cx="100" cy="85" r="7" fill="#3B82F6" fillOpacity="0.5"/>
        {/* Root node */}
        <circle cx="60" cy="60" r="10" fill="#3B82F6" fillOpacity="0.7"/>
        <circle cx="60" cy="60" r="5" fill="#60A5FA" fillOpacity="0.9"/>
        {/* Origin nodes */}
        <circle cx="30" cy="40" r="4" fill="#93C5FD" fillOpacity="0.4"/>
        <circle cx="30" cy="80" r="4" fill="#93C5FD" fillOpacity="0.4"/>
      </svg>
    ),
  },

  "phoenix-ai": {
    gradientFrom: "rgba(251,146,60,0.18)",
    gradientTo:   "rgba(234,88,12,0.04)",
    accent: "#FB923C",
    outcome: "Over one-third of AI-suggested layout changes accepted by users in production",
    Thumbnail: () => (
      // Dashboard bars + AI overlay line — analytics metaphor
      <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Grid lines */}
        {[25, 50, 75, 100].map(y => (
          <line key={y} x1="20" y1={y} x2="185" y2={y} stroke="#F5F5F5" strokeWidth="0.3" strokeOpacity="0.08"/>
        ))}
        {/* Bar chart */}
        <rect x="28"  y="78" width="18" height="30" rx="2" fill="#FB923C" fillOpacity="0.25"/>
        <rect x="54"  y="55" width="18" height="53" rx="2" fill="#FB923C" fillOpacity="0.35"/>
        <rect x="80"  y="42" width="18" height="66" rx="2" fill="#FB923C" fillOpacity="0.50"/>
        <rect x="106" y="62" width="18" height="46" rx="2" fill="#FB923C" fillOpacity="0.35"/>
        <rect x="132" y="35" width="18" height="73" rx="2" fill="#FB923C" fillOpacity="0.60"/>
        <rect x="158" y="50" width="18" height="58" rx="2" fill="#FB923C" fillOpacity="0.40"/>
        {/* AI insight overlay line */}
        <polyline
          points="37,72 63,50 89,40 115,58 141,30 167,44"
          stroke="#FED7AA"
          strokeWidth="1.5"
          strokeOpacity="0.9"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* AI insight dot */}
        <circle cx="141" cy="30" r="4" fill="#FB923C" fillOpacity="0.9"/>
        <circle cx="141" cy="30" r="7" fill="#FB923C" fillOpacity="0.2"/>
        {/* AI insight callout */}
        <rect x="148" y="18" width="30" height="12" rx="2" fill="#FB923C" fillOpacity="0.15" stroke="#FB923C" strokeWidth="0.5" strokeOpacity="0.4"/>
        <rect x="152" y="22" width="20" height="1.5" rx="1" fill="#FB923C" fillOpacity="0.5"/>
        <rect x="152" y="25" width="14" height="1.5" rx="1" fill="#FB923C" fillOpacity="0.3"/>
      </svg>
    ),
  },

  "newss2": {
    gradientFrom: "rgba(34,197,94,0.18)",
    gradientTo:   "rgba(21,128,61,0.04)",
    accent: "#22C55E",
    outcome: "Data correction cycles reduced from weeks to hours after AI anomaly detection at submission",
    Thumbnail: () => (
      // Branching form tree — conditional logic metaphor
      <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Trunk */}
        <line x1="40" y1="60" x2="75" y2="60" stroke="#22C55E" strokeWidth="1" strokeOpacity="0.5"/>
        {/* Level-1 branches */}
        <line x1="75" y1="60" x2="110" y2="35" stroke="#22C55E" strokeWidth="0.8" strokeOpacity="0.45"/>
        <line x1="75" y1="60" x2="110" y2="85" stroke="#22C55E" strokeWidth="0.8" strokeOpacity="0.45"/>
        {/* Level-2 branches — top */}
        <line x1="110" y1="35" x2="148" y2="22" stroke="#22C55E" strokeWidth="0.6" strokeOpacity="0.35"/>
        <line x1="110" y1="35" x2="148" y2="45" stroke="#22C55E" strokeWidth="0.6" strokeOpacity="0.35"/>
        {/* Level-2 branches — bottom */}
        <line x1="110" y1="85" x2="148" y2="72" stroke="#22C55E" strokeWidth="0.6" strokeOpacity="0.35"/>
        <line x1="110" y1="85" x2="148" y2="98" stroke="#22C55E" strokeWidth="0.6" strokeOpacity="0.35"/>
        {/* Level-3 stub — top-top */}
        <line x1="148" y1="22" x2="175" y2="15" stroke="#22C55E" strokeWidth="0.4" strokeOpacity="0.25"/>
        <line x1="148" y1="22" x2="175" y2="28" stroke="#22C55E" strokeWidth="0.4" strokeOpacity="0.25"/>
        {/* Field nodes — leaves */}
        {[
          [175, 15], [175, 28],
          [148, 45], [148, 72], [148, 98],
        ].map(([cx, cy], i) => (
          <rect key={i} x={cx - 7} y={cy - 4} width="14" height="8" rx="2"
            fill="#22C55E" fillOpacity="0.2" stroke="#22C55E" strokeWidth="0.5" strokeOpacity="0.4"/>
        ))}
        {/* Level-1 junction nodes */}
        <circle cx="110" cy="35" r="4.5" fill="#22C55E" fillOpacity="0.45"/>
        <circle cx="110" cy="85" r="4.5" fill="#22C55E" fillOpacity="0.45"/>
        {/* Root field block */}
        <rect x="20" y="50" width="20" height="20" rx="2"
          fill="#22C55E" fillOpacity="0.15" stroke="#22C55E" strokeWidth="0.8" strokeOpacity="0.5"/>
        <rect x="24" y="56" width="12" height="2" rx="1" fill="#22C55E" fillOpacity="0.5"/>
        <rect x="24" y="61" width="8"  height="2" rx="1" fill="#22C55E" fillOpacity="0.3"/>
        {/* Flagged anomaly indicator */}
        <circle cx="148" cy="72" r="4.5" fill="#22C55E" fillOpacity="0.6"/>
        <circle cx="148" cy="72" r="7"   fill="#22C55E" fillOpacity="0.15"/>
      </svg>
    ),
  },

  "orbit": {
    gradientFrom: "rgba(168,85,247,0.18)",
    gradientTo:   "rgba(109,40,217,0.04)",
    accent: "#A855F7",
    outcome: "Persistent context model eliminated re-prompting overhead across all project sessions",
    Thumbnail: () => (
      // Orbital rings + context nodes — project graph metaphor
      <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Outer ellipse */}
        <ellipse cx="100" cy="60" rx="75" ry="42" stroke="#A855F7" strokeWidth="0.7" strokeOpacity="0.2"/>
        {/* Mid ellipse */}
        <ellipse cx="100" cy="60" rx="50" ry="28" stroke="#A855F7" strokeWidth="0.7" strokeOpacity="0.3"/>
        {/* Inner ellipse */}
        <ellipse cx="100" cy="60" rx="26" ry="15" stroke="#A855F7" strokeWidth="0.8" strokeOpacity="0.4"/>
        {/* Context connection lines */}
        <line x1="100" y1="60" x2="175" y2="52" stroke="#A855F7" strokeWidth="0.4" strokeOpacity="0.2" strokeDasharray="3 3"/>
        <line x1="100" y1="60" x2="25"  y2="40" stroke="#A855F7" strokeWidth="0.4" strokeOpacity="0.2" strokeDasharray="3 3"/>
        <line x1="100" y1="60" x2="58"  y2="99" stroke="#A855F7" strokeWidth="0.4" strokeOpacity="0.2" strokeDasharray="3 3"/>
        <line x1="100" y1="60" x2="152" y2="95" stroke="#A855F7" strokeWidth="0.4" strokeOpacity="0.2" strokeDasharray="3 3"/>
        {/* Outer orbit nodes */}
        <circle cx="175" cy="52" r="5"   fill="#A855F7" fillOpacity="0.45"/>
        <circle cx="25"  cy="40" r="4"   fill="#A855F7" fillOpacity="0.35"/>
        <circle cx="58"  cy="99" r="4.5" fill="#A855F7" fillOpacity="0.40"/>
        <circle cx="152" cy="95" r="5"   fill="#A855F7" fillOpacity="0.45"/>
        {/* Mid orbit nodes */}
        <circle cx="150" cy="35" r="3.5" fill="#C084FC" fillOpacity="0.5"/>
        <circle cx="48"  cy="75" r="3"   fill="#C084FC" fillOpacity="0.4"/>
        {/* Core */}
        <circle cx="100" cy="60" r="9"   fill="#A855F7" fillOpacity="0.5"/>
        <circle cx="100" cy="60" r="5"   fill="#C084FC" fillOpacity="0.85"/>
        <circle cx="100" cy="60" r="2.5" fill="#F3E8FF" fillOpacity="0.9"/>
      </svg>
    ),
  },
};

const viewport = { once: true, margin: "-60px" };

export default function SelectedWork() {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? false : "hidden";

  const projects = getAllProjects().map(({ slug, name, tagline, tags }) => ({
    slug, name, tagline, tags,
  }));

  return (
    <section className="border-t border-border py-24 px-6 max-w-layout mx-auto">
      {/* Header */}
      <motion.div
        className="flex items-end justify-between mb-16"
        variants={fadeUp}
        initial={initial}
        whileInView="visible"
        viewport={viewport}
      >
        <div>
          <p className="text-xs uppercase tracking-widest text-muted font-mono mb-3">Selected Work</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Systems built for real decisions.
          </h2>
        </div>
        <Link
          href="/work"
          aria-label="View all work"
          className="text-sm text-muted hover:text-foreground transition-colors duration-200 hidden sm:flex items-center gap-1.5"
        >
          View all
          <motion.span
            aria-hidden
            className="inline-block"
            animate={shouldReduceMotion ? {} : { x: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
          >
            →
          </motion.span>
        </Link>
      </motion.div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border"
        variants={staggerContainer}
        initial={initial}
        whileInView="visible"
        viewport={viewport}
      >
        {projects.map((project) => {
          const meta = projectMeta[project.slug] ?? projectMeta["eagle-eye"];
          const { gradientFrom, gradientTo, accent, outcome, Thumbnail } = meta;

          return (
            <motion.div key={project.slug} variants={fadeUp}>
              <motion.a
                href={`/work/${project.slug}`}
                className="group relative flex flex-col bg-background overflow-hidden"
                initial="rest"
                whileHover={shouldReduceMotion ? undefined : "hover"}
                animate="rest"
              >
                {/* ── Thumbnail ─────────────────────────────────────────── */}
                <motion.div
                  className="relative h-44 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
                  }}
                  variants={shouldReduceMotion ? undefined : {
                    rest:  { scale: 1 },
                    hover: { scale: 1.03, transition: { duration: 0.45, ease: EASE_OUT_EXPO } },
                  }}
                >
                  {/* Subtle grid lines */}
                  <svg aria-hidden className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`grid-${project.slug}`} width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F5F5F5" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#grid-${project.slug})`} />
                  </svg>

                  {/* SVG illustration — centred, contained */}
                  <div className="absolute inset-0 flex items-center justify-center px-8 py-6">
                    <Thumbnail />
                  </div>

                  {/* Accent dot top-left */}
                  <span
                    className="absolute top-4 left-5 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: accent }}
                  />

                  {/* "View Project →" overlay — slides up on hover */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 py-3 text-xs font-mono text-white uppercase tracking-widest"
                    style={{ backgroundColor: accent }}
                    variants={shouldReduceMotion ? undefined : {
                      rest:  { y: "100%", opacity: 0 },
                      hover: { y: "0%",   opacity: 1, transition: { duration: 0.3, ease: EASE_OUT_EXPO } },
                    }}
                  >
                    View Project
                    <motion.span
                      variants={shouldReduceMotion ? undefined : {
                        rest:  { x: 0 },
                        hover: { x: 4, transition: { duration: DURATION.fast, ease: EASE_OUT_EXPO } },
                      }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </motion.div>

                {/* ── Card body ─────────────────────────────────────────── */}
                <div className="flex-1 p-8 border-t border-border">
                  <h3 className="text-xl font-semibold text-foreground tracking-tight mb-1">
                    {project.name}
                  </h3>
                  <p className="text-sm text-muted mb-3">
                    {project.tagline}
                  </p>

                  {/* Outcome metric */}
                  <p className="text-[12px] font-mono leading-snug mb-5" style={{ color: accent, opacity: 0.8 }}>
                    ↗ {outcome}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[11px] font-mono text-muted px-2 py-0.5 border border-border rounded-full">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

              </motion.a>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-8 sm:hidden">
        <Link href="/work" className="text-sm text-muted hover:text-foreground transition-colors duration-200">
          View all work →
        </Link>
      </div>
    </section>
  );
}
