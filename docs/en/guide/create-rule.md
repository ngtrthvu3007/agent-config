# Create a Rule

A rule is a short coding convention file the agent reads right before starting a specific type of task. This guide covers how to write rules that actually work.

## When should you create a rule?

Create a rule when:
- The project has unconventional conventions the agent keeps getting wrong
- The team has made specific technical decisions (e.g., use Zod not Yup, use Gin not Echo)
- There's a pattern you have to remind the agent about repeatedly

You don't need a rule for:
- Common conventions the agent already knows (e.g., use `const` over `let`)
- Rules that apply to only one specific file
- Domain or business logic — put that in `docs/domain/` instead

## Rule file structure

Rule files are plain markdown. No required frontmatter.

**Recommended structure:**

```markdown
# [Name] Rules

Apply when [short trigger description]. Read `docs/engineering/conventions/[file].md` for full detail.

## [Section 1: First rule group]

- Short, actionable rule
- No justification — just the rule
- Use bullet lists, not paragraphs

## [Section 2]

- ...
```

**Real example** — `.claude/rules/backend.md`:

```markdown
# Backend Rules

Apply to Express / NestJS / Gin / Fiber changes.

## Controllers / Routes

- Thin controllers: parse inputs, call service, return response
- No business logic or database queries in controllers
- Validate inputs at the boundary before calling service logic

## Services

- Services own business logic. Keep methods focused on one use case
- Explicit return types on all service methods
- Keep functions under 100 lines
...
```

## Principles for effective rules

### 1. Short and dense

The agent reads rules to refresh context quickly, not to learn. Each bullet = one clear directive.

```markdown
# Good
- `async/await` consistently. Explicit return types on service methods.

# Not good
# In this project we decided to use async/await because it's more readable
# than promise chains. Also, service methods should have explicit return types
# so TypeScript can check them properly.
```

### 2. Actionable, not descriptive

```markdown
# Good
- No raw database queries in controllers

# Not good
- Database queries should be handled properly
```

### 3. Clear scope

Each rule file should cover one layer or domain. Don't mix frontend and backend in one file.

### 4. Keep the source of truth in `docs/engineering/conventions/`

Rules in `.claude/rules/` are condensed summaries — the real source is `docs/engineering/conventions/`. If they conflict, the convention file wins.

```
docs/engineering/conventions/frontend.md   ← source of truth (complete, with explanations)
.claude/rules/frontend.md                  ← condensed version for the agent to read quickly
```

## Register the new rule in CLAUDE.md

After creating the rule file, add it to the mapping table in `CLAUDE.md`:

```markdown
## Coding Conventions

| File | Read when |
|---|---|
| `.claude/rules/general.md`     | Any code change |
| `.claude/rules/frontend.md`    | React / Next.js changes |
| `.claude/rules/my-new-rule.md` | [when to read]  |  ← add here
```

## Quick template

Copy and adapt for your project:

```markdown
# [Domain] Rules

Apply when [trigger condition]. Read `docs/engineering/conventions/[file].md` for full detail.

## [Principles / Overview]

- [Rule 1]
- [Rule 2]

## [Controllers / Components / Handlers]

- [Rule]

## [Services / Hooks / Business Logic]

- [Rule]

## [Error Handling]

- [Rule]

## [Naming]

- [Rule]
```
