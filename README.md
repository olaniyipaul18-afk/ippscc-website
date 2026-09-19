# IPPSCC — International Police & Public Safety Chaplain Corps, USA

Official website of the **International Police & Public Safety Chaplain Corps, USA (IPPSCC)** —
a US-registered international professional body.

> **Light in the Line of Duty.** — *Shielded by Faith, Sent to Serve.*

A premium, editorial, institution-grade web experience with a complete member portal
and admin backend — built with Next.js (App Router), TypeScript and Tailwind CSS.
Production-ready and deployable to Vercel directly from this repository's root.

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
  (Black and White service members), official leadership portraits, plus a
  hand-built vector **dotted globe** (`components/Globe.tsx`)

## What this project is

A complete website + application platform:

- **Public site** — Home, About, Services (14 + 4 deep dives), Membership,
  Training, Standards, Leadership & Governance (Chaplain General + Lieutenant
  General profiles), Partnerships, Global / Africa / Nigeria, Events,
  Insights (6 essays + newsletter), FAQ, Contact
- **Membership application** (`/join`) — full 3-section wizard (A: Personal,
  B: Education, C: Reference & Background) with live progress bar, step
  validation, automatic draft saving, attestation & declaration, tracking
  reference issuance, and public status tracking (`/track`)
- **Member portal** (`/portal`) — login, dashboard with digital ID card,
  profile setup (details, photo, password), notifications
- **Admin control** (`/admin`) — login, overview stats, application review
  queue (approve → auto-provisions member login), member management
  (status, password resets), notification broadcasts
- SEO metadata, Open Graph cover, JSON-LD structured data, sitemap, robots,
  web manifest, custom 404 and error pages

## The membership journey (as built)

1. Applicant completes Sections A → B → C → Review on `/join`, receives a
   reference (e.g. `IPPSCC-2026-XXXXX`), tracks it on `/track`
2. Admin reviews in `/admin/applications`, verifies referees/credentials,
   requests changes or approves
3. **Approve** auto-creates the member account and shows one-time login
   credentials (Member ID + temporary password) to share securely
4. Payment is arranged out-of-band; admin marks the application **Completed**
5. Member signs in at `/portal/login`, sets a real password, completes their
   profile, and receives Corps notifications

## Backend modes

| Mode | When | Data |
|---|---|---|
| **Demo** (default) | Supabase vars empty | In-memory, seeded (admin + 2 members + 1 trackable application). Resets on redeploy. Fully clickable for evaluation. |
| **Production** | Supabase vars set | Persistent Postgres + Storage. |

Demo credentials (demo mode only, shown on the login screens):
- Admin: `admin@ippscc.org` / `Admin123!`
- Member: `member@ippscc.org` / `Member123!`
- Tracking: `IPPSCC-2026-DEMO1` / `demo-track@example.com`

## Production backend setup (Supabase, ~15 minutes, free tier)

1. Create a project at [supabase.com](https://supabase.com) → open the **SQL Editor**
2. Paste the entire contents of `supabase/schema.sql` → **Run** (creates
   `members`, `applications`, `notifications`, `admins`)
3. **Storage** → New bucket → name `member-documents` → toggle **Public** on
4. Create the first admin:
   ```bash
   node scripts/hash-password.mjs "Choose-A-Strong-Password"
   ```
   Paste the output hash into the commented `insert into admins …` statement at
   the bottom of `schema.sql` and run it in the SQL Editor.
5. Project **Settings → API**: copy the **Project URL** and the
   **`service_role`** key (secret — server only, never `NEXT_PUBLIC_`).
6. Add to Vercel (**Settings → Environment Variables**) plus `AUTH_SECRET`
   (generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`),
   then redeploy.

Security notes: passwords are scrypt-hashed; sessions are HMAC-signed
httpOnly cookies; the service-role key never leaves the server. For
hardened deployments, consider migrating to Supabase Auth + Row Level
Security and adding rate limiting / Turnstile on public endpoints.

## Technologies used

- **Next.js 16** (App Router, Route Handlers) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first configuration)
- **Supabase** (`@supabase/supabase-js`, Postgres + Storage) with built-in demo fallback
- **Framer Motion**, **Lucide** icons, self-hosted fonts

## Getting started

### Prerequisites

- Node.js **18.18+** (20.x recommended), npm

### Install & run

```bash
npm install
npm run dev        # open http://localhost:3000
```

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

Copy `.env.example` to `.env.local`:

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_CONTACT_EMAIL` | No | Contact address shown across the site |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical URL for SEO / sitemap / OG tags |
| `NEXT_PUBLIC_FORM_ENDPOINT` | No | Optional Formspree endpoint for the Contact form |
| `AUTH_SECRET` | **Yes (prod)** | Signs portal session cookies |
| `NEXT_PUBLIC_SUPABASE_URL` | For prod backend | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | For prod backend | Supabase secret key (server-only) |

Never commit `.env.local` — it is git-ignored.

## Deploying to Vercel

Repository root is the Vercel project root (no sub-directory config).

1. Push to GitHub; import the repo in Vercel (framework: **Next.js**)
2. Add environment variables (at minimum `AUTH_SECRET`; plus Supabase trio
   for the production backend)
3. **Deploy** — pushes to `main` redeploy automatically

## Project structure

```
app/
  (public pages)            26 marketing + content routes
  join/                     Membership application wizard host
  track/                    Public application tracking
  portal/login/             Member sign-in (public)
  portal/(app)/             Protected: dashboard, profile, notifications
  admin/login/              Admin sign-in (public, noindex)
  admin/(app)/              Protected: overview, applications, members, broadcast
  api/                      Auth, applications, members, profile,
                            notifications, tracking, stats, status
components/                 UI incl. ApplicationWizard, PortalShell, AdminShell,
                            Globe, SearchOverlay, ShareArticle, Crest…
data/                       Content (services, values, articles, leaders…)
lib/                        auth (sessions+scrypt), store (demo+Supabase),
                            application schema, status, search index, site config
supabase/schema.sql         Production database schema + admin seed guide
scripts/hash-password.mjs   Password-hash generator for admin seeding
public/                     Seal, OG cover, favicon, leaders, imagery
```

## License

All content © IPPSCC — International Police & Public Safety Chaplain Corps, USA.
Code is provided for the organization's official use.
