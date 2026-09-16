# IPPSCC — International Police & Public Safety Chaplain Corps, USA

Official website of the **International Police & Public Safety Chaplain Corps, USA (IPPSCC)** —
a US-registered international professional body.

> **Light in the Line of Duty.** — *Shielded by Faith, Sent to Serve.*

A premium, editorial, institution-grade web experience built with Next.js (App Router),
TypeScript and Tailwind CSS. Production-ready and deployable to Vercel directly from
this repository's root.

## Brand

- **Official seal** — `public/images/ippscc-seal.png` (transparent ground), rendered
  site-wide through `components/Crest.tsx` (header, footer, heroes, CTAs, 404)
- **Brand palette drawn from the seal**
  - Seal navy `#071120` (surfaces, depth)
  - Brass gold `#C6A15B` (primary accent, rules, focus states)
  - Seal crimson `#B02A37` (restrained accent — the "line of duty" pinstripe, crisis
    disciplines, alert iconography)
  - Parchment `#FAF8F2` (light editorial breaks)
- **Typography** — Fraunces (display serif), Inter (body), IBM Plex Mono (labels);
  self-hosted via `next/font`, no external requests
- **Imagery** — diverse chaplain, military and first-responder photography
  (Black and White service members), plus a hand-built vector **dotted globe**
  (`components/Globe.tsx`) marking Corps HQ (USA), IPPSCC Nigeria and the growing
  international fellowship

## What this project is

A complete multi-page website covering:

- Home, About (mission, vision, motto, tagline, core values)
- Chaplaincy services (overview + deep dives: law enforcement, first responder,
  crisis & disaster in crimson accent, wellness & support)
- Membership & entitlements, Training & chaplain development
- Professional standards, ethics, confidentiality & safeguarding
- Leadership & governance, Partnerships
- Global outreach (vector globe + Corps presence), IPPSCC Africa, IPPSCC Nigeria
- Events & conferences, Insights (6 full essays + newsletter), FAQ
- Join (application form) and Contact pages
- SEO metadata, Open Graph cover, JSON-LD structured data, sitemap, robots,
  web manifest, custom 404 and error pages

## Functionality

- **Site-wide search** (`Ctrl/⌘ + K`) — keyboard-navigable overlay across pages,
  services, essays, FAQs, events and values (`components/SearchOverlay.tsx`,
  `lib/search-index.ts`)
- **Join & Contact forms** — validated, with status handling; POST to
  `NEXT_PUBLIC_FORM_ENDPOINT` when set, otherwise fall back to pre-filled email
- **Newsletter capture** — "Receive the Insight" on the Insights page
- **Article sharing** — X, Facebook, LinkedIn, WhatsApp, copy-link and native
  Web Share API (`components/ShareArticle.tsx`)
- **Back-to-top control**, scroll-aware header, animated mobile navigation
- **Reduced-motion support** — all animation (including globe SMIL motion)
  respects `prefers-reduced-motion`

## Technologies used

- **Next.js 16** (App Router) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first configuration)
- **Framer Motion** (intentional, subtle motion)
- **Lucide** icons (no emoji iconography)

## Getting started

### Prerequisites

- Node.js **18.18+** (20.x recommended)
- npm (ships with Node)

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Press `Ctrl/⌘ + K` to try search.

### Production build

```bash
npm run build
npm start
```

### Typecheck

```bash
npm run typecheck
```

## Environment variables

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_CONTACT_EMAIL` | No (defaults to `info@ippscc.org`) | Contact address shown across the site |
| `NEXT_PUBLIC_SITE_URL` | No (defaults to `https://ippscc.org`) | Canonical URL for SEO / sitemap / OG tags |
| `NEXT_PUBLIC_FORM_ENDPOINT` | No | Optional form-handling endpoint (e.g. Formspree). When empty, forms fall back to pre-filled email. |

No secrets are required. Never commit `.env.local` — it is git-ignored.

## Deploying to Vercel

This repository is structured so the **repository root is the Vercel project root**
(no sub-directory configuration needed).

1. Push this project to GitHub (see commands below).
2. Go to [vercel.com](https://vercel.com) → **Add New… → Project**.
3. Import the GitHub repository.
4. Framework preset: **Next.js** (auto-detected). Leave build settings as-is:
   - Build command: `next build`
   - Output directory: (Next.js default)
5. (Optional) Add environment variables under **Settings → Environment Variables**:
   - `NEXT_PUBLIC_CONTACT_EMAIL`
   - `NEXT_PUBLIC_SITE_URL` (set to your production domain)
   - `NEXT_PUBLIC_FORM_ENDPOINT`
6. Click **Deploy**.

Every push to the default branch redeploys automatically. Preview deployments are
created for pull requests.

## Pushing to GitHub

Run these commands from the project root (replace with your repository URL).
If the repository already exists and is set as `origin`, only the last line is needed:

```bash
git add .
git commit -m "Update IPPSCC website"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## Project structure

```
app/                    App Router pages, layout, sitemap, robots, manifest
  insights/[slug]/      Article detail pages (statically generated)
components/             Reusable UI (header, footer, heroes, sections, forms,
                        globe, search, share, newsletter, seal…)
data/                   Structured content (services, articles, events, FAQs, nav)
lib/                    Site config, search index, shared motion presets
public/                 Static assets (official seal, OG cover, favicon, imagery)
```

## Content & imagery

- All copy is drawn from the official IPPSCC brand brief.
- The official seal (`public/images/ippscc-seal.png`) was supplied by the
  organization; the background was made transparent for dark-theme presentation.
- Supporting photography in `public/images/` is AI-generated art direction for
  launch, centred on diverse (Black and White) chaplains in police, military and
  first-responder environments; replace with licensed photography at any time
  (keep filenames or update imports).
- The shield favicon (`public/favicon.svg`) is a simplified mark that stays
  legible at 16px; the full seal would be unreadable at that size.

## Accessibility & performance

- Semantic HTML, skip link, focus-visible styles, labelled navigation and dialogs
- `prefers-reduced-motion` respected for all animation
- Self-hosted fonts, AVIF/WebP images, no render-blocking third parties

## License

All content © IPPSCC — International Police & Public Safety Chaplain Corps, USA.
Code is provided for the organization's official use.
