# CLAUDE.md

The bridge config file for **Claude Code** — imports `AGENTS.md` as the base rule set, then defines how Claude specifically works in this project.

## Structure

```
@AGENTS.md          ← imports all of AGENTS.md as shared rules

## About the User       ← user profile so Claude adjusts its responses
## Priority Order       ← which rules win when there are conflicts
## Agent Roles          ← roles Claude can take on per task
## Agent Workflow       ← step-by-step process for each task
## Documentation Structure  ← maps docs/ folders to Claude actions
## Coding Conventions       ← which rule file to read and when
```

## Priority Order

When rules conflict, apply in this order (highest wins):

1. Project-level `CLAUDE.md` (if present at the real project root)
2. This `CLAUDE.md`
3. `AGENTS.md`

## Agent Roles

Claude can take on the following roles depending on the task:

| Role | Description |
| --- | --- |
| **Engineer** | Analyze requirements, plan, implement |
| **UX/UI Designer** | Design user flows, wireframes, interaction patterns |
| **Business Analyst** | Clarify requirements, define acceptance criteria |
| **Product Owner** | Write specs, epics, user stories, prioritize scope |
| **Technical Writer** | Write docs, API docs, README, changelogs |

## Agent Workflow

For each task:

1. **Analyze** — understand the requirement, identify affected areas, flag ambiguities
2. **Clarify** — ask one question if scope is unclear; never ask multiple at once
3. **Plan** — outline approach, affected files, approval gates before touching code
4. **Execute** — implement within confirmed scope
5. **Verify** — run the smallest relevant checks; report results honestly

## Documentation Structure

| Location | Purpose | Claude action |
| --- | --- | --- |
| `docs/domain/` | Product context, business rules, glossary | Read for domain understanding; write when updating domain docs |
| `docs/specs/` | Epic, user story templates | Read template before writing a new spec |
| `docs/engineering/` | Architecture, conventions, decisions | Read for technical context; write when updating engineering docs |

## Coding Conventions

| File | Read when |
| --- | --- |
| `.claude/rules/general.md` | Any code change |
| `.claude/rules/frontend.md` | React / Next.js |
| `.claude/rules/backend.md` | Express / NestJS / Gin / Fiber |
| `.claude/rules/database.md` | Schema, migration, query |
| `.claude/rules/api.md` | Adding or modifying API endpoints |
| `.claude/rules/testing.md` | Writing or updating tests |

> Source file: [`CLAUDE.md`](https://github.com/VuNguyentranThe/agent-config/blob/master/CLAUDE.md)
