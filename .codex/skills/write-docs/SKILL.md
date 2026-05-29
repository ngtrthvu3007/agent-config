---
name: write-docs
description: Use when writing, rewriting, polishing, or synchronizing Agent Config documentation pages. Focus on smooth Vietnamese and English prose, clear reading flow, consistent terminology, markdown quality, bilingual sync, and VitePress verification.
---

# Write Docs

## Goal

Write or revise documentation so it is accurate, easy to read, and consistent with the Agent Config docs style.

Use this skill for content work, not broad documentation review. If the task is to find issues first, use a review-oriented workflow before editing.

## Use When

- Rewrite or polish a docs page.
- Create a new guide, overview, reference, or sidebar-facing page.
- Sync a Vietnamese docs page with its English version, or the reverse.
- Turn rough notes into a clear docs page.
- Improve reading flow, section order, wording, examples, or links.
- Update docs after changes to `AGENTS.md`, `CLAUDE.md`, rules, skills, or VitePress navigation.

## Read First

- The target file the user named.
- The matching bilingual file when one exists:
  - `docs/guide/foo.md` -> `docs/en/guide/foo.md`
  - `docs/foo.md` -> `docs/en/foo.md`
- Nearby pages in the same section when flow or terminology may be affected.
- `docs/.vitepress/config.mts` when changing page titles, sidebar labels, or navigation.
- Relevant source files when documenting config behavior:
  - `AGENTS.md`
  - `CLAUDE.md`
  - `.claude/rules/`
  - `.codex/skills/`
  - `.claude/skills/`

## Writing Style

### Vietnamese pages

- Write naturally and warmly, without sounding mechanical.
- Natural and warm means the prose should feel like a careful person explaining the next step: direct, calm, and specific. Avoid stiff labels, robotic transitions, and generic filler.
- Prefer clear explanation over summary or judgment.
- Do not over-conclude for the reader. Present the knowledge and let the reader form the takeaway.
- Keep English keywords when they are product or repo concepts:
  - `Agent Config`
  - `Context file`
  - `rules`
  - `skills`
  - `AGENTS.md`
  - `CLAUDE.md`
  - `ChatGPT Codex`
  - `Claude Code`
- Translate generic English words when they are not fixed concepts.
- Code blocks in Vietnamese docs should use English text, comments, and placeholders unless the user explicitly asks otherwise.
- Do not use questions as page titles or section headings. Use direct, descriptive headings instead.
- Avoid overly assertive titles such as "X is what matters most" when a neutral knowledge title is enough.

Example:

```markdown
# Bad title
## Khi nào config được đọc?

# Better title
## Thời điểm config được đọc

# Too mechanical
Sau khi hoàn tất bước trên, người dùng cần tiến hành cấu hình rules tương ứng với stack của dự án.

# Better
Sau khi đã có file nền, hãy giữ lại những rules khớp với stack bạn thật sự dùng.
```

### English pages

- Match the Vietnamese structure and intent, but write idiomatic English.
- Do not translate word-for-word when it makes the page stiff.
- Keep terminology consistent with the rest of the English docs.
- Preserve repo-specific names and product names exactly.

## Content Principles

- Treat docs as a guided reading flow: each section should answer why the next section exists.
- Keep paragraphs short, but not choppy.
- Use lists when they make choices or paths easier to scan.
- Use tables only when comparison is the main point.
- Prefer concrete examples over abstract advice.
- Put examples in fenced code blocks when the example is something the user may copy or compare.
- Code blocks should use only these language tags:
  - `markdown` or `md` for Markdown content, copied config, rules, skills, and prompt examples.
  - `shell` for shell commands or folder structure trees.
  - `ts` for TypeScript code examples, when code examples are needed.
- Do not use other language tags such as `text`, `bash`, `txt`, `yaml`, or untagged fences unless the user explicitly asks.
- Do not invent behavior, commands, links, limits, or product capabilities.
- If a link points to changing external information, verify it when accuracy matters.
- Do not add broad rewrites outside the requested file unless syncing or navigation requires it.

## Bilingual Sync

When syncing two language versions:

1. Identify the source version for this task.
2. Preserve the same information architecture unless there is a good reason to adapt it.
3. Keep examples, links, caveats, and status badges aligned.
4. Localize tone, not meaning.
5. Update sidebar labels if the page title changed.

Do not let one language silently gain or lose important guidance.

## VitePress Notes

- Use relative docs links for internal pages when possible.
- Use full HTTPS links for external docs or GitHub source links.
- `Badge` components can be used inline for short status labels such as:

```markdown
<Badge type="info" text="Coming soon" />
```

- For muted or secondary text, prefer simple HTML such as `<small>...</small>` over custom styling unless the page already uses custom styling.
- If linking to files in `docs/public/`, use normal public paths such as `/downloads/AGENTS.md`.

## Process

1. Confirm the target page and the role it plays in the docs flow.
2. Read the target, matching bilingual page, and nearby pages.
3. Decide whether the task is a polish, rewrite, sync, or new page.
4. Edit the smallest set of files needed.
5. If a title or sidebar label changes, update `docs/.vitepress/config.mts`.
6. For bilingual docs, sync the matching page when requested or when the change would otherwise leave docs inconsistent.
7. Run `npm run docs:build` when Markdown, links, components, or VitePress config changed.
8. Report changed files and verification.

## Do Not

- Do not use docs to make product claims not supported by the repo.
- Do not add long explanations where a short link or example is clearer.
- Do not make every page a checklist.
- Do not use code comments in Vietnamese inside fenced code blocks for Vietnamese docs.
- Do not rewrite unrelated pages just to match personal taste.
- Do not remove caveats, links, or status labels while syncing languages.

## Output

For normal edits, include:

- Summary
- Changed files
- Verification

For draft-only requests, provide the Markdown content and say where it should live.
