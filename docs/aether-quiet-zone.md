# Quiet zone planning

**Category:** Focus workflow
**Entry point:** `aether.html#instruments/quiet-zone`

## User problem

Finds silent and non-active tabs that could be placed into a separate workspace.

## What the data means

The report reads current Chrome tab metadata. It does not fetch webpage content,
obtain browsing history or transmit information to a server. Its chart uses the
deterministic `evaluateQuietZone` buckets and `segmentQuietZone` ranking.

## Safe behavior

The tool does not close, mute or move tabs automatically. It only offers a snapshot.

No tabs are closed, muted, pinned, moved or restored automatically by this report.
An explicitly clicked browser action elsewhere in the cockpit is a separate step.

## Engineering checks

- Pure calculation: `tests/aether/instruments/quiet-zone/analysis.test.mjs`
- Chart normalization: `tests/aether/instruments/quiet-zone/segments.test.mjs`
- Explanation guard: `tests/aether/instruments/quiet-zone/advice.test.mjs`
- View wiring: `tests/aether/instruments/quiet-zone/view.test.mjs`

Each instrument is individually reachable from the Aether mission catalog and
can be reviewed as one self-contained Pull Request.
