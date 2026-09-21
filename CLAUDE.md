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
- **2026-09-20** — User asked to pull the PRD's Phase 4 "live Currently
  Grinding data" forward: replace the plain-text strip with a GitHub-style
  contribution heatmap combining GitHub + LeetCode + Codeforces daily
  activity, with per-day hover tooltips (0 if nothing happened that day)
  and click-through from each platform name to the real profile. Confirmed
  with the user first, since CLAUDE.md gates backend work behind explicit
  go-ahead: this uses lightweight Next.js API routes/server components in
  this same app (no FastAPI service, no database), which the user approved
  as in-scope separately from the gated Phase 2 backend. Got real handles
  from the user: GitHub `AyushM03`, LeetCode `AyushMM03`, Codeforces
  `ayushm03` — filled into `src/data/site.ts` (`github`/`leetcode` were
  `null`; added a new `codeforces` field).
  - `src/lib/activity.ts` — merges three public, unauthenticated sources
    into one `DayActivity[]` (53 weeks, GitHub-style Sunday-aligned grid):
    GitHub via the unofficial `github-contributions-api.jogruber.de` REST
    wrapper (no token needed, avoids exposing a GitHub PAT), LeetCode via
    its public `leetcode.com/graphql` `userCalendar.submissionCalendar`
    query, Codeforces via its official `user.status` REST API grouped by
    `creationTimeSeconds`. Each source fails independently (try/catch ->
    empty object) so one platform being down doesn't blank the others.
    Fetches use `next: { revalidate: 3600 }`, so the page statically
    prerenders with hourly ISR rather than hitting three external APIs
    per visitor.
  - `src/app/api/activity/route.ts` — thin GET wrapper around the same lib
    function, exposed as `/api/activity` for potential future client-side
    use.
  - `CurrentlyGrinding.tsx` is now an async Server Component (dropped
    `"use client"`/framer-motion on the heading — a Server Component can't
    render motion primitives) that calls `getActivityData()` directly
    (no self-fetch over HTTP) and renders a new client component,
    `ActivityHeatmap.tsx`, with the merged data as props.
  - `ActivityHeatmap.tsx` — the heatmap grid, a legend row of
    GitHub/LeetCode/Codeforces totals that link out to the real profiles
    (per-day breakdown via hover/focus, plain-text tooltip content per the
    user's own phrasing), and a "Less -> More" scale legend. Colored on a
    5-step sequential ramp built from the site's own `--accent` lime hue
    (not the generic dataviz default palette) via opacity steps, per the
    dataviz skill's sequential-encoding rule (single hue, monotonic
    lightness) — validated visually rather than through the categorical
    `validate_palette.js` script, which the skill notes will FAIL-by-design
    on sequential ramps and isn't the right check for them.
  - Deleted `src/data/grinding.ts` (the old 3-line manually-updated
    strip) — fully superseded, nothing else imported it.
  - **Bug caught by testing, not by inspection:** the first hover-tooltip
    implementation put the tooltip inside the same `overflow-x-auto` div
    as the scrolling grid. Setting `overflow-x` alone forces `overflow-y`
    to compute to `auto` too (CSS spec: an axis can't stay `visible` if
    its pair isn't), so the container silently clipped the tooltip
    whenever it rendered near the top of the grid — visually it looked
    like the date was truncated to just the year. Fixed by moving the
    tooltip to a sibling of the scrollable inner div, under a
    non-clipping outer wrapper, plus a horizontal clamp so the tooltip
    doesn't overflow past the first/last week columns. Caught via a
    Playwright screenshot during verification, not visible from reading
    the JSX alone — worth a real hover screenshot on any future
    absolutely-positioned tooltip inside a scrollable ancestor.
  - Verified with a live production build (`npm run build` + `npm run
    start`) hitting `/api/activity` directly — confirmed real nonzero
    counts merged correctly (42 GitHub contributions, 309 LeetCode
    submissions, 1 Codeforces submission over the trailing year at time of
    writing) — then with headless Chromium (Playwright, installed ad hoc
    into the scratchpad since no project browser-testing skill exists yet)
    at 1440px and 390px: hovered top-row and last-column cells to confirm
    the tooltip fix, clicked the GitHub legend link to confirm it resolves
    to `https://github.com/AyushM03`, checked `console --errors` was empty
    throughout. `npm run build` and `npm run lint` both pass clean.
- **2026-09-20** — Filled in real contact info in `src/data/site.ts`:
  email (`aayushmeshram9168@gmail.com`), phone (`+91 9168499284`), LinkedIn
  (`https://www.linkedin.com/in/ayushmeshram/`). Footer/Collab/Nav/About now
  render these instead of hiding the links.
- **2026-09-20** — User gave explicit go-ahead to start PRD Phase 2 (the
  collab backend, previously gated per this file's working-style rule).
  Built the FastAPI + PostgreSQL service in a new `backend/` directory,
  confirmed with the user: notifications via **Resend** (not Discord/
  Telegram), local Postgres via **Docker Compose**.
  - `backend/app/` — `main.py` (FastAPI app, CORS restricted to
    `ALLOWED_ORIGINS`, `POST /api/inquiries`, `GET /health`),
    `models.py` (SQLAlchemy `Inquiry` model — matches PRD §8's `inquiries`
    table exactly: id/name/email/linkedin_url/phone/reason/message/status/
    created_at), `schemas.py` (Pydantic `InquiryCreate`, accepts the
    frontend's camelCase `linkedinUrl` via a Pydantic alias so no frontend
    field renaming was needed), `notifications.py` (Resend email on new
    inquiry, `html.escape()`s every user-supplied field before interpolating
    into the email HTML — untrusted input otherwise lands straight in an
    HTML email body), `config.py` (`pydantic-settings`, all secrets/URLs
    from env vars, nothing hardcoded).
  - Rate limiting: `slowapi`, keyed off `X-Forwarded-For` (falls back to
    the socket peer address) so it works correctly once deployed behind
    Render/Railway's proxy, not just the raw connecting IP — a plain
    `get_remote_address` would rate-limit the proxy, not the visitor, once
    deployed. Default `5/hour`, configurable via `RATE_LIMIT` env var.
  - Honeypot (`company` field, mirrors `CollabForm`'s existing client-side
    honeypot): if filled, the endpoint returns the same `200 {"status":
    "ok"}` as a real success and does nothing — writes nothing to the DB,
    sends no notification — so a bot never learns the tell from a
    different response shape.
  - A notification-send failure (bad Resend key, Resend outage) is caught
    and logged, never surfaced as a submit error — the inquiry is already
    committed to Postgres by that point, so a delivery hiccup shouldn't
    make the visitor think their message was lost.
  - Migrations via Alembic (`backend/alembic/versions/0001_...py`) rather
    than `create_all()` — deliberate, since this backend is explicitly also
    meant as FastAPI/Postgres practice (PRD §1, roadmap's "Backend Depth"
    step) and schema migrations are core to that.
  - `docker-compose.yml` (Postgres 16 + the API, healthcheck-gated
    `depends_on`) for local dev. **Host port 5433 → container 5432** —
    deliberately not 5432:5432, because this machine already runs a native
    Postgres Windows service on 5432 for other projects; container-to-
    container traffic (the API's own `DATABASE_URL`) is unaffected since it
    addresses the `db` service by name on the compose network regardless of
    the host port mapping.
  - Wired `CollabForm.tsx`'s `onSubmit` to actually `fetch()`
    `${NEXT_PUBLIC_API_URL}/api/inquiries` (added `.env.local.example` at
    the repo root, default `http://localhost:8000`) instead of the old
    `setTimeout` simulation; updated the post-submit copy since the form is
    no longer fake. Added `!.env*.example` to the frontend's root
    `.gitignore` — its blanket `.env*` rule was also swallowing the new
    example file.
  - **Bug caught by testing, not by inspection:** the first version of the
    Alembic migration both called `.create(checkfirst=True)` on the two
    enum types explicitly *and* passed the same `ENUM(...)` type objects
    into the `inquiries` columns in the same `op.create_table(...)` call.
    SQLAlchemy's Postgres dialect auto-issues its own `CREATE TYPE` for any
    enum column unless that specific column's type instance is constructed
    with `create_type=False` — so this ran `CREATE TYPE inquiry_reason`
    twice in one migration and failed with `DuplicateObject` on `alembic
    upgrade head`. Fixed by adding `create_type=False` to the enum types
    used on the columns themselves, since the explicit `.create()` calls
    above them already handle creation. Postgres's transactional DDL meant
    the failed first attempt left no partial state behind (verified via
    `\dT+`/`\dt` before re-running) — worth remembering next time a
    migration needs both an explicit enum creation and a table using it.
  - Verified for real, not just import-level: `docker compose up -d
    --build` (Postgres 16-alpine + the API container), `alembic upgrade
    head` inside the container, then a full round trip — `curl` a valid
    payload → confirmed the row in `psql`, `curl` an invalid payload →
    confirmed the exact 422 field errors, `curl` with the honeypot field
    filled → confirmed `200 ok` with **no** row written. Then the real
    frontend: `npm run dev` + a headless-Chromium (Playwright) script that
    fills and submits the actual `CollabForm` UI at `localhost:3000/#collab`
    → confirmed the real success copy appears, zero console errors, and the
    submitted row lands in Postgres. Test rows deleted afterward. `npm run
    build` and `npm run lint` both pass clean on the frontend changes.
  - Docker's registry pull was blocked by this session's command sandbox
    (CDN blob fetches returned `EOF`) — resolved by rerunning the pull/build
    step with the sandbox disabled for that command; not a problem with the
    user's actual network or Docker install.
  - **Left running for continued local dev:** the `docker compose` stack
    (Postgres + API) in `backend/`, so the user can keep testing against it.
  - **Still open from PRD §11 Phase 2 / §12:** choice of backend+DB hosting
    provider (Railway vs. Render; Neon/Supabase for prod Postgres) — not
    needed for local dev, only once this gets deployed.
- **2026-09-20** — User signed up for Resend (free tier — 3,000 emails/mo,
  no card required) and pasted a real `RESEND_API_KEY` into `backend/.env`
  (gitignored, never committed). Recreated the `api` container
  (`docker compose up -d --force-recreate api`) so it picked up the new env
  var — `db` also got recreated in the same command, but the named
  `db_data` volume persisted the schema/data across that, verified via
  `\dt` before and after. Sent a real test inquiry through the API and
  confirmed via Resend's own `/emails` endpoint (not just absence of an
  error in our logs) that the notification actually reached
  `aayushmeshram9168@gmail.com` — `last_event: "delivered"`. Test row
  deleted afterward. **Collab backend notifications are now fully live**,
  closing out the last open piece of PRD Phase 2.
- **2026-09-20** — Resolved three more PRD §12 open questions on explicit
  user direction: Demo badge → internal marker only, case-study pages →
  stay deferred to Phase 3, real favicon + Open Graph metadata, backend
  hosting → Render + Neon (both picked for "best and free" after checking
  current 2026 pricing — Railway and Fly.io no longer have real ongoing
  free tiers, and Neon's free Postgres has no forced pause/expiry the way
  Render's own free Postgres or Supabase's free tier do).
  - **`ProjectCard`**: removed the visible "Demo" badge `<span>`; `project
    .isDemo` now only surfaces as a `data-demo` attribute on the card
    (inspectable in devtools, invisible to a normal visitor). No PRD data
    model change — same `isDemo` field, just not rendered as UI anymore.
  - **Favicon**: cropped the spiky-hair/swirl-eyes character mark out of
    `public/images/logo/ayushlogo.png` (the full logo is a wide wordmark —
    unreadable shrunk into a square favicon) into a square, padded to a
    transparent-free white-background square via Pillow, and generated
    `src/app/icon.png`, `src/app/apple-icon.png`, and a multi-size (16/32/
    48) `src/app/favicon.ico` from it — replaces the default Next.js icon.
    **Bug caught by testing:** the first `favicon.ico` was saved from an
    RGB (no alpha) canvas and failed `next build` outright (Turbopack:
    "The PNG is not in RGBA format!") — Windows `.ico` needs an RGBA
    source even when nothing is actually transparent; regenerated from an
    RGBA canvas and the build passed.
  - **Open Graph / Twitter card**: added `src/lib/og-image.tsx` (shared
    render function, since Next.js requires the exact filenames
    `opengraph-image.tsx` and `twitter-image.tsx` as separate route-segment
    files — this avoids duplicating the same JSX in both) using `next/og`'s
    `ImageResponse` to generate a 1200×630 card at request time: dark
    (`#02080E`) background, lime (`#B7E401`) accent bar and role line —
    hex versions of `globals.css`'s `--foreground`/`--accent` HSL tokens,
    computed by hand since `ImageResponse`'s Satori renderer doesn't
    reliably support `hsl()`. No custom font loaded (Satori's default);
    kept to plain typography, no photo/decoration, consistent with the
    "clean engineer aesthetic" the Hero section already committed to.
    Added `metadataBase` (from a new `NEXT_PUBLIC_SITE_URL` env var,
    defaults to `localhost:3000`) to `layout.tsx`'s metadata — required
    for Next.js to resolve the image to an absolute URL — plus `openGraph`
    and `twitter` (`summary_large_image`) fields.
  - Verified for real: `npm run build` (catches the favicon RGBA bug above
    — import-level checks wouldn't have), then `npm run start` and
    `curl`'d `/opengraph-image` directly (viewed the actual rendered PNG —
    correct colors/layout/text) and grepped the served HTML `<head>` to
    confirm every `og:*`/`twitter:*` meta tag and all three icon `<link>`
    tags render with the right paths, and confirmed no "Demo" text renders
    while `data-demo="true"` is still present in the markup. `npm run
    lint` clean throughout.
  - **Backend hosting decision + deploy prep**: added `render.yaml` at the
    repo root (Blueprint spec, `rootDir: backend`, Docker runtime, `plan:
    free`, `dockerCommand` without `--reload` since that's dev-only,
    secrets marked `sync: false` so Render prompts for them instead of
    storing plaintext in the repo). Postgres itself is **not** in this
    file — it's Neon, provisioned separately since it's a different
    provider. **Not yet done — needs the user, same as Resend earlier**:
    sign up at neon.tech (free), create a project, get the connection
    string, and rewrite its scheme from `postgresql://` to
    `postgresql+psycopg://` (this backend uses the psycopg3 driver, not
    psycopg2 — Neon's copy-paste string won't have the `+psycopg` part).
    Then sign up at Render, deploy this Blueprint, paste in `DATABASE_URL`
    (the rewritten Neon string), `RESEND_API_KEY`, and — once the frontend
    itself is deployed — `ALLOWED_ORIGINS` set to that real origin. Run
    `alembic upgrade head` once against the Neon database before first use
    (from a local shell with `DATABASE_URL` pointed at Neon, or Render's
    own shell once deployed).
- **2026-09-20** — User signed up for Neon and put a real connection
  string in `backend/.env`'s `DATABASE_URL` (gitignored, never committed).
  Took two tries: first the file looked unedited on read — turned out to
  be an unsaved editor buffer, not a tool issue; second, the pasted string
  still had Neon's default `postgresql://` scheme, corrected to
  `postgresql+psycopg://` per the note above (without echoing the
  credentials back in chat). Ran `alembic upgrade head` from a local venv
  (`backend/.venv`, created earlier for import-level checks) directly
  against Neon — succeeded, created the same `inquiries` table/enums as
  the local Docker Postgres. Verified for real, not just the migration:
  ran the API standalone (`uvicorn`, port 8001, bypassing Docker) with
  `DATABASE_URL` pointed at Neon, submitted a real inquiry via `curl`,
  and queried Neon directly through the app's own `SessionLocal`/`Inquiry`
  model to confirm the row actually landed there. Test row deleted after.
  **The production database is live and reachable** — only Render
  (the API host) is still pending, per the steps above.
- **2026-09-20** — Backend deployed to Render (`portfolio-collab-api`,
  from `render.yaml`). Confirmed live and healthy: `GET /health` →
  `200 {"status":"ok"}` at `https://portfolio-collab-api.onrender.com`.
  `GET /` → `404 {"detail":"Not Found"}` there is expected, not a bug —
  `main.py` only defines `/health` and `POST /api/inquiries`, no root
  route. User decided to point the deployed frontend at
  `www.ayushmeshram.dev` (CNAME, not the apex domain — apex left unused
  for now) rather than a bare `*.onrender.com` URL. **User is pausing
  here and will resume the deploy process tomorrow.** Remaining steps,
  none done yet:
  1. Deploy the frontend as its own Render web service.
  2. In that service's Render dashboard → Settings → Custom Domains, add
     `www.ayushmeshram.dev`, then add the CNAME record Render displays
     at whichever registrar holds `ayushmeshram.dev`'s DNS.
  3. Set env vars **in the Render dashboard** (not local `.env*` files,
     which are gitignored and never reach the deployed build):
     - Frontend service: `NEXT_PUBLIC_API_URL=https://portfolio-collab-api.onrender.com`,
       `NEXT_PUBLIC_SITE_URL=https://www.ayushmeshram.dev`
     - Backend service (`portfolio-collab-api`):
       `ALLOWED_ORIGINS=https://www.ayushmeshram.dev` (currently unset —
       the deployed CollabForm's `fetch()` will be CORS-blocked until
       this is set to the real frontend origin).
  Local `.env.local` (`NEXT_PUBLIC_API_URL=http://localhost:8000`) is
  intentionally left pointing at local dev and does not need to change
  for this deploy.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
