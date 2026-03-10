# Testing Patterns

**Analysis Date:** 2026-03-10

## Test Framework

**Runner:**
- Not configured
- No test framework installed (Jest, Vitest, etc. absent from `package.json`)

**Assertion Library:**
- Not applicable

**Run Commands:**
- No test commands in `package.json`
- Testing infrastructure not present in codebase

## Test Coverage

**Status:** No test coverage
- Zero test files found in codebase (no `*.test.ts`, `*.test.tsx`, `*.spec.ts`, `*.spec.tsx` files)
- `devDependencies` contains no testing frameworks
- ESLint configured but no test runner integration

## Testing Gaps

**Untested Components:**

1. **`components/Gallery.tsx`** (65 lines)
   - What's not tested: Lightbox open/close state, image rendering, click handlers
   - Impact: Gallery functionality relies entirely on user manual testing
   - Risk: Third-party lightbox library integration changes could break silently

2. **`components/Nav.tsx`** (67 lines)
   - What's not tested: Mobile menu toggle, active link highlighting, navigation state
   - Impact: Navigation state management and routing integration untested
   - Risk: Responsive breakpoint behavior and menu state could diverge from intended design

3. **`app/contact/ContactForm.tsx`** (131 lines)
   - What's not tested: Form submission flow, validation, error states, success states
   - Impact: Critical user interaction flow has no automated validation
   - Risk: Form library integration (`react-hook-form`) behavior could break silently

4. **`app/api/contact/route.ts`** (27 lines)
   - What's not tested: API endpoint request handling, response generation
   - Impact: API behavior undefined by tests
   - Risk: Changes to request parsing or response format could introduce bugs

## Manual Testing Approach

**Current State:**
The codebase relies entirely on manual/browser testing. Evidence:
- No automated test infrastructure
- Comments in `ContactForm.tsx` indicating status UI feedback is primary validation
- Comments in `route.ts` showing email service is toggled via code comments

**Implicit Test Cases (from code inspection):**

**ContactForm validation:**
```typescript
// Tests would verify:
// 1. Empty submission shows "Required" error on all fields
// 2. Valid submission transitions state: idle → sending → sent
// 3. Failed submission transitions state: idle → sending → error
// 4. form.reset() clears form after successful submission
const { errors } = useForm<FormData>();  // Requires testing
```

**Nav routing:**
```typescript
// Tests would verify:
// 1. Active link (pathname) gets border-b border-black
// 2. Inactive links show text-gray-500
// 3. Mobile menu toggles on button click
// 4. Mobile menu closes when link is clicked
const pathname = usePathname();  // Would require testing
```

**Gallery image rendering:**
```typescript
// Tests would verify:
// 1. Empty paintings array shows instruction message
// 2. Lightbox opens when painting clicked
// 3. Lightbox slides array constructed correctly from paintings
// 4. Image alt text populated from painting titles
const [index, setIndex] = useState(-1);  // Would require testing
```

## Recommended Testing Setup

**To add testing to this project:**

1. **Install test framework and libraries:**
   ```bash
   npm install --save-dev vitest @vitest/ui @testing-library/react @testing-library/dom
   ```

2. **Configure vitest.config.ts:**
   - Reference: Next.js + React testing guide
   - Setup: `@testing-library/react` for component testing

3. **Create test files co-located with components:**
   ```
   components/Gallery.tsx
   components/Gallery.test.tsx

   app/contact/ContactForm.tsx
   app/contact/ContactForm.test.tsx

   app/api/contact/route.ts
   app/api/contact/route.test.ts
   ```

4. **Add test scripts to package.json:**
   ```json
   "test": "vitest",
   "test:ui": "vitest --ui",
   "test:coverage": "vitest --coverage"
   ```

## Priority Testing Areas

**High Priority (affects user experience):**
- `ContactForm.tsx`: Form submission, validation, success/error states
- `Gallery.tsx`: Image rendering, lightbox interaction

**Medium Priority (affects navigation):**
- `Nav.tsx`: Link active states, mobile menu behavior
- Route handlers: API responses and request handling

**Test Coverage Target:** Aim for 80%+ coverage of user-facing components once testing infrastructure is added.

---

*Testing analysis: 2026-03-10*
