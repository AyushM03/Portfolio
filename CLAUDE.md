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
