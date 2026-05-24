# Agent Config Template

Repo này là bộ cấu hình mẫu để dùng AI coding agents như Codex/GPT và Claude Code trong các dự án phần mềm.

Mục tiêu chính:

- Giữ `AGENTS.md` ngắn, ổn định, làm entrypoint chung cho AI agents.
- Tách workflow chuyên biệt vào `.codex/skills/` và `.claude/skills/`.
- Tách coding conventions, architecture, domain context, specs vào `docs/`.
- Giúp mỗi người hoặc mỗi team custom lại cách AI agent làm việc theo phong cách riêng.

## Cách Dùng Nhanh

Khi dùng cho một project mới:

1. Copy các file/folder cần dùng vào root của project:
   - `AGENTS.md`
   - `CLAUDE.md` nếu dùng Claude Code
   - `.codex/` nếu dùng Codex/GPT
   - `.claude/` nếu dùng Claude Code
   - `docs/` nếu muốn dùng chung bộ tài liệu/conventions mẫu
2. Mở `AGENTS.md` và chỉnh lại các rule chung theo project.
3. Mở `docs/engineering/conventions/` và chỉnh conventions theo stack thật của project.
4. Giữ lại các skill thật sự dùng, xóa hoặc bỏ qua skill không phù hợp.
5. Khi làm việc với AI agent, gọi skill theo workflow, ví dụ `/debug`, `/review-technical`, `/implement`, `/spec`.

## Cấu Trúc Chính

```shell
.
- AGENTS.md        # Entry point chung cho AI agents, Codex đọc trực tiếp.
- CLAUDE.md        # Bridge riêng cho Claude Code, import AGENTS.md.
- .codex/          # Skill/workflow dành cho Codex/GPT.
  - README.md
  - skills/
- .claude/         # Skill và rule rút gọn dành cho Claude Code.
  - README.md
  - rules/
  - skills/
- docs/            # Project guidance dài hạn, chỉ đọc khi liên quan.
  - specs/         # Feature specs, user stories, acceptance criteria.
  - domain/        # Product context, business rules, glossary.
  - engineering/   # Architecture, decisions, coding conventions.
```

Nếu chỉ dùng Codex/GPT, có thể bỏ `CLAUDE.md` và `.claude/`.
Nếu chỉ dùng Claude Code, vẫn nên giữ `AGENTS.md` vì `CLAUDE.md` import file này làm rule chung.

## Root Files

### `AGENTS.md`

File rule chung cho AI coding agents.

Codex đọc file này trực tiếp. Claude Code import file này thông qua `CLAUDE.md`.

Nên giữ file này ngắn và ổn định. Chỉ nên chứa:

- core rules
- approval gates
- project guidance routing
- skill routing
- verification rules
- final response format

Không nên nhồi toàn bộ coding conventions vào `AGENTS.md`. Những phần dài nên đặt trong `docs/engineering/conventions/`.

### `CLAUDE.md`

File bridge riêng cho Claude Code.

File này:

- import `AGENTS.md`
- định nghĩa cách Claude làm việc
- route Claude sang `.claude/skills/`
- route Claude đọc `.claude/rules/`

Nếu không dùng Claude Code, có thể bỏ file này và thư mục `.claude/`.

## `.codex/`

Thư mục dành cho Codex/GPT.

```shell
.codex/
- README.md
- skills/
  - debug-failure/
  - implement-feature/
  - plan-feature/
  - qa-test/
  - review-diff/
  - review-solution/
  - review-technical/
  - security-review/
  - update-docs/
  - ux-ui-review/
  - write-spec/
  - write-tests/
```

Mỗi skill là một workflow riêng, nằm trong file `SKILL.md`.

Ví dụ:

- `debug-failure`: debug bug, failing test, regression.
- `review-technical`: review chất lượng kỹ thuật của file/module/feature.
- `review-solution`: đánh giá hướng giải quyết, tradeoff, feasibility.
- `review-diff`: review git changes, phát hiện overwrite, hỗ trợ cherry-pick planning.
- `write-spec`: viết spec từ idea, epic, user story.
- `implement-feature`: implement feature hoặc fix đã rõ scope.

### Custom `.codex/skills/`

Chỉnh skill khi muốn thay đổi cách Codex/GPT làm việc.

Nên custom các phần:

- `description`: để agent tự nhận biết khi nào dùng skill.
- `Expected Inputs`: để người dùng biết nên đưa gì vào.
- `Process`: để phản ánh workflow cá nhân/team.
- `Do Not`: để chặn các hành vi không mong muốn.
- `Output`: để định dạng kết quả theo thói quen của bạn.

Ví dụ nếu bạn muốn review luôn class name/CSS warning, thêm rule đó vào `review-technical/SKILL.md`.

## `.claude/`

Thư mục dành cho Claude Code.

```shell
.claude/
- README.md
- rules/
  - general.md
  - frontend.md
  - backend.md
  - database.md
  - api.md
  - testing.md
- skills/
```

### `.claude/rules/`

Đây là bản convention rút gọn để Claude đọc nhanh khi implement.

Source of truth vẫn là:

```shell
docs/engineering/conventions/
```

Nếu rule trong `.claude/rules/` mâu thuẫn với `docs/engineering/conventions/`, ưu tiên file trong `docs/engineering/conventions/`.

### `.claude/skills/`

Tương tự `.codex/skills/`, nhưng dành cho Claude Code.

Theo workflow hiện tại:

- Claude thường dùng để implement/fix chính.
- Codex/GPT thường dùng để review, debug khó, security-sensitive analysis.

Bạn có thể thay đổi vai trò này theo team của mình.

## `docs/`

Thư mục chứa project guidance dài hơn, không nên đặt hết trong `AGENTS.md`.

```shell
docs/
- specs/
- domain/
- engineering/
```

### `docs/specs/`

Dùng cho feature specs, epic, user story, acceptance criteria, approval points.

Ví dụ:

```shell
docs/specs/
- README.md
- feature-name.md
```

Khi viết spec mới, nên đọc template hoặc spec gần nhất để giữ format nhất quán.

### `docs/domain/`

Dùng cho context sản phẩm và nghiệp vụ:

- project overview
- business rules
- glossary
- domain terms
- FRD/PRD/BRD nếu project cần

AI agent chỉ nên đọc phần này khi task cần hiểu domain hoặc business behavior.

### `docs/engineering/`

Dùng cho technical guidance:

- architecture
- engineering overview
- decisions
- coding conventions

Conventions chính nằm ở:

```shell
docs/engineering/conventions/
- general.md
- frontend.md
- backend.md
- database.md
- api.md
- testing.md
```

Đây là nơi nên custom nhiều nhất theo project thật.

## Cách Custom Theo Phong Cách Cá Nhân Hoặc Team

### 1. Bắt đầu từ `AGENTS.md`

Chỉnh các rule nền:

- AI có được tự refactor không?
- Khi nào phải hỏi approval?
- Có được tự đổi UI styling không?
- Có bắt buộc test không?
- Final response muốn ngắn hay chi tiết?

Giữ file này ngắn. Nếu một rule quá dài, chuyển sang `docs/engineering/conventions/` hoặc skill tương ứng.

### 2. Chỉnh conventions trong `docs/engineering/conventions/`

Đây là nơi định nghĩa phong cách code.

Ví dụ:

- frontend dùng React/Next.js thế nào
- backend dùng Express/Nest/Gin/Fiber thế nào
- API response dùng `camelCase` hay format khác
- test ưu tiên happy path hay edge case
- database migration/index/schema cần approval ra sao

### 3. Chỉnh skill theo workflow thật

Nếu bạn hay làm việc theo pattern:

```shell
research solution -> write spec -> plan -> implement -> review technical -> debug -> update docs
```

thì giữ đủ các skill đó.

Nếu team chỉ cần implement và review diff, có thể bỏ bớt skill không dùng để agent route chính xác hơn.

### 4. Chỉnh vai trò Codex/GPT và Claude

Workflow mẫu trong repo này:

- Claude = implement/fix chính cho task rõ scope.
- Codex/GPT = review, debug khó, security-sensitive fix, solution/technical review.

Nếu team bạn muốn Codex implement chính, hãy chỉnh lại:

- `.codex/README.md`
- `AGENTS.md`
- `CLAUDE.md`
- các skill liên quan trong `.codex/skills/` và `.claude/skills/`

### 5. Giữ tài liệu ngắn và đúng chỗ

Rule thực tế:

- Rule chung ngắn: `AGENTS.md`
- Rule Claude riêng: `CLAUDE.md`
- Workflow: `.codex/skills/` hoặc `.claude/skills/`
- Coding conventions chi tiết: `docs/engineering/conventions/`
- Domain/business context: `docs/domain/`
- Feature specs: `docs/specs/`

## Gợi Ý Khi Share Cho Người Khác

Người nhận repo nên làm theo thứ tự:

1. Đọc `README.md` này.
2. Đọc `AGENTS.md` để hiểu rule chung.
3. Nếu dùng Claude Code, đọc thêm `CLAUDE.md`.
4. Mở `docs/engineering/conventions/` và xóa/sửa rule không phù hợp.
5. Mở `.codex/skills/` hoặc `.claude/skills/` và giữ lại workflow cần dùng.
6. Thử một task nhỏ để xem agent có làm đúng phong cách mong muốn không.

## Nguyên Tắc Bảo Trì

- Khi convention gốc thay đổi, update `docs/engineering/conventions/` trước.
- Nếu dùng Claude, sync lại `.claude/rules/` để Claude đọc nhanh.
- Khi workflow thay đổi, update skill tương ứng.
- Không thêm rule trùng lặp ở nhiều nơi nếu không cần.
- Không biến `AGENTS.md` thành file quá dài.
- Ưu tiên rule rõ, cụ thể, có ví dụ khi dễ bị hiểu sai.
