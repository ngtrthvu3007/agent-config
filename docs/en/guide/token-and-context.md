# Token & Context Quality

## On cost: it's not a concern

If you're using Claude Code (Pro/Max) or ChatGPT (Plus/Pro) on a subscription, you don't pay per token — flat monthly fee, config overhead doesn't cost you anything extra.

If you're using the API directly, quick math with a typical 1,500 token overhead:

| Model | Cost |
| --- | --- |
| Claude Sonnet 4.x ($3/1M tokens) | ~$0.005 — less than half a cent |
| Claude Opus 4.x ($15/1M tokens) | ~$0.023 — about 2 cents |
| GPT-4o ($2.5/1M tokens) | ~$0.004 — negligible |
| o3 ($10/1M tokens) | ~$0.015 — about 1.5 cents |

Claude Code also automatically caches system context — subsequent turns in the same session cost ~10% of the original price for cached content. The numbers above are worst case.

## What a real session actually costs

```txt
CLAUDE.md + AGENTS.md      ~1,500 tokens    ← usually cached after the first turn
Reading one rule file       ~300–600 tokens
Reading one source file     ~500–2,000 tokens
A full real conversation    20,000–100,000+ tokens
```

1,500 tokens of config overhead is about 1–5% of a total session. Less than a single message where you paste a stack trace.

## Why keep config short anyway?

Not because of money — because of context quality.

Imagine explaining a task to someone, but first you read aloud the entire 200-page coding convention manual — even though the task has nothing to do with most of what was just read. That person will get confused, misremember things, or prioritize the wrong details.

Agents work the same way. A 15,000-token AGENTS.md stuffed with everything means the agent reads a lot of irrelevant content for the current task, and is more likely to miss what actually matters.

That's the reason this repo splits things up: AGENTS.md stays short (~800 tokens), rule files are loaded on demand (~400 tokens each). The total tokens are comparable — but the agent gets the right context at the right time.
