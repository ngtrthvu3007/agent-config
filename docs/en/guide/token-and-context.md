# Token & Context Quality

Tokens describe how much text AI is processing. Context describes what information AI can see while it works.

For agent config, the two are connected: longer config uses more tokens; clearer config helps the context stay focused on the task.

## Tokens

A token is the unit AI uses to measure text. It is not exactly a word or a character; it is usually a small piece of a sentence.

Everything AI reads, from messages and files to rules, skills, and supporting docs, is counted as tokens and takes up part of the context.

## Context Window

A context window is the amount of content AI can see in a conversation: chat history, files you share, config files, rules, skills, and related documentation.

A few reference points from official docs, updated May 28, 2026:

| Platform / model | Context / input limit | Max output |
| --- | --- | --- |
| [Claude Opus 4.7](https://platform.claude.com/docs/en/about-claude/models/overview) | 1M tokens | 128K tokens |
| [Claude Sonnet 4.6](https://platform.claude.com/docs/en/about-claude/models/overview) | 1M tokens | 64K tokens |
| [GPT-5.5 in ChatGPT Codex](https://openai.com/index/introducing-gpt-5-5/) | 400,000 tokens | Not specified |
| [GPT-5.4 API](https://developers.openai.com/api/docs/models/gpt-5.4) | 1,050,000 tokens | 128,000 tokens |
| [GPT-5.5 Pro API](https://developers.openai.com/api/docs/models/gpt-5.5-pro) | 1,050,000 tokens | 128,000 tokens |
| [Gemini 3 Pro](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/3-pro) | 1,048,576 input tokens | 65,536 tokens |

<small>Note: these numbers are model/API limits. Actual context in a tool can also depend on how that tool manages chat history, attached files, cache, and the context reserved for system instructions.</small>

A typical coding conversation often uses around 20,000-100,000 tokens, while the initial config is often around 1,000-2,000 tokens.

The important part is not only length, but relevance: the more unrelated content is in context, the harder it is for AI to identify the important information for the current task.

## API Cost

When you call a model with an API key, cost is usually based on input and output tokens. See official pricing: [Anthropic](https://platform.claude.com/docs/en/about-claude/pricing), [OpenAI](https://developers.openai.com/api/docs/pricing), [Google Gemini](https://ai.google.dev/gemini-api/docs/pricing).

With subscription plans like Claude Code or ChatGPT Codex, tokens are not billed separately every time config is read, but they still count toward the plan's usage limit.

## Usage Limit

A usage limit is the amount of usage a plan allows within a period of time. Unlike the context window, it is not about how much AI can see in one conversation; it is about when you may need to wait for a reset, switch models, or upgrade your plan.

Reset is when the quota is refreshed. Depending on the tool, reset can happen after a few hours, daily, or monthly. The reset time is usually shown in the product or account dashboard.

Resetting the usage limit does not make an old conversation reload config automatically. If you edited `AGENTS.md` or `CLAUDE.md`, starting a new conversation is still the most reliable way to load the new version.

## Keeping Context Focused

Context is easier to use when each part of the guidance has the right role. The context file is best for general, stable information; rules and skills are better for longer, more detailed guidance, or guidance that only applies to certain tasks.

A specific rule helps AI know exactly what to do. When a rule can be interpreted in multiple ways, a short example makes the guidance clearer:

```markdown
# Too vague
- Write careful TypeScript

# Clearer
- Do not use `any` in TypeScript
```

Unrelated content makes AI read more without helping it understand the task better.

## When Context Loses Focus

Unfocused context usually does not create an obvious error right away. It shows up in slightly off responses: AI ignores a written rule, asks about something already in the file, or starts out correctly but drifts away from the way you want it to work.

If the same instruction has to be repeated multiple times in one conversation, the guidance may need to be more specific, placed somewhere more relevant, or split out from the context file.
