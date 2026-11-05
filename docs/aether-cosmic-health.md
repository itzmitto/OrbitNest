# Cosmic workspace health

**Category:** Workspace insights
**Entry point:** `aether.html#instruments/cosmic-health`

## User problem

A transparent heuristic of currently open tabs, not a security, productivity or health assessment.

## What the data means

The report reads current Chrome tab metadata. It does not fetch webpage content,
obtain browsing history or transmit information to a server. Its chart uses the
deterministic `evaluateCosmicHealth` buckets and `segmentCosmicHealth` ranking.

## Safe behavior

A lower score only means more open-tab hygiene signals; it is not a judgment on your productivity.

No tabs are closed, muted, pinned, moved or restored automatically by this report.
An explicitly clicked browser action elsewhere in the cockpit is a separate step.

## Engineering checks

- Pure calculation: `tests/aether/instruments/cosmic-health/analysis.test.mjs`
- Chart normalization: `tests/aether/instruments/cosmic-health/segments.test.mjs`
- Explanation guard: `tests/aether/instruments/cosmic-health/advice.test.mjs`
- View wiring: `tests/aether/instruments/cosmic-health/view.test.mjs`

Each instrument is individually reachable from the Aether mission catalog and
can be reviewed as one self-contained Pull Request.
