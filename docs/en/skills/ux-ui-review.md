# UX/UI Review

`ux-ui-review` is the skill for reviewing flows, layout, interaction, visual hierarchy, accessibility, responsive behavior, states, forms, or usability risk. This page helps you open the real source, notice the pattern, and copy the skill when comparing it with another project.

Source: [`.claude/skills/ux-ui-review/SKILL.md`](https://github.com/VuNguyentranThe/agent-config/blob/master/.claude/skills/ux-ui-review/SKILL.md)

## What To Notice

- Use it when an existing UI needs evaluation.
- Checks clarity, consistency, accessibility basics, and UI states.
- Uses Figma MCP when a design link is provided.

````markdown
---
name: ux-ui-review
description: Use when reviewing UX/UI flow, layout, interaction, visual hierarchy, accessibility basics, responsive behavior, states, forms, or usability risks. Use Figma MCP when a design link is provided.
argument-hint: <screen, flow, component, or Figma link>
---

# UX/UI Review

## Goal

Evaluate whether the user experience and interface design are clear, usable, consistent, and appropriate for the feature goal.

## Process

1. Identify the target user, goal, context, and primary workflow from `$ARGUMENTS`.
2. When a Figma link or frame is provided, use Figma MCP to inspect the design. If unavailable, request screenshots or exported assets.
3. Read `docs/domain/` for product goal, users, labels, glossary, and user mental model.
4. Inspect the provided screen, design, code, route, or requirement.
5. Check whether the UI supports the main user task with minimal confusion.
6. Check information hierarchy, grouping, labels, navigation, and primary/secondary actions.
7. Check interaction states: loading, empty, error, disabled, success, validation, permission, and destructive actions.
8. Check form behavior, table behavior, filtering, sorting, pagination, and bulk actions when relevant.
9. Check accessibility basics: semantic structure, keyboard access, focus order, labels, contrast risks, and error messaging.
10. Check responsive behavior across mobile, tablet, and desktop when relevant.
11. Check consistency with existing product patterns and visual style.
12. Identify issues by impact on user task completion, clarity, safety, or trust.

## Do Not

- Do not suggest visual design, layout, spacing, color, or styling changes unless they improve usability, clarity, accessibility, or task completion.
- Do not turn this into broad product strategy unless explicitly asked.
- Do not ignore the existing design system or product patterns.
- Do not invent requirements outside the feature goal.
- Do not edit files unless explicitly asked.

## Output

- UX/UI summary
- Findings ordered by impact (High | Medium | Low)
  - Location or flow step
  - Problem
  - Why it matters
  - Suggested fix direction
- Missing states or edge cases
- Accessibility or responsive risks
- Open questions or assumptions
````

