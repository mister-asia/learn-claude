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
  widgets/    ← large composite UI blocks
  features/   ← user interactions with business value
  entities/   ← business domain objects
  shared/     ← utilities, UI kit, API client
```

### Routing Pages (`app/`)

Each page does one thing — imports and renders a view:

- `app/page.tsx` → renders `<HomeView />` from `@/views/home`
- `app/clock/page.tsx` → renders `<ClockView />` from `@/views/clock`

### Views (`src/views/`)

Page-level logic and layout. Each slice has `ui/` segment and `index.ts` public API.

```
src/views/
  home/
    ui/home-view.tsx       — home page layout with link to /clock
    ui/home-view.module.css
    index.ts               — export { HomeView }
  clock/
    ui/clock-view.tsx      — clock page layout, renders <Clock> from widgets
    ui/clock-view.module.css
    index.ts               — export { ClockView }
```

### Widgets (`src/widgets/`)

Each widget exposes a public API through `index.tsx` only.

```
src/widgets/clock/
  index.tsx              — public export: export { Clock }
  ui/
    clock.tsx            — 'use client', toggle state (digital/analog)
    clock.module.css
    analog-clock.tsx     — 'use client', SVG clock with hour/minute/second hands
    digital-clock.tsx    — 'use client', HH:MM:SS text display
    digital-clock.module.css
  lib/
    format-time.ts       — pure function: formatTime(date: Date): string → "HH:MM:SS"
    format-time.test.ts  — Jest unit tests
```

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
