# Đưa Agent Config Vào Dự Án

Sau khi đã nắm được **context file**, **rules**, và **skills**, bước tiếp theo là dùng repo này như một điểm xuất phát: đọc cấu trúc có sẵn, giữ lại phần phù hợp, rồi chỉnh dần cho khớp với project của bạn.

Bạn không cần sao chép toàn bộ repo vào project. Điều đáng tham khảo nhất là cách các phần được đặt đúng vai trò: `AGENTS.md` giữ nguyên tắc chung, `CLAUDE.md` giúp Claude Code đọc đúng context, rules gom các quy tắc theo phạm vi, còn skills mô tả quy trình cho từng loại tác vụ.

Nếu muốn xem toàn bộ cấu trúc trước khi chọn, bạn có thể bắt đầu từ:

- [GitHub repo](https://github.com/ngtrthvu3007/agent-config): toàn bộ cấu trúc của Agent Config
- [`.claude/rules/`](https://github.com/ngtrthvu3007/agent-config/tree/master/.claude/rules): các rules mẫu theo từng phạm vi
- <small>`.codex/rules/`: rules mẫu cho ChatGPT Codex <Badge type="info" text="Coming soon" /></small>
- [`.codex/skills/`](https://github.com/ngtrthvu3007/agent-config/tree/master/.codex/skills): skills mẫu cho ChatGPT Codex
- [`.claude/skills/`](https://github.com/ngtrthvu3007/agent-config/tree/master/.claude/skills): skills mẫu cho Claude Code

## Bắt đầu từ file nền

Hãy bắt đầu với `AGENTS.md`. Đây là nơi nên giữ những điều ổn định nhất: project dùng stack gì, agent nên làm việc theo nguyên tắc nào, khi nào cần hỏi trước, và những workflow nào có thể dùng.

Nếu bạn dùng Claude Code, giữ thêm `CLAUDE.md` ở thư mục gốc của project. Claude Code ưu tiên đọc `CLAUDE.md`; repo này để `CLAUDE.md` import `AGENTS.md` để phần dùng chung chỉ cần viết một lần. Những phần riêng của Claude, như mapping rules hoặc hướng dẫn đọc file, có thể đặt sau đó.

Nếu chỉ dùng Claude Code, bạn vẫn có thể bắt đầu với `CLAUDE.md`. Khi muốn dùng thêm ChatGPT Codex, hoặc muốn chia sẻ phần config chung cho người khác trong cùng project, hãy tách phần dùng chung sang `AGENTS.md`.

Nếu dùng cả ChatGPT Codex và Claude Code, hãy để `AGENTS.md` làm điểm chung. Những phần riêng cho từng tool nên nằm trong file hoặc thư mục riêng của tool đó, để tránh một thay đổi nhỏ làm lệch hành vi ở cả hai nơi.

## Chọn rules thật sự cần

Rules trong repo đang minh họa cho một stack phổ biến: frontend, backend, database, API, testing. Khi đưa vào project của bạn, hãy giữ lại những rules tương ứng với phần bạn thật sự dùng.

Ví dụ, nếu project chỉ có frontend, bạn có thể bỏ các rules về backend, database, và API. Nếu project dùng MongoDB thay vì PostgreSQL, hãy chỉnh tài liệu convention trước rồi rút gọn lại thành rule tương ứng.

Ví dụ prompt cho agent:

```text
# 1. Update the source convention
vim docs/engineering/conventions/database.md

# 2. Sync the short rule
/update-docs sync database rule from the updated convention
```

Rule nên là bản ngắn để agent áp dụng nhanh. Phần giải thích dài hơn nên nằm trong `docs/engineering/conventions/`, vì đó là nơi phù hợp hơn cho bối cảnh, lý do, và ví dụ chi tiết.

## Giữ skills vừa đủ

Skills hữu ích khi bạn muốn agent đi theo một quy trình ổn định, chẳng hạn viết spec, lập kế hoạch, implement, debug, review, hoặc QA. Không phải project nào cũng cần toàn bộ skills ngay từ đầu.

Bạn có thể mở `.codex/skills/` hoặc `.claude/skills/` ở phần trên để xem các workflow có sẵn, rồi chọn những skills gần với cách bạn làm việc nhất.

Một bộ tối thiểu thường dễ bắt đầu hơn:

| Skill | Dùng khi |
| --- | --- |
| `implement-feature` | Làm một thay đổi đã rõ yêu cầu |
| `debug-failure` | Sửa lỗi, test fail, hoặc regression |
| `review-diff` | Review thay đổi trước khi merge |
| `write-tests` | Thêm test cho hành vi quan trọng |

Khi nhu cầu rõ hơn, bạn có thể thêm `write-spec`, `plan-feature`, `qa-test`, hoặc các skills chuyên biệt khác. Thêm dần sẽ dễ kiểm soát hơn là giữ quá nhiều workflow ngay từ đầu.

## Chỉnh approval gates

Approval gates là những việc agent cần hỏi trước khi tự làm. Phần này nên đặt trong `AGENTS.md`, vì nó ảnh hưởng trực tiếp đến cách agent hành động trong repo.

```markdown
## Approval Gates

Ask for approval before:
- Changing database schema
- Changing public API contract
- Adding major dependencies
```

Repo đã có một bộ mặc định khá an toàn. Khi áp dụng vào project của bạn, hãy giữ những mục còn đúng và thêm các ranh giới riêng cần bảo vệ, ví dụ payment, deployment, dữ liệu nhạy cảm, hoặc quyền truy cập nội bộ.

## Thử bằng một task nhỏ

Sau khi chỉnh xong, hãy thử bằng một task nhỏ và dễ kiểm tra. Mục tiêu không phải là làm thật nhiều ngay lập tức, mà là xem agent có đọc đúng context, áp dụng đúng rules, và chọn đúng skill hay không.

Một vài task phù hợp để thử:

- Sửa một lỗi nhỏ đã biết nguyên nhân
- Thêm một test cho behavior đơn giản
- Review một diff ngắn
- Cập nhật một đoạn docs nhỏ theo convention mới

Nếu agent bỏ qua quy tắc, hỏi lại điều đã có trong file, hoặc chọn workflow chưa phù hợp, thường chỉ cần chỉnh lại `AGENTS.md`, rule liên quan, hoặc mô tả skill cho rõ hơn.

## Workflow hằng ngày

Khi config đã khớp với project, bạn có thể dùng skills như những lối đi quen thuộc cho các loại công việc lặp lại.

Các ví dụ dưới đây dùng workflow aliases trong `AGENTS.md`. Nếu tool của bạn không hỗ trợ cú pháp này, hãy dùng chúng như lời nhắc ngắn để gọi đúng skill.

### Feature mới

```bash
/spec <short description>
/plan <spec file>
/implement <task>
/review-technical <changed files>
/qa <implemented feature>
```

Với task nhỏ và scope rõ, có thể đi thẳng vào `/implement`.

### Bug fix

```bash
/debug <error message or failing test name>
/tests <fixed behavior>
```

Chỉ cần thêm regression test khi lỗi có khả năng quay lại hoặc hành vi đó đủ quan trọng để bảo vệ.

### Review PR

```bash
/review <branch or PR description>
/review-technical <important changed file>
```

Dùng `/review` để bắt lỗi trong diff trước. Nếu một file thay đổi lớn hoặc có logic phức tạp, dùng thêm `/review-technical` để đọc sâu hơn.
