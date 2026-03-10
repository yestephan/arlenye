# Codebase Structure

**Analysis Date:** 2026-03-10

## Directory Layout

```
arlenye/
├── app/                        # Next.js App Router root
│   ├── layout.tsx              # Root layout (wraps all pages)
│   ├── page.tsx                # Home page (/)
│   ├── globals.css             # Global styles
│   ├── contact/
│   │   ├── page.tsx            # Contact page (/contact)
│   │   └── ContactForm.tsx      # Client component for form
│   ├── about/
│   │   └── page.tsx            # About page (/about)
│   └── api/
│       └── contact/
│           └── route.ts        # POST /api/contact endpoint
├── components/                 # Reusable React components
│   ├── Gallery.tsx             # Photo gallery grid + lightbox
│   ├── Nav.tsx                 # Navigation header (desktop/mobile)
│   └── Footer.tsx              # Site footer
├── data/                       # Static data and metadata
│   ├── paintings.ts            # AUTO-GENERATED painting array
│   └── paintings-meta.json     # Source of truth for painting metadata
├── public/                     # Static assets
│   ├── paintings/              # Painting images
│   ├── next.svg, vercel.svg    # Next.js/Vercel logos
│   └── *.svg                   # Other icons
├── scripts/                    # Build and utility scripts
│   └── sync-paintings.mjs      # Scans /public/paintings/, syncs data/paintings.ts
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript compiler configuration
├── next.config.ts              # Next.js build configuration
├── eslint.config.mjs           # ESLint rules
├── postcss.config.mjs          # PostCSS/Tailwind configuration
└── README.md                   # Project documentation
```

## Directory Purposes

**app/:**
- Purpose: Next.js App Router - defines routes, pages, and API endpoints
- Contains: Page components (`.tsx` files), API route handlers, global layout, global styles
- Key files: `layout.tsx` (root layout), `page.tsx` (home), route files for each page/API endpoint

**components/:**
- Purpose: Shared, reusable React components used across multiple pages
- Contains: Presentational and interactive Client Components
- Key files: `Gallery.tsx` (photo grid), `Nav.tsx` (navigation), `Footer.tsx` (footer)

**data/:**
- Purpose: Static application data and metadata
- Contains: Painting metadata (JSON), TypeScript data exports
- Key files: `paintings-meta.json` (editable source), `paintings.ts` (auto-generated)

**public/:**
- Purpose: Static assets served directly by Next.js
- Contains: Images, SVGs, and other assets referenced in code
- Key files: `paintings/` subdirectory holds painting image files

**scripts/:**
- Purpose: Utility and build scripts run from npm commands
- Contains: Node.js scripts for automation
- Key files: `sync-paintings.mjs` (generate painting data from image files)

## Key File Locations

**Entry Points:**
- `app/layout.tsx`: Root layout applied to all pages, imports global CSS, renders Nav and Footer
- `app/page.tsx`: Home page, imports Gallery component and painting data
- `app/api/contact/route.ts`: API endpoint for contact form submission

**Configuration:**
- `tsconfig.json`: TypeScript compiler options, path aliases (`@/*` → root)
- `next.config.ts`: Next.js build and server configuration
- `eslint.config.mjs`: ESLint rules for code quality
- `postcss.config.mjs`: PostCSS/Tailwind CSS pipeline
- `package.json`: Dependencies, dev dependencies, npm scripts

**Core Logic:**
- `app/contact/ContactForm.tsx`: Client component with form state, validation, API submission
- `components/Gallery.tsx`: Photo grid layout, lightbox modal state management
- `app/api/contact/route.ts`: Form data handling, email service integration (commented out)
- `scripts/sync-paintings.mjs`: File scanning, metadata generation, TypeScript output

**Styling:**
- `app/globals.css`: Global CSS imports (Tailwind), CSS variables
- Components: Tailwind utility classes inline in JSX

**Data:**
- `data/paintings.ts`: TypeScript export of painting array (auto-generated)
- `data/paintings-meta.json`: JSON source for painting metadata (hand-edited)
- `public/paintings/`: Image files referenced in paintings array

## Naming Conventions

**Files:**
- Page components: `page.tsx` (matches Next.js App Router pattern)
- Client components: PascalCase (e.g., `ContactForm.tsx`, `Gallery.tsx`)
- API routes: `route.ts` in `app/api/[feature]/` directories
- Data exports: Lowercase with hyphens (e.g., `paintings.ts`, `paintings-meta.json`)
- Scripts: `.mjs` extension for ES modules

**Directories:**
- Feature routes: Lowercase kebab-case (e.g., `contact/`, `about/`)
- API routes: `api/[feature]/` structure (e.g., `api/contact/`)
- Components: Plural lowercase (e.g., `components/`)
- Data: Plural lowercase (e.g., `data/`)

**Functions:**
- Components: PascalCase (e.g., `ContactForm`, `Gallery`, `Nav`)
- Hooks/helpers: camelCase (e.g., `handleSubmit`, `onSubmit`)
- Imports: Use path alias `@/` for root imports (defined in `tsconfig.json`)

**Types:**
- Interfaces: PascalCase (e.g., `FormData`, `Painting`, `GalleryProps`)
- Exported types: Mirror module name or represent main export

## Where to Add New Code

**New Page (e.g., /portfolio):**
- Create: `app/portfolio/page.tsx`
- Structure: Default export component with page content
- Layout: Automatically wrapped by `app/layout.tsx`
- Example pattern: Copy structure from `app/about/page.tsx`

**New Client Component:**
- Create: `components/YourComponent.tsx`
- Start with: `"use client"` directive if using hooks
- Export: Default export of component function
- Usage: Import in pages or other components with `@/components/YourComponent`

**New API Endpoint (e.g., POST /api/subscribe):**
- Create: `app/api/subscribe/route.ts`
- Export: Named function `export async function POST(request: Request)`
- Return: `NextResponse.json({ ... })` or error response
- Pattern: Mirror `app/api/contact/route.ts` structure

**New Painting:**
- Add image: Place `.jpg/.png/.webp` in `public/paintings/`
- Run: `npm run sync-paintings`
- Edits: Modify titles in `data/paintings-meta.json`, re-run sync

**Utilities/Helpers:**
- Create: New file in `components/` or root-level `lib/utils.ts` (if pattern emerges)
- Export: Named exports for reusable functions
- Import: Use `@/` path alias

**Global Styles:**
- Add: `app/globals.css` (Tailwind directives)
- Component styles: Use Tailwind utility classes in JSX (no CSS modules in current setup)

## Special Directories

**node_modules/:**
- Purpose: Installed npm packages
- Generated: Yes (created by `npm install`)
- Committed: No (excluded by `.gitignore`)

**.next/:**
- Purpose: Next.js build output and development server cache
- Generated: Yes (created by `next dev` or `next build`)
- Committed: No (excluded by `.gitignore`)

**public/paintings/:**
- Purpose: Storage for painting image files
- Generated: No (user-added images)
- Committed: Yes (images are part of gallery content)

**.env.local:**
- Purpose: Local environment variables (Resend API key, contact email, etc.)
- Generated: No (user creates)
- Committed: No (excluded by `.gitignore`)

---

*Structure analysis: 2026-03-10*
