"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui-portfolio/section-header";
import { skillGroups, skillMarquee } from "@/data/skills";

export function Skills() {
  // duplicate for seamless marquee
  const marqueeRow = [...skillMarquee, ...skillMarquee];

  return (
    <section id="skills" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeader
          index="04"
          kicker="Toolkit"
          title={
            <>
              Skills, grouped by
              <br />
              <span className="text-muted-foreground">how I actually use them.</span>
            </>
          }
          description="No fake proficiency bars. These are the tools I reach for when shipping real software."
        />

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 mb-16 marquee-pause"
        >
          <div className="relative">
            {/* edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            <div className="flex marquee-track">
              {marqueeRow.map((s, i) => (
                <div key={i} className="flex items-center">
                  <span className="font-display text-3xl sm:text-4xl text-foreground/15 hover:text-foreground/40 transition-colors px-6 whitespace-nowrap">
                    {s}
                  </span>
                  <span className="text-accent/30">/</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Grouped grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative p-6 rounded-2xl glass hover:border-foreground/20 transition-colors"
            >
              {/* header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="system-label">{`/ ${group.id}`}</div>
                  <h3 className="mt-1 font-display text-xl font-medium text-foreground">
                    {group.label}
                  </h3>
                </div>
                <span className="section-number">{`0${i + 1}`}</span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {group.description}
              </p>

              {/* skills */}
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="tech-chip group-hover:border-foreground/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
