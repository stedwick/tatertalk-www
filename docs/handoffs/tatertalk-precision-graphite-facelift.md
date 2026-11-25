---
artifact_contract: "ce-handoff/v1"
created_at: "2026-11-25T17:18:34Z"
title: "Tater Talk Precision Graphite Facelift & Polish Prep"
summary: "Selected and meshed the Precision Graphite & Sans homepage facelift for tatertalk.app with the original site's copy, animated demo, and YouTube video; ready for optional polish skill installation and Astro integration."
keywords: ["tatertalk", "redesign", "precision-graphite", "facelift", "astro", "impeccable", "ui-polish"]
cwd: "/Users/philip/.gemini/antigravity/worktrees/tatertalk-www/tatertalk_branch_summary"
resume_focus: "Polish the Precision Graphite & Sans facelift (optionally using impeccable / web-design-guidelines / emil-design-eng) and promote it into the Astro site or public/designs/"
repository: "stedwick/tatertalk-www"
repo_root_sha: "1ae2db7db862573b117f964478243afc7790aa4e"
branch: "tatertalk_branch_summary"
head: "92aa3a5f3d58631c7760acb26ce66fa38dad48d7"
worktree_path: "/Users/philip/.gemini/antigravity/worktrees/tatertalk-www/tatertalk_branch_summary"
---

## Objective & Current User Intent

- **User's goal (stated):** Give `https://tatertalk.app` a cleaner, more professional **visual facelift** rather than rewriting the site or inventing new homepage functionality.
- **User's selected direction (stated):** **Precision Graphite & Sans** (matte graphite `#0C0F14` + `#131820` cards, `Plus Jakarta Sans` + `Inter` + `JetBrains Mono`, warm amber-orange `#F97316` accent, studio condenser microphone hero framing) meshed with the **spirit, intent, structure, and copy of the current live site**—specifically keeping the original animated browser dictation demo AND adding the user's 1-minute YouTube demo video.
- **Latest user request (stated):** Compared copy between the old site and the meshed Precision Graphite build, and asked to find skills like `impeccable` to polish the page to production quality. No skills have been installed yet; awaiting user confirmation on which skills to install and whether to integrate into Astro.

## Work Completed

1. **Branch summary:** Inspected `orca/tatertalk-next` (`92aa3a5`), which adds `/original` (`src/pages/original.astro`, `src/archives/tater-talk-v1.html`, `public/original-assets/`) and three earlier whimsical previews under `public/designs/{a,b,c}` (Spudnik, Series 1, Hotel Tater).
2. **Creativity run (professional speech-to-text research & 3×3 drafts):** Captured 11 live speech-to-text / craft sites, generated 3 custom artworks, and built/judged three initial directions (`Signal Deck`, `The Proof Sheet`, `Cobalt Press`).
3. **Toned-down Signal Deck facelifts:** Per user feedback rejecting invented live-mic homepage widgets and try-hard slogans, created 3 faithful facelifts under `signal-deck-v2/{1,2,3}` using the exact `tatertalk.app` structure and copy.
4. **Precision Graphite full mesh:** User picked Draft 3 (`Precision Graphite & Sans`) and asked to restore the original animated browser demonstration without deleting content. Built the meshed static preview and verified desktop (`1440×900`) and phone (`390×844`) captures. Fixed a minor orphan vertical divider in `.compat-bar` after visual inspection.
5. **GA4 `?_gl=` URL diagnosis:** Confirmed `Hero.astro` and `Header.astro` already link cleanly to `https://v2.tatertalk.app`; the `?_gl=...*_ga*...` query string on the live site is appended at click-time by GA4 (`G-K4J7545NT7` in `src/layouts/Layout.astro`) due to cross-domain measurement settings in GA4 Admin.
6. **Copy audit & polish-skill discovery:** Produced an exact copy diff between the current Astro components and the meshed Precision Graphite build, and verified top `skills.sh` design-polish candidates (`pbakaus/impeccable`, `vercel-labs/agent-skills@web-design-guidelines`, `emilkowalski/skills@emil-design-eng`, `anthropics/skills@frontend-design`, `leonxlnx/taste-skill@high-end-visual-design`).

## Decisions, Constraints & Rejected Alternatives

- **User's hard constraints:**
  - Must remain a **facelift** of the current `tatertalk.app` copy and section order (`Header → Hero → Demo → Features → FAQ → CallToAction → Footer`).
  - **Do not** invent a live Web Speech API dictation widget on the homepage, fake UI switchboards, or try-hard copy (e.g. `"The mic is hot"`).
  - **Keep** the original animated browser dictation demo in `#demo` AND **keep** the embedded 1-minute YouTube walkthrough (`zOpNAK2r0F0`).
- **Rejected alternatives (user's call):** `The Proof Sheet`, `Cobalt Press`, `Signal Deck` Draft 1/2 (serif/paper variants), and the earlier creative-rewrite versions of Signal Deck.
- **Minor copy delta to confirm with user (agent observation):** The current site's `astro.config.mjs` defines `PUBLIC_APP_NAME` default as `"Tater 🥔 Talk"` (used in FAQ Q1–Q3 and A1–A3), whereas the Precision Graphite preview writes `"Tater Talk"` without `🥔`. Small additions in the preview: `"Free Browser Dictation"` hero emblem pill, the 4-line `"1-Minute Walkthrough"` video card copy, and JS demo states (`"Paused — click mic to resume"`, `"Copied!"`).

## Current State & Fragile Local State

- **Git working tree:** Clean except for one uncommitted edit in `.gitignore` adding `creativity-runs/`. No Astro source files (`src/**`) or `public/designs/**` have been modified yet.
- **Machine-local ignored build directory:** All creative research, generated assets, captures, and static previews live in the gitignored directory `/Users/philip/.gemini/antigravity/worktrees/tatertalk-www/tatertalk_branch_summary/creativity-runs/tatertalk-pro/`. Because it is gitignored and inside a worktree, removing or pruning the worktree would destroy these files unless promoted into tracked repo paths first.
- **Preview server stopped:** A `portless` server previously served `creativity-runs/tatertalk-pro/` at `https://tatertalk-pro.dev`, but background tasks were stopped by a server restart. To re-open the live preview, restart:
  `portless tatertalk-pro sh -c 'python3 -m http.server "$PORT" --directory creativity-runs/tatertalk-pro'`
  Then open `https://tatertalk-pro.dev/signal-deck-v2/precision-graphite/`.

## Authoritative References

- **Primary preview to build from (machine-local, gitignored):**
  - `/Users/philip/.gemini/antigravity/worktrees/tatertalk-www/tatertalk_branch_summary/creativity-runs/tatertalk-pro/signal-deck-v2/precision-graphite/index.html` — Meshed Precision Graphite & Sans HTML with original copy, animated demo, and YouTube embed.
  - `/Users/philip/.gemini/antigravity/worktrees/tatertalk-www/tatertalk_branch_summary/creativity-runs/tatertalk-pro/signal-deck-v2/precision-graphite/style.css` — Precision Graphite design tokens, layout, responsive rules (includes `.compat-bar` divider fix).
  - `/Users/philip/.gemini/antigravity/worktrees/tatertalk-www/tatertalk_branch_summary/creativity-runs/tatertalk-pro/signal-deck-v2/precision-graphite/main.js` — Typing animation loop, Copy/Clear/Pause controls, and click-to-play YouTube iframe swap.
  - `/Users/philip/.gemini/antigravity/worktrees/tatertalk-www/tatertalk_branch_summary/creativity-runs/tatertalk-pro/signal-deck-v2/precision-graphite/assets/` — `signal-hero.jpg` (generated studio mic photo), `tutorial.webp`, `logo.webp`, `app-desktop.webp`.
- **Current production Astro source (repo-relative, authoritative for copy/SEO/JSON-LD/env vars):**
  - `astro.config.mjs` (lines 26–88) — Public env schema including `PUBLIC_APP_NAME` (`"Tater 🥔 Talk"`), `PUBLIC_APP_URL`, and social/support URLs.
  - `src/layouts/Layout.astro` (lines 25–110) — Meta tags, OG/Twitter tags, WebApplication/Organization JSON-LD, and GA4 `gtag.js` (`G-K4J7545NT7`).
  - `src/components/layout/Header.astro`, `src/components/layout/Footer.astro` — Current header/footer markup and env-driven links.
  - `src/components/sections/Hero.astro`, `Demo.astro`, `Features.astro`, `FAQ.astro`, `CallToAction.astro` — Current section copy, FAQPage & VideoObject JSON-LD, and icons.
- **Uncommitted repo change:** `.gitignore` (lines 29–30) — Ignores `creativity-runs/`.

## Verification Performed

- Visually inspected headless Chrome captures (`desktop-fold.png`, `desktop-full.png`, `phone-fold.png`) of `signal-deck-v2/precision-graphite/index.html`; spotted and removed an orphan `.compat-divider` line in `style.css` (note: capture was not re-run after that single CSS rule change).
- Verified `skills.sh` install counts live via `npx skills find`.
- No Astro build (`npm run build`) has been run yet because no Astro files were edited.

## Plausible Next Steps

1. **Polish & Ship Path (recommended sequential flow):**
   - Ask the user which polish skills to install globally (e.g., `pbakaus/impeccable@impeccable`, `vercel-labs/agent-skills@web-design-guidelines`, `emilkowalski/skills@emil-design-eng`) and whether to keep `"Tater 🥔 Talk"` in the FAQ.
   - Run a targeted polish pass on `precision-graphite` (including re-capturing after the `.compat-bar` fix).
   - Promote the polished design either into `public/designs/d/` (as a preview alongside `a`/`b`/`c`) or directly into the live Astro components under `src/components/` & `src/styles/global.css` (preserving all JSON-LD, SEO meta tags, and `astro:env/client` variables), then verify with `npm run build` and GitButler (`but`).
