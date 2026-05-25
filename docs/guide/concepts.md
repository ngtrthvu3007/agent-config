# Khái niệm cơ bản

Repo này tổ chức xung quanh ba thứ: config files để agent biết mình đang làm việc ở đâu và theo convention nào, **rules** để agent code đúng phong cách, và **skills** để agent follow đúng quy trình cho từng loại task.

## Agent Config

Agent config là tập hợp các file hướng dẫn AI coding agent làm việc đúng phong cách của bạn hoặc team — thay vì phải nhắc lại convention và workflow mỗi lần chat.

Cấu trúc của repo này:

```shell
project/
├── AGENTS.md        # Rule chung cho mọi AI agent — Codex đọc trực tiếp
├── CLAUDE.md        # Bridge riêng cho Claude Code, import AGENTS.md
├── .claude/         # Config riêng cho Claude Code
│   ├── rules/       # Rules theo từng domain
│   └── skills/      # Workflows cho từng loại task
├── .codex/          # Config riêng cho Codex
│   └── skills/
└── docs/            # Domain context, conventions đầy đủ, specs
    ├── domain/
    ├── engineering/
    └── specs/
```

---

## Rules

Rules là file convention ngắn gọn mà agent đọc trước khi bắt đầu một loại task cụ thể. Mỗi file cover một layer: `frontend`, `backend`, `database`, `api`, `testing`, `general`.

- Ngắn, dense — chỉ chứa những gì agent cần để làm đúng ngay
- Không giải thích lý do — chỉ quy tắc rõ ràng, actionable
- Là bản rút gọn của conventions đầy đủ trong `docs/engineering/conventions/`

Ví dụ — `.claude/rules/frontend.md`:

```markdown
## React / Next.js
- Functional components only; arrow function syntax
- Server Components by default in Next.js App Router
- useEffect goes after local handlers, immediately before the JSX return

## Handlers and Props
- Event handlers: `handle` prefix
- Callback props: `on` prefix
```

Agent đọc file này trước khi viết React component mà không cần bạn nhắc. Khác với code comment ở chỗ rules nằm tách biệt, được đọc ở đầu task thay vì khi đọc từng file code.

---

## Skills

Skills là file định nghĩa workflow hoàn chỉnh cho một loại task cụ thể. Thay vì agent tự quyết định làm gì trước làm gì sau, skill định nghĩa rõ từng bước.

- Mỗi skill = 1 workflow hoàn chỉnh (plan → execute → verify)
- Gọi bằng slash command: `/implement-feature`, `/debug-failure`, v.v.
- Hoặc agent tự nhận biết từ `description:` trong frontmatter

Cấu trúc file SKILL.md:

```markdown
---
name: ten-skill
description: Mô tả — Claude dùng để tự nhận biết khi nào cần dùng skill này
argument-hint: <gợi ý tham số>
---

# Tên Skill

## Goal
Mục tiêu — 1-2 câu.

## Process
1. Bước 1
2. Bước 2 — có thể có approval gate

## Do Not
- Điều không được làm

## Output
Format output mong đợi.
```

Khác với prompt thường: skill version-controlled, share được cho cả team, và cho kết quả nhất quán ở mọi conversation.

---

## Rules và Skills phối hợp ra sao

Chúng không thay thế nhau — mỗi cái giải quyết vấn đề khác:

- **Rules** → _"code theo quy tắc nào?"_
- **Skills** → _"làm task theo quy trình nào?"_

Khi implement một feature, agent vừa follow **Implement Feature Skill** (quy trình) vừa đọc **backend.md rule** (quy tắc code).
