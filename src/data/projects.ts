export type Project = {
  title: string;
  description: string;
  stack: string[];
  href: string;
  isDemo: boolean;
};

// PRD §7.1: no deployable project exists yet, so the Works section ships
// with clearly-marked demo entries. Real projects (Agent Action Firewall,
// SymptMeal) replace these one-for-one as each becomes deployable — this
// array should never hold more than 2-3 entries total.
export const projects: Project[] = [
  {
    title: "TaskFlow API",
    description:
      "REST API for task/project management — auth, CRUD, and role-based access.",
    stack: ["FastAPI", "PostgreSQL", "Docker"],
    href: "#",
    isDemo: true,
  },
  {
    title: "QuickLink",
    description:
      "URL-shortener service with click analytics and a rate-limited public API.",
    stack: ["Node.js", "Express", "MongoDB"],
    href: "#",
    isDemo: true,
  },
];
