# Architecture

**Analysis Date:** 2026-03-10

## Pattern Overview

**Overall:** Next.js App Router with component-based UI, server-side pages, and API routes.

**Key Characteristics:**
- File-based routing using Next.js 16 App Router pattern
- Hybrid rendering: Server Components for pages, Client Components for interactive UI
- Static gallery data managed through JSON metadata and TypeScript
- API route for form submission
- Tailwind CSS for styling with minimal custom CSS

## Layers

**Presentation Layer:**
- Purpose: Render UI and handle user interactions
- Location: `app/` (pages), `components/`
- Contains: Page components (`.tsx` files), interactive Client Components
- Depends on: React hooks, Next.js components (`Link`, `Image`), data models
- Used by: Browser rendering engine

**Data/State Layer:**
- Purpose: Manage application state and provide data to components
- Location: `data/paintings.ts`, component state via `useState` and `react-hook-form`
- Contains: Painting metadata, form data structures, state management
- Depends on: JSON files, component hooks
- Used by: Page components and Client Components

**API Layer:**
- Purpose: Handle backend operations and external service integration
- Location: `app/api/contact/route.ts`
- Contains: Form submission endpoint, email service integration (Resend)
- Depends on: Next.js Request/Response, environment variables, Resend SDK
- Used by: Frontend `fetch()` calls from `ContactForm` component

**Configuration Layer:**
- Purpose: Define build, TypeScript, and route behavior
- Location: `next.config.ts`, `tsconfig.json`, `app/layout.tsx`
- Contains: Next.js configuration, TypeScript compiler options, global layout structure
- Depends on: Environment files
- Used by: Build process and runtime

## Data Flow

**Home Page Gallery Flow:**

1. User visits `/`
2. `app/page.tsx` imports `Gallery` component and `paintings` data
3. `Gallery.tsx` renders image grid from paintings array
4. Images stored in `/public/paintings/` are referenced by filename
5. Lightbox library opens on image click for full view

**Contact Form Flow:**

1. User navigates to `/contact`
2. `app/contact/page.tsx` renders `ContactForm` component
3. `ContactForm` (Client Component) handles form submission:
   - Collects user input (firstName, lastName, email, subject, message)
   - On submit, sends POST to `/api/contact` endpoint
4. `app/api/contact/route.ts` receives request, validates data, logs/sends email
5. Response returns success/error status to frontend
6. Frontend displays confirmation message or error

**Painting Metadata Sync Flow:**

1. Developer adds images to `/public/paintings/`
2. `npm run sync-paintings` executes `scripts/sync-paintings.mjs`
3. Script scans directory, generates/updates `data/paintings-meta.json`
4. Script generates `data/paintings.ts` from metadata and image filenames
5. TypeScript imports from generated file for type safety

**State Management:**

- Component-level: `useState` for UI state (menu open/closed, form status, lightbox index)
- Form state: `react-hook-form` manages form inputs and validation
- Data state: Immutable painting array passed as props
- No global state management (Redux, Context) — props-based data flow

## Key Abstractions

**Painting:**
- Purpose: Represents a single artwork with metadata
- Examples: `data/paintings.ts`, used in `Gallery.tsx`, `app/page.tsx`
- Pattern: TypeScript interface + static array, auto-generated from metadata

**Page Components:**
- Purpose: Route handlers that render full page layouts
- Examples: `app/page.tsx`, `app/contact/page.tsx`, `app/about/page.tsx`
- Pattern: Default export function returning JSX, mounted under App Router

**Client Components:**
- Purpose: Interactive UI that requires browser APIs (state, event handlers)
- Examples: `ContactForm.tsx`, `Gallery.tsx`, `Nav.tsx`
- Pattern: "use client" directive, React hooks for state/side effects

**Form Data:**
- Purpose: Validates contact form input structure
- Examples: `FormData` interface in `ContactForm.tsx`
- Pattern: TypeScript interface with required fields, enforced by `react-hook-form`

## Entry Points

**Web Entry Point (Home):**
- Location: `app/page.tsx`
- Triggers: User navigates to `/` or server starts
- Responsibilities: Import gallery data, render Gallery component, define home page layout

**Root Layout:**
- Location: `app/layout.tsx`
- Triggers: All page renders (applies to every route)
- Responsibilities: Wrap all pages with Nav/Footer, set global metadata, import global CSS

**API Entry Point (Contact):**
- Location: `app/api/contact/route.ts`
- Triggers: POST request to `/api/contact`
- Responsibilities: Parse request body, validate form data, send/log email, return response

**Navigation Component:**
- Location: `components/Nav.tsx`
- Triggers: Rendered by root layout on all pages
- Responsibilities: Display site navigation, highlight current route, handle mobile menu state

## Error Handling

**Strategy:** Try-catch at API boundary, console logging in development, user-facing messages in UI.

**Patterns:**
- API route wraps submission in try-catch, returns `NextResponse.json({ ok: true/false })`
- ContactForm catches fetch errors and displays error message to user
- Gallery component checks if paintings array is empty, shows placeholder with instructions
- Form validation errors caught by `react-hook-form`, displayed inline under inputs

## Cross-Cutting Concerns

**Logging:** Console-based only (development), no structured logging library. Contact form submissions logged to console in `app/api/contact/route.ts`.

**Validation:**
- Frontend: `react-hook-form` with required field validation
- API: No schema validation library (Zod/Yup not used), relies on TypeScript types

**Authentication:** None implemented. Site is public. Contact form lacks CSRF protection (not critical for unprotected endpoint).

**Styling:** Tailwind CSS for all styling. Global CSS imported in `app/layout.tsx`. No CSS modules. Inline Tailwind classes throughout components.

**Image Handling:** Next.js `Image` component for optimization. Static images from `/public/paintings/`. Lightbox library for modal view.

---

*Architecture analysis: 2026-03-10*
