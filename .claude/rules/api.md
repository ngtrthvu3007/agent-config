# API Rules

Apply when adding or changing API endpoints. Read `docs/engineering/conventions/api.md` for full detail.

## Principles

- Follow the existing API style of the project.
- Do not change request shape, response shape, status codes, or error format without approval.
- Treat public API changes as contract changes.

## Requests

- Validate params, query, body, headers, and auth context at the API boundary.
- Keep pagination, filtering, sorting, and search parameters consistent with similar endpoints.
- Never trust client-provided IDs, roles, ownership, tenant IDs, or permission flags.
- Return validation or permission errors early — do not let invalid requests flow deeper.

## Responses

- `camelCase` response fields by default unless the project uses another format.
- Keep success response shapes stable and consistent with similar endpoints.
- Do not expose raw database or ORM entities directly.
- Do not expose internal fields, secrets, tokens, permission internals, or private data.
- Map database fields to API response fields through the project mapper, serializer, interceptor, or DTO pattern.

## Errors

- Use the project's standard error format.
- Keep validation, unauthorized, forbidden, not found, conflict, and unexpected errors distinct.
- Do not return success responses for failed operations.
- Do not leak stack traces, secrets, tokens, private data, or internal implementation details.

## Status Codes

- Follow the existing status-code convention of the project.
- Do not change status-code behavior if clients may depend on it.

## Compatibility

- Keep backward compatibility unless a breaking change is approved.
- If a breaking change is required, document old behavior, new behavior, migration impact, and affected clients.

## Documentation

- Document API changes with Swagger/OpenAPI when available.
- Document important fields, data types, required/optional rules, examples, success cases, and failed cases.
- Keep API docs aligned with DTOs, validators, response mapping, and error format.
