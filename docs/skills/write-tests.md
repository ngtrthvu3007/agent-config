# Write Tests

`write-tests` là skill dùng khi thêm hoặc cải thiện tests cho behavior, contract, bug, hoặc regression. Trang này giúp bạn mở source thật, nhận ra pattern, và copy skill khi cần so sánh với project khác.

Nguồn: [`.claude/skills/write-tests/SKILL.md`](https://github.com/VuNguyentranThe/agent-config/blob/master/.claude/skills/write-tests/SKILL.md)

## Điểm đáng chú ý

- Tập trung vào hành vi và assertion có nghĩa.
- Ưu tiên fixture nhỏ và không bám chi tiết triển khai.
- Chạy test liên quan và báo kết quả rõ ràng.

````markdown
---
name: write-tests
description: Use when adding or improving tests — backend unit, integration, API, service, repository, authorization, validation, or regression tests. Focus on behavior, meaningful assertions, and minimal fixtures.
argument-hint: <behavior, contract, bug, or file to test>
---

# Write Tests

## Goal

Add focused, meaningful tests that prove backend behavior or regressions without overfitting to implementation details.

## Process

1. Read `docs/engineering/conventions/testing.md` before writing any tests.
2. Read `docs/specs/` for behavior, acceptance criteria, and regression context when relevant.
3. Identify the behavior, contract, or regression that needs proof from `$ARGUMENTS`.
4. Choose the smallest useful test level: unit, service, repository, controller/API, integration, or authorization.
5. Inspect existing nearby tests and reuse local fixtures, factories, mocks, and helpers.
6. Write behavior-focused assertions — include edge cases and denied/error paths when relevant.
7. Avoid testing private implementation details unless no public behavior can prove the risk.
8. Keep fixtures minimal and deterministic.
9. Run the smallest relevant test first, then affected tests when practical.

## Do Not

- Do not weaken, delete, or skip existing tests to make the suite pass.
- Do not add broad snapshot or brittle implementation tests unless clearly justified.
- Do not mock the behavior being tested.
- Do not introduce test-only abstractions unless they reduce real duplication or match existing patterns.
- Do not claim tests passed if commands were not run.

## Output

**Non-trivial test work:**
- Behavior covered
- Test files changed
- Verification result
- Remaining coverage gaps or risk

**Small additions:** short summary and verification result.
````

