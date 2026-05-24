# Tạo một Rule

Rule là file convention ngắn gọn mà agent đọc trước khi làm một loại task cụ thể. Trang này hướng dẫn cách viết rule hiệu quả.

## Khi nào nên tạo rule mới?

Tạo rule khi:
- Dự án có convention không phổ biến mà agent hay làm sai
- Team có quyết định kỹ thuật cụ thể (ví dụ: dùng Zod thay vì Yup, dùng Gin thay vì Echo)
- Có pattern lặp đi lặp lại mà bạn phải nhắc agent nhiều lần

Không cần tạo rule cho:
- Convention phổ biến mà agent đã biết (ví dụ: dùng `const` thay `let`)
- Quy tắc chỉ áp dụng cho 1 file cụ thể
- Thông tin domain/business — đặt vào `docs/domain/` thay vì rule

## Cấu trúc rule file

Rule file là plain markdown. Không có frontmatter bắt buộc.

**Cấu trúc khuyến nghị:**

```markdown
# [Tên] Rules

Apply when [mô tả ngắn trigger]. Read `docs/engineering/conventions/[file].md` for full detail.

## [Section 1: Nhóm rule đầu tiên]

- Rule ngắn gọn, actionable
- Không giải thích lý do — chỉ quy tắc
- Dùng bullet list, không dùng paragraph

## [Section 2]

- ...
```

**Ví dụ thực tế** — `.claude/rules/backend.md`:

```markdown
# Backend Rules

Apply to Express / NestJS / Gin / Fiber changes.

## Controllers / Routes

- Thin controllers: parse inputs, call service, return response
- No business logic or database queries in controllers
- Validate inputs at the boundary before calling service logic

## Services

- Services own business logic. Keep methods focused on one use case
- Explicit return types on all service methods
- Keep functions under 100 lines
...
```

## Nguyên tắc viết rule hiệu quả

### 1. Ngắn và dense

Agent đọc rule để refresh context nhanh, không phải để học. Mỗi bullet = 1 quy tắc rõ ràng.

```markdown
# Tốt
- `async/await` consistently. Explicit return types on service methods.

# Không tốt
# Trong dự án này chúng ta đã quyết định dùng async/await vì nó dễ đọc hơn Promise chain.
# Ngoài ra, các service method nên có explicit return type để TypeScript có thể type check.
```

### 2. Actionable, không mô tả

```markdown
# Tốt
- No raw database queries in controllers

# Không tốt
- Database queries should be handled properly
```

### 3. Scope rõ ràng

Mỗi rule file nên cover 1 layer/domain. Đừng trộn lẫn frontend và backend vào 1 file.

### 4. Giữ nguồn gốc trong `docs/engineering/conventions/`

Rule trong `.claude/rules/` là bản rút gọn — nguồn gốc thật sự nằm ở `docs/engineering/conventions/`. Nếu rule và convention xung đột, convention thắng.

```
docs/engineering/conventions/frontend.md   ← source of truth (đầy đủ, có giải thích)
.claude/rules/frontend.md                  ← bản rút gọn cho agent đọc nhanh
```

## Thêm rule mới vào CLAUDE.md

Sau khi tạo file rule, thêm nó vào bảng mapping trong `CLAUDE.md`:

```markdown
## Coding Conventions

| File | Read when |
|---|---|
| `.claude/rules/general.md`   | Any code change |
| `.claude/rules/frontend.md`  | React / Next.js changes |
| `.claude/rules/my-new-rule.md` | [mô tả khi nào đọc] |  ← thêm vào đây
```

## Template nhanh

Copy và chỉnh theo project:

```markdown
# [Domain] Rules

Apply when [trigger condition]. Read `docs/engineering/conventions/[file].md` for full detail.

## [Principles / Overview]

- [Rule 1]
- [Rule 2]

## [Controllers / Components / Handlers]

- [Rule]

## [Services / Hooks / Business Logic]

- [Rule]

## [Error Handling]

- [Rule]

## [Naming]

- [Rule]
```
