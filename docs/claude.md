# CLAUDE.md

File bridge riêng cho **Claude Code** — import `AGENTS.md` làm rule nền, sau đó định nghĩa thêm cách Claude làm việc trong dự án.

## Cấu trúc

```
@AGENTS.md          ← import toàn bộ AGENTS.md làm rule chung

## About the User   ← profile người dùng, để Claude điều chỉnh cách trả lời
## Priority Order   ← thứ tự ưu tiên khi rule xung đột
## Agent Roles      ← các vai trò Claude có thể đảm nhận
## Agent Workflow   ← quy trình làm việc từng task
## Documentation Structure  ← bảng mapping docs/ cho Claude
## Coding Conventions       ← rules/ nào đọc khi nào
```

## Priority Order

Khi rules xung đột, áp dụng theo thứ tự (ưu tiên cao hơn thắng):

1. Project-level `CLAUDE.md` (nếu có ở root của project thật)
2. File `CLAUDE.md` này
3. `AGENTS.md`

## Agent Roles

Claude có thể đóng các vai sau tùy yêu cầu task:

| Role | Mô tả |
| --- | --- |
| **Engineer** | Phân tích yêu cầu, lên kế hoạch, implement |
| **UX/UI Designer** | Thiết kế user flow, wireframe, interaction pattern |
| **Business Analyst** | Làm rõ yêu cầu, định nghĩa acceptance criteria |
| **Product Owner** | Viết spec, epic, user story, ưu tiên scope |
| **Technical Writer** | Viết docs, API docs, README, changelog |

## Agent Workflow

Với mỗi task:

1. **Analyze** — hiểu yêu cầu, xác định vùng ảnh hưởng, flag ambiguities
2. **Clarify** — hỏi 1 câu nếu scope chưa rõ, không hỏi nhiều câu cùng lúc
3. **Plan** — outline approach, affected files, approval gates trước khi code
4. **Execute** — implement trong scope đã xác nhận
5. **Verify** — chạy kiểm tra nhỏ nhất phù hợp, báo cáo kết quả trung thực

## Documentation Structure

| Location | Mục đích | Claude làm gì |
| --- | --- | --- |
| `docs/domain/` | Product context, business rules, glossary | Đọc để hiểu domain; viết khi cập nhật domain docs |
| `docs/specs/` | Epic, user story templates | Đọc template trước khi viết spec mới |
| `docs/engineering/` | Architecture, conventions, decisions | Đọc để hiểu tech context; viết khi cập nhật engineering docs |

## Coding Conventions

| File | Đọc khi |
| --- | --- |
| `.claude/rules/general.md` | Bất kỳ thay đổi code nào |
| `.claude/rules/frontend.md` | React / Next.js |
| `.claude/rules/backend.md` | Express / NestJS / Gin / Fiber |
| `.claude/rules/database.md` | Schema, migration, query |
| `.claude/rules/api.md` | Thêm hoặc sửa API endpoint |
| `.claude/rules/testing.md` | Viết hoặc cập nhật tests |

> Source file: [`CLAUDE.md`](https://github.com/VuNguyentranThe/agent-config/blob/master/CLAUDE.md)
