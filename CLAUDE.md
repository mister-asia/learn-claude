# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run build   # check for errors after changes (never use npm run dev)
npm test        # run all tests
npx jest -t "название теста"   # run a single test by name
```

## Architecture

Next.js 16 App Router, TypeScript, CSS Modules. No UI library.

### Pages

- `app/page.tsx` — home page with a link to `/clock`
- `app/clock/page.tsx` — clock page, imports `{ Clock }` from `@/widgets/clock`

### Widgets

Feature-based structure. Each widget exposes a public API through `index.tsx` only — internal files are not imported directly from outside the widget.

```
widgets/clock/
  index.tsx              — public export: export { Clock }
  Clock.module.css       — styles for Clock (toggle + display container)
  ui/
    Clock.tsx            — 'use client', toggle state (digital/analog), renders one of the two below
    AnalogClock.tsx      — 'use client', SVG clock with hour/minute/second hands
    DigitalClock.tsx     — 'use client', HH:MM:SS text display
    DigitalClock.module.css
  lib/
    formatTime.ts        — pure function: formatTime(date: Date): string → "HH:MM:SS"
    formatTime.test.ts   — Jest unit tests
```

### Styles

Global CSS variables defined in `app/globals.css`:
`--bg`, `--surface`, `--border`, `--text`, `--text-muted`, `--accent`, `--accent-hover`, `--font-sans`, `--font-mono`

### Testing

Jest runs only `**/lib/**/*.test.ts` — pure utility functions, no DOM or component tests.

### Tooling

- ESLint + Prettier with pre-commit hooks via husky + lint-staged
- `simple-import-sort` enforces import order automatically
