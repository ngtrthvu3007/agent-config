# Áp dụng cho Project Thật

Repo này là template với defaults cho một stack chung. Để dùng được thật sự, bạn cần chỉnh một số chỗ cho fit với project hiện tại.

## Chỉnh rules theo stack thật

Rules trong `.claude/rules/` đang dùng defaults của repo — React/Next.js cho frontend, Express/NestJS/Gin/Fiber cho backend, PostgreSQL cho database.

Quy trình chuẩn là chỉnh từ source of truth trước rồi mới sync lại rule rút gọn:

```shell
# 1. Chỉnh convention gốc
vim docs/engineering/conventions/backend.md

# 2. Sync lại rule rút gọn
/update-docs sync .claude/rules/backend.md với convention mới
```

Ví dụ thực tế: project dùng MongoDB thay PostgreSQL thì mở `docs/engineering/conventions/database.md`, xóa section PostgreSQL, thêm MongoDB rules. Rule file theo sau.

Nếu project chỉ có frontend, xóa hẳn `backend.md`, `database.md`, `api.md` khỏi `.claude/rules/` và bỏ các dòng tương ứng trong bảng Coding Conventions của `CLAUDE.md`.

## Trim skills

Xóa những skills không dùng trong `.claude/skills/` và cập nhật lại Skill Routing trong `AGENTS.md`. Quá nhiều skills khiến agent route nhầm.

Tập tối thiểu cho backend project:

| Skill | Dùng cho |
| --- | --- |
| `implement-feature` | Implement task |
| `debug-failure` | Bug fix |
| `review-technical` | Code quality review |
| `review-diff` | PR review |
| `write-tests` | Test coverage |

Thêm dần khi team có nhu cầu thật sự.

## Xác định approval gates

Liệt kê những gì phải xin phép trước khi agent tự làm. Đặt vào `AGENTS.md`:

```markdown
## Approval Gates

Ask for approval before:
- Changing database schema
- Changing public API contract
- Adding major dependencies
```

Defaults trong repo đã có một bộ hợp lý — chỉnh khi có lý do cụ thể.

## Codex vs Claude

Nếu team dùng cả hai:

```
Claude Code → implement, fix, refactor (task cần edit nhiều file)
Codex / GPT → review, analysis, security audit (task cần đọc rộng)
```

Nếu chỉ dùng Claude, move tất cả skills về `.claude/skills/` và xóa folder `.codex/`.

---

## Workflow ngày thường

Khi config đã fit với project, workflow khá đơn giản.

### Feature mới

```bash
/write-spec <mô tả ngắn>
/plan-feature <spec file>
/implement-feature <task>
/review-technical <file đã thay đổi>
/qa-test <feature vừa implement>
```

Bỏ qua `/write-spec` và `/plan-feature` với task nhỏ, rõ scope.

### Bug fix

```bash
/debug-failure <error message hoặc tên test fail>
/write-tests <behavior vừa fix>   # nếu cần regression test
```

### Review PR

```bash
/review-diff <branch hoặc mô tả PR>
/review-technical <file thay đổi nhiều nhất>   # nếu cần review sâu hơn
```

---

## Checklist

- [ ] `AGENTS.md` có core rules, approval gates, skill routing phù hợp
- [ ] `CLAUDE.md` có user profile đúng, rule mapping khớp với rules đang giữ
- [ ] `.claude/rules/` đã được chỉnh theo stack thật
- [ ] `.claude/skills/` chỉ giữ skills team thật sự dùng
- [ ] `docs/engineering/conventions/` là source of truth và sync với rules
- [ ] Test với 1 task nhỏ để verify agent follow convention đúng
