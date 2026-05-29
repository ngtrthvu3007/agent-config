# Frontend Rules

`frontend.md` là rule agent đọc khi tác vụ chạm React hoặc Next.js. Trang này giúp bạn mở source thật, nhận ra pattern, và copy rule khi cần so sánh với project khác.

Nguồn: [`.claude/rules/frontend.md`](https://github.com/VuNguyentranThe/agent-config/blob/master/.claude/rules/frontend.md)

## Điểm đáng chú ý

- Tách rõ component, handler, hook, lấy dữ liệu, styling, và trạng thái UI.
- Nhắc agent không tự ý đổi visual design khi task chỉ là logic hoặc bug fix.
- Trỏ về `docs/engineering/conventions/frontend.md` để xem quy ước đầy đủ.

````markdown
# Frontend Rules

Apply to React / Next.js changes. Read `docs/engineering/conventions/frontend.md` for full detail.

## React / Next.js

- Functional components only; arrow function syntax; no `function` keyword for components or handlers.
- Server Components by default in Next.js App Router. Client Components only when state, effects, browser APIs, or refs are required.
- Keep component logic readable — do not mix data fetching, transformation, and rendering in one block.
- `useEffect` goes after local handlers, immediately before the JSX `return`. Max 3 per file; merge when they share the same lifecycle purpose.

## Components

- Keep components focused on one responsibility. Extract a child component when a section exceeds 80 lines.
- Prefer composition over deeply nested conditional rendering.
- Stable and unique `key` props for lists.
- Do not create tiny components used once that do not improve readability.

## Handlers and Props

- Event handlers defined inside components: `handle` prefix.
- Callback props: `on` prefix.
- Keep handler names short and specific — `handleSingleSelect` not `handleSingleSelectDropdown`.

## Custom Hooks

- `use` prefix required — e.g. `useProductPage`.
- Use for reusable or page-level logic. UI-only state (modal open/close, active tab) stays in the component.
- Organize state and handlers inside hooks by data flow order.

## Types

- `type` for component props.
- `interface` for API/data response shapes; `type` when unions, mapped types, or composition are needed.

## Data Fetching

- Server Components for server-rendered data when possible.
- Keep query/cache keys centralized when the project uses a key factory pattern.
- Do not duplicate fetch logic across components.

## Styling / Design System

- Strictly follow the existing project design system or UI library.
- Tailwind: prefer token classes (`text-20`) over arbitrary values (`text-[20px]`).
- No hard-coded colors, spacing, or typography when tokens or components exist.
- Do not change visual design, layout, spacing, or colors unless the task requires it.
- Do not leave duplicate or conflicting `className` values — ask the user which to keep.

## UI States

- Async screens and components: handle loading, empty, error, and success states.
- Forms: handle loading, validation, disabled, submitting, and error states.

## Data Transformations

- No `for` loops in rendering or frontend data transformation — use array methods.
- No nested `map` inside `map` without a comment explaining why it is unavoidable.
- Prefer `map`, `filter`, `find`, `reduce`. Use `flatMap`, `some`, `every` only when the context specifically needs them.
- Keep simple transformations inline when used once.
````

