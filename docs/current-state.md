# PaletteForge Current State

## 1. System Overview

### Project Status

PaletteForge is now an executable early-stage shell with verified persistence foundations and a stronger baseline test harness. The repository has a validated dependency baseline, a styled design-tool workspace shell with a functioning local theme toggle, implemented HEX/RGB/HSL conversion utilities, a generated Prisma client, an initial migration scaffold, a local SQLite dev database, and baseline unit, component, and E2E smoke coverage. Harmony generation, adjustments, and app-level persistence workflows are still not implemented.

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
- `src/lib/prisma.ts` contains starter Prisma client wiring backed by a generated Prisma client.
- Database helper modules exist in `src/lib/db/*`, but all exported functions throw `not implemented` errors.
- Prisma generation is verified.
- A local SQLite database now exists at `prisma/dev.db`.
- An initial migration scaffold exists under `prisma/migrations/20260517123109_init/`.

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
- Prisma/SQLite persistence layer: `partially implemented`
  The datasource, generated client, and first migration scaffold are verified, but no CRUD behavior or app integration exists yet.
- Unit tests for pure color logic: `partially implemented`
  Conversion utilities now have direct unit coverage, but harmony, adjustments, contrast, accessibility, and export formatting tests are still missing.
- Component tests: `partially implemented`
  A single smoke test confirms the shell renders text.
- E2E tests: `partially implemented`
  A single smoke test now checks the landing page and theme toggle flow using Playwright against a local server.

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
- Persistence setup is ahead of persistence feature wiring: the schema, local SQLite database, generated client, and first migration scaffold exist before any CRUD routes or DB services are implemented.
- The spec recommends a larger component surface area than currently exists. The current implementation intentionally compressed that to placeholders, which is acceptable for scaffold stage but not for Milestone 3.
- The recommended API surface includes collection item update/delete routes; the route placeholder exists, but the feature is still not wired.

### Scope Creep

- No meaningful scope creep is present.

### Overbuilt Or Unnecessary Areas

- Some directories and placeholder modules were created before they are needed. This is acceptable, but further expansion should stop until the executable baseline is verified.

## 4. Active Sprint

### Task 6

Task statement: Implement harmony generation primitives.

Objective: build complementary, monochromatic, and shades/tints helpers in `src/lib/color/harmony.ts` with deterministic output rules.

Expected outcome:

- harmony helpers return valid 5-swatch planning data
- supported modes stay limited to v1 scope
- unit tests cover representative harmony cases

### Task 7

Task statement: Build `generatePalette` with locked swatch awareness.

Objective: wire the conversion layer and harmony helpers into `src/lib/color/generate-palette.ts`, preserving locked swatches and valid swatch shape output.

Expected outcome:

- unlocked colors generate around a seed or locked anchor
- locked swatches remain unchanged
- unit tests cover locked preservation and output shape

### Task 8

Task statement: Implement contrast and accessibility utilities.

Objective: add relative luminance, contrast ratio, grading, and matrix generation in the accessibility layer with tests.

Expected outcome:

- WCAG contrast helpers are implemented and deterministic
- accessibility utilities stay pure and framework-agnostic
- unit tests cover black/white ratio and grade thresholds

## 5. Risks And Blockers

- Runtime shell behavior, persistence foundations, and baseline smoke tests are now verified, but there is still no feature-level business logic beyond color conversions.
  Suggested fix: focus the next sprint on pure harmony/generation/accessibility utilities before any UI wiring.
- ESLint config is minimal and currently passes, but it may still be looser than the long-term Next.js rule set you want.
  Suggested fix: tighten the flat config after the shell is stable so lint evolution does not block the current sprint.
- shadcn/ui is only represented by `components.json`.
  Suggested fix: initialize only the components needed for the shell once the baseline toolchain is working.
- Many domain modules still throw `not implemented` errors.
  Suggested fix: continue replacing them in vertical slices, starting with harmony and palette generation.
- API routes all return `501`.
  Suggested fix: do not wire frontend save/history/export interactions until service functions and Prisma execution are ready.
- The aggregated `npm run test:all` flow is still sensitive to this non-interactive automation environment when it has to cold-start the local dev server.
  Suggested fix: rely on the verified standalone gates (`typecheck`, `lint`, `test`, `test:e2e`) in automation until the aggregator is revisited.
- `.DS_Store` files are present in the tree.
  Suggested fix: remove them during a housekeeping pass so they do not pollute future diffs.

## 6. Cleanup Opportunities

- Remove `.DS_Store` files from tracked workspace paths.
- Keep placeholder modules, but avoid adding more empty files until the current sprint tasks are executed.
- Keep the shell visuals stable while the next sprint focuses on pure color engine depth; do not mix harmony/accessibility work with more UI redesign.
