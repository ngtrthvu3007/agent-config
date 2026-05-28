# How AI Reads Config

AI does not read every file in your project all at once. It starts with the main instructions, then opens rules, skills, or other docs only when the task needs them.

Understanding that rhythm helps you keep config lean: enough context for AI to start in the right direction, without putting everything in one place.

## At the start of a conversation

When you open a new conversation, AI reads the context file once to get the starting point: what the project is, what technology it uses, and how you want AI to work.

That file does not refresh after every message. If you edit `AGENTS.md` or `CLAUDE.md` while you are already chatting, the change usually applies in the next conversation.

If you want to use the change in the current conversation, send the context file again and ask AI to re-read it.

Each new conversation starts fresh. AI does not automatically remember content from earlier sessions unless you write it down in a file.

## Location changes how AI reads

Rules and skills can describe the same thing, but AI reads them differently depending on where you put them.

If you write rules and skills directly in `AGENTS.md`, they become part of the context file. AI reads them as soon as the conversation starts.

This is how most projects should begin: put the most important rules and workflows in one file so they are easy to read, edit, and maintain.

```markdown
## How to Work

- camelCase for variables, PascalCase for components
- No `any` in TypeScript
- Validate input at API boundary only

## When debugging

1. Read the full error and stack trace first
2. Confirm root cause before changing code
3. Run related tests after fixing
```

The tradeoff is that AI reads all of that content at the start of every conversation, even when the current task only needs a small part of the file.

When rules or skills grow longer and start covering many cases, you can split them into separate files. At that point, they are no longer read upfront; AI opens the relevant file only when the task needs it.

| Where it lives | When AI reads it |
| --- | --- |
| Written directly in the context file | At the start of the conversation |
| Split into separate rules or skills files | When AI determines the task needs them |
| Docs, specs, conventions | When you ask, or when AI needs more context |

Consider splitting into separate files when:

- The context file starts getting long and hard to read
- The project has distinct areas like frontend, backend, and database, and you want AI to read only what it needs
- Multiple people on the team use the config and need to manage rules independently

There is no need to split too early. A tidy single file is still easier to use than a multi-file setup you do not need yet.

## Notes by tool

**ChatGPT Codex** reads `AGENTS.md` directly and loads it automatically at the start of a task.

**Claude Code** does not read `AGENTS.md` directly. Claude needs `CLAUDE.md` at the project root; the `@AGENTS.md` line inside `CLAUDE.md` tells Claude Code to also load `AGENTS.md`. Details: [Claude Code Memory](https://docs.claude.com/en/docs/claude-code/memory).

**ChatGPT Codex (web)** does not read files from your repo automatically. Paste your `AGENTS.md` content into **Project Instructions** for similar behavior. The limit is around 1,500 characters.

## Practical implications

**Keep the context file focused.** This is the first thing AI reads, so let it carry the essentials: what the project is, what the shared principles are, and where to read more when details are needed.

**Split rules and skills when they start getting long.** Splitting helps AI read only the relevant part, and it makes each piece easier to update.

**Start a new conversation after editing files.** This is the most reliable way to make sure AI reads the latest version of `AGENTS.md` or `CLAUDE.md`.

---

For token cost and context quality: [Token & Context Quality](/en/guide/token-and-context).
