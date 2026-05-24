---
name: debug-failure
description: Use when fixing a bug, failing test, regression, runtime error, stack trace, or broken behavior.
argument-hint: <bug description, test name, or stack trace>
---

# Debug Failure

## Goal

Find the root cause and apply the smallest safe fix.

## Process

1. Read the bug report, repro steps, logs, stack trace, or failing test name from `$ARGUMENTS`.
2. Start from user-provided files, logs, screenshots, or test names.
3. Identify the smallest relevant code path to the failure.
4. Identify the root cause before editing. If not possible, state the hypothesis and supporting evidence.
5. Inspect affected files and nearby call sites.
6. Make the smallest safe fix.
7. Add a regression test when practical, prioritizing the layer where the bug occurred.
8. Run the failing test or smallest relevant verification first.
9. If the root cause is outside the initial area, explain why before expanding scope.

## Debug Logging

- Add focused temporary logs near the suspected failure path when useful.
- Log inputs, branch decisions, and error details only — never secrets, tokens, passwords, or private user data.
- Remove temporary logs before finishing unless the user asks to keep them.

## Do Not

- Do not refactor unrelated code.
- Do not change public API shape, DB schema, auth, payment, secrets, or infra without approval.
- Do not suppress lint, type, build, or test failures without explaining why.
- Do not claim verification passed if commands were not run.

## Output

**Non-trivial fixes:**
- Root cause
- Fix summary
- Changed files
- Verification result
- Known issues or remaining risk

**Small fixes:** short root cause, fix summary, and verification result.
