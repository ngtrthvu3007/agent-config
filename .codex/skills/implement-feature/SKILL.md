---
name: implement-feature
description: Use when implementing approved feature work, scoped refactors, convention fixes, requirement fixes, or code changes with clear requirements.
---

# Implement Feature

## Goal

Implement the requested change with a focused, maintainable diff.

## Use When

- Implement an approved task or feature.
- Fix a requirement mismatch with a clear expected behavior.
- Apply a scoped refactor or cleanup.
- Fix coding convention issues with a clear target.
- Update code according to an accepted plan or review finding.

## Expected Inputs

Helpful inputs include:

- Approved task, requirement, accepted plan, or selected review finding.
- Target files, modules, components, services, endpoints, or active editor file.
- Expected behavior, acceptance criteria, or constraints.
- Approval status for risky changes such as API, database, auth, payment, secrets, infra, dependencies, or UI design.

## Read When Relevant

- `docs/specs/` for feature specs, acceptance criteria, and approval points.
- `docs/domain/` for product context and business rules.
- `docs/engineering/` for architecture, decisions, and relevant conventions.
- `docs/engineering/conventions/` for the specific area being edited: general, frontend, backend, API, database, or testing.

## Process

1. Read the task, requirement, accepted plan, or selected review finding.
2. Infer the requested scope from the task; ask only when scope or approval boundaries are unclear.
3. Start from user-provided files or the active editor file when available.
4. Use fast search to locate the smallest relevant code area when needed.
5. Follow existing project patterns before introducing new abstractions.
6. Keep the diff focused on the requested scope.
7. Inspect affected files and nearby call sites.
8. Update types, imports, exports, API usage, data shapes, nullability, and related declarations as needed.
9. When fixing review findings, fix only the selected findings and avoid opportunistic cleanup.
10. Add or update tests when practical, prioritizing the changed behavior and affected layer.
11. Run the smallest relevant verification first, such as lint, typecheck, build, tests, or affected module checks.

## Do Not

- Do not implement unclear requirements by guessing; ask one concise question instead.
- Do not change database schema, public API shape, auth behavior, payment behavior, secrets handling, deployment, or infrastructure without approval.
- Do not add dependencies unless clearly necessary and approved.
- Do not mix broad refactors with feature work.
- Do not change UI styling, CSS classes, layout, spacing, colors, or visual design unless the task explicitly requires it.
- Do not suppress lint, type, build, or test failures without explaining why.
- Do not claim verification passed if commands were not run.

## Output

For non-trivial changes, finish with:

- Summary
- Changed files
- Verification
- Known issues or remaining risk

For small or single-file changes, a short summary plus verification result is enough.
