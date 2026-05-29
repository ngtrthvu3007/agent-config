# AGENTS.md

`AGENTS.md` là Context file nền của repo. **ChatGPT Codex** đọc file này trực tiếp; **Claude Code** tái sử dụng qua [`CLAUDE.md`](/claude); agent khác có thể dùng cùng quy ước nếu hỗ trợ `AGENTS.md`.

Nguồn: [`AGENTS.md`](https://github.com/VuNguyentranThe/agent-config/blob/master/AGENTS.md) · [Tải file](https://raw.githubusercontent.com/VuNguyentranThe/agent-config/master/docs/public/downloads/AGENTS.md)

## Vai trò trong repo

File này giữ các quy tắc chung agent cần biết trước khi đọc tài liệu chi tiết hơn. Nó không thay thế [`rules`](/rules/general) hoặc [`skills`](/skills/plan-feature); nó định tuyến agent tới đúng nơi khi tác vụ cần thêm ngữ cảnh.

Ví dụ, một yêu cầu sửa tính năng sẽ bắt đầu từ `Core Rules`, đi qua `Skill Routing` để chọn quy trình phù hợp, rồi mới đọc rule chuyên biệt như [Frontend Rules](/rules/frontend) hoặc [Backend Rules](/rules/backend).

## Các phần đáng chú ý

`Purpose` làm rõ quan hệ giữa các agent: ChatGPT Codex đọc file này trực tiếp, còn Claude Code import qua `CLAUDE.md`.

`Core Rules` là lớp an toàn trước khi chỉnh code. Những rule như giữ phạm vi nhỏ và không sửa file không liên quan giúp tránh viết lại quá rộng ngoài ý muốn.

`Approval Gates` liệt kê các thay đổi cần xác nhận trước, như schema, hợp đồng API, auth, payment, secrets, hạ tầng, hoặc thư viện lớn.

`Skill Routing` nối loại yêu cầu với skill tương ứng, ví dụ lập kế hoạch, thực hiện, review, QA, security, hoặc tài liệu.

````markdown
# AGENTS.md

## Purpose

Shared operating rules for AI coding agents working in this repository.

Codex reads this file directly.
Claude Code should import this file from `CLAUDE.md`.

Keep this file short and stable. Put detailed workflows in `.codex/skills/*/SKILL.md` and detailed project guidance in `docs/domain/*`, `docs/engineering/*`, and `docs/specs/*`.

For product or domain context, read relevant files in `docs/domain/`.

## Core Rules

- Keep changes scoped to the current task.
- Do not edit unrelated files.
- Do not perform broad refactors unless explicitly requested.
- Do not delete files or large blocks of code without approval.
- Prefer existing project patterns over new abstractions.
- If requirements are unclear, ask one concise question before editing.
- If the user provides files, folders, logs, stack traces, screenshots, or test names, start from those.
- If no files are provided but an active editor file is available, inspect the active editor file first.
- Treat the active editor file as a starting point, not proof that it is the only relevant file.
- If no relevant files are provided and no active editor file is available, use fast search to identify the smallest relevant code area.
- Do not scan the whole repository by default.

## Default Conventions

Use these defaults unless project-specific guidance says otherwise.

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

## Project Guidance

Read only when relevant:

- Feature specs, acceptance criteria, and approval points: `docs/specs/`
- Product/domain context, business rules, and glossary: `docs/domain/`
- Engineering overview, architecture, conventions, and decisions: `docs/engineering/`

If a referenced file does not exist, continue with the best available local context.

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
- Changing UI styling, CSS classes, layout, spacing, colors, or visual design
- Deleting files or large blocks of code
- Modifying generated files by hand

## Skill Routing

Use the matching skill for the current workflow:

- Solution review, approach tradeoffs, feasibility, alternatives -> `.codex/skills/review-solution/SKILL.md`
- Spec writing, epic, user story, acceptance criteria, scope document -> `.codex/skills/write-spec/SKILL.md`
- Planning, architecture, task breakdown, implementation plan -> `.codex/skills/plan-feature/SKILL.md`
- Implementation, approved feature work, scoped refactor -> `.codex/skills/implement-feature/SKILL.md`
- Bug, failing test, regression, runtime error, stack trace -> `.codex/skills/debug-failure/SKILL.md`
- Code review, diff review, PR review -> `.codex/skills/review-diff/SKILL.md`
- Technical quality review of specified code, files, modules, or features -> `.codex/skills/review-technical/SKILL.md`
- UX/UI review, layout, interaction, responsive behavior, accessibility basics -> `.codex/skills/ux-ui-review/SKILL.md`
- QA/QC, flow testing, acceptance validation -> `.codex/skills/qa-test/SKILL.md`
- Auth, authorization, permissions, tokens, cookies, secrets, payment, private data -> `.codex/skills/security-review/SKILL.md`
- Test creation, coverage, regression test -> `.codex/skills/write-tests/SKILL.md`
- README, setup docs, API docs, changelog, migration notes -> `.codex/skills/update-docs/SKILL.md`

## Workflow Aliases

- `/plan` or `plan workflow` -> `.codex/skills/plan-feature/SKILL.md`
- `/review-solution` or `solution review workflow` -> `.codex/skills/review-solution/SKILL.md`
- `/spec` or `write spec workflow` -> `.codex/skills/write-spec/SKILL.md`
- `/implement` or `implementation workflow` -> `.codex/skills/implement-feature/SKILL.md`
- `/debug` or `debug workflow` -> `.codex/skills/debug-failure/SKILL.md`
- `/review` or `review workflow` -> `.codex/skills/review-diff/SKILL.md`
- `/review-technical` or `technical review workflow` -> `.codex/skills/review-technical/SKILL.md`
- `/ux-ui-review` or `ux ui review workflow` -> `.codex/skills/ux-ui-review/SKILL.md`
- `/qa` or `qa workflow` -> `.codex/skills/qa-test/SKILL.md`
- `/security` or `security workflow` -> `.codex/skills/security-review/SKILL.md`
- `/tests` or `test workflow` -> `.codex/skills/write-tests/SKILL.md`
- `/docs` or `docs workflow` -> `.codex/skills/update-docs/SKILL.md`

## Multi-Step Requests

When the user asks for multiple actions in one prompt, execute them in the requested order unless safety requires stopping.

For prompts like "review this feature, fix issues, then refactor":

1. Review against the stated requirements first.
2. Report the issues found.
3. Fix only confirmed issues.
4. Refactor only within the touched or explicitly requested scope.
5. Run relevant verification.

Do not skip earlier requested steps.
Keep refactors within the requested step and scope.
If a requested step requires approval, stop and ask before continuing.

## Verification

After code changes:

- Inspect affected files and nearby call sites.
- Run the smallest relevant verification first.
- Prefer lint, typecheck, build, or tests based on the changed area.
- For TypeScript changes, check declarations, types, nullability, generics, and data shapes.
- Run backend tests when backend behavior changes or backend tests are available.
- Frontend tests are optional unless already relevant or explicitly requested.
- Do not claim verification passed if commands were not run.
- Report any verification command that could not be run.

## Final Response

Keep the final response concise.

For non-trivial implementation, debugging, refactor, QA, test, or documentation tasks, include:

- Summary
- Changed files
- Verification
- Known issues or remaining risk

For small or single-file tasks, a short summary plus verification result is enough.

For review tasks:

- Put findings first, ordered by severity.
- Include file and line references when possible.
- If no issues are found, say so clearly.
- Mention verification gaps or residual risk.
````
