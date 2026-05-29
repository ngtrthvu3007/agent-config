# Quick Start

## 1. Create `AGENTS.md` at your project root

Download or copy the content below, place it at your project root, and fill in your details:

<a href="/downloads/AGENTS.md" download>Download AGENTS.md</a>

```markdown
## Project

[Short project description — 1-2 sentences]

## Stack

[Tech stack you're using]

## How to Work

- [Most important convention]
- [Second convention]

## Core Rules

- Keep changes scoped to the current task.
- Do not edit unrelated files.
- Do not perform broad refactors unless explicitly requested.
- Do not delete files or large blocks of code without approval.
- Prefer existing project patterns over new abstractions.
- If requirements are unclear, ask one concise question before editing.
- If the user provides files, folders, logs, stack traces, screenshots, or test names, start from those.
- If no files are provided but an active editor file is available, inspect the active editor file first.
- If no relevant files are provided and no active editor file is available, use fast search to identify the smallest relevant code area.
- Do not scan the whole repository by default.

## Default Conventions

- Prefer simple, explicit, maintainable code.
- Reuse existing helpers, services, components, hooks, and utilities before creating new ones.
- Do not add dependencies unless clearly necessary and approved.
- Preserve existing API request and response shapes unless a contract change is approved.
- Validate inputs at system boundaries.
- Use consistent error handling with the existing project style.
- Add or update tests for changed behavior when practical.
- Test behavior rather than implementation details.
- Do not suppress lint, type, build, or test failures without explaining why.
- Do not change UI styling, CSS classes, layout, spacing, colors, or visual design unless the task explicitly requires it.

## Approval Gates

Ask for approval before:

- Changing database schema or migrations
- Changing public API request/response shape
- Changing authentication or authorization behavior
- Changing payment behavior
- Changing secrets handling
- Changing deployment, CI/CD, or infrastructure
- Adding major dependencies
- Changing broad architecture or module boundaries
- Deleting files or large blocks of code

## Verification

After code changes:

- Inspect affected files and nearby call sites.
- Run the smallest relevant verification first.
- Prefer lint, typecheck, build, or tests based on the changed area.
- Do not claim verification passed if commands were not run.
- Report any verification command that could not be run.

## Final Response

Keep the final response concise.

For non-trivial tasks, include:

- Summary
- Changed files
- Verification
- Known issues or remaining risk

For review tasks: put findings first ordered by severity, include file and line references, say clearly if no issues are found.
```

## 2. Test it

Open your AI tool and try a small task in the project. If the AI responds with the right stack and conventions without you having to repeat them — config is working.

---

## Using with Claude Code

Claude Code does not read `AGENTS.md` directly. You need a `CLAUDE.md` at the project root:

<a href="/downloads/CLAUDE.md" download>Download CLAUDE.md</a>

```markdown
@AGENTS.md

## About Me

[Your main stack, level, what doesn't need explaining]

## Agent Roles

The agent operates across multiple roles depending on the task:

- **Engineer** — analyze requirements, plan, and implement tasks/features.
- **UX/UI Designer** — design user flows, wireframes, interaction patterns, and UI decisions.
- **Business Analyst** — clarify requirements, define acceptance criteria, and map business rules.
- **Product Owner** — write specs, epics, user stories, and prioritize scope.
- **Technical Writer** — produce project documentation, API docs, README, changelogs, and migration notes.

## Agent Workflow

For each task:

1. **Analyze** — understand the requirement, identify affected areas, flag ambiguities.
2. **Clarify** — ask one concise question if requirements or target scope are unclear. Do not ask multiple questions at once.
3. **Plan** — outline the approach, affected files, and any approval gates before touching code. Skip for trivial or single-file edits.
4. **Execute** — implement within the confirmed scope.
5. **Verify** — run the smallest relevant checks; report results honestly.

Do not proceed past an approval gate without explicit confirmation.
```

Fill in the `About Me` section. The `@AGENTS.md` directive tells Claude Code to load both files at the start of every new conversation.

---

Want to understand why the config is structured this way — [Core Concepts](/en/guide/concepts).
