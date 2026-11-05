# Galaxy title explorer

**Category:** Discovery
**Entry point:** `aether.html#instruments/tab-search`

## User problem

Extracts frequently repeated title terms to surface topics across currently open tabs.

## What the data means

The report reads current Chrome tab metadata. It does not fetch webpage content,
obtain browsing history or transmit information to a server. Its chart uses the
deterministic `evaluateTabSearch` buckets and `segmentTabSearch` ranking.

## Safe behavior

Term frequency is based on page titles only. It does not inspect website content.

No tabs are closed, muted, pinned, moved or restored automatically by this report.
An explicitly clicked browser action elsewhere in the cockpit is a separate step.

## Engineering checks

- Pure calculation: `tests/aether/instruments/tab-search/analysis.test.mjs`
- Chart normalization: `tests/aether/instruments/tab-search/segments.test.mjs`
- Explanation guard: `tests/aether/instruments/tab-search/advice.test.mjs`
- View wiring: `tests/aether/instruments/tab-search/view.test.mjs`

Each instrument is individually reachable from the Aether mission catalog and
can be reviewed as one self-contained Pull Request.
