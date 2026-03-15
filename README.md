# Arlen Ye — Watercolour Portfolio

Personal portfolio website for Arlen Ye, a watercolour painter based in Hong Kong.

## About

Arlen Ye was born in Shanghai and studied architecture in both China and Sweden. After retiring from his teaching post at the Faculty of Architecture at the University of Hong Kong, he turned his focus to watercolour painting — exploring urban scenes, natural landscapes, and Sweden's west coast archipelago.

## Stack

- [Next.js](https://nextjs.org) (App Router)
- [Tailwind CSS](https://tailwindcss.com)
- [yet-another-react-lightbox](https://yet-another-react-lightbox.com)
- [Resend](https://resend.com) for email

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Adding paintings

**1. Copy the image** into `public/paintings/` with a clean slug filename:

```
public/paintings/lisbon-street.jpg
```

**2. Run sync** to register it in `data/paintings.ts`:

```bash
pnpm sync-paintings
```

This picks up any new files and appends stubs to `data/paintings.yaml`.

**3. Fill in metadata** using the interactive editor:

```bash
pnpm edit-paintings
```

Walks through each painting with missing fields. Press Enter to keep the current value, type a new value to update, or `-` to clear. Progress is saved after each painting.

Pass `--all` to re-edit paintings that are already complete:

```bash
pnpm edit-paintings --all
```

**4. Sync again** to regenerate `data/paintings.ts` with the updated metadata:

```bash
pnpm sync-paintings
```

## Metadata fields

Edit `data/paintings.yaml` directly or use `pnpm edit-paintings`:

| Field | Required | Example |
|---|---|---|
| `filename` | Yes | `lisbon-street.jpg` |
| `title` | Yes | `Lisbon Street` |
| `year` | No | `2019` |
| `series` | No | `Portugal` — groups paintings in the gallery filter |
| `dimensions` | No | `30 × 40 cm` |
| `medium` | No | `Watercolour on paper` |

`series` is used to populate the filter tabs in the gallery. Any paintings sharing the same series name are grouped together.
