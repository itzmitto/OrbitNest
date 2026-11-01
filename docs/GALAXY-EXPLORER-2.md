# OrbitNest Galaxy Explorer 2

This release extends the live browser-tab universe. It does not read webpage content.

## New capabilities

- Crowded planet labels are collision-aware, with focused worlds always prioritized.
- Navigate visible planets with `[` and `]`, then press Enter to activate the existing browser tab.
- Visible galaxy telemetry summarizes worlds, window sectors, families, pinned and audible tabs.
- Three local palette moods: Midnight, Aurora and Supernova.
- Star budgets scale to match battery and reduced-motion settings.
- Fullscreen uses an explicit click and leaves the underlying tab graph unchanged.
- The selected planet inspector can pin, mute (when audible) and confirm a close action.
- Focused planets receive a halo that works in both WebGL and Canvas fallback.
- Search the 3D graph independently by website title, domain and planet family.
- A native keyboard help disclosure documents the controls.

## Privacy, accessibility and performance

All tab actions operate on existing browser tab IDs. Closing a tab still needs user confirmation. Preferences remain local; failed storage operations are handled. Fullscreen can be exited with Escape. Reduced-motion users do not receive selection-halo animation.

## Validation

Run `npm run check` before publishing. Chrome and Edge user-interface behavior must still be verified with a loaded unpacked extension. GitHub CLI authentication is not required by this release's Windows commit-and-push installer.
