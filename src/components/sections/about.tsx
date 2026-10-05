"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui-portfolio/section-header";
import { siteConfig } from "@/config/site";

const FOCUS_AREAS = [
  "AI",
  "Full Stack Development",
  "Computer Vision",
  "Cybersecurity",
  "Developer Tools",
  "Research",
];

const INFO_CARDS = [
  {
    label: "Education",
    title: siteConfig.university,
    sub: siteConfig.degree,
    detail: `Expected graduation · ${siteConfig.graduationYear}`,
    icon: "01",
  },
  {
    label: "Focus Areas",
    title: "Where I build",
    sub: "AI • Full Stack • Vision • Security",
    detail: "Six focus areas, one engineering mindset.",
    icon: "02",
    list: FOCUS_AREAS,
  },
  {
    label: "Current Goal",
    title: "Engineering career",
    sub: "Software engineering / AI track",
    detail:
      "Preparing for a software engineering or AI-focused career through coursework, projects, and research.",
    icon: "03",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeader
          index="01"
          kicker="About"
          title={
            <>
              Engineering identity,
              <br />
              <span className="text-muted-foreground">not autobiography.</span>
            </>
          }
          description="A short snapshot of who I am, what I build, and where I'm headed."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="system-label">narrative</span>
              <div className="h-px flex-1 bg-foreground/10" />
            </div>
            <p className="text-xl sm:text-2xl text-foreground/85 leading-relaxed font-display tracking-tight text-pretty">
              I'm{" "}
              <span className="text-foreground">{siteConfig.name}</span>, a{" "}
              <span className="text-foreground">Computer Science &
              Engineering</span> student at{" "}
              <span className="text-foreground">{siteConfig.university}</span>.
              I enjoy building software systems that sit at the intersection of
              AI, automation, full-stack engineering, and real-world problem
              solving.
            </p>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
              My projects range from{" "}
              <span className="text-foreground/90">
                AI-powered cybersecurity
              </span>{" "}
              and{" "}
              <span className="text-foreground/90">
                intelligent developer tooling
              </span>{" "}
              to{" "}
              <span className="text-foreground/90">university platforms</span>{" "}
              and{" "}
              <span className="text-foreground/90">
                research-driven systems
              </span>
              . I care about diagnosability, real-world signal, and software
              that holds up under messy production conditions.
            </p>

            {/* Concept re-statement */}
            <div className="mt-10 p-5 sm:p-6 rounded-2xl glass">
              <div className="system-label mb-2">{siteConfig.systemLabels.portfolio}</div>
              <p className="font-display text-lg sm:text-xl text-foreground/90 tracking-tight">
                {siteConfig.concept}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Learn → Build → Research → Experiment → Solve.
              </p>
            </div>
          </motion.div>

          {/* Info cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {INFO_CARDS.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative p-5 sm:p-6 rounded-2xl glass hover:border-foreground/20 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="system-label">{card.label}</span>
                  <span className="section-number">{card.icon}</span>
                </div>
                <h3 className="font-display text-lg font-medium text-foreground">
                  {card.title}
                </h3>
                <p className="text-sm text-foreground/70 mt-1">{card.sub}</p>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {card.detail}
                </p>
                {card.list && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {card.list.map((item) => (
                      <span key={item} className="tech-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
