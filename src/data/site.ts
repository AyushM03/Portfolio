// Central place for contact/social details that are still open questions
// (PRD §12). Placeholder values are `null` and components should treat
// that as "don't render a link" rather than pointing at a dead URL.
// Fill these in once the real values exist — every component reads from
// here, so it's a one-line change, not a markup edit.

export const siteConfig = {
  name: "Ayush Meshram",
  role: "Associate Software Engineer",
  location: "Nagpur, India",
  email: null as string | null,
  phone: null as string | null,
  github: null as string | null,
  linkedin: null as string | null,
  leetcode: null as string | null,
  resumeUrl: "/resume.pdf",
};
