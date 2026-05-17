# PaletteForge Current State

## 1. System Overview

### Project Status

PaletteForge is currently an initialization scaffold. The repository has the intended folder structure, starter config files, placeholder UI, draft Prisma schema, and smoke-test stubs, but it does not yet implement the product behavior described in `/docs/spec.md`.

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
- `src/components/app-shell/AppShell.tsx` renders a placeholder three-region layout that roughly matches the spec.
- Panel components under `src/components/*` are static placeholders with explanatory text rather than connected feature UIs.
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
- `src/lib/color`: intended location for pure color logic, currently stubbed.
- `src/lib/db`: intended database service layer, currently stubbed.
- `src/types`: shared domain types for palette, accessibility, collections, and export concerns.
- `tests/*`: smoke-level scaffolding only.

## 2. Feature Status

### Core Product Features

- Generate a new 5-color palette: `stubbed`
  UI shell exists, but no generation logic or user interaction is implemented.
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
  History panel placeholder exists; no history persistence or listing exists.
- Organize saved palettes into simple named collections: `stubbed`
  Draft schema and panel placeholder exist; there is no CRUD flow.
- Favorite palettes: `stubbed`
  Schema fields exist; no UI or persistence flow exists.
- Add optional palette names: `stubbed`
  Schema supports it; the UI and APIs do not.
- Add optional notes: `stubbed`
  Schema supports it; the UI and APIs do not.
- Add optional tags: `stubbed`
  Schema supports it; the UI and APIs do not.
- Export palettes: `stubbed`
  Export panel exists, but formatter and PNG export logic are unimplemented.
- Check accessibility through contrast ratios and text previews: `stubbed`
  Accessibility panel exists, but contrast logic and preview rendering are unimplemented.

### Supporting Engineering Features

- Light/dark mode: `partially implemented`
  CSS variables and `.dark` tokens exist, but there is no theme toggle behavior or verification.
- Keyboard shortcuts: `stubbed`
  Shortcut definitions exist in `src/lib/keyboard/shortcuts.ts`, but there is no event handling.
- Prisma/SQLite persistence layer: `stubbed`
  Draft schema and client stub exist, but nothing executes end-to-end.
- Unit tests for pure color logic: `missing`
  Only smoke tests exist; no logic tests exist because the logic is not implemented.
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

- Milestone 1 is not actually complete because dependency installation and baseline verification have not been performed.
- shadcn/ui is not installed or generated yet; only `components.json` is present.
- No core color utilities are implemented.
- No palette state management exists.
- No API route behavior exists beyond `501` responses.
- No save/history/collection flows exist.
- No export behavior exists.
- No accessibility calculations or previews exist.
- No real keyboard shortcut handling exists.

### Deviations

- The spec expects a runnable baseline app and toolchain as the first milestone outcome. The repo currently contains a scaffold that still needs execution validation.
- The spec recommends a larger component surface area than currently exists. The current implementation intentionally compressed that to placeholders, which is acceptable for scaffold stage but not for Milestone 3.
- The recommended API surface includes collection item update/delete routes; the route placeholder exists, but the feature is still not wired.

### Scope Creep

- No meaningful scope creep is present.

### Overbuilt Or Unnecessary Areas

- Some directories and placeholder modules were created before they are needed. This is acceptable, but further expansion should stop until the executable baseline is verified.

## 4. Active Sprint

### Task 1

Task statement: Make the scaffold executable.

Objective: install dependencies and confirm the baseline toolchain works locally.

Expected outcome:

- `npm install` completes
- `npm run typecheck` completes
- `npm run lint` completes
- the repo has a working lockfile

### Task 2

Task statement: Finish the real Milestone 1 shell.

Objective: turn the placeholder app shell into a stable, styled layout with clear left, center, and right workspace regions plus a theme toggle stub.

Expected outcome:

- the app renders a coherent design-tool shell
- the toolbar, canvas, and panels are visually consistent
- light and dark mode can both be previewed from the UI

### Task 3

Task statement: Implement the first pure color utilities.

Objective: complete `normalizeHex`, HEX/RGB/HSL conversion helpers, and the shared palette domain types with unit coverage.

Expected outcome:

- `src/lib/color/conversions.ts` is implemented
- conversion tests exist and pass
- the color engine has a reliable base for later harmony work

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

- Dependencies are not installed or verified.
  Suggested fix: run `npm install` first, then execute `typecheck`, `lint`, and tests before building more code.
- ESLint config is minimal and may not reflect the intended Next.js rule set.
  Suggested fix: validate the current flat config against the installed Next.js version during Task 1.
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
- Tighten the docs after Task 1 completes so `init.md` and `current-state.md` do not drift from the actual executable state.
