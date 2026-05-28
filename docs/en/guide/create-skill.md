# Create a Skill

A skill defines the workflow for a specific type of task. This guide covers how to write effective skills for both Claude Code and ChatGPT Codex.

## When should you create a skill?

Create a skill when:
- There's a recurring task type with multiple fixed steps (review, debug, spec writing...)
- You want the agent to follow a specific process rather than decide on its own
- There are approval gates or steps that need user confirmation before continuing
- Your team's workflow has specific characteristics that differ from default behavior

You don't need a skill for:
- Simple one-step tasks (e.g., "rename this variable")
- Things already covered by a rule file

## SKILL.md structure

```markdown
---
name: skill-name-in-kebab-case
description: Short description — Claude uses this to auto-detect when to use this skill
argument-hint: <parameter hint>
---

# Skill Name

## Goal

The objective of the skill — 1-2 sentences.

## Process

1. Step 1
2. Step 2
3. Step 3 — may include approval gate: "Ask for approval before proceeding"

## Do Not

- What not to do
- What not to do

## Output

Description of the expected output when the skill completes.
```

**Real example** — `.claude/skills/debug-failure/SKILL.md`:

```markdown
---
name: debug-failure
description: Use when fixing a bug, failing test, regression, runtime error, or stack trace
argument-hint: <error message or failing test name>
---

# Debug Failure

## Goal
Identify and fix the root cause of a failure without guessing.

## Process
1. Read the error message, stack trace, or failing test output
2. Identify the failing file and line number
3. Trace back to root cause — do not fix symptoms
4. Fix the root cause with minimal diff
5. Run the smallest relevant verification

## Do Not
- Do not fix multiple unrelated issues in one diff
- Do not add defensive code without explaining why

## Output
- Root cause identified
- Fix applied
- Verification result
```

## Principles for effective skills

### 1. Description must be specific enough

`description:` is what Claude uses to auto-detect when to invoke a skill. Too generic → Claude uses it at the wrong time. Too narrow → Claude doesn't recognize it.

```yaml
# Good — specific, clear keywords
description: Use when fixing a bug, failing test, regression, runtime error, or stack trace

# Not good — too generic
description: Use for code problems

# Not good — too narrow
description: Use when pytest test_user_service.py fails
```

### 2. Process = ordered steps, not a checklist

The process should have a logical order. Each step must be actionable.

```markdown
# Good — ordered, actionable
## Process
1. Read the spec or requirements first
2. Identify affected files and dependencies
3. Ask for approval before changing API shape
4. Implement within confirmed scope

# Not good — too vague
## Process
- Read things
- Code stuff
- Review
```

### 3. Approval gates must be explicit

If user confirmation is needed before continuing, say so clearly:

```markdown
## Process
1. Analyze the failing test
2. Identify root cause
3. **Ask for approval** if the fix requires changing public API shape
4. Apply fix
```

### 4. Do Not section prevents dangerous behavior

List what the skill must **not** do — especially important for skills with high blast radius (security, database, deployment).

```markdown
## Do Not
- Do not change database schema without approval
- Do not delete files without approval
- Do not expose stack traces in API responses
```

### 5. Clear output format

Define what the skill returns. This sets expectations for the user and helps the agent produce consistent responses.

```markdown
## Output
- Summary of what changed
- List of changed files
- Verification result (command run + result)
- Known risks or remaining issues
```

## Folder structure

```
.claude/skills/
  my-new-skill/
    SKILL.md          ← the only file required
```

And similarly for ChatGPT Codex:
```
.codex/skills/
  my-new-skill/
    SKILL.md
```

## Register the skill in CLAUDE.md / AGENTS.md

After creating the skill, add it to the **Skill Routing** section in `AGENTS.md`:

```markdown
## Skill Routing

- [Description of when to use it] -> `.claude/skills/my-new-skill/SKILL.md`
```

And add a workflow alias:

```markdown
## Workflow Aliases

- `/my-skill` or `my skill workflow` -> `.claude/skills/my-new-skill/SKILL.md`
```

## When to use ChatGPT Codex vs Claude for a skill?

This repo divides by pattern:

| Agent | Best suited for |
|---|---|
| Claude Code | Implement, fix, refactor — tasks that need many file edits |
| ChatGPT Codex | Review, analysis, security audit — tasks that need broad reading, few edits |

You can create the same skill in both places with different content — e.g., `review-technical` in `.claude/skills/` can focus on fixing, while in `.codex/skills/` it focuses on analysis and reporting.

## Quick template

```markdown
---
name: 
description: Use when [trigger condition — list specific keywords]
argument-hint: <[parameter hint]>
---

# [Skill Name]

## Goal

[1-2 sentences describing the objective]

## Process

1. [First step — usually read input/context]
2. [Analysis step]
3. [Approval gate if needed]
4. [Execution step]
5. [Verification]

## Do Not

- [Dangerous behavior 1]
- [Dangerous behavior 2]

## Output

[Expected output format]
```
