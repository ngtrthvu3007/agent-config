---
name: debug-failure
description: Use when fixing bugs, failing tests, regressions, runtime errors, stack traces, broken behavior, or incorrect output.
---

# Debug Failure

## Goal

Find the root cause and make the smallest safe fix.

## Use When

- A bug is reported.
- A test is failing.
- A regression appears after a change.
- Runtime behavior is broken or incorrect.
- Logs, stack traces, screenshots, or repro steps are provided.

## Expected Inputs

Helpful inputs include:

- Bug description, expected behavior, actual behavior, or repro steps.
- Failing test name, stack trace, logs, screenshots, or error output.
- Relevant files, folders, route, endpoint, component, service, or active editor file.
- Permission to add temporary focused logs when useful.

## Process

1. Read the bug report, repro steps, logs, stack trace, or failing test.
2. Start from user-provided files, folders, logs, stack traces, screenshots, or test names.
3. If no files are provided but an active editor file is available, inspect it first.
4. Identify the smallest relevant code path.
5. Identify the root cause before editing when possible. If not possible, state the hypothesis and what evidence supports it.
6. Inspect affected files and nearby call sites.
7. Make the smallest safe fix.
8. Add or update a regression test when practical, prioritizing the layer where the bug occurred.
9. Run the smallest relevant verification first, such as the failing test, affected test, lint, typecheck, build, backend tests, or affected module checks.
10. If the root cause is outside the initial area, explain why before expanding scope.

## Debug Logging

When temporary logs are useful:

- Add focused logs near the suspected failure path.
- Log inputs, branch decisions, external responses, and error details only when relevant.
- Avoid logging secrets, tokens, passwords, cookies, payment data, or private user data.
- Remove temporary debug logs before finishing unless the user asks to keep them.
- If logs should remain, use the project's existing logger instead of ad hoc console logs.

## Do Not

- Do not refactor unrelated code.
- Do not change public API shape, database schema, auth behavior, payment behavior, secrets handling, deployment, or infrastructure without approval.
- Do not change UI styling, CSS classes, layout, spacing, colors, or visual design unless the task explicitly requires it.
- Do not suppress lint, type, build, or test failures without explaining why.
- Do not claim verification passed if commands were not run.

## Output

For non-trivial fixes, finish with:

- Root cause
- Fix summary
- Changed files
- Verification
- Known issues or remaining risk

For small fixes, a short root cause, fix summary, and verification result is enough.
