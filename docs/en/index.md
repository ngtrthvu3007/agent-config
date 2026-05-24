---
layout: home

hero:
  name: Agent Config
  text: Configuration template for AI coding agents
  tagline: Standardize how Claude Code and Codex work in your project — rules, skills, conventions, and docs.
  actions:
    - theme: brand
      text: Get Started
      link: /en/guide/concepts
    - theme: alt
      text: View on GitHub
      link: https://github.com/VuNguyentranThe/agent-config

features:
  - icon: 🤖
    title: AGENTS.md
    details: Shared rule file for all AI coding agents. Codex reads it directly; Claude Code imports it via CLAUDE.md.
    link: /en/agents
  - icon: ⚡
    title: Rules
    details: Condensed coding conventions for Claude to read before implementing — general, frontend, backend, database, API, testing.
    link: /en/rules/general
  - icon: 🔧
    title: Skills
    details: 13 specialized workflows — from plan, spec, implement, debug to review, QA, security, and docs.
    link: /en/skills/plan-feature
  - icon: 📐
    title: Conventions
    details: Full coding conventions for React/Next.js, Express/NestJS/Go, database, and API — the source of truth for rules.
    link: /engineering/conventions/general
  - icon: 📋
    title: Domain Docs
    details: Where you put product context, business rules, and glossary so the agent understands the domain before starting a task.
    link: /domain/overview
  - icon: 📝
    title: Feature Specs
    details: Template for writing specs, epics, user stories, and acceptance criteria in a consistent format.
    link: /specs/
---
