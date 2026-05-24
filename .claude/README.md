# .claude/

Thư mục cấu hình dành riêng cho **Claude Code** — AI coding agent của Anthropic.

Toàn bộ nội dung trong thư mục này quy định cách Claude làm việc trong dự án: vai trò, quy trình, conventions, và các workflow cụ thể.

---

## Cấu trúc thư mục

```shell
.claude/
├── README.md          <- file này
├── rules/             <- coding conventions rút gọn để Claude đọc khi làm task
│   ├── general.md
│   ├── frontend.md
│   ├── backend.md
│   ├── database.md
│   ├── api.md
│   └── testing.md
└── skills/            <- workflow chuyên biệt, gọi bằng slash command /ten-skill
    ├── design-ux-ui/
    ├── debug-failure/
    ├── implement-feature/
    ├── plan-feature/
    ├── qa-test/
    ├── review-diff/
    ├── review-solution/
    ├── review-technical/
    ├── security-review/
    ├── update-docs/
    ├── ux-ui-review/
    ├── write-spec/
    └── write-tests/
```

---

## rules/ - Coding Conventions

Mỗi file là bản rút gọn của convention tương ứng trong `docs/engineering/conventions/`.

Claude đọc file nào tùy theo loại task đang làm:

| File | Đọc khi |
| --- | --- |
| `general.md` | Bất kỳ thay đổi code nào |
| `frontend.md` | Làm việc với React / Next.js |
| `backend.md` | Làm việc với Express / NestJS / Gin / Fiber |
| `database.md` | Thay đổi schema, migration, hoặc query |
| `api.md` | Thêm hoặc sửa API endpoint |
| `testing.md` | Viết hoặc cập nhật tests |

> **Lưu ý:** Nếu nội dung trong `rules/` mâu thuẫn với `docs/engineering/conventions/`, file gốc trong `docs/engineering/conventions/` luôn thắng. `rules/` chỉ là working reference để Claude đọc nhanh — cần update `rules/` nếu conventions gốc thay đổi.

### Cách tùy chỉnh

Mở file tương ứng trong `rules/` và chỉnh sửa trực tiếp. Ví dụ:

- Dự án không dùng Tailwind? Xóa phần Tailwind trong `frontend.md`.
- Dự án dùng MongoDB thay PostgreSQL? Giữ lại phần MongoDB, xóa phần PostgreSQL trong `database.md`.
- Dự án có convention đặc biệt về naming? Thêm vào phần Naming trong `general.md`.

---

## skills/ - Workflow chuyên biệt

Mỗi skill là một workflow hoàn chỉnh cho một loại task cụ thể. Claude tự nhận biết và gọi skill phù hợp dựa trên mô tả trong `description:` của frontmatter, hoặc bạn gọi trực tiếp bằng slash command.

### Danh sách skills

| Skill | Slash command | Mục đích |
| --- | --- | --- |
| `design-ux-ui` | `/design-ux-ui` | Thiết kế user flow, wireframe, interaction pattern, UI states từ requirements |
| `debug-failure` | `/debug-failure` | Debug bug, failing test, regression, runtime error |
| `implement-feature` | `/implement-feature` | Implement feature đã được approve, scoped refactor |
| `plan-feature` | `/plan-feature` | Lên kế hoạch implementation: task breakdown, approval gates, risks |
| `qa-test` | `/qa-test` | Kiểm tra acceptance criteria, flow, API behavior — báo pass/fail |
| `review-diff` | `/review-diff` | Review diff/PR, phát hiện code bị override không chủ đích, lên kế hoạch cherry-pick |
| `review-solution` | `/review-solution` | Đánh giá solution/approach: feasibility, tradeoffs, recommendation |
| `review-technical` | `/review-technical` | Review technical quality: conventions, architecture fit, performance, TypeScript |
| `security-review` | `/security-review` | Review auth, permissions, secrets, payment, data leaks |
| `update-docs` | `/update-docs` | Viết hoặc cập nhật README, API docs, architecture notes, changelogs |
| `ux-ui-review` | `/ux-ui-review` | Review UI/UX hiện có: usability, states, accessibility, responsive |
| `write-spec` | `/write-spec` | Viết spec từ ý tưởng: scope, acceptance criteria, edge cases, approval points |
| `write-tests` | `/write-tests` | Viết backend tests: unit, integration, API, authorization, regression |

### Cách gọi skill

```markdown
/implement-feature thêm filter theo status vào API GET /users
/review-diff main..feature/auth
/review-diff override main
/write-spec tính năng export báo cáo PDF
/debug-failure test AuthService failing với lỗi 401
```

### Cách tùy chỉnh skill

Mỗi skill là một file `SKILL.md` trong thư mục tương ứng. Cấu trúc gồm:

```markdown
---
name: ten-skill
description: Mô tả ngắn — Claude dùng để tự nhận biết khi nào cần dùng skill này
argument-hint: <gợi ý tham số khi gọi>
---

# Tên Skill

## Goal
Mục tiêu của skill.

## Process
Các bước thực hiện.

## Do Not
Những điều không được làm.

## Output
Format output mong đợi.
```

Để tùy chỉnh cho phong cách làm việc của bạn:

1. **Thêm bước vào Process** nếu workflow của bạn có bước đặc thù (ví dụ: luôn tạo ticket trước khi implement).
2. **Chỉnh Output format** nếu bạn muốn output theo template khác (ví dụ: thêm section "Impact" vào review findings).
3. **Chỉnh description** nếu bạn muốn Claude tự nhận biết skill trong ngữ cảnh khác.
4. **Thêm skill mới** bằng cách tạo thư mục mới trong `skills/` với file `SKILL.md` theo cấu trúc trên.
5. **Xóa skill không dùng** nếu workflow của bạn không có bước đó — ít skill hơn giúp Claude route chính xác hơn.

---

## Mối quan hệ với các file khác

```markdown
CLAUDE.md           <- cấu hình chính, import AGENTS.md, định nghĩa roles và workflow
AGENTS.md           <- rules dùng chung cho cả Claude và Codex
.claude/rules/      <- conventions rút gọn cho Claude đọc khi làm task
.claude/skills/     <- workflow chuyên biệt cho Claude
.codex/skills/      <- workflow tương đương dành cho Codex / ChatGPT
docs/domain/        <- business context, FRD, PRD, BRD
docs/specs/         <- spec templates và feature specs
docs/engineering/   <- architecture, conventions gốc, decisions
```

> `CLAUDE.md` là entry point. Claude đọc file đó đầu tiên khi bắt đầu conversation. Mọi thứ trong `.claude/` được trỏ đến từ `CLAUDE.md`.

---

## Khi dùng cho dự án mới

1. Copy toàn bộ thư mục `.claude/` vào repo dự án.
2. Copy `CLAUDE.md` và `AGENTS.md` vào root của repo.
3. Chỉnh `rules/` theo conventions của dự án.
4. Xóa hoặc giữ lại skills tùy theo workflow của team.
5. Tạo `docs/domain/`, `docs/specs/`, `docs/engineering/` nếu chưa có.
