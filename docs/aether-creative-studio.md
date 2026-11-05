# Creative studio systems

**Category:** Creative workflow
**Entry point:** `aether.html#instruments/creative-studio`

## User problem

Finds familiar art, video and design services among current browser tabs.

## What the data means

The report reads current Chrome tab metadata. It does not fetch webpage content,
obtain browsing history or transmit information to a server. Its chart uses the
deterministic `evaluateCreativeStudio` buckets and `segmentCreativeStudio` ranking.

## Safe behavior

Creative categories are approximate and do not reveal or read private artwork.

No tabs are closed, muted, pinned, moved or restored automatically by this report.
An explicitly clicked browser action elsewhere in the cockpit is a separate step.

## Engineering checks

- Pure calculation: `tests/aether/instruments/creative-studio/analysis.test.mjs`
- Chart normalization: `tests/aether/instruments/creative-studio/segments.test.mjs`
- Explanation guard: `tests/aether/instruments/creative-studio/advice.test.mjs`
- View wiring: `tests/aether/instruments/creative-studio/view.test.mjs`

Each instrument is individually reachable from the Aether mission catalog and
can be reviewed as one self-contained Pull Request.
