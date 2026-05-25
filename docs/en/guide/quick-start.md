# Quick Start

10 minutes to get agent config running in your real project.

## 1. Copy into your project

Clone the repo or use it as a GitHub template, then copy the necessary files into your project root:

```shell
cp -r agent-config/AGENTS.md    your-project/
cp -r agent-config/CLAUDE.md    your-project/
cp -r agent-config/.claude/     your-project/
cp -r agent-config/.codex/      your-project/   # if using Codex
```

## 2. Update CLAUDE.md

Open `CLAUDE.md`, find the `About the User` section, and update it to match you or your team:

```markdown
## About the User

Senior frontend engineer. Primarily React + Next.js. No need to explain basic TypeScript.
```

Everything else can stay as-is for now.

## 3. Trim rules to your real stack

Open `.claude/rules/` and remove files you don't need. For a frontend-only project:

- Keep: `general.md`, `frontend.md`, `testing.md`
- Delete or empty: `backend.md`, `database.md`, `api.md`

Then remove the corresponding rows from the **Coding Conventions** table in `CLAUDE.md`.

## 4. Test it

Open Claude Code in your project and try a small task:

```
/implement-feature add a loading spinner to the user list page
```

If Claude reads `general.md` and `frontend.md` on its own before writing any code — config is working.

---

From here: read [Core Concepts](/en/guide/concepts) to understand why the config is structured the way it is, or jump straight to [Adapt to Your Project](/en/guide/workflow) to customize further.
