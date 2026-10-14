export type Project = {
  title: string;
  description: string;
  stack: string[];
  href: string;
  repo?: string;
  isDemo: boolean;
};

// PRD §7.1: real projects replace the demo entries one-for-one as each
// becomes deployable (Agent Action Firewall shipped 2026-10-11; SymptMeal
// still pending). This array should never hold more than 2-3 entries total.
export const projects: Project[] = [
  {
    title: "Agent Action Firewall",
    description:
      "Permission-and-audit middleware for AI agents — policy enforcement, Redis rate limiting, human-in-the-loop approval for risky actions, and an event-sourced audit trail, with real Gmail and Stripe integrations.",
    stack: ["FastAPI", "Next.js", "PostgreSQL", "Redis"],
    href: "https://agent-action-firewall.vercel.app",
    repo: "https://github.com/AyushM03/agent-action-firewall",
    isDemo: false,
  },
  {
    title: "Court Case Prediction",
    description:
      "Survival-analysis model of how long cases take in Maharashtra's district courts — Kaplan-Meier, Cox PH and gradient-boosted survival models on the e-Courts dataset, handling still-pending (right-censored) cases correctly, with SHAP explanations and a live FastAPI app.",
    stack: ["Python", "FastAPI", "Data and ML ecosystem", "scikit-survival", "SHAP / XGBoost" , "Docker , Render"],
    href: "https://court-delay.onrender.com",
    repo: "https://github.com/AyushM03/court-case-predictipon",
    isDemo: false,
  },
];
