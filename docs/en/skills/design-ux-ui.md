# Design UX/UI

`design-ux-ui` is the skill for designing flows, wireframes, screen structures, interaction patterns, navigation, and UI states from requirements. This page helps you open the real source, notice the pattern, and copy the skill when comparing it with another project.

Source: [`.claude/skills/design-ux-ui/SKILL.md`](https://github.com/VuNguyentranThe/agent-config/blob/master/.claude/skills/design-ux-ui/SKILL.md)

## What To Notice

- Produces design output as Markdown or annotated layout, not code.
- Use it when there is no existing UI to review.
- Turns requirements into implementable flows, screens, states, and UI decisions.

````markdown
---
name: design-ux-ui
description: Use when designing user flows, wireframes, screen structures, interaction patterns, navigation, UI states, or UI decisions from requirements. Produces design output as structured markdown or annotated layout — not code. Use ux-ui-review when reviewing existing UI.
argument-hint: <feature, flow, or screen to design>
---

# Design UX/UI

## Goal

Produce a clear, implementation-ready UX/UI design: user flows, screen structure, interaction patterns, states, and UI decisions grounded in the feature goal and product context.

## Process

1. Read `docs/domain/` for product goal, target users, business rules, labels, and glossary.
2. Read `docs/specs/` for feature scope, acceptance criteria, and approved behavior.
3. When a Figma file or existing design system reference is provided, use Figma MCP to inspect it. If unavailable, ask for screenshots or a design reference.
4. Identify the target user, primary task, entry point, and success state.
5. Map the user flow: entry → steps → decision points → success / error exits.
6. Define the screen or component structure: layout zones, primary content, primary action, secondary actions, and navigation.
7. Specify interaction patterns: how the user triggers actions, transitions, feedback, and confirmations.
8. Define all relevant UI states: loading, empty, error, success, disabled, validation, permission-denied, and destructive-action confirmation.
9. Note data displayed per screen and where it comes from at a high level.
10. Flag UI decisions that need approval: new patterns, deviations from the design system, or flows that affect auth, payment, or destructive actions.
11. Keep design decisions grounded in the user task — do not add screens or steps without a clear user need.

## Do Not

- Do not produce implementation code unless explicitly asked — design output is markdown structure, not JSX or CSS.
- Do not deviate from the existing design system or product patterns without flagging it as a decision point.
- Do not skip states — missing loading, empty, or error states are design gaps.
- Do not make auth, payment, destructive action, or broad navigation decisions without approval.
- Do not invent requirements outside the stated feature scope.

## Output

- **User Flow** — step-by-step from entry to success/error, including decision branches
- **Screen / Component Structure** — layout zones, primary content, actions, and navigation per screen
- **Interaction Patterns** — triggers, transitions, feedback, and confirmations
- **UI States** — per screen: loading, empty, error, success, disabled, validation, permission, destructive
- **UI Decisions** — non-obvious choices made and why
- **Open Questions / Approval Points** — gaps that need product or technical input before implementation
````

