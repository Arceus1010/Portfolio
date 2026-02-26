"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import type { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : "hidden"}
      animate="visible"
      variants={fadeIn}
    >
      {children}
    </motion.div>
  );
}
