---
name: review-solution
description: Use when evaluating a solution at any stage: idea, researched approach, proposal, plan, prototype, partial implementation, or completed implementation. Review whether the approach is worth pursuing, keeping, revising, testing, or rejecting based on tradeoffs, value, risk, feasibility, alternatives, and project constraints. Do not use for code diff review or technical code quality review; use review-diff or review-technical for those.
---

# Review Solution

## Goal

Evaluate the user's solution at its current stage and decide whether it is worth pursuing, keeping, revising, testing, or rejecting.

## Use When

- Review an idea, researched approach, proposal, plan, prototype, partial implementation, or completed implementation.
- Compare alternatives and explain tradeoffs.
- Assess whether a solution improves the stated problem enough to justify its cost.
- Identify risks, assumptions, rollout concerns, and simpler options.
- Decide whether to pursue, keep, revise, test with a small experiment, defer, or reject the approach.

## Expected Inputs

Helpful inputs include:

- Idea, researched approach, proposal, plan, prototype, partial implementation, or completed implementation.
- Problem, goal, target users, constraints, and success criteria.
- Known alternatives, rejected options, tradeoffs, risks, or assumptions.
- Relevant specs, domain context, architecture notes, metrics, or evidence.

## Read When Relevant

- `docs/specs/` when the solution is tied to a feature spec or acceptance criteria.
- `docs/domain/` for product goal, users, business rules, glossary, and domain constraints.
- `docs/engineering/` for architecture, decisions, API constraints, technical tradeoffs, and rollout constraints.

## Process

1. Identify the problem, goal, users, constraints, and success criteria from the user request.
2. Read relevant project or task documents when they materially affect feasibility, constraints, or tradeoffs.
3. Restate the user's solution in concrete terms.
4. Check what the solution improves and what it makes worse.
5. Compare against practical alternatives, including a simpler baseline when possible.
6. Check feasibility against current constraints: time, budget, team skill, existing system, operational cost, and risk tolerance.
7. Assess tradeoffs across complexity, maintainability, cost, performance, reliability, security, UX, delivery time, team capability, migration path, rollback strategy, observability, blast radius, reversibility, and long-term maintenance.
8. Identify key assumptions and what evidence would validate or invalidate them.
9. Recommend one of: pursue, keep, revise, run a small experiment, defer, or reject.
10. If information is missing and materially affects the recommendation, ask one concise question or state the assumption used.

## Do Not

- Do not review code style, naming, CSS classes, or test details unless they affect the solution tradeoff.
- Do not treat the review as pass/fail correctness unless the solution clearly violates a requirement or constraint.
- Do not assume the solution is only an idea or already implemented; adapt the review to the solution's current stage.
- Do not propose broad rewrites without explaining why the current approach is not worth continuing.
- Do not over-optimize for ideal architecture when a smaller experiment would answer the real question.
- Do not speculate without tying the point to a stated goal, constraint, risk, or assumption.

## Output

Use this structure for non-trivial reviews:

- Recommendation: Pursue | Keep | Revise | Experiment | Defer | Reject
- What the solution improves
- Tradeoffs and risks
- Alternatives considered
- Assumptions or open questions
- Suggested next step, such as prototype, spike, acceptance criteria, rollback plan, metric to measure, or kill criteria

For small reviews, a concise recommendation with key tradeoffs and next step is enough.
