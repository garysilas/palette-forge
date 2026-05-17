# PaletteForge Project Specification

## 1. Project Overview

**Project name:** PaletteForge  
**Project type:** Local-only web app  
**Primary user:** Single local user  
**Authentication:** None  
**Purpose:** Build a personal color palette generator to replace a paywalled online tool.

PaletteForge is a local-first color palette generation tool built with Next.js, React, Tailwind CSS, shadcn/ui, Prisma, and SQLite. It allows the user to generate formal color harmony palettes, lock favorite swatches, manually choose seed colors, adjust palette characteristics, save palettes to simple collections, review history, check contrast accessibility, and export palettes in common formats.

The app should feel like a polished professional design tool while remaining focused, local, and personal.

---

## 2. V1 Scope

### Core Features

V1 must support:

- Generate a new 5-color palette.
- Generate palettes using formal harmony rules.
- Use a manually selected seed color.
- Lock individual swatches.
- Regenerate unlocked colors around locked anchors.
- Subtly adjust unlocked colors for better harmony.
- Copy color values.
- Save palettes.
- Review palette history.
- Organize saved palettes into simple named collections.
- Favorite palettes.
- Add optional palette names.
- Add optional notes.
- Add optional tags.
- Export palettes.
- Check basic accessibility through contrast ratios and text previews.

---

## 3. V1 Harmony Modes

V1 includes these formal harmony types:

- Complementary
- Monochromatic
- Shades/tints

Do not implement the following harmony modes in v1 unless explicitly requested later:

- Triadic
- Tetradic
- Analogous
- Split-complementary

---

## 4. Palette Size

V1 palettes contain exactly **5 swatches**.

Variable palette size is a v2 feature.

---

## 5. Locked Color Behavior

Locked swatches are strict anchors.

Rules:

- Locked colors must not change during regeneration.
- Unlocked colors may be regenerated.
- Unlocked colors may be subtly adjusted to better harmonize with locked anchors.
- If multiple colors are locked, use them as constraints.
- If no color is locked, generate from the selected seed color or a random seed.

---

## 6. Manual Color Selection

The user should be able to select or edit a swatch color manually through a color inspector.

Manual color editing should:

- Update the selected swatch.
- Recalculate HEX, RGB, and HSL values.
- Preserve the selected color unless the user unlocks/regenerates it.
- Allow the manually selected color to act as a seed or anchor for harmony generation.

---

## 7. Palette Adjustments

V1 includes adjustment controls for:

- Temperature
- Saturation
- Brightness/lightness
- Contrast

Adjustment behavior:

- Adjustments should preview immediately.
- Adjustments should apply to unlocked swatches by default.
- Locked swatches should remain unchanged unless explicitly edited.
- Saving a palette should persist the adjusted result.
- Adjustment functions should be pure and testable.

Suggested normalized adjustment shape:

```ts
type AdjustmentValues = {
  temperature: number; // -100 to 100
  saturation: number;  // -100 to 100
  lightness: number;   // -100 to 100
  contrast: number;    // -100 to 100
};
```

---

## 8. Accessibility

V1 includes:

- WCAG contrast ratios between swatches.
- Text-on-background previews.
- Pass/fail labels for common text contrast use cases.

The accessibility panel should show:

- A swatch-to-swatch contrast matrix.
- AA/AAA pass/fail indicators.
- Text preview cards using each palette color as a background.
- Light and dark text examples.

V1 does **not** include color blindness simulation.

Color blindness simulation is a v2 feature.

---

## 9. Export Formats

V1 supports:

- PNG palette image
- HEX list
- RGB list
- HSL list

### HEX export example

```txt
#264653
#2A9D8F
#E9C46A
#F4A261
#E76F51
```

### RGB export example

```txt
rgb(38, 70, 83)
rgb(42, 157, 143)
rgb(233, 196, 106)
rgb(244, 162, 97)
rgb(231, 111, 81)
```

### HSL export example

```txt
hsl(197, 37%, 24%)
hsl(173, 58%, 39%)
hsl(43, 74%, 66%)
hsl(27, 87%, 67%)
hsl(12, 76%, 61%)
```

### PNG export requirements

PNG export should:

- Be generated client-side.
- Use the Canvas API.
- Include 5 horizontal swatches.
- Use equal-width columns.
- Include HEX labels.
- Use a useful default export size, such as 1600x400.

---

## 10. V2 Features

The following are explicitly out of scope for v1 and should be reserved for v2:

- True image upload.
- Image thumbnail storage.
- Photo-based palette extraction.
- Color blindness simulation.
- Drag-and-drop interactions.
- Reordering swatches.
- Dragging palettes into collections.
- Variable number of swatches.
- Project-specific collection settings.
- Advanced export formats:
  - CSS variables
  - JSON
  - Tailwind config
  - SCSS variables
  - ASE/Adobe Swatch Exchange
  - SVG
- User accounts.
- Cloud sync.
- Hosted deployment.

---

## 11. UI and Interaction Model

The app should use a professional design-tool style.

The main layout should include:

- Central palette canvas.
- Top toolbar controls.
- Side panels for:
  - Generation
  - Adjustments
  - Export
  - Accessibility
  - History
  - Saved palettes
  - Collections

Suggested layout:

```txt
┌──────────────────────────────────────────────────────┐
│ Top Toolbar                                          │
│ Generate | Harmony | Seed | Save | Export | Theme    │
├───────────────┬───────────────────────┬──────────────┤
│ Left Panel    │ Palette Canvas         │ Right Panel  │
│ Generation    │ 5 large swatches       │ Inspector    │
│ History       │ Lock buttons           │ Adjustments  │
│ Collections   │ Color values           │ Accessibility│
│               │                        │ Export       │
└───────────────┴───────────────────────┴──────────────┘
```

---

## 12. Main UI Components

### AppShell

Owns the primary app frame and layout.

### TopToolbar

Contains:

- Generate button.
- Harmony selector.
- Save button.
- Export button.
- Theme toggle.
- Keyboard shortcut help trigger.

### PaletteCanvas

Displays the current 5-color palette.

### SwatchCard

Each swatch should show:

- Color block.
- HEX value.
- RGB/HSL quick copy options.
- Lock/unlock icon.
- Selected state.
- Optional accessibility indicator.

### SwatchInspector

Allows manual editing of the selected swatch.

### GenerationPanel

Contains:

- Harmony type selector.
- Seed color picker.
- Generate button.
- Regenerate unlocked button.

### AdjustmentPanel

Contains sliders for:

- Temperature.
- Saturation.
- Brightness/lightness.
- Contrast.
- Reset adjustments.

### AccessibilityPanel

Contains:

- Contrast matrix.
- Text preview cards.
- AA/AAA pass/fail labels.

### ExportPanel

Contains:

- Format selector.
- Copy button for text exports.
- Download PNG button.

### HistoryPanel

Shows generated palette history.

### SavedPalettesPanel

Shows saved palettes with favorite/name/tag indicators.

### CollectionsPanel

Shows simple named collections.

---

## 13. Theme Support

V1 should support both:

- Light mode
- Dark mode

The UI should use theme tokens and CSS variables where practical.

---

## 14. Keyboard Shortcuts

V1 should include keyboard shortcuts.

Suggested shortcuts:

```txt
Space / G        Generate new palette
Cmd/Ctrl + S     Save current palette
Cmd/Ctrl + E     Open export panel
Cmd/Ctrl + C     Copy selected swatch HEX
L                Lock/unlock selected swatch
1-5              Select swatch by index
H                Open harmony/generation panel
A                Open accessibility panel
Esc              Close active panel/dialog
```

Shortcuts must not trigger while the user is typing in:

- Input fields
- Textareas
- Select controls
- Color picker controls

---

## 15. Data Persistence

Use a backend and database.

Database choice:

- SQLite
- Prisma ORM

The app is single-user and local-only.

No login or authentication is required.

The database should save:

- Palette history.
- Saved palettes.
- Favorite palettes.
- Simple collections/projects.
- Palette names.
- Notes.
- Tags.
- Export records or export preferences where useful.
- Accessibility check results where useful.

---

## 16. Prisma Data Model Draft

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Palette {
  id              String   @id @default(cuid())
  name            String?
  notes           String?
  tags            String?
  colors          String
  harmonyType     String
  seedColor       String?
  isFavorite      Boolean  @default(false)
  isSaved         Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  collectionId    String?
  collection      Collection? @relation(fields: [collectionId], references: [id])

  historyEvents   PaletteHistory[]
  accessibilityResults AccessibilityResult[]
  exports         ExportRecord[]
}

model PaletteHistory {
  id          String   @id @default(cuid())
  paletteId   String?
  palette     Palette? @relation(fields: [paletteId], references: [id])
  action      String
  colors      String
  metadata    String?
  createdAt   DateTime @default(now())
}

model Collection {
  id          String    @id @default(cuid())
  name        String
  description String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  palettes    Palette[]
}

model AccessibilityResult {
  id            String   @id @default(cuid())
  paletteId     String
  palette       Palette  @relation(fields: [paletteId], references: [id])
  results       String
  createdAt     DateTime @default(now())
}

model ExportRecord {
  id          String   @id @default(cuid())
  paletteId   String
  palette     Palette  @relation(fields: [paletteId], references: [id])
  format      String
  metadata    String?
  createdAt   DateTime @default(now())
}

model UserSetting {
  id          String   @id @default(cuid())
  key         String   @unique
  value       String
  updatedAt   DateTime @updatedAt
}
```

---

## 17. Swatch Data Shape

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

---

## 18. Palette Data Shape

```ts
export type PaletteColorData = {
  version: 1;
  swatches: Swatch[];
  adjustments?: {
    temperature: number;
    saturation: number;
    lightness: number;
    contrast: number;
  };
};
```

---

## 19. Technology Stack

Use:

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

---

## 20. Architecture

Use a standard Next.js App Router architecture.

Recommended organization:

- UI in `src/components`
- Pages and API routes in `src/app`
- Color algorithms in `src/lib/color`
- Database access in `src/lib/db`
- Prisma client in `src/lib/prisma.ts`
- Shared types in `src/types`
- Client-side interaction state in hooks/store

Color generation and adjustment logic must be framework-agnostic.

Do not place color conversion, harmony generation, contrast math, or export formatting inside React components.

---

## 21. Recommended Repository Structure

```txt
paletteforge/
  spec.md
  README.md
  package.json
  package-lock.json
  next.config.ts
  tsconfig.json
  eslint.config.mjs
  postcss.config.mjs
  tailwind.config.ts
  components.json
  docker-compose.yml
  Dockerfile
  .env.example
  .gitignore

  prisma/
    schema.prisma
    migrations/
    seed.ts

  public/
    icons/
    screenshots/

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
        AppShell.tsx
        TopToolbar.tsx
        SidePanel.tsx
        StatusBar.tsx

      palette/
        PaletteCanvas.tsx
        SwatchCard.tsx
        SwatchLockButton.tsx
        SwatchInspector.tsx
        PaletteActions.tsx

      generation/
        GenerationPanel.tsx
        HarmonySelector.tsx
        SeedColorPicker.tsx

      adjustments/
        AdjustmentPanel.tsx
        TemperatureSlider.tsx
        SaturationSlider.tsx
        LightnessSlider.tsx
        ContrastSlider.tsx

      accessibility/
        AccessibilityPanel.tsx
        ContrastMatrix.tsx
        TextPreviewCard.tsx

      export/
        ExportPanel.tsx
        ExportFormatSelector.tsx
        ExportPreview.tsx

      library/
        HistoryPanel.tsx
        SavedPalettesPanel.tsx
        CollectionsPanel.tsx
        PaletteListItem.tsx

      ui/
        shadcn-generated-components-go-here

    lib/
      prisma.ts
      constants.ts

      color/
        color-types.ts
        conversions.ts
        harmony.ts
        generate-palette.ts
        adjust-palette.ts
        contrast.ts
        accessibility.ts
        export-formatters.ts
        png-export.ts

      db/
        palettes.ts
        history.ts
        collections.ts
        exports.ts
        settings.ts

      keyboard/
        shortcuts.ts

      utils/
        cn.ts
        ids.ts
        dates.ts

    hooks/
      usePaletteState.ts
      useKeyboardShortcuts.ts
      useThemeMode.ts
      useDebouncedValue.ts

    store/
      palette-store.ts
      ui-store.ts

    types/
      palette.ts
      collection.ts
      export.ts
      accessibility.ts

  tests/
    unit/
      color-conversions.test.ts
      harmony.test.ts
      contrast.test.ts
      adjust-palette.test.ts
      export-formatters.test.ts

    component/
      PaletteCanvas.test.tsx
      SwatchCard.test.tsx
      AccessibilityPanel.test.tsx
      ExportPanel.test.tsx

    e2e/
      palette-generation.spec.ts
      save-palette.spec.ts
      export-palette.spec.ts
      accessibility.spec.ts
```

---

## 22. API Routes

Recommended API routes:

```txt
GET    /api/palettes
POST   /api/palettes

GET    /api/palettes/:id
PATCH  /api/palettes/:id
DELETE /api/palettes/:id

GET    /api/history
POST   /api/history

GET    /api/collections
POST   /api/collections
PATCH  /api/collections/:id
DELETE /api/collections/:id

POST   /api/exports
```

---

## 23. Color Utility Requirements

Implement reliable conversions between:

- HEX
- RGB
- HSL

Required utility functions:

```ts
hexToRgb(hex: string): RGB
rgbToHex(rgb: RGB): string
rgbToHsl(rgb: RGB): HSL
hslToRgb(hsl: HSL): RGB
hexToHsl(hex: string): HSL
hslToHex(hsl: HSL): string
normalizeHex(hex: string): string
```

---

## 24. Palette Generation API Shape

```ts
type HarmonyType = "complementary" | "monochromatic" | "shades-tints";

type GeneratePaletteInput = {
  seedColor?: string;
  harmonyType: HarmonyType;
  lockedSwatches?: Swatch[];
  size?: 5;
};

type GeneratePaletteResult = {
  swatches: Swatch[];
  seedColor: string;
  harmonyType: HarmonyType;
};
```

---

## 25. Accessibility Utility Requirements

Implement WCAG contrast ratio calculations.

Required functions:

```ts
relativeLuminance(rgb: RGB): number
contrastRatio(colorA: RGB, colorB: RGB): number
getContrastGrade(ratio: number): ContrastGrade
buildContrastMatrix(swatches: Swatch[]): ContrastMatrix
```

Suggested contrast grade type:

```ts
type ContrastGrade = {
  ratio: number;
  aaNormalText: boolean;
  aaLargeText: boolean;
  aaaNormalText: boolean;
  aaaLargeText: boolean;
};
```

---

## 26. Styling Guidelines

Use:

- Tailwind CSS
- shadcn/ui
- CSS variables for theme tokens
- Light and dark mode

Design principles:

- Professional design-tool aesthetic.
- Dense but readable.
- Clear panels.
- Strong focus states.
- Smooth hover states.
- Minimal visual clutter.
- Large, satisfying swatches.
- Keyboard-friendly interactions.
- Accessible contrast.
- Avoid over-animation.

Recommended shadcn/ui components:

- Button
- Card
- Sheet
- Tabs
- Dialog
- DropdownMenu
- Select
- Slider
- Tooltip
- Input
- Textarea
- Badge
- Separator
- ScrollArea

---

## 27. Testing Strategy

Use:

- Vitest for unit tests.
- React Testing Library for component tests.
- Playwright for E2E tests.

### Unit tests

Prioritize `src/lib/color`.

Required unit test areas:

- Color conversions.
- Harmony generation.
- Locked swatch preservation.
- Palette adjustment behavior.
- Contrast ratio calculation.
- Accessibility grading.
- Export text formatting.

Example expectations:

- `hexToRgb("#ffffff")` returns `{ r: 255, g: 255, b: 255 }`.
- Locked swatches remain unchanged after regeneration.
- Complementary generation includes approximately opposite hue.
- Contrast ratio for black/white is approximately `21`.
- Export formatters produce stable output.

### Component tests

Required component tests:

- `PaletteCanvas` renders 5 swatches.
- `SwatchCard` lock button toggles locked state.
- `GenerationPanel` changes harmony type.
- `AdjustmentPanel` updates slider values.
- `AccessibilityPanel` displays contrast data.
- `ExportPanel` renders selected export format.

### E2E tests

Required flows:

- User generates a palette.
- User locks a swatch and regenerates.
- User edits a seed color.
- User saves a palette.
- User views saved palette/history.
- User creates a collection.
- User exports HEX/RGB/HSL.
- User downloads PNG.
- User checks accessibility panel.
- User toggles light/dark mode.

---

## 28. Local Development

Support:

- Normal local Node.js development.
- Optional Docker-based local development.

Package manager:

- npm

### `.env.example`

```env
DATABASE_URL="file:./dev.db"
```

### Suggested npm scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest",
    "test:unit": "vitest tests/unit",
    "test:component": "vitest tests/component",
    "test:e2e": "playwright test",
    "test:all": "npm run typecheck && npm run lint && npm run test && npm run test:e2e",
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "db:seed": "tsx prisma/seed.ts"
  }
}
```

If the selected Next.js version does not support `next lint`, replace it with the current ESLint command for the project.

---

## 29. Docker Support

Provide simple Docker support for local development.

### Dockerfile

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

### docker-compose.yml

```yaml
services:
  paletteforge:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
      - paletteforge_data:/app/prisma
    environment:
      DATABASE_URL: "file:./dev.db"
    command: npm run dev

volumes:
  paletteforge_data:
```

Because SQLite is file-based, verify that the database path works correctly in both local and Docker modes.

---

## 30. Build Milestones

### Milestone 1 — Project scaffold

Tasks:

1. Create Next.js app with TypeScript.
2. Configure Tailwind CSS.
3. Add shadcn/ui.
4. Add Prisma with SQLite.
5. Add Vitest, React Testing Library, and Playwright.
6. Add base app shell.
7. Add this `spec.md`.

Done when:

- App runs locally.
- Tailwind styles render.
- Prisma client generates.
- Empty test suite runs.

### Milestone 2 — Core color engine

Tasks:

1. Implement color type definitions.
2. Implement HEX/RGB/HSL conversion utilities.
3. Implement harmony generation.
4. Implement locked swatch behavior.
5. Implement adjustment utilities.
6. Implement contrast/accessibility utilities.
7. Add unit tests.

Done when:

- Unit tests cover all color utilities.
- A generated 5-color palette appears in the app.

### Milestone 3 — Palette editor UI

Tasks:

1. Build `PaletteCanvas`.
2. Build `SwatchCard`.
3. Add lock/unlock controls.
4. Add selected swatch state.
5. Add manual color inspector.
6. Add harmony selector.
7. Add generate/regenerate controls.

Done when:

- User can generate palettes.
- User can lock swatches.
- User can manually edit a color.
- User can regenerate around locked swatches.

### Milestone 4 — Persistence

Tasks:

1. Implement Prisma schema.
2. Create DB service functions.
3. Add API routes.
4. Save palette history.
5. Save palettes.
6. Add favorites.
7. Add simple collections.
8. Add history/saved/collection panels.

Done when:

- User can save and revisit palettes.
- Generated palettes appear in history.
- Collections can group palettes.

### Milestone 5 — Adjustments and accessibility

Tasks:

1. Build adjustment sliders.
2. Apply adjustments to current palette.
3. Build accessibility panel.
4. Display contrast matrix.
5. Display text preview cards.
6. Persist accessibility results where useful.

Done when:

- User can adjust temperature, saturation, lightness, and contrast.
- User can inspect contrast ratios between swatches.

### Milestone 6 — Exports

Tasks:

1. Implement HEX export.
2. Implement RGB export.
3. Implement HSL export.
4. Implement PNG export with Canvas API.
5. Build export panel.
6. Add export tests.

Done when:

- User can copy HEX/RGB/HSL.
- User can download PNG palette image.

### Milestone 7 — Polish, shortcuts, testing

Tasks:

1. Add keyboard shortcuts.
2. Add light/dark theme support.
3. Add loading/empty/error states.
4. Add component tests.
5. Add Playwright E2E tests.
6. Run full quality checks.
7. Update README.

Done when:

- Full test suite passes.
- App is usable as a local personal design tool.

---

## 31. Coding Standards

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

---

## 32. Definition of Done

A task is complete when:

1. Relevant TypeScript types are updated.
2. Relevant tests are added or updated.
3. Existing tests pass.
4. Lint/typecheck pass where available.
5. UI changes work in both light and dark mode.
6. No v2 features are accidentally introduced.
7. README or docs are updated when commands or workflows change.
