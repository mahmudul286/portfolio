"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { withBasePath } from "@/lib/portfolio/paths";
import { DownloadIcon } from "./icons";

interface CVButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

/**
 * CV download button.
 *
 * Implementation notes:
 *  - The PDF lives at /public/Mahmudul-Hasan-CV.pdf (see siteConfig.cvPath).
 *  - The `download` attribute triggers a direct download rather than navigation.
 *  - To replace the CV: drop a new file at /public/Mahmudul-Hasan-CV.pdf.
 */
export function CVButton({
  variant = "primary",
  size = "md",
  className = "",
  label = "Download CV",
}: CVButtonProps) {
  const sizes: Record<string, string> = {
    sm: "h-9 px-4 text-sm gap-1.5",
    md: "h-11 px-5 text-sm gap-2",
    lg: "h-12 px-6 text-base gap-2",
  };

  const variants: Record<string, string> = {
    primary:
      "bg-foreground text-background hover:bg-foreground/90 border border-foreground/20",
    secondary:
      "glass-strong text-foreground hover:border-foreground/30",
    ghost:
      "text-foreground/80 hover:text-foreground hover:bg-foreground/5 border border-border",
  };

  return (
    <motion.a
      href={withBasePath(siteConfig.cvPath)}
      download={siteConfig.cvFileName}
      data-cursor="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`inline-flex items-center justify-center rounded-full font-medium tracking-tight transition-colors ${sizes[size]} ${variants[variant]} ${className}`}
    >
      <DownloadIcon size={16} />
      <span>{label}</span>
    </motion.a>
  );
}
