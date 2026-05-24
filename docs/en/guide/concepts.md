# Core Concepts

Before using this repo, understand three foundational concepts: **Agent Config**, **Rule**, and **Skill**.

## What is Agent Config?

Agent config is a collection of files that instruct an AI coding agent to work in your style or your team's style.

Without agent config, every conversation with Claude or Codex requires you to repeat context, conventions, and workflow from scratch. With agent config, all of that is defined once — the agent loads it at the start of every conversation and works correctly from the first turn.

This repo provides a **customizable** agent config template for both Claude Code and Codex.

```
AGENTS.md       ← shared rules for all agents (Codex reads this directly)
CLAUDE.md       ← bridge for Claude Code, imports AGENTS.md and adds Claude-specific config
.claude/        ← Claude Code-specific config
  rules/        ← condensed coding conventions
  skills/       ← specialized workflows
.codex/         ← Codex / ChatGPT-specific config
  skills/       ← specialized workflows
docs/           ← longer-form docs: domain context, full conventions, specs
```

---

## What is a Rule?

A rule is a short, dense coding convention file that the agent reads **right before starting a specific type of task**.

### Characteristics

- Short and dense — only what the agent needs to code to convention
- No long explanations — just clear, actionable directives
- Scoped by task type: frontend, backend, database, API, testing, general
- A condensed version of the full conventions in `docs/engineering/conventions/`

### Example

`.claude/rules/frontend.md` contains:

```markdown
## React / Next.js
- Functional components only; arrow function syntax
- Server Components by default in Next.js App Router
- useEffect goes after local handlers, immediately before the JSX return

## Handlers and Props
- Event handlers: `handle` prefix
- Callback props: `on` prefix
...
```

The agent reads this **before** writing any React component — without you having to remind it.

### Rule vs. code comment

| | Rule | Code comment |
|---|---|---|
| Location | Separate file in `.claude/rules/` | Inside source code |
| Who reads it | AI agent | Developer and AI |
| Purpose | Define working conventions | Explain specific logic |
| When read | At task start | When reading code |

---

## What is a Skill?

A skill is a file that defines a **complete workflow** for a specific type of task.

### Characteristics

- Each skill = one complete workflow (plan → execute → verify)
- Invoked by slash command: `/implement-feature`, `/debug-failure`, etc.
- Or Claude auto-detects based on the `description:` in the frontmatter
- Defines clearly: goal, process steps, what not to do, output format

### SKILL.md structure

```markdown
---
name: skill-name
description: Short description — Claude uses this to auto-detect when to use this skill
argument-hint: <parameter hint>
---

# Skill Name

## Goal
The objective of the skill.

## Process
Step-by-step workflow.

## Do Not
What the skill must not do.

## Output
Expected output format.
```

### Example

`.claude/skills/debug-failure/SKILL.md`:

```markdown
---
name: debug-failure
description: Use when fixing a bug, failing test, regression, runtime error, or stack trace
---

# Debug Failure

## Process
1. Read the error message and stack trace
2. Identify the failing file and line
3. Trace back to root cause — do not fix symptoms
...
```

When you type `/debug-failure test UserService is failing` or paste a stack trace, Claude recognizes it and follows this exact process.

### Skill vs. regular prompt

| | Skill | Regular prompt |
|---|---|---|
| Lives in | File in `.claude/skills/` | In your head |
| Consistency | Same every conversation | Varies by how you type it |
| Version-controlled | ✓ | ✗ |
| Team-shareable | ✓ | Hard to share |

---

## The relationship between Rule and Skill

They don't replace each other — each solves a different problem:

- **Rule** → _"what conventions should I code to?"_
- **Skill** → _"what process should I follow for this task?"_

When Claude implements a feature, it follows the **Implement Feature Skill** (process) while also reading the **backend.md rule** (conventions).
