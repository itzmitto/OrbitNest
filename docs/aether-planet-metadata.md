# Planet metadata quality

**Category:** Workspace insights
**Entry point:** `aether.html#instruments/planet-metadata`

## User problem

Reviews basic title metadata without scanning page content.

## What the data means

The report reads current Chrome tab metadata. It does not fetch webpage content,
obtain browsing history or transmit information to a server. Its chart uses the
deterministic `evaluatePlanetMetadata` buckets and `segmentPlanetMetadata` ranking.

## Safe behavior

A missing title usually reflects browser loading or website metadata, not an error in OrbitNest.

No tabs are closed, muted, pinned, moved or restored automatically by this report.
An explicitly clicked browser action elsewhere in the cockpit is a separate step.

## Engineering checks

- Pure calculation: `tests/aether/instruments/planet-metadata/analysis.test.mjs`
- Chart normalization: `tests/aether/instruments/planet-metadata/segments.test.mjs`
- Explanation guard: `tests/aether/instruments/planet-metadata/advice.test.mjs`
- View wiring: `tests/aether/instruments/planet-metadata/view.test.mjs`

Each instrument is individually reachable from the Aether mission catalog and
can be reviewed as one self-contained Pull Request.
