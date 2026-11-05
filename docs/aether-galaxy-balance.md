# Galaxy balance monitor

**Category:** Workspace insights
**Entry point:** `aether.html#instruments/galaxy-balance`

## User problem

Uses the Herfindahl concentration index of current tab-domain counts.

## What the data means

The report reads current Chrome tab metadata. It does not fetch webpage content,
obtain browsing history or transmit information to a server. Its chart uses the
deterministic `evaluateGalaxyBalance` buckets and `segmentGalaxyBalance` ranking.

## Safe behavior

Concentration is descriptive; working in one application can be perfectly reasonable.

No tabs are closed, muted, pinned, moved or restored automatically by this report.
An explicitly clicked browser action elsewhere in the cockpit is a separate step.

## Engineering checks

- Pure calculation: `tests/aether/instruments/galaxy-balance/analysis.test.mjs`
- Chart normalization: `tests/aether/instruments/galaxy-balance/segments.test.mjs`
- Explanation guard: `tests/aether/instruments/galaxy-balance/advice.test.mjs`
- View wiring: `tests/aether/instruments/galaxy-balance/view.test.mjs`

Each instrument is individually reachable from the Aether mission catalog and
can be reviewed as one self-contained Pull Request.
