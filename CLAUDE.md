# arlenye.com — Project Reference

## Purpose

Personal portfolio website for **Arlen Ye**, a watercolour painter. The site showcases his paintings, provides a short biography, and allows visitors to get in touch.

**Audience:** Art collectors, gallery curators, and anyone interested in watercolour painting.

**Tone:** Minimal, refined, and gallery-like — the art is the focus, the UI recedes.

---

## Pages

| Route | Purpose |
|---|---|
| `/` | Masonry gallery of all paintings (home) |
| `/about` | Short bio and artist photo |
| `/contact` | Contact form (sends email via Resend) |

---

## Content management

Paintings are managed through a two-step workflow:

1. Drop image files into `/public/paintings/`
2. Run `pnpm sync-paintings` — auto-generates `data/paintings.ts` from `data/paintings.yaml`

To edit a title or add a year, edit `data/paintings.yaml` and re-run the sync script. Never edit `data/paintings.ts` directly — it is auto-generated.

The `Painting` type lives in `data/paintings.ts`:
```ts
{ id: string; title: string; filename: string; year?: number }
```

---

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — no config file; all theming via CSS variables in `app/globals.css`
- **next-themes** — light/dark/system mode, persisted in localStorage, `.dark` class on `<html>`
- **shadcn/ui** (base-nova style) + **@base-ui/react** for unstyled primitives
- **yet-another-react-lightbox** — fullscreen image viewer
- **react-hook-form** — contact form validation
- **Resend** — email delivery for contact form (requires `RESEND_API_KEY` + `CONTACT_EMAIL` in `.env.local`)
- **lucide-react** — icons
- **pnpm** — package manager (enforced via `only-allow`)

---

## Design conventions

- Typeface: Geist (variable, set via `--font-sans`)
- Colours: OKLCH CSS variables; always use semantic tokens (`foreground`, `muted-foreground`, `border`, etc.) — never hardcode `gray-*` or `black`
- Spacing/type scale: `text-xs`, `tracking-widest`, `uppercase` for UI labels; larger scale only for editorial content
- Dark mode: all colour values must work in both modes via CSS variables

---

## Environment variables

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key for contact emails |
| `CONTACT_EMAIL` | Recipient address for contact form submissions |

---

## Commands

```bash
pnpm dev              # dev server at localhost:3000
pnpm build            # production build
pnpm sync-paintings   # sync /public/paintings/ → data/paintings.ts
```
