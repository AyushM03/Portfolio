export type RoadmapStep = {
  title: string;
  focus: string;
};

// PRD §9 — long-term skill roadmap, in order.
export const roadmap: RoadmapStep[] = [
  {
    title: "DSA & CS Fundamentals",
    focus: "Daily problem-solving practice — arrays through graphs.",
  },
  {
    title: "Backend Depth (FastAPI)",
    focus: "Auth, APIs, databases, and clean service architecture.",
  },
  {
    title: "System Design",
    focus: "Scalability, distributed systems, and trade-off thinking.",
  },
  {
    title: "AI/LLM Engineering",
    focus: "Building with and around large language models.",
  },
  {
    title: "AWS",
    focus: "Cloud infrastructure and production deployment.",
  },
];
