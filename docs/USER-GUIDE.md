# OrbitNest — User Guide

## Install

1. Run `npm ci && npm run check` in the repository.
2. Open `chrome://extensions` or `edge://extensions`.
3. Enable Developer mode, select **Load unpacked**, choose the project's `dist` directory.
4. Click the OrbitNest action icon in your browser toolbar.

## Privacy

- The browser's `tabs` permission provides URLs, titles and favicon metadata. No page content is read.
- The extension has no host permissions, content scripts or remote synchronization endpoints.
- Incognito tabs are excluded from the tab model.
- Favorites and named sessions use browser-local extension storage.
- Session saving and session restoration happen only when requested.

## Interaction

- View open tabs as cards, Galaxy List, or Canvas planets.
- Search by site/title, group by window or domain, and sort the visible result.
- Press `/` to focus Search, `L` for List and `G` for Graph.
- Drag the Canvas to pan, use the +/- buttons to zoom, and click a planet to activate the original tab.
- Use the favorite star and optional favorite-only filter for your most important tabs.
- Closing a tab and restoring a session require confirmation.
- Before restoring many tabs, check available memory and session size.

## Troubleshooting

If the extension shows the sample tabs, you are running the normal Vite web preview instead of the installed extension.
Reload the extension and refresh its dashboard tab after rebuilding `dist`.
If browser permissions change during development, remove and reinstall the unpacked extension.

## Accessibility

Galaxy List is the primary keyboard-friendly alternative to Canvas. Focus outlines and `prefers-reduced-motion` are supported.
