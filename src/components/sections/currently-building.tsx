"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui-portfolio/section-header";

const BUILDING = [
  {
    label: "AI Systems",
    desc: "Exploring on-device inference and applied AI for real-world signals.",
    status: "BUILDING",
    color: "text-emerald-300",
  },
  {
    label: "Developer Tools",
    desc: "DebugDNA — diagnosability regression testing as a category.",
    status: "BUILDING",
    color: "text-sky-300",
  },
  {
    label: "Research Projects",
    desc: "RCDR — Response-Conditioned Diagnostic Reasoning for agriculture.",
    status: "RESEARCHING",
    color: "text-amber-300",
  },
  {
    label: "Full-Stack Applications",
    desc: "CareerOS — a personal operating system for engineering careers.",
    status: "BUILDING",
    color: "text-violet-300",
  },
];

export function CurrentlyBuilding() {
  return (
    <section id="building" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeader
          index="07"
          kicker="Currently Building"
          title={
            <>
              Live status —
              <br />
              <span className="text-muted-foreground">what's on the bench.</span>
            </>
          }
          description="A snapshot of what I'm actively working on, learning, or researching right now."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
          {BUILDING.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative p-6 sm:p-8 rounded-2xl glass hover:border-foreground/25 transition-colors overflow-hidden"
            >
              {/* hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle 200px at var(--x, 50%) var(--y, 50%), oklch(1 0 0 / 4%), transparent 70%)",
                  }}
                />
              </div>

              <div className="relative flex items-start justify-between gap-4 mb-4">
                <span className="section-number">{`0${i + 1}`}</span>
                <div className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full bg-current ${item.color} animate-pulse`} />
                  <span className={`font-mono text-[10px] uppercase tracking-[0.16em] ${item.color}`}>
                    {item.status}
                  </span>
                </div>
              </div>

              <h3 className="relative font-display text-2xl font-medium text-foreground">
                {item.label}
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground leading-relaxed text-pretty">
                {item.desc}
              </p>

              {/* bottom accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                className="absolute bottom-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-foreground/15 to-transparent"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
