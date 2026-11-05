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

## GPU details and cinematic camera

The existing WebGL2 shaders now layer planet materials with a texture noise field,
a colored atmosphere and more visible nightside detail. Both vertex and index buffers
are explicitly released when the renderer unmounts. Camera tours are opt-in: Orbit
and Flyover buttons update the existing renderer's camera state without a second WebGL
context. The tour frame loop stops on route changes and respects reduced-motion settings.

For performance, the `chooseRenderBudget()` helper provides device pixel ratio,
mesh density and star-count targets. It is intentionally separate from the core
renderer so unsupported GPU configurations can retain the existing known-good path.
