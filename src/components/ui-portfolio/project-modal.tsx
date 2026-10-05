"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { isLinkPending } from "@/data/projects";
import { ProjectVisual } from "@/components/ui-portfolio/project-visual";
import {
  ArrowUpRightIcon,
  GitHubIcon,
  LinkPendingIcon,
  LockIcon,
} from "@/components/ui-portfolio/icons";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-6"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-xl"
            onClick={onClose}
          />

          <motion.div
            layoutId={`project-${project.id}`}
            initial={{ y: 40, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 40, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="relative w-full sm:max-w-4xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl glass-strong"
          >
            {/* sticky close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="sticky top-4 z-10 ml-auto mr-4 grid h-10 w-10 place-items-center rounded-full bg-background/60 backdrop-blur border border-border text-foreground/80 hover:text-foreground hover:border-foreground/30 transition-colors float-right"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div className="p-5 sm:p-8 lg:p-12">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    {project.category.map((c) => (
                      <span
                        key={c}
                        className="font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/50"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight">
                    {project.title}
                  </h2>
                  {project.subtitle && (
                    <p className="mt-1 font-mono text-sm text-muted-foreground uppercase tracking-[0.14em]">
                      {project.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Visual */}
              <div className="mb-8">
                <ProjectVisual project={project} className="w-full" />
              </div>

              {/* Achievement callout */}
              {project.achievement && (
                <div className="mb-8 p-5 rounded-2xl bg-accent/10 border border-accent/25">
                  <div className="system-label text-accent/80 mb-2">Highlight</div>
                  <div className="font-display text-lg text-accent">
                    {project.achievement}
                  </div>
                </div>
              )}

              {/* Long description */}
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-10 text-pretty">
                {project.longDescription || project.description}
              </p>

              {/* Detail grid */}
              {project.detail && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 mb-10">
                  {project.detail.problem && (
                    <DetailBlock label="Problem" content={project.detail.problem} />
                  )}
                  {project.detail.solution && (
                    <DetailBlock label="Solution" content={project.detail.solution} />
                  )}
                  {project.detail.architecture && (
                    <DetailBlock
                      label="Architecture"
                      content={project.detail.architecture}
                      mono
                    />
                  )}
                  {project.detail.challenges && (
                    <DetailBlock
                      label="Challenges"
                      content={project.detail.challenges}
                    />
                  )}
                  {project.detail.outcome && (
                    <DetailBlock label="Outcome" content={project.detail.outcome} />
                  )}
                </div>
              )}

              {/* Key features */}
              {project.detail?.keyFeatures && (
                <div className="mb-10">
                  <div className="system-label mb-4">Key Features</div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.detail.keyFeatures.map((f, i) => (
                      <motion.li
                        key={f}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 text-sm text-foreground/80"
                      >
                        <span className="section-number mt-0.5">{`0${i + 1}`}</span>
                        <span>{f}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              <div className="mb-10">
                <div className="system-label mb-4">Technologies</div>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <span key={t} className="tech-chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-6 border-t border-border flex flex-wrap items-center gap-3">
                <ActionLink
                  href={project.github}
                  pending={isLinkPending(project.github)}
                  privateRepo={project.privateRepo}
                  type="github"
                />
                <ActionLink
                  href={project.live}
                  pending={isLinkPending(project.live)}
                  type="live"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DetailBlock({
  label,
  content,
  mono = false,
}: {
  label: string;
  content: string;
  mono?: boolean;
}) {
  return (
    <div>
      <div className="system-label mb-2">{label}</div>
      <p
        className={`text-sm leading-relaxed text-foreground/80 ${
          mono ? "font-mono text-[13px]" : ""
        }`}
      >
        {content}
      </p>
    </div>
  );
}

function ActionLink({
  href,
  pending,
  privateRepo,
  type,
}: {
  href?: string;
  pending: boolean;
  privateRepo?: boolean;
  type: "github" | "live";
}) {
  if (type === "github" && privateRepo) {
    return (
      <span className="inline-flex items-center gap-2 px-4 h-10 rounded-full border border-border bg-foreground/5 text-muted-foreground text-sm">
        <LockIcon size={14} />
        Private Repository
      </span>
    );
  }
  if (pending || !href) {
    return (
      <span className="inline-flex items-center gap-2 px-4 h-10 rounded-full border border-dashed border-border text-muted-foreground/60 text-sm">
        <LinkPendingIcon size={14} />
        {type === "github" ? "Repository link pending" : "Live demo pending"}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="link"
      className="inline-flex items-center gap-2 px-4 h-10 rounded-full bg-foreground text-background hover:bg-foreground/90 text-sm font-medium transition-colors"
    >
      {type === "github" ? <GitHubIcon size={14} /> : <ArrowUpRightIcon size={14} />}
      {type === "github" ? "View Code" : "Live Demo"}
    </a>
  );
}
