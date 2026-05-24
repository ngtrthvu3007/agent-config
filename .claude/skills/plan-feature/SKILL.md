---
name: plan-feature
description: Use when turning a requirement, accepted spec, or approved solution into an implementation plan. Covers task breakdown, affected areas, approval gates, acceptance criteria, and risks. Does not edit code.
argument-hint: <feature or requirement to plan>
---

# Plan Feature

## Goal

Produce a practical implementation plan with clear scope, task breakdown, acceptance criteria, verification strategy, and risks.

## Process

1. Read `docs/specs/` for relevant spec and acceptance criteria.
2. Read `docs/domain/` for business rules and domain constraints when relevant.
3. Read `docs/engineering/` for architecture, decisions, and conventions that affect the plan.
4. Clarify goal, non-goals, selected direction, constraints, and success criteria.
5. Identify affected modules, APIs, data models, UI surfaces, tests, docs, and rollout concerns.
6. Prefer the smallest shippable slice when possible.
7. Call out approval gates: schema, public API, auth, payment, secrets, infra, dependencies, or broad architecture changes.
8. Produce task breakdown and ordered implementation steps.
9. Define acceptance criteria for the planned work.
10. Include verification strategy, rollout notes, and remaining risks.

## Do Not

- Do not edit code unless explicitly asked.
- Do not decide whether a solution is worth pursuing — use `review-solution` for that.
- Do not over-design when a smaller plan or experiment answers the question.
- Do not propose broad refactors unless they are necessary for the stated goal.
- Do not hide assumptions; state them or ask one concise question when they materially affect the plan.

## Output

- Goal and scope
- Selected direction or assumption
- Task breakdown and implementation steps
- Acceptance criteria
- Verification plan
- Approval gates required
- Rollout notes and risks
- Open questions or assumptions
