# Create A Skill

This page shows how the repo organizes skills for **Claude Code** and **ChatGPT Codex**. It focuses on how an agent routes to the right workflow, not on every possible kind of skill.

Related source: [`AGENTS.md`](/en/agents) routes `.codex/skills/`; [`CLAUDE.md`](/en/claude) routes `.claude/skills/`.

## Role In The Repo

A skill is a named workflow with a description, steps, limits, and an output shape. In this repo:

- `.claude/skills/` contains skills for Claude Code.
- `.codex/skills/` contains skills for ChatGPT Codex.
- [`AGENTS.md`](/en/agents) connects request types to matching skills in `Skill Routing`.

Pages such as [`Plan Feature`](/en/skills/plan-feature), [`Implement Feature`](/en/skills/implement-feature), [`Review Diff`](/en/skills/review-diff), and [`QA Test`](/en/skills/qa-test) are examples to open and compare.

## Route To The Right Skill

`description:` is the most important field for skill routing. It should say which task the skill is for, while staying narrow enough that the agent skips the skill for unrelated work.

Copy-ready pattern:

```markdown
---
name: skill-name
description: Use when [matching task type, important signals, and boundaries]
argument-hint: <input the skill expects>
---

# Skill Name

## Goal

[What this workflow produces]

## Process

1. [Read the right input or context]
2. [Analyze or prepare]
3. [Ask for approval when needed]
4. [Execute or report]
5. [Verify when relevant]

## Do Not

- [Boundary the agent should not cross]

## Output

- [What the final response should include]
```

## What To Notice In The Examples

- `plan-feature` does not edit code; it creates a plan and names approval gates.
- `implement-feature` is for clear-scope work that needs code changes.
- `review-diff` prioritizes git safety before code-quality review.
- `qa-test` validates behavior and reports evidence; it does not fix bugs unless asked.
