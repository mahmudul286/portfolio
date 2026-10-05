"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "@/data/projects";
import { isLinkPending } from "@/data/projects";
import { ProjectVisual } from "@/components/ui-portfolio/project-visual";
import {
  ArrowUpRightIcon,
  GitHubIcon,
  LinkPendingIcon,
  LockIcon,
} from "@/components/ui-portfolio/icons";

interface ProjectCardProps {
  project: Project;
  onOpen: (p: Project) => void;
  index: number;
}

export function ProjectCard({ project, onOpen, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);

  // 3D tilt
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 22 });
  const sry = useSpring(ry, { stiffness: 200, damping: 22 });
  const rotateX = useTransform(srx, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(sry, [-0.5, 0.5], ["-6deg", "6deg"]);

  // hover-following gradient
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const glowX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(my, [0, 1], ["0%", "100%"]);
  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(circle 200px at ${x} ${y}, oklch(1 0 0 / 6%), transparent 70%)`
  );

  const handleMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rx.set(py);
    ry.set(px);
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
    mx.set(0.5);
    my.set(0.5);
  };

  const githubPending = isLinkPending(project.github);
  const livePending = isLinkPending(project.live);
  const showGithubButton = !githubPending || project.privateRepo;

  return (
    <motion.button
      ref={cardRef}
      layout
      layoutId={`project-${project.id}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={() => onOpen(project)}
      data-cursor="project"
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="group relative text-left rounded-3xl glass overflow-hidden hover:border-foreground/25 transition-colors"
    >
      {/* hover-following glow */}
      <motion.div
        aria-hidden
        style={{ background: glowBg }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />

      {/* Visual */}
      <div className="relative p-3">
        <div className="overflow-hidden rounded-2xl">
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <ProjectVisual project={project} className="w-full" />
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <div className="relative p-6 pt-3">
        {/* Top row: status + achievement */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {project.category.slice(0, 2).map((c) => (
              <span
                key={c}
                className="font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/50"
              >
                {c}
              </span>
            ))}
          </div>
          <StatusBadge status={project.status} />
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl font-medium tracking-tight text-foreground group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="mt-1 font-mono text-xs text-muted-foreground uppercase tracking-[0.14em]">
            {project.subtitle}
          </p>
        )}

        {/* Description */}
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed line-clamp-3 text-pretty">
          {project.description}
        </p>

        {/* Achievement chip */}
        {project.achievement && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-medium">
            <span className="status-dot" />
            {project.achievement}
          </div>
        )}

        {/* Tech chips */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((t) => (
            <span key={t} className="tech-chip">
              {t}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="tech-chip">+{project.technologies.length - 4}</span>
          )}
        </div>

        {/* Footer actions */}
        <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-sm text-foreground/80 group-hover:text-foreground transition-colors">
            View details
            <ArrowUpRightIcon
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
          <div className="flex items-center gap-1.5">
            {project.privateRepo ? (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-foreground/5 border border-border text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                <LockIcon size={11} />
                Private
              </span>
            ) : showGithubButton ? (
              <span
                role="link"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!githubPending)
                    window.open(project.github, "_blank", "noopener,noreferrer");
                }}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border text-[10px] font-mono uppercase tracking-wider transition-colors ${
                  githubPending
                    ? "border-border text-muted-foreground/50"
                    : "border-border text-foreground/70 hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {githubPending ? <LinkPendingIcon size={11} /> : <GitHubIcon size={11} />}
                Code
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const map: Record<Project["status"], { color: string; label: string }> = {
    Shipped: { color: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20", label: "Shipped" },
    "In Development": { color: "text-sky-300 bg-sky-500/10 border-sky-500/20", label: "In Dev" },
    Research: { color: "text-amber-300 bg-amber-500/10 border-amber-500/20", label: "Research" },
    Concept: { color: "text-foreground/60 bg-foreground/5 border-border", label: "Concept" },
    Champion: { color: "text-accent bg-accent/10 border-accent/30", label: "Champion" },
  };
  const s = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md border text-[10px] font-mono uppercase tracking-wider ${s.color}`}
    >
      {status === "In Development" || status === "Research" ? (
        <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
      ) : null}
      {s.label}
    </span>
  );
}
