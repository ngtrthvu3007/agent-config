# How Agents Read Files

Understanding how agents load and read config files helps you design an agent config that's efficient — avoiding wasted tokens and ensuring the agent has the right context when it needs it.

## How Claude Code reads CLAUDE.md

**When:** At the start of every conversation — before the first turn.

**Mechanism:** Claude Code injects the contents of `CLAUDE.md` into the system prompt. This is not read by Claude using a tool call — the Claude Code harness loads it automatically.

```
Conversation starts
  └── Claude Code reads CLAUDE.md
        └── Encounters @AGENTS.md directive
              └── Claude Code loads and inlines AGENTS.md here
  └── Full CLAUDE.md + AGENTS.md → system context
```

**How many times:** Once per conversation. Changes to the file mid-conversation have no effect — start a new conversation to pick up changes.

**Token cost (estimates):**

| File | Tokens (estimate) |
|---|---|
| CLAUDE.md (excluding AGENTS.md) | ~300–500 |
| AGENTS.md | ~700–1,000 |
| Total at conversation start | ~1,000–1,500 |

> Token estimates are based on the current file sizes in this repo. Longer files cost more tokens — keeping AGENTS.md short matters.

---

## How Claude reads Rules

Rules are **not** auto-loaded. Claude reads them **on-demand** using the Read tool during the conversation.

**Trigger:** CLAUDE.md contains a mapping table of "read which file when":

```markdown
| File | Read when |
|---|---|
| .claude/rules/general.md  | Any code change |
| .claude/rules/frontend.md | React / Next.js changes |
| .claude/rules/backend.md  | Express / NestJS / Gin / Fiber |
...
```

**Actual flow:**

```
User: "add a search filter to this React component"
  └── Claude recognizes: this is a React task
  └── Claude calls: Read(.claude/rules/general.md)    [tool call]
  └── Claude calls: Read(.claude/rules/frontend.md)   [tool call]
  └── Rule content enters context
  └── Claude implements following the conventions
```

**Token cost:**

| Rule file | Tokens (estimate) |
|---|---|
| general.md | ~400–600 |
| frontend.md | ~400–600 |
| backend.md | ~400–600 |
| database.md | ~300–500 |
| api.md | ~300–500 |
| testing.md | ~300–500 |

A typical backend task reads: `general.md` + `backend.md` ≈ ~800–1,200 additional tokens in context.

**How many times:** Each rule is read at most once per conversation. After being read, it stays in context until the conversation ends.

---

## How Claude reads Skills

Skills are read **when invoked** — not at conversation start.

**How to invoke:**

```bash
# Explicit — user calls directly
/implement-feature add export button to report page

# Auto — Claude pattern-matches task description to skill description
User: "there's a failing test in AuthService"
→ Claude matches debug-failure skill (description: "failing test, regression, runtime error")
→ Claude reads .claude/skills/debug-failure/SKILL.md
```

**Flow:**

```
User invokes skill (or Claude auto-detects)
  └── Claude calls: Read(.claude/skills/<name>/SKILL.md)  [tool call]
  └── SKILL.md content enters context
  └── Claude follows the process defined in the skill
```

**Token cost per skill:** ~400–1,000 tokens.

---

## How Codex / ChatGPT reads AGENTS.md

**When:** Codex auto-loads `AGENTS.md` at conversation start — similar to how Claude Code loads `CLAUDE.md`.

**No `.claude/` for Codex.** Codex reads:
- `AGENTS.md` — shared rules
- `.codex/skills/*/SKILL.md` — when a skill is invoked

**No separate rule files.** To give Codex access to conventions, either:
1. Put brief conventions directly in `AGENTS.md`
2. Create additional files and reference them from `AGENTS.md`

---

## Summary: What gets loaded and when

```
Conversation starts
├── Claude Code: CLAUDE.md + @AGENTS.md → auto-loaded into system context
└── Codex: AGENTS.md → auto-loaded into system context

During conversation (task-triggered)
├── Rule files → Claude reads them when task type matches
└── Skill files → read when user invokes or Claude auto-detects

Never auto-loaded
├── docs/domain/
├── docs/engineering/
└── docs/specs/
   (Claude reads these only when you ask or the task requires domain context)
```

---

## Why this matters for config design

**1. Keep AGENTS.md and CLAUDE.md short**

They're always in context — every extra token here costs tokens in every conversation. Rule of thumb: keep each file under 500–800 tokens.

**2. Rule files can be slightly longer**

They're only read when needed — but still keep them under 600–800 tokens to avoid bloating context.

**3. Don't cram everything into AGENTS.md**

Wrong pattern:
```markdown
# AGENTS.md
[Core rules...]
[Full frontend conventions...]
[Full backend conventions...]
[Full testing guide...]
```

Right pattern:
```markdown
# AGENTS.md
[Core rules — short, stable]
[Routing: read .claude/rules/frontend.md when working on React]
```

**4. Skill descriptions must be specific enough**

Claude uses the `description:` frontmatter to auto-detect skills. Too generic causes confusion:

```yaml
# Too generic — Claude can't tell when to use it
description: Use for code tasks

# Specific enough
description: Use when fixing a bug, failing test, regression, runtime error, or broken behavior
```
