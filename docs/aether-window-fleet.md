# Window fleet navigator

**Category:** Workspace layout
**Entry point:** `aether.html#instruments/window-fleet`

## User problem

Summarizes each open browser window, including pinned tabs and website diversity.

## What the data means

The report reads current Chrome tab metadata. It does not fetch webpage content,
obtain browsing history or transmit information to a server. Its chart uses the
deterministic `evaluateWindowFleet` buckets and `segmentWindowFleet` ranking.

## Safe behavior

Window identifiers are temporary runtime values and are not permanent workspace names.

No tabs are closed, muted, pinned, moved or restored automatically by this report.
An explicitly clicked browser action elsewhere in the cockpit is a separate step.

## Engineering checks

- Pure calculation: `tests/aether/instruments/window-fleet/analysis.test.mjs`
- Chart normalization: `tests/aether/instruments/window-fleet/segments.test.mjs`
- Explanation guard: `tests/aether/instruments/window-fleet/advice.test.mjs`
- View wiring: `tests/aether/instruments/window-fleet/view.test.mjs`

Each instrument is individually reachable from the Aether mission catalog and
can be reviewed as one self-contained Pull Request.
