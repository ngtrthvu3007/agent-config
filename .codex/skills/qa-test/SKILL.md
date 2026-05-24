---
name: qa-test
description: Use when testing or validating a feature, bug fix, user flow, API behavior, acceptance criteria, or release candidate. Focus on pass/fail evidence, reproduction steps, edge cases, regressions, and verification gaps. Do not edit files unless explicitly asked to fix issues.
---

# QA Test

## Goal

Validate behavior against requirements and report clear pass/fail evidence.

## Use When

- Test a feature, bug fix, flow, endpoint, or acceptance criteria.
- Verify that a reported issue is fixed.
- Check UI/API behavior before release or handoff.
- Produce QA findings without implementing fixes.

## Expected Inputs

Helpful inputs include:

- Feature spec, acceptance criteria, expected behavior, or bug fix summary.
- Repro steps, test target, endpoint, UI flow, environment, or test account.
- Known edge cases, screenshots, logs, API requests, or existing test names.

## Read When Relevant

- `docs/specs/` for feature specs, acceptance criteria, and QA checklist.
- `docs/domain/` for product context, business rules, glossary, and expected behavior.
- `docs/engineering/conventions/` for testing and API conventions when validating behavior.

## Process

1. Identify the requirement, expected behavior, environment, and test target.
2. Start from user-provided files, URLs, API requests, screenshots, logs, or test names.
3. Build a small test checklist covering happy path, edge cases, and likely regressions.
4. Run the smallest relevant verification first: targeted tests, API checks, browser checks, build, or typecheck.
5. Capture evidence: commands, observed outputs, status codes, screenshots, logs, or reproduction steps.
6. Report each item as pass, fail, blocked, or not tested.
7. If a failure is found, describe reproduction and impact; do not fix unless explicitly asked.

## Do Not

- Do not edit files unless explicitly asked to fix issues.
- Do not mark a check as passed without evidence.
- Do not expand into broad exploratory testing unless requested.
- Do not ignore blocked checks; report why they could not be run.

## Output

For non-trivial QA, include:

- Scope tested
- Pass/fail results
- Evidence
- Bugs or regressions found
- Blocked checks or residual risk

For small checks, a concise result with evidence is enough.
