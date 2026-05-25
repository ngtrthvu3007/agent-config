# Core Concepts

This repo is organized around three things: config files that tell the agent where it's working and what conventions to follow, **rules** so the agent codes to your style, and **skills** so the agent follows the right process for each type of task.

## Agent Config

Agent config is a collection of files that instruct an AI coding agent to work in your style or your team's style — instead of having to repeat context, conventions, and workflow every conversation.

Repo structure:

```shell
project/
├── AGENTS.md        # shared rules for all AI agents — Codex reads this directly
├── CLAUDE.md        # bridge for Claude Code, imports AGENTS.md
├── .claude/         # Claude Code-specific config
│   ├── rules/       # coding conventions by domain
│   └── skills/      # workflows per task type
├── .codex/          # Codex-specific config
│   └── skills/
└── docs/            # domain context, full conventions, specs
    ├── domain/
    ├── engineering/
    └── specs/
```

---

## Rules

Rules are short, dense convention files the agent reads before starting a specific type of task. Each file covers one layer: `frontend`, `backend`, `database`, `api`, `testing`, `general`.

- Short and dense — only what the agent needs to code correctly
- No explanations — just clear, actionable directives
- A condensed version of the full conventions in `docs/engineering/conventions/`

Example — `.claude/rules/frontend.md`:

```markdown
## React / Next.js
- Functional components only; arrow function syntax
- Server Components by default in Next.js App Router
- useEffect goes after local handlers, immediately before the JSX return

## Handlers and Props
- Event handlers: `handle` prefix
- Callback props: `on` prefix
```

The agent reads this before writing any React component — without you having to remind it. Unlike a code comment, rules live in a separate file and are loaded at the start of a task rather than when reading individual source files.

---

## Skills

Skills are files that define a complete workflow for a specific type of task. Instead of the agent deciding on its own what to do first, a skill spells out each step.

- Each skill = one complete workflow (plan → execute → verify)
- Invoked by slash command: `/implement-feature`, `/debug-failure`, etc.
- Or the agent auto-detects from the `description:` in the frontmatter

SKILL.md structure:

```markdown
---
name: skill-name
description: Short description — Claude uses this to auto-detect when to use the skill
argument-hint: <parameter hint>
---

# Skill Name

## Goal
The objective — 1-2 sentences.

## Process
1. Step 1
2. Step 2 — may have an approval gate

## Do Not
- What the skill must not do

## Output
Expected output format.
```

Unlike a regular prompt: skills are version-controlled, shareable across the team, and produce consistent results in every conversation.

---

## How Rules and Skills work together

They don't replace each other — each solves a different problem:

- **Rules** → _"what conventions should I code to?"_
- **Skills** → _"what process should I follow for this task?"_

When implementing a feature, the agent follows the **Implement Feature Skill** (process) while also reading the **backend.md rule** (coding conventions).
