"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  index: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  kicker?: string;
}

/**
 * Standardized section header used across the portfolio.
 * Renders: section index → kicker → title → description.
 */
export function SectionHeader({
  index,
  title,
  description,
  align = "left",
  kicker,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={
        align === "center"
          ? "flex flex-col items-center text-center"
          : "flex flex-col items-start text-left"
      }
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="section-number">{index}</span>
        <div className="h-px w-12 bg-foreground/15" />
        {kicker && <span className="system-label">{kicker}</span>}
      </div>
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base sm:text-lg text-muted-foreground text-pretty max-w-2xl leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
