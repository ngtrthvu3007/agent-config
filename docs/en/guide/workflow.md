# Adapt to Your Project

This repo is a template with sensible defaults for a general stack. To actually use it, a few things need to be adjusted to fit your project.

## Adapt rules to your real stack

The rules in `.claude/rules/` use the repo's defaults — React/Next.js for frontend, Express/NestJS/Gin/Fiber for backend, PostgreSQL for database.

The standard approach is to update the source of truth first, then sync the condensed rule:

```shell
# 1. Update the source convention
vim docs/engineering/conventions/backend.md

# 2. Sync the condensed rule
/update-docs sync .claude/rules/backend.md with the updated convention
```

Concrete example: if the project uses MongoDB instead of PostgreSQL, open `docs/engineering/conventions/database.md`, remove the PostgreSQL section, add MongoDB rules. The rule file follows.

If the project is frontend-only, remove `backend.md`, `database.md`, and `api.md` from `.claude/rules/` entirely, and drop the corresponding rows from the Coding Conventions table in `CLAUDE.md`.

## Trim skills

Remove skills you don't use from `.claude/skills/` and update the Skill Routing section in `AGENTS.md`. Too many skills causes the agent to route incorrectly.

Minimum set for a backend project:

| Skill | Use case |
| --- | --- |
| `implement-feature` | Core implementation |
| `debug-failure` | Bug fixing |
| `review-technical` | Code quality review |
| `review-diff` | PR review |
| `write-tests` | Test coverage |

Add more only when the team has a real need for them.

## Define approval gates

List what requires explicit approval before the agent acts. Put this in `AGENTS.md`:

```markdown
## Approval Gates

Ask for approval before:
- Changing database schema
- Changing public API contract
- Adding major dependencies
```

The repo already ships with a reasonable default set — only change it when you have a specific reason.

## ChatGPT Codex vs Claude

If your team uses both:

```
Claude Code → implement, fix, refactor (tasks needing many file edits)
ChatGPT Codex → review, analysis, security audit (tasks needing broad reading)
```

If you only use Claude, move all skills to `.claude/skills/` and remove the `.codex/` folder.

---

## Day-to-day workflow

Once config fits the project, the daily workflow is straightforward.

### New feature

```
/write-spec <short description>
/plan-feature <spec file>
/implement-feature <task>
/review-technical <changed files>
/qa-test <feature just implemented>
```

Skip `/write-spec` and `/plan-feature` for small tasks with obvious scope.

### Bug fix

```
/debug-failure <error message or failing test name>
/write-tests <behavior that was just fixed>   # if a regression test is needed
```

### PR review

```
/review-diff <branch or PR description>
/review-technical <most heavily changed file>   # for a deeper quality review
```

---

## Checklist

- [ ] `AGENTS.md` has core rules, approval gates, and skill routing that fit the project
- [ ] `CLAUDE.md` has the right user profile, rule mapping matches the rules you kept
- [ ] `.claude/rules/` adapted to the real stack
- [ ] `.claude/skills/` only keeps skills the team actually uses
- [ ] `docs/engineering/conventions/` is the source of truth and synced with rules
- [ ] Tested with one small task to verify the agent follows conventions correctly
