# Tạo một Skill

Skill định nghĩa quy trình làm việc cho một loại task cụ thể. Trang này hướng dẫn cách viết skill hiệu quả cho cả Claude Code và ChatGPT Codex.

## Khi nào nên tạo skill mới?

Tạo skill khi:
- Có loại task lặp đi lặp lại với nhiều bước cố định (review, debug, spec writing...)
- Bạn muốn agent follow một quy trình cụ thể thay vì tự quyết định
- Có approval gates hoặc các bước cần user confirm trước khi tiếp tục
- Workflow của team có đặc thù riêng khác với default behavior

Không cần skill cho:
- Task đơn giản, 1 bước (ví dụ: "đổi tên variable")
- Thứ đã được cover bởi rule file

## Cấu trúc SKILL.md

```markdown
---
name: ten-skill-dung-kebab-case
description: Mô tả ngắn — Claude dùng để tự nhận biết khi nào dùng skill này
argument-hint: <gợi ý tham số khi gọi>
---

# Tên Skill

## Goal

Mục tiêu của skill — 1-2 câu.

## Process

1. Bước 1
2. Bước 2
3. Bước 3 — có thể có approval gate: "Ask for approval before proceeding"

## Do Not

- Điều không được làm
- Điều không được làm

## Output

Mô tả format output mong đợi khi skill hoàn thành.
```

**Ví dụ thực tế** — `.claude/skills/debug-failure/SKILL.md`:

```markdown
---
name: debug-failure
description: Use when fixing a bug, failing test, regression, runtime error, or stack trace
argument-hint: <error message or failing test name>
---

# Debug Failure

## Goal
Identify and fix the root cause of a failure without guessing.

## Process
1. Read the error message, stack trace, or failing test output provided
2. Identify the failing file and line number
3. Trace back to root cause — do not fix symptoms
4. Fix the root cause with minimal diff
5. Run the smallest relevant verification

## Do Not
- Do not fix multiple unrelated issues in one diff
- Do not add defensive code without explaining why

## Output
- Root cause identified
- Fix applied
- Verification result
```

## Nguyên tắc viết skill hiệu quả

### 1. Description phải đủ cụ thể

`description:` là thứ Claude dùng để tự nhận biết khi nào cần invoke skill. Quá chung → Claude dùng sai lúc. Quá hẹp → Claude không tự nhận ra.

```yaml
# Tốt — cụ thể, có keyword rõ
description: Use when fixing a bug, failing test, regression, runtime error, or stack trace

# Không tốt — quá chung
description: Use for code problems

# Không tốt — quá hẹp, chỉ match 1 pattern
description: Use when pytest test_user_service.py fails
```

### 2. Process = ordered steps, không phải checklist

Process nên có thứ tự logic. Mỗi step phải actionable.

```markdown
# Tốt — ordered, actionable
## Process
1. Read the spec or requirements first
2. Identify affected files and dependencies
3. Ask for approval before changing API shape
4. Implement within confirmed scope

# Không tốt — quá vague
## Process
- Read things
- Code stuff
- Review
```

### 3. Approval gates phải explicit

Nếu cần user confirm trước khi tiếp tục, nói rõ:

```markdown
## Process
1. Analyze the failing test
2. Identify root cause
3. **Ask for approval** if the fix requires changing public API shape
4. Apply fix
```

### 4. Do Not section ngăn hành vi nguy hiểm

Liệt kê những gì skill **không** được làm — đặc biệt quan trọng với skills có blast radius cao (security, database, deployment).

```markdown
## Do Not
- Do not change database schema without approval
- Do not delete files without approval
- Do not expose stack traces in API responses
```

### 5. Output format rõ ràng

Định nghĩa rõ skill trả về gì. Điều này giúp user biết kỳ vọng gì và giúp agent format response nhất quán.

```markdown
## Output
- Summary of what changed
- List of changed files
- Verification result (command run + result)
- Known risks or remaining issues
```

## Folder structure

```
.claude/skills/
  my-new-skill/
    SKILL.md          ← file duy nhất cần thiết
```

Và tương tự cho ChatGPT Codex:
```
.codex/skills/
  my-new-skill/
    SKILL.md
```

## Đăng ký skill trong CLAUDE.md / AGENTS.md

Sau khi tạo skill, thêm vào phần **Skill Routing** trong `AGENTS.md`:

```markdown
## Skill Routing

- [Mô tả khi nào dùng] -> `.claude/skills/my-new-skill/SKILL.md`
```

Và thêm workflow alias trong **Workflow Aliases**:

```markdown
## Workflow Aliases

- `/my-skill` or `my skill workflow` -> `.claude/skills/my-new-skill/SKILL.md`
```

## Khi nào dùng ChatGPT Codex vs Claude cho skill?

Repo này phân chia theo pattern:

| Agent | Phù hợp cho |
|---|---|
| Claude Code | Implement, debug, refactor — task cần edit file nhiều |
| ChatGPT Codex | Review, analysis, security audit — task cần đọc rộng, ít edit |

Có thể tạo skill ở cả 2 nơi với nội dung khác nhau — ví dụ: `review-technical` trong `.claude/skills/` có thể focus vào fix, còn trong `.codex/skills/` focus vào analysis + report.

## Template nhanh

```markdown
---
name: 
description: Use when [trigger condition — list specific keywords]
argument-hint: <[gợi ý tham số]>
---

# [Skill Name]

## Goal

[1-2 câu mục tiêu]

## Process

1. [Bước đầu tiên — thường là đọc input/context]
2. [Bước phân tích]
3. [Approval gate nếu cần]
4. [Bước thực thi]
5. [Verification]

## Do Not

- [Hành vi nguy hiểm 1]
- [Hành vi nguy hiểm 2]

## Output

[Format output mong đợi]
```
