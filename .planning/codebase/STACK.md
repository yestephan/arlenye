# Technology Stack

**Analysis Date:** 2026-03-10

## Languages

**Primary:**
- TypeScript 5.x - All app source code, configuration files, and API routes
- JavaScript (ES2017) - Build and script utilities via Node.js

**Secondary:**
- JSX/TSX - React component syntax in `app/` and `components/` directories

## Runtime

**Environment:**
- Node.js v24.11.1 (verified in project)
- Browser runtime (React 19 for client-side rendering)

**Package Manager:**
- npm 11.6.2
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Next.js 16.1.6 - Full-stack React framework, server and client rendering
  - Location: Entry points at `app/page.tsx`, `app/layout.tsx`, `app/contact/page.tsx`
  - Config: `next.config.ts` (minimal, no custom options set)

**Styling:**
- Tailwind CSS 4.x - Utility-first CSS framework
  - Config: `tailwind.config.ts` (auto-generated, references PostCSS plugin)
  - PostCSS: `postcss.config.mjs` with `@tailwindcss/postcss` plugin

**UI Component Libraries:**
- React 19.2.3 - Core UI library
- react-dom 19.2.3 - DOM rendering for React

**Form Handling:**
- react-hook-form 7.71.2 - Lightweight form state management
  - Usage: `app/contact/ContactForm.tsx` - Client-side form validation and submission

**Image/Media:**
- yet-another-react-lightbox 3.29.1 - Lightbox component for gallery
  - Usage: `components/Gallery.tsx` - Image modal viewing

## Key Dependencies

**Critical:**
- Next.js 16.1.6 - Application framework, essential for routing and SSR
- React 19.2.3 - UI rendering engine
- react-hook-form 7.71.2 - Contact form validation and state management

**Infrastructure:**
- resend 6.9.3 - Email sending SDK (optional, currently disabled in code)
  - Location: `app/api/contact/route.ts` - Email API client library
  - Requires: RESEND_API_KEY environment variable to enable

**Development:**
- @types/node 20.x - Node.js type definitions
- @types/react 19.x - React type definitions
- @types/react-dom 19.x - React DOM type definitions
- TypeScript 5.x - Static type checking
- ESLint 9.x - Code linting with Next.js configuration
  - Config: `eslint.config.mjs` - Uses `eslint-config-next` with core-web-vitals and TypeScript presets
- @tailwindcss/postcss 4.x - Tailwind CSS PostCSS plugin

## Configuration

**TypeScript:**
- Config: `tsconfig.json`
- Target: ES2017
- Module resolution: bundler
- JSX: react-jsx
- Path alias: `@/*` maps to project root for imports
- Strict mode enabled

**Environment:**
- `.env.local` file present (contains configuration, never committed)
- Used env variables:
  - `RESEND_API_KEY` - Email service API key (contact form feature)
  - `CONTACT_EMAIL` - Recipient email for contact submissions
- Configuration is optional; contact form works without these vars (logs to console instead)

**Build:**
- Next.js build output: `.next/` directory (generated, not committed)
- Next.js dev server: `npm run dev`
- Production build: `npm run build` then `npm run start`

**Linting:**
- ESLint: `npm run lint` - Lints TypeScript and Next.js rules
- Config: `eslint.config.mjs` - Flat config format, ignores `.next/`, `out/`, `build/`

## Platform Requirements

**Development:**
- Node.js v24+ (verified working)
- npm 11.6+
- TypeScript 5.x knowledge for development
- Modern browser (Next.js works with current browsers)

**Production:**
- Node.js runtime (for Next.js server)
- Environment variables: `RESEND_API_KEY` (optional), `CONTACT_EMAIL` (optional)
- Static hosting possible: Can export as static site with `next export`
- Typical deployment: Vercel, AWS, Heroku, or any Node.js-capable platform

---

*Stack analysis: 2026-03-10*
