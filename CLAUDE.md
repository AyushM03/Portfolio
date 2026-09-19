# Project memory — Ayush Meshram Portfolio

This file is the running log for this project. Read it first at the start of
every session instead of re-scanning the repo. **After every edit or piece of
code written, append a short entry to the Progress Log below** — don't wait
to be asked.

Full requirements live in `Portfolio-PRD.md` (same directory) — read that for
scope/content/data-model details not repeated here.

## Working style for this project

- The user wants to review and approve work **step by step** between
  distinct phases/milestones — don't chain into a new phase unprompted.
  Within a phase, once they say "build all of X", batch it without
  stopping after each component. (2026-09-17: Nav and Hero were built one
  at a time and checked individually; the user then explicitly asked for
  the rest of the frontend sections to be built in one pass.)
- **Backend work needs an explicit go-ahead.** The user said (2026-09-17)
  to wait for their response before starting anything backend-related
  (FastAPI service, Postgres, the collab form's real submit endpoint —
  PRD Phase 2). Don't start that on inference from other instructions.
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
src/app/               layout.tsx (Nav + Footer wrap {children}), page.tsx (composes all sections), globals.css
src/components/        Nav, Hero, SkillsMarquee, About, CurrentlyGrinding, Works, ProjectCard,
                        Roadmap, RoadmapStep, Collab, CollabForm, Footer — one file each, per PRD §5.1
src/data/               site.ts (contact/social config — see below), skills.ts, projects.ts,
                        roadmap.ts, grinding.ts — content lives here, not hardcoded in components
public/images/          logo/, icons/, shapes/, thumbs/ — all template image assets, untouched
reference/              gitignored — original template HTML/CSS for visual reference only
Portfolio-PRD.md       full product requirements doc
```

**`src/data/site.ts`** centralizes every PRD §12 open question (email, phone,
github, linkedin, leetcode — all `null` right now, plus `resumeUrl` pointing
at `/resume.pdf` which doesn't exist yet). Components that render these
(`Nav`, `About`, `Collab`, `Footer`) check for `null`/falsy and skip
rendering that link rather than showing a dead href. **Filling in real
values there is the single place to update once the user provides them** —
no component edits needed.

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
- **2026-09-17** — Built the rest of the frontend in one pass (user asked
  for all remaining sections, then to update this file and wait for
  local review — backend explicitly on hold, see Working style above).
  Added `src/data/` (site.ts, skills.ts, projects.ts, roadmap.ts,
  grinding.ts) as the single source of content, then:
  - **SkillsMarquee** — infinite CSS-keyframe ticker (`.animate-marquee`
    in `globals.css`, duplicated list for a seamless loop, pauses on
    hover), dark strip, skills from `data/skills.ts`.
  - **About** — two-column photo (`about-three-thumb.jpg`, a stand-in
    until a real photo exists) + bio + GitHub/LinkedIn icon links, which
    only render if `siteConfig.github`/`linkedin` are set (currently
    aren't, so no dead links show).
  - **CurrentlyGrinding** — list from `data/grinding.ts` with a pulsing
    dot per line (CSS `animate-ping`) suggesting "ongoing," not a fake
    live tracker.
  - **Works + ProjectCard** — renders `data/projects.ts` (the two PRD
    §7.1 demos, TaskFlow API + QuickLink), each visibly badged "Demo".
    Deliberately did **not** reuse the template's `portfolio-three-thumb*`
    images for card thumbnails — they're design-agency phone-mockup
    photos that would misrepresent these as UI/branding work instead of
    backend APIs. Used a plain dark gradient + Phosphor `Code` icon
    instead. (About's photo reuse is different — that slot is
    specifically "a person's photo," so the template stand-in fits;
    project thumbnails are different because the image content itself
    contradicts what the card describes.)
  - **Roadmap + RoadmapStep** — 5-step numbered timeline (horizontal on
    desktop, vertical on mobile) from `data/roadmap.ts`, connecting line
    between numbered circles.
  - **Collab + CollabForm + Footer** — dark section with contact info
    (email/phone, hidden since both are `null` in site.ts) beside the
    form. Form uses `react-hook-form` + `zod` for real client-side
    validation (name/email/reason/message required, LinkedIn URL/phone
    optional, honeypot field for spam). **No backend exists yet**, so
    `onSubmit` simulates the request and shows a success state that
    explicitly tells the user nothing was actually sent — chosen over
    faking a real save, per PRD Phase 1 ("contact form not yet
    functional"). `Footer` (quick links, social icons gated the same way
    as About's, back-to-top) is rendered once in `layout.tsx` below
    `{children}`, not per-page.
  - Wired all of it into `page.tsx` in order, replacing the placeholder
    loop entirely.
  - **Fixed `eslint.config.mjs`**: `reference/` wasn't in `globalIgnores`,
    so `npm run lint` was linting the vendored jQuery/GSAP/Bootstrap files
    in there (1656 problems, all noise). Added `"reference/**"` to the
    ignore list; lint is now clean (0 problems) on actual source.
  - Verified with headless Chromium at 1440px and 390px: full-page
    scroll-through screenshots, no console errors, and targeted
    viewport screenshots of the Roadmap and Collab sections to confirm
    layout (a full-page screenshot briefly looked like it had a second
    Nav bar floating mid-document — confirmed that's a known Playwright
    full-page-screenshot stitching artifact with `position: sticky`
    elements, not a real bug; viewport-only screenshots at those scroll
    positions show a single correctly-positioned Nav). `npm run build`
    and `npm run lint` both pass clean.
- **2026-09-17** — User ran `npm run dev` locally and saw a hydration
  mismatch warning on `<body>` pointing at a `cz-shortcut-listen="true"`
  attribute. That attribute is injected by the ColorZilla browser
  extension after page load, not rendered by our code — it's the
  extension case the React warning itself calls out. Added
  `suppressHydrationWarning` to the `<body>` tag in
  `src/app/layout.tsx` (the standard Next.js fix for extension-injected
  attributes on `<html>`/`<body>`). `npm run build` still passes.
- **2026-09-17** — User pointed out the Hero's right side was empty.
  Changed `Hero` to a two-column grid on `lg:` (text left, photo right,
  stacks to a single column below that); the photo sits in a
  `next/image fill` box at `aspect-[4/5]` with a small offset lime
  accent block behind it for depth. Reused `about-three-thumb.jpg` — the
  only image asset in `public/images/` with enough resolution for a
  large hero photo (`footer-three-thumb.jpg` is only 154×168px, too
  small); it's already the placeholder in `About`, and reusing the same
  stand-in photo in both places is expected until a real photo replaces
  it in both. Verified at 1440px and 390px with headless Chromium — no
  console errors, both build and lint pass clean.
- **2026-09-17** — User asked to add a preloader, linking a Framer Market
  "Preloader" component (`framer.com/m/Preloader-...js`). Did **not**
  import that URL — Framer Market `.js` modules are built for Framer's
  own site-builder runtime (they import from a special `"framer"`
  package for property controls) and won't run correctly in a Next.js
  app; pulling remote executable JS into the codebase at runtime also
  isn't something to wire in without real vetting. Built an equivalent
  natively instead, in `src/components/Preloader.tsx`, rendered first in
  `layout.tsx` (above `Nav`): full-screen dark overlay, name +
  progress-bar/percentage counting 0→100 over 1.4s, then the whole
  overlay curtain-slides up (`exit={{ y: "-100%" }}`, 0.8s) to reveal the
  page — modeled on the original UNIFEX template's own preloader concept
  (it had one, built with GSAP/an SVG wipe, dropped when the template's
  JS was removed during scaffolding) rather than a literal port.
  Respects `prefers-reduced-motion`: reads the media query directly via a
  lazy `useState` initializer (framer-motion's own `useReducedMotion()`
  hook caches its result in a module-level singleton set once — often
  during SSR where `window` doesn't exist — and never rechecks, so it
  under-reports on the client here; verified this with a debug pass
  before switching approaches). For reduced motion, the same
  `animate()`/`onComplete` path runs with a ~0 duration and a plain
  opacity exit instead of the y-slide, so `setIsLoading` is only ever
  called inside a callback, never synchronously in the effect body
  (`react-hooks/set-state-in-effect` caught this and lint is clean now).
  Verified with headless Chromium at 1440px and 390px, both normal and
  `reducedMotion: "reduce"` emulation: no console errors, body scroll
  lock releases correctly after load, reduced-motion path dismisses
  near-instantly. `npm run build` and `npm run lint` pass clean.
- **2026-09-17** — Another hydration-mismatch report, same root cause
  pattern as the `cz-shortcut-listen` one earlier but on `CollabForm`'s
  fields this time: `fdprocessedid` attributes injected by a password
  manager/form-filler browser extension (LastPass does this) on every
  `<input>`/`<select>`/`<button>` it scans — not rendered by our code.
  Added `suppressHydrationWarning` to all of `CollabForm`'s form
  controls (name/email/linkedinUrl/phone/message fields, the reason
  `<select>`, the honeypot input, and the submit button). Same fix
  family as `<body>`'s `suppressHydrationWarning`, just needed on each
  element this time since the mismatch is per-field, not just once on
  `<body>`. `npm run build` and `npm run lint` pass clean.
- **2026-09-19** — User said the nav logo (`ayushlogo.png`, swapped in by
  the user earlier) was too small to read the name. Bumped `Nav.tsx`'s
  logo `className` from `h-8 w-auto md:h-9` to `h-11 w-auto md:h-14`
  (32px→44px mobile, 36px→56px desktop).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
