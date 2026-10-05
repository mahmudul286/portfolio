"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui-portfolio/section-header";
import { journeyItems } from "@/data/journey";

const TAG_STYLES: Record<string, string> = {
  Project: "text-sky-300 bg-sky-500/10 border-sky-500/20",
  Research: "text-amber-300 bg-amber-500/10 border-amber-500/20",
  Milestone: "text-accent bg-accent/10 border-accent/25",
  Learning: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
};

export function Journey() {
  return (
    <section id="journey" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeader
          index="05"
          kicker="Engineering Journey"
          title={
            <>
              A timeline of
              <br />
              <span className="text-muted-foreground">building, not just working.</span>
            </>
          }
          description="Milestones across the past two years — projects, research, and engineering checkpoints."
        />

        <div className="mt-16 relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[7px] sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-foreground/20 to-transparent origin-top"
          />

          <div className="space-y-12 sm:space-y-20">
            {journeyItems.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative grid sm:grid-cols-2 gap-4 sm:gap-12 ${
                    isLeft ? "" : "sm:[direction:rtl]"
                  }`}
                >
                  {/* dot */}
                  <div className="absolute left-0 sm:left-1/2 top-2 -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className={`h-3.5 w-3.5 rounded-full bg-gradient-to-br ${item.accent} ring-4 ring-background`}
                    />
                  </div>

                  {/* card */}
                  <div
                    className={`pl-8 sm:pl-0 [direction:ltr] ${
                      isLeft ? "sm:pr-12 sm:text-right" : "sm:col-start-2 sm:pl-12"
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-md border text-[10px] font-mono uppercase tracking-wider ${
                        TAG_STYLES[item.tag]
                      }`}
                    >
                      {item.tag}
                    </div>
                    <div className="mt-3 font-mono text-xs text-muted-foreground uppercase tracking-[0.16em]">
                      {item.year}
                    </div>
                    <h3 className="mt-1 font-display text-2xl font-medium text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed text-pretty">
                      {item.description}
                    </p>
                  </div>

                  {/* empty side */}
                  <div className="hidden sm:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
