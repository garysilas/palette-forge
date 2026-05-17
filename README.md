# PaletteForge

PaletteForge is a local-only color palette generator for a single user. The target stack is Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui, Prisma, and SQLite.

## Status

This repository is in initialization state. The project spec lives in [docs/spec.md](/Users/gary/DevProjects/palette-forge/docs/spec.md), and the execution scaffold lives in [docs/init.md](/Users/gary/DevProjects/palette-forge/docs/init.md).

The current scaffold provides:

- repository structure aligned to the spec
- placeholder app shell and panels
- draft Prisma schema and API route stubs
- starter test and Docker configuration

Business logic and feature implementation are intentionally not complete yet.

## Planned Commands

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run test:all
npm run db:generate
npm run db:migrate
npm run db:studio
```

## Notes

- Use `npm` as the package manager.
- The app is local-only and does not include authentication or cloud sync.
- SQLite should be used in both local and optional Docker workflows.
