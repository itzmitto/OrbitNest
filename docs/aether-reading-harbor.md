# Reading harbor

**Category:** Knowledge workspace
**Entry point:** `aether.html#instruments/reading-harbor`

## User problem

Uses URL-path hints to suggest potential reading material, not actual reading progress.

## What the data means

The report reads current Chrome tab metadata. It does not fetch webpage content,
obtain browsing history or transmit information to a server. Its chart uses the
deterministic `evaluateReadingHarbor` buckets and `segmentReadingHarbor` ranking.

## Safe behavior

These classifications are guesses based on URLs. They do not read the pages themselves.

No tabs are closed, muted, pinned, moved or restored automatically by this report.
An explicitly clicked browser action elsewhere in the cockpit is a separate step.

## Engineering checks

- Pure calculation: `tests/aether/instruments/reading-harbor/analysis.test.mjs`
- Chart normalization: `tests/aether/instruments/reading-harbor/segments.test.mjs`
- Explanation guard: `tests/aether/instruments/reading-harbor/advice.test.mjs`
- View wiring: `tests/aether/instruments/reading-harbor/view.test.mjs`

Each instrument is individually reachable from the Aether mission catalog and
can be reviewed as one self-contained Pull Request.
