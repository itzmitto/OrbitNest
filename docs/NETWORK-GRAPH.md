# OrbitNest / Constellation Network

The network view is inspired by spatial knowledge-graph navigation, but it **does not pretend that websites link to each other**. A graph edge represents one of two relationships available through the Chrome Tabs API:

- **Same domain**: two distinct open tabs share a domain. This is the default strong relationship.
- **Same browser window**: a lighter, optional connection. A window is a real browser container, not an inferred semantic relationship.

No page bodies, emails, password fields, history or remote APIs are used.

## Visual language

The graph is intentionally distinct from the WebGL 3D Universe. The Universe retains its rotating textured planets. The graph depicts open tabs as small shaded worlds, clusters with gentle halos, and actual metadata-derived connections on a dark canvas. Switch modes using the view picker in the dashboard.

## Interaction

- **Drag** the map to pan; **wheel** to zoom around the pointer.
- Press **arrow keys** to pan, **+ / -** to zoom, or **Home** to fit all worlds.
- **Click a world** to activate its existing browser tab.
- Choose **Group by** domain or browser window; use pinned, playing or active filters.
- Change the palette, show/hide links or disable animation.
- The mini-map gives a summary of node positions. The right-hand list is usable without a pointer.

**Privacy:** Only browser-tab metadata reaches this component. The inspector intentionally does not show the full URL, which could contain sensitive query parameters. Settings are stored locally.

## Performance and limits

Connections are bounded (no complete pairwise domain graph). The force layout does at most 32 iterations, and for >350 tabs uses the stable radial positions directly. The label layer shows only a limited set of non-overlapping labels. Canvas rendering uses DPR at most 2 and pauses continuous animation when the page is hidden or reduced motion is requested.

## Checks

Run `npm run check` to execute the project's existing TypeScript check, Node test suite, Vite build and extension validation. Then reload `dist` in `chrome://extensions` and verify the actual GPU/WebGL planet view manually.
