# Agent nạp config thế nào?

Hiểu cách agent nạp các file config giúp bạn thiết kế agent config hiệu quả — tránh lãng phí token và đảm bảo agent có đúng context khi cần.

## Tài liệu gốc

- [Claude Code — Memory & CLAUDE.md](https://code.claude.com/docs/en/memory)
- [Claude Code — claude-directory](https://code.claude.com/docs/en/claude-directory)
- [AGENTS.md Specification (OpenAI Codex)](https://developers.openai.com/codex)
- [ChatGPT — Projects](https://help.openai.com/en/articles/chatgpt-projects)
- [ChatGPT — Custom Instructions](https://help.openai.com/en/articles/8096356)

---

## Claude Code nạp CLAUDE.md khi nào?

Khi bạn bắt đầu một **conversation mới** trong Claude Code — tức là khi bạn gõ lệnh `claude` trong terminal hoặc mở một chat session mới trong IDE extension. Không phải khi mở VS Code, không phải khi mở file CLAUDE.md.

Mỗi conversation mới = Claude Code nạp lại CLAUDE.md từ đầu. Nếu bạn sửa CLAUDE.md trong lúc đang chat, thay đổi đó không có hiệu lực cho đến conversation kế tiếp. Nếu muốn cập nhật thay đổi, bạn cần bắt đầu 1 conversation mới hoặc gọi claude đọc trực tiếp.

**Cơ chế:** Claude Code tìm file `CLAUDE.md` tại thư mục gốc của project (cùng cấp với `.git`), sau đó inject(nhúng) nội dung vào system context trước turn đầu tiên. Directive `@AGENTS.md` trong CLAUDE.md khiến Claude Code nạp thêm nội dung của `AGENTS.md` vào cùng context đó.

**Token cost (ước tính với repo này):**

| File | Tokens (ước tính) |
| --- | --- |
| CLAUDE.md (không tính AGENTS.md) | ~300–500 |
| AGENTS.md | ~700–1,000 |
| Tổng khi bắt đầu conversation | ~1,000–1,500 |

Đây là lượng token tiêu tốn cố định cho mỗi conversation, bất kể task làm gì. Giữ AGENTS.md ngắn và stable là quan trọng.

## Codex nạp AGENTS.md khi nào?

Tương tự — Codex nạp `AGENTS.md` khi bắt đầu một conversation hoặc task mới. Không phải khi mở IDE hay mở file.

Codex không có CLAUDE.md hay `.claude/`. Nó đọc trực tiếp:

- `AGENTS.md` — nạp tự động
- `.codex/skills/*/SKILL.md` — nạp khi skill được invoke

---

## ChatGPT nạp config thế nào?

ChatGPT — ở đây chỉ ChatGPT Web App, không phải Codex — không tự đọc file trong repo. Nó nhận config qua ba cơ chế khác nhau.

**Project Instructions** là thứ gần nhất với AGENTS.md. Nếu bạn dùng ChatGPT Projects, mỗi project có một ô "Instructions" riêng — nội dung đó được nạp tự động vào system context khi bắt đầu mọi conversation trong project. Đây là chỗ bạn paste `AGENTS.md` vào. Giới hạn khoảng 1,500 ký tự, nên cần giữ ngắn.

**Custom Instructions** hoạt động ở cấp user account — áp dụng cho toàn bộ conversation, không phân biệt project. Phù hợp cho coding style cá nhân hoặc preference chung, không phải rule riêng cho từng repo.

**Memory** thì khác hẳn hai cái trên: đây là bộ nhớ ChatGPT tự học từ interaction, không phải config bạn chủ động viết. Bạn có thể xem và quản lý nó trong Settings, nhưng không nên dùng để thay thế Project Instructions.

Với repo này, cách đơn giản nhất là paste nội dung `AGENTS.md` vào Project Instructions. Rule files thì paste trực tiếp vào prompt khi cần — ChatGPT không có cơ chế tự động đọc file như Codex.

---

## Claude nạp Rules khi nào?

Rules **không** được nạp tự động cùng với CLAUDE.md. Claude đọc chúng on-demand bằng Read tool trong lúc conversation, khi xác định task type cần đến.

Trigger đến từ bảng mapping trong CLAUDE.md:

```markdown
| File | Read when |
| --- | --- |
| .claude/rules/general.md  | Any code change |
| .claude/rules/frontend.md | React / Next.js changes |
| .claude/rules/backend.md  | Express / NestJS / Gin / Fiber |
...
```

Mỗi rule được nạp tối đa 1 lần per conversation, sau đó ở trong context cho đến hết session.

**Token cost mỗi rule file:** ~300–600 tokens. Một task backend điển hình nạp thêm `general.md` + `backend.md` ≈ ~800–1,200 tokens.

---

## Claude nạp Skills khi nào?

Skills được nạp khi được invoke — không phải khi bắt đầu conversation.

```bash
# User gọi trực tiếp
/implement-feature add export button

# Claude tự nhận biết từ task description
"there's a failing test in AuthService"
→ khớp với debug-failure skill
→ Claude nạp .claude/skills/debug-failure/SKILL.md
```

**Token cost mỗi skill:** ~400–1,000 tokens.

---

## Cái gì được nạp khi nào?

```txt
Bắt đầu conversation mới
├── Claude Code: CLAUDE.md + AGENTS.md    → tự động vào system context
├── Codex:       AGENTS.md                → tự động vào system context
└── ChatGPT:     Project Instructions     → tự động nếu đã setup (paste thủ công)

Trong conversation (khi task cần)
├── Rule files (Claude)  → nạp khi task type match với mapping table
├── Skill files (Claude) → nạp khi user invoke hoặc Claude auto-detect
└── Rule/Skill (ChatGPT) → paste trực tiếp vào prompt, không tự động

Không bao giờ tự động nạp
└── docs/domain/, docs/engineering/, docs/specs/
    (chỉ nạp khi bạn yêu cầu hoặc task cần domain context)
```

---

## Tại sao điều này ảnh hưởng đến cách viết config?

**Giữ AGENTS.md và CLAUDE.md ngắn** — chúng tiêu tốn token trong mỗi conversation. Đặt convention chi tiết vào `docs/engineering/conventions/` và rule files, chỉ giữ routing và core rules trong AGENTS.md.

**Skill description phải đủ cụ thể** — Claude dùng `description:` để auto-detect. Quá chung → nhận nhầm task:

```yaml
# Quá chung
description: Use for code tasks

# Đủ cụ thể
description: Use when fixing a bug, failing test, regression, runtime error, or broken behavior
```

**Không nhồi mọi thứ vào AGENTS.md:**

```markdown
# Sai — convention dài trong AGENTS.md
[Core rules...]
[Full frontend conventions...]
[Full backend conventions...]

# Đúng — AGENTS.md chỉ có routing
[Core rules — ngắn, stable]
[Routing: đọc .claude/rules/frontend.md khi làm React]
```

## Sự tiêu tốn token trong mỗi lần nạp config

Câu trả lời ngắn: không đáng kể.

Nếu bạn dùng Claude Code (Pro/Max) hay ChatGPT (Plus/Pro) theo subscription thì không trả theo token — flat fee hàng tháng, overhead này không ăn vào đâu cả.

Nếu bạn dùng API trực tiếp thì làm phép tính nhanh:

| Model | 1,500 tokens tốn bao nhiêu? |
| --- | --- |
| Claude Sonnet 4.x ($3/1M tokens) | ~$0.005 — chưa đến nửa xu |
| Claude Opus 4.x ($15/1M tokens) | ~$0.023 — khoảng 2 xu |
| GPT-4o ($2.5/1M tokens) | ~$0.004 — gần như không đáng kể |
| o3 ($10/1M tokens) | ~$0.015 — khoảng 1.5 xu |

Thêm nữa, Claude Code tự động cache system context. Sau lần đầu, các turn tiếp theo trong cùng session chỉ tốn khoảng 10% giá gốc cho phần đã cache. Nên con số trên còn là worst case.

Để có góc nhìn thực tế hơn, đây là những gì một coding session bình thường tiêu tốn:

```txt
CLAUDE.md + AGENTS.md      ~1,500 tokens    ← overhead config, thường được cache
Đọc một file code           ~500–2,000 tokens
Đọc một rule file           ~300–600 tokens
Cả một conversation thực    20,000–100,000+ tokens
```

1,500 tokens config overhead chỉ chiếm khoảng 1–5% tổng session. Ít hơn cả một message bạn paste stack trace vào.

**Vậy lo về token để làm gì?**

Không phải vì tiền — mà vì **chất lượng context**. Hãy tưởng tượng bạn đang giải thích task cho một người, nhưng trước đó bạn đọc to cho họ nghe toàn bộ coding convention 200 trang — dù task đó chẳng liên quan đến phần lớn những thứ vừa đọc. Người đó sẽ bị nhiễu, nhớ nhầm, hoặc ưu tiên sai.

Agent cũng vậy. AGENTS.md 15,000 tokens nhồi đủ thứ = agent đọc nhiều thứ không cần thiết cho task hiện tại, dễ bỏ qua thứ quan trọng hơn.

Đó là lý do repo này tách ra: AGENTS.md giữ ngắn (~800 tokens), rule files đọc khi cần (~400 tokens mỗi file). Tổng token tương đương — nhưng agent nhận đúng context vào đúng lúc.

---
