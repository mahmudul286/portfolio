"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

/**
 * Generated project visuals — abstract architecture/UI motifs rendered with
 * SVG + CSS. No random stock images. Each project gets a distinct identity
 * driven by the `visual` field in the project data.
 */
export function ProjectVisual({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      aria-hidden
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.accent}`}
      />
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Per-visual motif */}
      <div className="relative h-full w-full p-6 flex flex-col justify-between min-h-[200px]">
        <VisualMotif project={project} />

        {/* Bottom index + status */}
        <div className="relative flex items-end justify-between">
          <span className="font-display text-5xl sm:text-6xl font-bold text-foreground/15">
            {project.index}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/40">
            {project.visual}
          </span>
        </div>
      </div>
    </div>
  );
}

function VisualMotif({ project }: { project: Project }) {
  switch (project.visual) {
    case "cyber":
      return <CyberMotif />;
    case "dashboard":
      return <DashboardMotif />;
    case "diagnostic":
      return <DiagnosticMotif />;
    case "campus":
      return <CampusMotif />;
    case "blockchain":
      return <BlockchainMotif />;
    case "stream":
      return <StreamMotif />;
    default:
      return null;
  }
}

function CyberMotif() {
  return (
    <div className="relative h-[140px]">
      {/* threat map nodes */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 140" fill="none">
        <defs>
          <linearGradient id="cyber-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.85 0.13 60)" stopOpacity="0" />
            <stop offset="50%" stopColor="oklch(0.85 0.13 60)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="oklch(0.85 0.13 60)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[20, 50, 80, 110].map((y, i) => (
          <motion.line
            key={y}
            x1="0"
            y1={y}
            x2="300"
            y2={y}
            stroke="url(#cyber-line)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: i * 0.1 }}
          />
        ))}
        {[
          { x: 60, y: 40 },
          { x: 130, y: 80 },
          { x: 220, y: 50 },
          { x: 270, y: 100 },
        ].map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3"
            fill="oklch(0.85 0.13 60)"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
          />
        ))}
      </svg>
      <div className="absolute top-2 left-2 font-mono text-[10px] text-foreground/50 space-y-1">
        <div>SMS_SCAN: <span className="text-rose-400">PHISHING_DETECTED</span></div>
        <div>URL_SCORE: <span className="text-amber-400">0.87</span></div>
        <div>CALL_PATTERN: <span className="text-emerald-400">SAFE</span></div>
      </div>
    </div>
  );
}

function DashboardMotif() {
  return (
    <div className="relative h-[140px]">
      <div className="absolute inset-0 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((col) => (
          <div
            key={col}
            className="rounded-lg bg-foreground/5 border border-foreground/10 p-2 flex flex-col gap-1.5"
          >
            <div className="h-1.5 w-2/3 rounded-full bg-foreground/20" />
            <div className="h-1 w-full rounded-full bg-foreground/10" />
            <div className="h-1 w-1/2 rounded-full bg-foreground/10" />
            <div className="mt-auto h-6 rounded bg-foreground/5 flex items-end overflow-hidden">
              <motion.div
                initial={{ height: "20%" }}
                whileInView={{ height: `${60 + col * 12}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + col * 0.1, duration: 0.8 }}
                className="w-full bg-violet-400/40"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-2 right-2 font-mono text-[10px] text-foreground/50">
        STREAK: <span className="text-violet-300">28d</span>
      </div>
    </div>
  );
}

function DiagnosticMotif() {
  return (
    <div className="relative h-[140px]">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 140" fill="none">
        {/* baseline signal */}
        <motion.path
          d="M0 70 L40 70 L50 50 L60 90 L70 60 L120 60 L130 80 L140 60 L300 60"
          stroke="oklch(0.7 0.16 150)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />
        {/* lost signal markers */}
        {[140, 220].map((x, i) => (
          <motion.g
            key={x}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 + i * 0.3 }}
          >
            <circle cx={x} cy={60} r="4" fill="none" stroke="oklch(0.85 0.13 60)" strokeWidth="1.5" />
            <line x1={x} y1="40" x2={x} y2="80" stroke="oklch(0.85 0.13 60)" strokeWidth="1" strokeDasharray="2 2" />
          </motion.g>
        ))}
      </svg>
      <div className="absolute top-2 left-2 font-mono text-[10px] text-foreground/50 space-y-1">
        <div>BASELINE: <span className="text-emerald-300">8 signals</span></div>
        <div>CHANGED: <span className="text-amber-300">6 signals</span></div>
        <div>LOST: <span className="text-rose-300">2 signals</span></div>
      </div>
    </div>
  );
}

function CampusMotif() {
  return (
    <div className="relative h-[140px]">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 140" fill="none">
        {/* network nodes */}
        <defs>
          <radialGradient id="campus-glow">
            <stop offset="0%" stopColor="oklch(0.7 0.13 200)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="oklch(0.7 0.13 200)" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* center */}
        <circle cx="150" cy="70" r="40" fill="url(#campus-glow)" />
        <motion.circle
          cx="150"
          cy="70"
          r="6"
          fill="oklch(0.7 0.13 200)"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
        />
        {/* satellites */}
        {[
          { x: 60, y: 40 },
          { x: 240, y: 40 },
          { x: 60, y: 100 },
          { x: 240, y: 100 },
          { x: 150, y: 20 },
          { x: 150, y: 120 },
        ].map((p, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.08 }}
          >
            <line x1="150" y1="70" x2={p.x} y2={p.y} stroke="oklch(0.7 0.13 200 / 30%)" strokeWidth="1" />
            <circle cx={p.x} cy={p.y} r="3" fill="oklch(0.7 0.13 200 / 60%)" />
          </motion.g>
        ))}
      </svg>
      <div className="absolute top-2 left-2 font-mono text-[10px] text-foreground/50 space-y-1">
        <div>USERS: <span className="text-sky-300">role-based</span></div>
        <div>SYNC: <span className="text-sky-300">OCR active</span></div>
      </div>
    </div>
  );
}

function BlockchainMotif() {
  return (
    <div className="relative h-[140px]">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 140" fill="none">
        {[40, 110, 180, 250].map((x, i) => (
          <motion.g
            key={x}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <rect
              x={x - 18}
              y={50}
              width="36"
              height="40"
              rx="6"
              fill="oklch(0.78 0.13 60 / 8%)"
              stroke="oklch(0.78 0.13 60 / 50%)"
              strokeWidth="1"
            />
            <text x={x} y="74" textAnchor="middle" className="font-mono" fontSize="9" fill="oklch(0.78 0.13 60 / 70%)">
              #{i + 1}
            </text>
            {i < 3 && (
              <line
                x1={x + 18}
                y1="70"
                x2={x + 53}
                y2="70"
                stroke="oklch(0.78 0.13 60 / 40%)"
                strokeWidth="1"
              />
            )}
          </motion.g>
        ))}
      </svg>
      <div className="absolute top-2 left-2 font-mono text-[10px] text-foreground/50 space-y-1">
        <div>CHAIN: <span className="text-amber-300">verified</span></div>
        <div>RECORDS: <span className="text-amber-300">immutable</span></div>
      </div>
    </div>
  );
}

function StreamMotif() {
  return (
    <div className="relative h-[140px]">
      <div className="absolute inset-0 grid grid-cols-2 gap-2">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="rounded-lg bg-foreground/5 border border-foreground/10 overflow-hidden relative"
          >
            <motion.div
              initial={{ x: "-100%" }}
              whileInView={{ x: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-400/10 to-transparent"
            />
            <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
                <span className="font-mono text-[9px] text-foreground/60">LIVE</span>
              </div>
              <span className="font-mono text-[9px] text-foreground/40">CH {i + 1}</span>
            </div>
            <div className="absolute bottom-2 left-2 right-2 space-y-1">
              <div className="h-1 w-2/3 rounded-full bg-foreground/20" />
              <div className="h-1 w-1/2 rounded-full bg-foreground/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
