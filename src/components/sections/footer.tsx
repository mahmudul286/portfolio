"use client";

import { siteConfig } from "@/config/site";
import { CVButton } from "@/components/ui-portfolio/cv-button";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui-portfolio/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Identity */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-foreground/20 font-display text-sm font-semibold">
                {siteConfig.monogram}
              </span>
              <div>
                <div className="font-display text-base font-medium">
                  {siteConfig.name}
                </div>
                <div className="system-label">{siteConfig.systemLabels.portfolio}</div>
              </div>
            </div>
            <p className="font-display text-lg text-foreground/80 max-w-sm">
              &ldquo;{siteConfig.concept}&rdquo;
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
              >
                <GitHubIcon size={16} />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
              >
                <LinkedInIcon size={16} />
              </a>
              <a
                href={
                  siteConfig.email === "ADD_EMAIL"
                    ? "#contact"
                    : `mailto:${siteConfig.email}`
                }
                aria-label="Email"
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
              >
                <MailIcon size={16} />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div className="md:col-span-4">
            <div className="system-label mb-4">Navigate</div>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {siteConfig.nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CV */}
          <div className="md:col-span-3">
            <div className="system-label mb-4">Resume</div>
            <p className="text-sm text-muted-foreground mb-4">
              One-page summary of education, skills, projects, and research.
            </p>
            <CVButton size="sm" variant="ghost" />
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>© {year} {siteConfig.name}</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline font-mono">
              {siteConfig.systemLabels.build}
            </span>
          </div>
          <div className="flex items-center gap-3 font-mono">
            <span>{siteConfig.systemLabels.location}</span>
            <span>·</span>
            <span>Built with Next.js, Tailwind, Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
