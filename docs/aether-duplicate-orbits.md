# Duplicate planet finder

**Category:** Tab hygiene
**Entry point:** `aether.html#instruments/duplicate-orbits`

## User problem

Finds matching web addresses after removing fragments and trailing slashes. Queries are preserved.

## What the data means

The report reads current Chrome tab metadata. It does not fetch webpage content,
obtain browsing history or transmit information to a server. Its chart uses the
deterministic `evaluateDuplicateOrbits` buckets and `segmentDuplicateOrbits` ranking.

## Safe behavior

Open each matching group before removing copies. The tool never closes tabs automatically.

No tabs are closed, muted, pinned, moved or restored automatically by this report.
An explicitly clicked browser action elsewhere in the cockpit is a separate step.

## Engineering checks

- Pure calculation: `tests/aether/instruments/duplicate-orbits/analysis.test.mjs`
- Chart normalization: `tests/aether/instruments/duplicate-orbits/segments.test.mjs`
- Explanation guard: `tests/aether/instruments/duplicate-orbits/advice.test.mjs`
- View wiring: `tests/aether/instruments/duplicate-orbits/view.test.mjs`

Each instrument is individually reachable from the Aether mission catalog and
can be reviewed as one self-contained Pull Request.
