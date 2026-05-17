# AGENTS.md — PaletteForge

## Project identity

PaletteForge is a local-only color palette generator built with Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Prisma, and SQLite.

It is a personal single-user tool with no authentication and no cloud sync.

## Core v1 goal

Build a polished professional design-tool-style app that can:

- Generate 5-color palettes.
- Use formal harmony modes:
  - complementary
  - monochromatic
  - shades/tints
- Lock swatches and regenerate unlocked colors around locked anchors.
- Manually edit a selected swatch color.
- Adjust palette temperature, saturation, lightness, and contrast.
- Save palettes.
- Track palette history.
- Organize saved palettes into simple named collections.
- Check WCAG contrast ratios between swatches.
- Show text-on-background previews.
- Export palettes as:
  - PNG
  - HEX list
  - RGB list
  - HSL list

## Explicit v1 exclusions

Do not implement these unless directly requested:

- User accounts
- Cloud sync
- Hosted deployment
- Image upload
- Photo palette extraction
- Image thumbnails
- Color blindness simulation
- Drag-and-drop
- Variable swatch count
- Project-specific collection settings
- CSS variable export
- JSON export
- Tailwind config export
- SCSS export
- ASE export
- SVG export

## Tech stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma
- SQLite
- npm
- Vitest
- React Testing Library
- Playwright

## Development environment

Support both:

- Normal local Node.js development
- Optional Docker-based local development

Use npm as the package manager.

## Architecture rules

Keep color logic pure and framework-agnostic.

Do not put color conversion, harmony generation, contrast math, export formatting, or palette adjustment logic inside React components.

Place pure color logic in:

- `src/lib/color/conversions.ts`
- `src/lib/color/harmony.ts`
- `src/lib/color/generate-palette.ts`
- `src/lib/color/adjust-palette.ts`
- `src/lib/color/contrast.ts`
- `src/lib/color/accessibility.ts`
- `src/lib/color/export-formatters.ts`
- `src/lib/color/png-export.ts`

Place database logic in:

- `src/lib/db/palettes.ts`
- `src/lib/db/history.ts`
- `src/lib/db/collections.ts`
- `src/lib/db/exports.ts`
- `src/lib/db/settings.ts`

Place Prisma client setup in:

- `src/lib/prisma.ts`

Shared types should live in:

- `src/types`
- or colocated domain type files where appropriate

## Recommended repository structure

```txt
paletteforge/
  AGENTS.md
  README.md
  package.json
  next.config.ts
  tsconfig.json
  eslint.config.mjs
  postcss.config.mjs
  tailwind.config.ts
  components.json
  docker-compose.yml
  Dockerfile
  .env.example

  prisma/
    schema.prisma
    migrations/
    seed.ts

  src/
    app/
      layout.tsx
      page.tsx
      globals.css
      api/
        palettes/
          route.ts
        palettes/[id]/
          route.ts
        history/
          route.ts
        collections/
          route.ts
        exports/
          route.ts

    components/
      app-shell/
      palette/
      generation/
      adjustments/
      accessibility/
      export/
      library/
      ui/

    lib/
      prisma.ts
      constants.ts
      color/
      db/
      keyboard/
      utils/

    hooks/
    store/
    types/

  tests/
    unit/
    component/
    e2e/
```

## UI rules

Use a central palette canvas with side panels.

The main UI should include:

- Top toolbar
- Central 5-swatch palette canvas
- Generation panel
- Adjustment panel
- Accessibility panel
- Export panel
- History panel
- Saved palettes panel
- Collections panel

Use shadcn/ui components where appropriate.

Support light and dark mode in v1.

The visual style should feel like a professional design tool:

- clean
- focused
- polished
- keyboard-friendly
- accessible
- not playful or toy-like

## Suggested UI components

Use or create components similar to:

- `AppShell`
- `TopToolbar`
- `SidePanel`
- `StatusBar`
- `PaletteCanvas`
- `SwatchCard`
- `SwatchLockButton`
- `SwatchInspector`
- `GenerationPanel`
- `HarmonySelector`
- `SeedColorPicker`
- `AdjustmentPanel`
- `AccessibilityPanel`
- `ContrastMatrix`
- `TextPreviewCard`
- `ExportPanel`
- `HistoryPanel`
- `SavedPalettesPanel`
- `CollectionsPanel`

## Data rules

Use SQLite through Prisma.

No authentication.

Assume a single local user.

Save:

- palettes
- generated history
- saved palettes
- favorites
- simple collections
- palette names
- notes
- tags
- accessibility result snapshots when useful
- export records when useful

## Suggested Prisma models

The exact schema may evolve, but the data model should support:

- `Palette`
- `PaletteHistory`
- `Collection`
- `AccessibilityResult`
- `ExportRecord`
- `UserSetting`

Palettes should store color data as JSON-compatible strings if needed for SQLite simplicity.

## Palette rules

V1 palettes always contain exactly 5 swatches.

Each swatch should include:

- stable id
- HEX
- RGB
- HSL
- locked boolean

Locked swatches are strict anchors and must not change during regeneration.

Unlocked swatches may be regenerated or adjusted to improve harmony.

## Required swatch shape

```ts
export type Swatch = {
  id: string;
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
  };
  hsl: {
    h: number;
    s: number;
    l: number;
  };
  locked: boolean;
};
```

## Harmony rules

V1 supports only:

- complementary
- monochromatic
- shades/tints

Do not add additional harmony modes unless directly requested.

### Complementary

For a seed hue `h`:

- Include the seed hue.
- Include the complementary hue `(h + 180) % 360`.
- Fill remaining colors with controlled lightness and saturation variation.
- Avoid five colors with identical perceived brightness.

### Monochromatic

For a seed hue `h`:

- Keep hue mostly fixed.
- Vary saturation and lightness.
- Produce usable contrast across the 5 swatches.

### Shades/tints

For a seed hue `h`:

- Generate darker shades and lighter tints from the base color.
- Keep the output visually ordered where possible.
- Avoid pure white and pure black unless explicitly useful.

## Locked color behavior

When colors are locked:

1. Locked swatches are strict anchors.
2. Locked colors must not change.
3. Unlocked colors may be regenerated.
4. Unlocked colors should harmonize with the locked colors.
5. If multiple locked colors exist:
   - Prefer the selected swatch as primary anchor if available.
   - Otherwise use the first locked swatch.
   - Use additional locked swatches as constraints when filling remaining positions.

## Adjustment rules

V1 includes adjustment sliders for:

- temperature
- saturation
- brightness/lightness
- contrast

Use normalized slider values:

```ts
type AdjustmentValues = {
  temperature: number; // -100 to 100
  saturation: number;  // -100 to 100
  lightness: number;   // -100 to 100
  contrast: number;    // -100 to 100
};
```

Adjustment behavior:

- Apply adjustments to unlocked swatches by default.
- Locked swatches should remain unchanged unless the user explicitly edits them.
- Preview adjustments immediately.
- Persist adjusted colors when the user saves the palette.
- Keep adjustment functions pure and testable.

## Accessibility rules

Implement WCAG contrast ratio calculations.

Show:

- contrast matrix between swatches
- AA/AAA labels
- text-on-background previews

Do not implement color blindness simulation in v1.

Required accessibility utilities:

- `relativeLuminance(rgb)`
- `contrastRatio(colorA, colorB)`
- `getContrastGrade(ratio)`
- `buildContrastMatrix(swatches)`

## Export rules

Support only these v1 export formats:

- PNG palette image
- HEX list
- RGB list
- HSL list

Do not add additional export formats unless directly requested.

Text exports should be deterministic and easy to copy.

PNG export should be generated client-side with the Canvas API.

Recommended PNG behavior:

- horizontal swatches
- 5 equal columns
- include HEX labels
- export dimensions around `1600x400`
- local download
- optionally record export metadata in the database

## Keyboard shortcuts

Implement these unless they conflict with inputs:

- `Space` or `G`: generate palette
- `Cmd/Ctrl + S`: save palette
- `Cmd/Ctrl + E`: open export panel
- `Cmd/Ctrl + C`: copy selected swatch HEX
- `L`: lock/unlock selected swatch
- `1-5`: select swatch by index
- `H`: open harmony/generation panel
- `A`: open accessibility panel
- `Esc`: close active panel/dialog

Do not trigger shortcuts while the user is typing in an input, textarea, select, or color picker control.

## Testing requirements

Use:

- Vitest for unit tests
- React Testing Library for component tests
- Playwright for E2E tests

Prioritize unit tests for pure color logic.

Required unit test areas:

- HEX/RGB/HSL conversions
- harmony generation
- locked swatch preservation
- adjustment utilities
- contrast calculations
- accessibility grading
- export text formatting

Required component test areas:

- palette canvas rendering
- swatch lock/unlock interaction
- harmony selector interaction
- adjustment slider interaction
- accessibility panel display
- export panel display

Required E2E flows:

- user generates a palette
- user locks a swatch and regenerates
- user edits a seed color
- user saves a palette
- user views saved palette/history
- user creates a collection
- user exports HEX/RGB/HSL
- user downloads PNG
- user checks accessibility panel
- user toggles light/dark mode

## Development commands

Use npm.

Expected commands:

- `npm run dev`
- `npm run build`
- `npm run typecheck`
- `npm run lint`
- `npm run test`
- `npm run test:e2e`
- `npm run test:all`
- `npm run db:generate`
- `npm run db:migrate`
- `npm run db:studio`

If a command is unavailable because of the installed Next.js version, update package scripts to use the current recommended equivalent.

## Docker

Support normal local Node.js development and optional Docker development.

Keep Docker setup simple.

SQLite file path must work in both local and Docker modes.

If Docker introduces unnecessary complexity during early scaffolding, keep the Docker setup minimal and document any limitations in `README.md`.

## Coding standards

- Use TypeScript strict mode.
- Prefer named exports for utilities.
- Keep functions small and testable.
- Use clear type names.
- Avoid magic numbers in color algorithms; define constants.
- Avoid unnecessary dependencies.
- Do not add a dependency without a clear reason.
- Keep React components focused on rendering and interaction.
- Keep business logic in `src/lib`.
- Add tests for new logic.
- Keep v1 focused; do not sneak in v2 features.
- Update docs when commands, setup, or workflows change.

## Build milestones

### Milestone 1 — Project scaffold

Create:

- Next.js App Router project
- TypeScript config
- Tailwind CSS
- shadcn/ui setup
- Prisma with SQLite
- Vitest
- React Testing Library
- Playwright
- base app shell
- placeholder panels
- README
- Dockerfile and docker-compose if practical

Done when:

- app runs locally
- Tailwind styles render
- Prisma client generates
- empty test suite runs

### Milestone 2 — Core color engine

Implement:

- color types
- HEX/RGB/HSL conversion utilities
- harmony generation
- locked swatch behavior
- adjustment utilities
- contrast/accessibility utilities
- export text formatters

Done when:

- unit tests cover core color utilities
- a generated 5-color palette can be produced

### Milestone 3 — Palette editor UI

Implement:

- palette canvas
- swatch cards
- lock/unlock controls
- selected swatch state
- manual color inspector
- harmony selector
- generate/regenerate controls

Done when:

- user can generate palettes
- user can lock swatches
- user can manually edit a color
- user can regenerate around locked swatches

### Milestone 4 — Persistence

Implement:

- Prisma schema
- database service functions
- API routes
- palette history
- saved palettes
- favorites
- simple collections
- history/saved/collection panels

Done when:

- user can save and revisit palettes
- generated palettes appear in history
- collections can group palettes

### Milestone 5 — Adjustments and accessibility

Implement:

- adjustment sliders
- adjustment preview behavior
- accessibility panel
- contrast matrix
- text preview cards
- useful accessibility persistence

Done when:

- user can adjust temperature, saturation, lightness, and contrast
- user can inspect contrast ratios between swatches

### Milestone 6 — Exports

Implement:

- HEX export
- RGB export
- HSL export
- PNG export with Canvas API
- export panel
- export tests

Done when:

- user can copy HEX/RGB/HSL
- user can download PNG palette image

### Milestone 7 — Polish, shortcuts, testing

Implement:

- keyboard shortcuts
- light/dark theme polish
- loading/empty/error states
- component tests
- Playwright E2E tests
- README updates

Done when:

- `npm run test:all` passes
- the app is usable as a local personal design tool

## Done criteria

A task is not done until:

1. Relevant TypeScript types are updated.
2. Relevant tests are added or updated.
3. Existing tests pass.
4. Lint/typecheck pass where available.
5. UI changes work in both light and dark mode.
6. No v2 features are accidentally introduced.
7. README or docs are updated when commands or workflows change.
