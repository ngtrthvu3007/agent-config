---
name: write-spec
description: Use when turning the user's rough idea, researched solution, product note, epic, user story, or requirement into a concise implementation-ready spec. The spec should become a source of truth for review-solution, plan-feature, implement-feature, qa-test, and write-tests without becoming a long implementation plan.
---

# Write Spec

## Goal

Produce a stable, concise spec that defines what to build, what not to build, how to know it works, and what still needs approval or clarification.

## Use When

- Write an epic or feature spec.
- Convert a rough idea into user stories and acceptance criteria.
- Turn product requirements or a researched solution into an implementation-ready brief.
- Define feature scope, out of scope, edge cases, and expected behavior.
- Prepare a source-of-truth brief for planning, implementation, QA, or backend tests.

## Expected Inputs

Helpful inputs include:

- Rough idea, researched solution, product requirement, epic, user story, or feature request.
- Target user, problem, desired outcome, and constraints.
- Existing docs, designs, API notes, screenshots, or related files.
- Known edge cases, permissions, data ownership, or success metrics.

## Read When Relevant

- `docs/specs/` for related specs or existing acceptance criteria.
- `docs/domain/` for product goal, users, business rules, glossary, and domain constraints.
- `docs/engineering/` for architecture, decisions, API constraints, and testing strategy.

## Process

1. Identify the product goal, target user, problem, constraints, and success criteria.
2. Ask one concise question only if missing information blocks a stable implementation.
3. If a detail is missing but not blocking, choose the simplest MVP behavior and state the assumption.
4. Keep scope tight. Do not add nice-to-have features unless the user asks.
5. Define what is in scope and out of scope.
6. Capture the selected or assumed solution only when it affects scope, behavior, API, data, UI, or risk.
7. Write acceptance criteria that are testable and implementation-ready.
8. Include edge cases, empty states, error states, permissions, and data ownership when relevant.
9. Include API, data, UI, integration, and naming notes only when they affect implementation.
10. Add QA checklist items that map back to acceptance criteria.
11. Call out approval points for DB schema, public API, auth, payment, secrets, deployment, or UI design changes.

## Do Not

- Do not brainstorm multiple unrelated product directions.
- Do not decide whether a solution is worth pursuing; use `review-solution` when that is the main question.
- Do not turn the spec into a detailed execution plan; use `plan-feature` for task breakdown and sequencing.
- Do not add features outside the requested scope.
- Do not write vague acceptance criteria.
- Do not hide assumptions.
- Do not make irreversible architecture, API, DB, auth, payment, or deployment decisions without marking them for approval.
- Do not include implementation details that conflict with existing project conventions or decisions.

## Output

For non-trivial specs, use this structure:

- Title
- Problem / Goal
- Scope
- Assumptions
- Acceptance Criteria
- Edge Cases
- Implementation Notes
- QA Checklist
- Approval Points

Include `Users / Actors`, `Functional Requirements`, `User Stories`, or `Implementation Tasks` only when they clarify the spec.

For small specs, a concise brief with goal, scope, acceptance criteria, and QA checklist is enough.
