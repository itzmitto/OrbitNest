# OrbitNest

**Your tabs. Your universe.**

OrbitNest is a privacy-first Chrome/Edge extension that will turn open tabs into a navigable universe. Currently **v0.2 is an installable Manifest V3 extension with a static concept dashboard**. Clicking the toolbar icon opens the dashboard in a new browser tab; **it does not show real tabs yet**.

## Requirements

- Node.js 24 recommended (supported: 20.19+, 22.12+, 24+)
- npm
- Chrome or Microsoft Edge (Chromium)

## Build

```bash
npm install
npm run typecheck
npm run build
npm run verify:extension
```

The production `dist/` directory contains the extension's `manifest.json`, `background.js`, dashboard HTML/CSS/JS and PNG icons. Load **`dist/`, not the repository root**.

## Install locally

1. Build the extension using the commands above.
2. Open `chrome://extensions` or `edge://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the project's `dist` folder.
5. Pin **OrbitNest** to the browser toolbar (if desired).
6. Click its icon to open the **concept dashboard** in a normal browser tab.

After code changes, run `npm run build` and click **Reload** on the extension card. The Vite dev server (`npm run dev`) is only a web preview, **not** the unpacked extension.

## How the launcher works

`public/manifest.json` registers a Manifest V3 toolbar action without a popup. `src/extension/background.ts` registers an `chrome.action.onClicked` listener that opens the bundled `index.html` using `chrome.runtime.getURL()`. Vite bundles the service worker to `dist/background.js` using a stable filename. No host permissions, tab-metadata permissions, content scripts, network requests or external services are used.

Each click currently opens another dashboard tab. Tab reuse and a smarter launcher are planned as a separate feature. Live tab metadata (including favicons) is planned later and will require a deliberate permission review.

## Developer scripts

```bash
npm run dev               # browser-only concept preview
npm run typecheck         # static TypeScript checks
npm run build             # production extension bundle
npm run verify:extension  # verify dist contents and mock toolbar click
```

Linting, comprehensive unit tests and GitHub CI are scheduled for upcoming PRs; this PR does not claim they exist.

## Project principles

- Tab metadata stays local. Never scrape web page bodies, email contents or passwords.
- Keep permissions minimal and visible.
- One meaningful, reviewable change per PR. No automatic merging.

See [ROADMAP](docs/ROADMAP.md), [PR-LOG](docs/PR-LOG.md) and [license](LICENSE).
