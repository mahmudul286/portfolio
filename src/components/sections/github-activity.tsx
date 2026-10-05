"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui-portfolio/section-header";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";
import { GitHubIcon, ArrowUpRightIcon, LockIcon } from "@/components/ui-portfolio/icons";

/**
 * GitHub activity section.
 *
 * Honest representation: no fabricated contribution counts or stars.
 * Shows selected PUBLIC repositories only. Private repos (e.g. CareerOS)
 * are explicitly excluded from the repo highlight list.
 */
export function GitHubActivity() {
  // Only show projects with verified PUBLIC github links
  const publicRepos = projects.filter(
    (p) =>
      p.github &&
      p.github.startsWith("https://github.com/") &&
      !p.privateRepo
  );

  return (
    <section id="github" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeader
          index="08"
          kicker="Developer Activity"
          title={
            <>
              Code lives
              <br />
              <span className="text-muted-foreground">on GitHub.</span>
            </>
          }
          description="Public repositories only — no fabricated metrics. Private work stays private."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <div className="relative p-6 sm:p-8 rounded-2xl glass h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-foreground/5 border border-border">
                  <GitHubIcon size={22} />
                </div>
                <div>
                  <div className="font-display text-lg font-medium">@mahmudul286</div>
                  <div className="system-label">GitHub Profile</div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Public repos are linked below. Contribution stats intentionally
                omitted — visit the profile for live data.
              </p>

              <div className="mt-auto">
                <motion.a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-4 h-10 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
                >
                  <GitHubIcon size={14} />
                  Visit GitHub
                  <ArrowUpRightIcon size={14} />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Repository highlights */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {publicRepos.map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="group relative p-5 rounded-2xl glass hover:border-foreground/25 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <GitHubIcon size={16} className="text-foreground/60" />
                  <ArrowUpRightIcon
                    size={14}
                    className="text-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
                <h3 className="font-display text-lg font-medium text-foreground group-hover:text-accent transition-colors">
                  {repo.title}
                </h3>
                {repo.subtitle && (
                  <p className="mt-0.5 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.12em]">
                    {repo.subtitle}
                  </p>
                )}
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {repo.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {repo.technologies.slice(0, 3).map((t) => (
                    <span key={t} className="tech-chip">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}

            {/* Private repo note card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-5 rounded-2xl border border-dashed border-border flex flex-col justify-center text-center"
            >
              <div className="grid place-items-center mb-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-foreground/5 border border-border text-muted-foreground">
                  <LockIcon size={16} />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground/80 font-medium">CareerOS</span>{" "}
                is in private development.
              </p>
              <p className="mt-1 text-xs text-muted-foreground/70">
                Visible on request.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
