# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm test                        # run all tests
npx jest -t "название теста"   # run a single test by name
npx jest main.test.js           # run tests in a specific file
```

No build step — open `index.html` directly in a browser to run the app.

## Architecture

Vanilla JS single-page app with no framework or bundler.

- `main.js` — exports `updateClock()`, which reads the current time via `new Date()` and writes a `HH:MM:SS` string into the `#root` DOM element. On load it runs once and then schedules itself with `setInterval`.
- `index.html` — mounts `#root` and loads `main.js` as a classic script.
- `main.test.js` — Jest tests using jsdom. Each test resets modules with `jest.resetModules()` and re-imports `main.js` dynamically so the module-level side effects (`updateClock()` call and `setInterval`) re-execute in a clean DOM.
- Babel (`babel.config.json`) transpiles ES module syntax (`import`/`export`) for Jest only — the browser loads `main.js` as a plain script, so no transpilation happens there.
