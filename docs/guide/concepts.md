# Khái niệm cơ bản

## Agent Config là gì?

Agent config là tập hợp các file hướng dẫn AI coding agent làm việc đúng phong cách của bạn hoặc team — thay vì phải nhắc lại convention và workflow mỗi lần chat.

Repo này là một bộ agent config mẫu có thể copy và tùy chỉnh, tích hợp cho cả Claude Code, ChatGPT(Codex) và hơn thế nữa. Bạn có thể dùng 1 agent để làm việc hoàn toàn ko ảnh hưởng hiệu suất, thứ ảnh hưởng hiệu suất là gói agent (pricing plan bạn dùng).

Nếu bạn đang cần nâng cấp cách dùng AI cho coding giữa hàng tấn kiến thức hỗn loạn ngoài kia thì Agent Config dành cho bạn.

```shell
project/
├── AGENTS.md        # Rule chung cho mọi AI agent — Codex đọc trực tiếp
├── CLAUDE.md        # Bridge riêng cho Claude Code, import AGENTS.md
├── .claude/         # Config riêng cho Claude Code
│   ├── rules/       # Tập hợp quy tắc code theo từng domain
│   └── skills/      # Tập hợp quy trình làm việc theo từng loại task
├── .codex/          # Config riêng cho Codex
│   ├── rules/       # Tập hợp quy tắc code theo từng domain
│   └── skills/      # Chứa các tài liệu kỹ thuật, convention của dự án với quy mô vừa và nhỏ
└── docs/            # Tài liệu dài hơn — domain context, conventions đầy đủ, specs
    ├── domain/
    ├── engineering/ # Chứa các tài liệu kỹ thuật, convention của dự án với quy mô vừa và lớn
    └── specs/
...
```

---

## Rules là gì?

Rules là **tập hợp các quy tắc code** được viết dưới dạng file, mô tả cách agent nên viết code trong dự án của bạn — convention về naming, cấu trúc, error handling, và các quyết định kỹ thuật cụ thể của team.

Trong repo này, rules nằm ở `.claude/rules/`, mỗi file tương ứng với một domain: `frontend`, `backend`, `database`, `api`, `testing`, `general`.

Agent nạp rule phù hợp ngay trước khi bắt đầu task — không cần bạn nhắc.

### Đặc điểm của Rules

- Ngắn, dense — chỉ chứa những gì agent cần để làm đúng ngay
- Không giải thích lý do — chỉ liệt kê quy tắc rõ ràng, actionable
- Scope theo domain: mỗi file cover một layer/area cụ thể
- Là bản rút gọn của conventions đầy đủ trong `docs/engineering/conventions/`

### Ví dụ về Rule

`.claude/rules/frontend.md`:

```markdown
## React / Next.js
- Functional components only; arrow function syntax
- Server Components by default in Next.js App Router
- useEffect goes after local handlers, immediately before the JSX return

## Handlers and Props
- Event handlers: `handle` prefix
- Callback props: `on` prefix
```

Agent đọc file này trước khi viết React component — không cần bạn nhắc.

### Rules khác gì comment trong code?

| | Rules | Code comment |
| --- | --- | --- |
| Vị trí | File riêng trong `.claude/rules/` | Trong file code |
| Ai đọc | AI agent | Developer và AI |
| Mục đích | Định nghĩa quy tắc làm việc | Giải thích logic cụ thể |
| Khi nào nạp | Đầu task | Khi đọc code |

---

## Skills là gì?

Skills là **tập hợp các quy trình làm việc** được viết dưới dạng file, mô tả agent cần làm gì và theo thứ tự nào khi thực hiện một loại task cụ thể — debug, review, implement, viết spec, v.v.

Trong repo này, skills nằm ở `.claude/skills/`, mỗi thư mục là một skill với file `SKILL.md` bên trong.

### Đặc điểm của Skills

- Mỗi skill = 1 workflow hoàn chỉnh (plan → execute → verify)
- Gọi bằng slash command: `/implement-feature`, `/debug-failure`, v.v.
- Hoặc agent tự nhận biết dựa vào `description:` trong frontmatter
- Định nghĩa rõ: goal, process steps, những gì không được làm, output format

### Cấu trúc file SKILL.md

```markdown
---
name: ten-skill
description: Mô tả ngắn — agent dùng để tự nhận biết khi nào cần dùng skill này
argument-hint: <gợi ý tham số>
---

# Tên Skill

## Goal
Mục tiêu.

## Process
Các bước thực hiện.

## Do Not
Những điều không được làm.

## Output
Format output mong đợi.
```

### Ví dụ về Skill

`.claude/skills/debug-failure/SKILL.md`:

```markdown
---
name: debug-failure
description: Use when fixing a bug, failing test, regression, runtime error, or stack trace
---

# Debug Failure

## Process
1. Read the error message and stack trace
2. Identify the failing file and line
3. Trace back to root cause — do not fix symptoms
...
```

Khi bạn gõ `/debug-failure test UserService is failing` hoặc paste stack trace, agent nhận biết và follow đúng process này.

### Skills khác gì prompt thường?

| | Skills | Prompt thường |
| --- | --- | --- |
| Tồn tại | File trong `.claude/skills/` | Trong đầu người dùng |
| Nhất quán | Mọi conversation đều giống nhau | Thay đổi theo cách gõ |
| Version-controlled | ✓ | ✗ |
| Team có thể share | ✓ | Khó |

---

## Mối quan hệ giữa Rules và Skills

Chúng không thay thế nhau:

- **Rules** → _"code theo quy tắc nào?"_
- **Skills** → _"làm task theo quy trình nào?"_

Khi implement một feature, agent vừa follow **Implement Feature Skill** (quy trình) vừa đọc **backend.md rule** (quy tắc code).

---

## Nên viết bằng tiếng Anh

Repo này khuyến nghị viết tất cả file config — `AGENTS.md`, `CLAUDE.md`, rule files, skill files — **bằng tiếng Anh**.

**Lý do thực tế:**

- Agent được train chủ yếu bằng tiếng Anh — instruction bằng tiếng Anh cho kết quả nhất quán hơn
- Dễ share với team quốc tế hoặc contributor mới
- Tránh lỗi edge case khi agent parse instruction tiếng Việt trong ngữ cảnh technical

**Ngoại lệ hợp lý:**

- `docs/domain/` — nếu team toàn người Việt, viết tiếng Việt ổn
- `docs/specs/` — viết theo ngôn ngữ của stakeholder
- Comments giải thích nội bộ — tùy preference của team

Repo này giữ tiếng Việt ở phần docs và README vì đây là project cá nhân, nhưng phần config (AGENTS.md, rules, skills) giữ tiếng Anh.
