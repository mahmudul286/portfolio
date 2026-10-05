/**
 * Project data for Mahmudul Hasan's portfolio.
 *
 * IMPORTANT (link integrity rule):
 *  - Never fabricate GitHub or live-demo URLs.
 *  - Use the literal sentinel "ADD_REPO_LINK" / "ADD_LIVE_LINK" when a real link
 *    is not yet known. The UI will render a disabled "Link pending" chip instead
 *    of a fake clickable link.
 *  - For private repositories, set `privateRepo: true`. The UI will show a
 *    "Private Repository" chip and will NOT render the GitHub button as if it
 *    were publicly accessible.
 */

export type ProjectCategory =
  | "AI"
  | "Full Stack"
  | "Cybersecurity"
  | "Developer Tools"
  | "Research"
  | "Blockchain"
  | "Web"
  | "Computer Vision";

export type ProjectStatus =
  | "Shipped"
  | "In Development"
  | "Research"
  | "Concept"
  | "Champion";

export interface ProjectDetail {
  problem?: string;
  solution?: string;
  architecture?: string;
  keyFeatures?: string[];
  challenges?: string;
  outcome?: string;
}

export interface Project {
  id: string;
  index: string; // visual "01", "02"...
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory[];
  technologies: string[];
  github?: string; // verified URL or "ADD_REPO_LINK"
  live?: string; // verified URL or "ADD_LIVE_LINK"
  privateRepo?: boolean;
  status: ProjectStatus;
  featured?: boolean;
  achievement?: string;
  /** Visual identity — drives the generated gradient + motif */
  visual: "cyber" | "dashboard" | "diagnostic" | "campus" | "blockchain" | "stream";
  accent: string; // tailwind color stop, e.g. "from-emerald-500/30 to-cyan-500/10"
  detail?: ProjectDetail;
}

export const projects: Project[] = [
  {
    id: "prohory",
    index: "01",
    title: "Prohory",
    subtitle: "The Cyber Eye",
    description:
      "AI-powered cybersecurity platform that detects phishing SMS, scam calls, and malicious links in real time using on-device AI, an Android application, React dashboard, and Spring Boot backend.",
    longDescription:
      "Prohory is a multi-layer cybersecurity system built over four months and awarded Champion at the UIU CSE Project Show, Fall 2025. It combines an on-device AI engine running on Android with a centralized Spring Boot backend and a React analytics dashboard. The system continuously monitors inbound SMS, call patterns, and URLs, classifies threats in real time, and surfaces live telemetry to a control panel.",
    category: ["AI", "Cybersecurity", "Computer Vision"],
    technologies: [
      "Android",
      "TensorFlow Lite",
      "React",
      "Spring Boot",
      "AI / NLP",
      "Computer Vision",
    ],
    github: "ADD_REPO_LINK",
    live: "ADD_LIVE_LINK",
    status: "Champion",
    featured: true,
    achievement: "Champion — UIU CSE Project Show, Fall 2025",
    visual: "cyber",
    accent: "from-rose-500/30 via-orange-500/15 to-amber-500/5",
    detail: {
      problem:
        "Mobile users in Bangladesh face a rising volume of phishing SMS, scam calls, and malicious links — most detection happens too late, after damage is done.",
      solution:
        "An end-to-end pipeline that detects threats on-device in real time, complements detection with a cloud analytics layer, and gives users actionable evidence.",
      architecture:
        "Android app (TFLite inference) → Spring Boot backend (signal aggregation, rules engine, evidence store) → React dashboard (live threat map, history, evidence viewer).",
      keyFeatures: [
        "On-device phishing SMS classification",
        "Scam call pattern detection",
        "Malicious URL scoring with computer-vision features on screenshots",
        "Live threat dashboard with replay",
        "Evidence vault for reported incidents",
      ],
      challenges:
        "Running reliable inference under Android battery and memory limits required quantized models and careful feature selection.",
      outcome:
        "Awarded Champion at the UIU CSE Project Show, Fall 2025. Demonstrated live detection across multiple attack categories.",
    },
  },
  {
    id: "careeros",
    index: "02",
    title: "CareerOS",
    subtitle: "Mahmudul Hasan Career Operating System",
    description:
      "A full-stack personal career management platform combining university academics, Programming Hero, DataCamp, Python, DSA, projects, routines, career readiness, AI coaching, analytics, and productivity tracking.",
    longDescription:
      "CareerOS is a personal operating system for engineering career growth. It unifies academics, structured learning tracks, project pipeline, daily routines, and AI coaching into a single dashboard with deep analytics on consistency and momentum.",
    category: ["Full Stack", "AI"],
    technologies: [
      "Next.js / React",
      "TypeScript",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "AI integrations",
      "Docker",
      "GitHub Actions",
    ],
    github: "https://github.com/mahmudul286/careeros",
    privateRepo: true,
    live: "ADD_LIVE_LINK",
    status: "In Development",
    featured: true,
    visual: "dashboard",
    accent: "from-violet-500/25 via-indigo-500/10 to-sky-500/5",
    detail: {
      problem:
        "Career growth as a CS student is scattered across Drive folders, Notion, course platforms, GitHub, and calendars — there is no single source of truth for momentum.",
      solution:
        "A unified career operating system that ingests academics, learning tracks, projects, and routines into a single source of truth with AI coaching.",
      architecture:
        "Next.js + TypeScript frontend, Node/Express API, Prisma + PostgreSQL, containerized with Docker, CI via GitHub Actions, AI coaching through provider APIs.",
      keyFeatures: [
        "Academic + learning track unification",
        "Project pipeline with status and milestones",
        "Routine builder with streak analytics",
        "AI coaching for weekly retrospectives",
        "Career readiness scoring",
      ],
      challenges:
        "Designing a schema flexible enough for academics, courses, projects, and routines without becoming a generic key-value store.",
      outcome:
        "Currently in active private development; serves as a personal operating system for 2026 career preparation.",
    },
  },
  {
    id: "debugdna",
    index: "03",
    title: "DebugDNA",
    subtitle: "Diagnosability Regression Tester",
    description:
      "An automated debugging-analysis system that compares baseline and changed software versions, detects lost diagnostic signals, collects runtime evidence, suggests repairs, and verifies whether diagnosability has been restored.",
    longDescription:
      "DebugDNA is a developer-tooling research project focused on software diagnosability. It diffs a baseline and a changed version of a codebase, identifies diagnostic signals that were lost (logs, error paths, traces), runs targeted failure scenarios, collects runtime evidence, proposes repairs, and verifies whether diagnosability has actually been restored — closing the loop with an AI explainer.",
    category: ["Developer Tools", "AI", "Research"],
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "SSE",
      "AI / Granite",
      "Automated testing",
      "Runtime analysis",
    ],
    github: "https://github.com/mahmudul286/debugdna",
    live: "ADD_LIVE_LINK",
    status: "Shipped",
    featured: true,
    achievement: "303 tests passing",
    visual: "diagnostic",
    accent: "from-emerald-500/25 via-teal-500/10 to-cyan-500/5",
    detail: {
      problem:
        "Refactors silently destroy diagnosability — observability signals disappear, error paths narrow, and engineers only notice weeks later during an incident.",
      solution:
        "An automated regression layer for diagnosability that diffs versions, runs failures, captures evidence, suggests repairs, and verifies the fix.",
      architecture:
        "Diff scanner → signal extractor → failure runner → evidence collector → comparator → repair suggester → verifier → report builder → AI explainer. Streaming updates over SSE.",
      keyFeatures: [
        "Diff scanner across baseline vs changed versions",
        "Signal extractor (logs, traces, error paths)",
        "Failure runner with runtime evidence capture",
        "Comparator for lost diagnostic signals",
        "AI repair suggester with verification loop",
        "303 tests passing across the pipeline",
      ],
      challenges:
        "Defining a faithful signal model that captures what 'diagnosability' actually means across heterogeneous codebases.",
      outcome:
        "Functional pipeline with 303 passing tests. Serves as the foundation for ongoing research on diagnosability regression.",
    },
  },
  {
    id: "uiu-connect",
    index: "04",
    title: "UIU Connect",
    subtitle: "Campus Operating System",
    description:
      "A comprehensive, role-based campus operating system for United International University. Centralizes academic, social, and administrative functions with a dynamic social feed, AI-powered OCR for syncing academic routines, encrypted messaging, and dedicated campus services such as blood bank, marketplace, and student counseling.",
    longDescription:
      "UIU Connect is a campus operating system built for United International University. It centralizes academic, social, and administrative life behind a single role-based platform — dynamic social feed, AI-powered OCR for syncing academic routines, encrypted messaging, and dedicated services including blood bank, marketplace, and student counseling.",
    category: ["Full Stack", "AI", "Web"],
    technologies: [
      "React / Next.js",
      "Node.js",
      "Database",
      "AI / OCR",
      "Authentication",
      "Real-time communication",
    ],
    github: "https://github.com/mahmudul286/UIU-Connect",
    live: "ADD_LIVE_LINK",
    status: "Shipped",
    featured: true,
    visual: "campus",
    accent: "from-sky-500/25 via-blue-500/10 to-indigo-500/5",
    detail: {
      problem:
        "Campus life at UIU is fragmented across Facebook groups, WhatsApp, printed routines, and ad-hoc spreadsheets — students lose time and miss critical information.",
      solution:
        "A role-based campus operating system that consolidates academic, social, and administrative flows behind one authenticated platform.",
      architecture:
        "Next.js frontend, Node.js API, role-based auth, real-time messaging layer, OCR pipeline for routine ingestion, dedicated modules for blood bank, marketplace, and counseling.",
      keyFeatures: [
        "Role-based authentication (student, faculty, admin)",
        "Dynamic social feed with moderation",
        "AI-powered OCR routine sync",
        "Encrypted peer messaging",
        "Blood bank, marketplace, counseling modules",
      ],
      challenges:
        "Balancing an open social feed with moderation and role-based access without making the platform feel gated.",
      outcome:
        "Public repository serving as a foundation for a unified campus experience at UIU.",
    },
  },
  {
    id: "streamarena",
    index: "05",
    title: "StreamArena",
    subtitle: "Sports Streaming Platform",
    description:
      "A sports streaming platform concept designed around organizing and delivering sports content through a dedicated web-based streaming experience.",
    longDescription:
      "StreamArena is a concept platform exploring how sports content can be organized and delivered through a dedicated web-based streaming experience, with emphasis on discoverability, scheduling, and a clean live-viewing interface.",
    category: ["Web"],
    technologies: ["Next.js", "React", "Video streaming", "Web"],
    github: "ADD_REPO_LINK",
    live: "ADD_LIVE_LINK",
    status: "Concept",
    featured: false,
    visual: "stream",
    accent: "from-orange-500/25 via-rose-500/10 to-pink-500/5",
    detail: {
      problem:
        "Sports content is scattered across broadcasters and social clips with no unified discovery experience.",
      solution:
        "A web-based streaming concept centered on scheduling, discoverability, and a focused live-viewing interface.",
      architecture:
        "Next.js frontend with scheduling and content organization layer; concept-stage streaming integration.",
      keyFeatures: [
        "Unified schedule view",
        "Discovery by sport and league",
        "Focused live-viewing interface",
      ],
      challenges:
        "Designing an experience that respects broadcast licensing while remaining useful as a discovery layer.",
      outcome:
        "Concept-stage design and architecture; ready for collaboration or revival.",
    },
  },
  {
    id: "builttrust",
    index: "06",
    title: "BuiltTrust",
    subtitle: "Construction Evidence Chain",
    description:
      "A blockchain-based construction material and inspection evidence chain designed to improve traceability, authenticity, and accountability of construction-related records.",
    longDescription:
      "BuiltTrust is a blockchain-based evidence chain for construction materials and inspections. It records material provenance, inspection evidence, and accountability events on an immutable ledger to improve traceability and reduce fraud in construction-related records.",
    category: ["Blockchain", "Research"],
    technologies: ["Blockchain", "Smart contracts", "Web", "Cryptography"],
    github: "ADD_REPO_LINK",
    live: "ADD_LIVE_LINK",
    status: "Research",
    featured: false,
    visual: "blockchain",
    accent: "from-amber-500/25 via-yellow-500/10 to-lime-500/5",
    detail: {
      problem:
        "Construction records — material provenance, inspection evidence, accountability events — are easy to forge and hard to audit.",
      solution:
        "An immutable evidence chain that records construction-related events with cryptographic integrity.",
      architecture:
        "Smart contracts define evidence schema; web client submits and queries records; verification layer audits chain integrity.",
      keyFeatures: [
        "Material provenance records",
        "Inspection evidence chain",
        "Accountability event log",
        "Audit-friendly verification layer",
      ],
      challenges:
        "Designing evidence schemas that are flexible enough for real construction workflows without losing verifiability.",
      outcome:
        "Research-stage exploration of accountability primitives for the construction industry.",
    },
  },
];

export const projectFilters: ("All" | ProjectCategory)[] = [
  "All",
  "AI",
  "Full Stack",
  "Cybersecurity",
  "Developer Tools",
  "Research",
  "Blockchain",
  "Web",
  "Computer Vision",
];

/** Sentinel values used when a real link is not yet known. */
export const LINK_PENDING = "ADD_REPO_LINK" as const;
export const LIVE_PENDING = "ADD_LIVE_LINK" as const;

export function isLinkPending(link?: string): boolean {
  if (!link) return true;
  return link === LINK_PENDING || link === LIVE_PENDING;
}
