# Core Concepts

There are three main ways to personalize AI: a **context file**, **rules**, and **skills**.
For most projects, starting with a context file is enough. Add rules and skills when your workflow needs more structure.

## Context File

A context file is a text file at your project root. It describes the project, the technology stack, and how you want AI to work. AI reads this file at the start of each task.

There is no required format. It only needs to be clear enough for AI to understand the context:

```markdown
## Project

Internal task management app. Backend API + web dashboard.

## Stack

Node.js, Express, PostgreSQL, React, TypeScript

## How to Work

- Use camelCase for variables and PascalCase for components
- Do not use `any` in TypeScript
```

The filename depends on the tool you use. `AGENTS.md` is the most common name and works with most AI coding tools, including ChatGPT Codex. Claude uses `CLAUDE.md`.

<small>[Learn more about Claude](https://docs.claude.com/en/docs/claude-code/memory)</small>

## Rules

Rules are the set of instructions AI should follow while working. To keep them easy to manage, rules are often split into files by scope, such as `frontend`, `backend`, `database`, `api`, or `testing`.

- Be as specific as possible: say what to do and what to avoid
- Short examples are more useful than broad, abstract rules
- Load only the rules that are relevant to the current task

Example frontend rules:

```markdown
## React

- Functional components only, arrow function syntax
- Use Server Components by default in the Next.js App Router
- Place `useEffect` after handlers, right before the JSX return

## Handlers

- Event handlers: prefix `handle`
- Callback props: prefix `on`
```

Rules live outside the source code. AI reads them when the task needs them, instead of trying to infer conventions from each source file.

## Skills

Skills define a complete workflow for a type of task. Instead of letting AI decide the order of work on its own, a skill spells out the steps to follow.

```markdown
# Debug Failure

## Goal

Find the root cause and fix it without guessing.

## Process

1. Read the full error message and stack trace
2. Find the related file and line
3. Confirm the root cause before changing code
4. Fix the issue, then run the relevant tests

## Do Not

- Do not change many places at once
- Do not skip verification after the fix
```

Each skill is a consistent workflow that can be version-controlled and shared across the team.

## How the three work together

These three pieces work together, but each solves a different problem:

- **Context file** -> _"Which project is AI working in, and with whom?"_
- **Rules** -> _"Which rules should AI follow when writing code?"_
- **Skills** -> _"Which process should AI follow for this task?"_

For example, when fixing a bug, AI understands the project context from the context file, writes code according to rules, and follows the debug process from a skill.
