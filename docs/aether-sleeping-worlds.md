# Sleeping worlds

**Category:** Browser performance
**Entry point:** `aether.html#instruments/sleeping-worlds`

## User problem

Shows tabs the browser reports as discarded; no memory usage is estimated.

## What the data means

The report reads current Chrome tab metadata. It does not fetch webpage content,
obtain browsing history or transmit information to a server. Its chart uses the
deterministic `evaluateSleepingWorlds` buckets and `segmentSleepingWorlds` ranking.

## Safe behavior

Discarded indicates a browser lifecycle status, not proof that a tab is unused.

No tabs are closed, muted, pinned, moved or restored automatically by this report.
An explicitly clicked browser action elsewhere in the cockpit is a separate step.

## Engineering checks

- Pure calculation: `tests/aether/instruments/sleeping-worlds/analysis.test.mjs`
- Chart normalization: `tests/aether/instruments/sleeping-worlds/segments.test.mjs`
- Explanation guard: `tests/aether/instruments/sleeping-worlds/advice.test.mjs`
- View wiring: `tests/aether/instruments/sleeping-worlds/view.test.mjs`

Each instrument is individually reachable from the Aether mission catalog and
can be reviewed as one self-contained Pull Request.
