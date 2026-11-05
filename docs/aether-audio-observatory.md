# Audio radar

**Category:** Live browser
**Entry point:** `aether.html#instruments/audio-observatory`

## User problem

Separates tabs currently emitting audio, muted tabs and silent tabs using Chrome tab metadata.

## What the data means

The report reads current Chrome tab metadata. It does not fetch webpage content,
obtain browsing history or transmit information to a server. Its chart uses the
deterministic `evaluateAudioObservatory` buckets and `segmentAudioObservatory` ranking.

## Safe behavior

Muted does not mean a tab is currently playing. Audible and muted are separate browser flags.

No tabs are closed, muted, pinned, moved or restored automatically by this report.
An explicitly clicked browser action elsewhere in the cockpit is a separate step.

## Engineering checks

- Pure calculation: `tests/aether/instruments/audio-observatory/analysis.test.mjs`
- Chart normalization: `tests/aether/instruments/audio-observatory/segments.test.mjs`
- Explanation guard: `tests/aether/instruments/audio-observatory/advice.test.mjs`
- View wiring: `tests/aether/instruments/audio-observatory/view.test.mjs`

Each instrument is individually reachable from the Aether mission catalog and
can be reviewed as one self-contained Pull Request.
