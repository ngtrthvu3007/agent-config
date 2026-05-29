# Write Spec

`write-spec` là skill dùng để biến ý tưởng, epic, hoặc user story thành spec sẵn sàng triển khai. Trang này giúp bạn mở source thật, nhận ra pattern, và copy skill khi cần so sánh với project khác.

Nguồn: [`.claude/skills/write-spec/SKILL.md`](https://github.com/VuNguyentranThe/agent-config/blob/master/.claude/skills/write-spec/SKILL.md)

## Điểm đáng chú ý

- Tạo scope, non-goals, acceptance criteria, edge cases, và approval points.
- Đọc template trong `docs/specs/` trước khi viết.
- Lưu output vào `docs/specs/` theo format repo.

````markdown
---
name: write-spec
description: Use when turning a rough idea, product note, epic, or user story into a concise implementation-ready spec. Covers scope, acceptance criteria, edge cases, and approval points. Output saved to docs/specs/.
argument-hint: <feature or epic to spec>
---

# Write Spec

## Goal

Produce a stable, concise spec that defines what to build, what not to build, how to know it works, and what still needs approval.

## Process

1. Read the existing template in `docs/specs/` before writing to match the established format.
2. Read relevant files in `docs/domain/` for business rules, glossary, and domain constraints.
3. Identify the product goal, target user, problem, constraints, and success criteria.
4. Ask one concise question only if missing information blocks a stable implementation.
5. If a detail is missing but not blocking, choose the simplest MVP behavior and state the assumption.
6. Keep scope tight — no nice-to-haves unless explicitly asked.
7. Define in scope and out of scope.
8. Write acceptance criteria that are testable and implementation-ready.
9. Include edge cases, empty states, error states, permissions, and data ownership when relevant.
10. Add a QA checklist that maps back to acceptance criteria.
11. Call out approval points for DB schema, public API, auth, payment, secrets, deployment, or UI design changes.
12. Save the output as a new `.md` file in `docs/specs/`.

## Do Not

- Do not brainstorm multiple unrelated product directions.
- Do not turn the spec into a detailed execution plan — use `plan-feature` for that.
- Do not add features outside the requested scope.
- Do not write vague acceptance criteria.
- Do not hide assumptions.

## Output Structure

- Title
- Problem / Goal
- Scope (in / out)
- Assumptions
- Acceptance Criteria
- Edge Cases
- QA Checklist
- Approval Points
- Implementation Notes (only when they affect scope, API, data, or risk)
````

