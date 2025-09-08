# Soni Holidays

Premium customised tours across India and the world!

## Quick start

```bash
npm i
npm run dev
```

Open http://localhost:3000

## Environment variables

Copy `.env.example` to `.env.local` and fill:

- NEXT_PUBLIC_SITE_URL: Base URL
- NEXTAUTH_SECRET: `openssl rand -base64 32`
- SUPABASE_URL / SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY
- NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY
- RESEND_API_KEY (or SMTP_* for fallback)
- EMAIL_FROM, CONTACT_EMAIL
- SHEETS_WEBAPP_URL (Apps Script Web App URL)
- NEXT_PUBLIC_TIDIO_SNIPPET (optional)

## Google Sheets Web App

1. Create a Google Sheet named `SoniHolidays_Leads`
2. Extensions → Apps Script → paste `docs/SheetsWebApp.gs`
3. Deploy → New deployment → Type: Web app; Execute as: Me; Access: Anyone with the link
4. Copy the Web App URL to `SHEETS_WEBAPP_URL`

## Netlify

`netlify.toml` is configured with Next.js plugin. Set environment variables in Netlify dashboard and deploy.

## Tech

- Next.js App Router + TypeScript
- Tailwind CSS
- next-seo
- Supabase (Postgres)
- Resend / SMTP via Nodemailer

## Testing

Run Playwright smoke tests:

```bash
npm run playwright
```


Premium customised tours across India and the world!

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Netlify Functions (contact + trip builder + PDF)
- Google Sheets logging
- Resend email (SMTP fallback)
- MDX blog
- Playwright + Vitest tests

## Quick Start

1) Prereqs
- Node 18+
- Netlify CLI (optional for local): `npm i -g netlify-cli`

2) Install
```bash
npm install
```

3) Dev
```bash
npm run dev
```
App runs at `http://localhost:3000`.

## Environment
Copy `.env.example` to `.env` and fill values.

- Google Sheets service account: create a service account in Google Cloud, create a key (JSON), copy `client_email` and `private_key` to env. Share your spreadsheet with `GOOGLE_CLIENT_EMAIL` as Editor. Put the sheet ID in `GOOGLE_SHEETS_SPREADSHEET_ID`.
- Email via Resend: set `RESEND_API_KEY`. Or SMTP fallback: set `SMTP_*`.
- Analytics: set `PLAUSIBLE_DOMAIN`.
- Tidio: set `TIDIO_PUBLIC_KEY`.

## Content
Add or edit destination JSON files in `src/content/destinations/*.json`. Each file includes:
- slug, name, region (Domestic/International), duration, bestTime
- highlights[], inclusions[], exclusions[]
- dayByDay[] with day, title, details
- faqs[], gallery[]

Blog posts live in `src/content/blog/*.mdx`.

## Netlify Deploy

1) Push this repo to GitHub/GitLab.
2) Create new site on Netlify → Connect to repo.
3) Add environment variables from `.env.example`.
4) Build command: `npm run build`.
5) Publish directory: `.next`.
6) Plugins: `@netlify/plugin-nextjs` (already in `netlify.toml`).
7) Deploy. Forms will be handled by Netlify Functions at `/.netlify/functions/*`.

### One‑click with Netlify CLI
```bash
netlify deploy --build --prod
```

## Emails & PDFs
- `src/lib/email.ts` uses Resend by default, SMTP if configured, else writes HTML files to `public/tmp` in dev.
- `src/lib/pdf.ts` generates a branded itinerary PDF. If email is not configured, you can test it via `/.netlify/functions/sendItineraryPdf?slug=vietnam&name=Sonal`.

## Tests
- Unit: `npm test`
- E2E: `npm run playwright`

## Tidio
Update `TIDIO_PUBLIC_KEY` in `.env` or `src/app/(marketing)/layout.tsx` will fallback to `YOUR_TIDIO_KEY`.

## Branding
Replace `public/logo.png` with your logo. Colors are in `tailwind.config.cjs` under `theme.extend.colors.brand`.

## Adding Destinations
1. Duplicate a JSON file in `src/content/destinations/`.
2. Update fields; ensure unique `slug`.
3. Add images under `public/images/<slug>/` (optional). Remote Unsplash links also work.

## Lighthouse
Run locally:
```bash
npx lhci autorun
```

## License
All code © Soni Holidays. Content/images are placeholders; replace with your own or royalty‑free assets.