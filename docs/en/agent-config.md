# Agent Config

This section helps you explore the core of the repo: the files agents read first, the rules that keep them aligned with your conventions, and the skills that package repeatable workflows by task type.

You do not need to use everything at once. Treat this section as a reference you can choose from: start with the base file, skim a few representative rules or skills, then keep the parts that fit the way you work.

## Repo Structure

```text
agent-config/
├─ AGENTS.md
├─ CLAUDE.md
├─ .codex/
│  └─ skills/
├─ .claude/
│  ├─ rules/
│  └─ skills/
└─ docs/
   ├─ agent-config.md
   ├─ agents.md
   ├─ claude.md
   ├─ guide/
   ├─ rules/
   └─ skills/
```

## Main Parts

- [`AGENTS.md`](/en/agents): the shared base file for AI coding agents, including core rules, approval gates, skill routing, and workflow aliases.
- [`CLAUDE.md`](/en/claude): the Claude Code-specific bridge file, which imports `AGENTS.md` and adds Claude-specific guidance.
- [`Rules`](/en/rules/general): short instructions grouped by scope, such as general, frontend, and backend. Rules help the agent apply conventions without rereading long-form docs.
- [`Skills`](/en/skills/plan-feature): example workflows for recurring task types such as planning, implementation, review, and QA.

## Suggested Reading Order

1. Read [`AGENTS.md`](/en/agents) to understand the base file agents use first.
2. Read [`CLAUDE.md`](/en/claude) if you use Claude Code.
3. Open a few rules to see how short, specific instructions are written.
4. Open a few skills to see how a workflow is packaged into steps.

Once the structure feels clear, return to [Bring Agent Config Into Your Project](/en/guide/workflow) to choose what to keep and adapt it to your project.
