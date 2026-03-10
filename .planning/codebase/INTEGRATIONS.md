# External Integrations

**Analysis Date:** 2026-03-10

## APIs & External Services

**Email Delivery:**
- Resend - Email sending service for contact form
  - SDK/Client: `resend` package (v6.9.3)
  - Status: **Optional/Disabled** - Code is commented out in `app/api/contact/route.ts`
  - Auth: Environment variable `RESEND_API_KEY`
  - Integration point: `app/api/contact/route.ts` - POST endpoint that sends contact form emails
  - Activation: Uncomment lines 11-21 in `app/api/contact/route.ts`, provide env vars

## Data Storage

**Databases:**
- None - Application uses static data only

**File Storage:**
- Local filesystem only
  - Paintings directory: `/public/paintings/` - Image files stored locally
  - Metadata: `data/paintings-meta.json` - Editable source for painting metadata
  - Generated data: `data/paintings.ts` - Auto-generated TypeScript file synced from metadata
  - No cloud storage or CDN integration

**Caching:**
- None - No explicit caching layer (Next.js default caching used)

## Authentication & Identity

**Auth Provider:**
- None - Application has no user authentication or login system
- Contact form uses no authentication (accepts anonymous submissions)

## Monitoring & Observability

**Error Tracking:**
- None - No error tracking service integrated

**Logs:**
- Console logging only - Contact form submissions logged to stdout
  - Location: `app/api/contact/route.ts` line 24 - `console.log()`

## CI/CD & Deployment

**Hosting:**
- Platform agnostic - Can run on any Node.js host
- Likely deployment target: Vercel (Next.js native platform)
- Alternative platforms: AWS Amplify, Netlify, Heroku, custom VPS

**CI Pipeline:**
- None - No CI/CD configuration present
- No GitHub Actions, GitLab CI, or similar automation

## Environment Configuration

**Required env vars (optional):**
- `RESEND_API_KEY` - API key from resend.com for email sending
- `CONTACT_EMAIL` - Recipient email address for contact form submissions

**Optional env vars:**
- None declared as required; application functions without these

**Secrets location:**
- `.env.local` - Local development only (in .gitignore, never committed)
- Production: Environment variables set via hosting platform (Vercel, AWS, etc.)

## Webhooks & Callbacks

**Incoming:**
- `POST /api/contact` - Contact form submission endpoint
  - Location: `app/api/contact/route.ts`
  - Payload: JSON with `{ firstName, lastName, email, subject, message }`
  - Response: `{ ok: true }` on success
  - Currently: Logs to console (email sending disabled)

**Outgoing:**
- None - Application does not make callbacks to external systems

## API Routes

**Contact Submission:**
- Route: `app/api/contact/` (Next.js API route)
- Method: POST
- Handler: `app/api/contact/route.ts`
- Current behavior: Logs submission to console
- Future behavior: Can send email via Resend API

## Internal Data Management

**Painting Catalog:**
- Source files: `public/paintings/` (image files)
- Metadata file: `data/paintings-meta.json` (manual edits preserved)
- Generated file: `data/paintings.ts` (auto-generated, do not edit)
- Sync process: `npm run sync-paintings` - Node.js script at `scripts/sync-paintings.mjs`
  - Detects new/removed images
  - Generates TypeScript types and exports
  - Preserves manual edits to titles and years

---

*Integration audit: 2026-03-10*
