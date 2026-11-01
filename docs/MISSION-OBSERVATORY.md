# Mission Observatory

OrbitNest computes statistics in React from the tab metadata already available to its extension. The Observatory has no network connection, no analytics telemetry endpoint, and no background tracking. The report copies only aggregate labels, values, and categories.

## Use

Open the Universe dashboard and find **Mission observatory** above the tab visualization. Filter by category or search the metrics. Explore further signals with **Explore all**. The optional copy button writes a summary to the clipboard after an explicit click.

## Accessibility

Controls are keyboard accessible. All metric values are text, not color-only indicators. Animations respect reduced motion preferences. No permission is requested to read website contents.

## Testing

`npm run check` runs TypeScript checks, tests, Vite build, and Manifest V3 validation.
