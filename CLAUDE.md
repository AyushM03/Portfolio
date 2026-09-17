# Project memory — Ayush Meshram Portfolio

This file is the running log for this project. Read it first at the start of
every session instead of re-scanning the repo. **After every edit or piece of
code written, append a short entry to the Progress Log below** — don't wait
to be asked.

Full requirements live in `Portfolio-PRD.md` (same directory) — read that for
scope/content/data-model details not repeated here.

## Working style for this project

- The user wants to review and approve work **step by step**, not have the
  whole site built in one pass. Finish one step, stop, summarize, and ask
  what to do next — don't chain straight into the next phase unprompted.
- Images/logos: reuse the template's originals as-is for now (in
  `public/images/`). The user will swap in real photos/logos later — don't
  spend effort sourcing or redesigning them.
- `reference/` (gitignored, local only) holds the original static HTML/CSS
  template this design is ported from. Use it to check exact spacing/values
  while building components; it is never shipped or imported by the app.

## Tech stack decisions (locked in)

- Next.js 16, App Router, TypeScript, Tailwind CSS 4 — scaffolded via
  `create-next-app`.
- **Animation: Framer Motion**, not GSAP — chosen over the PRD's open
  question because it's more idiomatic in React and avoids hand-wiring 5
  separate GSAP plugins (ScrollTrigger, ScrollSmoother, SplitText, etc.).
  Revisit only if the user asks for closer visual parity with the template's
  original motion.
- **Icons: `@phosphor-icons/react`** — matches the template's `ph-*` icon
  set, used as React components instead of an icon font.
- **Forms: `react-hook-form` + `zod` + `@hookform/resolvers`** for the
  Collab form's client-side validation (PRD §7.3).
- `clsx` + `tailwind-merge` for conditional className handling.
- Package name in `package.json` is `ayush-portfolio` (npm forbids capital
  letters, hence not "Portfolio").

## Structure

```
src/app/          Next.js App Router pages/layout (currently still scaffold defaults)
public/images/     logo/, icons/, shapes/, thumbs/ — all template image assets, untouched
reference/         gitignored — original template HTML/CSS for visual reference only
Portfolio-PRD.md   full product requirements doc
```

Planned (not yet created): `src/components/` (Nav, Hero, SkillsMarquee, About,
CurrentlyGrinding, ProjectCard, RoadmapStep, CollabForm, Footer per PRD §5.1),
`src/data/` for content (skills list, projects, roadmap steps).

## Progress log

- **2026-09-17** — Committed the original UNIFEX static template as a git
  baseline (`591a673`), then scaffolded Next.js 16 + TS + Tailwind 4 in
  place, moved all image assets to `public/images/`, archived the old
  HTML/CSS/JS to gitignored `reference/`, installed framer-motion,
  @phosphor-icons/react, react-hook-form, zod, @hookform/resolvers, clsx,
  tailwind-merge. Verified `npm install` and `npm run build` succeed
  (`8b27dcc`). No component/page code written yet — `src/app/page.tsx` is
  still the default Next.js starter page.
- **2026-09-17** — Built the `Nav` component (`src/components/Nav.tsx`):
  sticky header that gains a white/blurred background + shadow on scroll,
  desktop link row (About/Currently Grinding/Works/Roadmap/Collab anchors),
  a Resume CTA linking to `/resume.pdf` (file not yet added — drop the real
  PDF in `public/` when ready, no code change needed), and a mobile
  hamburger menu (Framer Motion slide-down panel, Phosphor `List`/`X`
  icons, closes on link click, locks body scroll while open). Wired into
  `src/app/layout.tsx` so it's global across the single-page site. Set up
  the font/color foundation in the same pass: `next/font/google` for
  Instrument Sans (body) and Phudu (headings, matches the template's
  display font), plus `--accent`/`--accent-two` color tokens in
  `globals.css` carried over from the template's lime/orange palette
  (`hsl(72 99% 45%)` / `hsl(19 100% 50%)`) for later use — Nav itself
  doesn't use them yet. `src/app/page.tsx` now has 6 empty placeholder
  `<section id="...">` stubs (home/about/grinding/works/roadmap/collab) so
  Nav's anchor links have real scroll targets; these get replaced one by
  one as each section is built. Verified with a headless-Chromium
  (Playwright) pass: desktop anchor scrolling, mobile menu open/close and
  auto-close-on-navigate, and no console errors, on both a 1440px and a
  390px viewport. `npm run build` passes.
- **2026-09-17** — Built the `Hero` component (`src/components/Hero.tsx`),
  replacing the `#home` placeholder in `page.tsx`: eyebrow line ("Ayush
  Meshram · Nagpur, India"), the PRD §9 headline ("Building systems that
  hold up.") in Phudu at fluid clamp() size, the subtext, two CTAs ("View
  my work" → `#works`, "Let's collab" → `#collab`), and a bouncing
  scroll-cue arrow linking to `#about`. Staggered Framer Motion
  fade/slide-in on load. Deliberately skipped the template's decorative
  hero assets (`banner-three-man.png` illustration, fake client-satisfaction
  counters/avatars) — PRD §3 forbids fabricated accomplishments and wants a
  clean engineer aesthetic over agency decoration; checked
  `banner-three-shape.png` too and it's just a thin outline frame, not
  worth including. Verified with headless Chromium at 1440px and 390px:
  all three anchor links (View my work/Let's collab/scroll cue) scroll to
  the correct section, no console errors. `npm run build` passes.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
