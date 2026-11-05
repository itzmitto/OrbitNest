# OrbitNest Aether cockpit

Aether is an alternative local-first interface built on the existing Zenith WebGL renderer.

## Entry points

- `aether.html`: new, optional browser-extension page.
- `src/aether/main.ts`: routing, 3D scene and browser-safe controls.
- `src/aether/ui/scene.ts`: reuses Zenith's WebGL2 renderer and camera.
- `src/aether/core/helpers.ts`: deterministic tab calculations.
- `src/aether/registry.ts`: tested instruments registered by follow-up PRs.

This interface is designed to work without remote fonts, CDNs or a user account.
Only the Chrome extension context may mutate tabs. Demo data is clearly labeled and actions
requiring browser permissions are disabled in ordinary web previews.

## Validation

Run `npm run check` and `node --test tests/aether/*.test.mjs` from the repository root.

## Browser behavior

Navigate to `aether.html`. The Planetarium shows real WebGL2 planet meshes when supported.
Use wheel/pointer on the canvas; the toolbar controls layouts, zoom and motion.
The Observatory reports metadata from currently open tabs only, not browsing history.
