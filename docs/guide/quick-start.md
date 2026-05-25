# Quick Start

10 phút để có agent config chạy được trong project thật.

## 1. Copy vào project

Clone repo về hoặc dùng làm GitHub template, sau đó copy những gì cần thiết vào root của project thật:

```shell
cp -r agent-config/AGENTS.md    your-project/
cp -r agent-config/CLAUDE.md    your-project/
cp -r agent-config/.claude/     your-project/
cp -r agent-config/.codex/      your-project/   # nếu dùng Codex
```

## 2. Điều chỉnh CLAUDE.md

Mở `CLAUDE.md`, tìm phần `About the User` và chỉnh lại cho đúng với bạn hoặc team:

```markdown
## About the User

Senior frontend engineer. React + Next.js là chủ yếu. Không cần giải thích TypeScript cơ bản.
```

Phần còn lại giữ nguyên — chỉnh dần khi có nhu cầu thật.

## 3. Trim rules theo stack thật

Vào `.claude/rules/` và xóa những file không dùng. Project frontend-only:

- Giữ lại: `general.md`, `frontend.md`, `testing.md`
- Xóa hoặc để trống: `backend.md`, `database.md`, `api.md`

Sau đó xóa các dòng tương ứng trong bảng **Coding Conventions** của `CLAUDE.md`.

## 4. Test

Mở Claude Code trong project và thử một task nhỏ:

```
/implement-feature add a loading spinner to the user list page
```

Nếu Claude tự đọc `general.md` và `frontend.md` trước khi code mà không cần bạn nhắc — config đang chạy đúng.

---

Từ đây có hai hướng: đọc [Khái niệm cơ bản](/guide/concepts) để hiểu tại sao config được tổ chức theo cách này, hoặc nhảy thẳng vào [Áp dụng cho project thật](/guide/workflow) để chỉnh sâu hơn.
