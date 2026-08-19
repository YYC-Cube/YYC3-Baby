<!-- markdownlint-disable MD033 MD041 -->
<p align="center">
  <img src="public/YYC3-Family.png" alt="YYC³ Family" />
</p>
<!-- markdownlint-enable MD033 MD041 -->

<h1 align="center">YYC³ 小语智能成长守护系统（统一基线）</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" alt="TypeScript 5.9" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Bun-Test-14151A?logo=bun&logoColor=white" alt="Bun Test" />
  <img src="https://img.shields.io/badge/SQLite-WAL-003B57?logo=sqlite&logoColor=white" alt="SQLite WAL" />
  <img src="https://img.shields.io/badge/next--intl-v4-38BDF8?logo=vercel&logoColor=white" alt="next-intl v4" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?logo=open-source-initiative&logoColor=white" alt="MIT License" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/build-passing-22c55e" alt="build passing" />
  <img src="https://img.shields.io/badge/tests-248%20passed-22c55e" alt="248 tests passed" />
  <img src="https://img.shields.io/badge/type--check-0%20errors-22c55e" alt="0 type errors" />
  <img src="https://img.shields.io/badge/security-0%20vulnerabilities-22c55e" alt="0 vulnerabilities" />
  <img src="https://img.shields.io/badge/%E5%BE%BD%E7%AB%A0-30%20%E6%9E%9A-d946ef?logo=medal&logoColor=white" alt="30 badges" />
</p>

> YYC³ AI小语智能成长守护系统 — 0-3岁婴幼儿智能陪伴与成长守护平台。
> 本仓库是多版本收敛后的**唯一开发基线**：代码源自 yyc3-xy-05 家族，整合 01/02/03 版本文档与测试、
> ai_xy05 AI 模块、三套 Figma 主题参考。工作区已收敛为本目录单项目。

## 技术栈

| 层级 | 技术 |
| ------ | ------ |
| 框架 | Next.js 16（App Router）+ React 19 + TypeScript 5.9 |
| 运行时/包管理 | Node ≥ 22.13（`node:sqlite`）+ Bun（测试）/ npm 兼容 |
| 样式 | Tailwind CSS 4 + shadcn/ui（Radix） |
| 状态 | Redux Toolkit + TanStack Query + SWR |
| AI | BigModel 开放平台（作业批改 / 语音 / 情感分析），密钥仅服务端 |
| 数据 | SQLite（`node:sqlite`，`data/yyc3.db`，WAL） |
| i18n | next-intl v4（zh 默认 / en，`/en` 前缀路由） |

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

# 测试（248 个用例）
bun test
```

## 数据层

- **真实持久化**：children / growth-records / homework（含 `[id]`）四个 API 走
  `lib/db/server.ts` → `lib/db/sqlite-client.ts`（`node:sqlite`），数据落盘 `data/yyc3.db`
- 首次访问自动建表并灌入种子数据（示例家庭/作业/课程）
- JSON 列（media_urls/tags 等）由 server 层自动序列化/反序列化
- 外键约束开启，非法引用返回 400 与中文提示
- 重启进程数据不丢失；备份走 `VACUUM INTO`

## 徽章系统

30 枚勋章 × 8 大分类 × 4 个等级，全部基于真实行为数据声明式评估（`lib/badges/`）。

| 等级 | 分值 | 示例勋章 |
| ------ | ------ | ------ |
| 🥉 铜牌 | 10 | 初试啼声 · 好奇目光 · 七日之约 |
| 🥈 银牌 | 30 | 成长档案馆 · 里程碑达人 · 全景记录者 |
| 🥇 金牌 | 80 | 百年纪念册 · 作业终结者 · 多宝家庭 |
| 💎 钻石 | 200 | 时光收藏家 · 一周年之礼 |

- **评估引擎**：`useBadges` 拉取真实记录 → `computeStats()` 聚合 → `evaluateAll()` 逐枚评估（进度 0-100）
- **分类**：成长记录 · 观察记录 · 情绪记录 · 学习成长 · 里程碑 · 作业任务 · 坚持陪伴 · 综合成就
- **可扩展**：新增勋章只需在 `lib/badges/definitions.ts` 加一行工厂函数，页面零改动
  （详见 [贡献指南](./docs/developer/09-contributing.md) 新增徽章指南）

## 国际化

- `i18n/`（routing/navigation/request）+ `middleware.ts` 为 next-intl v4 标准结构
- `/` 为中文（默认语言无前缀），`/en`、`/en/growth` 等为英文路由
- 文案在 `messages/{zh,en}.json`；`LanguageSwitcher` 组件可直接切换
- 根路由（中文主应用）与 `[locale]` 镜像路由并存，Provider 已注入

## 常用脚本

| 命令 | 作用 |
| ------ | ------ |
| `bun run dev` | Next.js 开发服务器（:1228） |
| `bun run build` / `start` | 生产构建 / 启动 |
| `bun test` | 单元测试（248 用例，全绿） |
| `bun run type-check` | 类型检查（应用代码 **0 错误**，见 TYPECHECK_BASELINE.md） |
| `bun run lint` / `lint:fix` | ESLint 检查 / 自动修复 |

## 目录结构

```text
├── app/                  # Next.js App Router
│   ├── api/              #   API 路由（AI 代理 + SQLite CRUD）
│   ├── [locale]/         #   国际化路由（en）
│   └── <feature>/        #   功能页面（growth/homework/books/...）
├── components/           # React 组件（ui/ 基础件 + 业务分组 + 角色主题）
├── lib/
│   ├── ai/               #   AI 引擎（情感/语音/多模态）
│   ├── api/              #   外部 API 客户端（服务端专用）
│   ├── badges/           #   徽章定义与评估引擎（30 枚）
│   ├── db/               #   SQLite 数据层（server.ts 为 API 统一入口）
│   ├── prediction/       #   预测引擎基座与专项引擎
│   └── store/            #   Redux 状态
├── services/prediction/  # 智能预测服务（模型选择/质量监控）
├── core/                 # AgenticCore 自治核心
├── i18n/ messages/       # next-intl 配置与中英文案
├── middleware.ts         # locale 路由中间件
├── hooks/ types/ config/ # 钩子、类型、配置
├── themes/               # Figma 三套主题参考（未接线，排除出 tsc）
├── __tests__/            # 单元测试（248 用例）
├── public/               # 静态资源（icon/manifest/PWA/角色照片/CNAME）
├── scripts/              # 部署脚本 + 文档生成器（generate-docs.py）
└── docs/                 # ★ 文档中心（唯一入口见 docs/README.md）
    ├── developer/        #   现行开发文档（10 篇，唯一维护）
    └── archive/          #   历史归档（architecture/audit/creative/snapshots/plans）
```

## 安全约定

- **密钥只进服务端**：`BIGMODEL_API_KEY` 为服务端变量；AI 调用一律走 `app/api/ai/*` 代理路由。
  禁止 `NEXT_PUBLIC_` 前缀承载密钥。
- `.env*` 已 gitignore；`data/`（SQLite 库文件）同样不入库。
- 安全响应头（CSP / X-Frame-Options / nosniff / Referrer-Policy）配置于 `next.config.mjs`。
- 依赖审计：`npm audit --package-lock-only --registry=https://registry.npmjs.org`，当前 **0 漏洞**。

## 开发者文档

文档中心见 **[docs/README.md](./docs/README.md)**（唯一入口），现行开发文档套见 **[docs/developer/](./docs/developer/)**：

| 文档 | 内容 |
| ------ | ------ |
| [用户使用手册](./docs/user-manual.md) | 面向家长的产品操作指南（功能地图/隐私/FAQ） |
| [01 · 快速上手](./docs/developer/01-getting-started.md) | 环境要求、安装、启动、常见问题 |
| [02 · 可视化架构体系](./docs/developer/02-architecture.md) | 系统分层 / 混合路由 / 数据流 / AI 链路 / 目录拓扑（Mermaid） |
| [03 · 数据模型](./docs/developer/03-data-model.md) | SQLite 九张表、JSON 列约定、种子数据、备份 |
| [04 · API 参考](./docs/developer/04-api-reference.md) | 全部 REST 端点：请求/响应/错误码约定 |
| [05 · 前端组件体系](./docs/developer/05-frontend.md) | 目录组织、UI 基建、状态管理、主题与角色系统 |
| [06 · AI 引擎与安全](./docs/developer/06-ai-engine.md) | 服务端代理模式、密钥管理、AI 引擎模块清单 |
| [07 · 测试与质量门禁](./docs/developer/07-testing-quality.md) | tsc / lint / test / audit 四道门禁 |
| [08 · 部署](./docs/developer/08-deployment.md) | 本地生产、脚本、Docker 注意事项 |
| [09 · 贡献指南](./docs/developer/09-contributing.md) | 分支模型、提交规范、徽章系统扩展指南 |

## 当前状态

- ✅ 构建通过，生产冒烟 200（含 `/en` i18n 路由、`/manifest.json`、`/icon.svg`）
- ✅ SQLite 真实持久化（写入 → 重启 → 数据在）
- ✅ 测试 248/248 全绿
- ✅ 依赖 0 漏洞；类型债 1,986 → **0**（[TYPECHECK_BASELINE.md](./TYPECHECK_BASELINE.md)，门禁已恢复）
- ✅ 徽章系统：30 枚勋章 × 真实数据评估引擎（`lib/badges/`）
- ✅ 鉴权中间件（JWT + bcrypt）、Winston 日志体系、语音三件套、四主题系统、组件语义化（90%）
- 📍 后续：按域持续消化 lint 债务（~1450 warn，见 [07 · 测试与质量门禁](./docs/developer/07-testing-quality.md)）
