# Developer hangar

**Category:** Project workflow
**Entry point:** `aether.html#instruments/developer-hangar`

## User problem

Recognizes common development hosts and URL patterns in your open browser tabs.

## What the data means

The report reads current Chrome tab metadata. It does not fetch webpage content,
obtain browsing history or transmit information to a server. Its chart uses the
deterministic `evaluateDeveloperHangar` buckets and `segmentDeveloperHangar` ranking.

## Safe behavior

This is a convenience categorization based on public hostnames, not a judgment about your work.

No tabs are closed, muted, pinned, moved or restored automatically by this report.
An explicitly clicked browser action elsewhere in the cockpit is a separate step.

## Engineering checks

- Pure calculation: `tests/aether/instruments/developer-hangar/analysis.test.mjs`
- Chart normalization: `tests/aether/instruments/developer-hangar/segments.test.mjs`
- Explanation guard: `tests/aether/instruments/developer-hangar/advice.test.mjs`
- View wiring: `tests/aether/instruments/developer-hangar/view.test.mjs`

Each instrument is individually reachable from the Aether mission catalog and
can be reviewed as one self-contained Pull Request.
