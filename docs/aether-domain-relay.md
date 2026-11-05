# Cross-window domain relay

**Category:** Workspace layout
**Entry point:** `aether.html#instruments/domain-relay`

## User problem

Detects domains present in multiple windows to make project separation easier.

## What the data means

The report reads current Chrome tab metadata. It does not fetch webpage content,
obtain browsing history or transmit information to a server. Its chart uses the
deterministic `evaluateDomainRelay` buckets and `segmentDomainRelay` ranking.

## Safe behavior

Windows can contain purposeful overlaps; repeated domains are not automatically duplicates.

No tabs are closed, muted, pinned, moved or restored automatically by this report.
An explicitly clicked browser action elsewhere in the cockpit is a separate step.

## Engineering checks

- Pure calculation: `tests/aether/instruments/domain-relay/analysis.test.mjs`
- Chart normalization: `tests/aether/instruments/domain-relay/segments.test.mjs`
- Explanation guard: `tests/aether/instruments/domain-relay/advice.test.mjs`
- View wiring: `tests/aether/instruments/domain-relay/view.test.mjs`

Each instrument is individually reachable from the Aether mission catalog and
can be reviewed as one self-contained Pull Request.
