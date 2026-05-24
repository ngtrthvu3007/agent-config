# Set Up Workflows

This page explains how to combine skills, rules, and docs into a consistent workflow for your team — using this repo as a worked example.

## What is a workflow here?

A workflow is a **sequence of skills called in order** when building a feature or fixing a bug. Instead of working ad-hoc, you have a fixed process that both the team and the agent follow.

```
Idea → Spec → Plan → Implement → Review → QA → Done
```

Each step in that chain maps to a skill.

---

## Sample workflow: New feature

The full workflow from idea to production-ready:

### Step 1: Write the spec

```
/write-spec <feature name or short description>
```

Output: a spec file in `docs/specs/` with scope, acceptance criteria, edge cases, and approval points.

**Skip when:** Small, unambiguous task with no spec needed (e.g., adding one field to a form).

### Step 2: Plan the implementation

```
/plan-feature <spec file or description>
```

Output: implementation plan with task breakdown, affected files, approval gates.

**Skip when:** Scope is clear and the task isn't complex.

### Step 3: Implement

```
/implement-feature <task description or spec reference>
```

The agent will:
1. Read the relevant rule files (general + backend/frontend/api...)
2. Implement following the approved plan
3. Run verification

### Step 4: Technical review

```
/review-technical <file or module to review>
```

Agent reviews: conventions, architecture fit, TypeScript correctness, performance.

### Step 5: QA

```
/qa-test <feature or user flow to test>
```

Agent verifies acceptance criteria from the spec, reports pass/fail.

### Step 6: Update docs (if needed)

```
/update-docs <doc section to update>
```

---

## Sample workflow: Bug fix

```
/debug-failure <error message or failing test name>
```

If a regression test is needed after the fix:

```
/write-tests <behavior that was just fixed>
```

---

## Sample workflow: PR review

```
/review-diff <branch or PR description>
```

For deeper technical quality review:

```
/review-solution <approach used in the PR>
/review-technical <most heavily changed file or module>
```

---

## Real example from this repo

This repo is an agent config template. Here are concrete examples of using the workflow with this repo:

### Example 1: Add a new skill

```
# 1. Write a spec for the new skill
/write-spec skill "export-report" — export PDF reports from dashboard

# 2. Create the SKILL.md file
/implement-feature create .claude/skills/export-report/SKILL.md per the spec

# 3. Review the new skill
/review-technical .claude/skills/export-report/SKILL.md

# 4. Update docs
/update-docs add export-report to .claude/README.md and AGENTS.md
```

### Example 2: Update a backend convention

```
# 1. View current convention
# Read: docs/engineering/conventions/backend.md

# 2. Update the source convention
# Edit directly: docs/engineering/conventions/backend.md

# 3. Sync the condensed rule
/update-docs sync .claude/rules/backend.md with updated convention

# 4. Review the diff
/review-diff to check nothing was lost
```

### Example 3: Debug wrong Claude behavior

```
# Claude is not reading frontend.md when working on React tasks
# → Check the mapping table in CLAUDE.md
# → Check the description in the relevant SKILL.md

# 1. Debug
/debug-failure Claude not reading rules/frontend.md when implementing components

# → Agent will: read CLAUDE.md, inspect the mapping table, find the missing trigger
```

---

## Setting up workflows for a team

### 1. Decide the Codex vs Claude split

Pattern in this repo:

```
Claude Code → implement, fix, refactor (tasks needing many file edits)
Codex/GPT   → review, analysis, security (tasks needing broad reading)
```

If the team only uses Claude, move all skills to `.claude/skills/` and remove `.codex/`.

### 2. Define approval gates

List what must have explicit approval before the agent acts. Put this in `AGENTS.md`:

```markdown
## Approval Gates

Ask for approval before:
- Changing database schema
- Changing public API contract
- Adding major dependencies
- ...
```

### 3. Pick only the skills you need

Start with a small set — add more as needed. Too many skills causes the agent to route incorrectly.

Minimum set for a backend project:

| Skill | Reason |
|---|---|
| implement-feature | Core implementation |
| debug-failure | Bug fixing |
| review-technical | Code quality |
| review-diff | PR review |
| write-tests | Test coverage |

### 4. Adapt rules to your real stack

Open `docs/engineering/conventions/` and update for your actual stack. Then sync `.claude/rules/`.

Example: if the project uses MongoDB instead of PostgreSQL:

```markdown
# docs/engineering/conventions/database.md
## MongoDB
- Keep document shapes stable unless approved
- Avoid unbounded document growth
...
```

Remove the PostgreSQL section, add MongoDB rules.

---

## Setup checklist

- [ ] `AGENTS.md` has core rules, approval gates, skill routing
- [ ] `CLAUDE.md` has user profile, agent roles, docs mapping, rule mapping
- [ ] `.claude/rules/` adapted to the real stack
- [ ] `.claude/skills/` only keeps skills the team actually uses
- [ ] `docs/engineering/conventions/` is the source of truth and synced with rules
- [ ] Tested with one small task to verify the agent follows conventions correctly
