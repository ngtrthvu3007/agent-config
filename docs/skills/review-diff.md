# Review Diff

`review-diff` là skill dùng để kiểm tra thay đổi git trước khi sửa tiếp, commit, cherry-pick, hoặc review. Trang này giúp bạn mở source thật, nhận ra pattern, và copy skill khi cần so sánh với project khác.

Nguồn: [`.claude/skills/review-diff/SKILL.md`](https://github.com/VuNguyentranThe/agent-config/blob/master/.claude/skills/review-diff/SKILL.md)

## Điểm đáng chú ý

- Ưu tiên an toàn quản lý phiên bản trước review chất lượng code.
- Bắt đầu bằng inventory thay đổi, staged/unstaged, và dấu hiệu ghi đè.
- Không chạy lệnh git phá hủy nếu chưa được duyệt.

````markdown
---
name: review-diff
description: Use when inspecting git changes, staged diffs, commits, branch diffs, pull requests, accidental overwrites, unexpected file changes, lost work risk, or cherry-pick planning. Focus on version-control safety, changed-file ownership, suspicious changes, overwrite detection, commit selection, and merge/cherry-pick risk before code-quality review.
argument-hint: <working tree, staged, branch, commit, commit range, or PR>
---

# Review Diff

## Goal

Help the user manage code versions safely while working.

Use this skill to understand what changed, whether any work was overwritten unexpectedly, what should be kept or discarded, and how to cherry-pick or review commits safely.

## Use When

- Review current working tree, staged changes, branch diff, commit, commit range, or PR.
- Check whether another person's change accidentally overwrote the user's work.
- Compare two versions of a file or feature.
- Decide which commits or hunks should be cherry-picked.
- Inspect unexpected modified/deleted/renamed files before continuing work.
- Prepare a clean review summary before commit, merge, or handoff.

## Expected Inputs

Helpful inputs include:

- Target diff: working tree, staged changes, branch name, commit hash, commit range, PR, or file path.
- User intent: what they expected to change.
- Suspicious files, overwritten files, conflict files, or commit hashes.
- Context about who changed what, if known.
- Whether the user wants review only, cherry-pick planning, or actual fixes.

## Process

1. Identify the comparison target before reading code:
   - working tree vs `HEAD`
   - staged vs unstaged
   - branch vs base branch
   - commit or commit range
   - specific files
2. Start with a change inventory:
   - changed files
   - added/deleted/renamed files
   - staged vs unstaged status
   - commits involved, if applicable
3. Compare the inventory with the user's stated intent.
4. Flag suspicious changes:
   - unrelated files changed
   - large deletions
   - unexpected rewrites
   - generated files modified by hand
   - formatting-only churn mixed with logic changes
   - files likely touched by another person or agent
5. For possible overwrite cases:
   - inspect file history and recent commits when available
   - compare the current version against the expected base or previous commit
   - identify what code disappeared, changed meaning, or was replaced
   - separate intentional changes from likely accidental overwrites
6. For cherry-pick work:
   - inspect commit list and changed files first
   - identify the minimal commit(s) or hunk(s) needed
   - call out dependency commits, schema/API changes, generated files, and conflict risk
   - prefer a plan before applying cherry-pick
7. After version-safety review, check changed code for obvious bugs, regressions, missing tests, security/data leaks, and convention issues only within the diff scope.
8. Read surrounding code and call sites only when needed to understand impact or avoid false positives.

## Useful Git Checks

Use the smallest relevant checks for the target:

```bash
git status --short
git diff --stat
git diff --name-status
git diff
git diff --staged
git log --oneline --decorate --graph -n 20
git log --oneline -- <file>
git show --stat <commit>
git show <commit>
git diff <base>...<branch>
```

For overwrite or lost-work investigation, consider:

```bash
git blame <file>
git log -p -- <file>
git reflog
```

For cherry-pick planning, inspect before applying:

```bash
git show --name-status <commit>
git show --stat <commit>
git cherry-pick --no-commit <commit>
```

Only run commands that modify the working tree, such as `git cherry-pick`, after the user explicitly approves the action.

## Do Not

- Do not edit files unless explicitly asked.
- Do not run destructive git commands such as reset, checkout, clean, or restore without explicit approval.
- Do not apply cherry-picks without confirming the target commit(s) and risk.
- Do not review the whole codebase.
- Do not turn this into broad solution review unless the user asks.
- Do not report style issues unless they affect correctness, maintainability, consistency, or future change safety.
- Do not assume a change is intentional just because it appears in the diff.

## Output

Start with a version-control summary:

- Target reviewed
- Changed files summary
- Staged/unstaged status when relevant
- Suspicious or unrelated changes
- Possible overwritten work
- Cherry-pick candidates or risks, when relevant

Then include code findings only if found:

- Severity: High | Medium | Low
- File and line reference when possible
- Problem
- Why it matters
- Suggested fix direction

End with:

- Recommended next action
- Approval needed, if any
- Verification gaps or residual risk
````

