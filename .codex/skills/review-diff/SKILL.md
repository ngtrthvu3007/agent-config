---
name: review-diff
description: Use when reviewing code, current diffs, pull requests, or changes before merge. Focus on bugs, regressions, missing tests, security issues, and requirement mismatches.
---

# Review Diff

## Goal

Find actionable issues introduced by git changes.

## Use When

- Review current diff, staged changes, a commit, branch diff, or pull request.
- Check whether changed code is safe before commit or merge.
- Find bugs, regressions, missing tests, security issues, or requirement mismatches in changed code.

## Expected Inputs

Helpful inputs include:

- Review target: working tree diff, staged changes, commit, branch diff, pull request, or user-provided files.
- Stated requirement, bug fix summary, feature spec, or acceptance criteria when available.
- Areas of concern such as API contract, security, tests, performance, UI, or migration risk.

## Process

1. Determine the review target: working tree, staged, commit, branch, PR, or user-provided files.
2. Inspect the diff before reading unchanged code.
3. Read surrounding code and call sites only to understand impact or avoid false positives.
4. Check changed code for requirement mismatch, bugs, regressions, missing tests, security/data leaks, and maintainability risks.
5. Check relevant conventions and existing patterns in changed code.
6. For TypeScript, check declarations, types, nullability, generics, and data shapes.
7. For UI changes, check HTML, CSS class names, styling hooks, component structure, and visual behavior impacted by the diff.
8. If no issues are found, say so clearly and mention residual risk.

## Do Not

- Do not edit files unless explicitly asked.
- Do not review the whole codebase or turn this into business/solution tradeoff analysis unless explicitly asked.
- Do not report style, convention, or class name issues unless they affect correctness, maintainability, consistency, reuse, styling behavior, or future change safety.
- Do not request broad refactors unless needed to fix a real issue introduced by the diff.
- Do not speculate without pointing to code, behavior, or a requirement.

## Output

Put findings first, ordered by severity.

For each non-trivial finding, include:

- Severity
- File and line reference when possible
- Problem
- Why it matters
- Suggested fix direction

Then include:

- Open questions or assumptions
- Verification gaps or residual risk
