"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks-portfolio/use-reduced-motion";

type CursorState = "default" | "hoverable" | "button" | "project" | "link";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeFinePointer(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(FINE_POINTER_QUERY);
  mq.addEventListener?.("change", callback);
  return () => mq.removeEventListener?.("change", callback);
}
function getFinePointerSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(FINE_POINTER_QUERY).matches;
}
function getFinePointerServerSnapshot() {
  return false;
}

/**
 * Detects whether the current device supports hover + fine pointer
 * (i.e. desktop with a mouse). Returns false on touch / coarse pointer.
 */
function useIsFinePointer() {
  return useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot
  );
}

/**
 * Subtle custom cursor with state-aware labels.
 * - Disabled on touch devices and reduced-motion users.
 * - Native cursor is hidden via `.custom-cursor-active` (see globals.css).
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const finePointer = useIsFinePointer();
  const enabled = finePointer && !reduced;

  const [state, setState] = useState<CursorState>("default");
  const [hidden, setHidden] = useState(true);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("custom-cursor-active");
      return;
    }
    document.documentElement.classList.add("custom-cursor-active");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setHidden(false);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor]"
      );
      const next = (target?.dataset.cursor as CursorState) || "default";
      setState((prev) => (prev !== next ? next : prev));
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    const ringLoop = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(ringLoop);
    };
    raf = requestAnimationFrame(ringLoop);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  const ringSize =
    state === "project"
      ? 88
      : state === "button"
      ? 64
      : state === "link"
      ? 48
      : state === "hoverable"
      ? 44
      : 32;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ opacity: hidden ? 0 : 1, transition: "opacity 0.2s ease" }}
    >
      <div
        ref={dotRef}
        className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-foreground/80"
        style={{ transition: "width 0.2s, height 0.2s" }}
      />
      <motion.div
        ref={ringRef}
        className="absolute top-0 left-0 rounded-full border border-foreground/30 flex items-center justify-center"
        animate={{
          width: ringSize,
          height: ringSize,
          backgroundColor:
            state === "project"
              ? "oklch(0.78 0.13 60 / 8%)"
              : "oklch(1 0 0 / 0%)",
          borderColor:
            state === "project"
              ? "oklch(0.78 0.13 60 / 60%)"
              : "oklch(1 0 0 / 25%)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      >
        <AnimatePresence mode="wait">
          {state === "project" && (
            <motion.span
              key="project"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/80 whitespace-nowrap"
            >
              View →
            </motion.span>
          )}
          {state === "button" && (
            <motion.span
              key="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="h-1 w-1 rounded-full bg-foreground/60"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
