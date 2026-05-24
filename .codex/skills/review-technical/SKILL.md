---
name: review-technical
description: Use when reviewing technical quality of specified code, files, modules, components, services, endpoints, or features beyond a git diff. Review the target and its usages/call sites/imports. Focus on maintainability, readability, naming consistency, conventions, architecture fit, performance, tests, TypeScript correctness, HTML/CSS correctness, and implementation risks. Do not use for current, staged, branch, commit, PR, or other git diff reviews; use review-diff for git changes.
---

# Review Technical

## Goal

Assess the technical quality of specified code and find actionable improvement points without editing files.

## Use When

- Review a file, module, component, service, endpoint, or feature implementation.
- Review a provided code snippet and the related files/usages needed to validate it.
- Check code conventions, readability, maintainability, performance, or test quality.
- Review HTML structure, CSS class names, styling hooks, component structure, or UI implementation details.
- Evaluate whether code uses existing helpers, patterns, APIs, abstractions, layers, file names, imports, and exports correctly.

## Expected Inputs

Helpful inputs include:

- Target file, module, component, service, endpoint, code snippet, or active editor file.
- Requirement, expected behavior, feature spec, or review concern.
- Related usages, call sites, imports, exports, tests, or naming changes when known.
- Areas to focus on, such as maintainability, performance, TypeScript, HTML/CSS, tests, or conventions.

## Process

1. Identify the review scope from user-provided files, folders, components, modules, or requirements.
2. If the requested scope is too broad, ask for a smaller target before reviewing.
3. Read relevant project docs when needed: `docs/engineering/conventions/` for coding conventions, `docs/engineering/architecture.md` for boundaries, or `docs/domain/` for business rules that affect code behavior.
4. Inspect the specified code first, then review usages, call sites, imports, exports, and nearby dependencies needed to validate it.
5. Check naming consistency across symbols, file names, imports, exports, routes, CSS class names, and tests.
6. Check correctness, readability, maintainability, conventions, architecture fit, error handling, and API/data shape consistency.
7. For TypeScript, check declarations, types, nullability, generics, narrowing, and data shapes.
8. For UI code, check HTML semantics, accessibility basics, CSS class names, duplicate/warning-prone class usage, styling hooks, and visual behavior risks.
9. Check obvious performance risks such as unnecessary nested loops, repeated expensive work, avoidable re-renders, inefficient queries, or excessive network calls.
10. Check whether relevant tests or verification exist and are meaningful for the reviewed layer.
11. If no issues are found, say so clearly and mention residual risk.

## Do Not

- Do not edit files unless explicitly asked.
- Do not review the whole codebase unless explicitly asked.
- Do not turn this into business or solution tradeoff analysis unless explicitly asked.
- Do not use this for git diff reviews; use `review-diff` for current, staged, branch, commit, or PR diffs.
- Do not report style-only issues unless they affect maintainability, consistency, correctness, reuse, or future change safety.
- Do not request broad refactors unless needed to address a real technical risk.
- Do not speculate without pointing to code, behavior, requirement, or project convention.

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

For small reviews, concise findings with file references and fix direction are enough.
