/**
 * Journey / experience timeline.
 * Phrased as an engineering journey rather than employment history.
 */

export interface JourneyItem {
  year: string;
  title: string;
  description: string;
  tag: "Project" | "Research" | "Milestone" | "Learning";
  accent: string;
}

export const journeyItems: JourneyItem[] = [
  {
    year: "2025",
    title: "Prohory — The Cyber Eye",
    description:
      "Built an AI-powered cybersecurity platform over four months. Awarded Champion at the UIU CSE Project Show, Fall 2025.",
    tag: "Milestone",
    accent: "from-rose-500 to-orange-500",
  },
  {
    year: "2025 — 2026",
    title: "CareerOS",
    description:
      "Designed and built a personal career operating system unifying academics, learning tracks, projects, routines, and AI coaching.",
    tag: "Project",
    accent: "from-violet-500 to-indigo-500",
  },
  {
    year: "2026",
    title: "DebugDNA",
    description:
      "Shipped a diagnosability regression tester with 303 passing tests — diff scanning, signal extraction, evidence collection, repair suggestion, and verification.",
    tag: "Project",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    year: "2026",
    title: "UIU Connect",
    description:
      "Developed a role-based campus operating system with social feed, OCR routine sync, encrypted messaging, and dedicated campus services.",
    tag: "Project",
    accent: "from-sky-500 to-blue-500",
  },
  {
    year: "2026",
    title: "RCDR Research",
    description:
      "Began research on Response-Conditioned Diagnostic Reasoning for agricultural diagnostics — exploring how controlled intervention improves diagnosis when multiple causes produce similar symptoms.",
    tag: "Research",
    accent: "from-amber-500 to-yellow-500",
  },
];
