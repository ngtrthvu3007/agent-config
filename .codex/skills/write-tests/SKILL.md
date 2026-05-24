---
name: write-tests
description: Use when adding or improving tests, especially backend unit, integration, API, service, repository, authorization, validation, regression, or data-shape tests. Focus on behavior, meaningful assertions, minimal scope, reliable fixtures, and regression coverage. Do not weaken existing tests to make them pass.
---

# Write Tests

## Goal

Add focused, meaningful tests that prove backend behavior or regressions without overfitting to implementation details.

## Use When

- Add tests for backend services, controllers, repositories, validators, APIs, auth, or data transformations.
- Convert a bug report or review finding into a regression test.
- Improve missing or weak coverage for changed behavior.
- Update tests after an approved behavior change.

## Expected Inputs

Helpful inputs include:

- Behavior, contract, bug, regression, or review finding to prove.
- Target file, service, controller, endpoint, repository, validator, or module.
- Expected inputs, outputs, errors, edge cases, and authorization rules.
- Existing test file or test command when known.

## Read When Relevant

- `docs/specs/` for behavior, acceptance criteria, and regression context.
- `docs/engineering/conventions/` for testing, API, and backend conventions.
- `docs/engineering/architecture.md` when choosing test level or module boundaries.

## Process

1. Identify the behavior, contract, or regression that needs proof.
2. Choose the smallest useful test level: unit, service, repository, controller/API, integration, or authorization test.
3. Inspect existing nearby tests and reuse local fixtures, factories, mocks, and helpers.
4. Write behavior-focused assertions, including edge cases and denied/error paths when relevant.
5. Avoid testing private implementation details unless no public behavior can prove the risk.
6. Keep fixtures minimal and deterministic.
7. Run the smallest relevant test first, then affected tests when practical.

## Do Not

- Do not weaken, delete, or skip tests to make the suite pass.
- Do not add broad snapshot or brittle implementation tests unless clearly justified.
- Do not mock the behavior being tested.
- Do not introduce test-only abstractions unless they reduce real duplication or match existing patterns.
- Do not claim tests passed if commands were not run.

## Output

For non-trivial test work, include:

- Behavior covered
- Test files changed
- Verification
- Remaining coverage gaps or risk

For small test additions, a short summary plus verification result is enough.
