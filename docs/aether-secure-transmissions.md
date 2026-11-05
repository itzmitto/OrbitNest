# Protocol sentinel

**Category:** Security awareness
**Entry point:** `aether.html#instruments/secure-transmissions`

## User problem

Classifies the transport scheme reported for each open tab; it is not a website security audit.

## What the data means

The report reads current Chrome tab metadata. It does not fetch webpage content,
obtain browsing history or transmit information to a server. Its chart uses the
deterministic `evaluateSecureTransmissions` buckets and `segmentSecureTransmissions` ranking.

## Safe behavior

HTTPS encrypts transport, but it does not guarantee that a website is trustworthy.

No tabs are closed, muted, pinned, moved or restored automatically by this report.
An explicitly clicked browser action elsewhere in the cockpit is a separate step.

## Engineering checks

- Pure calculation: `tests/aether/instruments/secure-transmissions/analysis.test.mjs`
- Chart normalization: `tests/aether/instruments/secure-transmissions/segments.test.mjs`
- Explanation guard: `tests/aether/instruments/secure-transmissions/advice.test.mjs`
- View wiring: `tests/aether/instruments/secure-transmissions/view.test.mjs`

Each instrument is individually reachable from the Aether mission catalog and
can be reviewed as one self-contained Pull Request.
