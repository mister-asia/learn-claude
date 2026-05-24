# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run build   # check for errors after changes (never use npm run dev)
npm test        # run all tests
npx jest -t "название теста"   # run a single test by name
```

## Architecture

Next.js 16 App Router, TypeScript, CSS Modules. No UI library. Follows **Feature-Sliced Design (FSD)**.

### FSD Layer Hierarchy

Import rule: a layer can only import from layers **strictly below** it.

```
app/          ← Next.js routing only (minimal logic, no business code)
src/
  views/      ← page-level composition (replaces FSD 'pages' to avoid conflict with /app)
а г  widgets/    ← large composite UI blocks
  features/   ← user interactions with business value
  entities/   ← business domain objects
  shared/     ← utilities, UI kit, API client
```

### Routing Pages (`app/`)

Each page does one thing — imports and renders a view:

- `app/page.tsx` → renders `<HomeView />` from `@/views/home`
- `app/clock/page.tsx` → renders `<ClockView />` from `@/views/clock`

**Rule:** when adding a new page, always update both:

1. `src/shared/config/routes.ts` — add a new key to the `ROUTES` object
2. `src/widgets/navbar/ui/navbar.tsx` — add a new entry to the `links` array

### Slice Structure

Each slice exposes its public API through `index.ts` only — no deep imports from outside.

```
<slice>/
  index.ts       — public exports only
  ui/            — React components + CSS modules
  lib/           — pure functions and hooks; tested via *.test.ts
  model/         — state management (if needed)
```

### Views (`src/views/`)

Page-level layout and composition. Renders widgets, no business logic. Each slice has `ui/` segment and `index.ts` public API.

### Widgets (`src/widgets/`)

Large composite UI blocks. May import from `features`, `entities`, `shared`. Each widget exposes a public API through `index.tsx` only.

### Features (`src/features/`)

User interactions with business value (e.g. copy-to-clipboard, auth, search). Each slice has `ui/`, `lib/` segments and `index.ts` public API.

### Entities (`src/entities/`)

Business domain objects (e.g. user, product, order). Contains data types, API calls, and read-only UI for displaying an entity. May only import from `shared`.

### Shared (`src/shared/`)

Technical primitives with no business context: browser API wrappers, UI kit components, HTTP client, constants. No slice structure — organized by type: `lib/`, `ui/`, `api/`, `config/`.

### Path Aliases

FSD layers have dedicated TypeScript aliases (defined in `tsconfig.json`):

```
@/views/*    → src/views/*
@/widgets/*  → src/widgets/*
@/features/* → src/features/*
@/entities/* → src/entities/*
@/shared/*   → src/shared/*
@/*          → ./*  (fallback)
```

### Styles

Global CSS variables defined in `app/globals.css`:
`--bg`, `--surface`, `--border`, `--text`, `--text-muted`, `--accent`, `--accent-hover`, `--font-sans`, `--font-mono`

### Testing

Jest runs only `**/lib/**/*.test.ts` — pure utility functions, no DOM or component tests.

### Tooling

- ESLint + Prettier with pre-commit hooks via husky + lint-staged
- `simple-import-sort` enforces FSD layer import order (views → widgets → features → entities → shared → relative)
- `no-restricted-imports` enforces FSD boundary rules per layer (see `eslint.config.mjs`)
