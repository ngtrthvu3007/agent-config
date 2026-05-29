# Tạo một Skill

Trang này chỉ cách repo tổ chức skills cho **Claude Code** và **ChatGPT Codex**. Nó tập trung vào cách agent được định tuyến tới đúng quy trình, không phải một hướng dẫn dài về mọi loại skill.

Nguồn liên quan: [`AGENTS.md`](/agents) định tuyến `.codex/skills/`; [`CLAUDE.md`](/claude) định tuyến `.claude/skills/`.

## Vai trò trong repo

Skill là một quy trình có tên, mô tả, các bước, giới hạn, và định dạng kết quả. Trong repo này:

- `.claude/skills/` chứa skills cho Claude Code.
- `.codex/skills/` chứa skills cho ChatGPT Codex.
- [`AGENTS.md`](/agents) nối loại yêu cầu với skill phù hợp trong phần `Skill Routing`.

Các trang như [`Plan Feature`](/skills/plan-feature), [`Implement Feature`](/skills/implement-feature), [`Review Diff`](/skills/review-diff), và [`QA Test`](/skills/qa-test) là ví dụ để mở và so sánh.

## Định tuyến đúng skill

`description:` là phần quan trọng nhất để agent chọn đúng skill. Mô tả nên nói rõ skill dùng cho tác vụ nào, đồng thời đủ hẹp để agent bỏ qua skill khi tác vụ không liên quan.

Mẫu có thể sao chép:

```markdown
---
name: skill-name
description: Use when [matching task type, important signals, and boundaries]
argument-hint: <input the skill expects>
---

# Skill Name

## Goal

[What this process produces]

## Process

1. [Read the right input or context]
2. [Analyze or prepare]
3. [Ask for approval when needed]
4. [Execute or summarize]
5. [Verify when relevant]

## Do Not

- [Boundary the agent should not cross]

## Output

- [What the final response should include]
```

## Điểm đáng chú ý trong ví dụ

- `plan-feature` không chỉnh code; nó tạo kế hoạch và nêu approval gates.
- `implement-feature` chỉ dùng khi phạm vi đã rõ và cần chỉnh code.
- `review-diff` ưu tiên an toàn git trước khi review chất lượng code.
- `qa-test` kiểm tra hành vi và báo bằng chứng, không tự sửa lỗi nếu chưa được yêu cầu.
