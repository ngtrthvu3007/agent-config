# Cấu Hình Codex

Thư mục này chứa các skill cục bộ dùng để chuyên môn hóa cách AI agent làm việc trong repo.

`AGENTS.md` ở root repo là entrypoint chính. File này chỉ giải thích cấu trúc và workflow để người đọc dễ hiểu.

## Cấu Trúc

```txt
.codex/
  skills/
    debug-failure/
      SKILL.md
    implement-feature/
      SKILL.md
    plan-feature/
      SKILL.md
    qa-test/
      SKILL.md
    review-diff/
      SKILL.md
    review-solution/
      SKILL.md
    review-technical/
      SKILL.md
    security-review/
      SKILL.md
    update-docs/
      SKILL.md
    write-tests/
      SKILL.md
```

## Các Skill Review

- `review-solution`: đánh giá solution ở mọi giai đoạn: idea, researched approach, plan, prototype, partial implementation, hoặc completed implementation. Tập trung vào value, tradeoff, risk, feasibility, alternatives, và có đáng theo tiếp không.
- `review-technical`: review chất lượng kỹ thuật của file/module/component/service/feature được chỉ định. Có thể xem thêm usages, call sites, imports, exports, naming consistency, TypeScript, HTML/CSS/className, performance, tests.
- `review-diff`: review git changes trước commit/merge, như working tree diff, staged changes, commit, branch diff, hoặc PR diff. Tập trung vào issue do diff tạo ra.

## Các Skill Thực Thi Và Kiểm Chứng

- `implement-feature`: implement task đã rõ scope, fix finding đã chọn, scoped refactor, convention fix, hoặc code change có requirement rõ.
- `debug-failure`: debug bug, failing test, regression, runtime error, stack trace, broken behavior, hoặc incorrect output.
- `security-review`: review hoặc fix các phần security-sensitive như auth, authorization, permissions, tokens, cookies, sessions, secrets, private data, data leaks, tenant/user isolation, payment behavior.
- `qa-test`: kiểm chứng feature, bug fix, user flow, API behavior, acceptance criteria, hoặc release candidate. Skill này report pass/fail evidence, không tự fix nếu chưa được yêu cầu.
- `plan-feature`: lập plan cho feature, architecture change, task breakdown, migration, hoặc technical tradeoff trước khi code.
- `write-tests`: thêm hoặc cải thiện test, ưu tiên backend unit/integration/API/service/repository/auth/validation/regression/data-shape tests.
- `update-docs`: cập nhật README, setup docs, API docs, architecture notes, changelog, migration notes, developer guide, hoặc project documentation.

## Điều Phối Sau Review

Sau khi review có finding, người dùng tự quyết định agent nào sẽ fix.

Quy ước cá nhân:

- Claude = implement/fix chính cho các thay đổi rõ scope.
- Codex/GPT = review, debug khó, và security-sensitive fix.

Giao Claude fix bằng `implement-feature` khi finding là:

- convention violation
- naming inconsistency
- duplicate code nhỏ
- refactor trong scope
- UI/component cleanup
- TypeScript cleanup rõ cách sửa
- maintainability improvement rõ ràng

Giao Codex/GPT fix bằng `debug-failure` khi finding là:

- behavior bug
- failing test
- regression
- data shape sai khó truy ra
- async/cache/state bug

Giao Codex/GPT review/fix với `security-review` khi finding liên quan:

- authentication
- authorization
- permissions
- tokens, cookies, sessions, secrets
- private data hoặc data leaks
- tenant/user isolation
- payment behavior

## Ghi Chú

- Skill review chỉ report finding, không tự fix trừ khi người dùng yêu cầu.
- Nếu muốn fix sau review, gọi skill phù hợp ở bước tiếp theo.
- Không cần đưa toàn bộ workflow điều phối này vào `AGENTS.md` vì đây là cách người dùng tự quản lý sau review.
