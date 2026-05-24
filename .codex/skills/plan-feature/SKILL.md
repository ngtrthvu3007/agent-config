---
name: plan-feature
description: Use when turning a requirement, accepted solution, researched approach, review-solution outcome, feature idea, refactor, migration, or architecture change into an implementation plan. Focus on scope, task breakdown, affected areas, approval gates, acceptance criteria, verification, rollout, and risks. Do not use to decide whether a solution is worth doing; use review-solution for that. Do not edit code unless explicitly asked.
---

# Plan Feature

## Goal

Create a practical implementation plan with clear scope, task breakdown, acceptance criteria, verification, and risks.

## Use When

- Plan a feature, refactor, migration, or architecture change.
- Turn a researched or accepted solution into implementation steps.
- Continue after `review-solution` when the direction is accepted and needs a plan.
- Break work into implementation tasks.
- Identify risks, dependencies, required approvals, or rollout concerns.

## Expected Inputs

Helpful inputs include:

- Epic, user story, requirement, accepted solution, or `review-solution` outcome.
- Constraints, non-goals, deadline, rollout expectation, and success criteria.
- Acceptance criteria when available.
- Relevant docs, files, modules, APIs, data models, or UI surfaces.

## Read When Relevant

- `docs/specs/` for feature specs, acceptance criteria, and approval points.
- `docs/domain/` for product context, business rules, glossary, and domain constraints.
- `docs/engineering/` for architecture, decisions, API constraints, testing strategy, and rollout constraints.

## Process

1. Clarify the goal, non-goals, selected direction, constraints, and success criteria.
2. Inspect relevant project docs and existing code only enough to plan accurately.
3. Identify affected modules, APIs, data models, UI surfaces, tests, docs, and rollout concerns.
4. Prefer the smallest shippable slice when possible.
5. Call out approval gates: schema, public API, auth, payment, secrets, infra, dependencies, or broad architecture.
6. Produce task breakdown and implementation steps.
7. Define acceptance criteria for the planned work.
8. Include verification strategy, rollout notes, and remaining risks.

## Do Not

- Do not edit code unless explicitly asked.
- Do not decide whether a solution is worth pursuing; use `review-solution` when that is the main question.
- Do not over-design when a smaller plan or experiment answers the question.
- Do not hide assumptions; state them or ask one concise question when they materially affect the plan.
- Do not propose broad refactors unless they are necessary for the stated goal.

## Output

For non-trivial plans, include:

- Goal and scope
- Selected direction or assumption
- Task breakdown and implementation steps
- Acceptance criteria
- Verification plan
- Rollout notes, risks, and approvals needed
- Open questions or assumptions

For small plans, concise steps plus risks and verification are enough.
