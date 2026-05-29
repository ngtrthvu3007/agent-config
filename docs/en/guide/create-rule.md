# Create A Rule

This page sits in the **Agent Config** section to show how the repo organizes rules. It is not a replacement for the real rule files. Read it after opening [`General Rules`](/en/rules/general), [`Frontend Rules`](/en/rules/frontend), or [`Backend Rules`](/en/rules/backend).

Related source: [`CLAUDE.md`](/en/claude) maps rules in the `Coding Conventions` section.

## Role In The Repo

A rule is a short convention file the agent reads when a task matches its scope. In this repo, rules live in `.claude/rules/` and Claude Code routes to them through the `Coding Conventions` table in [`CLAUDE.md`](/en/claude).

A good rule has three things worth noticing:

- An `Apply to` or `Apply when` line that says when the agent should read it.
- Headings that group the rule by layer or topic.
- Short bullets the agent can apply while working.

## Route To The Right Rule

The rule should be discoverable only when the task matches its scope. If a rule is for backend work, do not describe it in a way that makes the agent read it for frontend tasks. If a rule is for APIs, the `CLAUDE.md` mapping should say something like "adding or changing API endpoints."

Copy-ready pattern:

```markdown
# [Domain] Rules

Apply when [task scope]. Read `docs/engineering/conventions/[file].md` for full detail.

## [Primary Area]

- [Short rule the agent can apply while working]
- [Another concrete rule]

## [Boundary / Safety]

- [Approval gate or constraint when relevant]
```

## Repo Examples

Open these files to compare how each rule is routed:

- [`General Rules`](/en/rules/general): read for every code change.
- [`Frontend Rules`](/en/rules/frontend): read when the task touches React or Next.js.
- [`Backend Rules`](/en/rules/backend): read when the task touches Express, NestJS, Gin, or Fiber.

When adding a new rule, update the `Coding Conventions` table in [`CLAUDE.md`](/en/claude) so the agent knows when to read it.
