# PaletteForge Current State

## 1. System Overview

### Project Status

PaletteForge is now an executable early-stage shell with the first color utility layer in place. The repository has a validated dependency baseline, a styled design-tool workspace shell with a functioning local theme toggle, implemented HEX/RGB/HSL conversion utilities, a draft Prisma schema, and baseline unit plus smoke-test coverage. Harmony generation, adjustments, and persistence workflows are still not implemented.

`/docs/current-state.md` did not exist before this recovery pass. `/docs/init.md` exists and accurately describes the initialization outcome.

### Tech Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS
- Prisma with SQLite
- Vitest
- React Testing Library
- Playwright
- npm

### Frontend Architecture

- `src/app/layout.tsx` and `src/app/page.tsx` provide a minimal App Router entry point.
- `src/components/app-shell/AppShell.tsx` is now a client shell component that manages light/dark preview state and composes the toolbar, center canvas, side panels, and status bar.
- Panel components under `src/components/*` are now styled shell surfaces with realistic static structure, but they are still not connected to feature logic.
- `src/lib/constants.ts` provides sample swatch data for display only.
- Hooks and stores exist only as stubs and are not wired into the UI.

### Backend Architecture

- Route files exist under `src/app/api/**`, but each handler currently returns HTTP `501 Not implemented`.
- There is no request validation, no service-layer wiring, and no frontend-to-API integration.

### Database Layer

- `prisma/schema.prisma` contains a reasonable draft schema for palettes, history, collections, accessibility results, export records, and settings.
- `src/lib/prisma.ts` contains starter Prisma client wiring.
- Database helper modules exist in `src/lib/db/*`, but all exported functions throw `not implemented` errors.
- No migrations have been created, and Prisma generation has not been verified in this recovery pass.

### Auth Approach

- No authentication is present, which matches the spec.

### Major Modules And Responsibilities

- `src/app`: route entry points and future API handlers.
- `src/components`: shell, canvas, and panel presentation components.
- `src/lib/color`: pure color-domain logic; conversions are now implemented, while harmony, adjustments, accessibility, and export helpers are still stubbed.
- `src/lib/db`: intended database service layer, currently stubbed.
- `src/types`: shared domain types for palette, accessibility, collections, and export concerns.
- `tests/*`: baseline unit coverage for conversions plus smoke-level component coverage.

## 2. Feature Status

### Core Product Features

- Generate a new 5-color palette: `stubbed`
  UI shell exists with a stronger central canvas, but no generation logic or user interaction is implemented.
- Generate palettes using formal harmony rules: `stubbed`
  Harmony types are modeled in TypeScript, but generation functions are unimplemented.
- Use a manually selected seed color: `missing`
  No seed picker UI or state flow exists yet.
- Lock individual swatches: `stubbed`
  Placeholder swatches display a locked/open label, but lock interaction is not implemented.
- Regenerate unlocked colors around locked anchors: `missing`
  No generation engine or lock-aware regeneration behavior exists.
- Subtly adjust unlocked colors for better harmony: `missing`
  Adjustment module signatures exist, but there is no algorithm or UI behavior.
- Copy color values: `missing`
  No copy actions exist in the UI.
- Save palettes: `missing`
  Save controls are visual placeholders only; no persistence flow exists.
- Review palette history: `stubbed`
  History panel shell exists; no history persistence or listing exists.
- Organize saved palettes into simple named collections: `stubbed`
  Draft schema and panel shell exist; there is no CRUD flow.
- Favorite palettes: `stubbed`
  Schema fields exist; no UI or persistence flow exists.
- Add optional palette names: `stubbed`
  Schema supports it; the UI and APIs do not.
- Add optional notes: `stubbed`
  Schema supports it; the UI and APIs do not.
- Add optional tags: `stubbed`
  Schema supports it; the UI and APIs do not.
- Export palettes: `stubbed`
  Export panel shell exists, but formatter and PNG export logic are unimplemented.
- Check accessibility through contrast ratios and text previews: `stubbed`
  Accessibility panel shell exists, but contrast logic and preview rendering are unimplemented.

### Supporting Engineering Features

- Light/dark mode: `partially implemented`
  CSS variables, local theme toggle behavior, and browser verification exist, but persistence to user settings is not implemented.
- Keyboard shortcuts: `stubbed`
  Shortcut definitions exist in `src/lib/keyboard/shortcuts.ts`, but there is no event handling.
- Prisma/SQLite persistence layer: `stubbed`
  Draft schema and client stub exist, but nothing executes end-to-end.
- Unit tests for pure color logic: `partially implemented`
  Conversion utilities now have direct unit coverage, but harmony, adjustments, contrast, accessibility, and export formatting tests are still missing.
- Component tests: `partially implemented`
  A single smoke test confirms the shell renders text.
- E2E tests: `partially implemented`
  A single smoke test checks the landing page only.

## 3. Spec Alignment

### Matches

- The repository structure broadly matches the architecture described in the spec.
- The project remains local-only with no authentication or cloud features.
- Prisma models align with the intended v1 persistence entities at a draft level.
- The UI shell layout direction matches the top-toolbar, center-canvas, side-panel model.
- Pure color logic is separated into `src/lib/color`, which matches the architecture rule.

### Missing Items

- Milestone 1 is not actually complete because shadcn/ui has not been initialized beyond `components.json`, the shell is not yet backed by real controls, and runtime coverage is still minimal.
- shadcn/ui is not installed or generated yet; only `components.json` is present.
- Only the first color utility layer is implemented; generation, adjustment, contrast, and accessibility logic are still missing.
- No palette state management exists.
- No API route behavior exists beyond `501` responses.
- No save/history/collection flows exist.
- No export behavior exists.
- No accessibility calculations or previews exist.
- No real keyboard shortcut handling exists.

### Deviations

- The spec expects a runnable baseline app and toolchain as the first milestone outcome. That baseline now exists and the shell has been browser-verified in light, dark, and a mobile viewport, but the shell is still static.
- The spec's first color milestone is only partially complete: conversions exist and are tested, but harmony and adjustment logic are still pending.
- The spec recommends a larger component surface area than currently exists. The current implementation intentionally compressed that to placeholders, which is acceptable for scaffold stage but not for Milestone 3.
- The recommended API surface includes collection item update/delete routes; the route placeholder exists, but the feature is still not wired.

### Scope Creep

- No meaningful scope creep is present.

### Overbuilt Or Unnecessary Areas

- Some directories and placeholder modules were created before they are needed. This is acceptable, but further expansion should stop until the executable baseline is verified.

## 4. Active Sprint

### Task 4

Task statement: Verify persistence foundations.

Objective: generate Prisma client, validate the SQLite path, and ensure the schema is executable without adding v2 fields.

Expected outcome:

- `npm run db:generate` completes
- the schema is ready for the first migration
- Prisma client wiring is confirmed usable from app code

### Task 5

Task statement: Upgrade test scaffolding from placeholder to baseline coverage.

Objective: keep the smoke tests, but add the first meaningful unit tests and confirm Vitest and Playwright configs actually run.

Expected outcome:

- the unit test suite covers conversion happy paths and basic invalid input
- the component smoke test still passes
- the E2E smoke test is confirmed against the local app

## 5. Risks And Blockers

- Runtime shell behavior is now verified, and the first domain unit tests exist, but persistence remains completely unverified.
  Suggested fix: run `npm run db:generate` next and validate the SQLite path plus Prisma client setup in the same cycle.
- ESLint config is minimal and currently passes, but it may still be looser than the long-term Next.js rule set you want.
  Suggested fix: tighten the flat config after the shell is stable so lint evolution does not block the current sprint.
- shadcn/ui is only represented by `components.json`.
  Suggested fix: initialize only the components needed for the shell once the baseline toolchain is working.
- All domain modules throw `not implemented` errors.
  Suggested fix: start with conversion utilities and keep the rest stubbed until each sprint task is active.
- API routes all return `501`.
  Suggested fix: do not wire frontend save/history/export interactions until service functions and Prisma execution are ready.
- `.DS_Store` files are present in the tree.
  Suggested fix: remove them during a housekeeping pass so they do not pollute future diffs.

## 6. Cleanup Opportunities

- Remove `.DS_Store` files from tracked workspace paths.
- Keep placeholder modules, but avoid adding more empty files until the current sprint tasks are executed.
- Keep the shell visuals stable while Task 4 focuses on Prisma and SQLite verification; do not mix persistence setup with more UI redesign.
