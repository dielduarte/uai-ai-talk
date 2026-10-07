# Agent instructions

A slide deck for a talk at UAI AI. Vite + React 19 + TypeScript + Tailwind v4 + `motion`. No router, no backend.

## Commands

- `pnpm dev`: run locally
- `pnpm test`: vitest
- `pnpm typecheck` / `pnpm build`: must pass before you report work as done

## Layout

- `src/topics.ts`: the talk agenda. List of topics, in order.
- `src/topics/<topic>/`: one folder per topic. `index.ts` exports the `Topic` (its slides, an optional "Quando usar?" body, and an optional `bridge` slide that hooks into the next topic); one component per slide body.
- `src/slides.ts`: slide model and `buildSlides` (intro, then per topic: section title, its slides, "Quando usar?" when `whenToUse` is set, bridge).
- `src/deck.ts`: pure navigation logic, including in-slide animation steps.
- `src/useDeck.ts`: keyboard/hash wiring for `deck.ts`.
- `src/App.tsx`: stage chrome (header, counter, progress bar) and the slide transition.
- `src/components/`: shared slide pieces (`TitleSlide`, `ContentSlide`, `AnimatedTitle`, `Typewriter`).
- `src/styles.css`: design tokens. Single source of truth for colors and fonts.

## Topic parts

A topic has either `slides` or `parts` (never both). Each part opens with a divider slide and its content slides show the part title in the eyebrow instead of the topic title. Use parts when a topic groups several subjects (topic 04: Smart routing, AI SDK, Chat SDK).

## Slide headers

A content slide with a `title` shows the topic eyebrow and the title. Without a title it shows only the eyebrow. `centered: true` (untitled slides only) hides the eyebrow and centers the body, for full-bleed diagrams and code.

## Animated slides

A slide with `steps: n` receives `step` (0 to n-1) in its `Body`. "Next" plays every step before moving to the next slide; "prev" from the next slide lands on the last step. Derive everything visual from `step` (`animate={{ ... step >= 2 ... }}`) so going backwards works too. Always give motion children explicit `initial`/`animate`, otherwise they inherit the slide's `enter/center/exit` variants.

## UI reference: Maestrio

The deck follows the visual language of Maestrio (`../maestrio.ai`). When in doubt, read:

- `../maestrio.ai/apps/web/src/app/globals.css` and `apps/web/COMPONENTS.md`: landing page tokens (the ones mirrored here).
- `../maestrio.ai/apps/web/src/components/RotatingWord.tsx`: the text transition style this deck copies.
- `../maestrio.ai/apps/dashboard/src/app/globals.css` and `apps/dashboard/src/components/ui/`: product UI (cards, badges, buttons, shadows) if a slide needs to show product-like UI.

Rules:

- Dark only. Background `bg-level1` (#030303) with the `bg-stage-radial` green glow and the grain overlay.
- Brand green `text-brand` (#00ff73) is an accent: numbers, highlights, progress. Never for large blocks of body text.
- Orange `text-sev-high` / `bg-sev-high-10` / `border-orange-border` means danger or blocked. Green means safe or passed.
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
