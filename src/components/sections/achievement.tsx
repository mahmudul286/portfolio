"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui-portfolio/section-header";
import { TrophyIcon } from "@/components/ui-portfolio/icons";

const TEAM = ["Swagotam Malakar", "Sharif Ahmed", "Nishat Rasul"];

export function Achievement() {
  return (
    <section id="achievement" className="relative py-28 sm:py-36 overflow-hidden">
      {/* Ambient background — premium award glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, oklch(0.78 0.13 60 / 8%), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 relative">
        <SectionHeader
          index="02"
          kicker="Featured Achievement"
          title={
            <>
              Champion —
              <br />
              <span className="text-gradient-accent">UIU CSE Project Show</span>
            </>
          }
          description="Recognized as the top project in the Fall 2025 cohort for Prohory — The Cyber Eye."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 relative"
        >
          {/* Main card */}
          <div className="relative overflow-hidden rounded-3xl glass-strong p-8 sm:p-12 lg:p-16">
            {/* Top row: #01 + label */}
            <div className="flex flex-wrap items-start justify-between gap-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accent/15 border border-accent/30 text-accent">
                  <TrophyIcon size={28} />
                </div>
                <div>
                  <div className="system-label text-accent/80">
                    Award · Fall 2025
                  </div>
                  <div className="font-display text-base sm:text-lg text-foreground mt-1">
                    United International University · CSE
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-display text-[80px] sm:text-[120px] lg:text-[160px] font-bold leading-none tracking-tighter text-gradient-accent">
                  #01
                </div>
              </div>
            </div>

            {/* Project identity */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
              <div className="lg:col-span-7">
                <div className="system-label mb-3">Project</div>
                <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight">
                  Prohory
                </h3>
                <p className="mt-1 font-mono text-sm text-muted-foreground uppercase tracking-[0.16em]">
                  The Cyber Eye
                </p>
                <p className="mt-6 text-base sm:text-lg text-foreground/75 leading-relaxed text-pretty">
                  A four-month engineering effort that produced a working
                  AI-powered cybersecurity platform — on-device threat
                  detection, a Spring Boot backend, and a React analytics
                  dashboard. Awarded the Champion title at the UIU CSE Project
                  Show, Fall 2025.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="system-label mb-3">Team</div>
                <ul className="space-y-2">
                  {TEAM.map((name, i) => (
                    <motion.li
                      key={name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3 text-sm text-foreground/80"
                    >
                      <span className="section-number">
                        0{i + 1}
                      </span>
                      <span>{name}</span>
                      {i === 0 && (
                        <span className="ml-auto system-label text-accent/70">
                          + Mahmudul Hasan
                        </span>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Animated timeline glow at the bottom */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="absolute bottom-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-transparent via-accent/60 to-transparent"
            />

            {/* Corner technical annotations */}
            <div className="absolute top-6 right-6 hidden md:flex flex-col items-end gap-1 text-muted-foreground">
              <span className="system-label">AWARD / CHAMPION</span>
              <span className="system-label">CYCLE / FALL-2025</span>
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 18,
              delay: 0.6,
            }}
            whileHover={{ rotate: 0, scale: 1.05 }}
            className="absolute -top-6 -right-3 sm:right-6 lg:right-10 z-10 hidden sm:block"
          >
            <div className="relative grid h-24 w-24 sm:h-28 sm:w-28 place-items-center rounded-full bg-accent/15 border-2 border-accent/40 backdrop-blur-md">
              <div className="text-center">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent/80">
                  Champion
                </div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-accent">
                  2025
                </div>
              </div>
              {/* rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border border-dashed border-accent/30"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
