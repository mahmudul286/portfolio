import { Navigation } from "@/components/sections/navigation";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Achievement } from "@/components/sections/achievement";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Journey } from "@/components/sections/journey";
import { Research } from "@/components/sections/research";
import { CurrentlyBuilding } from "@/components/sections/currently-building";
import { GitHubActivity } from "@/components/sections/github-activity";
import { Resume } from "@/components/sections/resume";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { CustomCursor } from "@/components/ui-portfolio/custom-cursor";
import { ScrollProgress } from "@/components/ui-portfolio/scroll-progress";
import { PageIntro } from "@/components/ui-portfolio/page-intro";
import { EasterEggTerminal } from "@/components/ui-portfolio/easter-egg-terminal";

export default function Home() {
  return (
    <>
      <PageIntro />
      <CustomCursor />
      <ScrollProgress />

      {/* Ambient noise overlay (fixed, very subtle) */}
      <div className="noise-overlay" aria-hidden />

      <Navigation />

      <main className="relative">
        <Hero />
        <About />
        <Achievement />
        <Projects />
        <Skills />
        <Journey />
        <Research />
        <CurrentlyBuilding />
        <GitHubActivity />
        <Resume />
        <Contact />
      </main>

      <Footer />

      <EasterEggTerminal />
    </>
  );
}
