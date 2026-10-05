"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui-portfolio/section-header";

const PIPELINE = [
  { step: "01", label: "Sense", desc: "Capture observations via sensors, vision, and contextual inputs." },
  { step: "02", label: "Detect", desc: "Identify candidate symptoms and possible causes." },
  { step: "03", label: "Intervene", desc: "Apply a controlled intervention to disambiguate causes." },
  { step: "04", label: "Observe Response", desc: "Measure how the system responds to the intervention." },
  { step: "05", label: "Update Diagnosis", desc: "Refine the diagnosis using the response signal." },
];

const INTERESTS = [
  "AI for real-world systems",
  "Agricultural intelligence",
  "Autonomous systems",
  "Sensor fusion",
  "Computer vision",
  "Intelligent diagnostics",
];

export function Research() {
  return (
    <section id="research" className="relative py-28 sm:py-36 overflow-hidden">
      {/* ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 30% 40%, oklch(0.78 0.13 60 / 6%), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 relative">
        <SectionHeader
          index="06"
          kicker="Research & Exploration"
          title={
            <>
              Where sensing, AI,
              <br />
              <span className="text-muted-foreground">and decision-making meet.</span>
            </>
          }
          description="I'm interested in research problems where sensing, AI, software systems, and real-world decision making intersect."
        />

        {/* RCDR feature */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 rounded-3xl glass p-6 sm:p-10 lg:p-12"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-10">
            <div>
              <div className="system-label text-accent/80">Featured research direction</div>
              <h3 className="mt-2 font-display text-3xl sm:text-4xl font-medium tracking-tight">
                RCDR
              </h3>
              <p className="mt-1 font-mono text-sm text-muted-foreground uppercase tracking-[0.14em]">
                Response-Conditioned Diagnostic Reasoning
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="status-dot" />
              <span className="system-label">In exploration</span>
            </div>
          </div>

          <p className="text-base sm:text-lg text-foreground/75 leading-relaxed max-w-3xl text-pretty mb-12">
            A research-oriented agricultural diagnostic framework exploring how
            controlled intervention and plant response can improve diagnosis
            when multiple causes produce similar observable symptoms.
          </p>

          {/* Animated pipeline */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2">
              {PIPELINE.map((node, i) => (
                <div key={node.step} className="relative">
                  {/* connector line (desktop) */}
                  {i < PIPELINE.length - 1 && (
                    <div className="hidden md:block absolute top-7 left-[60%] right-[-20%] h-px">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                        className="h-full origin-left bg-gradient-to-r from-accent/60 to-accent/10"
                      />
                      {/* animated pulse */}
                      <motion.div
                        animate={{ x: ["0%", "100%"], opacity: [0, 1, 0] }}
                        transition={{
                          duration: 2.4,
                          repeat: Infinity,
                          delay: i * 0.4,
                          ease: "easeInOut",
                        }}
                        className="absolute top-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-accent"
                      />
                    </div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.15 }}
                    className="relative"
                  >
                    {/* node */}
                    <div className="relative grid h-14 w-14 place-items-center rounded-2xl glass-strong mb-3">
                      <span className="font-display text-lg font-semibold text-accent">
                        {node.step}
                      </span>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                        className="absolute inset-0 rounded-2xl border border-accent/30"
                      />
                    </div>
                    <h4 className="font-display text-base font-medium text-foreground">
                      {node.label}
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {node.desc}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          <div className="lg:col-span-4">
            <div className="system-label mb-2">Broader interests</div>
            <h3 className="font-display text-2xl font-medium text-foreground">
              What I'm paying attention to.
            </h3>
          </div>
          <div className="lg:col-span-8 flex flex-wrap gap-2">
            {INTERESTS.map((interest, i) => (
              <motion.span
                key={interest}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -2 }}
                className="px-4 py-2 rounded-full border border-border bg-foreground/[0.03] text-sm text-foreground/80 hover:text-foreground hover:border-foreground/25 transition-colors"
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
