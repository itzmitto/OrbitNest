# Restore safety preview

**Category:** Session management
**Entry point:** `aether.html#instruments/restore-preflight`

## User problem

Classifies open tab URLs for session backup eligibility and duplicates without opening anything.

## What the data means

The report reads current Chrome tab metadata. It does not fetch webpage content,
obtain browsing history or transmit information to a server. Its chart uses the
deterministic `evaluateRestorePreflight` buckets and `segmentRestorePreflight` ranking.

## Safe behavior

Only HTTP(S) pages are eligible for the current Zenith session restoration API.

No tabs are closed, muted, pinned, moved or restored automatically by this report.
An explicitly clicked browser action elsewhere in the cockpit is a separate step.

## Engineering checks

- Pure calculation: `tests/aether/instruments/restore-preflight/analysis.test.mjs`
- Chart normalization: `tests/aether/instruments/restore-preflight/segments.test.mjs`
- Explanation guard: `tests/aether/instruments/restore-preflight/advice.test.mjs`
- View wiring: `tests/aether/instruments/restore-preflight/view.test.mjs`

Each instrument is individually reachable from the Aether mission catalog and
can be reviewed as one self-contained Pull Request.
