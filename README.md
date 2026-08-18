# YYC³ 小语智能成长守护系统（统一基线）

> YYC³ AI小语智能成长守护系统 — 0-3岁婴幼儿智能陪伴与成长守护平台。
> 本仓库是多版本收敛后的**唯一开发基线**，由 yyc3-xy-05 派生，整合 01/02/03 版本与设计资产。

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Next.js 16（App Router）+ React 19 + TypeScript 5.9 |
| 运行时/包管理 | Bun ≥ 1.1（Node ≥ 18 亦可） |
| 样式 | Tailwind CSS 4 + shadcn/ui（Radix） |
| 状态 | Redux Toolkit + TanStack Query + SWR |
| AI | BigModel 开放平台（作业批改 / 语音 / 情感分析） |
| 数据 | SQLite（sql.js / lib/db），PostgreSQL（可选） |

## 快速开始

```bash
# 安装依赖（国内网络必须走镜像）
bun install --registry https://registry.npmmirror.com

# 配置环境变量
cp .env.example .env.local   # 填入 BIGMODEL_API_KEY 等

# 开发（端口 1228）
bun run dev

# 构建 / 生产启动
bun run build && bun run start
```

## 常用脚本

| 命令 | 作用 |
|------|------|
| `bun run dev` | Next.js 开发服务器（:1228） |
| `bun run build` / `start` | 生产构建 / 启动 |
| `bun run type-check` | 全量类型检查（当前遗留 ~800 错误，见 TYPECHECK_BASELINE.md） |
| `bun run lint` / `lint:fix` | ESLint 检查 / 自动修复 |
| `bun test` | 单元测试（__tests__/） |

## 目录结构

```
unified/
├── app/                  # Next.js App Router
│   ├── api/              #   API 路由（AI 代理均在服务端持有密钥）
│   ├── [locale]/         #   国际化路由
│   └── <feature>/        #   功能页面（growth/homework/books/...）
├── components/           # React 组件（ui/ 基础件 + 业务分组）
├── lib/
│   ├── ai/               #   AI 引擎模块（情感/语音/推荐/多模态）
│   ├── api/              #   外部 API 客户端（服务端专用）
│   ├── db/               #   SQLite 数据层（schema/client/manager）
│   ├── store/            #   Redux 状态
│   └── prediction/       #   成长预测引擎
├── services/prediction/  # 智能预测服务（AgenticCore 依赖）
├── core/                 # AgenticCore 自治核心引擎
├── hooks/ types/ config/ # 钩子、类型、配置
├── themes/               # Figma 三套主题参考（未接线，已排除出 tsc）
├── __tests__/            # 单元测试（源自 yyc3-xy-03）
└── docs/                 # 架构与历史文档（01/02/03 版本并入）
    ├── architecture/     #   架构文档（63 篇）
    ├── plans/            #   规划文档（19 篇）
    └── xy-02-microservices/ # 微服务文档库（2800+ 篇）
```

## 安全约定

- **密钥只进服务端**：`BIGMODEL_API_KEY` 为服务端变量；所有 AI 调用走 `app/api/ai/*` 代理路由。禁止使用 `NEXT_PUBLIC_` 前缀承载密钥。
- `.env*` 均已 gitignore；`.env.example` 提供全部变量样板。
- 安全响应头（CSP / X-Frame-Options / nosniff 等）配置于 `next.config.mjs`。
- 依赖审计：`npm audit --package-lock-only --registry=https://registry.npmjs.org`（镜像源无 audit 端点）。当前 **0 漏洞**。

## 当前状态与路线图

- ✅ 构建通过（40 路由），生产冒烟测试 200 OK
- ✅ 依赖 0 漏洞；API 密钥服务端化
- ⚠️ 遗留类型债 ~800 个 tsc 错误（[TYPECHECK_BASELINE.md](./TYPECHECK_BASELINE.md)）
- 后续路线见 [docs/plans/](./docs/plans/) 与交接文档
