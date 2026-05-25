# Token & Chất lượng Context

## Về chi phí: không đáng lo

Nếu bạn dùng Claude Code (Pro/Max) hay ChatGPT (Plus/Pro) theo subscription thì không trả theo token — flat fee hàng tháng, overhead config không ăn vào đâu cả.

Nếu dùng API trực tiếp thì làm phép tính nhanh với 1,500 tokens overhead điển hình:

| Model | Tốn bao nhiêu? |
| --- | --- |
| Claude Sonnet 4.x ($3/1M tokens) | ~$0.005 — chưa đến nửa xu |
| Claude Opus 4.x ($15/1M tokens) | ~$0.023 — khoảng 2 xu |
| GPT-4o ($2.5/1M tokens) | ~$0.004 — gần như không đáng kể |
| o3 ($10/1M tokens) | ~$0.015 — khoảng 1.5 xu |

Claude Code còn tự động cache system context — các turn tiếp theo trong cùng session chỉ tốn ~10% giá gốc cho phần đã cache. Con số trên là worst case.

## Overhead thực tế của một session

```txt
CLAUDE.md + AGENTS.md      ~1,500 tokens    ← thường được cache sau lần đầu
Đọc một rule file           ~300–600 tokens
Đọc một file code           ~500–2,000 tokens
Cả một conversation thực    20,000–100,000+ tokens
```

1,500 tokens config overhead chiếm khoảng 1–5% tổng session. Ít hơn một message bạn paste stack trace vào.

## Tại sao vẫn cần giữ config ngắn?

Không phải vì tiền — mà vì chất lượng context.

Tưởng tượng bạn đang giải thích task cho một người, nhưng trước đó bạn đọc to cho họ nghe toàn bộ coding convention 200 trang — dù task đó chẳng liên quan đến phần lớn những gì vừa đọc. Người đó sẽ bị nhiễu, nhớ nhầm, hoặc ưu tiên sai.

Agent cũng vậy. AGENTS.md 15,000 tokens nhồi đủ thứ = agent đọc nhiều thứ không cần thiết cho task hiện tại, dễ bỏ qua thứ quan trọng hơn.

Đó là lý do tách ra: AGENTS.md giữ ngắn (~800 tokens), rule files đọc khi cần (~400 tokens mỗi file). Tổng token tương đương — nhưng agent nhận đúng context vào đúng lúc.
