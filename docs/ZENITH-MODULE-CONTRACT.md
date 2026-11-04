# TypeScript and runtime module contract

Zenith uses fully qualified local `.ts` imports. This is supported by Vite's bundler resolver and Node 24's built-in TypeScript stripping. The project TypeScript compiler must permit TypeScript extension imports with `allowImportingTsExtensions: true` and `noEmit: true`.

A browser page never needs external font downloads or extension privileges beyond the existing tabs permission. Unit tests are plain Node 24 tests and do not require a browser or network.

## Add an instrument

Add the instrument in its own file, test it, then import it into its typed registry. Every selectable orbit or tab lens is required to accept an empty list and produce finite values. UI consumes the registry at runtime; these are not placeholder feature flags.
