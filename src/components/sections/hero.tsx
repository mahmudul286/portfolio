"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { siteConfig } from "@/config/site";
import { CVButton } from "@/components/ui-portfolio/cv-button";
import { SocialButtons } from "@/components/ui-portfolio/social-buttons";
import { ArrowUpRightIcon } from "@/components/ui-portfolio/icons";
import { useReducedMotion } from "@/hooks-portfolio/use-reduced-motion";

const FLOATING_KEYWORDS = [
  { word: "AI", x: "12%", y: "22%", delay: 0.4, dur: 7.5 },
  { word: "Systems", x: "82%", y: "18%", delay: 1.1, dur: 8.2 },
  { word: "Computer Vision", x: "8%", y: "65%", delay: 0.8, dur: 9 },
  { word: "Cybersecurity", x: "85%", y: "70%", delay: 1.4, dur: 7.8 },
  { word: "Full Stack", x: "18%", y: "82%", delay: 1.0, dur: 8.6 },
  { word: "Research", x: "76%", y: "40%", delay: 0.6, dur: 9.4 },
  { word: "Automation", x: "30%", y: "12%", delay: 1.2, dur: 8.0 },
  { word: "Problem Solving", x: "62%", y: "85%", delay: 0.9, dur: 8.8 },
];

export function Hero() {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  // cursor-reactive background
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.3);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const glowX = useTransform(sx, [0, 1], ["-20%", "120%"]);
  const glowY = useTransform(sy, [0, 1], ["-20%", "120%"]);
  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(circle 600px at ${x} ${y}, oklch(0.78 0.13 60 / 12%), transparent 70%)`
  );

  useEffect(() => {
    if (reduced || typeof window === "undefined") return;
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduced]);

  const handleViewWork = () => {
    document
      .getElementById("projects")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const containerStagger = {
    animate: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-20"
    >
      {/* === Background layers === */}
      {/* Base radial gradient */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, oklch(0.78 0.13 60 / 8%), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, oklch(0.7 0.13 200 / 5%), transparent 60%)",
        }}
      />

      {/* Animated grid */}
      {!reduced && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute inset-0 grid-bg"
        />
      )}

      {/* Cursor-following ambient glow */}
      {!reduced && (
        <motion.div
          aria-hidden
          style={{ background: glowBg }}
          className="absolute inset-0 transition-opacity"
        />
      )}

      {/* Static ambient gradient blobs (very subtle) */}
      <motion.div
        aria-hidden
        animate={
          reduced
            ? undefined
            : { x: [0, 30, 0], y: [0, -20, 0], opacity: [0.4, 0.6, 0.4] }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.13 60 / 8%), transparent 70%)",
        }}
      />
      <motion.div
        aria-hidden
        animate={
          reduced
            ? undefined
            : { x: [0, -30, 0], y: [0, 20, 0], opacity: [0.3, 0.5, 0.3] }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.7 0.13 200 / 6%), transparent 70%)",
        }}
      />

      {/* Light streak */}
      {!reduced && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="light-streak" />
        </div>
      )}

      {/* Floating technical keywords (desktop only, very subtle) */}
      {!reduced && (
        <div className="absolute inset-0 hidden lg:block pointer-events-none">
          {FLOATING_KEYWORDS.map((kw) => (
            <motion.span
              key={kw.word}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.35, y: 0 }}
              transition={{ delay: kw.delay, duration: 1.2 }}
              className="absolute font-mono text-xs tracking-widest uppercase text-foreground/40 float-soft"
              style={{
                left: kw.x,
                top: kw.y,
                animationDuration: `${kw.dur}s`,
                animationDelay: `${kw.delay}s`,
              }}
            >
              {kw.word}
            </motion.span>
          ))}
        </div>
      )}

      {/* === Hero content === */}
      <motion.div
        variants={containerStagger}
        initial="hidden"
        animate="animate"
        className="relative z-10 mx-auto max-w-7xl w-full px-5 sm:px-8 lg:px-12"
      >
        {/* Top status row */}
        <motion.div
          variants={item}
          className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-10 sm:mb-14"
        >
          <div className="flex items-center gap-2">
            <span className="status-dot" />
            <span className="system-label">{siteConfig.status}</span>
          </div>
          <div className="hidden sm:block h-3 w-px bg-foreground/15" />
          <span className="system-label">{siteConfig.systemLabels.location}</span>
          <div className="hidden sm:block h-3 w-px bg-foreground/15" />
          <span className="system-label">{siteConfig.systemLabels.build}</span>
        </motion.div>

        {/* Identity row */}
        <motion.div variants={item} className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="font-mono text-xs uppercase tracking-[0.18em]">
              {siteConfig.systemLabels.role}
            </span>
            <div className="h-px w-12 bg-foreground/15" />
            <span className="font-mono text-xs uppercase tracking-[0.18em]">
              {siteConfig.university}
            </span>
          </div>
        </motion.div>

        {/* Big name */}
        <motion.h1
          variants={item}
          className="font-display font-semibold tracking-tight leading-[0.95] text-balance"
        >
          <span className="block text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8.5vw] xl:text-[140px]">
            <span className="text-gradient">Mahmudul</span>
          </span>
          <span className="block text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8.5vw] xl:text-[140px]">
            <span className="text-gradient-accent">Hasan</span>
          </span>
        </motion.h1>

        {/* Sub-roles */}
        <motion.div
          variants={item}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0"
        >
          <span className="font-display text-lg sm:text-xl text-foreground/90">
            {siteConfig.role}
          </span>
          <span className="hidden sm:inline mx-3 text-foreground/30">/</span>
          <span className="font-mono text-sm sm:text-base text-muted-foreground">
            {siteConfig.subRoles.join(" • ")}
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="mt-8 sm:mt-10 max-w-2xl text-lg sm:text-xl text-foreground/70 leading-relaxed text-pretty"
        >
          {siteConfig.tagline}
        </motion.p>

        {/* Concept line */}
        <motion.div
          variants={item}
          className="mt-5 flex items-center gap-3 text-muted-foreground"
        >
          <div className="h-px w-8 bg-accent/60" />
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent/80">
            {siteConfig.concept}
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
        >
          <motion.button
            onClick={handleViewWork}
            data-cursor="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="group inline-flex h-12 px-6 items-center justify-center gap-2 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
          >
            <span>View My Work</span>
            <ArrowUpRightIcon
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.button>
          <CVButton size="lg" variant="secondary" />
          <div className="sm:ml-2 mt-3 sm:mt-0">
            <SocialButtons />
          </div>
        </motion.div>

        {/* Bottom scroll hint */}
        <motion.div
          variants={item}
          className="mt-16 sm:mt-20 hidden md:flex items-center gap-3 text-muted-foreground"
        >
          <span className="system-label">Scroll to explore</span>
          <motion.div
            animate={reduced ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-px bg-gradient-to-b from-foreground/40 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
