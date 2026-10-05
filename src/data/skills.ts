/**
 * Skill data — grouped, no fake proficiency percentages.
 * Edit technologies here; the UI renders them grouped.
 */

export interface SkillGroup {
  id: string;
  label: string;
  description: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "programming",
    label: "Programming",
    description: "Core languages used across coursework, research, and projects.",
    skills: ["C", "C++", "Python", "Java", "JavaScript", "TypeScript"],
  },
  {
    id: "frontend",
    label: "Frontend",
    description: "Interfaces for web platforms, dashboards, and campus systems.",
    skills: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    id: "backend",
    label: "Backend",
    description: "APIs and services powering full-stack applications.",
    skills: ["Node.js", "Express", "Spring Boot"],
  },
  {
    id: "ai-ml",
    label: "AI / ML",
    description: "On-device inference, vision, NLP, and AI API integrations.",
    skills: [
      "TensorFlow",
      "TensorFlow Lite",
      "Computer Vision",
      "NLP",
      "YOLO",
      "AI APIs",
    ],
  },
  {
    id: "tools",
    label: "Tools",
    description: "Daily engineering workflow and environment.",
    skills: ["Git", "GitHub", "Docker", "Linux", "VS Code"],
  },
  {
    id: "database-cloud",
    label: "Database / Cloud",
    description: "Persistence and deployment for shipped products.",
    skills: ["PostgreSQL", "MySQL", "Prisma", "Supabase", "Vercel", "Render"],
  },
];

/** Compact list used by the marquee in the Skills section. */
export const skillMarquee: string[] = skillGroups.flatMap((g) => g.skills);
