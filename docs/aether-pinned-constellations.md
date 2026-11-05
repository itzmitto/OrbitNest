# Pinned constellations

**Category:** Tab hygiene
**Entry point:** `aether.html#instruments/pinned-constellations`

## User problem

Surfaces pinned tabs grouped by domain and shows which are concentrated in each window.

## What the data means

The report reads current Chrome tab metadata. It does not fetch webpage content,
obtain browsing history or transmit information to a server. Its chart uses the
deterministic `evaluatePinnedConstellations` buckets and `segmentPinnedConstellations` ranking.

## Safe behavior

Pinned tabs are usually persistent references, not necessarily the tabs you use most.

No tabs are closed, muted, pinned, moved or restored automatically by this report.
An explicitly clicked browser action elsewhere in the cockpit is a separate step.

## Engineering checks

- Pure calculation: `tests/aether/instruments/pinned-constellations/analysis.test.mjs`
- Chart normalization: `tests/aether/instruments/pinned-constellations/segments.test.mjs`
- Explanation guard: `tests/aether/instruments/pinned-constellations/advice.test.mjs`
- View wiring: `tests/aether/instruments/pinned-constellations/view.test.mjs`

Each instrument is individually reachable from the Aether mission catalog and
can be reviewed as one self-contained Pull Request.
