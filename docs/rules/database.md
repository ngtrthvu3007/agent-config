# Database Rules

`database.md` là rule agent đọc khi tác vụ chạm schema, migration, hoặc query. Trang này giúp bạn mở source thật, nhận ra pattern, và copy rule khi cần so sánh với project khác.

Nguồn: [`.claude/rules/database.md`](https://github.com/VuNguyentranThe/agent-config/blob/master/.claude/rules/database.md)

## Điểm đáng chú ý

- Đặt approval gate cho thay đổi schema và migration.
- Nhắc agent giữ dữ liệu hiện có an toàn và giữ query có mục đích rõ.
- Trỏ về `docs/engineering/conventions/database.md` để xem quy ước đầy đủ.

````markdown
# Database Rules

Apply to schema, migration, or query changes. Read `docs/engineering/conventions/database.md` for full detail.

## Principles

- Schema and migration changes require approval before touching.
- Keep database changes scoped to the current requirement.
- Preserve existing data unless the task explicitly requires a migration or cleanup.

## Schema Changes

- Add, rename, or remove tables/columns/indexes/constraints only when the requirement clearly needs it.
- Keep schema names descriptive and consistent with the project convention.
- Do not introduce new naming styles for tables, columns, or indexes.
- Database field naming follows database convention (usually `snake_case`); map to API response format through ORM/mapper.

## Migrations

- One logical change per migration. Safe for existing data when possible.
- Do not edit already-applied migrations unless the project explicitly allows it.
- If a migration can lose data, lock users out, or require downtime — ask for approval first.

## Queries

- Select only the fields needed by the use case.
- Avoid N+1 queries and nested loops around database calls.
- Keep filtering, sorting, pagination, and access constraints explicit.

## Indexes

- Add indexes only for real query patterns — filtering, sorting, lookups, uniqueness.
- No speculative indexes without evidence or a clear requirement.
- Consider write cost before adding indexes to frequently updated data.

## Data Integrity

- Use database constraints when the project already relies on them.
- Enforce persisted data rules at the backend or database layer — not only in frontend code.
- Never trust client-provided IDs, ownership, tenant IDs, roles, or permission flags.

## Transactions

- Use transactions only when multiple writes must succeed or fail together.
- Ask for approval before changing transaction behavior for payment, inventory, permissions, or critical data.

## PostgreSQL

- Keep relational structure clear.
- Keep JSON/JSONB usage intentional — do not hide relational data in JSON fields unless the project pattern supports it.

## MongoDB

- Keep document shapes stable unless a schema change is approved.
- Avoid unbounded document growth. Indexes only for actual query patterns.
- Keep denormalized data intentional — document the source of truth when it matters.
````

