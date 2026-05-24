# Frontend Conventions

## React / Next.js

- Use functional components.
- Prefer custom hooks for reusable component logic.
- Use Server Components by default in Next.js App Router.
- Use Client Components only when state, effects, browser APIs, refs, or client-side interactions are required.
- Keep component logic readable; avoid mixing data fetching, transformation, and rendering in one large block.
- Use arrow functions for frontend functions, components, and handlers.
- Do not declare frontend functions with the `function` keyword.
- Keep UI-only state and handlers inside the component file when they do not drive business logic, API calls, data fetching, or shared behavior.
- Place `useEffect` hooks after local handlers/functions and immediately before the JSX `return`.
- Prefer 1-2 `useEffect` hooks per component file; use at most 3 by default.
- Merge `useEffect` hooks when they share the same lifecycle purpose or dependency flow.

Bad:

```tsx
function UserTabs() {
  useEffect(() => {
    syncActiveTab();
  }, []);

  const handleChangeUserProfileTab = (tab: string) => {
    setActiveTab(tab);
  };

  return <Tabs onChange={handleChangeUserProfileTab} />;
}
```

Good:

```tsx
const UserTabs = () => {
  const handleChangeTab = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    syncActiveTab();
  }, []);

  return <Tabs onChange={handleChangeTab} />;
};
```

Reusable logic example:

```tsx
const useUserOptions = (users: User[]): SelectOption[] =>
  users.map((user) => ({
    label: user.name,
    value: user.id,
  }));
```

## Types

- Use `type` for component props.
- Prefer `interface` for API/data response shapes; use `type` when unions, mapped types, utility types, or composition are needed.

## Custom Hooks

- Custom hooks must use the `use` prefix, such as `useProductPage`.
- Use custom hooks for reusable component logic or page-level logic that is easier to read outside the component.
- Custom hooks may contain state and handlers, and should return the state and handlers needed by the component.
- Keep purely UI-local state in the component when it is only used for view behavior, such as opening a modal or changing a tab.
- Organize state and handlers inside custom hooks by data flow.
- For example, place preparation steps before validation or submit handlers when that is the flow of the hook.

Example:

```tsx
const useProductPage = () => {
  const [selectedId, setSelectedId] = useState<string>();

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleSubmit = () => {
    if (!selectedId) return;
    submitProduct(selectedId);
  };

  return {
    selectedId,
    handleSelect,
    handleSubmit,
  };
};
```

## Components

- Keep components focused on one responsibility.
- Extract a child component when a section grows beyond 80 lines or becomes hard to scan.
- Prefer composition over deeply nested conditional rendering.
- Use stable and unique `key` props for lists.
- Do not create tiny components that are used once and do not improve readability.
- Keep file, component, and function names as simple as possible while preserving meaning.
- Do not use names containing implementation-shell words such as `shell`, `bash`, or similar unless the domain explicitly requires them.

## Handlers And Props

- Event handlers defined inside components use the `handle` prefix.
- Event callback props use the `on` prefix.
- Keep handler names short and specific.
- Prefer `handleSingleSelect` over longer names such as `handleSingleSelectDropdown`.

## Data Fetching

- Use Server Components for server-rendered data when possible.
- Follow the project's client-side data fetching pattern when Server Components are not appropriate.
- Keep query/cache keys centralized when the project uses a query key factory or key pattern.
- Do not duplicate fetch logic across components.

## Styling / Design System

- Strictly follow the existing project design system.
- If no project design system exists, follow the UI library currently used by the project.
- Prefer existing project tokens, token classes, and library-supported classes.
- For Tailwind CSS, prefer canonical/standard classes and avoid arbitrary classes when a token class exists, such as `text-20` instead of `text-[20px]`.
- Do not hard-code colors, spacing, or typography when tokens or components exist.
- Do not change visual design, layout, spacing, colors, or component styling unless the task requires it.

## UI States

- User-facing screens and async components should handle loading, empty, error, and success states when relevant.
- Forms should handle loading, validation, disabled, submitting, and error states when relevant.

## React Data Transformations

- Do not use `for` loops in React component rendering or frontend data transformation code; use array methods to keep data flow declarative.
- Do not use nested iteration such as `map` inside `map` by default.
- If nested iteration is unavoidable because of the returned data shape, add a short comment explaining why it is necessary.
- Prefer `map`, `filter`, `find`, and `reduce` for common data transformations.
- Use `flatMap`, `some`, and `every` only when the context specifically needs them.
- Keep simple transformations inline when they are used once.
- Extract a helper only when the same transformation appears in at least two places or the transformation is meaningful enough to name.

## Class Names

- Do not leave duplicate or conflicting `className` values. If the intended class is unclear, ask the user which class to keep instead of deleting one automatically.

Example:

```tsx
// Conflicting spacing classes: ask which one should be kept.
<button className="rounded px-2 py-2 text-14 px-6">
  Save
</button>
```
