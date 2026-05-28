# Khái niệm cơ bản

Có 3 thứ chính giúp bạn cá nhân hóa AI: **context file**, **rules**, và **skills**.
Với phần lớn dự án, bắt đầu bằng context file là đủ. Khi cách làm việc cần rõ ràng hơn, hãy bổ sung rules và skills.

## Context File

Context file là tệp văn bản đặt ở thư mục gốc của dự án, dùng để mô tả dự án, công nghệ sử dụng, và cách bạn muốn AI làm việc. AI đọc tệp này khi bắt đầu mỗi tác vụ.

Không có định dạng bắt buộc. Chỉ cần đủ rõ để AI nắm được bối cảnh:

```markdown
## Project

Internal task management app. Backend API + web dashboard.

## Stack

Node.js, Express, PostgreSQL, React, TypeScript

## How to Work

- Use camelCase for variables and PascalCase for components
- Do not use `any` in TypeScript
```

Tên tệp phụ thuộc vào công cụ bạn dùng. `AGENTS.md` là tên phổ biến nhất và hoạt động với hầu hết công cụ AI hỗ trợ lập trình, bao gồm ChatGPT Codex. Riêng Claude dùng `CLAUDE.md`.

<small>[Chi tiết về Claude](https://docs.claude.com/en/docs/claude-code/memory)</small>

## Rules

Rules là tập hợp các quy tắc AI cần tuân theo khi làm việc. Để dễ quản lý, rules thường được chia thành nhiều tệp theo phạm vi như `frontend`, `backend`, `database`, `api`, hoặc `testing`.

- Càng cụ thể càng tốt: nói rõ nên làm gì và cần tránh gì
- Có ví dụ ngắn sẽ hiệu quả hơn những quy tắc chung chung
- Chỉ nạp những rules liên quan đến tác vụ hiện tại

Ví dụ rules cho frontend:

```markdown
## React

- Functional components only, arrow function syntax
- Use Server Components by default in the Next.js App Router
- Place `useEffect` after handlers, right before the JSX return

## Handlers

- Event handlers: prefix `handle`
- Callback props: prefix `on`
```

Rules nằm tách biệt khỏi mã nguồn. AI chỉ đọc khi tác vụ cần đến, thay vì phải suy ra quy tắc từ từng tệp nguồn.

## Skills

Skills định nghĩa quy trình hoàn chỉnh cho một loại tác vụ. Thay vì để AI tự quyết định trình tự làm việc, skill chỉ rõ các bước cần đi theo.

```markdown
# Debug Failure

## Goal

Find the root cause and fix it without guessing.

## Process

1. Read the full error message and stack trace
2. Find the related file and line
3. Confirm the root cause before changing code
4. Fix the issue, then run the relevant tests

## Do Not

- Do not change many places at once
- Do not skip verification after the fix
```

Mỗi skill là một quy trình nhất quán, có thể quản lý bằng hệ thống phiên bản và chia sẻ cho cả nhóm dùng chung.

## Ba thứ phối hợp ra sao

Ba thứ này bổ sung cho nhau, mỗi thứ giải quyết một vấn đề riêng:

- **Context file** → _"AI đang làm việc trong dự án nào, với ai?"_
- **Rules** → _"code theo quy tắc nào?"_
- **Skills** → _"làm tác vụ theo quy trình nào?"_

Ví dụ khi sửa lỗi, AI hiểu bối cảnh dự án qua context file, viết code đúng quy ước qua rules, và đi theo quy trình debug qua skill.
