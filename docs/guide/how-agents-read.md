# Cách AI đọc config

AI không đọc mọi file trong dự án cùng một lúc. Nó bắt đầu từ phần hướng dẫn chính, rồi chỉ mở thêm rules, skills, hoặc tài liệu khác khi tác vụ cần đến.

Hiểu nhịp đọc này giúp bạn viết config gọn hơn: đủ thông tin để AI bắt đầu đúng hướng, nhưng không phải nhồi mọi thứ vào một chỗ.

## Lúc bắt đầu cuộc trò chuyện

Khi bạn mở một cuộc trò chuyện mới, AI đọc context file một lần để lấy bối cảnh ban đầu: đây là dự án gì, đang dùng công nghệ nào, và bạn muốn nó làm việc ra sao.

File này không tự cập nhật lại theo từng tin nhắn. Nếu bạn sửa `AGENTS.md` hoặc `CLAUDE.md` trong lúc đang chat, thay đổi đó thường chỉ có hiệu lực ở cuộc trò chuyện kế tiếp.

Nếu muốn dùng thay đổi ngay trong cuộc trò chuyện hiện tại, hãy gửi lại context file và yêu cầu AI đọc lại.

Mỗi cuộc trò chuyện mới là một lần bắt đầu lại từ đầu. AI không tự nhớ nội dung từ phiên trước, trừ khi bạn ghi rõ vào file.

## Vị trí quyết định cách đọc

Cùng là rules hoặc skills, nhưng cách AI đọc sẽ khác nhau tùy bạn đặt chúng ở đâu.

Nếu bạn viết rules và skills trực tiếp trong `AGENTS.md`, chúng trở thành một phần của context file. AI đọc chúng ngay khi cuộc trò chuyện bắt đầu.

Đây là cách phần lớn dự án nên bắt đầu: đặt những quy tắc và quy trình quan trọng nhất vào cùng một file để dễ đọc, dễ sửa, dễ duy trì.

```markdown
## How to Work

- camelCase for variables, PascalCase for components
- No `any` in TypeScript
- Validate input at API boundary only

## When debugging

1. Read the full error and stack trace first
2. Confirm root cause before changing code
3. Run related tests after fixing
```

Điểm cần nhớ là AI sẽ đọc toàn bộ nội dung đó mỗi khi bắt đầu cuộc trò chuyện, kể cả khi tác vụ hiện tại chỉ cần một phần nhỏ trong file.

Khi rules hoặc skills dài hơn và bắt đầu có nhiều trường hợp riêng, bạn có thể tách chúng ra file riêng. Lúc này, chúng không còn được đọc ngay từ đầu nữa; AI chỉ mở file liên quan khi tác vụ cần đến.

| Cách đặt                                | Khi nào được đọc                              |
| --------------------------------------- | --------------------------------------------- |
| Viết trực tiếp trong context file       | Ngay khi bắt đầu cuộc trò chuyện              |
| Tách rules hoặc skills thành file riêng | Khi AI xác định tác vụ cần đến                |
| Docs, specs, conventions                | Khi bạn yêu cầu hoặc khi AI cần thêm bối cảnh |

Bạn nên cân nhắc tách ra file riêng khi:

- Context file bắt đầu dài và khó đọc
- Dự án có nhiều mảng riêng như frontend, backend, database, và bạn muốn AI chỉ đọc phần cần thiết
- Nhiều người trong nhóm cùng dùng và cần quản lý rules theo từng phần độc lập

Không cần tách quá sớm. Một file gọn gàng vẫn dễ dùng hơn một hệ thống nhiều file khi bạn chưa cần đến.

## Ghi chú theo công cụ

**ChatGPT Codex** đọc `AGENTS.md` trực tiếp và tự động nạp khi bắt đầu tác vụ.

**Claude Code** không đọc `AGENTS.md` trực tiếp. Claude cần `CLAUDE.md` ở thư mục gốc của dự án; dòng `@AGENTS.md` trong `CLAUDE.md` sẽ yêu cầu Claude Code nạp thêm `AGENTS.md`. Chi tiết: [Claude Code Memory](https://docs.claude.com/en/docs/claude-code/memory).

**ChatGPT Codex (web)** không tự đọc file trong repo. Bạn có thể dán nội dung `AGENTS.md` vào **Project Instructions** để có hiệu ứng tương đương. Giới hạn khoảng 1.500 ký tự.

## Ảnh hưởng thực tế

**Giữ context file tập trung.** Đây là phần AI đọc đầu tiên, nên hãy để nó nói những điều quan trọng nhất: dự án là gì, nguyên tắc chung là gì, và cần đọc thêm ở đâu khi muốn biết chi tiết.

**Tách rules và skills khi chúng bắt đầu dài lên.** Việc tách ra giúp AI chỉ đọc đúng phần cần thiết, đồng thời giúp bạn cập nhật từng phần dễ hơn.

**Sau khi sửa file, hãy bắt đầu cuộc trò chuyện mới.** Đây là cách chắc nhất để AI đọc lại phiên bản config mới nhất của `AGENTS.md` hoặc `CLAUDE.md`.

---

Đọc thêm về chi phí token và chất lượng context: [Token & Chất lượng Context](/guide/token-and-context).
