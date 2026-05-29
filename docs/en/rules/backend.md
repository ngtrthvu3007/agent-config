# Backend Rules

`backend.md` is the rule an agent reads when a task touches Express, NestJS, Gin, or Fiber. This page helps you open the real source, notice the pattern, and copy the rule when comparing it with another project.

Source: [`.claude/rules/backend.md`](https://github.com/VuNguyentranThe/agent-config/blob/master/.claude/rules/backend.md)

## What To Notice

- Organized by layer: controllers, services, data access, validation, error handling, logging, API responses.
- Keeps controllers thin and protects API contracts.
- Points to `docs/engineering/conventions/backend.md` for the full convention.

````markdown
# Backend Rules

Apply to Express / NestJS / Gin / Fiber changes. Read `docs/engineering/conventions/backend.md` for full detail.

## Controllers / Routes

- Thin controllers: parse inputs, call service, return response.
- No business logic, database queries, or complex mapping in controllers.
- Validate inputs at the boundary before calling service logic.

## Services

- Services own business logic. Keep methods focused on one use case.
- Explicit return types on all service methods.
- Keep backend functions under 100 lines. Split into 2–3 focused child functions when needed — no more.
- Do not mix unrelated use cases in one service method.

## Repositories / Data Access

- Database access behind the project's data-access layer: ORM service, query builder, or repository.
- No raw database queries in controllers or unrelated services.
- Return data shapes that match the service/use-case needs — select only needed fields.

## Naming

- Action prefixes: `get`, `create`, `update`, `delete`, `list`, `find`.
- Layer suffixes when the project uses them: `Controller`, `Service`, `Repo`.
- Follow existing folder/module naming — do not introduce new suffix patterns.

## DTOs / Validation

- Define request DTOs or validators according to the project pattern.
- Validate and normalize external input at system boundaries. Reject invalid input early.
- Never trust client-provided IDs, roles, ownership, tenant IDs, or permission flags — verify server-side.

## Error Handling

- Use the project's standard exception/error handling pattern.
- Do not swallow errors silently. Do not return success responses for failed operations.
- Never leak stack traces, secrets, tokens, private data, or internal details in public errors.
- Keep not found, validation, permission, and conflict errors distinct.

## Logging

- Use the project logger for logs that should persist.
- Do not log secrets, tokens, passwords, cookies, payment data, or private user data.
- Remove temporary debug logs before commit unless explicitly asked to keep them.

## API Response Mapping

- Keep response shapes stable unless a contract change is approved.
- API response fields use `camelCase` — map database `snake_case` through ORM/mapper/interceptor.
- Do not expose raw ORM entities if they contain internal or sensitive fields.

## API Documentation

- Document API behavior when adding or changing endpoints.
- Use Swagger/OpenAPI when available. Keep docs aligned with DTOs, validators, and error format.

## Node.js / TypeScript

- `async/await` consistently. Explicit return types on service and controller methods.
- Follow the existing project ORM pattern (TypeORM, Prisma, Drizzle).
- Do not bypass module boundaries or the existing service/data-access pattern.

## Go (Gin / Fiber)

- Thin handlers; business logic in services or use-case functions.
- Pass `context.Context` through request-scoped operations. Prefer `context` over `c` as parameter name.
- Return errors explicitly; no `panic` for normal control flow.
- Clear import aliases when needed.
````

