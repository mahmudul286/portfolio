"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { TerminalIcon } from "@/components/ui-portfolio/icons";

type Line = { kind: "out" | "in"; text: string };

const HELP: Record<string, string | (() => string)> = {
  help: () =>
    [
      "Available commands:",
      "  whoami     — identity summary",
      "  projects   — list selected projects",
      "  skills     — list skill groups",
      "  contact    — show contact channels",
      "  cv         — show CV path",
      "  clear      — clear the terminal",
      "  exit       — close the terminal",
    ].join("\n"),
  whoami: () =>
    [
      `${siteConfig.name} — ${siteConfig.role}`,
      `${siteConfig.university} · ${siteConfig.degree}`,
      `Expected graduation: ${siteConfig.graduationYear}`,
      `Location: ${siteConfig.location}`,
      "",
      siteConfig.concept,
    ].join("\n"),
  projects: () =>
    [
      "Selected projects:",
      ...projects.map(
        (p) =>
          `  ${p.index}  ${p.title.padEnd(14)}  [${p.category.join(", ")}]  ${
            p.achievement ?? p.status
          }`
      ),
    ].join("\n"),
  skills: () =>
    [
      "Skill groups:",
      ...skillGroups.map(
        (g) => `  ${g.label.padEnd(18)} ${g.skills.join(" · ")}`
      ),
    ].join("\n"),
  contact: () =>
    [
      "Contact channels:",
      `  GitHub    ${siteConfig.social.github}`,
      `  LinkedIn  ${siteConfig.social.linkedin}`,
      `  Email     ${
        siteConfig.email === "ADD_EMAIL" ? "(add in config/site.ts)" : siteConfig.email
      }`,
    ].join("\n"),
  cv: () =>
    [
      "CV file:",
      `  Path       ${siteConfig.cvPath}`,
      `  Filename   ${siteConfig.cvFileName}`,
      "  Replace by dropping a new PDF at /public/Mahmudul-Hasan-CV.pdf",
    ].join("\n"),
};

export function EasterEggTerminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "// Portfolio terminal v1.0 — type `help` to begin." },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut: Ctrl + ` (backtick) toggles the terminal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setLines((prev) => [...prev, { kind: "in", text: raw }]);

    if (cmd === "clear") {
      setLines([]);
      return;
    }
    if (cmd === "exit") {
      setOpen(false);
      setLines([
        { kind: "out", text: "// Portfolio terminal v1.0 — type `help` to begin." },
      ]);
      return;
    }
    const handler = HELP[cmd];
    if (handler) {
      const out = typeof handler === "function" ? handler() : handler;
      setLines((prev) => [...prev, { kind: "out", text: out }]);
    } else {
      setLines((prev) => [
        ...prev,
        { kind: "out", text: `command not found: ${cmd} — type \`help\`` },
      ]);
    }
  };

  return (
    <>
      {/* Floating trigger button — subtle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => setOpen(true)}
        aria-label="Open developer terminal"
        title="Developer terminal (Ctrl + `)"
        className="fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full glass-strong text-foreground/70 hover:text-foreground hover:border-foreground/30 transition-colors"
      >
        <TerminalIcon size={16} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed bottom-5 right-5 z-[90] w-[92vw] max-w-md h-[60vh] max-h-[420px] rounded-2xl glass-strong overflow-hidden flex flex-col"
          >
            {/* title bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-foreground/[0.03]">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  mahmudul@portfolio: ~
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close terminal"
                className="text-muted-foreground hover:text-foreground transition-colors text-xs"
              >
                ✕
              </button>
            </div>

            {/* output */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 font-mono text-[12px] leading-relaxed"
            >
              {lines.map((line, i) => (
                <pre
                  key={i}
                  className={`whitespace-pre-wrap break-words ${
                    line.kind === "in"
                      ? "text-foreground/80"
                      : "text-muted-foreground"
                  }`}
                >
                  {line.kind === "in" ? (
                    <span>
                      <span className="text-accent">$</span> {line.text}
                    </span>
                  ) : (
                    line.text
                  )}
                </pre>
              ))}
              {/* prompt */}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-accent">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      run(input);
                      setInput("");
                    }
                  }}
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/40"
                  placeholder="type a command, then Enter…"
                  aria-label="Terminal input"
                />
              </div>
            </div>

            {/* footer hint */}
            <div className="px-4 py-2 border-t border-border bg-foreground/[0.03]">
              <span className="font-mono text-[10px] text-muted-foreground">
                Try: <span className="text-foreground/70">help</span> ·{" "}
                <span className="text-foreground/70">whoami</span> ·{" "}
                <span className="text-foreground/70">projects</span> ·{" "}
                <span className="text-foreground/70">skills</span> ·{" "}
                <span className="text-foreground/70">contact</span> · Esc to close
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
