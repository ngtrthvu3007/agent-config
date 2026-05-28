# Token & Chất lượng Context

Token cho biết AI đang xử lý bao nhiêu văn bản. Context cho biết AI đang nhìn thấy những thông tin nào trong lúc làm việc.

Với agent config, hai khái niệm này thường đi cùng nhau: config càng dài thì dùng nhiều token hơn; config càng rõ thì context càng dễ bám đúng trọng tâm.

## Về token

Token là đơn vị AI dùng để đo lường văn bản. Nó không hẳn là một từ hay một ký tự, mà thường là một mảnh nhỏ trong câu.

Mọi thứ AI đọc, từ tin nhắn, file, rules, skills cho đến tài liệu đi kèm, đều được tính thành token và chiếm một phần context.

## Context window

Context window là lượng nội dung AI có thể nhìn thấy trong một cuộc trò chuyện: lịch sử chat, file bạn gửi, config file, rules, skills, và tài liệu liên quan.

Một vài mốc tham khảo từ tài liệu chính thức, cập nhật ngày 28/05/2026:

| Nền tảng / model                                                                               | Context / input limit | Max output    |
| ---------------------------------------------------------------------------------------------- | --------------------- | ------------- |
| [Claude Opus 4.7](https://platform.claude.com/docs/en/about-claude/models/overview)            | 1M token              | 128K token    |
| [Claude Sonnet 4.6](https://platform.claude.com/docs/en/about-claude/models/overview)          | 1M token              | 64K token     |
| [GPT-5.5 trong ChatGPT Codex](https://openai.com/index/introducing-gpt-5-5/)                   | 400.000 token         | Không nêu rõ  |
| [GPT-5.4 API](https://developers.openai.com/api/docs/models/gpt-5.4)                           | 1.050.000 token       | 128.000 token |
| [GPT-5.5 Pro API](https://developers.openai.com/api/docs/models/gpt-5.5-pro)                   | 1.050.000 token       | 128.000 token |
| [Gemini 3 Pro](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/3-pro) | 1.048.576 input token | 65.536 token  |

<small>Ghi chú: các con số trên là giới hạn theo model/API. Context thực tế trong từng công cụ còn phụ thuộc vào cách công cụ đó quản lý lịch sử chat, file đính kèm, cache, và phần context dành cho system instructions.</small>

Một cuộc trò chuyện lập trình thường dùng khoảng 20.000-100.000 token, trong khi config ban đầu thường chỉ khoảng 1.000-2.000 token.

Phần đáng chú ý không chỉ là độ dài, mà là độ liên quan: context càng nhiều nội dung thừa, AI càng khó nhận ra tín hiệu quan trọng cho tác vụ hiện tại.

## Chi phí khi dùng API

Khi gọi model qua API key, chi phí thường tính theo token input và output. Xem pricing chính thức: [Anthropic](https://platform.claude.com/docs/en/about-claude/pricing), [OpenAI](https://developers.openai.com/api/docs/pricing), [Google Gemini](https://ai.google.dev/gemini-api/docs/pricing).

Với gói thuê bao như Claude Code hoặc ChatGPT Codex, token không được tính tiền riêng từng lần đọc config, nhưng vẫn nằm trong usage limit của gói.

## Usage limit

Usage limit là phần dung lượng sử dụng mà một gói cho phép trong một khoảng thời gian. Khác với context window, nó không nói AI nhìn thấy được bao nhiêu trong một cuộc trò chuyện, mà cho biết khi nào bạn có thể cần chờ reset, đổi model, hoặc nâng gói.

Reset là lúc quota được làm mới. Tùy công cụ, reset có thể diễn ra sau vài giờ, theo ngày, hoặc theo tháng. Thời điểm reset thường được hiển thị ngay trong sản phẩm hoặc trang quản lý tài khoản.

Reset usage limit không làm cuộc trò chuyện cũ tự đọc lại config. Nếu bạn vừa sửa `AGENTS.md` hoặc `CLAUDE.md`, bắt đầu một cuộc trò chuyện mới vẫn là cách chắc nhất để nạp lại phiên bản mới.

## Cách context giữ đúng trọng tâm

Context dễ dùng hơn khi mỗi phần hướng dẫn có đúng vai trò. Context file nên giữ những thông tin chung và ổn định; rules và skills phù hợp hơn với hướng dẫn dài, chi tiết, hoặc chỉ dùng trong một số tác vụ.

Một quy tắc cụ thể giúp AI biết chính xác cần làm gì. Khi quy tắc còn dễ hiểu theo nhiều cách, ví dụ ngắn sẽ làm phần hướng dẫn rõ hơn:

```markdown
# Too vague
- Write careful TypeScript

# Clearer
- Do not use `any` in TypeScript
```

Nội dung không liên quan làm AI phải đọc thêm, nhưng không giúp nó hiểu tác vụ tốt hơn.

## Khi context thiếu trọng tâm

Context thiếu trọng tâm thường không tạo ra lỗi ngay lập tức. Nó thường hiện ra qua những phản hồi hơi lệch: AI bỏ qua một quy tắc đã ghi, hỏi lại điều đã có trong file, hoặc lúc đầu làm đúng nhưng càng về sau càng xa khỏi cách bạn muốn.

Nếu cùng một chỉ dẫn phải nhắc lại nhiều lần trong một cuộc trò chuyện, đó thường là dấu hiệu hướng dẫn cần được viết cụ thể hơn, đặt đúng chỗ hơn, hoặc tách bớt phần ít liên quan ra khỏi context file.
