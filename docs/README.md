# Docs

Thư mục này chứa project guidance dài hạn cho AI agents và contributors.

Mục tiêu của `docs/` là tách phần context dài ra khỏi `AGENTS.md`, để root instruction luôn ngắn nhưng AI vẫn có nơi đọc thêm khi task cần hiểu domain, specs, architecture, hoặc coding conventions.

## Cấu Trúc

```shell
docs/
+-- README.md
+-- specs/
|   +-- README.md
|   +-- feature-name.md
+-- domain/
|   +-- overview.md
|   +-- business-rules.md
|   +-- glossary.md
+-- engineering/
    +-- overview.md
    +-- architecture.md
    +-- decisions.md
    +-- conventions/
        +-- general.md
        +-- frontend.md
        +-- backend.md
        +-- database.md
        +-- api.md
        +-- testing.md
```

## Cách AI Agent Nên Đọc

Không đọc toàn bộ `docs/` mặc định.

Chỉ đọc file liên quan đến task hiện tại:

- Cần hiểu tính năng, acceptance criteria, approval points: đọc `docs/specs/`.
- Cần hiểu sản phẩm, nghiệp vụ, thuật ngữ: đọc `docs/domain/`.
- Cần hiểu kiến trúc, conventions, technical decisions: đọc `docs/engineering/`.
- Cần sửa code: đọc conventions tương ứng trong `docs/engineering/conventions/`.

Nếu không chắc file nào liên quan, đọc file gần nhất với task hoặc hỏi người dùng một câu ngắn.

## `specs/`

Dùng cho feature specs, epic, user story, acceptance criteria, scope, edge cases, và approval points.

Nên dùng khi:

- viết spec mới
- review requirement
- lập plan cho feature
- QA theo acceptance criteria
- kiểm tra task có đi lệch scope không

File mẫu:

- `README.md`: giải thích cách viết spec.
- `feature-name.md`: template/spec mẫu cho một feature.

Khi custom:

- thêm format spec riêng của team
- thêm section bắt buộc như business rule, API impact, rollout, analytics
- bỏ section không dùng để spec gọn hơn

## `domain/`

Dùng cho context sản phẩm và nghiệp vụ.

Các file chính:

- `overview.md`: mô tả sản phẩm, user chính, module chính.
- `business-rules.md`: rule nghiệp vụ quan trọng.
- `glossary.md`: thuật ngữ domain và cách hiểu thống nhất.

Nên dùng khi task liên quan đến:

- business behavior
- role/user permission
- domain terminology
- workflow nghiệp vụ
- rule cần giữ ổn định qua nhiều feature

Không nên đặt coding convention hoặc implementation detail vào `domain/`.

## `engineering/`

Dùng cho technical guidance của project.

Các file chính:

- `overview.md`: tổng quan kỹ thuật.
- `architecture.md`: kiến trúc, module boundary, data flow.
- `decisions.md`: technical decisions đã chốt và lý do.
- `conventions/`: coding conventions chi tiết.

Nên dùng khi task liên quan đến:

- kiến trúc
- module boundary
- API/database/testing convention
- review technical quality
- refactor hoặc migration

## `engineering/conventions/`

Đây là source of truth cho coding conventions.

Các file hiện có:

- `general.md`: rule chung về readability, naming, helper, TypeScript, fallback logic.
- `frontend.md`: React/Next.js, component, hook, styling, className, UI states.
- `backend.md`: controller, service, repository/data access, DTO, error, logging, Node.js/Go backend.
- `database.md`: schema, migration, query, index, data integrity, PostgreSQL, MongoDB.
- `api.md`: API contract, request/response, errors, status code, compatibility, docs.
- `testing.md`: testing strategy, happy-path first, backend/API/frontend tests, fixtures, mocking.

Khi custom cho project mới:

1. Đọc `general.md` trước.
2. Xóa rule không phù hợp với stack của project.
3. Thêm rule project-specific vào file đúng scope.
4. Nếu rule dài hoặc dễ hiểu sai, thêm ví dụ ngắn.
5. Tránh duplicate cùng một rule ở nhiều file.

## Quan Hệ Với `.claude/rules/`

Nếu dùng Claude Code, `.claude/rules/` là bản rút gọn để Claude đọc nhanh khi implement.

Source of truth vẫn là:

```shell
docs/engineering/conventions/
```

Khi sửa convention gốc, nên sync lại file tương ứng trong `.claude/rules/`.

Ví dụ:

- sửa `docs/engineering/conventions/frontend.md`
- sau đó cập nhật `.claude/rules/frontend.md`

## Khi Nào Nên Thêm File Mới

Thêm file mới khi nội dung đủ quan trọng và được dùng lại nhiều lần.

Ví dụ nên thêm:

- `docs/specs/export-report.md` cho feature lớn.
- `docs/domain/permissions.md` nếu permission rules phức tạp.
- `docs/engineering/api-versioning.md` nếu API versioning là chủ đề lớn.

Không nên thêm file mới cho note nhỏ, tạm thời, hoặc chỉ dùng một lần. Với nội dung nhỏ, thêm vào file hiện có sẽ dễ bảo trì hơn.

## Nguyên Tắc Viết Docs

- Viết ngắn, rõ, dễ scan.
- Ưu tiên rule cụ thể hơn lời khuyên chung chung.
- Ghi rõ khi nào rule là bắt buộc và khi nào chỉ là default.
- Dùng ví dụ khi rule dễ bị hiểu sai.
- Không viết aspirational docs như thể project đã có behavior đó.
- Không lặp lại nội dung đã có ở `AGENTS.md` hoặc skill nếu chỉ cần link/reference.
- Khi rule ảnh hưởng API, auth, payment, database schema, hoặc persisted data, ghi rõ approval gate.

## Gợi Ý Cho Người Dùng Repo Này

Khi nhận repo template này:

1. Giữ cấu trúc `docs/specs`, `docs/domain`, `docs/engineering` nếu chưa có cấu trúc docs riêng.
2. Xóa nội dung không khớp với project thật.
3. Điền domain context tối thiểu vào `docs/domain/overview.md`.
4. Chỉnh conventions trong `docs/engineering/conventions/`.
5. Viết spec đầu tiên trong `docs/specs/` để AI agent có source of truth khi plan/implement/review.
