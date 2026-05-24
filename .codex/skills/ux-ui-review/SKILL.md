---
name: ux-ui-review
description: Use when reviewing UX/UI flow, layout, interaction, visual hierarchy, accessibility basics, responsive behavior, states, forms, tables, navigation, or usability risks. Do not use for code-quality review unless UI implementation details affect the user experience.
---

# UX/UI Review

## Goal

Evaluate whether the user experience and interface design are clear, usable, consistent, and appropriate for the feature goal.

## Use When

- Review a page, screen, component, flow, form, table, modal, dashboard, or navigation.
- Review a proposed UX/UI design before implementation.
- Review an implemented UI against requirements or acceptance criteria.
- Check usability, visual hierarchy, interaction states, accessibility basics, or responsive risks.
- Identify missing loading, empty, error, disabled, permission, or edge states.

## Expected Inputs

Helpful inputs include:

- Screenshot, route, design link, component, page, flow, or feature requirement.
- Figma link/frame/component, Stitch prototype, or exported design artifact when available.
- Target user, primary task, acceptance criteria, and expected behavior.
- Viewport/device context when responsive behavior matters.
- Existing design system, product pattern, or visual reference when available.

## External Design Sources

When relevant and available:

- Use Figma MCP when the user provides a Figma file, frame, component, design link, or asks to compare implementation against Figma.
- Use Stitch MCP when the user provides a Stitch design/prototype or asks to review a generated UI concept.
- Treat external design sources as reference material, not as permission to edit code or design files.
- If the MCP source is unavailable, ask for screenshots, exported assets, specs, or proceed with the provided context.

## Read When Relevant

- `docs/domain/` for product goal, users, labels, glossary, and user mental model.
- `docs/engineering/` for prior decisions, frontend conventions, and UI implementation constraints.

## Process

1. Identify the target user, goal, context, and primary workflow.
2. Inspect the provided screen, design, code, route, screenshot, or requirement.
3. Check whether the UI supports the main user task with minimal confusion.
4. Check information hierarchy, grouping, labels, navigation, and primary/secondary actions.
5. Check interaction states: loading, empty, error, disabled, success, validation, permission, and destructive actions.
6. Check form behavior, table behavior, filtering, sorting, pagination, search, and bulk actions when relevant.
7. Check accessibility basics: semantic structure, keyboard access, focus order, labels, contrast risks, and error messaging.
8. Check responsive behavior and layout risks across mobile, tablet, and desktop when relevant.
9. Check consistency with existing product patterns and visual style.
10. Identify issues by impact on user task completion, clarity, safety, or trust.
11. Suggest practical improvements that stay within the requested scope.

## Do Not

- Do not turn this into broad product strategy unless explicitly asked.
- Do not suggest visual design, layout, spacing, color, or styling changes unless they improve usability, clarity, accessibility, consistency, or task completion.
- Do not request decorative polish unless it improves usability, clarity, accessibility, or task completion.
- Do not ignore existing design system or product patterns.
- Do not invent requirements outside the feature goal.
- Do not edit files unless explicitly asked.

## Output

For non-trivial reviews, include:

- UX/UI summary
- Findings ordered by impact
- Suggested improvements
- Missing states or edge cases
- Accessibility or responsive risks
- Open questions or assumptions

For each non-trivial finding, include:

- Impact: High | Medium | Low
- Location or flow step when possible
- Problem
- Why it matters
- Suggested fix direction

For small reviews, concise findings with suggested improvements are enough.
