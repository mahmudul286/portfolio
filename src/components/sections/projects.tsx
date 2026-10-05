"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeader } from "@/components/ui-portfolio/section-header";
import { ProjectCard } from "@/components/ui-portfolio/project-card";
import { ProjectModal } from "@/components/ui-portfolio/project-modal";
import {
  projects,
  projectFilters,
  type Project,
  type ProjectCategory,
} from "@/data/projects";

export function Projects() {
  const [filter, setFilter] = useState<"All" | ProjectCategory>("All");
  const [active, setActive] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.category.includes(filter));
  }, [filter]);

  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeader
          index="03"
          kicker="Selected Work"
          title={
            <>
              Projects as
              <br />
              <span className="text-muted-foreground">engineering evidence.</span>
            </>
          }
          description="A focused selection of shipped, in-development, and research-stage systems. Each one solves a real problem with a specific architecture."
        />

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 mb-10 flex flex-wrap items-center gap-2"
        >
          {projectFilters.map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                data-cursor="link"
                className={`relative px-4 h-9 rounded-full text-sm transition-colors ${
                  isActive
                    ? "text-background"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{f}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={setActive}
                index={i}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex items-center gap-3 text-muted-foreground"
        >
          <div className="h-px w-12 bg-foreground/15" />
          <span className="system-label">
            {filtered.length} project{filtered.length !== 1 ? "s" : ""} · click any card for details
          </span>
        </motion.div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
