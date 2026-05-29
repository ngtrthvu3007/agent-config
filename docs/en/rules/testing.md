# Testing Rules

`testing.md` is the rule an agent reads when writing or updating tests. This page helps you open the real source, notice the pattern, and copy the rule when comparing it with another project.

Source: [`.claude/rules/testing.md`](https://github.com/VuNguyentranThe/agent-config/blob/master/.claude/rules/testing.md)

## What To Notice

- Prioritizes behavior and contracts over implementation details.
- Reminds the agent not to skip, delete, or weaken existing tests without approval.
- Points to `docs/engineering/conventions/testing.md` for the full convention.

````markdown
# Testing Rules

Apply when writing or updating tests. Read `docs/engineering/conventions/testing.md` for full detail.

## Principles

- Follow the existing test framework, folder structure, and naming pattern of the project.
- Test behavior and contracts, not implementation details.
- Add or update tests when behavior changes, a bug is fixed, or a regression risk is introduced.
- Focus on happy-path tests by default.
- Do not weaken, skip, or delete existing tests without approval.

## Backend Tests

- Prioritize backend service, API, validation, authorization, and data-shape tests.
- Cover the main success flow first.
- Add failed cases, permission cases, ownership cases, or auth-sensitive cases only when the task requires them or the risk is clear.
- For bug fixes, add a regression test when practical.
- Keep test data minimal and explicit.

## Frontend Tests

- Optional unless the project already has relevant tests, the task asks for them, or the UI behavior has meaningful risk.
- Test user-visible behavior, form states, important interactions, and data rendering.
- Avoid testing internal component state or implementation-only details.

## API Tests

- Verify request validation, status codes, response shape, error format, and permission behavior.
- Cover the main successful API behavior first.
- Keep API tests aligned with Swagger/OpenAPI when available.
- Do not change API expectations silently — contract changes require approval.

## Test Data

- Use existing fixtures, factories, builders, or seed helpers when available.
- Keep fixtures small, readable, and independent — do not depend on test order.

## Mocking

- Mock external services, network calls, time, queues, emails, payment providers, and cloud services.
- Do not mock the code path being tested — the test must still prove behavior.
- Keep mocks close to the test unless the project has shared mock helpers.

## Verification

- Run the smallest relevant test command first.
- Run lint, typecheck, build, or broader tests when the change affects shared behavior or public contracts.
- Report commands that were run and any that could not be run.
````

