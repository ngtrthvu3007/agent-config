---
name: update-docs
description: Use when creating or updating README files, setup docs, API docs, architecture notes, changelogs, migration notes, developer guides, or project documentation. Focus on accuracy, current code behavior, clear steps, verified commands, and concise documentation.
---

# Update Docs

## Goal

Create or update documentation that accurately reflects the current project behavior and workflow.

## Use When

- Update README, setup docs, developer guides, or project documentation.
- Document API behavior, configuration, architecture, decisions, changelog, or migration notes.
- Explain how to run, test, deploy, or use part of the project.
- Align docs with code changes or review findings.

## Expected Inputs

Helpful inputs include:

- Documentation target and audience.
- Source of truth: code, config, API behavior, setup command, feature change, or migration.
- Relevant paths, env vars, commands, examples, screenshots, or release notes.

## Read When Relevant

- Existing docs near the target topic.
- `docs/specs/` when documenting feature behavior or acceptance criteria.
- `docs/domain/` for product context, business rules, glossary, and domain terms.
- `docs/engineering/` for architecture, conventions, decisions, API behavior, and technical docs.

## Process

1. Identify the documentation target, audience, and source of truth.
2. Inspect existing docs and current code/configuration before writing.
3. Keep edits scoped to the requested topic.
4. Prefer concrete commands, paths, examples, and expected outputs over vague prose.
5. Verify commands, paths, env vars, and file names when practical.
6. Mark assumptions or unverified steps clearly.
7. Keep documentation concise and easy to scan.

## Do Not

- Do not invent features, commands, env vars, or behavior.
- Do not rewrite unrelated documentation.
- Do not document aspirational behavior as if it already exists.
- Do not duplicate long project context when a link or short reference is enough.

## Output

For non-trivial doc updates, include:

- Summary
- Changed files
- Verification
- Known assumptions or unverified items

For small doc edits, a short summary plus verification note is enough.
