import { defineConfig } from 'vitepress'

const base = process.env.GITHUB_ACTIONS ? '/agent-config/' : '/'

const viNav = [
  { text: 'Hướng dẫn', link: '/guide/quick-start' },
  { text: 'Rules', link: '/rules/general' },
  { text: 'Skills', link: '/skills/plan-feature' },
  { text: 'Docs', link: '/domain/overview' },
  { text: 'Tài liệu', link: '/references' },
]

const enNav = [
  { text: 'Guide', link: '/en/guide/quick-start' },
  { text: 'Rules', link: '/en/rules/general' },
  { text: 'Skills', link: '/en/skills/plan-feature' },
  { text: 'Docs', link: '/en/domain/overview' },
  { text: 'References', link: '/en/references' },
]

const viSidebar = [
  {
    text: 'Bắt đầu',
    items: [
      { text: 'Quick Start', link: '/guide/quick-start' },
      { text: 'Khái niệm cơ bản', link: '/guide/concepts' },
    ],
  },
  {
    text: 'Hiểu cách hoạt động',
    items: [
      { text: 'Agent nạp config thế nào?', link: '/guide/how-agents-read' },
      { text: 'Token & Chất lượng Context', link: '/guide/token-and-context' },
    ],
  },
  {
    text: 'How-To Guides',
    items: [
      { text: 'Áp dụng cho Project Thật', link: '/guide/workflow' },
      { text: 'Tạo một Rule', link: '/guide/create-rule' },
      { text: 'Tạo một Skill', link: '/guide/create-skill' },
    ],
  },
  {
    text: 'Agent Config',
    items: [
      { text: 'AGENTS.md', link: '/agents' },
      { text: 'CLAUDE.md', link: '/claude' },
    ],
  },
  {
    text: 'Rules',
    items: [
      { text: 'General', link: '/rules/general' },
      { text: 'Frontend', link: '/rules/frontend' },
      { text: 'Backend', link: '/rules/backend' },
      { text: 'Database', link: '/rules/database' },
      { text: 'API', link: '/rules/api' },
      { text: 'Testing', link: '/rules/testing' },
    ],
  },
  {
    text: 'Skills',
    items: [
      {
        text: 'Planning',
        items: [
          { text: 'Plan Feature', link: '/skills/plan-feature' },
          { text: 'Write Spec', link: '/skills/write-spec' },
        ],
      },
      {
        text: 'Implementation',
        items: [
          { text: 'Implement Feature', link: '/skills/implement-feature' },
          { text: 'Debug Failure', link: '/skills/debug-failure' },
        ],
      },
      {
        text: 'Review',
        items: [
          { text: 'Review Solution', link: '/skills/review-solution' },
          { text: 'Review Technical', link: '/skills/review-technical' },
          { text: 'Review Diff', link: '/skills/review-diff' },
          { text: 'UX/UI Review', link: '/skills/ux-ui-review' },
          { text: 'Security Review', link: '/skills/security-review' },
        ],
      },
      {
        text: 'QA & Docs',
        items: [
          { text: 'QA Test', link: '/skills/qa-test' },
          { text: 'Write Tests', link: '/skills/write-tests' },
          { text: 'Update Docs', link: '/skills/update-docs' },
          { text: 'Design UX/UI', link: '/skills/design-ux-ui' },
        ],
      },
    ],
  },
  {
    text: 'Domain',
    items: [
      { text: 'Overview', link: '/domain/overview' },
      { text: 'Business Rules', link: '/domain/business-rules' },
      { text: 'Glossary', link: '/domain/glossary' },
    ],
  },
  {
    text: 'Engineering',
    items: [
      { text: 'Overview', link: '/engineering/overview' },
      { text: 'Architecture', link: '/engineering/architecture' },
      { text: 'Decisions', link: '/engineering/decisions' },
      {
        text: 'Conventions',
        items: [
          { text: 'General', link: '/engineering/conventions/general' },
          { text: 'Frontend', link: '/engineering/conventions/frontend' },
          { text: 'Backend', link: '/engineering/conventions/backend' },
          { text: 'Database', link: '/engineering/conventions/database' },
          { text: 'API', link: '/engineering/conventions/api' },
          { text: 'Testing', link: '/engineering/conventions/testing' },
        ],
      },
    ],
  },
  {
    text: 'Specs',
    items: [
      { text: 'README', link: '/specs/' },
      { text: 'Feature Template', link: '/specs/feature-name' },
    ],
  },
  {
    text: 'Tài liệu tham khảo',
    items: [{ text: 'Links & Resources', link: '/references' }],
  },
]

const enSidebar = [
  {
    text: 'Get Started',
    items: [
      { text: 'Quick Start', link: '/en/guide/quick-start' },
      { text: 'Core Concepts', link: '/en/guide/concepts' },
    ],
  },
  {
    text: 'How It Works',
    items: [
      { text: 'How Agents Load Config', link: '/en/guide/how-agents-read' },
      { text: 'Token & Context Quality', link: '/en/guide/token-and-context' },
    ],
  },
  {
    text: 'How-To Guides',
    items: [
      { text: 'Adapt to Your Project', link: '/en/guide/workflow' },
      { text: 'Create a Rule', link: '/en/guide/create-rule' },
      { text: 'Create a Skill', link: '/en/guide/create-skill' },
    ],
  },
  {
    text: 'Agent Config',
    items: [
      { text: 'AGENTS.md', link: '/en/agents' },
      { text: 'CLAUDE.md', link: '/en/claude' },
    ],
  },
  {
    text: 'Rules',
    items: [
      { text: 'General', link: '/en/rules/general' },
      { text: 'Frontend', link: '/en/rules/frontend' },
      { text: 'Backend', link: '/en/rules/backend' },
      { text: 'Database', link: '/en/rules/database' },
      { text: 'API', link: '/en/rules/api' },
      { text: 'Testing', link: '/en/rules/testing' },
    ],
  },
  {
    text: 'Skills',
    items: [
      {
        text: 'Planning',
        items: [
          { text: 'Plan Feature', link: '/en/skills/plan-feature' },
          { text: 'Write Spec', link: '/en/skills/write-spec' },
        ],
      },
      {
        text: 'Implementation',
        items: [
          { text: 'Implement Feature', link: '/en/skills/implement-feature' },
          { text: 'Debug Failure', link: '/en/skills/debug-failure' },
        ],
      },
      {
        text: 'Review',
        items: [
          { text: 'Review Solution', link: '/en/skills/review-solution' },
          { text: 'Review Technical', link: '/en/skills/review-technical' },
          { text: 'Review Diff', link: '/en/skills/review-diff' },
          { text: 'UX/UI Review', link: '/en/skills/ux-ui-review' },
          { text: 'Security Review', link: '/en/skills/security-review' },
        ],
      },
      {
        text: 'QA & Docs',
        items: [
          { text: 'QA Test', link: '/en/skills/qa-test' },
          { text: 'Write Tests', link: '/en/skills/write-tests' },
          { text: 'Update Docs', link: '/en/skills/update-docs' },
          { text: 'Design UX/UI', link: '/en/skills/design-ux-ui' },
        ],
      },
    ],
  },
  {
    text: 'References',
    items: [{ text: 'Links & Resources', link: '/en/references' }],
  },
]

export default defineConfig({
  base,
  title: 'Agent Config',
  description: 'Bộ cấu hình mẫu cho AI coding agents — Claude Code và Codex',

  locales: {
    root: {
      label: 'Tiếng Việt',
      lang: 'vi-VN',
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Agent Config',
      description: 'Configuration template for AI coding agents — Claude Code and Codex',
      themeConfig: {
        nav: enNav,
        sidebar: enSidebar,
        editLink: {
          pattern: 'https://github.com/ngtrthvu3007/agent-config/edit/master/docs/:path',
          text: 'Edit this page on GitHub',
        },
        docFooter: {
          prev: 'Previous',
          next: 'Next',
        },
        outline: {
          label: 'On this page',
        },
      },
    },
  },

  themeConfig: {
    nav: viNav,
    sidebar: viSidebar,

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ngtrthvu3007/agent-config' },
    ],

    editLink: {
      pattern: 'https://github.com/ngtrthvu3007/agent-config/edit/master/docs/:path',
      text: 'Chỉnh sửa trang này',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright:
        'Made by <a href="https://github.com/VuNguyentranThe" target="_blank">Vu Nguyen Tran The</a>',
    },

    docFooter: {
      prev: 'Trang trước',
      next: 'Trang sau',
    },

    outline: {
      label: 'Trên trang này',
    },
  },

  markdown: {
    lineNumbers: true,
  },
})
