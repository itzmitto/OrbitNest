# OrbitNest Universe navigation

OrbitNest is a local-only Chrome/Edge extension. The visual map uses the browser Tabs API and never reads page bodies.

## Controls

- Scroll over the map to zoom around the pointer. Ctrl+wheel remains available for browser-level gestures.
- Drag empty space to pan. Click a planet to switch to its existing tab.
- Focus the canvas and use arrow keys to pan; `+` and `-` zoom; `0` resets the camera.
- Use **Space environment** for Deep Space, Nebula or Starlight.
- Switch **Orbits** on/off; filter by **Planet family**.
- Set rotation speed to Drift, Normal or Hyperdrive. Reduced-motion system settings override motion.
- Press **Ctrl+K** (or **Cmd+K**) for Quick Switch, use arrows and Enter to activate tabs.
- The **List** view remains available for accessible keyboard-based tab navigation.
- Camera state and visual preferences are saved only in this extension's browser-local storage.

## Development checks

Run `npm run check` before shipping. Reload the unpacked extension from `chrome://extensions` after `npm run build`.

## Safety

Local changes are not committed unless checks pass. The batch installer does not reset, force push, erase stashes or change `.gitattributes`.
