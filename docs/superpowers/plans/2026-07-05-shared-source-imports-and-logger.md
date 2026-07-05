# Shared Source Imports And Logger Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make bestlyg client/server consume workspace shared TS source directly, update server winston logging, and migrate the shared log-data helper.

**Architecture:** Reuse ask-bi's source-alias pattern with local bestlyg paths. Keep the migration to the current shared packages and logger call sites.

**Tech Stack:** pnpm, TypeScript, Vite, NestJS webpack, winston, vitest/Jest-compatible checks.

## Global Constraints

- Do not add new runtime dependencies.
- Keep workspace package names unchanged.
- Use direct `src/index.ts` aliases for shared workspace packages.

---

### Task 1: Workspace Source Resolution

**Files:**

- Modify: `packages/client/tsconfig.json`
- Modify: `packages/client/tsconfig.app.json`
- Modify: `packages/client/vite.config.ts`
- Modify: `packages/server/tsconfig.json`
- Modify: `packages/server/webpack.config.js`

- [ ] Add client/server aliases for `@bestlyg/core-shared`, `@bestlyg/client-shared`, and `@bestlyg/server-shared`.
- [ ] Keep `@bestlyg/*` workspace dependencies out of server webpack externals.
- [ ] Verify with TypeScript resolution/build commands.

### Task 2: Logger And Log Data

**Files:**

- Create: `packages/shared/server-shared/src/log-data.ts`
- Modify: `packages/shared/server-shared/src/index.ts`
- Modify: `packages/server/libs/common/src/logger.ts`
- Modify: `packages/server/src/bootstrap.ts`
- Modify: `packages/server/src/interceptors/logging.interceptor.ts`
- Test: `packages/shared/server-shared/test/log-data.test.ts`
- Test: `packages/server/libs/common/src/logger.spec.ts`

- [ ] Write failing tests for `formatLogData` and winston console file formatting.
- [ ] Implement the smallest shared formatter and logger config update.
- [ ] Verify with the targeted test commands.
