# Coding Conventions

**Analysis Date:** 2026-03-10

## Naming Patterns

**Files:**
- Page components: lowercase with `.tsx` extension (`page.tsx`)
- Route handlers: `route.ts` in `app/api/[route]/` structure
- Component files: PascalCase (e.g., `ContactForm.tsx`, `Gallery.tsx`, `Nav.tsx`)
- Data/utilities: lowercase with `.ts` extension (e.g., `paintings.ts`)

**Functions:**
- Component functions: PascalCase (e.g., `ContactForm()`, `Gallery()`, `RootLayout()`)
- Event handlers: camelCase prefixed with `on` (e.g., `onSubmit()`)
- Regular functions: camelCase (e.g., `setMenuOpen()`, `setIndex()`)

**Variables:**
- State variables: camelCase (e.g., `status`, `menuOpen`, `index`)
- Constants (data): lowercase (e.g., `links` array in `Nav.tsx`)
- CSS class strings: camelCase (e.g., `inputClass`)

**Types:**
- Interfaces: PascalCase (e.g., `FormData`, `GalleryProps`, `Painting`)
- Union types for state: lowercase with pipes (e.g., `"idle" | "sending" | "sent" | "error"`)
- Imported types use `type` keyword explicitly (e.g., `import type { Metadata } from "next"`)

## Code Style

**Formatting:**
- No explicit formatter configured in codebase (Prettier not in dependencies)
- Consistent 2-space indentation observed across files
- Semicolons present at statement endings

**Linting:**
- ESLint configured via `eslint.config.mjs` with Next.js presets
- Uses `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Run linting with: `npm run lint`
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

## Import Organization

**Order:**
1. Third-party imports (Next.js, React, external libraries)
2. Type imports using `import type` keyword
3. Relative imports from project (using path aliases or relative paths)
4. CSS/styling imports

**Examples from codebase:**
```typescript
// app/layout.tsx
import type { Metadata } from "next";  // type import first
import "./globals.css";                 // CSS import
import Nav from "@/components/Nav";     // relative alias imports
import Footer from "@/components/Footer";
```

```typescript
// app/contact/ContactForm.tsx
import { useForm } from "react-hook-form";  // third-party
import { useState } from "react";            // React hooks
import type { Painting } from "@/data/paintings";  // type import
```

**Path Aliases:**
- `@/*` resolves to project root (configured in `tsconfig.json`)
- Used for imports: `@/components/...`, `@/data/...`

## Error Handling

**Patterns:**
- Try-catch blocks for async operations (`fetch` calls)
- Silent error handling with status state updates (e.g., `setStatus("error")`)
- No logging of caught exceptions to user (silent fail with UI feedback)
- Router-level responses use `NextResponse.json()` with explicit status

**Example from `app/contact/ContactForm.tsx`:**
```typescript
async function onSubmit(data: FormData) {
  setStatus("sending");
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setStatus("sent");
      reset();
    } else {
      setStatus("error");
    }
  } catch {
    setStatus("error");
  }
}
```

## Logging

**Framework:** `console` object (browser/Node.js native)

**Patterns:**
- API route logging with `console.log()` for development (see `app/api/contact/route.ts`)
- Commented documentation instead of runtime logging for configuration options
- Console used for non-critical information (contact form submissions)

**Example from `app/api/contact/route.ts`:**
```typescript
console.log("Contact form submission:", { firstName, lastName, email, subject, message });
```

## Comments

**When to Comment:**
- Inline explanations for multi-step logic (see form validation in `ContactForm.tsx`)
- Instructions for developers on configuration steps (see API route comments about Resend setup)
- Instructional comments in JSX for placeholders (see `about/page.tsx` with uncomment instructions)

**JSDoc/TSDoc:**
- Not used in this codebase
- Types are expressed through TypeScript interfaces instead

## Function Design

**Size:** Functions are kept small and focused (6-131 lines including JSX)
- Smallest: `Footer()` at 12 lines
- Largest: `ContactForm()` at 131 lines (includes form JSX)

**Parameters:**
- Destructured props with TypeScript interfaces (e.g., `{ children }: { children: React.ReactNode }`)
- Functional components accept single props object with type annotation
- API routes receive `request: Request` parameter

**Return Values:**
- React components return JSX elements
- Page components export default function with JSX return
- API routes return `NextResponse` object
- Form handlers are async and return nothing (side effects via state)

## Module Design

**Exports:**
- All components exported as `export default function ComponentName() { ... }`
- Data exports: `export default [array]` for default imports (e.g., `paintings.ts`)
- Type exports: `export interface TypeName { ... }`
- API routes export async functions: `export async function METHOD(...) { ... }`

**Barrel Files:**
- Not used in this project
- Each component is its own file in `/components` directory

## State Management

**Pattern:** React hooks (`useState`) for local component state
- Form state: managed via `react-hook-form` library
- Component state: UI state like `menuOpen`, `index`, `status`
- No global state management library (Context API not observed)

**Example from `Nav.tsx`:**
```typescript
const [menuOpen, setMenuOpen] = useState(false);
```

## Styling

**Approach:** Tailwind CSS utility classes inline in JSX
- No CSS-in-JS or separate CSS files (except global `globals.css`)
- Classes defined as strings and reused via variables (see `inputClass` in `ContactForm.tsx`)
- Responsive design via Tailwind breakpoints (e.g., `sm:`, `lg:`)

---

*Convention analysis: 2026-03-10*
