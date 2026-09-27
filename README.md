# Tim ProMebel

Single-page site for Tim ProMebel, a furniture workshop. React + Vite +
Tailwind CSS v4, deployable to Vercel. All visible copy is in Macedonian; code
and file names are in English.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
```

> Node.js is not installed on this machine, so dependencies were never
> installed and the dev server was never started here. Run `npm install` first.

## Design

The page is laid out as a **joiner's measured drawing sheet** — the document
this business actually produces before it builds anything.

- **Palette** (`@theme` in `src/index.css`): cream, paper, caramel, mocha,
  cinnamon, cocoa, ink, card. Cinnamon is reserved for one job — it only ever
  marks a measurement, never decoration.
- **Type**: Manrope, a geometric sans with full Cyrillic coverage, in one
  weight for body copy and 800 for headlines (`.headline`) — a deliberately
  plainer, more professional register than a display face. Tabular figures
  everywhere digits appear.
- **Logo**: `public/logo-mark.png` is the icon cropped from the supplied
  lockup (`Tim Pro mebel.png`), used at small sizes next to the wordmark set
  in Manrope rather than as a flattened image, so it stays sharp and legible.
  `logo-mark-light.png` is a flat caramel version for the dark footer, where
  the source gradient's darker browns read too close to `--color-ink` to
  stay legible — verified below AA contrast before swapping it in. The
  favicon and `apple-touch-icon.png` are generated from the same crop.
- **Drawing grammar**: 1px hairlines, square corners, no drop shadows, one
  continuous cream ground instead of alternating bands.
- **Dimension lines** (`.dim`) are the recurring structural device and carry
  real numbers — each gallery card is dimensioned with that piece's actual
  width in millimetres, from `width` in `src/data/gallery.js`.
- **Hero**: an elevation of a kitchen run (`ElevationDrawing.jsx`) that draws
  itself once on load, over panning millimetre paper (`.blueprint`) with a few
  sawdust motes drifting through it. The headline is set word by word.
- **Contact** is the sheet's title block — the bordered grid a drawing uses to
  state who made it and how to reach them.
- **Numbered callouts** appear only in the four-step process, which genuinely
  is a sequence, and use the circled-detail convention from drawings.

Navigation is anchor-based on one page — no router. The header underlines the
section currently under it and carries a cinnamon tape measure showing how far
down the sheet you have read.

## Motion

All of it is hand-written CSS — no animation library, no extra dependency.
The interaction patterns are the ones catalogued on [uiverse.io](https://uiverse.io)
(shine sweep, wipe fill, drawn border, animated conic edge, tilt-and-spotlight
cards, marquee, magnetic buttons), redrawn square-cornered and in the workshop
palette so they read as pressed ink rather than as glass widgets.

- **Scroll reveal** — `useScrollReveal` runs one IntersectionObserver for the
  whole page; anything with `data-reveal="up|left|right|fade|rule|wipe"` gets
  `.revealed` once and is then left alone. Stagger with `--d`. The styles are
  scoped to `html.js` (set in `main.jsx`), so nothing is hidden if the script
  never runs, and a MutationObserver picks up cards mounted by the filter.
- **Buttons** (`.btn-solid` / `.btn-line` / `.btn-bracket` / `.btn-conic`) —
  a gloss passing over the solid, ink flooding up the outline, drafting corner
  brackets that grow into a frame, and one animated conic edge, kept for the
  single submit button. `MagneticButton` leans the hero CTAs toward the cursor.
- **Cards** — `useTilt` hands the plate a small tilt, a lift and the pointer
  position; the plate leans, catches a light spot, grows registration ticks,
  and still flips to the description. The magnifier opens `Lightbox`
  (Escape, ← →, focus returned to the card).
- **Counters** — `useCountUp` runs once on scroll-in. Every figure in `Stats`
  is derived from `gallery.js` or from the process below it, so none of them
  is a claim that can go stale.
- **Reduced motion** — `prefers-reduced-motion: reduce` keeps every state and
  removes every movement: reveals resolve, tilt is off, the grid and the motes
  are not rendered at all.

## Sections

`App.jsx` in order: hero, `Stats` (four measured figures), `Process`,
`MaterialsMarquee` (the cut list, read off the gallery), `GalleryGrid`,
`About`, `Faq`, `ContactForm`, footer, `BackToTop`.

`Faq` answers only what the rest of the sheet already states — free measuring,
drawing before cutting, own fitting team, non-standard sizes, materials — so
there is nothing in it to verify separately.

## Gallery

`src/data/gallery.js` holds `{ id, category, image, title, width, material,
description }` per piece; `width` is printed under the card as a dimension
line, and `category` drives the filter chips (`categories`, same file).
Cards flip on hover (and while dragging the cursor across the grid), on tap for
touch, and on keyboard focus. The back face shows the same photo at 20% opacity
under a dark gradient with the Macedonian description on top. The magnifier in
the corner opens the piece full size.

Both `Stats` and `MaterialsMarquee` read from this file, so adding a piece
updates the counters and the cut list with it.

## Before going live

- [ ] Replace the draft millimetre widths in `src/data/gallery.js` with the
      real ones — they're eyeballed from the photos, not measured, and they're
      printed on the cards as dimensions.
- [ ] Check the size ranges in the "Што изработуваме" legend in `About.jsx`.
- [ ] More photos can go straight into `public/gallery/` — see the README
      there for the resize step and the entry shape.
- [ ] Fill in the real phone, email and address in `src/data/contact.js`
      (currently placeholders).
- [ ] Check the About copy — years active and specialties are drafted from the
      typical product range, not from confirmed company information.

## Deploy

Push the repo and import it on Vercel. Framework preset: **Vite**, build
command `npm run build`, output `dist`. No environment variables needed.
