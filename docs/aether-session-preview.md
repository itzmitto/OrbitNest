# Session launch preview

**Category:** Session management
**Entry point:** `aether.html#instruments/session-preview`

## User problem

Lists restorable web addresses by window without writing to storage.

## What the data means

The report reads current Chrome tab metadata. It does not fetch webpage content,
obtain browsing history or transmit information to a server. Its chart uses the
deterministic `evaluateSessionPreview` buckets and `segmentSessionPreview` ranking.

## Safe behavior

You can use the existing Zenith Sessions page to save or restore tab sets.

No tabs are closed, muted, pinned, moved or restored automatically by this report.
An explicitly clicked browser action elsewhere in the cockpit is a separate step.

## Engineering checks

- Pure calculation: `tests/aether/instruments/session-preview/analysis.test.mjs`
- Chart normalization: `tests/aether/instruments/session-preview/segments.test.mjs`
- Explanation guard: `tests/aether/instruments/session-preview/advice.test.mjs`
- View wiring: `tests/aether/instruments/session-preview/view.test.mjs`

Each instrument is individually reachable from the Aether mission catalog and
can be reviewed as one self-contained Pull Request.
