"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

/**
 * Compact social icon buttons used in nav, hero, contact, and footer.
 */
export function SocialButtons({
  variant = "ghost",
  size = "md",
}: {
  variant?: "ghost" | "solid";
  size?: "sm" | "md";
}) {
  const btnSize = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  const iconSize = size === "sm" ? 16 : 18;

  const base =
    variant === "solid"
      ? "glass text-foreground/80 hover:text-foreground hover:border-foreground/30"
      : "text-foreground/60 hover:text-foreground hover:bg-foreground/5";

  return (
    <div className="flex items-center gap-2">
      <motion.a
        href={siteConfig.social.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        data-cursor="link"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={`${btnSize} grid place-items-center rounded-full border border-border transition-colors ${base}`}
      >
        <GitHubIcon size={iconSize} />
      </motion.a>
      <motion.a
        href={siteConfig.social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        data-cursor="link"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={`${btnSize} grid place-items-center rounded-full border border-border transition-colors ${base}`}
      >
        <LinkedInIcon size={iconSize} />
      </motion.a>
      <motion.a
        href={
          siteConfig.social.email === "ADD_EMAIL"
            ? "#contact"
            : `mailto:${siteConfig.social.email}`
        }
        aria-label="Email"
        data-cursor="link"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={`${btnSize} grid place-items-center rounded-full border border-border transition-colors ${base}`}
      >
        <MailIcon size={iconSize} />
      </motion.a>
    </div>
  );
}
