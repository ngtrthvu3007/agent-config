# Testing Conventions

## Principles

- Follow the existing test framework, folder structure, and naming pattern of the project.
- Test behavior and contracts, not implementation details.
- Add or update tests when behavior changes, a bug is fixed, or a regression risk is introduced.
- Focus on happy-path tests by default.
- Prefer small, focused tests over broad tests that are hard to debug.
- Do not weaken, skip, or delete existing tests to make a change pass without approval.

## Backend Tests

- Prioritize backend service, API, validation, authorization, and data-shape tests.
- Cover the main success flow first.
- Add failed cases, permission cases, ownership cases, tenant cases, or auth-sensitive cases only when the task requires them or the risk is clear.
- For bug fixes, add a regression test when practical and not too broad.
- Keep test data minimal and explicit.

## Frontend Tests

- Frontend tests are optional unless the project already has relevant tests, the task asks for them, or the UI behavior has meaningful risk.
- Test user-visible behavior, form states, important interactions, and data rendering.
- Avoid testing internal component state or implementation-only details.

## API Tests

- Verify request validation, status codes, response shape, error format, and permission behavior.
- Cover the main successful API behavior first.
- Keep API tests aligned with Swagger/OpenAPI or the project's API docs when available.
- Do not change API expectations silently; contract changes require approval.

## Test Data

- Use existing fixtures, factories, builders, or seed helpers when available.
- Keep fixtures small and readable.
- Do not create large shared fixtures when a local test setup is clearer.
- Do not depend on test order.

## Mocking

- Mock external services, network calls, time, queues, emails, payment providers, and cloud services when needed.
- Do not mock the code path being tested so much that the test no longer proves behavior.
- Keep mocks close to the test unless the project has shared mock helpers.

## Verification

- Run the smallest relevant test command first.
- Run lint, typecheck, build, or broader tests when the change affects shared behavior or public contracts.
- Report commands that were run and any commands that could not be run.
