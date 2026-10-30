# OrbitNest Roadmap

The 120 work packages in the original project plan are **candidates**, not a PR quota. A PR is justified only by independently reviewable value.

## Milestones

| Phase | Scope | Status |
| --- | --- | --- |
| 01 | Repository and developer tooling | In progress (MV3 installer added in PR #002) |
| 02 | Tabs and windows APIs, state updates | Planned |
| 03 | Dashboard layout, navigation and themes | Planned |
| 04 | Planet rendering and favicons | Planned |
| 05 | Graph layout and grouping | Planned |
| 06 | Zoom, pan, selection and keyboard input | Planned |
| 07 | Search, filters and duplicate detection | Planned |
| 08 | Tab/window actions | Planned |
| 09 | Session persistence | Planned |
| 10 | Privacy and accessibility | Planned |
| 11 | Testing and performance | Planned |
| 12 | Releases, polish and optional Ada planning | Planned |

## Initial PR sequence

1. `chore: initialize OrbitNest workspace` — Vite, React, TypeScript and build scripts.
2. `chore: add Manifest V3 extension config` — manifest, installable bundle, PNG icons, basic launcher and package verification.
3. `chore: configure linting and formatting` — ESLint and Prettier.
4. `test: establish unit test infrastructure` — Vitest and initial tests.
5. `ci: add pull request validation workflow` — typecheck, lint, test, build.
6. `feat: improve extension dashboard launcher` — reuse an existing dashboard tab and focus its window.
7. `feat: create responsive dashboard shell` — real interface layout.
8. `feat: implement browser tab discovery` — query tab metadata locally.
9. `feat: normalize browser tab metadata` — deterministic model and fallbacks.
10. `feat: render initial planet nodes` — each browser tab appears as a node.
11. `feat: add website favicons to nodes` — favicon with safe fallback.
12. `feat: activate existing tab from planet` — focus existing tab/window.
13. `feat: sync newly opened browser tabs` — live creation/navigation updates.
14. `feat: sync closed browser tabs` — removal events.
15. `feat: add pan and zoom controls` — pointer/touchpad controls.
16. `feat: implement domain-based clusters` — clear group semantics.

## PR quality gate

Every PR must include its rationale, implementation, acceptance criteria and only actually performed test results. A PR must never auto-merge.
