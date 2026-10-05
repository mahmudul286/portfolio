"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { CVButton } from "@/components/ui-portfolio/cv-button";
import { GitHubIcon, LinkedInIcon } from "@/components/ui-portfolio/icons";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // active section detection
      const sections = siteConfig.nav.map((n) => n.href.slice(1));
      const offset = window.innerHeight * 0.4;
      let current = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= offset) current = id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? "glass-strong border-b border-border"
              : "bg-transparent border-b border-transparent"
          }`}
        >
          <nav
            className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12"
            aria-label="Primary"
          >
            <div className="flex h-16 items-center justify-between gap-6">
              {/* Logo / monogram */}
              <button
                onClick={() => handleNav("#home")}
                data-cursor="link"
                className="group flex items-center gap-3"
                aria-label="Go to top"
              >
                <span className="relative grid h-9 w-9 place-items-center rounded-full border border-foreground/20 font-display text-sm font-semibold">
                  {siteConfig.monogram}
                  <span className="absolute inset-0 rounded-full bg-foreground/0 group-hover:bg-foreground/5 transition-colors" />
                </span>
                <div className="hidden sm:flex flex-col leading-tight">
                  <span className="text-sm font-medium tracking-tight">
                    {siteConfig.name}
                  </span>
                  <span className="system-label text-[0.6rem]">
                    {siteConfig.systemLabels.portfolio}
                  </span>
                </div>
              </button>

              {/* Desktop nav */}
              <div className="hidden lg:flex items-center gap-1">
                {siteConfig.nav.map((item) => {
                  const id = item.href.slice(1);
                  const isActive = active === id;
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleNav(item.href)}
                      data-cursor="link"
                      className="relative px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="relative z-10">{item.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-full bg-foreground/5 border border-foreground/10"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="hidden sm:flex items-center gap-1">
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    data-cursor="link"
                    className="grid h-9 w-9 place-items-center rounded-full text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
                  >
                    <GitHubIcon size={17} />
                  </a>
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    data-cursor="link"
                    className="grid h-9 w-9 place-items-center rounded-full text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
                  >
                    <LinkedInIcon size={17} />
                  </a>
                </div>
                <div className="hidden sm:block">
                  <CVButton size="sm" variant="secondary" />
                </div>

                {/* Mobile toggle */}
                <button
                  onClick={() => setOpen(true)}
                  aria-label="Open menu"
                  className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-border text-foreground"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="absolute right-0 top-0 h-full w-[82%] max-w-sm glass-strong border-l border-border p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-display text-lg font-medium">
                  {siteConfig.name}
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {siteConfig.nav.map((item, i) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.04 }}
                    onClick={() => handleNav(item.href)}
                    className="flex items-center justify-between py-3.5 px-4 rounded-2xl text-left hover:bg-foreground/5 transition-colors"
                  >
                    <span className="font-display text-xl font-medium">
                      {item.label}
                    </span>
                    <span className="section-number">
                      0{i + 1}
                    </span>
                  </motion.button>
                ))}
              </nav>

              <div className="mt-auto pt-8 flex flex-col gap-4">
                <CVButton size="md" variant="primary" className="w-full" />
                <div className="flex items-center gap-2">
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 h-11 grid place-items-center rounded-full border border-border text-foreground/80"
                  >
                    <GitHubIcon size={18} />
                  </a>
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 h-11 grid place-items-center rounded-full border border-border text-foreground/80"
                  >
                    <LinkedInIcon size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
