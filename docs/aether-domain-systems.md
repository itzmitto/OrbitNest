# Domain star systems

**Category:** Galaxy intelligence
**Entry point:** `aether.html#instruments/domain-systems`

## User problem

Groups open tabs by normalized host. This counts current tabs only, not browsing history.

## What the data means

The report reads current Chrome tab metadata. It does not fetch webpage content,
obtain browsing history or transmit information to a server. Its chart uses the
deterministic `evaluateDomainSystems` buckets and `segmentDomainSystems` ranking.

## Safe behavior

Try exploring the largest systems first, then close tabs you no longer need.

No tabs are closed, muted, pinned, moved or restored automatically by this report.
An explicitly clicked browser action elsewhere in the cockpit is a separate step.

## Engineering checks

- Pure calculation: `tests/aether/instruments/domain-systems/analysis.test.mjs`
- Chart normalization: `tests/aether/instruments/domain-systems/segments.test.mjs`
- Explanation guard: `tests/aether/instruments/domain-systems/advice.test.mjs`
- View wiring: `tests/aether/instruments/domain-systems/view.test.mjs`

Each instrument is individually reachable from the Aether mission catalog and
can be reviewed as one self-contained Pull Request.
