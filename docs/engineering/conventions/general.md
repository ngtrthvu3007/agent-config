# General Engineering Conventions

## Principles

- Keep implementations simple and focused on the current task.
- Code must be easy to read.
- Solve the core problem before improving surrounding code.
- Prefer existing project patterns before introducing new abstractions.
- Avoid opportunistic cleanup, broad refactors, or unrelated rewrites.
- Prefer pragmatic, maintainable solutions over idealized architecture.
- When multiple valid options exist, explain the tradeoffs and identify whether each option is temporary, extensible, or recommended.

## Code Organization

- Keep imports organized and remove unused imports.
- Use the project formatter and linter.
- Keep temporary `console.log` or debug logs only during the debug phase; remove them and any commented-out code before the commit-ready phase.
- Keep files focused on one responsibility.
- Max 250 lines per frontend file by default.
- Max 500 lines per backend file by default.
- Max 50 lines per function by default.
- Consider splitting a child component or child function into a separate file when it is longer than 80 lines.
- Use arrow functions for frontend functions and handlers.
- Avoid long parameter lists. Prefer a single object parameter with a named interface or type.
- Keep public exports intentional. Do not export helpers unless they are reused outside the module.

## Helpers

- Follow code reuse and DRY principles.
- Before creating a helper, check related `utils`, `helpers`, shared modules, or existing local helpers to avoid duplicating logic.
- Extract helpers only when the same pattern appears in at least two places in the file, or when the helper logic requires a meaningful transformation step.
- Keep helper names short and specific, using simple prefixes such as `map`, `get`, `to`, `build`, `parse`, or `transform`.
- Helpers should have explicit return types.
- Add a short comment before a helper only when the helper's purpose, reuse reason, or transformation is not obvious from its name.
- Keep helpers private to the module unless they are reused outside the module.

Helper extraction example:

```ts
// Use simple transformations directly when they are used once.
const displayName = name.trim() || "Unknown";

// Consider a helper only when the same logic appears in at least two places
// or when the transformation becomes meaningful enough to name.
const trimName = (value: string): string => value.trim();
```

## Naming

- Use descriptive names.
- Avoid single-character names such as `p`, `t`, or `i`, except in very small local scopes where the meaning is obvious.
- Variables and functions use `camelCase`.
- Constants use `UPPER_SNAKE_CASE`.
- Types, interfaces, classes, and components use `PascalCase`.
- File names must follow the existing project convention.
- Common accepted file naming styles are `PascalCase`, `camelCase`, or `kebab-case`.
- Prefer the dominant style already used in the same folder or module.
- Keep exported symbol names and file names consistent when the project convention expects it.
- Semantic suffixes are project-specific. Follow existing suffix patterns in the folder or module, such as `.service`, `.controller`, `.repository`, `.repoImpls`, `.schema`, `.dto`, `.types`, `.constants`, `.utils`, `.path`, or `.route`.
- Do not introduce a new file naming style or suffix pattern unless explicitly requested.

Examples:

```txt
UserProfileCard.tsx
userProfileCard.tsx
user-profile-card.tsx
user.repoImpls.ts
auth.route.ts
```

## Immutability

- Do not mutate React state, props, Zustand/Redux state, TanStack Query cache data, function inputs, or shared objects directly.
- Use immutable updates with `map`, `filter`, `reduce`, `flatMap`, spread, or object/array copying.
- When updating nested objects, copy every changed level to preserve existing fields.
- Avoid mutating accumulators in `reduce`; return a new accumulator. Use mutation only for clearly justified performance-sensitive code outside React rendering paths.

## JavaScript / TypeScript Syntax

- Use modern ES6+ syntax by default.
- Prefer `const`; use `let` only when reassignment is required.
- Do not use `var`.
- Prefer destructuring when it improves readability.
- Prefer template literals over string concatenation for interpolation.
- Prefer arrow functions for callbacks and frontend functions/handlers.
- Do not chain `.map().filter()` to reshape nested data or remove empty mapped results. Use `flatMap` instead and add a short comment explaining why `flatMap` is needed.
- Use `Boolean(array.length)` when converting array length into an explicit boolean value. Prefer this over `!!array.length`.
- For simple `if` / `else` branches with only one short action, keep each branch on one line when it stays readable.

Data transformation examples:

```ts
// Use flatMap when mapping nested data and removing empty results in one pass.
const visibleItems = groups.flatMap((group) =>
  group.items.filter((item) => item.visible),
);

const hasVisibleItems = Boolean(visibleItems.length);

if (shouldDebug) console.log("debug value", value);

if (isValid) submitForm();
else showValidationError();
```

## TypeScript

- `strict` and `strictNullChecks` are expected.
- Add explicit return types for backend service/controller methods, helper/util functions, React Query hooks, and functions with multiple arguments or mixed data shapes.
- Do not require explicit return types for React components, inline callbacks, or simple local functions when TypeScript inference is clear.
- Prefer `unknown` over `any`.
- Avoid `any` unless the boundary is truly untyped and the usage is justified.
- Avoid type assertions with `as` unless there is a clear reason.
- Do not use `@ts-ignore` without a short justification.
- Prefer `interface` for object shapes and exported contracts.
- Use `type` for unions, mapped types, utility types, and composition.
- Use discriminated unions for variants.
- Prefer string literal unions or `as const` objects/arrays over TypeScript `enum`.
- Use `enum` only when the project already uses enums consistently, or when a runtime enum object is explicitly useful.
- Avoid `const enum` unless the project build setup explicitly supports it.
- Use `as const` for literal objects and arrays when literal inference matters.
- Handle `null` and `undefined` with optional chaining, type guards, or explicit checks.
- Avoid nested indexed access types deeper than one level. Use named intermediate types instead.

Bad:

```ts
type UserNameTest = User["name"]["test"];
```

Good:

```ts
type UserName = User["name"];
type UserNameTest = UserName["test"];
```

## Fallback Logic

- Implement at most one fallback layer by default.
- Treat default values, cached data, retry sources, inferred values, and alternative APIs as fallback logic.
- Do not add a second fallback layer unless explicitly approved.
- Do not hide errors by silently falling back to unrelated data.
- Do not change business behavior through fallback logic without approval.
- If fallback affects API behavior, auth, permissions, payment, or persisted data, ask for approval first.
- If a second fallback layer appears necessary, stop and explain:
  - the failure case the first fallback does not cover
  - why the second fallback is needed
  - the added complexity or maintenance risk
  - the simpler alternative, if any

Example:

```txt
Preferred:
primary source -> fallback source

Requires approval:
primary source -> fallback source -> second fallback source
```
