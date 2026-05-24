# Setup Workflow

Trang này hướng dẫn cách kết hợp skills, rules, và docs thành một workflow nhất quán cho cả team — và lấy repo này làm ví dụ.

## Workflow là gì trong ngữ cảnh này?

Workflow ở đây là **chuỗi skills được gọi theo thứ tự** khi làm một feature hoặc fix một bug. Thay vì làm việc ad-hoc, bạn có một quy trình cố định mà cả team và agent đều follow.

```
Idea → Spec → Plan → Implement → Review → QA → Done
```

Mỗi bước trong chuỗi trên có thể map vào một skill.

---

## Workflow mẫu: Feature mới

Đây là workflow đầy đủ từ idea đến production-ready:

### Bước 1: Viết spec

```
/write-spec <tên feature hoặc mô tả ngắn>
```

Output: file spec trong `docs/specs/` với scope, acceptance criteria, edge cases, và approval points.

**Khi nào bỏ qua:** Task nhỏ, rõ ràng, không cần spec (ví dụ: thêm 1 field vào form).

### Bước 2: Lên kế hoạch implementation

```
/plan-feature <spec file hoặc mô tả>
```

Output: implementation plan với task breakdown, affected files, approval gates.

**Khi nào bỏ qua:** Task đã rõ scope và không phức tạp.

### Bước 3: Implement

```
/implement-feature <mô tả task hoặc reference spec>
```

Agent sẽ:
1. Đọc rule files phù hợp (general + backend/frontend/api...)
2. Implement theo plan đã approve
3. Chạy verification

### Bước 4: Review technical

```
/review-technical <file hoặc module cần review>
```

Agent review: conventions, architecture fit, TypeScript correctness, performance.

### Bước 5: QA

```
/qa-test <feature hoặc user flow cần test>
```

Agent verify acceptance criteria từ spec, báo cáo pass/fail.

### Bước 6: Update docs (nếu cần)

```
/update-docs <phần tài liệu cần cập nhật>
```

---

## Workflow mẫu: Bug fix

```
/debug-failure <error message hoặc failing test name>
```

Nếu cần regression test sau khi fix:

```
/write-tests <behavior vừa fix>
```

---

## Workflow mẫu: Review PR

```
/review-diff <branch hoặc PR description>
```

Nếu cần review technical quality sâu hơn:

```
/review-solution <approach được dùng trong PR>
/review-technical <file hoặc module thay đổi nhiều nhất>
```

---

## Ví dụ thực tế từ repo này

Repo này là agent config template. Dưới đây là ví dụ cụ thể về cách dùng workflow với repo này:

### Ví dụ 1: Thêm một skill mới

```
# 1. Viết spec cho skill mới
/write-spec skill "export-report" — export báo cáo PDF từ dashboard

# 2. Tạo file SKILL.md
# (implement thủ công hoặc dùng implement-feature)
/implement-feature tạo .claude/skills/export-report/SKILL.md theo spec

# 3. Review skill vừa tạo
/review-technical .claude/skills/export-report/SKILL.md

# 4. Update docs
/update-docs thêm export-report vào .claude/README.md và AGENTS.md
```

### Ví dụ 2: Chỉnh sửa convention backend

```
# 1. Xem convention hiện tại
# Đọc: docs/engineering/conventions/backend.md

# 2. Cập nhật convention gốc
# Sửa trực tiếp docs/engineering/conventions/backend.md

# 3. Sync lại rule rút gọn
/update-docs sync .claude/rules/backend.md với convention mới

# 4. Review diff
/review-diff để check không có gì bị mất
```

### Ví dụ 3: Debug một behavior sai của Claude

```
# Claude đang không đọc frontend.md khi làm React task
# → Kiểm tra bảng mapping trong CLAUDE.md
# → Check description trong SKILL.md của skill liên quan

# 1. Debug
/debug-failure Claude không đọc rules/frontend.md khi implement component

# → Agent sẽ: đọc CLAUDE.md, kiểm tra mapping table, tìm chỗ thiếu trigger
```

---

## Thiết lập workflow cho team

### 1. Quyết định phân chia Codex vs Claude

Pattern trong repo này:

```
Claude Code → implement, fix, refactor (task cần edit nhiều)
Codex/GPT  → review, analysis, security (task cần đọc rộng)
```

Nếu team chỉ dùng Claude, move tất cả skills về `.claude/skills/` và bỏ `.codex/`.

### 2. Xác định approval gates

Liệt kê những gì bắt buộc phải xin approval trước khi agent tự làm. Đặt vào `AGENTS.md`:

```markdown
## Approval Gates

Ask for approval before:
- Changing database schema
- Changing public API contract
- Adding major dependencies
- ...
```

### 3. Chọn skills cần thiết

Bắt đầu với tập nhỏ — thêm sau nếu cần. Quá nhiều skills khiến agent route sai.

Tập tối thiểu cho một backend project:

| Skill | Lý do |
|---|---|
| implement-feature | Core implementation |
| debug-failure | Bug fix |
| review-technical | Code quality |
| review-diff | PR review |
| write-tests | Test coverage |

### 4. Chỉnh rules theo stack thật

Mở `docs/engineering/conventions/` và chỉnh theo stack thật của project. Sau đó sync lại `.claude/rules/`.

Ví dụ: nếu project dùng MongoDB thay PostgreSQL:

```markdown
# docs/engineering/conventions/database.md
## MongoDB
- Keep document shapes stable unless approved
- Avoid unbounded document growth
...
```

Xóa section PostgreSQL, thêm MongoDB rules.

---

## Checklist khi setup xong

- [ ] `AGENTS.md` có core rules, approval gates, skill routing
- [ ] `CLAUDE.md` có user profile, agent roles, docs mapping, rule mapping
- [ ] `.claude/rules/` đã được chỉnh theo stack thật
- [ ] `.claude/skills/` chỉ giữ skills team thật sự dùng
- [ ] `docs/engineering/conventions/` là source of truth và đã được sync với rules
- [ ] Đã test với 1 task nhỏ để verify agent follow convention đúng
