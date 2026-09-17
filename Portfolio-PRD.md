# Product Requirements Document — Ayush Meshram Portfolio

**Owner:** Ayush Meshram
**Status:** Draft (v3 — merged, Next.js rebuild)
**Last updated:** September 2026

---

## 1. Overview

A personal portfolio website for Ayush Meshram, Associate Software Engineer at Accenture, built to support a transition into a product-based / FAANG-track engineering role over the next 12–18 months. The site's core job is to show ongoing, active engineering work — real projects once they exist, and in the meantime a visible daily-practice habit (DSA/LeetCode, backend depth, system design) — rather than presenting a static, one-time resume.

**Origin:** the visual design and content are carried over from a downloaded static HTML template ("UNIFEX" — creative-agency template, homepage-only export, originally scanned as plain Bootstrap + jQuery + GSAP) and the mockups built from it. The site itself is being **rebuilt from scratch as a Next.js application** — same look, componentized instead of one long HTML file — plus a custom backend for the contact flow.

## 2. Goals

- Give recruiters and hiring engineers a fast, credible read on Ayush's technical work in under 60 seconds of scanning
- Make the "daily grind" visible — DSA/LeetCode practice, active learning, work-in-progress projects — not just a finished-work showcase, since real flagship projects aren't deployable yet
- Present projects (real, once ready; demo placeholders until then) as case studies, not just a tech-tag list
- Make it easy for a recruiter or collaborator to leave contact details without needing email back-and-forth
- Look and feel like a software engineer's site — clean, fast, no unnecessary decoration — while reusing the visual polish (bold type, scroll motion) of the source template
- Scale to many concurrent visitors without needing active server management
- Ship the site as a properly componentized React/Next.js codebase — itself a demonstration of frontend engineering practice, not just a portfolio wrapper
- Keep the codebase maintainable enough that swapping in real projects later (replacing the demo cards) is a content change, not a redesign

## 3. Non-Goals

- No CMS — content lives directly in the Next.js codebase (components/data files); not needed at this scale
- No user accounts, payment flows, or e-commerce
- No client/agency-style multi-page site in v1 — stays a single scrolling page with anchor links; project case-study detail pages (`/projects/[slug]`) are an optional Phase 3+ addition, not required for launch
- No dynamic backend beyond the collab form — everything else on the site stays static
- No fabricated accomplishments — demo projects (§7.1) are clearly labeled placeholders, never presented as real work

## 4. Target audience

1. **Recruiters / hiring managers** at product-based companies — skim in seconds, care about clarity and evidence of active work over visual flair
2. **Engineers doing a technical screen** — want to see architecture decisions and how Ayush thinks, not just a list of frameworks
3. **Potential collaborators** — want a low-friction way to reach out

## 5. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Frontend framework | **Next.js (App Router)** | Built-in static site generation (SSG) — pages pre-render once and serve from a CDN, so traffic scales without server management; file-based routing; zero-config deploy to Vercel; better SEO out of the box than a plain client-rendered SPA |
| Styling | TailwindCSS | Already a known skill; fast to translate the template's existing inline styles into utility classes |
| Animation | GSAP + a scroll-trigger library (GSAP's React bindings or Framer Motion) | Recreates the template's scroll-reveal and marquee motion inside React components |
| Backend | FastAPI (Python) | Small service handling only the collab/contact form; doubles as real practice toward Ayush's backend-depth learning goal |
| Database | PostgreSQL | Stores inquiries (`inquiries` table — see §8) |
| Frontend hosting | Vercel | Built for Next.js specifically — SSG output served from edge, automatic preview deploys per change |
| Backend + DB hosting | Railway or Render (API); same platform or Neon/Supabase (Postgres) | Free-tier friendly, simple deploy for a small service |
| Notifications | Email or Telegram/Discord webhook on new inquiry | So a submission doesn't sit unseen |
| Version control | Git + GitHub | Currently ungoverned local files — this alone is a prerequisite for everything else below |

**Why Next.js over Vite:** Vite is a faster raw dev server, but ships client-rendered by default — no automatic pre-rendering, weaker SEO, extra plugin work to get back the CDN-scalability story this project relies on. Next.js gets there out of the box and stays React, so nothing already known is wasted.

### 5.1 Component breakdown

| Component | Responsibility |
|---|---|
| `Nav` | Logo, section links, resume CTA |
| `Hero` | Name, positioning line, CTA buttons |
| `SkillsMarquee` | Scrolling tech-stack ticker |
| `About` | Photo, bio, GitHub/LinkedIn links |
| `CurrentlyGrinding` | Short, frequently-updated strip: what's being practiced/built right now |
| `ProjectCard` | One project's title, description, tags, thumbnail, link, and a `isDemo` flag — reused for both real and placeholder entries |
| `RoadmapStep` | One step of the 5-step long-term skill roadmap |
| `CollabForm` | Contact form fields, client-side validation, submit handler |
| `Footer` | Contact info, socials, copyright |

The `isDemo` flag on `ProjectCard` is deliberate: it's what makes swapping a demo project for a real one later a one-line data change instead of a markup edit, and it's what would let the UI badge a card as "Demo" if you want that visible (see §7.1).

## 6. Site structure (single page, anchor-linked sections)

| Section | Purpose | Status |
|---|---|---|
| Nav | Logo, links to each section, resume CTA | Needs real resume link |
| Hero | Name, one-line positioning, CTA buttons | Copy drafted (see §9) |
| Skills marquee | Scrolling tech-stack ticker | Content ready |
| About | Photo, bio, GitHub/LinkedIn links | Needs real photo |
| Currently Grinding | Daily/weekly practice snapshot — DSA/LeetCode, active build, current focus area | Content drafted (see §9) |
| Works (Projects) | Project case-study rows | **Demo placeholders for now** — swap for Agent Action Firewall + SymptMeal once deployable |
| Learning Roadmap | 5-step long-term career skill path (replaces template's "Services" section) | Content ready |
| Collab (footer) | Contact form + email/phone + socials | Needs backend wiring |

**Removed from the source template:** Services (illustration/branding offerings), Testimonials, brand/client logo marquee, and all multi-page nav links (About Us, Team, Blog, Pricing, etc.) that pointed to pages not included in the original download.

## 7. Functional requirements

### 7.1 Projects — demo placeholders until real ones are ready

No deployable project exists yet, so the Works section ships with clearly-marked demo entries rather than an empty section or fabricated claims about finished work:

| # | Project (demo) | Description | Stack |
|---|---|---|---|
| 1 | **TaskFlow API** *(DEMO)* | REST API for task/project management — auth, CRUD, role-based access | FastAPI, PostgreSQL, Docker |
| 2 | **QuickLink** *(DEMO)* | URL-shortener service with click analytics and rate-limited API | Node.js, Express, MongoDB |

Rules for this section:
- Each demo card is visibly marked as a demo (e.g., a small "Demo" badge via the `isDemo` flag) — never presented as completed real work
- Real projects replace demos as they become deployable: **Agent Action Firewall** (FastAPI, Next.js, PostgreSQL, Redis) and **SymptMeal** (FastAPI, Next.js, Docker, Deep Learning) are the intended real entries, tracked separately as in-progress
- A demo card is removed the moment a real project is ready to take its slot — the section should never show more than 2–3 cards total

### 7.2 Currently Grinding
- A short, manually-updated strip (not a heavy dynamic tracker) showing 2–3 current activity lines, e.g. "Daily DSA practice (LeetCode)" / "Building Agent Action Firewall" / "Deepening FastAPI backend depth"
- Optional link out to a LeetCode/GitHub profile if Ayush wants it clickable (URLs not yet provided — see §12)
- Deliberately lightweight for v1 — a live streak counter or GitHub-contributions embed is a Phase 4 nice-to-have, not required

### 7.3 Collab form
- Fields: Name (required), Email (required), LinkedIn URL (optional), Phone (optional), Reason — dropdown: Collaboration / Recruiting / Other (required), Message (required)
- Client-side validation in the `CollabForm` component, plus server-side validation on the FastAPI endpoint
- Spam protection: a honeypot field plus per-IP rate limiting
- On successful submit: row written to `inquiries` table, notification fired to Ayush
- User-facing confirmation state on the form after submit (success/error message)
- Visible privacy note near the form: contact details are used only to respond, never shared

### 7.4 Branding & SEO
- Replace template logo, favicon, `<title>`, meta description, and Open Graph tags with Ayush's own
- All social icons (header/footer) point to real profiles (GitHub, LinkedIn) or are removed if unused

## 8. Data model

**Table: `inquiries`**

| Field | Type | Notes |
|---|---|---|
| `id` | UUID / serial | Primary key |
| `name` | text | Required |
| `email` | text | Required, validated format |
| `linkedin_url` | text | Optional |
| `phone` | text | Optional |
| `reason` | enum (`collaboration`, `recruiting`, `other`) | Required |
| `message` | text | Required |
| `status` | enum (`new`, `contacted`, `archived`) | Defaults to `new` |
| `created_at` | timestamp | Set on insert |

## 9. Content reference (as decided so far)

- **Hero headline:** "Building systems that hold up."
- **Hero subtext:** "Associate Software Engineer at Accenture, based in Nagpur — deepening backend architecture and system design on the way to a product-based engineering role."
- **Currently Grinding (draft lines):** "Daily DSA practice on LeetCode" · "Building Agent Action Firewall" · "Deepening FastAPI backend depth"
- **Demo project 1 — TaskFlow API:** REST API for task/project management with auth, CRUD, and role-based access. Stack: FastAPI, PostgreSQL, Docker. *(Demo — replace when ready)*
- **Demo project 2 — QuickLink:** URL-shortener service with click analytics and a rate-limited public API. Stack: Node.js, Express, MongoDB. *(Demo — replace when ready)*
- **Real project (in progress) — Agent Action Firewall:** middleware permission and audit layer for AI agents — policy enforcement, rate limiting, human-approval workflows, immutable event-log audit trails. Stack: FastAPI, Next.js, PostgreSQL, Redis.
- **Real project (in progress) — SymptMeal:** AI-powered diet planner, built as a portfolio project and applied learning vehicle spanning model integration, APIs, and deployment. Stack: FastAPI, Next.js, Docker, Deep Learning.
- **Learning roadmap (long-term, in order):** DSA & CS Fundamentals → Backend Depth (FastAPI) → System Design → AI/LLM Engineering → AWS
- **Skills marquee:** Python, JavaScript, React, Node.js, Express, MongoDB, SQL, TailwindCSS, Docker, Git, FastAPI

## 10. Non-functional requirements

- **Performance:** Next.js SSG output served from CDN; target sub-2s first load on a typical connection; lazy-load images
- **Scalability:** static frontend scales to concurrent traffic by default; backend is a small, independent service so a traffic spike on the contact form doesn't affect page load speed elsewhere
- **Accessibility:** real semantic elements (`<button>`, `<a href>`, `<label>`+`<input>` pairs), alt text on all images, sufficient color contrast, keyboard-navigable nav
- **Responsiveness:** must hold up on mobile — the source template is desktop-first, so mobile breakpoints need explicit attention while componentizing
- **Browser support:** modern evergreen browsers (Chrome, Firefox, Edge, Safari)
- **Security:** no secrets or credentials in frontend code; rate limiting and honeypot on the public form endpoint; DB connection details kept server-side only
- **Version control:** the current codebase has none — initializing a git repo and pushing to GitHub is a prerequisite step, not optional polish

## 11. Phased plan

1. **Phase 0 — Foundation:** initialize git/GitHub for the project; scaffold the Next.js app
2. **Phase 1 — Component rebuild:** build out the component structure from §5.1, port the template's visual design into Tailwind + React, fill with real content plus the two demo project cards. Deployable to Vercel as a static build at the end of this phase; contact form not yet functional
3. **Phase 2 — Collab backend:** build the FastAPI service + Postgres table from §8; wire the `CollabForm` component to it; add validation, spam protection, notifications
4. **Phase 3 — Real projects replace demos:** as Agent Action Firewall and/or SymptMeal become deployable, swap out the demo `ProjectCard` entries; add real screenshots/diagrams; optionally add `/projects/[slug]` case-study pages
5. **Phase 4 (optional, later):** live "Currently Grinding" data (GitHub contributions embed or similar); lightweight admin view for inquiries; blog/notes section

## 12. Open questions / needs input

- [ ] Real contact email and phone number for the footer
- [ ] Resume file (final PDF)
- [ ] LeetCode and/or GitHub profile URLs, if the Currently Grinding strip should link out
- [ ] Whether the "Demo" badge on placeholder projects should be visible to visitors or just an internal marker
- [ ] Exact timeline for Agent Action Firewall / SymptMeal reaching demo-ready state
- [ ] Exact hosting provider for the backend (Railway vs. Render) — either works, no strong constraint yet
- [ ] Animation library choice for React (GSAP bindings vs. Framer Motion) — decide once component work starts
- [ ] Whether case-study detail pages are needed in v1 or deferred to Phase 3

## 13. Success criteria

- No unlabeled placeholder/template content remains — the only intentional placeholders are the explicitly-badged demo projects
- Site is responsive and functions correctly across major breakpoints
- Collab form successfully validates, stores, and triggers a notification on submission
- Project is under git version control and deployed to a live URL
- Demo projects are fully replaced by real ones before the site is actively shared with recruiters
