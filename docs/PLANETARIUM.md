# OrbitNest Planetarium — 3D Universe Graph

The Universe Graph uses a local WebGL2 renderer to draw seven distinct procedurally shaded sphere types: ocean, gas giant, volcanic, ice, desert, forest and amethyst. Each tab is one planet; tabs from the same domain use the same family, while individual tabs retain their own positions and spin speeds. Some worlds have animated ring systems.

No external textures, servers, analytics, APIs, CDN scripts or additional NPM dependencies are required. Each surface is generated inside the GLSL fragment shader. The underlying Chrome Tabs API, browsing metadata boundaries, grouping, Galaxy List and tab actions remain unchanged.

## Interactions

- Click a planet to focus its existing browser tab.
- Drag the backdrop to pan the system.
- Use the on-screen `+`, `−` and `Reset` buttons to zoom or recenter.
- Use `Pause` to stop the animation. System `prefers-reduced-motion` stops rotation automatically.
- Hover a planet to see its full tab title. `Galaxy List` remains the keyboard-accessible alternative.
- When WebGL2 is unavailable, the app falls back to its earlier 2D renderer.

## Performance and privacy

Animation uses `requestAnimationFrame` and is cleaned up on unmount. The renderer caps device-pixel ratio at 2, reduces frame rate for large tab counts and omits labels for more than 80 planets. It does not load website content, request additional extension permissions or send tab data anywhere.

## Development

Run `npm run check` and then reload the unpacked extension from `chrome://extensions` or `edge://extensions`. A normal `npm run dev` page can preview the design using demonstration tabs, but only the extension has access to live browser tab metadata.
