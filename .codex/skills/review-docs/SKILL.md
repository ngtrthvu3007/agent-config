---
name: review-docs
description: Use when reviewing Agent Config documentation pages, docs structure, sidebar labels, bilingual consistency, terminology, reading flow, tone, examples, links, or VitePress docs quality. Review only; do not edit files unless explicitly asked after reporting findings.
---

# Review Docs

## Goal

Review documentation and identify actionable issues before rewriting.

This skill is for review, not editing. If the user asks to fix or rewrite after the review, use `write-docs`.

## Use When

- Review a docs page for clarity, flow, tone, or structure.
- Check whether a page feels too mechanical, verbose, scattered, or hard to follow.
- Compare Vietnamese and English versions for missing or mismatched content.
- Review sidebar labels, page titles, navigation grouping, or docs hierarchy.
- Check terminology consistency across Agent Config docs.
- Validate whether examples, links, code blocks, or status badges are clear and accurate.
- Review docs after changes to `AGENTS.md`, `CLAUDE.md`, rules, skills, or VitePress config.

## Read First

- The target file or section the user named.
- The matching bilingual file when one exists:
  - `docs/guide/foo.md` -> `docs/en/guide/foo.md`
  - `docs/foo.md` -> `docs/en/foo.md`
- Nearby pages in the same section when flow or naming depends on surrounding docs.
- `docs/.vitepress/config.mts` when reviewing page titles, sidebar labels, or navigation.
- Relevant source files when the docs explain repository behavior:
  - `AGENTS.md`
  - `CLAUDE.md`
  - `.claude/rules/`
  - `.codex/skills/`
  - `.claude/skills/`

Do not scan the whole docs tree unless the user asks for a broad docs review.

## Review Criteria

### Reading flow

- The page has a clear role in the docs journey.
- The opening tells the reader what this page helps them do.
- Sections build on each other instead of feeling like separate notes.
- Transitions explain why the next section exists.
- The page does not end abruptly if a short next step would help.

### Tone and wording

- Vietnamese prose sounds natural, calm, and specific.
- English prose is idiomatic, not a stiff translation.
- The page explains knowledge instead of over-concluding for the reader.
- Titles are clear and neutral. Page titles and section headings must not be phrased as questions.
- Avoid robotic transitions such as:

```markdown
# Bad title
## Khi nào config được đọc?

# Better title
## Thời điểm config được đọc

# Too mechanical
Sau khi hoàn tất bước trên, người dùng cần tiến hành cấu hình rules tương ứng.

# Better
Sau khi đã có file nền, hãy giữ lại những rules khớp với stack bạn thật sự dùng.
```

### Terminology

- Keep repo/product terms consistent:
  - `Agent Config`
  - `Context file`
  - `rules`
  - `skills`
  - `AGENTS.md`
  - `CLAUDE.md`
  - `ChatGPT Codex`
  - `Claude Code`
- Translate generic English words in Vietnamese pages when they are not fixed terms.
- Avoid mixing labels such as `Codex`, `ChatGPT`, and `ChatGPT Codex` unless the distinction is intentional.

### Examples and code blocks

- Examples are concrete enough to be useful.
- Code blocks in Vietnamese docs use English text, comments, and placeholders unless the user requested otherwise.
- Prompt examples are not mislabeled as shell commands.
- Tables are used only when comparison is the main point.
- Status labels such as `<Badge type="info" text="Coming soon" />` are clear and not overused.

### Bilingual sync

- Vietnamese and English versions carry the same important guidance.
- Links, examples, caveats, and status badges are aligned.
- The English version is localized, not translated word-for-word.
- Sidebar labels match page titles closely enough that readers do not feel lost.

### Accuracy and navigation

- Links point to existing docs, public assets, or the intended GitHub paths.
- External facts that may change are either sourced or flagged for verification.
- VitePress components and Markdown syntax are likely to render correctly.
- Sidebar or nav changes match `docs/.vitepress/config.mts`.

## Process

1. Identify the review scope from the user request.
2. Read the target file first.
3. Read the matching bilingual page and sidebar config when relevant.
4. Check the page against the review criteria.
5. Report findings first, ordered by impact.
6. Include file and line references when possible.
7. If no meaningful issues are found, say so clearly and mention any remaining risk or optional polish.

## Do Not

- Do not edit files during review unless the user explicitly asks you to fix them.
- Do not rewrite the page inside the review unless the user asks for a draft.
- Do not report pure preference as a finding unless it affects clarity, consistency, or reader flow.
- Do not ask for broad rewrites when a small wording or structure change would solve the issue.
- Do not invent official docs behavior, product limits, or repository paths.
- Do not require Vietnamese and English pages to be literal translations.

## Output

Put findings first, ordered by severity or reader impact.

For each finding, include:

- Severity or impact
- File and line reference when possible
- Problem
- Why it matters
- Suggested fix direction

Then include:

- Open questions or assumptions
- Optional polish ideas
- Verification gaps, such as links or build not checked

If there are no findings, say the page looks good and note any small optional improvements separately.
