"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/animations";

const navLinks = [
  { href: "/work",     label: "Work" },
  { href: "/approach", label: "Approach" },
  { href: "/about",    label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  // Switch from transparent to frosted once user scrolls past 40px
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md shadow-[0_1px_0_0_rgba(31,31,31,0.8)]"
          : "border-b border-transparent bg-transparent backdrop-blur-none"
      )}
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.1 }}
    >
      <div className="max-w-layout mx-auto px-6 h-16 flex items-center justify-between">

        {/* ── Logo ─────────────────────────────────────────────────── */}
        <Link href="/" className="group flex items-center gap-2.5">
          {/* Accent dot — pulses on hover */}
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-accent"
            whileHover={{ scale: 1.6 }}
            transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
          />
          <span className="text-sm font-medium tracking-tight text-foreground group-hover:text-accent transition-colors duration-200">
            Afnan Farid
          </span>
        </Link>

        {/* ── Desktop nav ──────────────────────────────────────────── */}
        <nav className="hidden sm:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map(({ href, label }) => {
            const isActive =
              href === "/"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(href + "/");

            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative px-4 py-2 text-sm rounded transition-colors duration-200",
                  isActive ? "text-foreground" : "text-muted hover:text-foreground"
                )}
              >
                {label}
                {/* Sliding underline dot for active state */}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-px bg-accent rounded-full"
                    transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── Right side: CTA ──────────────────────────────────────── */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="mailto:afnanfarid.dev@gmail.com"
            className="text-xs font-mono text-muted hover:text-foreground transition-colors duration-200 tracking-wide"
          >
            afnanfarid.dev@gmail.com
          </a>
          <motion.a
            href="mailto:afnanfarid.dev@gmail.com"
            className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent-dim text-white text-xs font-medium px-3.5 py-2 rounded transition-colors duration-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15, ease: EASE_OUT_EXPO }}
          >
            Get in touch
            <span aria-hidden className="text-white/70">→</span>
          </motion.a>
        </div>

        {/* ── Mobile nav ───────────────────────────────────────────── */}
        <nav className="flex sm:hidden items-center gap-4" aria-label="Main navigation">
          {navLinks.map(({ href, label }) => {
            const isActive =
              href === "/"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative text-xs transition-colors duration-200",
                  isActive ? "text-foreground" : "text-muted hover:text-foreground"
                )}
              >
                {label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator-mobile"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent rounded-full"
                    transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                  />
                )}
              </Link>
            );
          })}
          <a
            href="mailto:afnan@example.com"
            className="text-xs font-medium bg-accent hover:bg-accent-dim text-white px-3 py-1.5 rounded transition-colors duration-200"
          >
            Hire me
          </a>
        </nav>

      </div>
    </motion.header>
  );
}
