# Review Solution

`review-solution` là skill dùng để đánh giá một hướng giải, ý tưởng, proposal, hoặc lựa chọn kỹ thuật. Trang này giúp bạn mở source thật, nhận ra pattern, và copy skill khi cần so sánh với project khác.

Nguồn: [`.claude/skills/review-solution/SKILL.md`](https://github.com/VuNguyentranThe/agent-config/blob/master/.claude/skills/review-solution/SKILL.md)

## Điểm đáng chú ý

- Tập trung vào feasibility, tradeoffs, risks, và recommendation.
- Dùng trước khi lập plan hoặc implement khi hướng đi chưa chắc.
- Không thay thế `review-diff` hoặc `review-technical`.

````markdown
---
name: review-solution
description: Use when evaluating a solution, idea, proposal, researched approach, or comparing alternatives. Covers feasibility, tradeoffs, risks, and recommendation. Not for code diff or technical code quality review.
argument-hint: <solution or approach to evaluate>
---

# Review Solution

## Goal

Evaluate the proposed solution and recommend: Pursue | Keep | Revise | Experiment | Defer | Reject.

## Process

1. Identify the problem, goal, target users, constraints, and success criteria.
2. Read `docs/domain/` and `docs/engineering/` only when they materially affect the tradeoff.
3. Restate the solution in concrete terms.
4. Assess what it improves and what it makes worse.
5. Compare against a simpler alternative when one exists.
6. Check feasibility against current constraints: time, team skill, existing system, and risk tolerance.
7. Evaluate tradeoffs: complexity, maintainability, cost, performance, security, UX, delivery time, migration path, reversibility, and blast radius.
8. Identify key assumptions and what evidence would validate or invalidate them.
9. If information is missing and materially affects the recommendation, ask one concise question.

## Do Not

- Do not review code style, naming, or test details unless they affect the tradeoff.
- Do not propose broad rewrites without explaining why the current approach is not worth continuing.
- Do not over-optimize for ideal architecture when a smaller experiment answers the real question.
- Do not speculate without tying the point to a stated goal, constraint, risk, or assumption.

## Output

- **Recommendation:** Pursue | Keep | Revise | Experiment | Defer | Reject
- What the solution improves
- Tradeoffs and risks
- Alternatives considered
- Assumptions or open questions
- Suggested next step
````

