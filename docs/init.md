# PaletteForge Initialization

## 1. Spec Validation

### Missing Technical Details

- Exact package versions are not specified for Next.js, React, Tailwind CSS, Prisma, Vitest, or Playwright.
- The spec requires shadcn/ui, but it does not define whether initialization should run the generator immediately or only prepare the repository for it.
- The API contract is described by routes, but request and response payload shapes are not yet specified.
- Theme persistence behavior is not defined beyond light/dark support.
- The spec defines database entities, but migration sequencing and seed data expectations are still open.
- PNG export is specified functionally, but the UI trigger state and error handling expectations are not defined.

### Ambiguities Likely To Block Later Work

- "Subtly adjust unlocked colors for better harmony" needs a concrete algorithm and measurable guardrails before implementation.
- "Use the selected swatch as primary anchor if available" assumes selected-swatch state will be available to palette generation logic; that state handoff is not yet defined.
- Accessibility persistence is optional "where useful", so the threshold for when to store snapshots needs to be chosen.
- Collections are described as "simple named collections/projects"; the repo should treat them as plain named collections in v1 to avoid accidental scope creep.

### Conflicts Or Over-Complex Requirements

- Milestone 1 asks for a runnable app, generated Prisma client, and working test harness. This initialization workflow only creates the scaffold and execution plan; installation and verification belong to the first implementation cycle.
- The recommended structure is broad. Creating every component up front would add noise, so the scaffold should prioritize the main frame and placeholder panels first.

### Working Assumptions

- Use the App Router with a single main page for the initial shell.
- Treat `shades/tints` as the internal harmony identifier `shades-tints` to keep TypeScript unions URL-safe and filename-safe.
- Use CSS variables plus a `.dark` class strategy for theme tokens.
- Keep the repo local-first and single-user with no authentication or cloud behavior anywhere in the scaffold.

## 2. Build Plan

### MVP Milestone

The v1 MVP is reached when Milestones 1 through 6 are complete: the app can generate, adjust, save, inspect, and export five-color palettes locally. Milestone 7 is polish and comprehensive verification.

### Ordered Tasks

1. Project scaffold
   Objective: bootstrap the Next.js, Tailwind, Prisma, testing, and documentation foundation.
   Expected outcome: the repository can install dependencies, start the app shell, and run baseline checks.
2. Core color engine
   Objective: implement framework-agnostic color conversions, harmony generation, locked-swatch handling, adjustments, contrast, and text export helpers.
   Expected outcome: pure color logic is test-covered and can produce a valid five-swatch palette.
3. Palette editor UI
   Objective: connect the app shell to palette state, generation controls, manual swatch editing, and lock/regenerate interactions.
   Expected outcome: a local user can generate palettes, lock swatches, edit a selected swatch, and regenerate around anchors.
4. Persistence
   Objective: add the Prisma schema, database helpers, and API routes for history, saved palettes, favorites, and collections.
   Expected outcome: palettes can be saved, revisited, grouped, and tracked over time.
5. Adjustments and accessibility
   Objective: wire adjustment sliders and accessibility analysis into the live palette workflow.
   Expected outcome: users can preview and persist adjustments while inspecting contrast and text readability.
6. Exports
   Objective: add deterministic text exports and client-side PNG export.
   Expected outcome: users can copy HEX/RGB/HSL output and download a labeled PNG.
7. Polish and full verification
   Objective: finalize shortcuts, theme polish, loading states, component coverage, E2E flows, and documentation.
   Expected outcome: `npm run test:all` becomes the release-quality gate for v1.

## 3. Project Structure

```txt
palette-forge/
  docs/
    spec.md
    init.md
  prisma/
    schema.prisma
    seed.ts
    migrations/
  public/
    icons/
    screenshots/
  src/
    app/
      layout.tsx
      page.tsx
      globals.css
      api/
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
    test/
      setup.ts
    types/
  tests/
    unit/
    component/
    e2e/
```

### Module Responsibilities

- `src/app`: route entry points, layout, page composition, API route handlers.
- `src/components`: presentational and interaction components only.
- `src/lib/color`: pure color-domain logic and export helpers.
- `src/lib/db`: database access functions layered on top of Prisma.
- `src/lib/keyboard`: shortcut definitions and filtering helpers.
- `src/types`: shared domain types for palettes, exports, and accessibility.
- `prisma/`: schema, migrations, and seed entry point.
- `tests/`: separated unit, component, and E2E suites.

## 4. Scaffolded Files

The initialization scaffold created these starter files:

- Root config and metadata: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `components.json`, `.gitignore`, `.env.example`, `README.md`, `Dockerfile`, `docker-compose.yml`
- App shell: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Placeholder UI frame: `src/components/app-shell/*`, `src/components/palette/PaletteCanvas.tsx`, `src/components/generation/GenerationPanel.tsx`, `src/components/adjustments/AdjustmentPanel.tsx`, `src/components/accessibility/AccessibilityPanel.tsx`, `src/components/export/ExportPanel.tsx`, `src/components/library/*`
- Domain stubs: `src/types/*`, `src/lib/constants.ts`, `src/lib/prisma.ts`, `src/lib/color/*`, `src/lib/db/*`, `src/lib/keyboard/shortcuts.ts`, `src/lib/utils/cn.ts`
- API and persistence placeholders: `src/app/api/**/route.ts`, `prisma/schema.prisma`, `prisma/seed.ts`
- Test harness stubs: `vitest.config.ts`, `playwright.config.ts`, `src/test/setup.ts`, `tests/unit/smoke.test.ts`, `tests/component/smoke.test.tsx`, `tests/e2e/smoke.spec.ts`

These files intentionally provide structure and signatures only. Business logic, production styling, and feature behavior remain part of the implementation sprint.

## 5. Active Sprint

### Task 1

Objective: install and verify the baseline toolchain for Next.js, Tailwind, Prisma, Vitest, React Testing Library, and Playwright.

Success criteria:

- `npm install` succeeds
- `npm run typecheck` succeeds
- `npm run lint` succeeds with the chosen starter rule set

### Task 2

Objective: replace placeholder app-shell content with a real layout shell using the planned left, center, and right tool regions.

Success criteria:

- the main page renders a stable top toolbar, palette canvas, and side panels
- light and dark tokens both render legibly

### Task 3

Objective: implement the shared palette and color domain types plus the first conversion utilities in `src/lib/color`.

Success criteria:

- `Swatch`, `HarmonyType`, `AdjustmentValues`, and export/accessibility types are finalized
- conversion utilities have unit tests for representative happy paths and invalid input

### Task 4

Objective: add the Prisma client wiring and confirm the draft schema can generate locally.

Success criteria:

- `prisma generate` succeeds
- the SQLite database path is valid for local development
- the schema supports palettes, history, collections, exports, and settings without v2 features

### Task 5

Objective: configure the first executable test pass for unit, component, and E2E smoke coverage.

Success criteria:

- Vitest runs at least one unit smoke test
- component tests run in `jsdom`
- Playwright configuration is ready for the first real flow in the next cycle
