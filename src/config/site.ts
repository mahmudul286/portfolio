/**
 * Central site configuration for Mahmudul Hasan's portfolio.
 * Edit personal info, socials, and CV path here — UI components read from this file.
 */

export const siteConfig = {
  name: "Mahmudul Hasan",
  shortName: "Mahmudul",
  monogram: "MH",
  role: "Computer Science & Engineering Student",
  subRoles: ["Software Developer", "AI Enthusiast", "Builder"],
  tagline:
    "I build intelligent systems, developer tools, and real-world software that turn complex problems into practical solutions.",
  concept: "Building systems that solve real problems.",
  location: "Dhaka, Bangladesh",
  university: "United International University",
  degree: "B.Sc. in Computer Science & Engineering",
  graduationYear: "2027",
  status: "Available for opportunities",
  // Replace with real email when ready
  email: "ADD_EMAIL",
  // CV file lives in /public/Mahmudul-Hasan-CV.pdf
  // NOTE: this is the path WITHOUT basePath — the CV button prepends
  // `import.meta.env.BASE_PATH` (Next.js exposes basePath via this) at runtime
  // so the download link works on both project pages and user pages.
  cvPath: "/Mahmudul-Hasan-CV.pdf",
  cvFileName: "Mahmudul-Hasan-CV.pdf",
  social: {
    github: "https://github.com/mahmudul286",
    linkedin: "https://www.linkedin.com/in/mahmudul-hasan-20ed/",
    email: "ADD_EMAIL",
  },
  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Journey", href: "#journey" },
    { label: "Research", href: "#research" },
    { label: "Contact", href: "#contact" },
  ],
  // small system-like labels for premium feel
  systemLabels: {
    portfolio: "SYSTEM / PORTFOLIO",
    build: "BUILD / 2026",
    location: "LOCATION / DHAKA",
    role: "ROLE / DEVELOPER",
  },
  seo: {
    title: "Mahmudul Hasan — Software Developer & AI Enthusiast",
    description:
      "Portfolio of Mahmudul Hasan, a Computer Science & Engineering student building AI-powered systems, full-stack applications, developer tools, and research-driven technology.",
    url: "https://mahmudulhasan.dev",
    ogImage: "/og-image.png",
  },
} as const;

export type SiteConfig = typeof siteConfig;
