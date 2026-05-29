# Agent Config

Đây là khu vực giúp bạn khám phá phần lõi của repo: file agent đọc trước, rules giúp agent làm đúng quy ước, và skills đóng gói quy trình cho từng loại tác vụ.

Bạn không cần dùng tất cả ngay từ đầu. Hãy xem phần này như một bản tham khảo có thể chọn lọc: bắt đầu từ file nền, đọc vài rules hoặc skills tiêu biểu, rồi giữ lại những phần hợp với cách bạn làm việc.

## Cấu trúc repo

```shell
agent-config/
├─ AGENTS.md
├─ CLAUDE.md
├─ .codex/
│ └─ skills/
├─ .claude/
│ ├─ rules/
│ └─ skills/
└─ docs/
├─ agent-config.md
├─ agents.md
├─ claude.md
├─ guide/
├─ rules/
└─ skills/
```

## Thành phần chính

- [`AGENTS.md`](/agents): file nền dùng chung cho AI coding agents, bao gồm core rules, approval gates, skill routing, và alias quy trình.
- [`CLAUDE.md`](/claude): file riêng cho Claude Code, import `AGENTS.md` rồi bổ sung các hướng dẫn Claude-specific.
- [`Rules`](/rules/general): các quy tắc ngắn theo phạm vi như general, frontend, backend. Rules giúp agent áp dụng quy ước mà không cần đọc lại toàn bộ tài liệu dài.
- [`Skills`](/skills/plan-feature): các quy trình mẫu cho những loại tác vụ lặp lại như lập kế hoạch, thực hiện, review, và QA.

## Thứ tự đọc gợi ý

1. Đọc [`AGENTS.md`](/agents) để hiểu phần nền mà agent dùng trước.
2. Đọc [`CLAUDE.md`](/claude) nếu bạn dùng Claude Code.
3. Mở một vài rules để xem cách viết quy tắc ngắn và cụ thể.
4. Mở một vài skills để xem cách một quy trình được đóng gói thành từng bước.

Sau khi hiểu cấu trúc, quay lại phần [Đưa Agent Config vào dự án](/guide/workflow) để chọn những phần cần giữ và chỉnh lại cho project của bạn.
