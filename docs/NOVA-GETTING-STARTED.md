# OrbitNest Nova

Open `aether.html#nova` from the extension dashboard or select **Nova 3D cockpit** in Aether's navigation.

Nova reuses Aether's WebGL planetary engine and the local Chrome Tabs API. It does not fetch a remote account, upload tab URLs or add permissions to the extension manifest.

## Basic controls

- Drag in the star map to rotate the view, and scroll to zoom.
- Click a planet to inspect its browser tab.
- Use **Cinematic orbit** for a slow automatic camera tour.
- Search to narrow the current tab constellation.
- The app uses demonstration tabs outside a Chrome extension. Actions requiring tab permissions are disabled there.

## Safety

Session backups include only web URLs. They exclude internal browser pages, and no session is restored without a direct confirmation.
## Explore the new tools

- **Star systems** groups domain planets and shows relationships when websites share a browser window.
- **Sessions** stores up to 30 local snapshots with no internal browser URLs. Restoring tabs always asks permission first.
- **Focus mission** suggests useful tasks and allows an explicit, per-tab mute action.
- **Duplicate scanner** protects active and pinned tabs. Closing duplicates requires confirmation.
- **Observatory** displays tab distribution and window counts without collecting historical analytics.
- **Command deck** is available with `Ctrl+K` or `Command+K`, and `Escape` closes it.
- **Preferences** stores themes, display density and motion preferences locally.

## Accessibility, reliability and privacy

All tab names are inserted using `textContent`, not untrusted HTML. Tab exports are versioned and only include HTTP(S) addresses. Reduce Motion disables cinematic camera controls. Diagnostics explain missing WebGL2 support. You can switch back to the previous Aether dashboard without resetting data.

The new interface is based on the existing WebGL2 renderer and does not increase extension permissions. Its code is meant to be reviewed and built against the real repository before publication.
