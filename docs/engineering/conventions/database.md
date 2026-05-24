# Database Conventions

## Principles

- Follow the existing database, ORM, migration, and naming patterns of the project.
- Keep database changes scoped to the current requirement.
- Do not change schema, migrations, indexes, constraints, or persisted data behavior without approval.
- Prefer readable data models and queries over clever shortcuts.
- Preserve existing data unless the task explicitly requires a data migration or cleanup.

## Schema Changes

- Treat schema changes as contract changes.
- Add, rename, or remove tables, collections, columns, fields, indexes, and constraints only when the requirement clearly needs it.
- Keep schema names descriptive and consistent with the project convention.
- Do not introduce a new naming style for tables, collections, columns, fields, or indexes.
- Keep database field naming consistent with the database convention, even when API responses use `camelCase`.
- Map database field names to API response names through the ORM, serializer, interceptor, or mapper pattern used by the project.

## Migrations

- Use the project's migration tool and migration format.
- Keep each migration focused on one logical change.
- Make migrations safe for existing data when possible.
- Do not edit already-applied migrations unless the project explicitly allows it.
- If a migration can lose data, lock users out, or require downtime, ask for approval first.
- Include data backfill only when the requirement needs it and the expected data shape is clear.

## Queries

- Keep query intent easy to read.
- Select only the fields needed by the use case when the project pattern supports it, unless the project intentionally loads full entities or documents.
- Avoid N+1 queries.
- Avoid nested loops around database calls.
- Prefer one clear query or a small number of clear queries over scattered query logic.
- Keep filtering, sorting, pagination, and access constraints explicit.

Example:

```ts
// Good: select only the fields needed by the response/use case.
const user = await prisma.user.findUnique({
  where: { id: userId },
  select: {
    id: true,
    email: true,
    status: true,
  },
});
```

## Indexes

- Add indexes only for real query patterns, filtering, sorting, relationships, lookups, joins, or uniqueness requirements.
- Do not add speculative indexes without evidence or a clear requirement.
- Keep index names consistent with the project convention when names are managed manually.
- Consider write cost before adding indexes to frequently updated data.

## Data Integrity

- Use database constraints when the project already relies on them for integrity.
- Keep unique, foreign key, required, default, and check constraints aligned with business rules.
- Enforce important persisted data rules at the backend or database layer, not only in frontend code.
- Do not rely only on frontend validation for persisted data rules.
- Validate important external input before writing to the database.
- Do not trust client-provided IDs, ownership, tenant IDs, roles, or permission flags.

## Transactions

- Use transactions only when multiple writes must succeed or fail together.
- Keep transaction usage consistent with the project pattern.
- Ask for approval before changing transaction behavior for payment, inventory, permissions, or critical persisted data.

## PostgreSQL

- Follow the project's existing SQL, ORM, and migration conventions.
- Keep relational structure clear.
- Keep JSON/JSONB usage intentional; do not hide relational data in JSON fields unless the project pattern supports it.
- Use database constraints for important integrity rules when the project already uses them.

## MongoDB

- Follow the project's existing collection, schema, and index conventions.
- Keep document shapes stable unless a schema change is approved.
- Avoid unbounded document growth.
- Add indexes only for actual query patterns.
- Keep denormalized data intentional and document the source of truth when it matters.
