// Central place for contact/social details that are still open questions
// (PRD §12). Placeholder values are `null` and components should treat
// that as "don't render a link" rather than pointing at a dead URL.
// Fill these in once the real values exist — every component reads from
// here, so it's a one-line change, not a markup edit.

export const siteConfig = {
  name: "Ayush Meshram",
  role: "Associate Software Engineer",
  location: "Nagpur, India",
  email: "aayushmeshram9168@gmail.com" as string | null,
  phone: "+91 9168499284" as string | null,
  github: "https://github.com/AyushM03",
  linkedin: "https://www.linkedin.com/in/ayushmeshram/" as string | null,
  leetcode: "https://leetcode.com/u/AyushMM03/",
  codeforces: "https://codeforces.com/profile/ayushm03",
  resumeUrl: "/resume.pdf",
};
