"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui-portfolio/section-header";
import { CVButton } from "@/components/ui-portfolio/cv-button";
import { siteConfig } from "@/config/site";
import { ArrowUpRightIcon, LinkedInIcon } from "@/components/ui-portfolio/icons";

const SUMMARY = [
  { label: "Education", value: "B.Sc. CSE · UIU · 2027" },
  { label: "Technical skills", value: "AI · Full Stack · Vision · Tools" },
  { label: "Projects", value: "6 selected — shipped + research" },
  { label: "Achievements", value: "Champion · UIU Project Show Fall 2025" },
  { label: "Research", value: "RCDR — agricultural diagnostics" },
];

export function Resume() {
  return (
    <section id="resume" className="relative py-28 sm:py-36 overflow-hidden">
      {/* ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, oklch(0.78 0.13 60 / 5%), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 relative">
        <SectionHeader
          index="09"
          kicker="Resume"
          title={
            <>
              Want the
              <br />
              <span className="text-gradient-accent">full story?</span>
            </>
          }
          description="Prefer a one-page summary? Download the CV or open LinkedIn for the full history."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-2xl glass">
              <div className="system-label mb-4">Direct downloads</div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <CVButton size="lg" variant="primary" className="flex-1 sm:flex-none" />
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
                  View LinkedIn
                  <ArrowUpRightIcon size={14} />
                </motion.a>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="system-label mb-3">CV file path</div>
                <code className="font-mono text-xs text-muted-foreground bg-foreground/5 px-3 py-2 rounded-md block break-all">
                  {siteConfig.cvPath} → download=&quot;{siteConfig.cvFileName}&quot;
                </code>
                <p className="mt-3 text-xs text-muted-foreground/70">
                  To replace the CV: drop a new PDF at{" "}
                  <code className="font-mono">/public/{siteConfig.cvFileName}</code>.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Summary list */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="p-6 sm:p-8 rounded-2xl glass h-full">
              <div className="system-label mb-5">At a glance</div>
              <ul className="space-y-4">
                {SUMMARY.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                    className="flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="text-sm text-foreground/80 font-medium">
                        {item.label}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {item.value}
                      </div>
                    </div>
                    <span className="section-number mt-1">{`0${i + 1}`}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
