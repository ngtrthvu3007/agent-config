# Backend Conventions

## Controllers / Routes

- Keep controllers/routes thin.
- Controllers should parse inputs, call application/service logic, and return responses.
- Do not place business logic, database queries, or complex mapping directly in controllers.
- Keep route handlers readable and focused on one action.
- Validate inputs at the boundary before calling service logic.

## Backend Naming

- Backend file names must follow the existing project convention.
- Use action prefixes that match the use case, such as `get`, `create`, `update`, `delete`, `list`, `find`.
- Use scope suffixes when they clarify the layer or responsibility, such as `Controller`, `Service`, `Repo`, or the existing project suffix.
- Controller and service function names should describe the use case and may use layer suffixes when the project pattern uses them, such as `getUserController`, `getUserDetailService`, or `updateUserService`.
- Repository function names must make the data-access intent clear and include the repo suffix only when the project uses a repository pattern, such as `findUserByIdRepo` or `createUserRepo`.
- Route handler names in Express, Gin, Fiber, or similar route files should stay short and simple; do not require a `Route` suffix.
- Follow the existing folder/module naming pattern before introducing a new prefix or suffix style.

## Services

- Put business logic in services or application-layer functions.
- Keep service methods focused on one use case.
- Use explicit return types for service methods.
- Do not mix unrelated use cases in one service method.
- Keep backend functions under 100 lines by default.
- Do not merge multiple logic modification steps into one large block; split them into readable child functions when needed.
- Avoid over-splitting into too many child functions; 2-3 focused child functions is usually enough.
- Place support/helper functions at the beginning or end of the file according to the language and project convention.

## Repositories / Data Access

- Keep database access behind the project's chosen data-access pattern, such as ORM services, query builders, repositories, or direct module-level data-access functions.
- Do not spread raw database queries across controllers or unrelated services.
- Keep query intent readable; avoid hiding complex query behavior behind vague helper names.
- Return data shapes that match the service/use-case needs.

Examples:

```ts
// Bad: controller owns raw database access.
const user = await prisma.user.findUnique({ where: { id } });
```

```ts
// Good: use the project's data-access pattern.
const user = await findUserSummaryById(id);
```

```ts
// Good: return only the shape the use case needs.
const findUserSummaryById = (id: string): Promise<UserSummary | null> =>
  prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      status: true,
    },
  });
```

## DTOs / Validation

- Define request DTOs, schemas, or validators according to the project pattern.
- Validate and normalize external input at system boundaries.
- Prefer returning validation or permission errors to the client as early as possible instead of allowing invalid requests to flow deeper into the system.
- Do not trust client-provided IDs, roles, ownership, tenant IDs, or permission flags without server-side checks.
- Keep validation errors clear and consistent with the project error format.

## Error Handling

- Use the project's standard exception/error handling pattern.
- Do not swallow errors silently.
- Do not return misleading success responses when an operation failed.
- Avoid leaking secrets, tokens, private data, stack traces, or internal implementation details in public errors.
- Keep not found, validation, permission, and conflict errors distinct when the project supports it.

## Logging

- Use the project logger when logs should remain.
- In local, dev, staging, or UAT, add full-context temporary logs only when the user asks for them.
- Do not add temporary debug logs in production code paths.
- Remove temporary debug logs before the commit-ready phase unless the user explicitly asks to keep them.
- Do not log secrets, tokens, passwords, cookies, payment data, or private user data.
- Log enough context to debug backend failures without exposing sensitive data.

## API Response Mapping

- Keep API response shapes stable unless a contract change is approved.
- Keep API response format consistent across endpoints according to the project pattern.
- API response fields use `camelCase` by default unless the user explicitly requests another format.
- Database field naming may differ, such as `snake_case`; map it to the API response format using the framework, ORM, interceptor, serializer, or mapper pattern used by the project.
- Map database entities to response DTOs when the project pattern requires it.
- Do not expose raw ORM entities directly if they contain internal or sensitive fields.
- Keep response mapping close to the service/controller boundary based on the project pattern.

## API Documentation

- Always document API behavior when adding or changing endpoints.
- Use the project's API documentation tool or pattern, such as Swagger/OpenAPI, when available.
- Document important request fields, response fields, data types, required/optional fields, examples, and business rules.
- Document success responses and important failed cases, such as validation errors, not found, permission denied, conflict, and unexpected errors.
- Keep API docs aligned with the actual DTOs, validators, response mapping, and error format.

## Performance

- Prioritize time complexity by default.
- Optimize for space complexity only when the user explicitly asks for it.
- Avoid N+1 queries.
- Avoid nested loops.

## Node.js / TypeScript Backend

- Follow the existing ExpressJS or NestJS project structure.
- Use DTOs, schemas, pipes, guards, filters, or middleware according to the project pattern.
- Use `async` / `await` consistently for asynchronous code.
- Keep service/controller methods explicitly typed when they define backend behavior or public contracts.
- Mark controller and service methods as `private` or `public` when the framework or class style supports it.
- Do not bypass module boundaries or the existing service/data-access pattern.
- Prefer class-based abstractions and apply design patterns for common infrastructure when they improve consistency, such as singleton database connections or abstract classes for shared module/route methods.
- Follow the project ORM pattern for TypeORM, Prisma, Drizzle, or custom query builders.

Examples:

```ts
// Good: shared infrastructure can use a singleton-style connection.
class DatabaseConnection {
  private static instance: PrismaClient | null = null;

  static getClient(): PrismaClient {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new PrismaClient();
    }

    return DatabaseConnection.instance;
  }
}
```

```ts
// Good: shared module behavior can use an abstract base class.
abstract class BaseUserModule {
  protected buildUserFilter(params: UserFilterParams): UserFilter {
    return {
      status: params.status,
      keyword: params.keyword?.trim(),
    };
  }
}
```

```ts
// Avoid: do not add a design pattern for one small one-off function.
const getUserById = (id: string): Promise<User | null> =>
  userRepository.findById(id);
```

## Go Backend

- Follow the existing Gin or Fiber project structure.
- Keep handlers thin and move business logic into services or use-case functions.
- Pass `context.Context` through request-scoped operations when the project uses it.
- Do not use unclear abbreviations for important parameters; prefer `context` over `c` when passing `context.Context`.
- Always name imported packages clearly when an alias is needed.
- Return errors explicitly; do not use `panic` for normal control flow.
- Keep request/response structs clear and close to the API boundary.
- Follow the project's data-access and logging patterns.

Example:

```go
import (
  fmt "go/git/fmt"
)
```
