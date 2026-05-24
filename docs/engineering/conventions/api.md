# API Conventions

## Principles

- Follow the existing API style of the project.
- Do not change request shape, response shape, status code, or error format without approval.
- Treat public API changes as contract changes.
- Keep API behavior predictable and easy to document.

## Requests

- Validate params, query, body, headers, and auth context at the API boundary.
- Keep pagination, filtering, sorting, and search parameters consistent with similar endpoints.
- Do not trust client-provided IDs, roles, ownership, tenant IDs, or permission flags.
- Prefer returning validation or permission errors early.

## Responses

- Use `camelCase` response fields by default unless the user requests another format.
- Keep success response shapes stable and consistent with similar endpoints.
- Do not expose raw database or ORM entities directly.
- Do not expose internal fields, secrets, tokens, permission internals, or private data.
- Map database fields to API response fields through the project mapper, serializer, interceptor, or DTO pattern.

## Errors

- Use the project's standard error format.
- Keep validation, unauthorized, forbidden, not found, conflict, and unexpected errors distinct when supported.
- Do not return success responses for failed operations.
- Do not leak stack traces, secrets, tokens, private data, or internal implementation details.

## Status Codes

- Follow the existing status-code convention of the project.
- Do not change status-code behavior if clients may depend on it.
- Use clear status codes for success, validation failure, auth failure, permission failure, not found, conflict, and server errors.

## Compatibility

- Keep backward compatibility unless a breaking change is approved.
- If a breaking change is required, document old behavior, new behavior, migration impact, and affected clients.

## Documentation

- Document API changes with the project's API documentation tool or pattern, such as Swagger/OpenAPI, when available.
- Document important fields, data types, required/optional rules, examples, success cases, and failed cases.
- Keep API docs aligned with DTOs, validators, response mapping, and error format.
