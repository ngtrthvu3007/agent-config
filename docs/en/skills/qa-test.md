# QA Test

`qa-test` is the skill for validating behavior instead of editing code. This page helps you open the real source, notice the pattern, and copy the skill when comparing it with another project.

Source: [`.claude/skills/qa-test/SKILL.md`](https://github.com/VuNguyentranThe/agent-config/blob/master/.claude/skills/qa-test/SKILL.md)

## What To Notice

- Builds a small checklist for happy paths, edge cases, and regression risk.
- Captures evidence from commands, outputs, status codes, or reproduction steps.
- Does not fix issues unless asked.

````markdown
---
name: qa-test
description: Use when testing or validating a feature, bug fix, user flow, API behavior, or acceptance criteria. Reports pass/fail evidence without editing files unless explicitly asked to fix issues.
argument-hint: <feature, flow, endpoint, or acceptance criteria to test>
---

# QA Test

## Goal

Validate behavior against requirements and report clear pass/fail evidence.

## Process

1. Read `docs/specs/` for feature spec, acceptance criteria, and QA checklist.
2. Read `docs/domain/` for product context, business rules, and expected behavior.
3. Identify the requirement, expected behavior, environment, and test target from `$ARGUMENTS`.
4. Build a small test checklist covering happy path, edge cases, and likely regressions.
5. Run the smallest relevant verification first: targeted tests, API checks, build, or typecheck.
6. Capture evidence: commands run, observed outputs, status codes, or reproduction steps.
7. Report each item as: Pass | Fail | Blocked | Not Tested.
8. If a failure is found, describe reproduction steps and impact — do not fix unless explicitly asked.

## Do Not

- Do not edit files unless explicitly asked to fix issues.
- Do not mark a check as passed without evidence.
- Do not expand into broad exploratory testing unless requested.
- Do not ignore blocked checks — report why they could not be run.

## Output

- Scope tested
- Pass/fail results per checklist item
- Evidence (commands, outputs, status codes)
- Bugs or regressions found
- Blocked checks or residual risk
````

