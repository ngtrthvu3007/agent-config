---
name: review-technical
description: Use when reviewing technical quality of specified code, files, modules, components, services, or endpoints beyond a git diff. Covers maintainability, conventions, architecture fit, performance, TypeScript correctness, and test quality.
argument-hint: <file, module, component, or service to review>
---

# Review Technical

## Goal

Assess technical quality of the specified code and surface actionable improvement points without editing files.

## Process

1. Read the target file(s) or module from `$ARGUMENTS` or the active editor file.
2. Read `docs/engineering/conventions/` for the relevant area (general, frontend, backend, API, database).
3. Inspect the specified code, then review usages, call sites, imports, and exports needed to validate it.
4. Check naming consistency across symbols, file names, imports, exports, routes, and CSS class names.
5. Check correctness, readability, maintainability, conventions, architecture fit, error handling, and API/data shape consistency.
6. For TypeScript: check declarations, types, nullability, generics, narrowing, and data shapes.
7. For UI code: check HTML semantics, accessibility basics, CSS class names, and visual behavior risks.
8. Check obvious performance risks: nested loops, repeated expensive work, avoidable re-renders, inefficient queries, excessive network calls.
9. Check whether relevant tests exist and are meaningful for the reviewed layer.
10. If no issues are found, say so clearly and mention residual risk.

## Do Not

- Do not edit files unless explicitly asked.
- Do not review the whole codebase unless explicitly asked.
- Do not use this for git diff reviews — use `review-diff` for that.
- Do not report style-only issues unless they affect maintainability, correctness, or future safety.
- Do not request broad refactors unless needed to address a real technical risk.

## Output

Findings ordered by severity. For each non-trivial finding:

- Severity: High | Medium | Low
- File and line reference
- Problem
- Why it matters
- Suggested fix direction

Then:
- Open questions or assumptions
- Verification gaps or residual risk
