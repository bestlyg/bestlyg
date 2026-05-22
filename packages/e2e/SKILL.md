# Bestlyg E2E Skill

Use this package when adding or maintaining Bestlyg end-to-end tests.

## Rules

- Put runnable specs only under `projects/<project>/specs`.
- Keep shared fixtures, flows, helpers, and base page objects in `common`.
- Keep project-specific fixtures and page objects in `projects/<project>`.
- Prefer stable `data-tid` selectors for business interactions. If the product surface lacks a stable selector, add one to the app before writing a brittle E2E assertion.
- Do not call private business APIs from specs unless the test is explicitly about API setup or cleanup.
- Keep test names and `test.step` titles human-readable in Chinese.
- Run through the package CLI instead of invoking Playwright directly when selecting project scripts.
