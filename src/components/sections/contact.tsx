"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui-portfolio/section-header";
import { siteConfig } from "@/config/site";
import { GitHubIcon, LinkedInIcon, MailIcon, ArrowUpRightIcon } from "@/components/ui-portfolio/icons";

export function Contact() {
  const emailReady = siteConfig.email !== "ADD_EMAIL";

  return (
    <section id="contact" className="relative py-28 sm:py-40 overflow-hidden">
      {/* Strong ambient glow for the closing section */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.78 0.13 60 / 10%), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="status-dot" />
            <span className="system-label">{siteConfig.status}</span>
          </div>

          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-balance">
            <span className="text-gradient">Let's build something</span>
            <br />
            <span className="text-gradient-accent">meaningful.</span>
          </h2>

          <p className="mt-8 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
            I'm always interested in interesting engineering problems, research
            ideas, collaborations, and opportunities to build useful technology.
          </p>

          {/* Action buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            {emailReady ? (
              <motion.a
                href={`mailto:${siteConfig.email}`}
                data-cursor="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex h-12 px-6 items-center justify-center gap-2 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
              >
                <MailIcon size={16} />
                Email Me
              </motion.a>
            ) : (
              <motion.div
                className="inline-flex h-12 px-6 items-center justify-center gap-2 rounded-full border border-dashed border-border text-muted-foreground/70 font-medium cursor-not-allowed"
                title="Add an email in src/config/site.ts to enable this button."
              >
                <MailIcon size={16} />
                Email — add in config
              </motion.div>
            )}

            <motion.a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex h-12 px-6 items-center justify-center gap-2 rounded-full glass-strong text-foreground hover:border-foreground/30 transition-colors font-medium"
            >
              <LinkedInIcon size={16} />
              LinkedIn
              <ArrowUpRightIcon size={14} />
            </motion.a>

            <motion.a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex h-12 px-6 items-center justify-center gap-2 rounded-full glass-strong text-foreground hover:border-foreground/30 transition-colors font-medium"
            >
              <GitHubIcon size={16} />
              GitHub
              <ArrowUpRightIcon size={14} />
            </motion.a>
          </div>

          {/* Email hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-10 text-sm text-muted-foreground"
          >
            {emailReady ? (
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-mono text-foreground/70 hover:text-foreground transition-colors"
              >
                {siteConfig.email}
              </a>
            ) : (
              <span className="font-mono">
                Email placeholder — replace{" "}
                <code className="px-1.5 py-0.5 rounded bg-foreground/5 text-foreground/80">
                  ADD_EMAIL
                </code>{" "}
                in{" "}
                <code className="px-1.5 py-0.5 rounded bg-foreground/5 text-foreground/80">
                  src/config/site.ts
                </code>
              </span>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
