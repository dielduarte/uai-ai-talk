# Agent instructions

A slide deck for a talk at UAI AI. Vite + React 19 + TypeScript + Tailwind v4 + `motion`. No router, no backend.

## Commands

- `pnpm dev`: run locally
- `pnpm test`: vitest
- `pnpm typecheck` / `pnpm build`: must pass before you report work as done

## Layout

- `src/slides.ts`: slide data. Adding a talk point = adding an entry here.
- `src/deck.ts`: pure navigation logic (tested in `src/deck.test.ts`).
- `src/useDeck.ts`: keyboard/hash wiring for `deck.ts`.
- `src/App.tsx`: stage chrome (header, counter, progress bar) and the slide transition.
- `src/components/`: slide components. `TitleSlide` is the per-word slide-up + blur transition.
- `src/styles.css`: design tokens. Single source of truth for colors and fonts.

## UI reference: Maestrio

The deck follows the visual language of Maestrio (`../maestrio.ai`). When in doubt, read:

- `../maestrio.ai/apps/web/src/app/globals.css` and `apps/web/COMPONENTS.md`: landing page tokens (the ones mirrored here).
- `../maestrio.ai/apps/web/src/components/RotatingWord.tsx`: the text transition style this deck copies.
- `../maestrio.ai/apps/dashboard/src/app/globals.css` and `apps/dashboard/src/components/ui/`: product UI (cards, badges, buttons, shadows) if a slide needs to show product-like UI.

Rules:

- Dark only. Background `bg-level1` (#030303) with the `bg-stage-radial` green glow and the grain overlay.
- Brand green `text-brand` (#00ff73) is an accent: numbers, highlights, progress. Never for large blocks of body text.
- Fonts: `font-display` (Space Grotesk) for titles, `font-body` (DM Sans) for text, `font-mono` (DM Mono) for eyebrows, labels, counters, code.
- Use tokens from `src/styles.css`. Never inline hex in components. Add a token there first if needed, named like Maestrio's Figma tokens.
- Icons: `iconoir-react` only.
- Motion: use `motion/react`. Transitions are short (0.3s to 0.5s), slide-up + fade/blur. No bouncy springs.
- Hairline borders: `border-muted-border` or `border-brand-border-muted`. Cards: `bg-muted-bg`.

## Copy

- Slide copy is in Brazilian Portuguese. Code and docs are in English.
- No em dashes. No exclamation marks. Precise, low marketing-speak.
- Keep slides sparse: one idea per slide, the speaker does the talking.

## Code

- Comments only for the non-obvious WHY.
- Model slide data so invalid states can't be represented (e.g. a discriminated union on `kind` when new slide types are added).
- Test behavior of pure logic (`deck.ts` style). Don't snapshot animations.
