# Bring Agent Config Into Your Project

Once you understand **context files**, **rules**, and **skills**, the next step is to use this repo as a starting point: read the existing structure, keep the parts that fit, and gradually adapt them to your project.

You do not need to copy the entire repo into your codebase. The most useful part is the organization: `AGENTS.md` holds the shared working principles, `CLAUDE.md` helps Claude Code load the right context, rules group conventions by scope, and skills describe workflows for specific task types.

If you want to inspect the full structure before choosing what to keep, start here:

- [GitHub repo](https://github.com/ngtrthvu3007/agent-config): the full Agent Config structure
- [`.claude/rules/`](https://github.com/ngtrthvu3007/agent-config/tree/master/.claude/rules): example rules by scope
- <small>`.codex/rules/`: example rules for ChatGPT Codex <Badge type="info" text="Coming soon" /></small>
- [`.codex/skills/`](https://github.com/ngtrthvu3007/agent-config/tree/master/.codex/skills): example skills for ChatGPT Codex
- [`.claude/skills/`](https://github.com/ngtrthvu3007/agent-config/tree/master/.claude/skills): example skills for Claude Code

## Start from the base file

Start with `AGENTS.md`. This is where the most stable guidance should live: what stack the project uses, how the agent should work, when it should ask first, and which workflows are available.

If you use Claude Code, keep a `CLAUDE.md` file at the project root as well. Claude Code prioritizes `CLAUDE.md`; this repo has `CLAUDE.md` import `AGENTS.md` so shared guidance only needs to be written once. Claude-specific details, such as rule mapping or file-reading guidance, can live after that.

If you only use Claude Code, you can still start with `CLAUDE.md`. When you want to use ChatGPT Codex as well, or share common config with someone else in the same project, move the shared parts into `AGENTS.md`.

If you use both ChatGPT Codex and Claude Code, let `AGENTS.md` be the common base. Tool-specific details should stay in the file or folder for that tool, so one small change does not accidentally affect both setups.

## Keep only the rules you need

The rules in this repo demonstrate a common stack: frontend, backend, database, API, and testing. When adapting them to your project, keep the rules that match the work you actually do.

For example, if the project is frontend-only, you can remove the backend, database, and API rules. If the project uses MongoDB instead of PostgreSQL, update the convention doc first, then condense it into the matching rule.

Example prompt for the agent:

```text
# 1. Update the source convention
vim docs/engineering/conventions/database.md

# 2. Sync the short rule
/update-docs sync database rule from the updated convention
```

A rule should stay short enough for the agent to apply quickly. Longer explanations belong in `docs/engineering/conventions/`, where there is more room for context, reasoning, and detailed examples.

## Keep skills lightweight

Skills are useful when you want the agent to follow a stable workflow, such as writing specs, planning, implementing, debugging, reviewing, or QA. Most projects do not need every skill on day one.

You can open `.codex/skills/` or `.claude/skills/` from the links above, then keep the workflows closest to the way you work.

A small starting set is often enough:

| Skill | Use when |
| --- | --- |
| `implement-feature` | Making a change with clear requirements |
| `debug-failure` | Fixing a bug, failing test, or regression |
| `review-diff` | Reviewing changes before merge |
| `write-tests` | Adding coverage for important behavior |

As your needs become clearer, you can add `write-spec`, `plan-feature`, `qa-test`, or more specialized skills. Adding them gradually is easier to manage than keeping too many workflows from the start.

## Adjust approval gates

Approval gates are the actions the agent should ask about before proceeding. This belongs in `AGENTS.md` because it directly affects how the agent acts in the repo.

```markdown
## Approval Gates

Ask for approval before:
- Changing database schema
- Changing public API contract
- Adding major dependencies
```

The repo already includes a cautious default set. When adapting it to your project, keep the items that still apply and add any boundaries you need to protect, such as payment, deployment, sensitive data, or internal access.

## Try one small task

After the config is adjusted, try one small task that is easy to check. The goal is not to do a lot immediately; it is to see whether the agent reads the context correctly, applies the right rules, and chooses the right skill.

Good trial tasks include:

- Fixing a small bug with a known cause
- Adding a test for simple behavior
- Reviewing a short diff
- Updating a small docs section to match a new convention

If the agent skips a rule, asks about something already written in the file, or chooses the wrong workflow, the fix is usually small: clarify `AGENTS.md`, adjust the relevant rule, or make the skill description more specific.

## Day-to-day workflow

Once the config fits the project, you can use skills as familiar paths for recurring work.

The examples below use workflow aliases from `AGENTS.md`. If your tool does not support this syntax, treat them as short prompts that route the agent to the right skill.

### New feature

```bash
/spec <short description>
/plan <spec file>
/implement <task>
/review-technical <changed files>
/qa <implemented feature>
```

For small tasks with clear scope, you can go straight to `/implement`.

### Bug fix

```bash
/debug <error message or failing test name>
/tests <fixed behavior>
```

Add a regression test when the issue is likely to return or the behavior is important enough to protect.

### PR review

```bash
/review <branch or PR description>
/review-technical <important changed file>
```

Use `/review` to catch issues in the diff first. If a file changed heavily or contains complex logic, use `/review-technical` for a deeper read.
