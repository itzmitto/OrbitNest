# OrbitNest Zenith — next-generation browser universe

Zenith adds **six independent routes** to the existing OrbitNest extension, not a replacement for the previous classic Universe, Galaxy Lab or Galaxy Studio.

- `planetarium.html`: actual WebGL2 sphere meshes with procedural shader materials, planet selection, camera rotation and safe actions.
- `atlas.html`: domain star systems, search, sort and tab details.
- `observatory.html`: on-device metrics, group charts and signal registry.
- `sessions.html`: save, JSON export/import, delete and explicitly restore web tabs.
- `mission-control.html`: discover duplicates and close them only after explicit confirmation.
- `preferences.html`: private, persistent color and motion settings.

The launcher is installed into the existing dashboard by the package installer. Each route is included in the Vite multi-page build. No password or webpage body is accessed. The local demo shown outside the extension is sample data, not actual user tabs.

## Controls

Drag to rotate the planetarium; scroll to zoom. Click a planet to inspect it. Use the tab list and the inspector to activate, pin or mute tabs. Galaxy Atlas and Observatory require no elevated privileges. Session import is validated and limited to 1 MB; restoring tabs always requires confirmation.

## Testing

The installer runs `npm run check`, including existing tests and the production build, before pushing anything to GitHub. For local inspection run `npm run dev` and open `/planetarium.html`.
