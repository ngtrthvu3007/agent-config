# Security Review

`security-review` là skill dùng khi task chạm auth, authorization, permissions, tokens, cookies, secrets, payment, hoặc dữ liệu riêng tư. Trang này giúp bạn mở source thật, nhận ra pattern, và copy skill khi cần so sánh với project khác.

Nguồn: [`.claude/skills/security-review/SKILL.md`](https://github.com/VuNguyentranThe/agent-config/blob/master/.claude/skills/security-review/SKILL.md)

## Điểm đáng chú ý

- Tập trung vào rủi ro, access control, data exposure, và approval gates.
- Phù hợp cho endpoint, service, guard, hoặc luồng nhạy cảm.
- Ưu tiên fix nhỏ, audit được, và không đổi behavior nhạy cảm nếu chưa duyệt.

````markdown
---
name: security-review
description: Use when reviewing or changing authentication, authorization, permissions, sessions, cookies, tokens, secrets, private data, payment behavior, or tenant/user isolation. Focus on risk, access control, data exposure, and approval gates.
argument-hint: <endpoint, service, guard, or security concern>
---

# Security Review

## Goal

Find security-sensitive risks and guide minimal, auditable fixes.

## Process

1. Read `docs/domain/` for business rules, roles, statuses, and access-control context.
2. Read `docs/engineering/` for architecture, trust boundaries, and API conventions.
3. Identify the protected resource, actor, action, trust boundary, and expected access rule from `$ARGUMENTS`.
4. Inspect the relevant code path: entrypoints, guards, middleware, services, queries, and serialization.
5. Check: authentication, authorization, ownership, tenant/user isolation, input validation, and output filtering.
6. Check that errors, logs, and responses do not expose secrets or private data.
7. Prefer the smallest auditable change when a fix is needed.
8. Add or recommend regression tests for access control, data exposure, or denied-path behavior when practical.
9. Run the smallest relevant verification first.

## Do Not

- Do not change security behavior without clear approval.
- Do not broaden access, weaken validation, or suppress checks to make tests pass.
- Do not log secrets, tokens, passwords, cookies, payment data, or private user data.
- Do not treat security issues as normal refactors.
- Do not claim verification passed if commands were not run.

## Output

- Risk summary
- Affected resource, actor, and access rule
- Findings ordered by severity, or fix summary when asked to change code
- Verification result
- Remaining risk or required approval
````

