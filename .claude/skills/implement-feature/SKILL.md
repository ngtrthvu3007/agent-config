---
name: implement-feature
description: Use when implementing an approved task or feature, applying a scoped refactor, fixing a requirement mismatch, or updating code according to an accepted plan or review finding.
argument-hint: <task, requirement, or review finding>
---

# Implement Feature

## Goal

Implement the requested change with a focused, maintainable diff.

## Process

1. Read the task, accepted plan, or selected review finding.
2. Read `docs/engineering/conventions/general.md` for any code change.
3. Read the relevant convention file: `frontend.md`, `backend.md`, `api.md`, `database.md`, or `testing.md`.
4. Read `docs/specs/` and `docs/domain/` when the task involves feature behavior or business rules.
5. Infer scope from the task; ask only when scope or approval boundaries are unclear.
6. Follow existing project patterns before introducing new abstractions.
7. Keep the diff focused on the requested scope.
8. Inspect affected files and nearby call sites.
9. Update types, imports, exports, API usage, data shapes, nullability, and related declarations as needed.
10. When fixing review findings, fix only the selected findings — no opportunistic cleanup.
11. Add or update tests when practical, prioritizing the changed behavior and affected layer.
12. Run the smallest relevant verification first: lint, typecheck, build, or tests.

## Do Not

- Do not implement unclear requirements by guessing — ask one concise question instead.
- Do not change DB schema, public API shape, auth, payment, secrets, deployment, or infra without approval.
- Do not add dependencies unless clearly necessary and approved.
- Do not mix broad refactors with feature work.
- Do not change UI styling, layout, spacing, or colors unless the task explicitly requires it.
- Do not suppress lint, type, build, or test failures without explaining why.

## Output

**Non-trivial changes:**
- Summary
- Changed files
- Verification result
- Known issues or remaining risk

**Small or single-file changes:** short summary and verification result.
