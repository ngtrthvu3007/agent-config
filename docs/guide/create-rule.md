# Tạo một Rule

Trang này nằm trong nhóm **Agent Config** để chỉ cách repo tổ chức rules, không phải để thay thế các rule thật. Hãy đọc nó sau khi đã mở [`General Rules`](/rules/general), [`Frontend Rules`](/rules/frontend), hoặc [`Backend Rules`](/rules/backend).

Nguồn liên quan: [`CLAUDE.md`](/claude) mapping rules trong phần `Coding Conventions`.

## Vai trò trong repo

Rule là file quy ước ngắn mà agent đọc khi tác vụ khớp phạm vi. Trong repo này, rules nằm ở `.claude/rules/` và được Claude Code định tuyến qua bảng `Coding Conventions` trong [`CLAUDE.md`](/claude).

Một rule tốt có ba phần đáng chú ý:

- Dòng `Apply to` hoặc `Apply when` nói rõ lúc nào agent cần đọc rule.
- Các heading chia rule theo tầng hoặc chủ đề.
- Bullet ngắn, đủ cụ thể để agent áp dụng khi đang làm việc.

## Định tuyến đúng rule

Rule chỉ nên được agent tìm tới khi tác vụ khớp phạm vi của nó. Nếu rule dành cho backend, đừng để mô tả khiến agent đọc nó cho tác vụ frontend. Nếu rule dành cho API, bảng trong `CLAUDE.md` nên nói rõ "adding or changing API endpoints".

Mẫu có thể sao chép:

```markdown
# [Domain] Rules

Apply when [task scope]. Read `docs/engineering/conventions/[file].md` for full detail.

## [Primary Area]

- [Short rule the agent can apply while working]
- [Another concrete rule]

## [Boundary / Safety]

- [Approval gate or constraint when relevant]
```

## Ví dụ trong repo

Mở các file này để so sánh cách mỗi rule được định tuyến:

- [`General Rules`](/rules/general): đọc cho mọi thay đổi code.
- [`Frontend Rules`](/rules/frontend): đọc khi tác vụ chạm React hoặc Next.js.
- [`Backend Rules`](/rules/backend): đọc khi tác vụ chạm Express, NestJS, Gin, hoặc Fiber.

Khi thêm rule mới, cập nhật bảng `Coding Conventions` trong [`CLAUDE.md`](/claude) để agent biết lúc nào cần đọc nó.
