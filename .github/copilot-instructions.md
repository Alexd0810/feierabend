# Copilot Instructions

## Build, test, and lint commands

- Enable the pinned package manager with `corepack enable`, then install dependencies with `pnpm install`.
- Start local development with `pnpm dev`.
- Build the production app with `pnpm build`. This runs `tsc -b` first, then builds the Vite app for GitHub Pages.
- Run the full test suite with `pnpm test`.
- Run a single test file with `pnpm exec jest --runTestsByPath src\components\__tests__\Header.test.tsx`.
- Run a single test case by name with `pnpm exec jest -t "renders the app title"`.
- Run the Playwright end-to-end suite with `pnpm test:e2e`.
- Run one Playwright spec with `pnpm test:e2e -- e2e/app.spec.ts`.
- Generate coverage locally with `pnpm test:coverage`.
- Use `pnpm test:ci` for the CI-style Jest run with coverage and JUnit output in `reports\junit.xml`.
- Run lint checks with `pnpm lint`.
- Run formatting checks with `pnpm format:check`.

## High-level architecture

- This is a single-page React 19 + TypeScript app built with Vite and deployed to GitHub Pages. The Vite base path is `/feierabend/`, so keep that in mind when changing routing or asset assumptions.
- `src\App.tsx` is the orchestration layer. It gathers state from hooks, derives the current schedule/timer state, and renders a mostly flat list of presentational sections.
- The app combines several state sources:
  - `useDayInfo` derives school/work/weekend mode once from the current date plus debug URL parameters.
  - `useTimetable` fetches today's timetable from the external Untis-style backend API, deduplicates lessons immediately, and refreshes every 5 minutes.
  - `useTimer` drives the live countdown with a 1-second interval.
  - `useSound` and `useMilestones` manage browser-only state persisted in `localStorage`.
- Business logic is intentionally pushed into pure helpers in `src\utils\time.ts` and `src\utils\lessons.ts`. Components usually receive already-derived props rather than recomputing schedule logic internally.
- Static content is data-driven. Quotes, excuses, milestone definitions, mascot states, and background video options live in `src\data\*.ts`, while the matching shared types live in `src\types\index.ts`.
- GitHub Actions is part of the normal flow:
  - `.github\workflows\ci.yml` runs `pnpm test:ci` on pushes and pull requests to `main`.
  - `.github\workflows\deploy.yml` builds the app and publishes `dist` to GitHub Pages on pushes to `main`.
- End-to-end coverage lives in `e2e\` and uses Playwright against a local Vite dev server defined in `playwright.config.ts`.

## Key conventions

- Keep app-wide constants and external endpoints in `src\config.ts`. Time thresholds, refresh intervals, and API URLs are centralized there instead of being repeated inside components.
- Model schedule times as **minutes since midnight** (`startMin`, `endMin`, `DAY_START_MIN`, `WORK_DAY_END_MIN`). Reuse the utilities in `src\utils\time.ts` for conversions and countdown math instead of introducing alternate time representations.
- Normalize lesson data at the boundary. `useTimetable` deduplicates API lessons before they enter app state, and the rest of the app assumes lessons are already sorted/cleaned.
- Preserve the current split of responsibilities:
  - hooks manage time, fetching, persistence, and derived app state,
  - `utils` contains pure schedule/time logic,
  - `components` are mostly presentational sections,
  - `data` files hold editable content/configured options.
- When adding a new top-level UI section, follow the existing pattern from `App.tsx`: create a standalone component in `src\components\`, import it into `App.tsx`, and wire it into the non-loading/non-error render path.
- Debugging day selection is done through URL parameters: `?mode=school|work|weekend&week=even|odd`. Keep that mechanism working when changing day or schedule logic.
- When extending content keyed by unions, update both the type definition and the data record. For example, new background video channels require changes in both `src\types\index.ts` and `src\data\videos.ts`.
- Tests are colocated in `__tests__` folders near the code they cover. Use the same pattern for new component, hook, utility, or data-module tests.
- Jest runs in `jsdom` and already mocks CSS and asset imports via the top-level `__mocks__` folder, so frontend tests should continue using the existing Jest + Testing Library setup rather than introducing a second test runner.
- Playwright e2e tests should intercept the timetable API instead of depending on the live backend. Existing e2e coverage uses `page.route()` to provide deterministic lesson data for debug-mode scenarios.
- This repository is pinned to pnpm through the `packageManager` field in `package.json`, so dependency and CI changes should keep `pnpm-lock.yaml` authoritative instead of reintroducing `package-lock.json`.
- ESLint currently ignores `dist` but not generated `coverage` output, so existing lint runs may include warnings from coverage artifacts if that folder is present.
- Repository-scoped MCP servers for VS Code belong in `.vscode\mcp.json`. This repo includes a Playwright MCP server entry using `@playwright/mcp`.
