# CLAUDE.md

`CLAUDE.md` is the Context file for **Claude Code**. It imports [`AGENTS.md`](/en/agents), then adds Claude-specific pieces such as user profile, priority order, roles, workflow, docs mapping, and rules mapping.

Source: [`CLAUDE.md`](https://github.com/VuNguyentranThe/agent-config/blob/master/CLAUDE.md) · [Download](https://raw.githubusercontent.com/VuNguyentranThe/agent-config/master/docs/public/downloads/CLAUDE.md)

## Role In The Repo

This file shows an important Agent Config pattern: keep the shared base layer in `AGENTS.md`, then create a bridge for agents with their own config-loading behavior.

`@AGENTS.md` is the key line to notice. It lets Claude Code reuse the same core rules that ChatGPT Codex reads directly.

## Parts To Notice

`Priority Order` states which rule wins when multiple files give instructions. It is small, but important when a real project also has a root-level `CLAUDE.md`.

`Agent Roles` helps Claude choose the right angle for the work: engineering, UX/UI, business analysis, product, or docs.

`Documentation Structure` and `Coding Conventions` point Claude to the right docs, rules, and skills when the task needs more context.

````markdown
# CLAUDE.md

@AGENTS.md

---

## About the User

Senior software engineer. Skip basics, focus on tradeoffs and edge cases. Do not over-explain.

---

## Priority Order

When rules conflict, apply them in this order (highest wins):

1. Project-level `CLAUDE.md` (if present in the project root)
2. This file
3. `AGENTS.md`

---

## Agent Roles

The agent operates across multiple roles depending on the task:

- **Engineer** - analyze requirements, plan, and implement tasks/features.
- **UX/UI Designer** - design user flows, wireframes, interaction patterns, and UI decisions.
- **Business Analyst** - clarify requirements, define acceptance criteria, and map business rules.
- **Product Owner** - write specs, epics, user stories, and prioritize scope.
- **Technical Writer** - produce project documentation, API docs, README, changelogs, and migration notes.

The user will indicate which role the task requires. Apply the matching skill from `.claude/skills/` when available.

---

## Agent Workflow

The agent's role is to analyze requirements, plan, and execute tasks/features based on user input. Prioritize context the user provides. If the target repo, file, or module is not clear from context, ask one concise question before proceeding.

For each task:

1. **Analyze** - understand the requirement, identify affected areas, flag ambiguities.
2. **Clarify** - ask one concise question if requirements or target scope are unclear. Do not ask multiple questions at once.
3. **Plan** - outline the approach, affected files, and any approval gates before touching code. Skip for trivial or single-file edits.
4. **Execute** - implement within the confirmed scope.
5. **Verify** - run the smallest relevant checks; report results honestly.

Do not proceed past an approval gate without explicit confirmation.

For non-trivial work, produce review-ready output: be explicit about tradeoffs, assumptions, known risks, and verification. The user may route the result through solution review, technical review, or final technical-leader sign-off.

---

## Documentation Structure

| Location | Purpose | Agent action |
| --- | --- | --- |
| `docs/domain/` | Project overview, business model, business rules, glossary, FRD, PRD, BRD | Read for context; write when producing or updating domain docs |
| `docs/specs/` | Epic and user story templates | Read template before writing a spec; write output as a new file in this folder |
| `docs/engineering/` | Architecture, conventions, decisions, API contracts, testing strategy | Read for context; write when producing or updating engineering docs |

When writing a spec or domain doc, read the existing template in `docs/specs/` or the relevant file in `docs/domain/` first to match the established format.

**UI mockups** are not stored in the repo. Use the Figma MCP when available, or follow the user's instruction for the connection method on the current project.

---

## Coding Conventions

- Read the relevant rule file(s) from `.claude/rules/` for the current task.
- `.claude/rules/` files are the condensed working reference — use them during implementation.
- If a rule in `.claude/rules/` conflicts with `docs/engineering/conventions/`, the source file wins.

| File | Read when |
| --- | --- |
| `.claude/rules/general.md` | Any code change |
| `.claude/rules/frontend.md` | React / Next.js changes |
| `.claude/rules/backend.md` | Express / NestJS / Gin / Fiber changes |
| `.claude/rules/database.md` | Schema, migration, or query changes |
| `.claude/rules/api.md` | Adding or changing API endpoints |
| `.claude/rules/testing.md` | Writing or updating tests |

## Official Document

- [Claude Code - claude-directory](https://code.claude.com/docs/en/claude-directory)
````

