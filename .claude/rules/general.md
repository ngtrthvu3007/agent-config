# General Rules

Apply to every code change. Read `docs/engineering/conventions/general.md` for full detail.

## Code Organization

- Simple, explicit, maintainable over clever. Solve the core problem before improving surrounding code.
- Max 250 lines/frontend file, 500 lines/backend file, 50 lines/function.
- Split a child component or function into a separate file when it exceeds 80 lines.
- Remove unused imports. Use the project formatter and linter.
- No `console.log` or commented-out code in committed code.
- Keep public exports intentional — do not export helpers unless reused outside the module.

## Naming

- `camelCase` variables/functions, `UPPER_SNAKE_CASE` constants, `PascalCase` types/interfaces/classes/components.
- File names follow the existing project convention. Do not introduce new naming styles or suffix patterns.
- Use descriptive names. No single-character names except in obvious small local scopes.
- Follow existing suffix patterns: `.service`, `.controller`, `.repository`, `.dto`, `.types`, `.utils`, etc.

## JavaScript / TypeScript Syntax

- `const` by default; `let` only when reassignment is needed; never `var`.
- Arrow functions for callbacks and frontend handlers.
- No `.map().filter()` chains — use `flatMap` with a short comment.
- Use `Boolean(array.length)` not `!!array.length`.
- Prefer destructuring when it improves readability.
- Do not mutate React state, props, Zustand/Redux state, or function inputs directly — use immutable updates.

## TypeScript

- `strict` and `strictNullChecks` always on.
- Prefer `unknown` over `any`. Avoid `any` unless the boundary is truly untyped.
- Avoid `as` assertions without clear reason. No `@ts-ignore` without justification.
- `interface` for object shapes and exported contracts; `type` for unions, mapped types, composition.
- Prefer string literal unions or `as const` over `enum`.
- Explicit return types on backend service/controller methods, helper/util functions, and React Query hooks.
- No nested indexed access types deeper than one level — use named intermediate types.
- Handle `null`/`undefined` with optional chaining, type guards, or explicit checks.

## Helpers

- Extract a helper only when the same logic appears in at least two places, or the transformation is meaningful enough to name.
- Helpers have explicit return types and stay private unless reused outside the module.
- Prefixes: `map`, `get`, `to`, `build`, `parse`, `transform`.

## Fallback Logic

- One fallback layer maximum. Adding a second requires approval.
- Do not hide errors by silently falling back to unrelated data.
- If fallback affects API behavior, auth, permissions, payment, or persisted data — ask for approval first.
