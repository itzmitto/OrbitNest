# OrbitNest

**Your tabs. Your universe.**

OrbitNest is a privacy-first Chrome/Edge Manifest V3 tab-management extension in development. Its goal is to display open browser tabs as a navigable universe of planets.

## Current status

PR #001 establishes the React + TypeScript + Vite workspace and a **static design preview**. The preview is not a working browser extension; it does not query browser tabs, display actual tab data, or request browser permissions. Manifest V3, the browser launcher, live tab data, and graph interactions are planned as separate changes.

## Requirements

- Node.js 24.x recommended (Vite 8 supports Node 20.19+, 22.12+, and newer supported even-numbered releases)
- npm

## Local development

```bash
npm install
npm run dev
```

Open the localhost URL printed by Vite. To verify the first PR:

```bash
npm run typecheck
npm run build
```

Lint, tests, CI, and the browser extension manifest are planned in upcoming PRs. Do not load `dist/` as an unpacked extension yet; it does not contain `manifest.json`.

## Principles

- Tab metadata stays on-device.
- No page-body scraping, email contents, or passwords.
- One meaningful, reviewable feature per pull request.
- No automatic merging.

See [the roadmap](docs/ROADMAP.md) and [PR log](docs/PR-LOG.md).

## License

MIT, Copyright (c) 2026 itzmitto.
