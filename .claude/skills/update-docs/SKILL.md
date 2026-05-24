---
name: update-docs
description: Use when creating or updating README, setup docs, API docs, architecture notes, changelogs, migration notes, developer guides, or project documentation. Output saved to docs/domain/ or docs/engineering/ as appropriate.
argument-hint: <documentation target or topic>
---

# Update Docs

## Goal

Create or update documentation that accurately reflects current project behavior and workflow.

## Process

1. Identify the documentation target, audience, and source of truth from `$ARGUMENTS`.
2. Read existing docs near the target topic before writing — match the established format.
3. Read `docs/domain/` for product context, business rules, and glossary when writing domain docs.
4. Read `docs/engineering/` for architecture, conventions, and decisions when writing technical docs.
5. Read `docs/specs/` when documenting feature behavior or acceptance criteria.
6. Keep edits scoped to the requested topic.
7. Prefer concrete commands, paths, examples, and expected outputs over vague prose.
8. Verify commands, paths, env vars, and file names when practical.
9. Mark assumptions or unverified steps clearly.
10. Save output to `docs/domain/` for domain/product docs, or `docs/engineering/` for technical docs.

## Do Not

- Do not invent features, commands, env vars, or behavior.
- Do not rewrite unrelated documentation.
- Do not document aspirational behavior as if it already exists.
- Do not duplicate long project context when a link or short reference is enough.

## Output

**Non-trivial updates:**
- Summary
- Changed files
- Verification result
- Known assumptions or unverified items

**Small edits:** short summary and verification note.
