---
name: security-review
description: Use when reviewing or changing authentication, authorization, permissions, sessions, cookies, tokens, secrets, private data, data leaks, tenant or user isolation, payment behavior, or other security-sensitive behavior. Focus on risk, access control, data exposure, approval gates, and regression coverage.
---

# Security Review

## Goal

Find security-sensitive risks and guide minimal, auditable fixes.

## Use When

- Review or change auth, authorization, permissions, sessions, cookies, or tokens.
- Handle secrets, private data, payment behavior, tenant isolation, or user isolation.
- Investigate possible data leaks or access-control regressions.
- Validate whether a security-sensitive fix is safe before implementation or merge.

## Expected Inputs

Helpful inputs include:

- Protected resource, actor/user role, action, and expected permission rule.
- Endpoint, service, guard, middleware, query, serializer, token, cookie, or session behavior.
- Data sensitivity, tenant/user isolation rule, or known security concern.
- Relevant files, logs, API requests, tests, or repro steps.

## Read When Relevant

- `docs/domain/` for business rules, roles, statuses, glossary, and access-control context.
- `docs/engineering/` for architecture, trust boundaries, API conventions, and prior decisions.

## Process

1. Identify the protected resource, actor, action, trust boundary, and expected access rule.
2. Inspect the relevant code path, including entrypoints, guards, middleware, services, queries, and serialization.
3. Check authentication, authorization, ownership, tenant/user isolation, input validation, and output filtering.
4. Check that errors, logs, and responses do not expose secrets or private data.
5. Prefer the smallest auditable change when a fix is needed.
6. Add or recommend regression tests for access control, data exposure, or denied-path behavior when practical.
7. Run the smallest relevant verification first.

## Do Not

- Do not change security behavior without clear approval.
- Do not broaden access, weaken validation, or suppress checks to make tests pass.
- Do not log secrets, tokens, passwords, cookies, payment data, or private user data.
- Do not treat security issues as normal refactors.
- Do not claim verification passed if commands were not run.

## Output

For security reviews or fixes, include:

- Risk summary
- Affected resource, actor, and access rule
- Findings, or fix summary when explicitly asked to change code
- Verification
- Remaining risk or required approval
