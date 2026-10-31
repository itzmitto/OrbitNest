# OrbitNest — Cosmic Control Center

The dashboard is deliberately structured around the live 3D tab universe, not a screenshot or marketing mockup.

## Functional scope

- Real `chrome.tabs` metadata stays local to the browser.
- Every accessible tab stays a separate planet, including tabs with the same domain.
- Select between Universe, Cards and List without losing search, sorting or domain/window grouping.
- Search and favorites filters apply to all three views.
- Tab activation uses the existing tab ID and its window ID.
- Muting, pinning and closing remain explicit browser actions.
- Session storage is local; restoration requires confirmation.
- Keyboard shortcuts `/`, `L` and `G` remain available.

## Visual approach

Space is built with layered CSS gradients, procedurally shaded WebGL spheres and vector orbits. No tracking, CDN, font requests, external images or remote textures were introduced.

## Quality checklist

- Browser tab data does not leave the device.
- Distinguish preview tabs from live data.
- Maintain an accessible List mode for keyboard navigation.
- Respect OS `prefers-reduced-motion` and `forced-colors`.
- Use CSS breakpoints for narrower screens.
- Run `npm run check` before updating the unpacked extension.
