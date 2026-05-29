# Quick Start

## 1. Tạo `AGENTS.md` ở root project

Download hoặc copy nội dung bên dưới, đặt vào root project và điền thông tin của bạn vào:

<a href="/downloads/AGENTS.md" download>Download AGENTS.md</a>

```markdown
## Project

[Short project description — 1-2 sentences]

## Stack

[Tech stack you're using]

## How to Work

- [Most important convention]
- [Second convention]

## Core Rules

- Keep changes scoped to the current task.
- Do not edit unrelated files.
- Do not perform broad refactors unless explicitly requested.
- Do not delete files or large blocks of code without approval.
- Prefer existing project patterns over new abstractions.
- If requirements are unclear, ask one concise question before editing.
- If the user provides files, folders, logs, stack traces, screenshots, or test names, start from those.
- If no files are provided but an active editor file is available, inspect the active editor file first.
- If no relevant files are provided and no active editor file is available, use fast search to identify the smallest relevant code area.
- Do not scan the whole repository by default.

## Default Conventions

- Prefer simple, explicit, maintainable code.
- Reuse existing helpers, services, components, hooks, and utilities before creating new ones.
- Do not add dependencies unless clearly necessary and approved.
- Preserve existing API request and response shapes unless a contract change is approved.
- Validate inputs at system boundaries.
- Use consistent error handling with the existing project style.
- Add or update tests for changed behavior when practical.
- Test behavior rather than implementation details.
- Do not suppress lint, type, build, or test failures without explaining why.
- Do not change UI styling, CSS classes, layout, spacing, colors, or visual design unless the task explicitly requires it.

## Approval Gates

Ask for approval before:

- Changing database schema or migrations
- Changing public API request/response shape
- Changing authentication or authorization behavior
- Changing payment behavior
- Changing secrets handling
- Changing deployment, CI/CD, or infrastructure
- Adding major dependencies
- Changing broad architecture or module boundaries
- Deleting files or large blocks of code

## Verification

After code changes:

- Inspect affected files and nearby call sites.
- Run the smallest relevant verification first.
- Prefer lint, typecheck, build, or tests based on the changed area.
- Do not claim verification passed if commands were not run.
- Report any verification command that could not be run.

## Final Response

Keep the final response concise.

For non-trivial tasks, include:

- Summary
- Changed files
- Verification
- Known issues or remaining risk

For review tasks: put findings first ordered by severity, include file and line references, say clearly if no issues are found.
```

## 2. Test ngay

Mở AI tool bạn đang dùng, thử một task nhỏ trong project. Nếu AI trả lời đúng stack và convention mà không cần bạn nhắc lại — config đang hoạt động.

## Dùng với Claude Code

Claude Code không đọc `AGENTS.md` trực tiếp. Cần thêm `CLAUDE.md` ở root project:

<a href="/downloads/CLAUDE.md" download>Download CLAUDE.md</a>

```markdown
## Project

[Short project description — 1-2 sentences]

## Stack

[Tech stack you're using]

## How to Work

- [Most important convention]
- [Second convention]

## Core Rules

- Keep changes scoped to the current task.
- Do not edit unrelated files.
- Do not perform broad refactors unless explicitly requested.
- Do not delete files or large blocks of code without approval.
- Prefer existing project patterns over new abstractions.
- If requirements are unclear, ask one concise question before editing.
- If the user provides files, folders, logs, stack traces, screenshots, or test names, start from those.
- If no files are provided but an active editor file is available, inspect the active editor file first.
- If no relevant files are provided and no active editor file is available, use fast search to identify the smallest relevant code area.
- Do not scan the whole repository by default.

## Default Conventions

- Prefer simple, explicit, maintainable code.
- Reuse existing helpers, services, components, hooks, and utilities before creating new ones.
- Do not add dependencies unless clearly necessary and approved.
- Preserve existing API request and response shapes unless a contract change is approved.
- Validate inputs at system boundaries.
- Use consistent error handling with the existing project style.
- Add or update tests for changed behavior when practical.
- Test behavior rather than implementation details.
- Do not suppress lint, type, build, or test failures without explaining why.
- Do not change UI styling, CSS classes, layout, spacing, colors, or visual design unless the task explicitly requires it.

## Approval Gates

Ask for approval before:

- Changing database schema or migrations
- Changing public API request/response shape
- Changing authentication or authorization behavior
- Changing payment behavior
- Changing secrets handling
- Changing deployment, CI/CD, or infrastructure
- Adding major dependencies
- Changing broad architecture or module boundaries
- Deleting files or large blocks of code

## Multi-Step Requests

When the user asks for multiple actions in one prompt, execute them in the requested order unless safety requires stopping.

For prompts like "review this feature, fix issues, then refactor":

1. Review against the stated requirements first.
2. Report the issues found.
3. Fix only confirmed issues.
4. Refactor only within the touched or explicitly requested scope.
5. Run relevant verification.

Do not skip earlier requested steps. If a requested step requires approval, stop and ask before continuing.

## Verification

After code changes:

- Inspect affected files and nearby call sites.
- Run the smallest relevant verification first.
- Prefer lint, typecheck, build, or tests based on the changed area.
- Do not claim verification passed if commands were not run.
- Report any verification command that could not be run.

## Final Response

Keep the final response concise.

For non-trivial tasks, include:

- Summary
- Changed files
- Verification
- Known issues or remaining risk

For review tasks: put findings first ordered by severity, include file and line references, say clearly if no issues are found.
```

Muốn hiểu tại sao config được tổ chức theo cách này — [Khái niệm cơ bản](/guide/concepts).
